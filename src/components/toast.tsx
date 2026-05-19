"use client";

import { useEffect, useRef, useState } from "react";
import { Check, X, Info } from "lucide-react";

interface Toast {
  id: number;
  mesaj: string;
  tip: "basari" | "hata" | "bilgi";
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  function goster(mesaj: string, tip: Toast["tip"] = "basari") {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, mesaj, tip }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  }

  return { toasts, goster, kapat: (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id)) };
}

export function ToastContainer({
  toasts,
  onKapat,
}: {
  toasts: Toast[];
  onKapat: (id: number) => void;
}) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onKapat={onKapat} />
      ))}
    </div>
  );
}

function ToastItem({
  toast,
  onKapat,
}: {
  toast: Toast;
  onKapat: (id: number) => void;
}) {
  const [gorunur, setGorunur] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setGorunur(true));
  }, []);

  const renkler = {
    basari: "bg-emerald-600 text-white shadow-emerald-200",
    hata: "bg-red-600 text-white shadow-red-200",
    bilgi: "bg-slate-800 text-white shadow-slate-200",
  };

  const ikonlar = {
    basari: <Check className="h-4 w-4" />,
    hata: <X className="h-4 w-4" />,
    bilgi: <Info className="h-4 w-4" />,
  };

  return (
    <div
      className={`pointer-events-auto flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold shadow-lg transition-all duration-300 ${renkler[toast.tip]} ${
        gorunur ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
      }`}
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs">
        {ikonlar[toast.tip]}
      </span>
      <span>{toast.mesaj}</span>
      <button
        onClick={() => onKapat(toast.id)}
        className="ml-2 shrink-0 rounded-lg p-1 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
        aria-label="Kapat"
        type="button"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
