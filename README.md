# Flört Mesajı Asistanı

İlişki aşamana ve tonuna göre en iyi flört mesajını bulan AI destekli web uygulaması.

## Özellikler

- **Sohbet bağlamına uygun öneriler**: Karşı tarafın mesajlarına ve sohbet geçmişine göre kişiselleştirilmiş cevaplar üretir
- **3 farklı ton**: Samimi, Esprili, Romantik
- **4 ilişki aşaması**: Yeni tanıştık, Yazışıyoruz, Yakınız, Ciddi ilişki
- **3 hedef**: Sohbeti sürdür, Buluşma teklif et, İlgi göster
- **3 alternatif mesaj önerisi**: Her zaman farklı yaklaşımlar arasından seçim yapabilirsin
- **İçerik moderasyon filtresi**: Uygunsuz veya manipülatif içerikler otomatik engellenir
- **PWA desteği**: Telefonuna ekle, native app gibi kullan
- **Tek dokunuşla kopyala**: Beğendiğin mesajı anında panoya kopyala
- **Favoriler**: Beğendiğin mesajları kaydet ve sonra tekrar görüntüle
- **Geçmiş**: Daha önce aldığın tüm önerileri görüntüle ve yönet
- **Hesap gerekmez**: Tamamen anonim, localStorage tabanlı

## Hızlı Başlangıç

### 1. Bağımlılıkları yükle

```bash
npm install
```

### 2. Ortam değişkenlerini ayarla

`.env.local.example` dosyasını `.env.local` olarak kopyala ve kendi OpenAI API anahtarını ekle:

```bash
cp .env.local.example .env.local
```

`.env.local` dosyasını düzenle:

```
OPENAI_API_KEY=sk-your-openai-api-key-here
```

API anahtarını [OpenAI Platform](https://platform.openai.com/api-keys) adresinden oluşturabilirsin.

### 3. Geliştirme sunucusunu başlat

```bash
npm run dev
```

Tarayıcıda aç: [http://localhost:3000](http://localhost:3000)

## Deploy

### Vercel (tek komut)

İlk kurulum (bir kere yapılır):

```bash
# 1. Vercel CLI'yi global yükle (opsiyonel, npx de çalışır)
npm i -g vercel

# 2. Login ol (tarayıcı açılır, yetkilendir)
vercel login

# 3. Projeyi Vercel'e bağla
vercel link
```

Bundan sonra her deploy sadece:

```bash
npm run deploy
```

Preview deploy için:

```bash
npm run deploy:preview
```

> **Önemli:** İlk production deploy sonrası Vercel dashboard'dan `OPENAI_API_KEY` ortam değişkenini ekle. Settings → Environment Variables → `OPENAI_API_KEY`.

## Teknolojiler

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript
- Tailwind CSS
- OpenAI GPT-4o-mini API

## Proje Yapısı

```
src/
  app/              # Next.js App Router sayfaları
    api/            # API route'ları (oneri, feedback)
    asistan/        # Ana asistan sayfası
    favoriler/      # Kaydedilen favoriler
    gecmis/         # Öneri geçmişi
  components/       # React bileşenleri
  lib/              # Yardımcı fonksiyonlar ve tipler
public/             # Statik dosyalar (manifest, ikonlar)
```

## Güvenlik, Gizlilik ve Maliyet Kontrolü

- **Mesajlar sunucuda saklanmaz**: Sohbet geçmişi ve mesajlar sadece AI'a anlık olarak iletilir, cevap üretildikten sonra otomatik olarak silinir.
- **Anonim kullanım**: Kullanıcı hesabı veya kimlik doğrulama gerektirmez.
- **Rate limiting**: Saat başına 10 istek ile kötüye kullanım önlenir.
- **Günlük bütçe limiti**: Varsayılan 1 USD/gün. Limit aşıldığında API istekleri otomatik reddedilir.
- **Token ve maliyet takibi**: Her isteğin token kullanımı ve tahmini maliyeti sunucuda tutulur. `/api/usage` endpoint'inden canlı olarak izlenebilir.
- **İçerik filtresi**: Türkçe küfür, yetişkin içerik ve manipülatif mesajlar otomatik olarak reddedilir.

### Maliyet Takibi

Günlük kullanımı ve kalan bütçeyi görüntüle:

```bash
curl http://localhost:3000/api/usage
```

Örnek yanıt:

```json
{
  "date": "2026-05-17",
  "requests": 12,
  "promptTokens": 3400,
  "completionTokens": 890,
  "totalTokens": 4290,
  "estimatedCost": 0.0642,
  "budget": 1.0,
  "remainingBudget": 0.9358,
  "budgetExceeded": false
}
```

Bütçeyi değiştirmek için `.env.local` içine ekle:

```
DAILY_BUDGET_USD=2.50
```

## Katkıda Bulunma

Katkılar memnuniyetle karşılanır. Lütfen önce bir issue açın veya mevcut issue'ları kontrol edin.

## Lisans

MIT
