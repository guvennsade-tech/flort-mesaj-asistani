import { Sparkles, RotateCcw, Heart, Settings, HelpCircle, MessageCircle, Copy } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
  disabled: boolean;
}

export const navItems: NavItem[] = [
  { label: "Yeni Mesaj", icon: Sparkles, href: "/asistan", disabled: false },
  { label: "Geçmiş", icon: RotateCcw, href: "/gecmis", disabled: false },
  { label: "Favoriler", icon: Heart, href: "/favoriler", disabled: false },
  { label: "Ayarlar", icon: Settings, href: "#", disabled: true },
  { label: "Destek", icon: HelpCircle, href: "#", disabled: true },
];

export interface FeatureItem {
  title: string;
  text: string;
  icon: LucideIcon;
}

export const featureItems: FeatureItem[] = [
  {
    title: "Sohbet bağlamına uygun",
    text: "Karşı tarafın mesajlarına ve sohbet geçmişine göre kişiselleştirilmiş cevaplar üretir.",
    icon: MessageCircle,
  },
  {
    title: "3 farklı alternatif",
    text: "Bir öneriye sıkışıp kalmazsın. Farklı yaklaşımlar arasından sana en uygununu seçersin.",
    icon: Sparkles,
  },
  {
    title: "Tek dokunuşla kopyala",
    text: "Beğendiğin mesajı anında panoya kopyala, uygulamadan çıkmana gerek kalmaz.",
    icon: Copy,
  },
];
