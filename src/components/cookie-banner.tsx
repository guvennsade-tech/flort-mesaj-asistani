"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

const COOKIE_CONSENT_KEY = "fm_cookie_consent";

export function CookieBanner() {
  const [gorunur, setGorunur] = useState(false);

  useEffect(() => {
    try {
      const kabul = window.localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!kabul) {
        const timer = setTimeout(() => setGorunur(true), 1000);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, []);

  function kabulEt() {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    } catch {
      // ignore
    }
    setGorunur(false);
  }

  if (!gorunur) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:bottom-4 lg:left-4 lg:right-auto lg:max-w-md">
      <div className="mx-auto max-w-3xl lg:mx-0">
        <div className="rounded-t-2xl border-t border-slate-200 bg-white p-5 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] lg:rounded-2xl lg:border lg:shadow-2xl">
          <div className="flex items-start gap-3">
            <Cookie className="h-5 w-5 shrink-0 mt-0.5 text-pink-500" strokeWidth={1.5} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900">
                Çerez Kullanımı
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                Bu site, rate limiting ve kullanıcı deneyimi için gerekli
                çerezleri kullanır. Kişisel verileriniz 6698 sayılı KVKK
                kapsamında korunmaktadır. Devam ederek{" "}
                <Link
                  href="/gizlilik"
                  className="text-pink-600 underline hover:text-pink-700"
                >
                  gizlilik politikamızı
                </Link>{" "}
                kabul etmiş olursunuz.
              </p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={kabulEt}
              className="flex-1 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-pink-200 select-none transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:shadow-[0_0_24px_rgba(236,72,153,0.4)] hover:-translate-y-px active:scale-[0.94] active:translate-y-0 active:duration-75 min-h-[44px]"
              type="button"
            >
              Anladım, Kabul Ediyorum
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
