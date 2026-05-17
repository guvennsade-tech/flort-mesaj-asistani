import { RATE_LIMIT, RATE_WINDOW_MS } from "./constants";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, RateLimitEntry>();
const CLEANUP_INTERVAL = 10 * 60 * 1000;

function cleanupExpired() {
  const now = Date.now();
  for (const [key, entry] of buckets) {
    if (entry.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

setInterval(cleanupExpired, CLEANUP_INTERVAL);

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  source: "memory";
}

export async function checkRateLimit(
  key: string,
  limit = RATE_LIMIT,
  windowMs = RATE_WINDOW_MS
): Promise<RateLimitResult> {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: limit - 1, resetAt, source: "memory" };
  }

  if (current.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: current.resetAt, source: "memory" };
  }

  current.count += 1;
  buckets.set(key, current);

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

  return forwardedFor || realIp || clientId;
}

/* ---------- Global maliyet takibi ---------- */

interface DailyUsage {
  date: string; // YYYY-MM-DD
  requests: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCost: number; // USD
}

let todayUsage: DailyUsage = createEmptyUsage();

function createEmptyUsage(): DailyUsage {
  return {
    date: new Date().toISOString().slice(0, 10),
    requests: 0,
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0,
    estimatedCost: 0,
  };
}

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function ensureDate(): void {
  if (todayUsage.date !== getTodayKey()) {
    todayUsage = createEmptyUsage();
  }
}

/** GPT-4o-mini fiyatlandırması (USD / 1M token) */
const INPUT_PRICE_PER_1M = 0.15;
const OUTPUT_PRICE_PER_1M = 0.60;

export function getDailyBudget(): number {
  const env = process.env.DAILY_BUDGET_USD;
  if (env) {
    const n = parseFloat(env);
    if (Number.isFinite(n) && n > 0) return n;
  }
  return 1.0; // varsayılan günlük limit: 1 USD
}

export function trackUsage(promptTokens: number, completionTokens: number): void {
  ensureDate();
  todayUsage.requests += 1;
  todayUsage.promptTokens += promptTokens;
  todayUsage.completionTokens += completionTokens;
  todayUsage.totalTokens += promptTokens + completionTokens;

  const inputCost = (promptTokens / 1_000_000) * INPUT_PRICE_PER_1M;
  const outputCost = (completionTokens / 1_000_000) * OUTPUT_PRICE_PER_1M;
  todayUsage.estimatedCost += inputCost + outputCost;
}

export function isBudgetExceeded(): boolean {
  ensureDate();
  return todayUsage.estimatedCost >= getDailyBudget();
}

export function getUsageStats(): DailyUsage {
  ensureDate();
  return { ...todayUsage };
}
