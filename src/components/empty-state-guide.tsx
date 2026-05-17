"use client";

import { useEffect, useState } from "react";

interface Adim {
  numara: number;
  baslik: string;
  aciklama: string;
}

const adimlar: Adim[] = [
  {
    numara: 1,
    baslik: "Sohbeti ekle",
    aciklama:
      "Karşı tarafın mesajını ve kendi cevaplarını sırayla yaz. Gerçek bir sohbet geçmişi ne kadar çok bağlam verirsen, AI o kadar doğal öneriler üretir.",
  },
  {
    numara: 2,
    baslik: "Ton ve aşama seç",
    aciklama:
      "Samimi mi, esprili mi, romantik mi? İlişki aşamanı ve hedefini seç. AI bu seçimlere göre cevabın tarzını ayarlar.",
  },
  {
    numara: 3,
    baslik: "Öneriyi al ve kopyala",
    aciklama:
      '"Mesajı Parlat" butonuna bas. Sana 3 farklı alternatif sunar. Beğendiğini tek dokunuşla kopyala ve gönder.',
  },
];

export function EmptyStateGuide({ sohbetVarMi }: { sohbetVarMi: boolean }) {
  const [gorunur, setGorunur] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setGorunur(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-6 sm:p-10 text-center transition-all duration-500 ${
        gorunur ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* İllüstrasyon */}
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-violet-100 text-3xl shadow-inner">
        {sohbetVarMi ? "💭" : "👋"}
      </div>

      <h3 className="text-lg font-bold text-slate-900">
        {sohbetVarMi
          ? "Sohbet hazır, şimdi seçimlerini yap"
          : "Hoş geldin! Başlamak çok kolay"}
      </h3>

      <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
        {sohbetVarMi
          ? "Ton, ilişki aşamanı ve ne yapmak istediğini seçtikten sonra öneriyi alabilirsin."
          : "3 adımda karşı tarafın mesajına en uygun cevabı bul."}
      </p>

      {/* Adımlar */}
      <div className="mt-6 w-full max-w-sm space-y-3 text-left">
        {adimlar.map((adim, i) => {
          const tamamlandi = sohbetVarMi ? i === 0 : false;
          const aktif = !sohbetVarMi && i === 0;

          return (
            <div
              key={adim.numara}
              className={`flex items-start gap-3 rounded-xl border p-3.5 transition-all ${
                tamamlandi
                  ? "border-emerald-200 bg-emerald-50"
                  : aktif
                    ? "border-pink-200 bg-pink-50 shadow-sm"
                    : "border-slate-100 bg-slate-50"
              }`}
            >
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                  tamamlandi
                    ? "bg-emerald-500 text-white"
                    : aktif
                      ? "bg-pink-500 text-white"
                      : "bg-slate-200 text-slate-500"
                }`}
              >
                {tamamlandi ? "✓" : adim.numara}
              </div>
              <div>
                <p
                  className={`text-sm font-bold ${
                    tamamlandi
                      ? "text-emerald-900"
                      : aktif
                        ? "text-pink-900"
                        : "text-slate-700"
                  }`}
                >
                  {adim.baslik}
                </p>
                <p
                  className={`mt-0.5 text-xs leading-5 ${
                    tamamlandi
                      ? "text-emerald-700"
                      : aktif
                        ? "text-pink-700"
                        : "text-slate-500"
                  }`}
                >
                  {adim.aciklama}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* İpucu */}
      <div className="mt-5 rounded-xl bg-blue-50 px-4 py-3 text-xs leading-5 text-blue-700">
        <span className="font-semibold">💡 İpucu:</span> Gerçek bir sohbet
        geçmişi girdiğinde AI çok daha bağlamlı ve doğal öneriler üretir.
        Tek mesaj yerine 3-4 mesajlık geçmiş dene.
      </div>
    </div>
  );
}
