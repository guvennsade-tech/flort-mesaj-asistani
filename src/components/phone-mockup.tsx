export function PhoneMockup() {
  return (
    <div className="relative">
      {/* Phone frame */}
      <div className="relative h-[420px] w-[260px] overflow-hidden rounded-[40px] border-[6px] border-slate-800/80 bg-white shadow-2xl shadow-violet-500/20">
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-10 h-6 w-28 -translate-x-1/2 rounded-b-xl bg-slate-800/80" />

        {/* Screen content */}
        <div className="flex h-full flex-col bg-[#f5f7fb]">
          {/* Header */}
          <div className="flex items-center justify-between bg-[#080c22] px-4 pb-3 pt-8">
            <div className="text-xs font-bold text-white">FlörtAsistan</div>
            <div className="flex gap-1.5">
              <span className="rounded-md border border-white/20 px-1.5 py-0.5 text-[9px] text-white/70">
                ♡
              </span>
            </div>
          </div>

          {/* Chat area */}
          <div className="flex-1 space-y-2 overflow-hidden px-3 py-3">
            {/* Message 1 */}
            <div className="flex items-start gap-2">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pink-500 text-[8px] font-bold text-white">
                O
              </div>
              <div className="rounded-lg rounded-tl-none bg-white px-2.5 py-1.5 text-[9px] leading-4 text-slate-700 shadow-sm">
                Bu hafta sonu ne yapıyorsun?
              </div>
            </div>

            {/* Message 2 */}
            <div className="flex items-start gap-2 flex-row-reverse">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500 text-[8px] font-bold text-white">
                S
              </div>
              <div className="rounded-lg rounded-tr-none bg-gradient-to-r from-pink-500 to-violet-600 px-2.5 py-1.5 text-[9px] leading-4 text-white shadow-sm">
                Henüz bir plan yok, sen?
              </div>
            </div>

            {/* Message 3 */}
            <div className="flex items-start gap-2">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pink-500 text-[8px] font-bold text-white">
                O
              </div>
              <div className="rounded-lg rounded-tl-none bg-white px-2.5 py-1.5 text-[9px] leading-4 text-slate-700 shadow-sm">
                Kafeye gitmeyi düşünüyorum
              </div>
            </div>

            {/* Suggestions label */}
            <div className="pt-1">
              <div className="mb-1.5 flex items-center gap-1">
                <div className="h-1 w-1 rounded-full bg-pink-500 animate-pulse" />
                <span className="text-[8px] font-semibold text-slate-500">
                  3 alternatif
                </span>
              </div>

              {/* Suggestion cards */}
              <div className="space-y-1.5">
                <div className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
                  <div className="flex items-start gap-1.5">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-600 text-[7px] font-bold text-white">
                      1
                    </span>
                    <p className="text-[8px] leading-3.5 text-slate-800">
                      Hangi kafe? Belki ben de gelirim 😄
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
                  <div className="flex items-start gap-1.5">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-600 text-[7px] font-bold text-white">
                      2
                    </span>
                    <p className="text-[8px] leading-3.5 text-slate-800">
                      Kahve + sohbet = iyi plan
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-slate-200 bg-white px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="h-6 flex-1 rounded-full border border-slate-200 bg-slate-50" />
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-600 text-[8px] text-white">
                →
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative glow */}
      <div className="absolute -right-8 -top-8 -z-10 h-32 w-32 rounded-full bg-pink-500/20 blur-3xl" />
      <div className="absolute -bottom-8 -left-8 -z-10 h-32 w-32 rounded-full bg-violet-500/20 blur-3xl" />
    </div>
  );
}
