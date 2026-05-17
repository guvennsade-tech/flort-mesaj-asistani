"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Ton,
  IliskiAsamasi,
  Hedef,
  tonlar,
  asamalar,
  hedefler,
} from "@/lib/types";
import { BrandMark } from "@/components/brand-mark";
import { ToastContainer, useToast } from "@/components/toast";

interface FavoriItem {
  id: string;
  mesaj: string;
  ton: Ton;
  asama: IliskiAsamasi;
  hedef: Hedef;
}

function parseFavori(id: string): FavoriItem | null {
  // format: ton:asama:hedef:mesaj
  const parts = id.split(":");
  if (parts.length < 4) return null;

  const [ton, asama, hedef, ...mesajParts] = parts;
  const mesaj = mesajParts.join(":"); // mesaj içinde : olabilir

  const gecerliTon = tonlar.some((t) => t.id === ton);
  const gecerliAsama = asamalar.some((a) => a.id === asama);
  const gecerliHedef = hedefler.some((h) => h.id === hedef);

  if (!gecerliTon || !gecerliAsama || !gecerliHedef) return null;

  return {
    id,
    mesaj,
    ton: ton as Ton,
    asama: asama as IliskiAsamasi,
    hedef: hedef as Hedef,
  };
}

export default function FavorilerPage() {
  const [favoriler, setFavoriler] = useState<FavoriItem[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const { toasts, goster: toastGoster, kapat: toastKapat } = useToast();

  useEffect(() => {
    try {
      const kayitli = window.localStorage.getItem("fm_favoriler");
      if (kayitli) {
        const parsed = JSON.parse(kayitli);
        if (Array.isArray(parsed)) {
          const items = parsed
            .filter((item): item is string => typeof item === "string")
            .map(parseFavori)
            .filter((item): item is FavoriItem => item !== null);
          setFavoriler(items);
        }
      }
    } catch {
      // ignore
    }
    setYukleniyor(false);
  }, []);

  function sil(id: string) {
    setFavoriler((prev) => prev.filter((f) => f.id !== id));
    try {
      const kayitli = window.localStorage.getItem("fm_favoriler");
      if (kayitli) {
        const parsed = JSON.parse(kayitli);
        if (Array.isArray(parsed)) {
          const yeni = parsed.filter((item: string) => item !== id);
          window.localStorage.setItem("fm_favoriler", JSON.stringify(yeni));
        }
      }
    } catch {
      // ignore
    }
    toastGoster("Favoriden kaldırıldı", "bilgi");
  }

  async function kopyala(metin: string) {
    try {
      await navigator.clipboard.writeText(metin);
      toastGoster("Mesaj panoya kopyalandı", "basari");
    } catch {
      toastGoster("Kopyalanamadı", "hata");
    }
  }

  const tonEtiket = (id: Ton) => tonlar.find((t) => t.id === id)?.etiket || id;
  const asamaEtiket = (id: IliskiAsamasi) =>
    asamalar.find((a) => a.id === id)?.etiket || id;
  const hedefEtiket = (id: Hedef) =>
    hedefler.find((h) => h.id === id)?.etiket || id;

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950 sm:p-5">
      <div className="mx-auto min-h-screen sm:min-h-[calc(100vh-40px)] max-w-7xl overflow-hidden sm:rounded-[22px] border-0 sm:border border-slate-200 bg-white shadow-none sm:shadow-2xl shadow-slate-200/80">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-[#080c22] px-5 py-5 text-white">
          <Link href="/asistan" aria-label="Asistana dön">
            <BrandMark />
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/asistan"
              className="rounded-xl border border-white/15 px-4 py-2 text-sm text-slate-200 hover:bg-white/10 transition-colors"
            >
              ← Asistana Dön
            </Link>
          </div>
        </header>

        <div className="p-5 sm:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">
              Favorilerim
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Beğendiğin ve kaydettiğin mesajlar burada.
            </p>
          </div>

          {yukleniyor ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-pink-500" />
            </div>
          ) : favoriler.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-violet-100 text-3xl">
                ♡
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Henüz favori yok
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                Asistanda beğendiğin mesajların üzerindeki kalp ikonuna
                tıklayarak buraya kaydedebilirsin.
              </p>
              <Link
                href="/asistan"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-pink-200 hover:scale-[1.01] transition-transform"
              >
                Asistanı Aç
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {favoriler.map((favori, index) => (
                <article
                  key={favori.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="p-5">
                    <div className="mb-3 flex items-start gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-600 text-sm font-bold text-white">
                        {index + 1}
                      </span>
                      <p className="text-[15px] leading-7 text-slate-900">
                        {favori.mesaj}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pl-10">
                      <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600">
                        {tonEtiket(favori.ton)}
                      </span>
                      <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-600">
                        {asamaEtiket(favori.asama)}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        {hedefEtiket(favori.hedef)}
                      </span>
                    </div>
                  </div>

                  <div className="flex border-t border-slate-100">
                    <button
                      onClick={() => kopyala(favori.mesaj)}
                      className="flex flex-1 flex-col items-center justify-center gap-1 px-3 py-4 min-h-[56px] text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 active:bg-slate-100"
                      type="button"
                    >
                      <span className="text-xl">⧉</span>
                      Kopyala
                    </button>
                    <button
                      onClick={() => sil(favori.id)}
                      className="flex flex-1 flex-col items-center justify-center gap-1 border-l border-slate-100 px-3 py-4 min-h-[56px] text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 active:bg-red-100"
                      type="button"
                    >
                      <span className="text-xl">🗑</span>
                      Sil
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      <ToastContainer toasts={toasts} onKapat={toastKapat} />
    </main>
  );
}
