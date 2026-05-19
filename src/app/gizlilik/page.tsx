import type { Metadata } from "next";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { DataDeletion } from "@/components/data-deletion";

export const metadata: Metadata = {
  title: "Gizlilik Politikası — Flört Mesajı Asistanı",
  description:
    "Kişisel verilerinizin korunması ve işlenmesi hakkında bilgi. KVKK uyumlu gizlilik politikası.",
  alternates: {
    canonical: "/gizlilik",
  },
};

export default function GizlilikPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950 sm:p-5">
      <div className="mx-auto max-w-3xl sm:min-h-[calc(100vh-40px)] sm:rounded-[22px] border-0 sm:border border-slate-200 bg-white shadow-none sm:shadow-2xl shadow-slate-200/80">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-[#080c22] px-5 py-5 text-white">
          <Link href="/" aria-label="Ana sayfaya dön">
            <BrandMark />
          </Link>
          <Link
            href="/"
            className="rounded-xl border border-white/15 px-4 py-2 text-sm text-slate-200 hover:bg-white/10 transition-colors"
          >
            ← Ana Sayfa
          </Link>
        </header>

        {/* Content */}
        <article className="px-5 py-8 sm:px-10 sm:py-12">
          <h1 className="text-3xl font-black tracking-tight text-slate-950">
            Gizlilik Politikası
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Son güncelleme: 18 Mayıs 2026
          </p>

          <div className="mt-8 space-y-10">
            {/* 1. Veri Sorumlusu */}
            <section>
              <h2 className="text-xl font-bold text-slate-900">
                1. Veri Sorumlusu
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca,
                Flört Mesajı Asistanı ("Uygulama") kapsamında işlenen kişisel
                verilerinizin veri sorumlusu olarak belirlenmiştir.
              </p>
            </section>

            {/* 2. Toplanan Veriler */}
            <section>
              <h2 className="text-xl font-bold text-slate-900">
                2. Hangi Veriler Toplanır?
              </h2>
              <div className="mt-4 space-y-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-sm font-bold text-slate-800">
                    Çerez Verileri
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    <code className="rounded bg-slate-200 px-1.5 py-0.5 text-xs">
                      fm_client_id
                    </code>{" "}
                    adlı HTTP çerezi, rate limiting (istek sınırlama) amacıyla
                    kullanılır. Bu çerez anonim bir tanımlayıcı içerir, kişisel
                    bilgi (ad, e-posta, telefon vb.) barındırmaz. Süresi: 1 yıl.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-sm font-bold text-slate-800">
                    Tarayıcı Depolama (localStorage)
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Aşağıdaki veriler yalnızca sizin tarayıcınızda saklanır,
                    sunucularımıza gönderilmez:
                  </p>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-600">
                    <li>
                      <code className="rounded bg-slate-200 px-1.5 py-0.5 text-xs">
                        fm_sohbet
                      </code>{" "}
                      — Sohbet geçmişiniz (en fazla 10 mesaj)
                    </li>
                    <li>
                      <code className="rounded bg-slate-200 px-1.5 py-0.5 text-xs">
                        fm_favoriler
                      </code>{" "}
                      — Favori mesaj önerileriniz
                    </li>
                    <li>
                      <code className="rounded bg-slate-200 px-1.5 py-0.5 text-xs">
                        fm_gecmis
                      </code>{" "}
                      — Öneri geçmişiniz (en fazla 50 kayıt)
                    </li>
                  </ul>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-sm font-bold text-slate-800">
                    AI Servisine Gönderilen Veriler
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Mesaj önerisi üretmek için girdiğiniz sohbet metinleri ve
                    seçimleriniz (ton, ilişki aşaması, hedef) OpenAI API'sine
                    iletilir. Bu veriler sunucularımızda saklanmaz; anlık işleme
                    sonrası silinir. OpenAI'nin veri işleme politikası için{" "}
                    <a
                      href="https://openai.com/policies/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 underline hover:text-pink-700"
                    >
                      OpenAI Gizlilik Politikası
                    </a>{" "}
                    sayfasını inceleyebilirsiniz.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. İşleme Amaçları */}
            <section>
              <h2 className="text-xl font-bold text-slate-900">
                3. Verileriniz Neden İşlenir?
              </h2>
              <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-6 text-slate-600">
                <li>
                  <strong className="text-slate-800">
                    Hizmet sunumu:
                  </strong>{" "}
                  AI destekli mesaj önerileri üretmek için sohbet metinlerinizi
                  işlemek.
                </li>
                <li>
                  <strong className="text-slate-800">
                    Güvenlik ve kötüye kullanım önleme:
                  </strong>{" "}
                  Rate limiting ile sistemin kötüye kullanımını engellemek ve
                  API bütçesini korumak.
                </li>
                <li>
                  <strong className="text-slate-800">
                    Kullanıcı deneyimi:
                  </strong>{" "}
                  Sohbet geçmişini ve favorilerinizi tarayıcınızda saklayarak
                    tekrar ziyaretlerinizde devam etmenizi sağlamak.
                </li>
                <li>
                  <strong className="text-slate-800">
                    Geri bildirim analizi:
                  </strong>{" "}
                  Anonim geri bildirimler (iyi/kötü) ile hizmet kalitesini
                  iyileştirmek.
                </li>
              </ul>
            </section>

            {/* 4. Hukuki Dayanak */}
            <section>
              <h2 className="text-xl font-bold text-slate-900">
                4. Hukuki Dayanak
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Kişisel verileriniz, KVKK'nın 5. maddesinde belirtilen aşağıdaki
                hukuki sebeplere dayanarak işlenmektedir:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm leading-6 text-slate-600">
                <li>
                  Bir hakkın tesisi, kullanılması veya korunması için veri
                  işlemenin zorunlu olması (KVKK Md. 5/2-e)
                </li>
                <li>
                  Veri sorumlusunun meşhur menfaatleri için zorunlu olması,
                  temel hak ve özgürlüklerinize zarar vermemek kaydıyla (KVKK
                  Md. 5/2-f)
                </li>
              </ul>
            </section>

            {/* 5. Veri Saklama Süresi */}
            <section>
              <h2 className="text-xl font-bold text-slate-900">
                5. Veri Saklama Süresi
              </h2>
              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="pb-2 text-left font-semibold text-slate-800">
                          Veri Türü
                        </th>
                        <th className="pb-2 text-left font-semibold text-slate-800">
                          Saklama Süresi
                        </th>
                        <th className="pb-2 text-left font-semibold text-slate-800">
                          Saklama Yeri
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600">
                      <tr className="border-b border-slate-100">
                        <td className="py-2">fm_client_id çerezi</td>
                        <td className="py-2">1 yıl</td>
                        <td className="py-2">Tarayıcı</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2">Sohbet geçmişi</td>
                        <td className="py-2">Siz silene kadar</td>
                        <td className="py-2">Tarayıcı (localStorage)</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2">Favoriler</td>
                        <td className="py-2">Siz silene kadar</td>
                        <td className="py-2">Tarayıcı (localStorage)</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2">Öneri geçmişi</td>
                        <td className="py-2">Maks. 50 kayıt</td>
                        <td className="py-2">Tarayıcı (localStorage)</td>
                      </tr>
                      <tr>
                        <td className="py-2">AI'a gönderilen mesajlar</td>
                        <td className="py-2">Saklanmaz</td>
                        <td className="py-2">Anlık işleme</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* 6. KVKK Haklarınız */}
            <section>
              <h2 className="text-xl font-bold text-slate-900">
                6. KVKK Kapsamındaki Haklarınız
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-6 text-slate-600">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>
                  Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme
                </li>
                <li>
                  Kişisel verilerinizin işlenme amacını ve bunların amacına
                  uygun kullanılıp kullanılmadığını öğrenme
                </li>
                <li>
                  Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı
                  üçüncü kişileri bilme
                </li>
                <li>
                  Kişisel verilerinizin eksik veya yanlış işlenmiş olması
                  hâlinde bunların düzeltilmesini isteme
                </li>
                <li>
                  KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel
                  verilerinizin silinmesini veya yok edilmesini isteme
                </li>
                <li>
                  Düzeltilme, silinme veya yok edilme işlemlerinin kişisel
                  verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme
                </li>
                <li>
                  İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla
                  analiz edilmesi suretiyle aleyhinize bir sonucun ortaya
                  çıkmasına itiraz etme
                </li>
                <li>
                  Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle
                  zarara uğramanız hâlinde zararın giderilmesini talep etme
                </li>
              </ul>
              <div className="mt-4 rounded-xl border border-pink-200 bg-pink-50 p-4">
                <p className="text-sm leading-6 text-pink-800">
                  <strong className="font-bold">Verilerinizi silmek için:</strong>{" "}
                  Tarayıcınızın ayarlarından çerezleri ve site verilerini
                  temizleyebilirsiniz. Bu işlem tüm localStorage verilerinizi
                  (sohbet geçmişi, favoriler, öneri geçmişi) kalıcı olarak
                  silecektir.
                </p>
              </div>
            </section>

            {/* 7. Üçüncü Taraf Hizmetler */}
            <section>
              <h2 className="text-xl font-bold text-slate-900">
                7. Üçüncü Taraf Hizmetler
              </h2>
              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-sm font-bold text-slate-800">
                    OpenAI API
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Mesaj önerileri üretmek için OpenAI'nin GPT-4o-mini modeli
                    kullanılmaktadır. Girdiğiniz veriler OpenAI sunucularına
                    iletilir. OpenAI'nin gizlilik politikası için{" "}
                    <a
                      href="https://openai.com/policies/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 underline hover:text-pink-700"
                    >
                      openai.com/policies/privacy-policy
                    </a>{" "}
                    adresini ziyaret edin.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-sm font-bold text-slate-800">
                    Upstash Redis
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Rate limiting ve günlük maliyet takibi için Upstash Redis
                    kullanılmaktadır. Bu hizmet yalnızca anonim istek sayaçlarını
                    ve token kullanım istatistiklerini saklar; kişisel veri
                    içermez.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-sm font-bold text-slate-800">
                    Vercel (Hosting)
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Uygulama Vercel platformunda barındırılmaktadır. Vercel,
                    sunucu logları ve erişim verilerini kendi gizlilik politikası
                    kapsamında işleyebilir. Detaylar için{" "}
                    <a
                      href="https://vercel.com/legal/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 underline hover:text-pink-700"
                    >
                      vercel.com/legal/privacy-policy
                    </a>{" "}
                    adresini ziyaret edin.
                  </p>
                </div>
              </div>
            </section>

            {/* 8. Güvenlik */}
            <section>
              <h2 className="text-xl font-bold text-slate-900">
                8. Veri Güvenliği
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Kişisel verilerinizin güvenliği için aşağıdaki teknik ve idari
                önlemler alınmıştır:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm leading-6 text-slate-600">
                <li>
                  Tüm iletişim HTTPS/TLS şifreli bağlantı üzerinden
                  gerçekleştirilir
                </li>
                <li>
                  API anahtarları sunucu tarafında saklanır, istemciye
                  gönderilmez
                </li>
                <li>
                  İçerik moderasyon filtresi ile uygunsuz içerikler otomatik
                  engellenir
                </li>
                <li>
                  Rate limiting ile kötüye kullanım ve DDoS saldırıları önlenir
                </li>
                <li>
                  Günlük bütçe limiti ile API maliyetleri kontrol altında tutulur
                </li>
                <li>
                  Tarayıcı verileri (localStorage) yalnızca sizin cihazınızda
                  saklanır
                </li>
              </ul>
            </section>

            {/* 9. Değişiklikler */}
            <section>
              <h2 className="text-xl font-bold text-slate-900">
                9. Politika Değişiklikleri
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Bu gizlilik politikası, yasal düzenlemeler veya uygulama
                güncellemeleri doğrultusunda güncellenebilir. Önemli
                değişiklikler olması durumunda, uygulama üzerinden bildirim
                yapılacaktır.
              </p>
            </section>

            {/* 10. İletişim */}
            <section>
              <h2 className="text-xl font-bold text-slate-900">
                10. İletişim
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Gizlilik politikamız veya kişisel verilerinizin işlenmesi
                hakkında sorularınız için bizimle iletişime geçebilirsiniz.
              </p>
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-600">
                  <strong className="text-slate-800">E-posta:</strong>{" "}
                  <a
                    href="mailto:info@flort-asistani.com"
                    className="text-pink-600 underline hover:text-pink-700"
                  >
                    info@flort-asistani.com
                  </a>
                </p>
              </div>
            </section>

            <DataDeletion />
          </div>
        </article>
      </div>
    </main>
  );
}
