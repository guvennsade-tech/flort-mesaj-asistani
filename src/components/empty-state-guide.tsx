"use client";

import { useEffect, useState } from "react";
import {
  Sparkles,
  MessageSquarePlus,
  Check,
  ArrowRight,
  Wand2,
} from "lucide-react";

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
      "Karşı tarafın mesajını ve kendi cevaplarını sırayla yaz. Ne kadar çok bağlam verirsen, AI o kadar doğal öneriler üretir.",
  },
  {
    numara: 2,
    baslik: "Ton ve aşama seç",
    aciklama:
      "Samimi mi, esprili mi, romantik mi? İlişki aşamanı ve hedefini seç. AI tarzını buna göre ayarlar.",
  },
  {
    numara: 3,
    baslik: "Öneriyi al ve kopyala",
    aciklama:
      "Tek tıkla 3 farklı alternatif sunar. Beğendiğini kopyala ve hemen gönder.",
  },
];

interface EmptyStateGuideProps {
  sohbetVarMi: boolean;
  onOrnekYukle?: () => void;
}

export function EmptyStateGuide({ sohbetVarMi, onOrnekYukle }: EmptyStateGuideProps) {
  const [gorunur, setGorunur] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setGorunur(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-6 sm:p-10 text-center transition-all duration-700 ease-out ${
        gorunur ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {/* ===== Hero Icon ===== */}
      <div className="animate-float mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-pink-100 via-violet-100 to-indigo-100 shadow-lg shadow-pink-100/50">
        {sohbetVarMi ? (
          <MessageSquarePlus
            className="h-10 w-10 text-pink-500"
            strokeWidth={1.5}
          />
        ) : (
          <Sparkles
            className="h-10 w-10 text-violet-500"
            strokeWidth={1.5}
          />
        )}
      </div>

      {/* ===== Headline ===== */}
      <h3 className="max-w-md text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
        {sohbetVarMi
          ? "Sohbet hazır, şimdi seçimlerini yap"
          : "Sohbeti yapıştır, AI'nin doğal cevaplar üretmesini izle"}
      </h3>

      {/* ===== Subheadline ===== */}
      <p className="mt-3 max-w-sm text-sm leading-7 text-slate-500">
        {sohbetVarMi
          ? "Ton, ilişki aşamanı ve ne yapmak istediğini seçtikten sonra 'Mesajı Parlat' butonuna bas."
          : "Karşı tarafın mesajlarını yaz, ton ve aşamayı seç. Sana özel, doğal ve hazır cevaplar hazırlayalım."}
      </p>

      {/* ===== Sample Prompt Card (only when no chat) ===== */}
      {!sohbetVarMi && (
        <div className="mt-8 w-full max-w-sm">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/70 p-5 text-left">
            {/* Decorative gradient orb */}
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br from-pink-200/40 to-violet-200/40 blur-2xl" />

            <p className="relative mb-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Örnek sohbet
            </p>

            <div className="relative space-y-3">
              {/* Incoming message bubble */}
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-pink-600 text-[10px] font-bold text-white">
                  O
                </span>
                <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm">
                  bugün seni görünce mutlu oldum :)
                </div>
              </div>

              {/* Reply hint */}
              <div className="flex items-start gap-2.5 pl-8">
                <div className="rounded-2xl rounded-tl-sm border border-dashed border-slate-300 bg-white/50 px-4 py-2.5 text-sm text-slate-400">
                  buraya senin cevabın gelecek...
                </div>
              </div>
            </div>

            {onOrnekYukle && (
              <button
                onClick={onOrnekYukle}
                className="relative mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 py-2.5 text-sm font-bold text-white shadow-md shadow-pink-200 transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:shadow-[0_0_24px_rgba(236,72,153,0.3)] hover:-translate-y-px active:scale-[0.97] active:translate-y-0"
                type="button"
              >
                <Wand2 className="h-4 w-4" strokeWidth={2} />
                Örneği Dene
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ===== Steps ===== */}
      <div className="mt-8 w-full max-w-sm space-y-3 text-left">
        {adimlar.map((adim, i) => {
          const tamamlandi = sohbetVarMi ? i === 0 : false;
          const aktif = !sohbetVarMi && i === 0;

          return (
            <div
              key={adim.numara}
              className={`flex items-start gap-3 rounded-xl border p-3.5 transition-all duration-300 ${
                tamamlandi
                  ? "border-emerald-200 bg-emerald-50/70"
                  : aktif
                    ? "border-pink-200 bg-pink-50/70 shadow-sm shadow-pink-100/50"
                    : "border-slate-100 bg-slate-50/50"
              }`}
              style={{
                transitionDelay: `${i * 80}ms`,
                opacity: gorunur ? 1 : 0,
                transform: gorunur ? "translateY(0)" : "translateY(8px)",
              }}
            >
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                  tamamlandi
                    ? "bg-emerald-500 text-white"
                    : aktif
                      ? "bg-pink-500 text-white"
                      : "bg-slate-200 text-slate-500"
                }`}
              >
                {tamamlandi ? (
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                ) : (
                  adim.numara
                )}
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

      {/* ===== Pro tip ===== */}
      <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-gradient-to-r from-violet-50 to-pink-50 px-4 py-3 text-left">
        <Sparkles
          className="mt-0.5 h-4 w-4 shrink-0 text-violet-500"
          strokeWidth={2}
        />
        <p className="text-xs leading-5 text-slate-600">
          <span className="font-semibold text-slate-800">İpucu:</span> Gerçek
          bir sohbet geçmişi girdiğinde AI çok daha bağlamlı ve doğal öneriler
          üretir. Tek mesaj yerine 3-4 mesajlık geçmiş dene.
        </p>
      </div>
    </div>
  );
}
