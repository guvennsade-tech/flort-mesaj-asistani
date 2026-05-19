interface SelectionButtonProps {
  onClick: () => void;
  active: boolean;
  tone: "pink" | "violet" | "dark";
  compact?: boolean;
  children: React.ReactNode;
}

const toneMap = {
  pink: {
    active: "border-pink-300 bg-pink-50 text-pink-700 shadow-sm shadow-pink-100",
    inactive:
      "border-slate-200 bg-white text-slate-700 hover:border-pink-200 hover:shadow-[0_0_16px_rgba(236,72,153,0.12)] hover:shadow-pink-100",
  },
  violet: {
    active: "border-violet-300 bg-violet-50 text-violet-700 shadow-sm shadow-violet-100",
    inactive:
      "border-slate-200 bg-white text-slate-700 hover:border-violet-200 hover:shadow-[0_0_16px_rgba(139,92,246,0.12)] hover:shadow-violet-100",
  },
  dark: {
    active: "border-slate-900 bg-slate-900 text-white shadow-sm",
    inactive:
      "border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:shadow-[0_0_16px_rgba(100,116,139,0.12)]",
  },
};

export function SelectionButton({
  onClick,
  active,
  tone,
  compact,
  children,
}: SelectionButtonProps) {
  const styles = toneMap[tone];
  const sizeClasses = compact
    ? "rounded-full px-4 py-2 text-sm font-medium"
    : "rounded-xl px-3 py-2 text-sm";

  return (
    <button
      onClick={onClick}
      className={`text-left font-semibold select-none
        ${sizeClasses}
        ${active ? styles.active : styles.inactive}
        transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        hover:-translate-y-px
        active:scale-[0.94] active:translate-y-0 active:duration-75
      `}
      type="button"
      aria-pressed={active}
    >
      {children}
    </button>
  );
}
