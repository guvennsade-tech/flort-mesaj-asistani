import { Heart, Sparkles, Copy, Check, Zap } from "lucide-react";

export function PhoneMockup() {
  return (
    <div className="relative">
      {/* Ambient glow */}
      <div className="absolute -inset-10 -z-10 rounded-[64px] bg-gradient-to-br from-pink-500/8 via-violet-500/8 to-indigo-500/8 blur-2xl" />
      <div className="absolute -inset-6 -z-10 rounded-[56px] bg-gradient-to-br from-pink-500/5 to-violet-500/5 blur-xl" />

      {/* Phone frame */}
      <div className="relative h-[500px] w-[280px] overflow-hidden rounded-[48px] border-[2.5px] border-slate-700 bg-slate-950 shadow-2xl shadow-violet-500/10 ring-1 ring-white/5">
        {/* Side buttons */}
        <div className="absolute -left-[3px] top-24 h-8 w-[3px] rounded-l bg-slate-600" />
        <div className="absolute -left-[3px] top-36 h-14 w-[3px] rounded-l bg-slate-600" />
        <div className="absolute -right-[3px] top-28 h-16 w-[3px] rounded-r bg-slate-600" />

        {/* Dynamic Island */}
        <div className="absolute left-1/2 top-3 z-30 h-[28px] w-[88px] -translate-x-1/2 rounded-full bg-black" />

        {/* Screen */}
        <div className="flex h-full flex-col overflow-hidden bg-gradient-to-b from-[#070b20] via-[#0a0f26] to-[#0c1229]">
          {/* App Header */}
          <div className="flex items-center justify-between px-4 pb-3 pt-10 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-600 shadow-lg shadow-pink-500/20">
                <Heart className="h-3 w-3 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-[11px] font-bold text-white">Asistan</div>
                <div className="flex items-center gap-1 text-[9px] text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Aktif
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-white/5 px-2 py-1 text-[9px] font-medium text-white/50 border border-white/5">
              <Sparkles className="h-2.5 w-2.5" strokeWidth={2} />
              AI
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 space-y-2.5 overflow-hidden px-3.5 py-3">
            {/* Message 1 — incoming */}
            <div className="animate-msg-1 flex items-end gap-2 opacity-0">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-pink-500 text-[8px] font-bold text-white shadow-md shadow-pink-500/10">
                O
              </div>
              <div className="max-w-[78%] rounded-2xl rounded-bl-md bg-white/[0.06] border border-white/[0.08] px-3 py-2 shadow-sm">
                <p className="text-[11px] leading-[1.5] text-slate-200">
                  Bu hafta sonu ne yapıyorsun?
                </p>
                <span className="mt-0.5 block text-[7px] text-slate-500">14:32</span>
              </div>
            </div>

            {/* Message 2 — outgoing */}
            <div className="animate-msg-2 flex items-end gap-2 flex-row-reverse opacity-0">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 text-[8px] font-bold text-white shadow-md shadow-violet-500/10">
                S
              </div>
              <div className="max-w-[78%] rounded-2xl rounded-br-md bg-gradient-to-r from-pink-500 to-violet-600 px-3 py-2 shadow-lg shadow-pink-500/15">
                <p className="text-[11px] leading-[1.5] text-white">
                  Henüz bir plan yok, sen?
                </p>
                <span className="mt-0.5 block text-[7px] text-white/60 text-right">14:33</span>
              </div>
            </div>

            {/* Message 3 — incoming */}
            <div className="animate-msg-3 flex items-end gap-2 opacity-0">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-pink-500 text-[8px] font-bold text-white shadow-md shadow-pink-500/10">
                O
              </div>
              <div className="max-w-[78%] rounded-2xl rounded-bl-md bg-white/[0.06] border border-white/[0.08] px-3 py-2 shadow-sm">
                <p className="text-[11px] leading-[1.5] text-slate-200">
                  Kafeye gitmeyi düşünüyorum, gelir misin?
                </p>
                <span className="mt-0.5 block text-[7px] text-slate-500">14:35</span>
              </div>
            </div>

            {/* AI Loading state */}
            <div className="animate-ai-loading flex items-center gap-2 opacity-0">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-600">
                <Sparkles className="h-3 w-3 text-white animate-pulse" strokeWidth={2} />
              </div>
              <div className="flex items-center gap-1 rounded-full bg-white/[0.04] border border-white/[0.06] px-3 py-2">
                <span className="h-1 w-1 rounded-full bg-pink-400 animate-bounce [animation-delay:0ms]" />
                <span className="h-1 w-1 rounded-full bg-pink-400 animate-bounce [animation-delay:150ms]" />
                <span className="h-1 w-1 rounded-full bg-pink-400 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>

            {/* Tone chips */}
            <div className="animate-tone-chips flex flex-wrap gap-1 opacity-0">
              <span className="rounded-full bg-pink-500/15 border border-pink-500/20 px-2 py-0.5 text-[8px] font-semibold text-pink-300">
                Esprili
              </span>
              <span className="rounded-full bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 text-[8px] font-medium text-slate-400">
                Yazışıyoruz
              </span>
              <span className="rounded-full bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 text-[8px] font-medium text-slate-400">
                Sohbeti sürdür
              </span>
            </div>

            {/* Suggestions */}
            <div className="animate-suggestions space-y-1.5 opacity-0">
              <div className="mb-1 flex items-center gap-1">
                <Sparkles className="h-2.5 w-2.5 text-pink-400" strokeWidth={2} />
                <span className="text-[8px] font-semibold text-slate-400">3 alternatif</span>
              </div>

              <div className="animate-shimmer group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5 backdrop-blur-sm transition-all hover:border-pink-500/20 hover:bg-white/[0.05]">
                <div className="shimmer-bg absolute inset-0 -translate-x-full" />
                <div className="relative flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-600 text-[8px] font-bold text-white shadow-md">
                    1
                  </span>
                  <p className="flex-1 text-[10px] leading-[1.5] text-slate-300">
                    Hangi kafe? Belki ben de gelirim 😄
                  </p>
                  <button className="shrink-0 rounded-md p-1 text-slate-500 transition-colors hover:bg-white/5 hover:text-pink-400">
                    <Copy className="h-3 w-3" strokeWidth={2} />
                  </button>
                </div>
              </div>

              <div className="animate-shimmer group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5 backdrop-blur-sm transition-all hover:border-pink-500/20 hover:bg-white/[0.05] [animation-delay:0.2s]">
                <div className="shimmer-bg absolute inset-0 -translate-x-full" />
                <div className="relative flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-600 text-[8px] font-bold text-white shadow-md">
                    2
                  </span>
                  <p className="flex-1 text-[10px] leading-[1.5] text-slate-300">
                    Kahve + sohbet = iyi plan, ne zaman?
                  </p>
                  <button className="shrink-0 rounded-md p-1 text-slate-500 transition-colors hover:bg-white/5 hover:text-pink-400">
                    <Copy className="h-3 w-3" strokeWidth={2} />
                  </button>
                </div>
              </div>

              <div className="animate-shimmer group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5 backdrop-blur-sm transition-all hover:border-pink-500/20 hover:bg-white/[0.05] [animation-delay:0.4s]">
                <div className="shimmer-bg absolute inset-0 -translate-x-full" />
                <div className="relative flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-600 text-[8px] font-bold text-white shadow-md">
                    3
                  </span>
                  <p className="flex-1 text-[10px] leading-[1.5] text-slate-300">
                    Ne zaman uygun? Yerini söyle, ayarlayalım ☕
                  </p>
                  <button className="shrink-0 rounded-md p-1 text-slate-500 transition-colors hover:bg-white/5 hover:text-pink-400">
                    <Copy className="h-3 w-3" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Input */}
          <div className="border-t border-white/[0.05] bg-[#080c22]/90 backdrop-blur-md px-3.5 py-3">
            <div className="flex items-center gap-2">
              <div className="h-9 flex-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 text-[10px] text-slate-500 flex items-center">
                <span className="animate-typing-cursor inline-block h-3.5 w-px bg-pink-400 mr-0.5" />
                <span className="animate-typing-text overflow-hidden whitespace-nowrap text-slate-400">Mesaj yazıyor...</span>
              </div>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-lg shadow-pink-500/25">
                <Zap className="h-4 w-4" strokeWidth={2} />
              </div>
            </div>
          </div>
        </div>

        {/* Screen reflection */}
        <div className="pointer-events-none absolute inset-0 rounded-[44px] bg-gradient-to-br from-white/[0.04] via-transparent to-transparent" />
      </div>
    </div>
  );
}
