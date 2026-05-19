"use client";

import { useEffect } from "react";
import { Zap } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <html lang="tr">
      <body className="flex min-h-screen items-center justify-center bg-[#f5f7fb] p-5">
        <div className="text-center max-w-sm">
          <div className="mb-4 flex h-16 w-16 items-center justify-center mx-auto rounded-2xl bg-gradient-to-br from-pink-100 to-violet-100">
            <Zap className="h-8 w-8 text-pink-500" strokeWidth={1.5} />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Bir şeyler ters gitti
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Uygulama beklenmedik bir hatayla karşılaştı. Tekrar denemeyi
            deneyebilirsin.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <button
              onClick={() => reset()}
              className="rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-pink-200 select-none transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:shadow-[0_0_32px_rgba(236,72,153,0.35)] hover:-translate-y-0.5 active:scale-[0.94] active:translate-y-0 active:duration-75"
              type="button"
            >
              Tekrar Dene
            </button>
            <button
              onClick={() => window.location.reload()}
              className="rounded-xl px-6 py-3 text-sm font-semibold text-slate-500 hover:bg-slate-100 transition-colors"
              type="button"
            >
              Sayfayı Yenile
            </button>
          </div>
          {error.digest && (
            <p className="mt-4 text-[10px] text-slate-300 font-mono">
              Hata kodu: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
