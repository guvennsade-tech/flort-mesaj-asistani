"use client";

import { useState } from "react";
import Link from "next/link";
import { MesajOnerisi } from "@/lib/types";

export function MiniDemo() {
  const [mesaj, setMesaj] = useState("");
  const [oneriler, setOneriler] = useState<MesajOnerisi[]>([]);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState<string | null>(null);
  const [kopyalandi, setKopyalandi] = useState<number | null>(null);

  async function gonder() {
    if (!mesaj.trim()) return;
    setYukleniyor(true);
    setHata(null);
    setOneriler([]);

    try {
      const res = await fetch("/api/oneri", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sohbet: [{ gonderen: "o", metin: mesaj.trim() }],
          ton: "esprili",
          asama: "yazisiyoruz",
          hedef: "sohbeti_surdur",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setHata(data.hata || "Bir hata oluştu.");
        return;
      }
      setOneriler(data.oneriler);
    } catch {
      setHata("Bağlantı hatası. Tekrar dene.");
    } finally {
      setYukleniyor(false);
    }
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
            Ton ve aşama otomatik ayarlandı
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
            className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-5 text-sm font-bold text-white transition-all ${
              mesaj.trim() && !yukleniyor
                ? "bg-gradient-to-r from-pink-500 to-violet-600 shadow-md shadow-pink-200 hover:scale-[1.02]"
                : "cursor-not-allowed bg-slate-300"
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
              <>✦ Öneri Al</>
            )}
          </button>
        </div>

        {hata && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {hata}
          </div>
        )}

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
                  <p className="min-w-0 flex-1 text-[15px] leading-7 text-slate-900">
                    {o.mesaj}
                  </p>
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
                    {kopyalandi === i ? "✓ Kopyalandı" : "⧉ Kopyala"}
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
