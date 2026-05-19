import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { buildPrompt } from "@/lib/prompt-builder";
import { icerikKontrol } from "@/lib/moderation";
import {
  checkRateLimit,
  getClientKey,
  isBudgetExceeded,
  trackUsage,
  getDailyBudget,
} from "@/lib/rate-limit";
import { parseAIResponse } from "@/lib/ai-response";
import {
  MAX_MESAJ,
  MAX_METIN,
  MAX_EKLEME,
  FETCH_TIMEOUT_MS,
  MAX_PROMPT_TOKENS,
  TOKEN_EST_CHARS,
} from "@/lib/constants";
import {
  Ton,
  IliskiAsamasi,
  Hedef,
  SohbetMesaji,
  MesajOnerisi,
  tonlar,
  asamalar,
  hedefler,
} from "@/lib/types";

interface RequestBody {
  sohbet: SohbetMesaji[];
  eklemekIstedikleri?: string;
  ton: Ton;
  asama: IliskiAsamasi;
  hedef: Hedef;
}

function sanitizeInput(text: string): string {
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/[\x00-\x1F\x7F-\x9F]/g, "")
    .trim();
}

export async function POST(request: NextRequest) {
  /* ===== Faz 1: Request parsing ve validasyon ===== */
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { hata: "Geçersiz içerik tipi. application/json gerekli." },
        { status: 400 }
      );
    }

    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 50_000) {
      return NextResponse.json(
        { hata: "İstek boyutu çok büyük." },
        { status: 413 }
      );
    }

    let body: RequestBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { hata: "Bir şeyler ters gitti. Lütfen sayfayı yenileyip tekrar dene." },
        { status: 400 }
      );
    }

    const { ton, asama, hedef } = body;

    if (!Array.isArray(body.sohbet) || body.sohbet.length === 0) {
      return NextResponse.json(
        { hata: "Önce sohbet geçmişini ekle, sonra öneri alabilirsin." },
        { status: 400 }
      );
    }

    if (body.sohbet.length > MAX_MESAJ) {
      return NextResponse.json(
        { hata: "Sohbet geçmişi dolu. Eskilerden silerek yeni mesaj ekle." },
        { status: 400 }
      );
    }

    for (const m of body.sohbet) {
      if (m.gonderen !== "sen" && m.gonderen !== "o") {
        return NextResponse.json(
          { hata: "Bir şeyler ters gitti. Lütfen sayfayı yenileyip tekrar dene." },
          { status: 400 }
        );
      }
      if (typeof m.metin !== "string" || m.metin.trim().length === 0) {
        return NextResponse.json(
          { hata: "Lütfen geçerli bir mesaj yaz." },
          { status: 400 }
        );
      }
      if (m.metin.length > MAX_METIN) {
        return NextResponse.json(
          { hata: `Mesajın biraz uzun oldu. En fazla ${MAX_METIN} karakter kullanabilirsin.` },
          { status: 400 }
        );
      }
    }

    const sohbet: SohbetMesaji[] = body.sohbet.map((m) => ({
      gonderen: m.gonderen,
      metin: sanitizeInput(m.metin),
    }));

    const eklemekIstedikleri =
      typeof body.eklemekIstedikleri === "string"
        ? sanitizeInput(body.eklemekIstedikleri).slice(0, MAX_EKLEME)
        : "";

    /* Token limit kontrolü: sohbet çok uzunsa truncation sonrası bile aşılabilir */
    const toplamMetin = sohbet.map((m) => m.metin).join("");
    const toplamKarakter = toplamMetin.length + (eklemekIstedikleri?.length ?? 0);
    if (toplamKarakter > MAX_PROMPT_TOKENS * TOKEN_EST_CHARS) {
      return NextResponse.json(
        { hata: "Sohbet geçmişi çok uzun. Bazı eski mesajları silerek tekrar deneyin." },
        { status: 400 }
      );
    }

    if (!ton || !asama || !hedef) {
      return NextResponse.json(
        { hata: "Lütfen ton, ilişki aşaması ve hedefini seç." },
        { status: 400 }
      );
    }

    const gecerliTon = tonlar.some((t) => t.id === ton);
    const gecerliAsama = asamalar.some((a) => a.id === asama);
    const gecerliHedef = hedefler.some((h) => h.id === hedef);

    if (!gecerliTon || !gecerliAsama || !gecerliHedef) {
      return NextResponse.json(
        { hata: "Bir şeyler ters gitti. Lütfen sayfayı yenileyip tekrar dene." },
        { status: 400 }
      );
    }

    /* ===== Faz 2: İçerik moderasyonu (rate limitten ÖNCE) ===== */
    for (const m of sohbet) {
      const kontrol = icerikKontrol(m.metin);
      if (!kontrol.guvenli) {
        return NextResponse.json({ hata: kontrol.sebep }, { status: 400 });
      }
    }
    if (eklemekIstedikleri) {
      const ekstraKontrol = icerikKontrol(eklemekIstedikleri);
      if (!ekstraKontrol.guvenli) {
        return NextResponse.json(
          { hata: ekstraKontrol.sebep },
          { status: 400 }
        );
      }
    }

    /* ===== Faz 3: Rate limit (sadece geçerli ve temiz istekler) ===== */
    const clientId = request.cookies.get("fm_client_id")?.value || randomUUID();
    const rateLimit = await checkRateLimit(
      getClientKey(request.headers, clientId)
    );
    const cookieOptions = {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    };

    if (!rateLimit.allowed) {
      const dakika = Math.max(
        Math.ceil((rateLimit.resetAt - Date.now()) / 60_000),
        1
      );
      const limitResponse = NextResponse.json(
        {
          hata: `Kısa sürede çok fazla öneri istendi. ${dakika} dakika sonra tekrar deneyebilirsiniz.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(dakika * 60),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Source": rateLimit.source,
          },
        }
      );
      limitResponse.cookies.set("fm_client_id", clientId, cookieOptions);
      return limitResponse;
    }

    /* ===== Faz 4: Bütçe kontrolü ===== */
    if (await isBudgetExceeded()) {
      return NextResponse.json(
        {
          hata: "Bugünlük AI bütçesi doldu. Yarın tekrar deneyebilirsiniz.",
        },
        { status: 429 }
      );
    }

    /* ===== Faz 5: OpenAI API çağrısı ===== */
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          hata: "Sistem şu an hazır değil. Kısa bir süre sonra tekrar dene.",
        },
        { status: 500 }
      );
    }

    const prompt = buildPrompt({ sohbet, eklemekIstedikleri, ton, asama, hedef });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    let response;
    try {
      response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "Sen bir flört mesajı asistanısın. Sadece JSON formatında yanıt ver.",
            },
            { role: "user", content: prompt },
          ],
          temperature: 0.8,
          max_tokens: 700,
          response_format: { type: "json_object" },
        }),
        signal: controller.signal,
      });
    } catch (fetchError: unknown) {
      clearTimeout(timeoutId);
      if (fetchError instanceof Error && fetchError.name === "AbortError") {
        return NextResponse.json(
          { hata: "AI servisi zaman aşımına uğradı. Lütfen tekrar deneyin." },
          { status: 504 }
        );
      }
      throw fetchError;
    }
    clearTimeout(timeoutId);

    if (!response.ok) {
      await response.json().catch(() => null);
      return NextResponse.json(
        { hata: "AI şu an meşgul. Biraz bekleyip tekrar dene." },
        { status: response.status }
      );
    }

    const data = await response.json();

    /* Token kullanımını takip et */
    const usage = data.usage;
    if (usage && typeof usage.prompt_tokens === "number" && typeof usage.completion_tokens === "number") {
      await trackUsage(usage.prompt_tokens, usage.completion_tokens);
    }

    const icerik = data.choices?.[0]?.message?.content;

    if (!icerik) {
      return NextResponse.json(
        { hata: "AI'dan yanıt alınamadı. Tekrar dene, genelde ikincide düzelir." },
        { status: 502 }
      );
    }

    /* ===== Faz 6: AI yanıtını parse et (Zod + retry) ===== */
    let oneriler: MesajOnerisi[];
    let parseResult = parseAIResponse(icerik);

    /* İlk parse başarısız olursa 1 kez daha dene (daha düşük temperature ile) */
    if (!parseResult.success) {
      console.warn("[AI Parse] İlk deneme başarısız, retry atılıyor:", parseResult.error);
      
      const retryResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "Sen bir flört mesajı asistanısın. Sadece JSON formatında yanıt ver. Başka açıklama ekleme.",
            },
            { role: "user", content: prompt },
          ],
          temperature: 0.3,
          max_tokens: 700,
          response_format: { type: "json_object" },
        }),
      });

      if (retryResponse.ok) {
        const retryData = await retryResponse.json();
        const retryIcerik = retryData.choices?.[0]?.message?.content;
        if (retryIcerik) {
          parseResult = parseAIResponse(retryIcerik);
        }
      }
    }

    if (!parseResult.success) {
      console.error("[AI Parse] Retry sonrası da başarısız:", parseResult.error, "icerik:", icerik);
      return NextResponse.json(
        { hata: "AI'ın yanıtı işlenemedi. Lütfen tekrar dene." },
        { status: 502 }
      );
    }

    oneriler = parseResult.data.oneriler.slice(0, 3).map((o) => ({
      mesaj: o.mesaj.trim(),
      aciklama: o.aciklama.trim(),
    }));

    const aiCiktiKontrol = oneriler.every(
      (o) => icerikKontrol(o.mesaj).guvenli
    );
    if (!aiCiktiKontrol) {
      return NextResponse.json(
        { hata: "Öneriler güvenlik kontrolünden geçemedi. Lütfen sohbetini kontrol edip tekrar dene." },
        { status: 500 }
      );
    }

    const successResponse = NextResponse.json(
      { oneriler },
      {
        headers: {
          "X-RateLimit-Remaining": String(rateLimit.remaining),
          "X-RateLimit-Source": rateLimit.source,
        },
      }
    );
    successResponse.cookies.set("fm_client_id", clientId, cookieOptions);
    return successResponse;
  } catch (error) {
    console.error("API hatası:", error);
    return NextResponse.json(
      { hata: "Beklenmeyen bir hata oluştu." },
      { status: 500 }
    );
  }
}
