import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorilerim — Kaydedilmiş Mesaj Önerileri",
  description:
    "Beğendiğin flört mesajı önerilerini görüntüle ve yönet. Kaydettiğin mesajları tek tıkla kopyala.",
  alternates: {
    canonical: "/favoriler",
  },
};

export default function FavorilerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
