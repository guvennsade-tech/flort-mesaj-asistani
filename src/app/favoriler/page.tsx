"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "@/components/error-boundary";
import { MesajOnerisi } from "@/lib/types";
import { BrandMark } from "@/components/brand-mark";
import { ToastContainer, useToast } from "@/components/toast";
import { Heart, Copy, Trash2, ArrowRight } from "lucide-react";

function FavorilerContent() {
  const [favoriler, setFavoriler] = useState<MesajOnerisi[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const { toasts, goster: toastGoster, kapat: toastKapat } = useToast();

  useEffect(() => {
    try {
      const kayitli = window.localStorage.getItem("fm_favoriler");
      if (kayitli) {
        const parsed = JSON.parse(kayitli);
        if (Array.isArray(parsed)) {
          const valid = parsed.filter(
            (item: unknown) =>
              typeof item === "object" &&
              item !== null &&
              typeof (item as MesajOnerisi).mesaj === "string" &&
              typeof (item as MesajOnerisi).aciklama === "string"
          ) as MesajOnerisi[];
          setFavoriler(valid);
        }
      }
    } catch {
      window.localStorage.removeItem("fm_favoriler");
    }
    setYukleniyor(false);
  }, []);

  function sil(mesaj: string) {
    setFavoriler((prev) => prev.filter((f) => f.mesaj !== mesaj));
    try {
      const kayitli = window.localStorage.getItem("fm_favoriler");
      if (kayitli) {
        const parsed = JSON.parse(kayitli);
        if (Array.isArray(parsed)) {
          const yeni = parsed.filter(
            (item: MesajOnerisi) => item.mesaj !== mesaj
          );
          window.localStorage.setItem("fm_favoriler", JSON.stringify(yeni));
        }
      }
    } catch {
      // ignore
    }
    toastGoster("Favoriden kaldırıldı", "bilgi");
  }

  function tumunuSil() {
    if (!confirm("Tüm favorilerini silmek istediğine emin misin? Bu işlem geri alınamaz.")) return;
    setFavoriler([]);
    window.localStorage.removeItem("fm_favoriler");
    toastGoster("Tüm favoriler silindi", "bilgi");
  }

  async function kopyala(metin: string) {
    try {
      await navigator.clipboard.writeText(metin);
      toastGoster("Mesaj panoya kopyalandı", "basari");
    } catch {
      toastGoster("Kopyalanamadı", "hata");
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950 sm:p-5">
      <div className="mx-auto min-h-screen sm:min-h-[calc(100vh-40px)] max-w-7xl overflow-hidden sm:rounded-[22px] border-0 sm:border border-slate-200 bg-white shadow-none sm:shadow-2xl shadow-slate-200/80">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-[#080c22] px-5 py-5 text-white">
          <Link href="/asistan" aria-label="Asistana dön">
            <BrandMark />
          </Link>
          <div className="flex items-center gap-2">
            {favoriler.length > 0 && (
              <button
                onClick={tumunuSil}
                className="rounded-xl border border-white/15 px-4 py-2 text-sm text-red-200 hover:bg-red-500/20 transition-colors"
                type="button"
              >
                Tümünü Sil
              </button>
            )}
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
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <div className="animate-float mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-pink-100 via-violet-100 to-indigo-100 shadow-lg shadow-pink-100/50">
                <Heart className="h-10 w-10 text-pink-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Henüz favori yok
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-7 text-slate-500">
                Asistanda beğendiğin mesajların üzerindeki
                <br />
                kalp ikonuna tıklayarak buraya kaydedebilirsin.
              </p>
              <Link
                href="/asistan"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-pink-200 transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:shadow-[0_0_24px_rgba(236,72,153,0.3)] hover:-translate-y-px active:scale-[0.97]"
              >
                Asistanı Aç
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {favoriler.map((favori, index) => (
                <article
                  key={favori.mesaj}
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

                    {favori.aciklama && (
                      <p className="pl-10 text-sm leading-6 text-slate-500">
                        {favori.aciklama}
                      </p>
                    )}
                  </div>

                  <div className="flex border-t border-slate-100">
                    <button
                      onClick={() => kopyala(favori.mesaj)}
                      className="flex flex-1 flex-col items-center justify-center gap-1 px-3 py-4 min-h-[56px] text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 active:bg-slate-100"
                      type="button"
                    >
                      <Copy className="h-5 w-5" strokeWidth={1.5} />
                      Kopyala
                    </button>
                    <button
                      onClick={() => sil(favori.mesaj)}
                      className="flex flex-1 flex-col items-center justify-center gap-1 border-l border-slate-100 px-3 py-4 min-h-[56px] text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 active:bg-red-100"
                      type="button"
                    >
                      <Trash2 className="h-5 w-5" strokeWidth={1.5} />
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

export default function FavorilerPage() {
  return (
    <ErrorBoundary>
      <FavorilerContent />
    </ErrorBoundary>
  );
}
