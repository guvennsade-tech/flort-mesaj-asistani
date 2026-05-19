"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Lock, ChevronDown } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { FeatureCard } from "@/components/feature-card";
import { PhoneMockup } from "@/components/phone-mockup";
import { MiniDemo } from "@/components/mini-demo";
import { featureItems } from "@/lib/ui-data";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const steps = [
  {
    step: "1",
    title: "Sohbet geçmişini ekle",
    desc: "Karşı tarafın ve kendi mesajlarını kronolojik sırayla gir. Ne kadar çok bağlam verirsen, o kadar doğal öneriler alırsın.",
    color: "from-pink-500 to-rose-500",
  },
  {
    step: "2",
    title: "Ton ve aşama seç",
    desc: "Samimi, esprili ya da romantik? Yeni tanıştık mı yoksa yazışıyor muyuz? Seçimlerine göre AI kişiselleştirilmiş cevaplar üretir.",
    color: "from-violet-500 to-purple-500",
  },
  {
    step: "3",
    title: "Öneriyi al ve kopyala",
    desc: "3 farklı mesaj alternatifi arasından beğendiğini tek dokunuşla panoya kopyala. Uygulamadan çıkmana gerek kalmaz.",
    color: "from-indigo-500 to-blue-500",
  },
];

interface LandingContentProps {
  faqs: { question: string; answer: string }[];
}

