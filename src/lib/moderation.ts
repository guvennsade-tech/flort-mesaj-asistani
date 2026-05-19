import { MAX_METIN } from "./constants";

/* ---------- Uzunluk limitleri ---------- */
const MIN_MESAJ_UZUNLUK = 2; /* Kullanıcı tek kelime bile girebilsin, ama anlamsız filtreler yakalar */

/* ---------- Türkçe uygunsuz kelimeler (word boundary ile) ---------- */
const uygunsuzKelimeler: RegExp[] = [
  /\bsikiş\b/iu,
  /\bsikim\b/iu,
  /\bsikiyim\b/iu,
  /\bsikmek\b/iu,
  /\bsiktirir\b/iu,
  /\bsikerim\b/iu,
  /\byarrak\b/iu,
  /\bamcık\b/iu,
  /\bgötveren\b/iu,
  /\bkaltak\b/iu,
  /\bfahişe\b/iu,
  /\bpezevenk\b/iu,
  /\borospu\b/iu,
  /\bpiç\b/iu,
  /\bibne\b/iu,
  /\bşerefsiz\b/iu,
  /\bkevaşe\b/iu,
  /\bdalyarak\b/iu,
  /\bamk\b/iu,
  /\baq\b/iu,
  /\byavşak\b/iu,
  /\bçomar\b/iu,
  /\bkezban\b/iu,
];

/* ---------- İngilizce uygunsuz kelimeler (word boundary ile) ---------- */
const englishProfanity: RegExp[] = [
  /\bfuck\b/i,
  /\bshit\b/i,
  /\bbitch\b/i,
  /\basshole\b/i,
  /\bcunt\b/i,
  /\bdick\b/i,
  /\bpussy\b/i,
  /\bcock\b/i,
  /\bdamn\b/i,
  /\bbastard\b/i,
  /\bslut\b/i,
  /\bwhore\b/i,
  /\bnigger\b/i,
  /\bfag\b/i,
  /\bretard\b/i,
  /\bbullshit\b/i,
  /\bmotherfucker\b/i,
  /\bcum\b/i,
  /\banal\b/i,
  /\bblowjob\b/i,
  /\bhandjob\b/i,
];

/* ---------- Şifreli/leetspeak Türkçe pattern'ları ---------- */
const sifreliUygunsuzlar = [
  /\bs[iı!1|]k(?:i[şs]|im|iyim|er|tir|mek|erim)?\b/i,
  /\by[a@4]rr[a@4]k\b/i,
  /\boro[sş5]pu\b/i,
  /\bp[iı!1|]ç\b/i,
  /\b[a@4]mk\b/i,
  /\b[a@4]q\b/i,
  /\bg[oö0]tveren\b/i,
  /\b[a@4]mc[iı!1|]k\b/i,
  /\b[oö0]r[oö0]sp[uü]\b/i,
  /\bs[iı!1|]k[iı!1|]ş\b/i,
  /\bs[g6]\b/i,
  /\bm[kq]\b/i,
];

/* ---------- Yetişkin / +18 içerik ---------- */
const yetiskinIcerik = [
  /\b\+18\b/,
  /\bnude\b/,
  /\bnudes\b/,
  /\bçıplak\b/,
  /\bseks\b/,
  /\bporn[o0]?\b/,
  /\bporno\b/,
  /\berotik\b/,
  /\bcinsel\b/,
  /\bsex\b/,
  /\bxxx\b/,
  /\bonlyfans\b/,
];

/* ---------- Manipülasyon / riskli içerik ---------- */
const riskliManipulasyon = [
  /\bkıskandır\b/,
  /\bmanip[uü]le\b/,
  /\bısrar et\b/,
  /\bpeşini bırakma\b/,
  /\bhayır dese de\b/,
  /\bzorla\b/,
  /\btaciz\b/,
  /\bstalk\b/,
  /\bsuicide\b/,
  /\bintihar\b/,
  /\bkendini öldür\b/,
];

/* ---------- Prompt injection pattern'ları ---------- */
const PROMPT_INJECTION: RegExp[] = [
  /önceki.{0,30}(unut|sil|yoksay)/i,
  /ignore.{0,30}(previous|instruction|system)/i,
  /forget.{0,30}(previous|instruction|above)/i,
  /\byou are now\b/i,
  /\bpretend (you are|to be)\b/i,
  /\broleplay as\b/i,
  /\bdan\b.{0,20}mode/i,
  /\bdeveloper mode\b/i,
  /\bjailbreak\b/i,
  /\bsystem\s*:/i,
  /\[INST\]/i,
  /<<SYS>>/i,
];

