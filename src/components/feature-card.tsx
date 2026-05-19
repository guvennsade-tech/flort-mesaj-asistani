import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  text: string;
  icon: LucideIcon;
  variant?: "dark" | "light";
}

export function FeatureCard({ title, text, icon: Icon, variant = "light" }: FeatureCardProps) {
  const isDark = variant === "dark";
  return (
    <div className={`rounded-2xl border p-6 ${isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"}`}>
      <div className={`mb-3 ${isDark ? "text-pink-300" : "text-pink-500"}`}>
        <Icon className="h-7 w-7" strokeWidth={1.5} />
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
