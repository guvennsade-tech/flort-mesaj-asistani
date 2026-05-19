"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const thoughts = [
  "Sohbetin tonu okunuyor",
  "Bağlam analiz ediliyor",
  "Flört tonu belirleniyor",
  "Doğal bir yanıt hazırlanıyor",
  "Son dokunuşlar yapılıyor",
];

interface AiLoadingProps {
  stage?: "thinking" | "generating" | "polishing";
}

export function AiLoading({ stage = "thinking" }: AiLoadingProps) {
  const [thoughtIndex, setThoughtIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setThoughtIndex((i) => (i + 1) % thoughts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const stageLabels: Record<string, { label: string; color: string }> = {
    thinking: { label: "Düşünüyor", color: "text-pink-500" },
    generating: { label: "Oluşturuyor", color: "text-violet-500" },
    polishing: { label: "Hazırlanıyor", color: "text-indigo-500" },
  };

  const current = stageLabels[stage] || stageLabels.thinking;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      {/* AI Avatar + Status */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-600 pulse-glow">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-emerald-400 border-2 border-white">
            <span className="h-full w-full rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>
        <div>
          <p className={`text-sm font-bold ${current.color}`}>
            {current.label}
          </p>
          <p className="text-xs text-slate-400">
            {thoughts[thoughtIndex]}
            <span className="inline-block w-2 cursor-blink" />
          </p>
        </div>
      </div>

      {/* Skeleton Cards with gradient border + staggered entrance */}
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="gradient-border p-4"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full shimmer-bg" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 w-3/4 rounded shimmer-bg" />
                <div className="h-3.5 w-1/2 rounded shimmer-bg" />
              </div>
            </div>
            <div className="mt-3 flex gap-2 pl-9">
              <div className="h-5 w-14 rounded-full shimmer-bg" />
              <div className="h-5 w-20 rounded-full shimmer-bg" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Typing dots footer */}
      <div className="mt-4 flex items-center justify-center gap-1">
        <span className="text-xs text-slate-400 mr-1">AI yazıyor</span>
        <span className="flex h-1.5 w-1.5 rounded-full bg-pink-400 typing-dot" />
        <span className="flex h-1.5 w-1.5 rounded-full bg-pink-400 typing-dot" />
        <span className="flex h-1.5 w-1.5 rounded-full bg-pink-400 typing-dot" />
      </div>
    </motion.div>
  );
}
