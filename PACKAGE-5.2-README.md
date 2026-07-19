# FlexiKnee Paket 5.2

Bu paket, kullanıcının talebi doğrultusunda aşağıdaki işlemleri yapar:

1. Müşteri videolarını gerçek click-to-load sistemine geçirir.
2. Recharts ve Supabase'i ana sayfanın başlangıç yükünden çıkarır.
3. Footer kontrast hatasını düzeltir.
4. Ödeme logolarını yerel asset olarak kullanır.
5. Kullanılmayan `ipapi.co` preconnect ve DNS prefetch kayıtlarını kaldırır.

## Bilerek yapılmayanlar

Kullanıcının talebi doğrultusunda şu iki işlem bu pakete dahil değildir:

- Shopify ürün görsellerine responsive CDN `srcSet` eklenmesi
- Ürün görsellerine yeni açık ölçü veya aspect-ratio eklenmesi

## Uygulama

ZIP içeriğini repository köküne yükleyin ve mevcut dosyaların üzerine yazın.

Yeni klasör:

`public/images/video-posters/`

Mevcut Paket 5, Paket 5.1 veya Paket 5.1.1 yeniden yüklenmemelidir.
