import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { FeatureCard } from "@/components/feature-card";
import { PhoneMockup } from "@/components/phone-mockup";
import { MiniDemo } from "@/components/mini-demo";
import { featureItems } from "@/lib/ui-data";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      {/* ---------- HERO (dark) ---------- */}
      <section className="relative isolate overflow-hidden bg-[#070b20] px-5 py-5 text-white sm:px-8 sm:py-7">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_25%,rgba(236,72,153,0.36),transparent_28%),radial-gradient(circle_at_58%_38%,rgba(124,58,237,0.42),transparent_30%),linear-gradient(135deg,#070b20_0%,#11153a_58%,#170723_100%)]" />
        <div className="absolute right-16 top-20 -z-10 hidden h-40 w-40 rounded-full bg-pink-500/10 blur-3xl lg:block" />
        <div className="absolute bottom-28 left-20 -z-10 hidden h-56 w-56 rounded-full bg-violet-500/10 blur-3xl lg:block" />

        <div className="mx-auto max-w-7xl">
          <header className="flex items-center justify-between gap-4">
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
              <Link
                href="/asistan"
                className="rounded-xl border border-pink-400/70 px-4 py-2 text-pink-200 hover:bg-pink-500/10 transition-colors"
              >
                Asistanı Aç
              </Link>
            </nav>
          </header>

          <div className="grid items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
            <section>
              <h1 className="max-w-xl text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Karşı tarafın mesajına
                <span className="block bg-gradient-to-r from-violet-300 to-pink-400 bg-clip-text text-transparent">
                  ne cevap vereceğini bilemiyor musun?
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">
                Mesajını yapıştır, AI sana bağlama uygun 3 farklı cevap
                alternatifi hazırlasın. Kopyala, gönder, hazır.
                Hesap gerekmez.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2">
                <span className="text-base">🔒</span>
                <span className="text-sm font-medium text-emerald-300">
                  Mesajlarınız saklanmıyor. Anlık işlenip siliniyor.
                </span>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/asistan"
                  className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 px-6 text-base font-black text-white shadow-[0_18px_45px_rgba(217,70,239,0.35)] transition-transform hover:scale-[1.01]"
                >
                  ✦ Mesajını Parlatmaya Başla
                </Link>
                <a
                  href="#demo"
                  className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/20 px-6 text-base font-bold text-white hover:bg-white/5 transition-colors"
                >
                  Hemen Dene
                </a>
              </div>

              <p className="mt-4 text-xs text-slate-400">
                AI tarafından desteklenmektedir. +18 ve manipülatif içerikler
                desteklenmez.
              </p>
            </section>

            <section className="hidden justify-center lg:flex">
              <PhoneMockup />
            </section>
          </div>
        </div>
      </section>

      {/* ---------- MINI DEMO ---------- */}
      <section id="demo" className="px-5 py-14 sm:px-8 sm:py-20">
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
      </section>

      {/* ---------- ÖZELLİKLER ---------- */}
      <section id="ozellikler" className="bg-white px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Neden Flört Mesajı Asistanı?
            </h2>
            <p className="mt-2 text-slate-500">
              Sadece mesaj önerisi değil, sohbetinin akışını koruyan bir
              yardımcı.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {featureItems.map((item) => (
              <FeatureCard
                key={item.title}
                title={item.title}
                text={item.text}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- NASIL ÇALIŞIR ---------- */}
      <section
        id="nasil-calisir"
        className="bg-[#f5f7fb] px-5 py-14 sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Nasıl çalışır?
            </h2>
            <p className="mt-2 text-slate-500">
              3 adımda doğru mesaja ulaş.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
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
            ].map((item) => (
              <div
                key={item.step}
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA FOOTER ---------- */}
      <section className="bg-[#070b20] px-5 py-14 text-center text-white sm:px-8 sm:py-20">
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
              className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 px-8 text-base font-black text-white shadow-[0_18px_45px_rgba(217,70,239,0.35)] transition-transform hover:scale-[1.01]"
            >
              ✦ Mesajını Parlatmaya Başla
            </Link>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Ücretsiz. Hesap gerekmez. Mesajlarınız saklanmaz.
          </p>
        </div>
      </section>
    </main>
  );
}
