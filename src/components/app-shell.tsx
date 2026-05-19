"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import {
  Ton,
  IliskiAsamasi,
  Hedef,
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
import { AiLoading } from "@/components/ai-loading";
import { ToastContainer, useToast } from "@/components/toast";
import { navItems } from "@/lib/ui-data";
import { motion } from "framer-motion";
import { Heart, RotateCcw, Clock, WifiOff, AlertTriangle, Lock, Sparkles } from "lucide-react";

import { useSohbet } from "@/hooks/use-sohbet";
import { useFavoriler } from "@/hooks/use-favoriler";
import { useOneriler } from "@/hooks/use-oneriler";
import { useClipboard } from "@/hooks/use-clipboard";
import { useGeriBildirim } from "@/hooks/use-geri-bildirim";

export function AssistantApp() {
  /* UI state */
  const [eklemekIstedikleri, setEklemekIstedikleri] = useState("");
  const [ton, setTon] = useState<Ton>("esprili");
  const [asama, setAsama] = useState<IliskiAsamasi>("yazisiyoruz");
  const [hedef, setHedef] = useState<Hedef>("sohbeti_surdur");
  const { toasts, goster: toastGoster, kapat: toastKapat } = useToast();
  const pathname = usePathname();

  /* Custom hooks */
  const { sohbet, setSohbet, ornekYukle, sohbetTemizle } = useSohbet();
  const { favoriler, favoriDegistir } = useFavoriler(toastGoster);
  const {
    oneriler,
    yukleniyor,
    hata,
    kalanSure,
    sonuclarRef,
    oneriAl,
    hataKapat,
  } = useOneriler(toastGoster);
  const { kopyalandi, kopyala } = useClipboard(toastGoster);
  const { feedback, geriBildirimGonder, resetFeedback } = useGeriBildirim(hataKapat);

  /* Memoized */
  const hazir = sohbet.length > 0;
  const seciliTon = tonlar.find((item) => item.id === ton);
  const seciliAsama = asamalar.find((item) => item.id === asama);
  const seciliHedef = hedefler.find((item) => item.id === hedef);
  const ilkOneri = oneriler[0];

  /* Handlers */
  async function handleOneriAl() {
    resetFeedback();
    await oneriAl(sohbet, eklemekIstedikleri, ton, asama, hedef);
  }

  async function handleGeriBildirim(deger: "iyi" | "kotu") {
    await geriBildirimGonder(deger, ton, asama, hedef);
  }

  function handleOrnekYukle() {
    ornekYukle();
    setAsama("yazisiyoruz");
    setHedef("sohbeti_surdur");
    toastGoster("Örnek sohbet yüklendi. Şimdi ton seçip öneri alabilirsin.", "bilgi");
  }

  return (
    <main className="relative min-h-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-5%,rgba(168,85,247,0.07),transparent_50%),radial-gradient(ellipse_80%_80%_at_80%_80%,rgba(236,72,153,0.05),transparent_50%),#f5f7fb] text-slate-950 sm:p-5 overflow-hidden">
      {/* Aurora — animated soft gradient base */}
      <div className="pointer-events-none fixed inset-0 -z-10 aurora-bg" />

      {/* Floating blobs — assistant page */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="animate-blob absolute -left-10 top-1/4 h-80 w-80 rounded-full bg-violet-200/30 blur-[90px]" />
        <div className="animate-blob-2 absolute -right-10 top-1/3 h-80 w-80 rounded-full bg-pink-200/25 blur-[90px]" />
        <div className="animate-blob-3 absolute left-1/4 bottom-1/4 h-72 w-72 rounded-full bg-indigo-200/20 blur-[90px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen sm:min-h-[calc(100vh-40px)] max-w-7xl overflow-hidden sm:rounded-[22px] border-0 sm:border border-slate-200 bg-white/80 backdrop-blur-xl shadow-none sm:shadow-2xl shadow-slate-200/80">
        {/* Sidebar */}
        <aside className="hidden w-24 shrink-0 flex-col items-center bg-[#070b20] px-3 py-5 text-white lg:flex">
          <Link href="/" className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-pink-400/50 bg-white/5 text-pink-300 hover:bg-white/10 transition-colors" aria-label="Ana sayfa">
            <Heart className="h-6 w-6" strokeWidth={1.5} />
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
                  <span className="text-xl"><item.icon className="h-5 w-5" strokeWidth={1.5} /></span>
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
                  <span className="text-xl"><item.icon className="h-5 w-5" strokeWidth={1.5} /></span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Mobile bottom nav */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-slate-200 bg-white/95 backdrop-blur-sm px-1 py-1 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_12px_rgba(0,0,0,0.08)] lg:hidden">
          {navItems
            .filter((item) => !item.disabled)
            .map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 text-[10px] font-semibold transition-colors ${
                    active
                      ? "text-pink-600"
                      : "text-slate-400 active:text-slate-600"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute inset-0.5 rounded-lg bg-pink-50"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 text-lg"><item.icon className="h-5 w-5" strokeWidth={1.5} /></span>
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
        </nav>

        <section className="flex min-w-0 flex-1 flex-col pb-16 lg:pb-0">
          {/* Header */}
          <header className="flex flex-col gap-4 border-b border-slate-200 bg-[#080c22] px-5 py-5 text-white sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" aria-label="Ana sayfaya dön">
              <BrandMark />
            </Link>
            <div className="hidden sm:flex flex-wrap items-center gap-2">
              <Link
                href="/favoriler"
                className={`inline-flex items-center gap-1.5 rounded-xl border border-white/15 px-4 py-2 text-sm transition-colors ${
                  pathname === "/favoriler"
                    ? "bg-white/10 text-white"
                    : "text-slate-200 hover:bg-white/10"
                }`}
              >
                <Heart className="h-4 w-4" strokeWidth={1.5} /> Favoriler
              </Link>
              <Link
                href="/gecmis"
                className={`inline-flex items-center gap-1.5 rounded-xl border border-white/15 px-4 py-2 text-sm transition-colors ${
                  pathname === "/gecmis"
                    ? "bg-white/10 text-white"
                    : "text-slate-200 hover:bg-white/10"
                }`}
              >
                <RotateCcw className="h-4 w-4" strokeWidth={1.5} /> Geçmiş
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

                {/* Gizlilik rozeti */}
                <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 flex gap-2.5">
                  <Lock className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" strokeWidth={2} />
                  <p className="text-xs text-emerald-700 leading-5">
                    <span className="font-semibold">Mesajların güvende:</span>{" "}
                    Sohbet geçmişin bize ulaşmıyor, AI'a anlık iletilip siliniyor.
                  </p>
                </div>
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
                    onChange={(e) => {
                      setEklemekIstedikleri(e.target.value);
                      e.target.style.height = "auto";
                      e.target.style.height = e.target.scrollHeight + "px";
                    }}
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
                  onClick={handleOneriAl}
                  disabled={!hazir || yukleniyor}
                  className={`flex min-h-[56px] sm:min-h-14 flex-1 items-center justify-center rounded-2xl px-5 text-base font-bold select-none transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                    hazir && !yukleniyor
                      ? "bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-lg shadow-pink-200 gen-gradient hover:shadow-[0_0_32px_rgba(236,72,153,0.35)] hover:-translate-y-0.5 active:scale-[0.94] active:translate-y-0 active:duration-75"
                      : "cursor-not-allowed bg-gradient-to-r from-slate-300 to-slate-400 text-white/80"
                  }`}
                  type="button"
                >
                  {yukleniyor ? (
                    "Öneriler hazırlanıyor..."
                  ) : (
                    <span className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" strokeWidth={2} />
                      Mesajı Parlat
                    </span>
                  )}
                </button>
              </div>

              {!hazir && (
                <p className="mt-2 text-xs text-slate-400 text-center">
                  Öneri almak için en az bir mesaj ekleyin.
                </p>
              )}

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
                        ? <Clock className="h-6 w-6 text-amber-500" />
                        : hata.tip === "baglanti"
                          ? <WifiOff className="h-6 w-6 text-red-500" />
                          : <AlertTriangle className="h-6 w-6 text-red-500" />}
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
                          onClick={handleOneriAl}
                          disabled={yukleniyor}
                          className="rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-200 transition-colors disabled:opacity-50 min-h-[44px]"
                          type="button"
                        >
                          {yukleniyor ? "Yükleniyor..." : "Tekrar Dene"}
                        </button>
                      )}
                      <button
                        onClick={hataKapat}
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

              <p className="mt-4 text-xs leading-5 text-slate-500">
                +18, baskı kuran veya manipülatif içerikler desteklenmez.
                Hesap oluşturmadan kullanabilirsiniz.
              </p>
              <div className="mt-2">
                <Link
                  href="/gizlilik"
                  className="text-xs text-slate-400 underline hover:text-slate-600 transition-colors"
                >
                  Gizlilik Politikası
                </Link>
              </div>
            </section>

            {/* Sağ panel — öneriler */}
            <section ref={sonuclarRef} className="bg-slate-50 p-5 lg:p-8">
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
                <AiLoading stage="thinking" />
              ) : oneriler.length === 0 ? (
                <div className="min-h-[280px] sm:min-h-[420px]">
                  <EmptyStateGuide
                    sohbetVarMi={sohbet.length > 0}
                    onOrnekYukle={handleOrnekYukle}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  {oneriler.map((item, index) => {
                    const favoriMi = favoriler.some((f) => f.mesaj === item.mesaj);

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
                        onRegenerate={handleOneriAl}
                        onToggleFavorite={() => favoriDegistir(item.mesaj, item.aciklama)}
                      />
                    );
                  })}

                  <button
                    onClick={handleOneriAl}
                    disabled={!hazir || yukleniyor}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 select-none transition-all duration-150 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-slate-50 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:-translate-y-px active:scale-[0.96] active:translate-y-0 active:duration-75 disabled:cursor-not-allowed disabled:opacity-60 min-h-[48px]"
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
                        onClick={() => handleGeriBildirim("iyi")}
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
                        onClick={() => handleGeriBildirim("kotu")}
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
