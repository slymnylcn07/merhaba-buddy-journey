/**
 * Merkezi Shopify yapılandırması.
 *
 * Mağaza değiştiğinde KODA DOKUNMAYIN — sadece ortam değişkenlerini güncelleyin:
 *   VITE_SHOPIFY_STORE_DOMAIN     → yeni-magazaniz.myshopify.com (kalıcı domain)
 *   VITE_SHOPIFY_STOREFRONT_TOKEN → Storefront API "Genel Erişim Belirteci"
 *   VITE_SHOPIFY_API_VERSION      → örn. 2025-07 (opsiyonel)
 *
 * Vercel'de: Project → Settings → Environment Variables altına ekleyin,
 * ardından yeniden deploy edin. Lokal geliştirme için .env dosyasına ekleyin.
 *
 * NOT: Buradaki token istemci tarafında görünmesi tasarım gereği normal olan
 * "genel" (public) Storefront token'ıdır. "Özel Erişim Belirteci"ni (shpat_...)
 * ASLA bu projeye eklemeyin — bu bir Vite/SPA projesidir, tüm kod tarayıcıya gider.
 */

export const SHOPIFY_STORE_DOMAIN =
  import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || '';

export const SHOPIFY_STOREFRONT_TOKEN =
  import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '';

export const SHOPIFY_API_VERSION =
  import.meta.env.VITE_SHOPIFY_API_VERSION || '2025-07';

/**
 * Shopify'ın barındırdığı hazır müşteri hesabı sayfası (yeni müşteri hesapları).
 * Format: https://shopify.com/{MAGAZA_ID}/account
 * Mağaza ID'si değişirse VITE_SHOPIFY_CUSTOMER_ACCOUNT_URL env değişkeniyle güncelleyin.
 */
export const SHOPIFY_CUSTOMER_ACCOUNT_URL =
  import.meta.env.VITE_SHOPIFY_CUSTOMER_ACCOUNT_URL ||
  'https://shopify.com/75703189660/account';

export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

export const isShopifyConfigured = (): boolean =>
  Boolean(SHOPIFY_STORE_DOMAIN && SHOPIFY_STOREFRONT_TOKEN);

if (import.meta.env.DEV && !isShopifyConfigured()) {
  console.warn(
    '[Shopify] VITE_SHOPIFY_STORE_DOMAIN ve/veya VITE_SHOPIFY_STOREFRONT_TOKEN tanımlı değil. ' +
      'Ürün ve sepet özellikleri devre dışı kalacak; makaleler ve diğer sayfalar normal çalışır.'
  );
}
