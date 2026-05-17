"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Ton,
  IliskiAsamasi,
  Hedef,
  SohbetMesaji,
  MesajOnerisi,
  tonlar,
  asamalar,
  hedefler,
} from "@/lib/types";
import { MAX_EKLEME } from "@/lib/constants";
import { BrandMark } from "@/components/brand-mark";
import { ExplanationPanel } from "@/components/explanation-panel";
import { SelectionButton } from "@/components/selection-button";
import { SuggestionCard } from "@/components/suggestion-card";
import { ConversationInput } from "@/components/conversation-input";
import { EmptyStateGuide } from "@/components/empty-state-guide";
import { SuggestionSkeleton } from "@/components/suggestion-skeleton";
import { ToastContainer, useToast } from "@/components/toast";
import { navItems } from "@/lib/ui-data";

export function AssistantApp() {
  const [sohbet, setSohbet] = useState<SohbetMesaji[]>([]);
  const [eklemekIstedikleri, setEklemekIstedikleri] = useState("");
  const [ton, setTon] = useState<Ton>("esprili");
  const [asama, setAsama] = useState<IliskiAsamasi>("yazisiyoruz");
  const [hedef, setHedef] = useState<Hedef>("sohbeti_surdur");
  const [oneriler, setOneriler] = useState<MesajOnerisi[]>([]);
  const [yukleniyor, setYukleniyor] = useState(false);
  interface HataState {
    mesaj: string;
    tip: "rateLimit" | "baglanti" | "sunucu" | "input" | "genel";
    retryAfter?: number; // saniye
  }

  const [hata, setHata] = useState<HataState | null>(null);
  const [kalanSure, setKalanSure] = useState<number>(0);
  const [kopyalandi, setKopyalandi] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"iyi" | "kotu" | null>(null);
  const [favoriler, setFavoriler] = useState<string[]>([]);
  const { toasts, goster: toastGoster, kapat: toastKapat } = useToast();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const kayitliFavoriler = window.localStorage.getItem("fm_favoriler");
      if (kayitliFavoriler) {
        const parsed = JSON.parse(kayitliFavoriler);
        if (Array.isArray(parsed)) {
          setFavoriler(parsed.filter((item) => typeof item === "string"));
        }
      }
    } catch {
      window.localStorage.removeItem("fm_favoriler");
    }

    try {
      const kayitliSohbet = window.localStorage.getItem("fm_sohbet");
      if (kayitliSohbet) {
        const parsed = JSON.parse(kayitliSohbet);
        if (
          Array.isArray(parsed) &&
          parsed.every(
            (m) =>
              typeof m === "object" &&
              m !== null &&
              (m.gonderen === "sen" || m.gonderen === "o") &&
              typeof m.metin === "string"
          )
        ) {
          setSohbet(parsed);
        }
      }
    } catch {
      window.localStorage.removeItem("fm_sohbet");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("fm_favoriler", JSON.stringify(favoriler));
  }, [favoriler]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("fm_sohbet", JSON.stringify(sohbet));
  }, [sohbet]);

  /* Rate limit geri sayımı */
  useEffect(() => {
    if (hata?.tip !== "rateLimit" || !hata.retryAfter) return;
    setKalanSure(hata.retryAfter);
    const interval = setInterval(() => {
      setKalanSure((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setHata(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [hata]);

  function hataTipiBelirle(status: number): HataState["tip"] {
    if (status === 429) return "rateLimit";
    if (status >= 500) return "sunucu";
    if (status >= 400) return "input";
    return "genel";
  }

  async function oneriAl() {
    if (sohbet.length === 0) return;

    setYukleniyor(true);
    setHata(null);
    setOneriler([]);
    setFeedback(null);

    try {
      const res = await fetch("/api/oneri", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sohbet, eklemekIstedikleri, ton, asama, hedef }),
      });

      const data = await res.json();

      if (!res.ok) {
        const retryAfter = parseInt(res.headers.get("Retry-After") || "", 10);
        const tip = hataTipiBelirle(res.status);
        setHata({
          mesaj: data.hata || "Bir hata oluştu.",
          tip,
          retryAfter: Number.isFinite(retryAfter) ? retryAfter : undefined,
        });
        return;
      }

      setOneriler(data.oneriler);

      /* Geçmişe kaydet */
      try {
        const yeniKayit = {
          id: Date.now().toString(),
          tarih: new Date().toISOString(),
          sohbet,
          ton,
          asama,
          hedef,
          oneriler: data.oneriler,
        };
        const mevcut = window.localStorage.getItem("fm_gecmis");
        const liste = mevcut ? JSON.parse(mevcut) : [];
        const yeniListe = [yeniKayit, ...liste].slice(0, 50);
        window.localStorage.setItem("fm_gecmis", JSON.stringify(yeniListe));
      } catch {
        // ignore
      }
    } catch {
      setHata({
        mesaj: "İnternet bağlantın kesik gibi görünüyor. Kontrol edip tekrar dene.",
        tip: "baglanti",
      });
    } finally {
      setYukleniyor(false);
    }
  }

  async function kopyala(metin: string, index: number) {
    try {
      await navigator.clipboard.writeText(metin);
      setKopyalandi(index);
      toastGoster("Mesaj panoya kopyalandı", "basari");
      setTimeout(() => setKopyalandi(null), 2000);
    } catch {
      toastGoster("Kopyalanamadı. Manuel olarak seçip kopyalayabilirsiniz.", "hata");
    }
  }

  async function geriBildirimGonder(deger: "iyi" | "kotu") {
    setFeedback(deger);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deger, ton, asama, hedef }),
      });
    } catch {
      setFeedback(null);
      setHata({
        mesaj: "Geri bildirimin kaydedilemedi, ama merak etme, önemli değil.",
        tip: "baglanti",
      });
    }
  }

  function favoriId(onerilenMesaj: string) {
    return `${ton}:${asama}:${hedef}:${onerilenMesaj}`;
  }

  function favoriDegistir(id: string) {
    setFavoriler((mevcut) =>
      mevcut.includes(id)
        ? mevcut.filter((item) => item !== id)
        : [...mevcut, id]
    );
  }

  const hazir = sohbet.length > 0;
  const seciliTon = tonlar.find((item) => item.id === ton);
  const seciliAsama = asamalar.find((item) => item.id === asama);
  const seciliHedef = hedefler.find((item) => item.id === hedef);
  const ilkOneri = oneriler[0];

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950 sm:p-5">
      <div className="mx-auto flex min-h-screen sm:min-h-[calc(100vh-40px)] max-w-7xl overflow-hidden sm:rounded-[22px] border-0 sm:border border-slate-200 bg-white shadow-none sm:shadow-2xl shadow-slate-200/80">
        {/* Sidebar */}
        <aside className="hidden w-24 shrink-0 flex-col items-center bg-[#070b20] px-3 py-5 text-white lg:flex">
          <Link href="/" className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-pink-400/50 bg-white/5 text-2xl text-pink-300 hover:bg-white/10 transition-colors" aria-label="Ana sayfa">
            ♡
          </Link>
          <nav className="flex flex-1 flex-col items-center gap-4">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return item.disabled ? (
                <button
                  key={item.label}
                  disabled
                  className="flex w-full flex-col items-center gap-2 rounded-2xl py-3 text-[11px] cursor-not-allowed text-slate-500 transition-colors"
                  title="Yakında"
                  type="button"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                  <span className="text-[10px]">Yakında</span>
                </button>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex w-full flex-col items-center gap-2 rounded-2xl py-3 text-[11px] transition-colors ${
                    active
                      ? "bg-pink-500/20 text-pink-300"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                  title={item.label}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="flex flex-col gap-4 border-b border-slate-200 bg-[#080c22] px-5 py-5 text-white sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" aria-label="Ana sayfaya dön">
              <BrandMark />
            </Link>
            <div className="hidden sm:flex flex-wrap items-center gap-2">
              <Link
                href="/favoriler"
                className={`rounded-xl border border-white/15 px-4 py-2 text-sm transition-colors ${
                  pathname === "/favoriler"
                    ? "bg-white/10 text-white"
                    : "text-slate-200 hover:bg-white/10"
                }`}
              >
                ♡ Favoriler
              </Link>
              <Link
                href="/gecmis"
                className={`rounded-xl border border-white/15 px-4 py-2 text-sm transition-colors ${
                  pathname === "/gecmis"
                    ? "bg-white/10 text-white"
                    : "text-slate-200 hover:bg-white/10"
                }`}
              >
                ↺ Geçmiş
              </Link>
            </div>
          </header>

          <div className="grid flex-1 grid-cols-1 lg:grid-cols-[0.92fr_1.08fr]">
            {/* Sol panel — input */}
            <section className="border-b border-slate-200 bg-white p-5 lg:border-b-0 lg:border-r lg:p-8">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Yeni mesaj
                  </p>
                  <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
                    Mesajını parlat
                  </h1>
                </div>
                <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600">
                  AI destekli
                </span>
              </div>

              {/* Sohbet geçmişi */}
              <div className="mb-5">
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Sohbet geçmişi
                </label>
                <p className="mb-3 text-xs leading-5 text-slate-500">
                  Karşı tarafın ve kendi mesajlarını kronolojik sırayla ekle.
                  Ne kadar çok bağlam verirsen, o kadar doğal öneriler alırsın.
                  <span className="ml-1 text-slate-400">(en fazla 10 mesaj)</span>
                </p>
                <ConversationInput
                  mesajlar={sohbet}
                  onChange={setSohbet}
                />
              </div>

              {/* Opsiyonel not */}
              <div className="mb-6">
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Eklemek istediğin bir şey var mı?
                  <span className="ml-1.5 font-normal text-slate-400">(opsiyonel)</span>
                </label>
                <p className="mb-3 text-xs leading-5 text-slate-500">
                  AI'a ek talimat ver. Örneğin: "hafif espri olsun", "daha kısa olsun",
                  "karşı tarafın ilgisini çeksin" gibi.
                </p>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-inner shadow-slate-100">
                  <textarea
                    value={eklemekIstedikleri}
                    onChange={(e) => setEklemekIstedikleri(e.target.value)}
                    placeholder="Örn: çok uzun olmasın, karşı tarafı sıkmayalım"
                    className="min-h-[52px] w-full resize-none bg-transparent text-[14px] leading-6 text-slate-900 outline-none placeholder:text-slate-400"
                    maxLength={MAX_EKLEME}
                  />
                  <div className="text-right text-xs font-medium text-slate-400">
                    {eklemekIstedikleri.length}/{MAX_EKLEME}
                  </div>
                </div>
              </div>

              {/* Seçimler */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">
                    Ton
                  </label>
                    <p className="mb-3 text-xs leading-5 text-slate-500">
                    Cevabın genel havası nasıl olsun?
                  </p>
                  <div className="flex flex-col gap-2">
                    {tonlar.map((item) => (
                      <SelectionButton
                        key={item.id}
                        onClick={() => setTon(item.id)}
                        active={ton === item.id}
                        tone="pink"
                      >
                        <span className="mr-2">{item.emoji}</span>
                        {item.etiket}
                      </SelectionButton>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">
                    İlişki Aşaması
                  </label>
                  <p className="mb-3 text-xs leading-5 text-slate-500">
                    Karşı tarafla ne durumdasınız?
                  </p>
                  <div className="flex flex-col gap-2">
                    {asamalar.map((item) => (
                      <SelectionButton
                        key={item.id}
                        onClick={() => setAsama(item.id)}
                        active={asama === item.id}
                        tone="violet"
                      >
                        <span className="mr-2">{item.emoji}</span>
                        {item.etiket}
                      </SelectionButton>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Ne yapmak istiyorsun?
                </label>
                <p className="mb-3 text-xs leading-5 text-slate-500">
                  Bu mesajın amacı ne? AI buna göre yönlendirecek.
                </p>
                <div className="flex flex-wrap gap-2">
                  {hedefler.map((item) => (
                    <SelectionButton
                      key={item.id}
                      onClick={() => setHedef(item.id)}
                      active={hedef === item.id}
                      tone="dark"
                      compact
                    >
                      {item.etiket}
                    </SelectionButton>
                  ))}
                </div>
              </div>

              {/* CTA */}
                <div className="mt-7 flex gap-3">
                <button
                  onClick={oneriAl}
                  disabled={!hazir || yukleniyor}
                  className={`flex min-h-[56px] sm:min-h-14 flex-1 items-center justify-center rounded-2xl px-5 text-base font-bold text-white transition-all active:scale-[0.98] ${
                    hazir && !yukleniyor
                      ? "bg-gradient-to-r from-pink-500 to-violet-600 shadow-lg shadow-pink-200 sm:hover:scale-[1.01]"
                      : "cursor-not-allowed bg-slate-300"
                  }`}
                  type="button"
                >
                  {yukleniyor ? "Öneriler hazırlanıyor..." : "✦ Mesajı Parlat"}
                </button>
              </div>

              {hata && (
                <div className={`mt-5 rounded-2xl border p-4 ${
                  hata.tip === "rateLimit"
                    ? "border-amber-200 bg-amber-50"
                    : hata.tip === "input"
                      ? "border-amber-200 bg-amber-50"
                      : "border-red-200 bg-red-50"
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                    <span className="text-xl shrink-0">
                      {hata.tip === "rateLimit"
                        ? "⏳"
                        : hata.tip === "baglanti"
                          ? "📡"
                          : "⚠️"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${
                        hata.tip === "rateLimit" || hata.tip === "input"
                          ? "text-amber-800"
                          : "text-red-700"
                      }`}>
                        {hata.mesaj}
                      </p>
                      {hata.tip === "rateLimit" && kalanSure > 0 && (
                        <p className="mt-1 text-xs font-semibold text-amber-700">
                          {Math.floor(kalanSure / 60)}:{String(kalanSure % 60).padStart(2, "0")} sonra tekrar deneyebilirsiniz.
                        </p>
                      )}
                      {hata.tip === "baglanti" && (
                        <p className="mt-1 text-xs text-red-600">
                          Bağlantınızı kontrol edin ve tekrar deneyin.
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 shrink-0 mt-2 sm:mt-0">
                      {hata.tip !== "rateLimit" && (
                        <button
                          onClick={oneriAl}
                          disabled={yukleniyor}
                          className="rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-200 transition-colors disabled:opacity-50 min-h-[44px]"
                          type="button"
                        >
                          {yukleniyor ? "Yükleniyor..." : "Tekrar Dene"}
                        </button>
                      )}
                      <button
                        onClick={() => setHata(null)}
                        className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100 transition-colors min-h-[44px]"
                        type="button"
                        aria-label="Hata mesajını kapat"
                      >
                        Kapat
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                <p className="flex items-start gap-2 text-xs leading-5 text-emerald-700">
                  <span className="text-base shrink-0">🔒</span>
                  <span>
                    <span className="font-semibold">Mesajlarınız gizli:</span>{" "}
                    Sohbet geçmişiniz sunucularımızda saklanmıyor. AI'a anlık
                    olarak iletilip cevap üretildikten sonra otomatik olarak
                    siliniyor.
                  </span>
                </p>
              </div>

              <p className="mt-4 text-xs leading-5 text-slate-500">
                +18, baskı kuran veya manipülatif içerikler desteklenmez.
                Hesap oluşturmadan kullanabilirsiniz.
              </p>
            </section>

            {/* Sağ panel — öneriler */}
            <section className="bg-slate-50 p-5 lg:p-8">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    {yukleniyor && oneriler.length > 0
                      ? "Yeni alternatifler hazırlanıyor..."
                      : oneriler.length > 0
                        ? `${oneriler.length} alternatif bulundu`
                        : "Hazır olduğunda burada görünecek"}
                  </p>
                  <h2 className="mt-1 text-2xl font-bold tracking-tight">
                    Öneriler
                  </h2>
                </div>
                <div className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600">
                  {seciliTon?.etiket} · {seciliAsama?.etiket}
                </div>
              </div>

              {yukleniyor && oneriler.length === 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-2 w-2 rounded-full bg-pink-500 animate-ping" />
                    <p className="text-sm font-semibold text-slate-500">
                      Öneriler hazırlanıyor...
                    </p>
                  </div>
                  <SuggestionSkeleton count={3} />
                </div>
              ) : oneriler.length === 0 ? (
                <div className="min-h-[280px] sm:min-h-[420px]">
                  <EmptyStateGuide sohbetVarMi={sohbet.length > 0} />
                </div>
              ) : (
                <div className="space-y-4">
                  {oneriler.map((item, index) => {
                    const kayitId = favoriId(item.mesaj);
                    const favoriMi = favoriler.includes(kayitId);

                    return (
                      <SuggestionCard
                        key={`${item.mesaj}-${index}`}
                        index={index}
                        suggestion={item}
                        toneLabel={seciliTon?.etiket}
                        stageLabel={seciliAsama?.etiket}
                        copied={kopyalandi === index}
                        favorite={favoriMi}
                        onCopy={() => kopyala(item.mesaj, index)}
                        onRegenerate={oneriAl}
                        onToggleFavorite={() => favoriDegistir(kayitId)}
                      />
                    );
                  })}

                  <button
                    onClick={oneriAl}
                    disabled={!hazir || yukleniyor}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 min-h-[48px]"
                    type="button"
                  >
                    {yukleniyor ? (
                      <>
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Yeni alternatifler hazırlanıyor...
                      </>
                    ) : (
                      <>
                        Daha fazla alternatif göster
                        <span>⌄</span>
                      </>
                    )}
                  </button>

                  {ilkOneri && (
                    <ExplanationPanel
                      toneLabel={seciliTon?.etiket}
                      stageLabel={seciliAsama?.etiket}
                      goalLabel={seciliHedef?.etiket}
                      goalDescription={seciliHedef?.aciklama}
                    />
                  )}

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="text-sm font-bold text-slate-800">
                      Bu öneriler işine yaradı mı?
                    </p>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => geriBildirimGonder("iyi")}
                        disabled={feedback !== null}
                        className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                          feedback === "iyi"
                            ? "bg-emerald-600 text-white"
                            : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 disabled:opacity-60"
                        }`}
                        type="button"
                      >
                        Evet
                      </button>
                      <button
                        onClick={() => geriBildirimGonder("kotu")}
                        disabled={feedback !== null}
                        className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                          feedback === "kotu"
                            ? "bg-red-600 text-white"
                            : "bg-red-50 text-red-700 hover:bg-red-100 disabled:opacity-60"
                        }`}
                        type="button"
                      >
                        Hayır
                      </button>
                    </div>
                    {feedback && (
                      <p className="mt-3 text-xs text-slate-500">
                        Teşekkürler, geri bildirimin anonim olarak alındı.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </section>
          </div>
        </section>
      </div>
      <ToastContainer toasts={toasts} onKapat={toastKapat} />
    </main>
  );
}
