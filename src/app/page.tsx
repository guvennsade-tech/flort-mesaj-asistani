import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { LandingContent } from "@/components/landing-content";

export const metadata: Metadata = {
  title: "Mesaja Ne Cevap Verilir? — Flört Mesajı Önerisi",
  description:
    "Mesaja ne cevap verilir? Sevgiliye ne yazılır? AI destekli flört mesajı asistanı ile bağlama uygun 3 farklı cevap önerisi al. Ücretsiz, hesap gerekmez.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mesaja Ne Cevap Verilir? — Flört Mesajı Önerisi",
    description:
      "Mesaja ne cevap verilir? Sevgiliye ne yazılır? AI destekli flört mesajı asistanı ile bağlama uygun 3 farklı cevap önerisi al.",
    url: "/",
  },
};

const faqs = [
  {
    question: "Mesaja ne cevap verilir?",
    answer:
      "Mesaja doğru cevap vermek için sohbetin bağlamını anlaman gerekir. Flört Mesajı Asistanı, karşı tarafın mesajlarını ve sohbet geçmişini analiz ederek 3 farklı ton ve yaklaşımda cevap önerileri sunar. Samimi, esprili veya romantik ton seçerek en uygun cevabı bulabilirsin.",
  },
  {
    question: "Sevgiliye ne yazılır?",
    answer:
      "Sevgiline yazacağın mesaj, ilişkinizin aşamasına göre değişmelidir. Yeni tanıştıysanız kısa ve samimi; ciddi bir ilişkiyse duygusal ve derin mesajlar daha uygun olur. Asistanımız 4 farklı ilişki aşaması (yeni tanıştık, yazışıyoruz, yakınız, ciddi ilişki) için özelleştirilmiş cevaplar üretir.",
  },
  {
    question: "Flört mesajı nasıl yazılır?",
    answer:
      "Etkili bir flört mesajı: samimi ama baskıcı olmayan, merak uyandıran ve karşı tarafın cevap vermesini kolaylaştıran bir mesajdır. Açık uçlu sorular sormak, karşı tarafın ilgi alanlarına atıfta bulunmak ve abartılı iltifatlardan kaçınmak önemlidir.",
  },
  {
    question: "Mesaj önerileri ücretsiz mi?",
    answer:
      "Evet, Flört Mesajı Asistanı tamamen ücretsizdir. Hesap oluşturman gerekmez. Günde 10 mesaj önerisi alabilirsin. Ücretli bir versiyon planlanmamaktadır.",
  },
  {
    question: "Mesajlarım saklanıyor mu?",
    answer:
      "Hayır. Sohbet metinlerin sunucularımızda saklanmaz. AI'a anlık olarak iletilip cevap üretildikten sonra otomatik olarak silinir. Favorilerin ve geçmişin sadece kendi tarayıcında (localStorage) tutulur.",
  },
];

export default function LandingPage() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://flort-asistani.vercel.app";

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Flört Mesajı Asistanı",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/asistan?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Mesaja Ne Cevap Verilir? — Flört Mesajı Önerisi",
    description:
      "Mesaja ne cevap verilir? Sevgiliye ne yazılır? AI destekli flört mesajı asistanı ile bağlama uygun 3 farklı cevap önerisi al.",
    url: siteUrl,
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    },
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Flört Mesajı Asistanı",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "TRY",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
    },
    description:
      "AI destekli flört mesajı asistanı. Mesaja ne cevap vereceğini bilemiyorsan bağlama uygun 3 farklı cevap önerisi al.",
  };

  return (
    <>
      <JsonLd data={[websiteSchema, webPageSchema, softwareAppSchema]} />
      <LandingContent faqs={faqs} />
    </>
  );
}
