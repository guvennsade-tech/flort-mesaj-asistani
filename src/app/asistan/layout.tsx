import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mesaj Önerisi Al — Flört Asistanı",
  description:
    "AI destekli flört mesajı asistanı. Sohbetini ekle, ton seç, 3 farklı cevap önerisi al. Ücretsiz, hesap gerekmez.",
  alternates: {
    canonical: "/asistan",
  },
};

export default function AsistanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
