"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "@/components/error-boundary";
import {
  Ton,
  IliskiAsamasi,
  Hedef,
  SohbetMesaji,
  MesajOnerisi,
  GecmisKaydi,
  tonlar,
  asamalar,
  hedefler,
} from "@/lib/types";
import { BrandMark } from "@/components/brand-mark";
import { ToastContainer, useToast } from "@/components/toast";
import { RotateCcw, ChevronDown, Copy, Trash2, ArrowRight } from "lucide-react";

function formatTarih(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("tr-TR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function GecmisContent() {
  const [gecmis, setGecmis] = useState<GecmisKaydi[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [acikId, setAcikId] = useState<string | null>(null);
  const { toasts, goster: toastGoster, kapat: toastKapat } = useToast();

  useEffect(() => {
    try {
      const kayitli = window.localStorage.getItem("fm_gecmis");
      if (kayitli) {
        const parsed = JSON.parse(kayitli);
        if (Array.isArray(parsed)) {
          const valid = parsed
            .filter(
              (item: unknown): item is GecmisKaydi =>
                typeof item === "object" &&
                item !== null &&
                typeof (item as GecmisKaydi).id === "string" &&
                typeof (item as GecmisKaydi).tarih === "string" &&
                Array.isArray((item as GecmisKaydi).sohbet) &&
                Array.isArray((item as GecmisKaydi).oneriler)
            )
            .slice(0, 50);
          setGecmis(valid);
        }
      }
    } catch {
      window.localStorage.removeItem("fm_gecmis");
    }
    setYukleniyor(false);
  }, []);

  function sil(id: string) {
    setGecmis((prev) => prev.filter((g) => g.id !== id));
    try {
      const kayitli = window.localStorage.getItem("fm_gecmis");
      if (kayitli) {
        const parsed = JSON.parse(kayitli);
        if (Array.isArray(parsed)) {
          const yeni = parsed.filter((item: GecmisKaydi) => item.id !== id);
          window.localStorage.setItem("fm_gecmis", JSON.stringify(yeni));
        }
      }
    } catch {
      // ignore
    }
    toastGoster("Geçmişten silindi", "bilgi");
  }

  function tumunuSil() {
    if (!confirm("Tüm geçmiş kayıtlarını silmek istediğine emin misin? Bu işlem geri alınamaz.")) return;
    setGecmis([]);
    window.localStorage.removeItem("fm_gecmis");
    toastGoster("Tüm geçmiş silindi", "bilgi");
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
            {gecmis.length > 0 && (
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
              Geçmiş
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Daha önce aldığın AI önerileri burada. En yeniden en eskiye sıralı.
            </p>
          </div>

          {yukleniyor ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-pink-500" />
            </div>
          ) : gecmis.length === 0 ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <div className="animate-float mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-100 via-pink-100 to-indigo-100 shadow-lg shadow-violet-100/50">
                <RotateCcw className="h-10 w-10 text-violet-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Henüz geçmiş yok
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-7 text-slate-500">
                Asistanda öneri aldıkça burada listelenecek.
                <br />
                En fazla 50 kayıt tutulur.
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
              {gecmis.map((kayit) => {
                const acik = acikId === kayit.id;
                const sohbetOzeti = kayit.sohbet
                  .map((m) => `${m.gonderen === "o" ? "O" : "Sen"}: ${m.metin}`)
                  .join(" · ");
                return (
                  <article
                    key={kayit.id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                  >
                    <button
                      onClick={() => setAcikId(acik ? null : kayit.id)}
                      className="flex w-full items-start justify-between gap-4 p-5 text-left transition-colors hover:bg-slate-50"
                      type="button"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600">
                            {tonEtiket(kayit.ton)}
                          </span>
                          <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-600">
                            {asamaEtiket(kayit.asama)}
                          </span>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                            {hedefEtiket(kayit.hedef)}
                          </span>
                          <span className="text-xs text-slate-400">
                            {formatTarih(kayit.tarih)}
                          </span>
                        </div>
                        <p className="truncate text-sm text-slate-600">
                          {sohbetOzeti || "Sohbet geçmişi yok"}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 text-slate-400 transition-transform ${
                          acik ? "rotate-180" : ""
                        }`}
                      >
                        <ChevronDown className="h-5 w-5" strokeWidth={2} />
                      </span>
                    </button>

                    {acik && (
                      <div className="border-t border-slate-100 p-5">
                        <div className="mb-4 space-y-3">
                          {kayit.oneriler.map((oneri, idx) => (
                            <div
                              key={idx}
                              className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                            >
                              <div className="flex items-start gap-3">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-600 text-sm font-bold text-white">
                                  {idx + 1}
                                </span>
                                <div className="min-w-0 flex-1">
                                  <p className="text-[15px] leading-7 text-slate-900">
                                    {oneri.mesaj}
                                  </p>
                                  {oneri.aciklama && (
                                    <p className="mt-1 text-xs leading-5 text-slate-500">
                                      {oneri.aciklama}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="mt-3 flex justify-end">
                                <button
                                  onClick={() => kopyala(oneri.mesaj)}
                                  className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors"
                                  type="button"
                                >
                                  <Copy className="h-3.5 w-3.5" strokeWidth={2} /> Kopyala
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-end">
                          <button
                            onClick={() => sil(kayit.id)}
                            className="rounded-xl px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                            type="button"
                          >
                            <Trash2 className="h-4 w-4" strokeWidth={2} /> Bu kaydı sil
                          </button>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <ToastContainer toasts={toasts} onKapat={toastKapat} />
    </main>
  );
}

export default function GecmisPage() {
  return (
    <ErrorBoundary>
      <GecmisContent />
    </ErrorBoundary>
  );
}
