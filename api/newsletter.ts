/**
 * Newsletter signup → Shopify Customers
 *
 * Runs only on Vercel serverless function side.
 *
 * Supported server-only environment variables:
 *   SHOPIFY_CLIENT_ID       → Shopify Dev Dashboard Client ID
 *   SHOPIFY_CLIENT_SECRET   → Shopify Dev Dashboard Client Secret
 *   SHOPIFY_STORE_DOMAIN    → your permanent myshopify.com domain
 *
 * Fallback for older custom-app setup:
 *   SHOPIFY_ADMIN_TOKEN
 *
 * Never use VITE_ for Admin API secrets.
 */

const API_VERSION = '2026-07';

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAdminAccessToken(storeDomain: string) {
  const legacyToken = process.env.SHOPIFY_ADMIN_TOKEN;
  if (legacyToken) return legacyToken;

  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing SHOPIFY_CLIENT_ID / SHOPIFY_CLIENT_SECRET');
  }

  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  const response = await fetch(`https://${storeDomain}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.access_token) {
    throw new Error(data?.error_description || data?.error || 'Could not obtain Shopify Admin access token');
  }

  const expiresInSeconds = Number(data.expires_in || 86400);
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + Math.max(60, expiresInSeconds - 300) * 1000,
  };

  return cachedToken.token;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const storeDomain =
    process.env.SHOPIFY_STORE_DOMAIN ||
    process.env.VITE_SHOPIFY_STORE_DOMAIN;

  if (!storeDomain) {
    return res.status(500).json({
      error: 'Server is not configured (SHOPIFY_STORE_DOMAIN missing).',
    });
  }

  const email = String(req.body?.email || '').trim().toLowerCase();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 255;
  if (!emailOk) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  try {
    const adminToken = await getAdminAccessToken(storeDomain);

    const gql = async (query: string, variables: Record<string, unknown>) => {
      const r = await fetch(`https://${storeDomain}/admin/api/${API_VERSION}/graphql.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': adminToken,
        },
        body: JSON.stringify({ query, variables }),
      });

      const json = await r.json();
      if (!r.ok) {
        throw new Error(json?.errors?.[0]?.message || `Shopify Admin API error: ${r.status}`);
      }
      return json;
    };

    const createResult = await gql(
      `mutation createCustomer($input: CustomerInput!) {
        customerCreate(input: $input) {
          customer { id email }
          userErrors { field message }
        }
      }`,
      {
        input: {
          email,
          tags: ['newsletter', 'website-signup', 'flexiknee'],
          emailMarketingConsent: {
            marketingState: 'SUBSCRIBED',
            marketingOptInLevel: 'SINGLE_OPT_IN',
          },
        },
      }
    );

    const createdCustomer = createResult?.data?.customerCreate?.customer;
    const createErrors = createResult?.data?.customerCreate?.userErrors || [];

    if (createdCustomer?.id) {
      return res.status(200).json({ ok: true, created: true });
    }

    const alreadyExists = createErrors.some((err: any) =>
      String(err?.message || '').toLowerCase().includes('has already been taken') ||
      String(err?.message || '').toLowerCase().includes('already exists')
    );

    if (!alreadyExists) {
      return res.status(400).json({
        error: createErrors[0]?.message || 'Could not subscribe email.',
      });
    }

    const searchResult = await gql(
      `query findCustomer($query: String!) {
        customers(first: 1, query: $query) {
          edges { node { id email } }
        }
      }`,
      { query: `email:${email}` }
    );

    const customerId = searchResult?.data?.customers?.edges?.[0]?.node?.id;

    if (!customerId) {
      return res.status(200).json({ ok: true, existing: true });
    }

    const consentResult = await gql(
      `mutation updateMarketingConsent($input: CustomerEmailMarketingConsentUpdateInput!) {
        customerEmailMarketingConsentUpdate(input: $input) {
          customer { id email }
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

    const consentErrors = consentResult?.data?.customerEmailMarketingConsentUpdate?.userErrors || [];
    if (consentErrors.length > 0) {
      return res.status(400).json({ error: consentErrors[0]?.message || 'Could not update marketing consent.' });
    }

    await gql(
      `mutation tagsAdd($id: ID!, $tags: [String!]!) {
        tagsAdd(id: $id, tags: $tags) {
          node { id }
          userErrors { field message }
        }
      }`,
      { id: customerId, tags: ['newsletter', 'website-signup', 'flexiknee'] }
    );

    return res.status(200).json({ ok: true, existing: true });
  } catch (error: any) {
    console.error('[newsletter]', error);
    return res.status(500).json({
      error: 'Could not subscribe right now. Please try again.',
    });
  }
}