/* ---------- Rastgele tuş vuruşu pattern'ları (anlamsız içerik) ---------- */
const anlamsizPatternler = [
  /^(?:asdf|qwer|zxcv|jklş|jklı|mnbv|lkjh|poiü|qwerty|12345|qwertz)+$/i,
  /^(?:dsaf|ewqr|fdas|gfdsa|hjkl|kjhl|poi|rewq)+$/i,
];

/**
 * Leetspeak karakterlerini normal Türkçe/İngilizce karakterlere çevirir.
 * Örn: "s1k" → "sik", "y@rr@k" → "yarrak", "4n4l" → "anal"
 */
function normalizeLeetspeak(text: string): string {
  return (
    text
      /* Unicode homoglyph normalizasyonu (Cyrillic → Latin vb.) */
      .normalize("NFKC")
      /* sayılar */
      .replace(/0/g, "o")
      .replace(/1/g, "i")
      .replace(/3/g, "e")
      .replace(/4/g, "a")
      .replace(/5/g, "s")
      .replace(/7/g, "t")
      /* özel karakterler */
      .replace(/@/g, "a")
      .replace(/\$/g, "s")
      .replace(/\+/g, "t")
      .replace(/\|/g, "i")
      .replace(/!/g, "i")
      /* parantez benzeri */
      .replace(/\(/g, "c")
      .replace(/\)/g, "c")
      /* Türkçe karakter normalizasyonu (karşılaştırma için) */
      .replace(/ş/g, "s")
      .replace(/ç/g, "c")
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ö/g, "o")
      .replace(/ı/g, "i")
      .replace(/İ/g, "i")
      .replace(/â/g, "a")
      .replace(/ê/g, "e")
      .replace(/î/g, "i")
      .replace(/ô/g, "o")
      .replace(/û/g, "u")
  );
}

/**
 * Metinde hiç harf (a-z, A-Z, Türkçe karakterler) yoksa true döner.
 * Örn: "12345", "!!!!", "@#$%" → true
 */
function hicHarfYok(text: string): boolean {
  return !/[a-zA-ZçÇğĞıİöÖşŞüÜâêîôû]/i.test(text);
}

/**
 * Aynı karakterin abartılı tekrar edip etmediğini kontrol eder (spam).
 * Örn: "aaaaaa", "!!!!!!", "ooooldum", "mmmm"
 */
function TEKRAR_SPAM(text: string): boolean {
  /* 4 veya daha fazla aynı karakter ard arda */
  return /(.)\1{3,}/.test(text);
}

/**
 * Metinde çok düşük çeşitlilik varsa true döner.
 * Örn: "abababab" (2 farklı karakter), "xyxyxyxy" (2 farklı karakter)
 * Gerçek bir mesajda genellikle 5+ farklı harf olur.
 */
function cokDusukCesitlilik(text: string): boolean {
  const sadeceHarfler = text.replace(/[^a-zA-ZçÇğĞıİöÖşŞüÜâêîôû]/g, "");
  if (sadeceHarfler.length === 0) return false; /* hicHarfYok zaten yakalar */

  const benzersizHarfler = new Set(sadeceHarfler.toLocaleLowerCase("tr-TR"));
  /* 10+ karakter varsa ama sadece 3 veya daha az farklı harf kullanılmışsa anlamsız */
  if (sadeceHarfler.length >= 10 && benzersizHarfler.size <= 3) return true;

  return false;
}

/**
 * Çok kısa veya anlamsız kelime yapısını kontrol eder.
 */
function anlamsizYapiVarMi(text: string): boolean {
  const kelimeler = text
    .toLocaleLowerCase("tr-TR")
    .split(/\s+/)
    .filter((k) => k.length > 0);

  /* Tek kelime ve çok kısa → anlamsız kabul et */
  if (kelimeler.length === 1 && kelimeler[0].length < 6) return true;

  /* Tüm kelimeler 2 harften kısa → anlamsız */
  if (kelimeler.length > 0 && kelimeler.every((k) => k.length <= 2)) return true;

  /* Rastgele tuş kombinasyonları */
  const birlesik = text.toLocaleLowerCase("tr-TR").replace(/\s+/g, "");
  for (const p of anlamsizPatternler) {
    if (p.test(birlesik)) return true;
  }

  return false;
}

