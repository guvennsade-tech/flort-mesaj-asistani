interface SelectionButtonProps {
  onClick: () => void;
  active: boolean;
  tone: "pink" | "violet" | "dark";
  compact?: boolean;
  children: React.ReactNode;
}

const toneMap = {
  pink: {
    active: "border-pink-300 bg-pink-50 text-pink-700 shadow-sm",
    inactive: "border-slate-200 bg-white text-slate-700 hover:border-slate-300",
  },
  violet: {
    active: "border-violet-300 bg-violet-50 text-violet-700 shadow-sm",
    inactive: "border-slate-200 bg-white text-slate-700 hover:border-slate-300",
  },
  dark: {
    active: "border-slate-900 bg-slate-900 text-white",
    inactive: "border-slate-200 bg-white text-slate-700 hover:border-slate-300",
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
  const baseClasses = `rounded-xl border text-left font-semibold transition-all ${
    active ? styles.active : styles.inactive
  } ${compact ? "rounded-full px-4 py-2 text-sm font-medium" : "px-3 py-2 text-sm"}`;

  return (
    <button onClick={onClick} className={baseClasses} type="button" aria-pressed={active}>
      {children}
    </button>
  );
}
