export type Ton = "samimi" | "esprili" | "romantik";

export type IliskiAsamasi =
  | "yeni_tanistik"
  | "yazisiyoruz"
  | "yakiniz"
  | "ciddi";

export type Hedef =
  | "sohbeti_surdur"
  | "bulusma_teklif"
  | "ilgi_goster";

export interface SohbetMesaji {
  gonderen: "sen" | "o";
  metin: string;
}

export interface MesajOnerisi {
  mesaj: string;
  aciklama: string;
}

export type FeedbackDegeri = "iyi" | "kotu";

export interface FeedbackRequest {
  deger: FeedbackDegeri;
  ton: Ton;
  asama: IliskiAsamasi;
  hedef: Hedef;
}

export interface HataState {
  mesaj: string;
  tip: "rateLimit" | "baglanti" | "sunucu" | "input" | "genel";
  retryAfter?: number; // saniye
}

export interface GecmisKaydi {
  id: string;
  tarih: string;
  sohbet: SohbetMesaji[];
  ton: Ton;
  asama: IliskiAsamasi;
  hedef: Hedef;
  oneriler: MesajOnerisi[];
}

export const tonlar: { id: Ton; etiket: string; emoji: string }[] = [
  { id: "samimi", etiket: "Samimi", emoji: "" },
  { id: "esprili", etiket: "Esprili", emoji: "" },
  { id: "romantik", etiket: "Romantik", emoji: "" },
];

export const asamalar: {
  id: IliskiAsamasi;
  etiket: string;
  emoji: string;
}[] = [
  { id: "yeni_tanistik", etiket: "Yeni tanıştık", emoji: "" },
  { id: "yazisiyoruz", etiket: "Yazışıyoruz", emoji: "" },
  { id: "yakiniz", etiket: "Yakınız", emoji: "" },
  { id: "ciddi", etiket: "Ciddi ilişki", emoji: "" },
];

export const hedefler: { id: Hedef; etiket: string; aciklama: string }[] = [
  {
    id: "sohbeti_surdur",
    etiket: "Sohbeti sürdür",
    aciklama: "Karşı tarafın cevap vermesini kolaylaştıran, doğal bir devam.",
  },
  {
    id: "bulusma_teklif",
    etiket: "Buluşma teklif et",
    aciklama: "Baskı kurmadan net ve sıcak bir davet.",
  },
  {
    id: "ilgi_goster",
    etiket: "İlgini göster",
    aciklama: "Abartmadan beğeni ve merak ifade eden mesaj.",
  },
];
