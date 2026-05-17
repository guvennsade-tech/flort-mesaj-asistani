"use client";

import { useState } from "react";
import { SohbetMesaji } from "@/lib/types";
import { MAX_MESAJ, MAX_METIN } from "@/lib/constants";

interface Props {
  mesajlar: SohbetMesaji[];
  onChange: (mesajlar: SohbetMesaji[]) => void;
}

export function ConversationInput({ mesajlar, onChange }: Props) {
  const [yeniMetin, setYeniMetin] = useState("");
  const [gonderen, setGonderen] = useState<"sen" | "o">("o");

  function ekle() {
    const temiz = yeniMetin.trim();
    if (!temiz) return;
    if (mesajlar.length >= MAX_MESAJ) return;

    onChange([...mesajlar, { gonderen, metin: temiz }]);
    setYeniMetin("");
    setGonderen((prev) => (prev === "sen" ? "o" : "sen"));
  }

  function sil(index: number) {
    onChange(mesajlar.filter((_, i) => i !== index));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      ekle();
    }
  }

  const dolu = mesajlar.length >= MAX_MESAJ;

  const ornekler: Record<"o" | "sen", string> = {
    o: "Bugün nasılsın? 😊",
    sen: "İyiyim, sen nasılsın?",
  };

  return (
    <div className="space-y-3">
      {mesajlar.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 space-y-2 max-h-48 overflow-y-auto">
          {mesajlar.map((m, i) => (
            <div
              key={`${m.gonderen}-${m.metin}-${i}`}
              className={`flex items-start gap-2 ${m.gonderen === "sen" ? "flex-row-reverse" : ""}`}
            >
              <span
                className={`mt-1 shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                  m.gonderen === "sen"
                    ? "bg-violet-100 text-violet-700"
                    : "bg-pink-100 text-pink-700"
                }`}
              >
                {m.gonderen === "sen" ? "Sen" : "O"}
              </span>
              <span className="flex-1 rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm text-slate-800 leading-6">
                {m.metin}
              </span>
              <button
                onClick={() => sil(i)}
                className="mt-1 shrink-0 text-slate-300 hover:text-red-400 transition-colors text-xl leading-none w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100"
                type="button"
                aria-label="Mesajı sil"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {!dolu ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-inner shadow-slate-100">
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setGonderen("o")}
              type="button"
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors min-h-[44px] flex-1 ${
                gonderen === "o"
                  ? "bg-pink-100 text-pink-700"
                  : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-100"
              }`}
            >
              Karşı taraf yazdı
            </button>
            <button
              onClick={() => setGonderen("sen")}
              type="button"
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors min-h-[44px] flex-1 ${
                gonderen === "sen"
                  ? "bg-violet-100 text-violet-700"
                  : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-100"
              }`}
            >
              Ben yazdım
            </button>
          </div>

          <textarea
            value={yeniMetin}
            onChange={(e) => setYeniMetin(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={ornekler[gonderen]}
            className="w-full resize-none bg-transparent text-[15px] leading-7 text-slate-900 outline-none placeholder:text-slate-400 min-h-[80px] sm:min-h-[52px]"
            maxLength={MAX_METIN}
          />

          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-slate-400">
              {mesajlar.length}/{MAX_MESAJ} mesaj · Enter ile hızlı ekle
            </span>
            <button
              onClick={ekle}
              disabled={!yeniMetin.trim()}
              type="button"
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40 hover:bg-slate-700 transition-colors min-h-[44px]"
            >
              Ekle
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
          <p className="text-sm text-slate-600 font-medium">
            Maksimum {MAX_MESAJ} mesaja ulaşıldı
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Daha fazla mesaj eklemek için eskilerden birini sil
          </p>
        </div>
      )}
    </div>
  );
}