export function LandingContent({ faqs }: LandingContentProps) {
  return (
    <main className="relative min-h-screen bg-[#f5f7fb] text-slate-950 overflow-hidden">
      {/* Floating blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="animate-blob absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-violet-300/20 blur-[100px]" />
        <div className="animate-blob-2 absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-pink-300/20 blur-[100px]" />
        <div className="animate-blob-3 absolute left-1/3 bottom-1/4 h-80 w-80 rounded-full bg-indigo-300/15 blur-[100px]" />
      </div>

      {/* Aurora — soft animated gradient */}
      <div className="pointer-events-none fixed inset-0 -z-10 aurora-bg" />

      {/* ---------- HERO (dark) ---------- */}
      <section className="relative isolate overflow-hidden bg-[#070b20] px-5 py-5 text-white sm:px-8 sm:py-7">
        {/* Animated background layers */}
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_78%_25%,rgba(236,72,153,0.36),transparent_28%),radial-gradient(circle_at_58%_38%,rgba(124,58,237,0.42),transparent_30%),linear-gradient(135deg,#070b20_0%,#11153a_58%,#170723_100%)]" />
        
        {/* Floating orbs */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-pink-500/20 blur-[100px] animate-float-slow" />
          <div className="absolute -left-20 top-1/3 h-64 w-64 rounded-full bg-violet-500/15 blur-[100px] animate-float-slow [animation-delay:2s]" />
          <div className="absolute right-1/4 bottom-1/4 h-48 w-48 rounded-full bg-indigo-500/10 blur-[80px] animate-float-slow [animation-delay:4s]" />
        </div>

        <div className="mx-auto max-w-7xl">
          <motion.header
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-between gap-4"
          >
            <BrandMark glow />
            <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
              <a href="#demo" className="hover:text-white transition-colors">
                Hemen Dene
              </a>
              <a href="#ozellikler" className="hover:text-white transition-colors">
                Özellikler
              </a>
              <a href="#nasil-calisir" className="hover:text-white transition-colors">
                Nasıl Çalışır?
              </a>
              <a href="#sss" className="hover:text-white transition-colors">
                S.S.S.
              </a>
              <Link
                href="/asistan"
                className="rounded-xl border border-pink-400/70 px-4 py-2 text-pink-200 hover:bg-pink-500/10 transition-colors"
              >
                Asistanı Aç
              </Link>
            </nav>
          </motion.header>

          <div className="grid items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
            <section>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-lg font-bold leading-[1.05] tracking-[-0.02em] text-[clamp(2rem,5vw,3rem)]"
                style={{ textWrap: "balance" }}
              >
                Mesaja ne cevap
                <span className="block bg-gradient-to-r from-violet-300 to-pink-400 bg-clip-text text-transparent">
                  vereceğini bilemiyor musun?
                </span>
                <span className="inline-block h-[0.7em] w-0.5 bg-pink-400 animate-hero-cursor ml-1 align-middle" />
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300"
              >
                Sevgiliye ne yazılır? Flört mesajı önerisi mi arıyorsun?
                Mesajını yapıştır, AI sana bağlama uygun 3 farklı cevap
                alternatifi hazırlasın. Kopyala, gönder, hazır.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2"
              >
                <Lock className="h-4 w-4 text-emerald-300" strokeWidth={2} />
                <span className="text-sm font-medium text-emerald-300">
                  Mesajlarınız saklanmıyor. Anlık işlenip siliniyor.
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7"
              >
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link
                    href="/asistan"
                    className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 px-8 text-base font-black text-white shadow-[0_18px_45px_rgba(217,70,239,0.35)] hover:shadow-[0_24px_60px_rgba(217,70,239,0.45)]"
                  >
                    <Sparkles className="h-5 w-5" strokeWidth={2} /> Mesajını Parlatmaya Başla
                  </Link>
                </motion.div>
              </motion.div>
            </section>

            <section className="hidden justify-center lg:flex" aria-label="Telefon önizlemesi">
              <PhoneMockup />
            </section>
          </div>
        </div>
      </section>

      {/* ---------- MINI DEMO ---------- */}
      <motion.section
        {...fadeIn}
        id="demo"
        className="px-5 py-14 sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Tek mesajla başla
            </h2>
            <p className="mt-2 text-slate-500">
              Aşağıya karşı tarafın mesajını yaz, AI hemen 3 alternatif
              hazırlasın.
            </p>
          </div>
          <MiniDemo />
        </div>
      </motion.section>

      {/* ---------- ÖZELLİKLER ---------- */}
      <section id="ozellikler" className="bg-white px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeIn} className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Neden Flört Mesajı Asistanı?
            </h2>
            <p className="mt-2 text-slate-500">
              Sadece mesaj önerisi değil, sohbetinin akışını koruyan bir
              yardımcı.
            </p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-3"
          >
            {featureItems.map((item) => (
              <motion.div key={item.title} variants={staggerItem}>
                <FeatureCard
                  title={item.title}
                  text={item.text}
                  icon={item.icon}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------- NASIL ÇALIŞIR ---------- */}
      <section
        id="nasil-calisir"
        className="bg-[#f5f7fb] px-5 py-14 sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeIn} className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Nasıl çalışır?
            </h2>
            <p className="mt-2 text-slate-500">
              3 adımda doğru mesaja ulaş.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-3"
          >
            {steps.map((item) => (
              <motion.div
                key={item.step}
                variants={staggerItem}
                className="relative rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
              >
                <div
                  className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-lg font-bold text-white shadow-lg`}
                >
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------- FAQ (SEO) ---------- */}
      <motion.section
        {...fadeIn}
        id="sss"
        className="bg-white px-5 py-14 sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Sıkça Sorulan Sorular
            </h2>
            <p className="mt-2 text-slate-500">
              Mesaja ne cevap verilir, sevgiliye ne yazılır — merak ettiklerin.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-slate-200 bg-slate-50 open:bg-white open:shadow-sm transition-all"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-left font-bold text-slate-900">
                  {faq.question}
                  <span className="shrink-0 text-slate-400 transition-transform group-open:rotate-180">
                    <ChevronDown className="h-5 w-5" strokeWidth={2} />
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ---------- CTA FOOTER ---------- */}
      <motion.section
        {...fadeIn}
        className="bg-[#070b20] px-5 py-14 text-center text-white sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Hazır mısın?
          </h2>
          <p className="mt-3 text-lg text-slate-300">
            Doğru mesaj, doğru zamanda. Şimdi dene.
          </p>
          <div className="mt-8">
            <Link
              href="/asistan"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 px-8 text-base font-black text-white shadow-[0_18px_45px_rgba(217,70,239,0.35)] transition-transform hover:scale-[1.01]"
            >
              <Sparkles className="h-5 w-5" strokeWidth={2} /> Mesajını Parlatmaya Başla
            </Link>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Ücretsiz. Hesap gerekmez. Mesajlarınız saklanmaz.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
            <Link
              href="/gizlilik"
              className="hover:text-slate-300 transition-colors"
            >
              Gizlilik Politikası
            </Link>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
