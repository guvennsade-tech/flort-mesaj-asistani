import type { MesajOnerisi } from "@/lib/types";

interface SuggestionCardProps {
  index: number;
  suggestion: MesajOnerisi;
  toneLabel?: string;
  stageLabel?: string;
  copied: boolean;
  favorite: boolean;
  onCopy: () => void;
  onRegenerate: () => void;
  onToggleFavorite: () => void;
}

const renkler = ["border-pink-400", "border-violet-400", "border-blue-400"];

export function SuggestionCard({
  index,
  suggestion,
  toneLabel,
  stageLabel,
  copied,
  favorite,
  onCopy,
  onRegenerate,
  onToggleFavorite,
}: SuggestionCardProps) {
  return (
    <article
      className={`overflow-hidden rounded-2xl border border-l-4 ${renkler[index % renkler.length]} bg-white shadow-sm`}
    >
      <div className="grid gap-0 md:grid-cols-[1fr_160px]">
        <div className="p-5">
          <div className="mb-3 flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-600 text-sm font-bold text-white">
              {index + 1}
            </span>
            <p className="text-[15px] leading-7 text-slate-900">
              {suggestion.mesaj}
            </p>
          </div>

          <div className="mb-3 flex flex-wrap gap-2 pl-10">
            <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600">
              {toneLabel}
            </span>
            <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-600">
              {stageLabel}
            </span>
          </div>

          <p className="pl-10 text-sm leading-6 text-slate-500">
            {suggestion.aciklama}
          </p>
        </div>

        <div className="flex border-t border-slate-100 md:flex-col md:border-l md:border-t-0">
          <button
            onClick={onCopy}
            className="flex flex-1 flex-col items-center justify-center gap-1 px-3 py-4 min-h-[56px] text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 active:bg-slate-100"
            type="button"
            aria-label={copied ? "Kopyalandı" : "Mesajı kopyala"}
          >
            <span className="text-xl">⧉</span>
            {copied ? "Kopyalandı" : "Kopyala"}
          </button>
          <button
            onClick={onRegenerate}
            className="flex flex-1 flex-col items-center justify-center gap-1 border-l border-slate-100 px-3 py-4 min-h-[56px] text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 active:bg-slate-100 md:border-l-0 md:border-t"
            type="button"
            aria-label="Yeniden üret"
          >
            <span className="text-xl">↻</span>
            Yeniden
          </button>
          <button
            onClick={onToggleFavorite}
            className="flex flex-1 flex-col items-center justify-center gap-1 border-l border-slate-100 px-3 py-4 min-h-[56px] text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 active:bg-slate-100 md:border-l-0 md:border-t"
            type="button"
            aria-label={favorite ? "Favorilerden çıkar" : "Favorilere ekle"}
          >
            <span className="text-xl">{favorite ? "♥" : "♡"}</span>
            Favori
          </button>
          <button
            onClick={() => {
              const url = `https://wa.me/?text=${encodeURIComponent(suggestion.mesaj)}`;
              window.open(url, "_blank", "noopener,noreferrer");
            }}
            className="flex flex-1 flex-col items-center justify-center gap-1 border-l border-slate-100 px-3 py-4 min-h-[56px] text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 active:bg-slate-100 md:border-l-0 md:border-t"
            type="button"
            aria-label="WhatsApp'ta paylaş"
          >
            <span className="text-xl">↗</span>
            Paylaş
          </button>
        </div>
      </div>
    </article>
  );
}
