"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Copy, Check } from "lucide-react";
import { MesajOnerisi } from "@/lib/types";

/* ---------- Demo cevap kütüphanesi (API maliyeti yok, rate limit yok) ---------- */

interface DemoPaket {
  keywords: string[];
  oneriler: MesajOnerisi[];
}

const demoPaketler: DemoPaket[] = [
  {
    keywords: ["hafta sonu", "ne yap", "plan", "boş", "müsait", "zaman"],
    oneriler: [
      { mesaj: "Henüz net bir plan yok, senin önerin var mı?", aciklama: "Karşı tarafa soru sorarak sohbeti açık tutar." },
      { mesaj: "Kafeye gitmeyi düşünüyordum, gelmek ister misin?", aciklama: "Doğal bir buluşma daveti içerir." },
      { mesaj: "Dizi izleyip dinlenmek istiyorum ama tek başına sıkıcı oluyor.", aciklama: "Hafif bir iltifat ve ortak aktivite önerisi." },
    ],
  },
  {
    keywords: ["nasılsın", "naber", "napıyorsun", "nasıl gidiyor", "keyif"],
    oneriler: [
      { mesaj: "İyiyim, seninle yazışınca daha da iyi oldum tabii.", aciklama: "Samimi ve hafif romantik bir ton kullanır." },
      { mesaj: "İyi ama biraz sıkıldım, sen anlat neler yapıyorsun?", aciklama: "Karşı tarafa ilgi göstererek sohbeti devam ettirir." },
      { mesaj: "Fena değil, senin haberlerini bekliyordum aslında.", aciklama: "İlgi gösterir ama baskı kurmaz." },
    ],
  },
  {
    keywords: ["görüşelim", "buluşalım", "tanışalım", "kahve", "yemek", "sinema"],
    oneriler: [
      { mesaj: "Kesinlikle! Hangi gün sana uygun?", aciklama: "Olumlu ve net bir yanıt verir." },
      { mesaj: "Ben de aynı şeyi düşünüyordum. Yakındaki bir kafe önerir misin?", aciklama: "Karşı tarafın fikrini alarak ortak karar almayı teşvik eder." },
      { mesaj: "Çok isterim ama bu hafta biraz yoğunum, önümüzdeki hafta olur mu?", aciklama: "Dürüst ama kapıyı kapatmayan bir cevap." },
    ],
  },
  {
    keywords: ["özledim", "özle", "düşün", "aklımda", "geliyorsun"],
    oneriler: [
      { mesaj: "Ben de seni çok özledim, bu hafta görüşelim mi?", aciklama: "Duygusal karşılık verir ve somut bir adım atar." },
      { mesaj: "Her gece uyumadan önce aklıma geliyorsun.", aciklama: "Romantik ama abartısız bir itiraf." },
      { mesaj: "Özlemek güzel, ama seninle olmak daha güzel olurdu.", aciklama: "Samimi ve çarpıcı bir cümle." },
    ],
  },
  {
    keywords: ["şaka", "gül", "komik", "espri", "güldüm", "kahkaha"],
    oneriler: [
      { mesaj: "Komiksin sen, gülmekten telefonu düşürdüm az kalsın.", aciklama: "Esprili bir karşılık verir." },
      { mesaj: "Bu şakayı çalıyorum, arkadaşlarıma anlatacağım.", aciklama: "Mizahi bir ton kullanır." },
      { mesaj: "Seninle konuşmak bütün günün stresini alıyor.", aciklama: "Esprinin ardından samimi bir iltifat." },
    ],
  },
  {
    keywords: ["sev", "hoşlan", "beğen", "çekici", "yakışıklı", "güzel"],
    oneriler: [
      { mesaj: "Sen de benim için çok özelsin, bunu biliyorsun değil mi?", aciklama: "Karşılıklı duyguyu nazikçe ifade eder." },
      { mesaj: "Bunu duymak beni çok mutlu etti, teşekkür ederim.", aciklama: "Dürüst ve sıcak bir karşılık." },
      { mesaj: "Ben de seninle olmaktan çok keyif alıyorum.", aciklama: "İlgi gösterir ama abartılı olmaz." },
    ],
  },
  {
    keywords: ["yemek", "aç", "yedin mi", "akşam yemeği", "restoran", "mutfak"],
    oneriler: [
      { mesaj: "Henüz yemedim, seninle birlikte yemek isterdim aslında.", aciklama: "Doğal bir buluşma daveti." },
      { mesaj: "Ne önerirsin? Senin zevkine güveniyorum.", aciklama: "Karşı tarafa değer verdiğini hissettirir." },
      { mesaj: "Eve yeni geldim, şimdi bir şeyler hazırlayacağım. Sen ne yedin?", aciklama: "Günlük ve samimi bir sohbet akışı." },
    ],
  },
];

