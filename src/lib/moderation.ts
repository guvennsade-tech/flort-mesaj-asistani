import { MAX_METIN } from "./constants";

/* ---------- Uzunluk limitleri ---------- */
const MIN_MESAJ_UZUNLUK = 2; /* Kullanıcı tek kelime bile girebilsin, ama anlamsız filtreler yakalar */

/* ---------- Türkçe uygunsuz kelimeler ---------- */
const uygunsuzKelimeler = [
  "sikiş", "sikim", "sikiyim", "sikmek", "siktirir", "sikerim", "sik",
  "yarrak", "amcık", "götveren", "kaltak", "fahişe", "pezevenk",
  "orospu", "piç", "ibne", "şerefsiz", "kevaşe", "kâfir",
  "allah", "peygamber", /* dini hakaretler */
  "dalyarak", "göt", "am", "yavşak", "çomar", "kezban",
  "amk", "aq", "mk", "sg",
];

/* ---------- İngilizce uygunsuz kelimeler ---------- */
const englishProfanity = [
  "fuck", "shit", "bitch", "asshole", "cunt", "dick", "pussy", "cock",
  "damn", "hell", "bastard", "slut", "whore", "nigger", "fag", "retard",
  "bullshit", "motherfucker", "cum", "anal", "blowjob", "handjob",
];

/* ---------- Şifreli/leetspeak Türkçe pattern'ları ---------- */
const sifreliUygunsuzlar = [
  /\bs[iı!1|]k(?:i[şs]|im|iyim|er|tir|mek|erim)?\b/,
  /\by[a@4]rr[a@4]k\b/,
  /\boro[sş5]pu\b/,
  /\bp[iı!1|]ç\b/,
  /\b[a@4]mk\b/,
  /\b[a@4]q\b/,
  /\bg[oö0]t(?:veren)?\b/,
  /\b[a@4]mc[iı!1|]k\b/,
  /\b[oö0]r[oö0]sp[uü]\b/,
  /\bs[iı!1|]k[iı!1|]ş\b/,
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

  /* ========== 3. TÜRKÇE UYGUNSUZ KELİMELER ========== */
  for (const kelime of uygunsuzKelimeler) {
    if (kucukMesaj.includes(kelime)) {
      return {
        guvenli: false,
        sebep: "Mesajınız uygunsuz içerik barındırıyor.",
      };
    }
  }

  /* ========== 4. İNGİLİZCE UYGUNSUZ KELİMELER ========== */
  for (const kelime of englishProfanity) {
    if (kucukMesaj.includes(kelime) || leetNormalized.includes(kelime)) {
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

  return { guvenli: true };
}
