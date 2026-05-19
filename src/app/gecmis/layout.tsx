import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Geçmiş — Önceki Mesaj Önerilerim",
  description:
    "Daha önce aldığın AI mesaj önerilerini görüntüle. Geçmiş kayıtlarını incele ve yeniden kullan.",
  alternates: {
    canonical: "/gecmis",
  },
};

export default function GecmisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
