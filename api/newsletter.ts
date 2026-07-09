/**
 * Bülten kaydı → Shopify müşterisi
 *
 * Bu fonksiyon Vercel'de sunucu tarafında çalışır (repo kökündeki /api klasörü).
 * Gelen e-postayı Shopify Admin API ile "e-posta pazarlaması onaylı" müşteri
 * olarak kaydeder. Böylece tüm kayıtlar Shopify → Müşteriler altında görünür.
 *
 * GEREKLİ ORTAM DEĞİŞKENLERİ (Vercel → Settings → Environment Variables):
 *   SHOPIFY_ADMIN_TOKEN  → Özel uygulamanın Admin API erişim belirteci (shpat_...)
 *                          (VITE_ öneki YOK — bu değişken tarayıcıya asla gitmez)
 *   VITE_SHOPIFY_STORE_DOMAIN → zaten ekli (flexi-knee-store.myshopify.com)
 */

const API_VERSION = '2025-07';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const storeDomain = process.env.VITE_SHOPIFY_STORE_DOMAIN;
  const adminToken = process.env.SHOPIFY_ADMIN_TOKEN;

  if (!storeDomain || !adminToken) {
    return res.status(500).json({
      error: 'Server is not configured (SHOPIFY_ADMIN_TOKEN missing).',
    });
  }

  const email = String(req.body?.email || '').trim().toLowerCase();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 255;
  if (!emailOk) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const gql = async (query: string, variables: Record<string, unknown>) => {
    const r = await fetch(
      `https://${storeDomain}/admin/api/${API_VERSION}/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': adminToken,
        },
        body: JSON.stringify({ query, variables }),
      }
    );
    return r.json();
  };

  try {
    // 1) Müşteriyi oluşturmayı dene
    const createResult = await gql(
      `mutation createCustomer($input: CustomerInput!) {
        customerCreate(input: $input) {
          customer { id }
          userErrors { field message }
        }
      }`,
      {
        input: {
          email,
          emailMarketingConsent: {
            marketingState: 'SUBSCRIBED',
            marketingOptInLevel: 'SINGLE_OPT_IN',
          },
          tags: ['newsletter', 'website-signup'],
        },
      }
    );

    const createErrors = createResult?.data?.customerCreate?.userErrors || [];
    const alreadyExists = createErrors.some((e: any) =>
      String(e.message || '').toLowerCase().includes('taken')
    );

    if (createResult?.data?.customerCreate?.customer?.id) {
      return res.status(200).json({ ok: true, message: 'Subscribed!' });
    }

    // 2) Zaten kayıtlıysa: mevcut müşteriyi bul ve pazarlama iznini güncelle
    if (alreadyExists) {
      const search = await gql(
        `query findCustomer($q: String!) {
          customers(first: 1, query: $q) { edges { node { id } } }
        }`,
        { q: `email:${email}` }
      );
      const customerId = search?.data?.customers?.edges?.[0]?.node?.id;

      if (customerId) {
        await gql(
          `mutation updateConsent($input: CustomerEmailMarketingConsentUpdateInput!) {
            customerEmailMarketingConsentUpdate(input: $input) {
              userErrors { field message }
            }
          }`,
          {
            input: {
              customerId,
              emailMarketingConsent: {
                marketingState: 'SUBSCRIBED',
                marketingOptInLevel: 'SINGLE_OPT_IN',
              },
            },
          }
        );
      }
      return res.status(200).json({ ok: true, message: 'Subscribed!' });
    }

    const firstError = createErrors[0]?.message || 'Subscription failed.';
    return res.status(422).json({ error: firstError });
  } catch (err) {
    return res.status(502).json({ error: 'Could not reach Shopify. Please try again.' });
  }
}
