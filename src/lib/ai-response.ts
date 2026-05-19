import { z } from "zod";

const MesajOnerisiSchema = z.object({
  mesaj: z.string().min(1).max(500),
  aciklama: z.string().min(1).max(300),
});

const AIResponseSchema = z.object({
  oneriler: z.array(MesajOnerisiSchema).min(2).max(5),
});

export type AIResponse = z.infer<typeof AIResponseSchema>;

/**
 * AI yanıtını güvenli şekilde parse eder ve validasyon yapar.
 * Markdown blok içinde JSON olabilir, temizler.
 * 
 * @param raw AI'dan gelen ham metin
 * @returns Validasyon başarılı ise { success: true, data }, değilse { success: false, error }
 */
export function parseAIResponse(raw: string): { success: true; data: AIResponse } | { success: false; error: string } {
  try {
    let cleaned = raw.trim();

    /* Markdown blok temizliği */
    if (cleaned.startsWith("```json")) cleaned = cleaned.slice(7);
    else if (cleaned.startsWith("```")) cleaned = cleaned.slice(3);
    if (cleaned.endsWith("```")) cleaned = cleaned.slice(0, -3);
    cleaned = cleaned.trim();

    /* Bazen model "json" etiketinden önce/sonra boşluk bırakıyor */
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      cleaned = cleaned.slice(firstBrace, lastBrace + 1);
    }

    const parsed = JSON.parse(cleaned);

    /* Zod validasyonu */
    const validated = AIResponseSchema.safeParse(parsed);
    if (validated.success) {
      return { success: true, data: validated.data };
    }

    return { success: false, error: validated.error.issues.map(i => i.message).join(", ") };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "JSON parse hatası" };
  }
}

/**
 * AI yanıtını parse etmeyi dener. Başarısız olursa retry sayısı kadar tekrar dener.
 * 
 * @param raw AI'dan gelen ham metin
 * @param retryCount Kaç kez daha denenecek (default: 1)
 * @returns Validasyon başarılı ise { success: true, data }, değilse { success: false, error }
 */
export function parseAIResponseWithRetry(
  raw: string,
  retryCount = 1
): { success: true; data: AIResponse } | { success: false; error: string } {
  const result = parseAIResponse(raw);
  if (result.success) return result;

  if (retryCount > 0) {
    /* Bir kez daha dene — bazen ilk parse'da prefix/suffix yakalanmamış olabilir */
    return parseAIResponseWithRetry(raw, retryCount - 1);
  }

  return result;
}
