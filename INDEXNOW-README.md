# FlexiKnee — One-Time IndexNow SEO Recovery

Bu workflow otomatik çalışmaz. Yalnızca GitHub Actions ekranından elle
çalıştırıldığında seçilmiş URL'leri IndexNow'a gönderir.

Toplam gönderim:

- 19 önemli canonical URL
- 31 HTTP davranışı 301 olarak değişen eski URL
- 50 URL toplam

## Önce yapılması gereken

SEO Recovery Routing Hotfix deploy'u Vercel'de `Ready` olmalıdır.

Şunları kontrol edin:

1. `/guides/heat-vs-ice-for-knees` -> 200
2. `/guides/post-exercise-knee-pain-guide` -> 301
3. `/olmayan-bir-sayfa-123` -> 404

## Çalıştırma

1. Bu ZIP içindeki `.github` klasörünü repository köküne yükleyin.
2. GitHub repository içinde `Actions` sekmesini açın.
3. Soldan `IndexNow SEO Recovery` workflow'unu seçin.
4. `Run workflow` düğmesine basın.
5. Confirm alanına tam olarak `RUN-ONCE` yazın.
6. Çalıştırın.
7. Logda `IndexNow: submitted 50 changed URL(s), status 200` veya
   `status 202` görülmelidir.

Workflow yalnızca `workflow_dispatch` kullanır; deploy sırasında veya gelecekteki
commitlerde kendiliğinden tekrar çalışmaz.

Bütün sitemap gönderilmez. Account, admin, track-order ve rastgele 404 URL'leri
IndexNow listesinde yoktur.