const fallbackOneriler: MesajOnerisi[] = [
  { mesaj: "İlginç bir soru, bunu yüz yüze konuşsak daha iyi olur bence.", aciklama: "Sohbeti canlı tutar ve buluşma ihtimali açar." },
  { mesaj: "Seninle aynı şeyi düşünüyordum, bu tesadüf mü yoksa?", aciklama: "Karşı tarafa yakınlık hissettirir." },
  { mesaj: "Bunu biraz daha açar mısın, tam anlayamadım.", aciklama: "Merak uyandırarak sohbeti derinleştirir." },
];

function demoOneriUret(mesaj: string): MesajOnerisi[] {
  const kucuk = mesaj.toLocaleLowerCase("tr-TR");

  /* Kelime eşleşmesine göre paket seç */
  for (const paket of demoPaketler) {
    if (paket.keywords.some((k) => kucuk.includes(k))) {
      return paket.oneriler;
    }
  }

  /* Eşleşme yoksa karıştırılmış fallback */
  return [...fallbackOneriler].sort(() => Math.random() - 0.5);
}

/* ---------- Bileşen ---------- */

export function MiniDemo() {
  const [mesaj, setMesaj] = useState("");
  const [oneriler, setOneriler] = useState<MesajOnerisi[]>([]);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [kopyalandi, setKopyalandi] = useState<number | null>(null);

  async function gonder() {
    if (!mesaj.trim()) return;
    setYukleniyor(true);
    setOneriler([]);

    /* API çağrısı YOK — tamamen client-side demo */
    await new Promise((r) => setTimeout(r, 800));
    setOneriler(demoOneriUret(mesaj.trim()));
    setYukleniyor(false);
  }

  async function kopyala(metin: string, index: number) {
    try {
      await navigator.clipboard.writeText(metin);
      setKopyalandi(index);
      setTimeout(() => setKopyalandi(null), 2000);
    } catch {
      // ignore
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50 sm:p-8">
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-pink-600">
            Hemen Dene
          </span>
          <span className="text-xs text-slate-400">
            Ücretsiz demo — API çağrısı yok
          </span>
        </div>

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Karşı tarafın mesajını yaz
        </label>
        <textarea
          value={mesaj}
          onChange={(e) => setMesaj(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              gonder();
            }
          }}
          placeholder="Örn: Bu hafta sonu ne yapıyorsun?"
          className="min-h-[80px] w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-[15px] leading-6 text-slate-900 outline-none placeholder:text-slate-400 focus:border-pink-300 focus:ring-2 focus:ring-pink-100"
          maxLength={300}
        />
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {mesaj.length}/300
          </span>
          <button
            onClick={gonder}
            disabled={!mesaj.trim() || yukleniyor}
             className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-5 text-sm font-bold select-none transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              mesaj.trim() && !yukleniyor
                ? "bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-md shadow-pink-200 hover:shadow-[0_0_24px_rgba(236,72,153,0.35)] hover:-translate-y-px active:scale-[0.94] active:translate-y-0 active:duration-75"
                : "cursor-not-allowed bg-gradient-to-r from-slate-300 to-slate-400 text-white/80"
            }`}
            type="button"
          >
            {yukleniyor ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Hazırlanıyor...
                </>
              ) : (
                <><Sparkles className="h-4 w-4" strokeWidth={2} /> Öneri Al</>
            )}
          </button>
        </div>

        {oneriler.length > 0 && (
          <div className="mt-6 space-y-3">
            <p className="text-sm font-semibold text-slate-500">
              {oneriler.length} alternatif:
            </p>
            {oneriler.map((o, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-600 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] leading-7 text-slate-900">
                      {o.mesaj}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {o.aciklama}
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={() => kopyala(o.mesaj, i)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                      kopyalandi === i
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                    }`}
                    type="button"
                  >
                    {kopyalandi === i ? (
                      <><Check className="h-3.5 w-3.5" /> Kopyalandı</>
                    ) : (
                      <><Copy className="h-3.5 w-3.5" /> Kopyala</>
                    )}
                  </button>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-center pt-2">
              <Link
                href="/asistan"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-pink-200 hover:scale-[1.02] transition-transform"
              >
                Tüm özellikleri kullan →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
