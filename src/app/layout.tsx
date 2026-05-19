import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CookieBanner } from "@/components/cookie-banner";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://flort-asistani.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#9333ea",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Flört Mesajı Asistanı — Mesaja Ne Cevap Verilir?",
    template: "%s | Flört Mesajı Asistanı",
  },
  description:
    "Mesaja ne cevap verilir? Flört mesajı önerisi al, sevgiliye ne yazılır bul. AI destekli, ücretsiz flört asistanı. 3 farklı ton, anında kopyala.",
  keywords: [
    "mesaja ne cevap verilir",
    "flört mesajı önerisi",
    "sevgiliye ne yazılır",
    "flört mesajları",
    "mesaj cevapları",
    "aşk mesajları",
    "romantik mesajlar",
    "esprili mesajlar",
    "chat cevapları",
    "dating mesaj",
    "mesaj önerileri",
    "whatsappta ne yazılır",
    "tinder mesajları",
    "buluşma mesajı",
    "hoşlandığım kişiye mesaj",
  ],
  authors: [{ name: "Flört Mesajı Asistanı" }],
  creator: "Flört Mesajı Asistanı",
  publisher: "Flört Mesajı Asistanı",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Flört Mesajı Asistanı — Mesaja Ne Cevap Verilir?",
    description:
      "Mesaja ne cevap verilir? Flört mesajı önerisi al, sevgiliye ne yazılır bul. AI destekli, ücretsiz.",
    type: "website",
    locale: "tr_TR",
    siteName: "Flört Mesajı Asistanı",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Flört Mesajı Asistanı — Mesaja Ne Cevap Verilir?",
    description:
      "Mesaja ne cevap verilir? Flört mesajı önerisi al, sevgiliye ne yazılır bul. AI destekli, ücretsiz.",
    creator: "@flortasistani",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FlörtAsistan",
    startupImage: "/icon-512.png",
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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="min-h-screen bg-[#f5f7fb]">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