export function icerikKontrol(mesaj: string): {
  guvenli: boolean;
  sebep?: string;
} {
  const temizMesaj = mesaj.trim();

  /* ========== 1. UZUNLUK KONTROLÜ (en başta) ========== */
  if (temizMesaj.length < MIN_MESAJ_UZUNLUK) {
    return {
      guvenli: false,
      sebep: `Mesaj çok kısa. En az ${MIN_MESAJ_UZUNLUK} karakter girmelisiniz.`,
    };
  }

  if (temizMesaj.length > MAX_METIN) {
    return {
      guvenli: false,
      sebep: `Mesaj çok uzun. Maksimum ${MAX_METIN} karakter girebilirsiniz.`,
    };
  }

  /* Normalizasyonlar */
  const kucukMesaj = temizMesaj.toLocaleLowerCase("tr-TR");
  const leetNormalized = normalizeLeetspeak(kucukMesaj);

  /* ========== 2. ANLAMSIZ / SPAM KONTROLÜ ========== */
  if (hicHarfYok(temizMesaj)) {
    return {
      guvenli: false,
      sebep: "Mesaj anlamsız görünüyor. Lütfen gerçek bir sohbet girin.",
    };
  }

  if (TEKRAR_SPAM(temizMesaj)) {
    return {
      guvenli: false,
      sebep: "Mesaj tekrarlanan karakterler içeriyor. Lütfen gerçek bir sohbet girin.",
    };
  }

  if (cokDusukCesitlilik(temizMesaj)) {
    return {
      guvenli: false,
      sebep: "Mesaj anlamsız görünüyor. Lütfen gerçek bir sohbet girin.",
    };
  }

  if (anlamsizYapiVarMi(temizMesaj)) {
    return {
      guvenli: false,
      sebep: "Mesaj anlamsız veya spam içerik gibi görünüyor. Lütfen gerçek bir sohbet girin.",
    };
  }

  /* ========== 3. TÜRKÇE UYGUNSUZ KELİMELER (word boundary) ========== */
  for (const pattern of uygunsuzKelimeler) {
    if (pattern.test(kucukMesaj) || pattern.test(leetNormalized)) {
      return {
        guvenli: false,
        sebep: "Mesajınız uygunsuz içerik barındırıyor.",
      };
    }
  }

  /* ========== 4. İNGİLİZCE UYGUNSUZ KELİMELER (word boundary) ========== */
  for (const pattern of englishProfanity) {
    if (pattern.test(kucukMesaj) || pattern.test(leetNormalized)) {
      return {
        guvenli: false,
        sebep: "Mesajınız uygunsuz içerik barındırıyor.",
      };
    }
  }

  /* ========== 5. ŞİFRELİ / LEETSPEAK PATTERN'LAR ========== */
  for (const pattern of sifreliUygunsuzlar) {
    if (pattern.test(kucukMesaj) || pattern.test(leetNormalized)) {
      return {
        guvenli: false,
        sebep: "Mesajınız uygunsuz içerik barındırıyor.",
      };
    }
  }

  /* ========== 6. YETİŞKİN / +18 İÇERİK ========== */
  for (const pattern of yetiskinIcerik) {
    if (pattern.test(kucukMesaj) || pattern.test(leetNormalized)) {
      return {
        guvenli: false,
        sebep: "+18 veya cinsel içerikli mesajlara yardımcı olamıyorum.",
      };
    }
  }

  /* ========== 7. MANİPÜLASYON / RİSKLİ İÇERİK ========== */
  for (const pattern of riskliManipulasyon) {
    if (pattern.test(kucukMesaj) || pattern.test(leetNormalized)) {
      return {
        guvenli: false,
        sebep: "Baskı veya manipülasyon içeren mesajlara yardımcı olamıyorum.",
      };
    }
  }

  /* ========== 8. PROMPT INJECTION ========== */
  for (const pattern of PROMPT_INJECTION) {
    if (pattern.test(temizMesaj)) {
      return {
        guvenli: false,
        sebep: "Bu tür içeriklerle yardımcı olamıyorum.",
      };
    }
  }

  return { guvenli: true };
}
