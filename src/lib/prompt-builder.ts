import { Ton, IliskiAsamasi, Hedef, SohbetMesaji } from "./types";

const tonAciklamalari: Record<Ton, string> = {
  samimi:
    "Sıcak, içten ve doğal bir dil kullan. Yapay olmayan, gerçek hissettiren cümleler kur.",
  esprili:
    "Komik ve zekice bir ton kullan. Hafif mizah yap ama abartma, küçümseme.",
  romantik:
    "Duygusal ve sıcak bir ton kullan. Şiirsel ama abartısız ifadeler tercih et.",
};

const asamaAciklamalari: Record<IliskiAsamasi, string> = {
  yeni_tanistik:
    "Henüz yeni tanıştınız. Kısa ve kibar ol, fazla kişisel veya romantik olma. 1-2 cümle.",
  yazisiyoruz:
    "Bir süredir yazışıyorsunuz. Biraz daha rahat olabilirsin ama ölçülü kal. 2-3 cümle.",
  yakiniz:
    "Birbirinize yakınsınız. Samimi ve duygusal olabilirsin. 2-3 cümle.",
  ciddi:
    "Ciddi bir ilişkiniz var. Dürüst ve derin mesajlar uygun. 3-4 cümle.",
};

const hedefAciklamalari: Record<Hedef, string> = {
  sohbeti_surdur:
    "Sohbeti doğal şekilde devam ettir. Karşı tarafın cevap vermesini kolaylaştıran açık uçlu bir detay ekle.",
  bulusma_teklif:
    "Buluşma teklif et. Davet net olsun ama baskı veya suçluluk hissettirme içermesin.",
  ilgi_goster:
    "İlgini göster. İltifat ve merak dengeli olsun; abartılı aşk ilanı gibi duyulmasın.",
};

export interface PromptParams {
  sohbet: SohbetMesaji[];
  eklemekIstedikleri?: string;
  ton: Ton;
  asama: IliskiAsamasi;
  hedef: Hedef;
}

function sohbetiFormatla(sohbet: SohbetMesaji[]): string {
  return sohbet
    .map((m) => `${m.gonderen === "sen" ? "Sen" : "O"}: ${m.metin}`)
    .join("\n");
}

export function buildPrompt({
  sohbet,
  eklemekIstedikleri,
  ton,
  asama,
  hedef,
}: PromptParams): string {
  const sonMesaj = sohbet[sohbet.length - 1];
  const sonMesajSahibi = sonMesaj?.gonderen === "o" ? "karşı taraf" : "sen";

  const ekstra = eklemekIstedikleri?.trim()
    ? `\nKullanıcının notu: "${eklemekIstedikleri.trim()}"`
    : "";

  const sohbetMetni = sohbetiFormatla(sohbet);

  return `Sen bir flört mesajı asistanısın. Türkçe cevap önerileri üretiyorsun.

Sohbet geçmişi (kronolojik sırayla, en son altta):
---
${sohbetMetni}
---

Son mesajı yazan: ${sonMesajSahibi}
${ekstra}

İlişki Aşaması: ${asamaAciklamalari[asama]}
İstenen Ton: ${tonAciklamalari[ton]}
Kullanıcının Hedefi: ${hedefAciklamalari[hedef]}

Kurallar:
- Sohbetin genel tonunu ve bağlamını dikkate al
- Son mesaja uygun bir cevap üret; konudan kopuk olma
- Türkçe yaz, doğal ve gerçekçi olsun
- Küfür, uygunsuz veya +18 içerik kesinlikle kullanma
- Emoji tonuna göre uygun olabilir, abartma
- Cinsiyet belirtme, nötr kal
- Karşı tarafın rızasına ve sınırlarına saygılı ol
- Kıskandırma, suçluluk, baskı veya manipülasyon içerme

Tam olarak aşağıdaki JSON formatında yanıt ver:

{
  "oneriler": [
    {
      "mesaj": "önerilen cevap metni",
      "aciklama": "neden bu tarz önerildi (1 kısa cümle)"
    },
    {
      "mesaj": "ikinci önerilen cevap metni",
      "aciklama": "neden bu tarz önerildi (1 kısa cümle)"
    },
    {
      "mesaj": "üçüncü önerilen cevap metni",
      "aciklama": "neden bu tarz önerildi (1 kısa cümle)"
    }
  ]
}

Sadece JSON yanıtı ver, başka açıklama ekleme.`;
}
