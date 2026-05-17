import { MAX_METIN } from "./constants";

const uygunsuzKelimeler = [
  "sikiş", "sikim", "sikiyim", "yarrak",
  "orospu", "piç", "pezevenk", "ibne", "şerefsiz",
  "götveren", "kaltak", "fahişe",
];

const sifreliUygunsuzlar = [
  /\bs[iı!1]k(?:i[şs]|im|iyim|er|tir|mek)?\b/,
  /\by[a@]rr[a@]k\b/,
  /\boro[sş]pu\b/,
  /\bp[iı!1]ç\b/,
  /\bamk\b/,
  /\baq\b/,
  /\bg[oö0]t(?:veren)?\b/,
];

const yetiskinIcerik = [
  /\b\+18\b/,
  /\bnude\b/,
  /\bçıplak\b/,
  /\bseks\b/,
  /\bporn[o0]\b/,
];

const riskliManipulasyon = [
  /\bkıskandır\b/,
  /\bmanip[uü]le\b/,
  /\bısrar et\b/,
  /\bpeşini bırakma\b/,
  /\bhayır dese de\b/,
];

export function icerikKontrol(mesaj: string): {
  guvenli: boolean;
  sebep?: string;
} {
  const temizMesaj = mesaj.trim();
  const kucukMesaj = temizMesaj.toLocaleLowerCase("tr-TR");

  for (const kelime of uygunsuzKelimeler) {
    if (kucukMesaj.includes(kelime)) {
      return {
        guvenli: false,
        sebep: "Mesajınız uygunsuz içerik barındırıyor.",
      };
    }
  }

  for (const pattern of sifreliUygunsuzlar) {
    if (pattern.test(kucukMesaj)) {
      return {
        guvenli: false,
        sebep: "Mesajınız uygunsuz içerik barındırıyor.",
      };
    }
  }

  for (const pattern of yetiskinIcerik) {
    if (pattern.test(kucukMesaj)) {
      return {
        guvenli: false,
        sebep: "+18 veya cinsel içerikli mesajlara yardımcı olamıyorum.",
      };
    }
  }

  for (const pattern of riskliManipulasyon) {
    if (pattern.test(kucukMesaj)) {
      return {
        guvenli: false,
        sebep: "Baskı veya manipülasyon içeren mesajlara yardımcı olamıyorum.",
      };
    }
  }

  if (mesaj.length > MAX_METIN) {
    return {
      guvenli: false,
      sebep: `Mesaj çok uzun. Maksimum ${MAX_METIN} karakter girebilirsiniz.`,
    };
  }

  if (temizMesaj.length < 5) {
    return {
      guvenli: false,
      sebep: "Mesaj çok kısa. Lütfen daha detaylı yazın.",
    };
  }

  return { guvenli: true };
}
