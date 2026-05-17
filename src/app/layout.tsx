import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#9333ea",
};

export const metadata: Metadata = {
  title: "Flört Mesajı Asistanı",
  description: "İlişki aşamana ve tonuna göre en iyi flört mesajını bul. Yapay zeka destekli, ücretsiz.",
  keywords: ["flört", "mesaj", "asistan", "ilişki", "dating"],
  manifest: "/manifest.json",
  openGraph: {
    title: "Flört Mesajı Asistanı",
    description: "İlişki aşamana ve tonuna göre en iyi flört mesajını bul.",
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flört Mesajı Asistanı",
    description: "İlişki aşamana ve tonuna göre en iyi flört mesajını bul.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FlörtAsistan",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="antialiased">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="min-h-screen bg-[#f5f7fb]">
        {children}
      </body>
    </html>
  );
}
