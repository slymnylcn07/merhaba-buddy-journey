# FlexiKnee Paket 5 — Performans ve Mimari

Bu yama repository yollarını korur. ZIP açıldığında `src`, `public`, `scripts`,
`index.html` ve `package.json` doğrudan repository köküyle birleşmelidir.

## Uygulama sırası

1. ZIP içeriğini repository köküne yükleyin ve mevcut dosyaların üzerine yazın.
2. İlk Vercel deploy'un başarılı olmasını bekleyin.
3. `DELETE_FILES-PACKAGE-5.txt` içindeki eski dosyaları silin.
4. Temizlik commit'inden sonra yeniden deploy edin.

Paket 4 veya eski hotfix dosyalarını yeniden yüklemeyin.

## Paket kapsamı

- AVIF + WebP hero, guide thumbnail ve ürün hikâyesi görselleri
- Ortak `ResponsiveImage` picture bileşeni
- 94 rehber için slug bazlı lazy article loader
- Related guide thumbnail lazy loading
- Ana sayfadaki aşağı-katman bileşenleri için lazy loading
- Eski toplu article barrel importlarının kaldırılması
- Source/content/performance/build doğrulamalarının build zincirine eklenmesi
- 105 URL'lik güncel sitemap
- 43 kullanılmayan veya dönüştürülmüş eski asset için güvenli silme listesi
