import Link from "next/link";
import { Heart } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f5f7fb] px-5 text-center">
      {/* Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(236,72,153,0.15),transparent_50%)]" />

      <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-pink-100 to-violet-100 shadow-inner">
        <Heart className="h-10 w-10 text-pink-400" strokeWidth={1.5} />
      </div>

      <h1 className="mt-8 text-7xl font-black tracking-tight text-slate-950 sm:text-8xl">
        404
      </h1>

      <p className="mt-4 max-w-sm text-lg font-bold text-slate-700">
        Aradığın sayfa kaybolmuş
      </p>

      <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
        Bu sayfa taşınmış, silinmiş veya hiç var olmamış olabilir. Ana sayfaya
        dönerek devam edebilirsin.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 px-6 text-sm font-bold text-white shadow-lg shadow-pink-200 hover:scale-[1.02] transition-transform"
        >
          Ana Sayfaya Dön
        </Link>
        <Link
          href="/asistan"
          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Asistanı Aç
        </Link>
      </div>
    </main>
  );
}
