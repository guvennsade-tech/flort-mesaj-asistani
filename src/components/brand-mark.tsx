interface BrandMarkProps {
  glow?: boolean;
}

export function BrandMark({ glow }: BrandMarkProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-2xl border border-pink-400/60 bg-white/5 text-2xl text-pink-300 ${
          glow ? "shadow-[0_0_28px_rgba(236,72,153,0.4)]" : ""
        }`}
      >
        ♡
      </div>
      <div>
        <p className="text-base font-bold leading-tight">Flört Mesajı</p>
        <p className="text-sm font-semibold text-pink-300">Asistanı</p>
      </div>
    </div>
  );
}
