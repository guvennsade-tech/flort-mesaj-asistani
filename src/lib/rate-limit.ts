import { Redis } from "@upstash/redis";
import { RATE_LIMIT, RATE_WINDOW_MS } from "./constants";

/* ---------- Redis client (lazy init) ---------- */

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) return null;

  redis = new Redis({ url, token });
  return redis;
}

/* ---------- Rate Limiting ---------- */

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  source: "redis" | "memory";
}

/**
 * Redis tabanlı rate limiting.
 * INCR + EXPIRE pattern ile sliding window.
 * Redis yoksa in-memory fallback.
 */
export async function checkRateLimit(
  key: string,
  limit = RATE_LIMIT,
  windowMs = RATE_WINDOW_MS
): Promise<RateLimitResult> {
  const client = getRedis();
  const now = Date.now();
  const redisKey = `rl:${key}`;
  const windowSec = Math.ceil(windowMs / 1000);

  if (client) {
    try {
      const pipeline = client.pipeline();
      pipeline.incr(redisKey);
      pipeline.ttl(redisKey);
      const [count, ttl] = await pipeline.exec<[number, number]>();

      if (count === 1) {
        await client.expire(redisKey, windowSec);
      }

      const resetAt = ttl > 0 ? now + ttl * 1000 : now + windowMs;

      if (count > limit) {
        return {
          allowed: false,
          remaining: 0,
          resetAt,
          source: "redis",
        };
      }

      return {
        allowed: true,
        remaining: Math.max(limit - count, 0),
        resetAt,
        source: "redis",
      };
    } catch {
      /* Redis hatası → memory fallback */
    }
  }

  return checkRateLimitMemory(key, limit, windowMs);
}

/* ---------- In-memory fallback (local dev) ---------- */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const memoryBuckets = new Map<string, RateLimitEntry>();

function checkRateLimitMemory(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const current = memoryBuckets.get(key);

  if (!current || current.resetAt <= now) {
    const resetAt = now + windowMs;
    memoryBuckets.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: limit - 1, resetAt, source: "memory" };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: current.resetAt,
      source: "memory",
    };
  }

  current.count += 1;
  memoryBuckets.set(key, current);

  return {
    allowed: true,
    remaining: Math.max(limit - current.count, 0),
    resetAt: current.resetAt,
    source: "memory",
  };
}

export function getClientKey(headers: Headers, clientId: string): string {
  const forwardedFor = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = headers.get("x-real-ip")?.trim();
  const ip = forwardedFor || realIp;

  if (ip && ip.length > 0 && !ip.startsWith("::ffff:127") && ip !== "127.0.0.1" && ip !== "::1") {
    return `ip:${ip}`;
  }

  /* Fallback: local geliştirme veya IP proxy'siz ortamda */
  return `client:${clientId}`;
}

/* ---------- Günlük Maliyet Takibi (Redis) ---------- */

const USAGE_KEY_PREFIX = "usage:";
const INPUT_PRICE_PER_1M = 0.15;
const OUTPUT_PRICE_PER_1M = 0.60;

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function getUsageRedisKey(): string {
  return `${USAGE_KEY_PREFIX}${getTodayKey()}`;
}

export function getDailyBudget(): number {
  const env = process.env.DAILY_BUDGET_USD;
  if (env) {
    const n = parseFloat(env);
    if (Number.isFinite(n) && n > 0) return n;
  }
  return 1.0;
}

/**
 * Token kullanımını Redis'e yazar.
 * HINCRBY ile atomik artış, gün sonunda otomatik expire.
 */
export async function trackUsage(
  promptTokens: number,
  completionTokens: number
): Promise<void> {
  const client = getRedis();
  const key = getUsageRedisKey();
  const totalTokens = promptTokens + completionTokens;
  const inputCost = (promptTokens / 1_000_000) * INPUT_PRICE_PER_1M;
  const outputCost = (completionTokens / 1_000_000) * OUTPUT_PRICE_PER_1M;
  const cost = inputCost + outputCost;

  if (client) {
    try {
      const pipeline = client.pipeline();
      pipeline.hincrby(key, "requests", 1);
      pipeline.hincrby(key, "promptTokens", promptTokens);
      pipeline.hincrby(key, "completionTokens", completionTokens);
      pipeline.hincrby(key, "totalTokens", totalTokens);
      pipeline.hincrbyfloat(key, "estimatedCost", cost);
      pipeline.expire(key, 86400 * 2);
      await pipeline.exec();
      return;
    } catch {
      /* Redis hatası → console.log fallback */
    }
  }

  console.info(
    `[usage] ${getTodayKey()} +1 req, +${promptTokens} prompt, +${completionTokens} completion, +$${cost.toFixed(6)}`
  );
}

/**
 * Günlük bütçenin aşılıp aşılmadığını Redis'ten kontrol eder.
 */
export async function isBudgetExceeded(): Promise<boolean> {
  const client = getRedis();
  const key = getUsageRedisKey();
  const budget = getDailyBudget();

  if (client) {
    try {
      const cost = await client.hget<number>(key, "estimatedCost");
      if (cost === null) return false;
      return cost >= budget;
    } catch {
      /* Redis hatası → güvenli taraf: izin ver */
      return false;
    }
  }

  return false;
}

export interface DailyUsage {
  date: string;
  requests: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCost: number;
}

/**
 * Günlük kullanım istatistiklerini Redis'ten okur.
 */
export async function getUsageStats(): Promise<DailyUsage> {
  const client = getRedis();
  const key = getUsageRedisKey();
  const empty: DailyUsage = {
    date: getTodayKey(),
    requests: 0,
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0,
    estimatedCost: 0,
  };

  if (client) {
    try {
      const values = await client.hgetall<Record<string, string>>(key);

      if (!values || Object.keys(values).length === 0) return empty;

      return {
        date: getTodayKey(),
        requests: Number(values.requests ?? 0),
        promptTokens: Number(values.promptTokens ?? 0),
        completionTokens: Number(values.completionTokens ?? 0),
        totalTokens: Number(values.totalTokens ?? 0),
        estimatedCost: Number(values.estimatedCost ?? 0),
      };
    } catch {
      return empty;
    }
  }

  return empty;
}
