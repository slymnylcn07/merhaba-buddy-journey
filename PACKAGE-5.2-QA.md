# Paket 5.2 QA

## Geçen kontroller

- Source validation: geçti — 223 text file
- Content registry: geçti — 94 active guide / 94 lazy loader / 18 redirect
- Performance asset validation: geçti
- Vite production build: geçti — 4,083 module

## Ana sayfa başlangıç yükü

Production `dist/index.html` içinde kalan module preload dosyaları:

- vendor-react
- vendor-query
- vendor-ui

Aşağıdaki preload dosyaları artık yok:

- vendor-recharts
- vendor-supabase

Ana giriş bundle'ında aşağıdaki ifadeler bulunmadı:

- `recharts`
- `supabase`
- `customer-review-*.mp4`
- `upload.wikimedia.org`
- `ipapi.co`

## Video davranışı

- İlk render'da `<video>` elementi üretilmez.
- Beş adet WebP posterin toplam boyutu yaklaşık 84 KiB'dir.
- MP4 kaynağı yalnızca kullanıcı ilgili video kartına tıkladıktan sonra DOM'a eklenir.
- Video elementi etkinleştirildiğinde `preload="none"` kullanır.

## Erişilebilirlik ve üçüncü taraflar

- Footer yasal metni `text-slate-400` yerine `text-slate-600` kullanır.
- Yedi ödeme logosu yerel SVG asset olarak yüklenir.
- Wikimedia ödeme logo istekleri kaldırılmıştır.
- `ipapi.co` yalnızca gerektiğinde çalışma zamanında çağrılabilir; başlangıç preconnect'i kaldırılmıştır.
