interface FeatureCardProps {
  title: string;
  text: string;
  icon: string;
  variant?: "dark" | "light";
}

export function FeatureCard({ title, text, icon, variant = "light" }: FeatureCardProps) {
  const isDark = variant === "dark";
  return (
    <div className={`rounded-2xl border p-6 ${isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"}`}>
      <div className={`mb-3 text-2xl ${isDark ? "text-pink-300" : "text-pink-500"}`}>
        {icon}
      </div>
      <p className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
        {title}
      </p>
      <p className={`mt-1 text-sm leading-6 ${isDark ? "text-slate-300" : "text-slate-500"}`}>
        {text}
      </p>
    </div>
  );
}
