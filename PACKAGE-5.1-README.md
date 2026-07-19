# FlexiKnee Paket 5.1 — Ürün URL, Görsel Stabilitesi ve llms.txt Hotfix

Bu paket Paket 5'in tamamı değildir. Yalnızca aşağıdaki sorunları düzeltir:

1. Ana ürün sayfasında eski/fallback görselin anlık görünmesi
2. Ürünler arasında geçişte önceki ürün görselinin bir kare görünmesi
3. `/product/flexiknee-compression-support-sleeve` URL'sinin ürün bulamaması
4. Shopify handle'ında bulunan `™` işaretinin temiz URL ile eşlenmesi
5. Shop, quiz, ürün sistemi ve makale CTA bağlantılarının temiz ürün URL'sini kullanması
6. Geçerli H1 ve Markdown bağlantıları içeren `/llms.txt`
7. `llms.txt` için doğru text/plain response header

## Uygulama

ZIP içeriğini repository köküne yükleyin ve mevcut dosyaların üzerine yazın.

Özellikle şu dosyalar overwrite edilmelidir:

- `src/pages/ProductDetail.tsx`
- `src/pages/SecondaryProductDetail.tsx`
- `src/pages/ProductRoute.tsx`
- `src/lib/product-config.ts`
- `src/lib/shopify.ts`
- `src/pages/Shop.tsx`
- `vercel.json`

Yeni dosya:

- `public/llms.txt`

Paket 5'i veya Paket 4'ü yeniden yüklemeyin.
