# FlexiKnee Patch 01 — SEO Foundation + Heat vs Ice

Bu paket **tam proje değildir**. Yalnızca güncellenen ve yeni eklenen dosyaları içerir.

## Kurulum

1. Mevcut GitHub projenin yedeğini veya yeni bir branch'ini oluştur.
2. ZIP'i aç.
3. ZIP içindeki klasör ve dosyaları projenin **kök dizinine** kopyala.
4. Aynı isimli mevcut dosyaların üzerine yazılmasına izin ver.
5. Yeni dosyaların da doğru klasör yollarında oluştuğunu kontrol et.
6. GitHub'a commit/push yap; Vercel deployment'ını bekle.

> `node_modules`, `.env`, görseller veya tam proje bu pakette yoktur. Yeni bir npm paketi de eklenmedi.

## Bu patch ne yapıyor?

- `/guides/heat-vs-ice-for-knees` ana ve korunacak Heat/Ice rehberi olarak güçlendirildi.
- Aşağıdaki iki eski URL kalıcı olarak ana rehbere yönlendirildi:
  - `/guides/heat-or-ice-knee-pain-science`
  - `/guides/heat-or-ice-knee-pain-situations`
- Eski duplicate Heat/Ice içerikleri Guides listesinden ve sitemap'ten çıkarıldı.
- İlgili mevcut makalelerdeki iç bağlantılar ana Heat/Ice URL'sine çevrildi.
- `FlexiKnee Editorial Team` yazar bilgisi ve Article/BlogPosting şema alanları güncellendi.
- `/editorial-policy` sayfası eklendi ve footer'a bağlandı.
- Editorial Policy sitemap ve prerender route listesine eklendi.
- Heat/Ice makalesine quick answer, karşılaştırma tablosu, güvenlik sınırları, acil belirtiler ve kaynaklar eklendi.

## Yayın sonrası kontrol edilecek URL'ler

- `https://flexi-knee.com/guides/heat-vs-ice-for-knees`
- `https://flexi-knee.com/editorial-policy`
- `https://flexi-knee.com/guides/heat-or-ice-knee-pain-science`
- `https://flexi-knee.com/guides/heat-or-ice-knee-pain-situations`

Eski iki URL'nin doğrudan **301/308** ile ana Heat/Ice URL'sine gitmesi gerekir.

## Test durumu

- Vite development build: **PASS**
- Değiştirilen TypeScript/TSX dosyalarında targeted ESLint: **PASS — 0 error**
- Mevcut bir makale dosyasında 3 adet eski Fast Refresh warning bulunuyor; deployment'ı engellemez.
- Sitemap kontrolü: **PASS**
- Redirect yapılandırması: **PASS**
- Sandbox ortamı localhost Chromium erişimini engellediği için tam prerender tarayıcı testi burada doğrulanamadı. Kaynak build'i başarıyla tamamlandı.

## Search Console işlemi

Deployment tamamlandıktan sonra yalnızca şu URL için yeniden indeksleme iste:

`https://flexi-knee.com/guides/heat-vs-ice-for-knees`

Eski redirect URL'leri için indeksleme isteği gönderme.

## Duzeltme eki (inceleme sonrasi)
- guides.ts: compression-knee-sleeve-sizing-guide listesi girdisi geri eklendi (onceki pakette dusen kayit).
- heat-vs-ice-authoritative + EditorialPolicy: 10 adet em-dash site kuralina gore temizlendi.
- sitemap.xml yeniden uretildi (120 URL: +editorial-policy, +sleeve-sizing, -2 duplicate).
