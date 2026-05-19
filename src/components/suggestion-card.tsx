import type { MesajOnerisi } from "@/lib/types";
import { Copy, Check, RefreshCw, Heart, Share2 } from "lucide-react";
import { motion } from "framer-motion";

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

const vibeMap: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  Samimi: { label: "samimi", bg: "bg-teal-50", text: "text-teal-700", dot: "bg-teal-500" },
  Esprili: { label: "esprili", bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-500" },
  Romantik: { label: "hafif flörtöz", bg: "bg-pink-50", text: "text-pink-700", dot: "bg-pink-500" },
};

const sinyalMap: Record<string, string[]> = {
  sohbeti_surdur: ["sohbeti uzatır", "cevap almayı kolaylaştırır"],
  bulusma_teklif: ["net bir davet", "baskı yaratmaz"],
  ilgi_goster: ["sıcaklık kurar", "doğal hissettirir"],
};

function getVibe(toneLabel?: string) {
  return vibeMap[toneLabel || "Esprili"] || vibeMap["Esprili"];
}

function getSignals(hedefId?: string) {
  return sinyalMap[hedefId || "sohbeti_surdur"] || sinyalMap["sohbeti_surdur"];
}

/* Action button micro-interaction base */
const actionBtnBase =
  "flex flex-1 flex-col items-center justify-center gap-1 px-3 py-4 min-h-[56px] text-sm font-semibold text-slate-600 select-none transition-all duration-150 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-px active:scale-[0.92] active:translate-y-0 active:duration-75";

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
  const vibe = getVibe(toneLabel);
  const sinyaller = getSignals("sohbeti_surdur");

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
      className={`overflow-hidden rounded-2xl border border-l-4 ${renkler[index % renkler.length]} bg-white shadow-sm suggestion-lift`}
    >
      <div className="grid gap-0 md:grid-cols-[1fr_160px]">
        <div className="p-5">
          {/* Vibe etiketi */}
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-600 text-sm font-bold text-white">
              {index + 1}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full ${vibe.bg} px-3 py-1 text-xs font-semibold ${vibe.text}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${vibe.dot}`} />
              {vibe.label}
            </span>
            {stageLabel && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {stageLabel}
              </span>
            )}
          </div>

          {/* Mesaj */}
          <p className="mb-3 text-[15px] leading-7 text-slate-900">
            {suggestion.mesaj}
          </p>

          {/* Sinyal */}
          <div className="mb-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Bu mesaj:
            </p>
            <div className="flex flex-wrap gap-2">
              {sinyaller.map((s, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 border border-slate-100"
                >
                  <Check className="h-3 w-3 text-emerald-500" />
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Açıklama */}
          <p className="text-sm leading-6 text-slate-500">
            {suggestion.aciklama}
          </p>
        </div>

        <div className="flex border-t border-slate-100 md:flex-col md:border-l md:border-t-0">
          {/* Copy — clipboard animation */}
          <button
            onClick={onCopy}
            className={`${actionBtnBase} ${
              copied
                ? "bg-emerald-50 text-emerald-700"
                : "hover:bg-slate-50 hover:shadow-[0_0_12px_rgba(16,185,129,0.08)]"
            }`}
            type="button"
            aria-label={copied ? "Hazır" : "Mesajı kopyala"}
          >
            <span
              className={`transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                copied ? "scale-110" : "scale-100"
              }`}
            >
              {copied ? (
                <Check className="h-5 w-5 text-emerald-600" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </span>
            {copied ? "Hazır" : "Kopyala"}
          </button>

          {/* Regenerate */}
          <button
            onClick={onRegenerate}
            className={`${actionBtnBase} border-l border-slate-100 hover:bg-slate-50 hover:shadow-[0_0_12px_rgba(139,92,246,0.08)] md:border-l-0 md:border-t`}
            type="button"
            aria-label="Yeniden üret"
          >
            <RefreshCw className="h-5 w-5" />
            Yeniden
          </button>

          {/* Favorite */}
          <button
            onClick={onToggleFavorite}
            className={`${actionBtnBase} border-l border-slate-100 md:border-l-0 md:border-t ${
              favorite
                ? "bg-pink-50 text-pink-600 hover:bg-pink-100"
                : "hover:bg-slate-50 hover:shadow-[0_0_12px_rgba(236,72,153,0.08)]"
            }`}
            type="button"
            aria-label={favorite ? "Favorilerden çıkar" : "Favorilere ekle"}
          >
            <Heart
              className={`h-5 w-5 transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                favorite ? "scale-110 fill-pink-500 text-pink-500" : "scale-100"
              }`}
            />
            Favori
          </button>

          {/* Share */}
          <button
            onClick={() => {
              const url = `https://wa.me/?text=${encodeURIComponent(suggestion.mesaj)}`;
              window.open(url, "_blank", "noopener,noreferrer");
            }}
            className={`${actionBtnBase} border-l border-slate-100 hover:bg-slate-50 hover:shadow-[0_0_12px_rgba(59,130,246,0.08)] md:border-l-0 md:border-t`}
            type="button"
            aria-label="WhatsApp'ta paylaş"
          >
            <Share2 className="h-5 w-5" />
            Paylaş
          </button>
        </div>
      </div>
    </motion.article>
  );
}
