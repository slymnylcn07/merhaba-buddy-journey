/**
 * Newsletter signup, Shopify Customers.
 *
 * Server only Vercel function.
 *
 * Required Vercel env:
 * SHOPIFY_STORE_DOMAIN
 * SHOPIFY_CLIENT_ID
 * SHOPIFY_CLIENT_SECRET
 *
 * Optional legacy fallback:
 * SHOPIFY_ADMIN_TOKEN
 *
 * Never expose Admin API secrets with VITE_.
 */

const API_VERSION = process.env.SHOPIFY_ADMIN_API_VERSION || '2025-10';

let cachedToken: { token: string; expiresAt: number } | null = null;

function normalizeShopDomain(value: string) {
  return String(value || '')
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/\/.*$/, '')
    .replace(/\s+/g, '');
}


async function parseBody(req: any) {
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  return req.body || {};
}

async function getAdminAccessToken(storeDomain: string) {
  const legacyToken = process.env.SHOPIFY_ADMIN_TOKEN;
  if (legacyToken) return legacyToken;

  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing SHOPIFY_CLIENT_ID or SHOPIFY_CLIENT_SECRET');
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

  const data = await response.json().catch(() => ({}));

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

function mergeTags(existing: string | undefined) {
  const tags = new Set(
    String(existing || '')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
  );

  tags.add('newsletter');
  tags.add('website-signup');
  tags.add('flexiknee');

  return Array.from(tags).join(', ');
}

async function shopifyRest(storeDomain: string, adminToken: string, path: string, options: RequestInit = {}) {
  const response = await fetch(`https://${storeDomain}/admin/api/${API_VERSION}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': adminToken,
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      data?.errors ||
      data?.error ||
      data?.message ||
      `Shopify REST error ${response.status}`;
    throw new Error(typeof message === 'string' ? message : JSON.stringify(message));
  }

  return data;
}

async function subscribeViaRest(storeDomain: string, adminToken: string, email: string) {
  const search = await shopifyRest(
    storeDomain,
    adminToken,
    `/customers/search.json?query=${encodeURIComponent(`email:${email}`)}`,
    { method: 'GET' }
  );

  const existing = search?.customers?.[0];

  if (existing?.id) {
    await shopifyRest(storeDomain, adminToken, `/customers/${existing.id}.json`, {
      method: 'PUT',
      body: JSON.stringify({
        customer: {
          id: existing.id,
          email,
          tags: mergeTags(existing.tags),
          accepts_marketing: true,
          email_marketing_consent: {
            state: 'subscribed',
            opt_in_level: 'single_opt_in',
          },
        },
      }),
    });

    return { ok: true, existing: true };
  }

  await shopifyRest(storeDomain, adminToken, '/customers.json', {
    method: 'POST',
    body: JSON.stringify({
      customer: {
        email,
        tags: mergeTags(''),
        accepts_marketing: true,
        email_marketing_consent: {
          state: 'subscribed',
          opt_in_level: 'single_opt_in',
        },
      },
    }),
  });

  return { ok: true, created: true };
}

async function subscribeViaGraphql(storeDomain: string, adminToken: string, email: string) {
  const gql = async (query: string, variables: Record<string, unknown>) => {
    const response = await fetch(`https://${storeDomain}/admin/api/${API_VERSION}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminToken,
      },
      body: JSON.stringify({ query, variables }),
    });

    const json = await response.json().catch(() => ({}));

    if (!response.ok || json.errors) {
      throw new Error(json?.errors?.[0]?.message || `Shopify GraphQL error ${response.status}`);
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
    return { ok: true, created: true };
  }

  const alreadyExists = createErrors.some((err: any) =>
    String(err?.message || '').toLowerCase().includes('has already been taken') ||
    String(err?.message || '').toLowerCase().includes('already exists')
  );

  if (!alreadyExists) {
    throw new Error(createErrors[0]?.message || 'Could not create Shopify customer');
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
    return { ok: true, existing: true };
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

  return { ok: true, existing: true };
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const storeDomain = normalizeShopDomain(process.env.SHOPIFY_STORE_DOMAIN || process.env.VITE_SHOPIFY_STORE_DOMAIN || '');

  if (!storeDomain) {
    return res.status(500).json({ error: 'Newsletter is not configured. SHOPIFY_STORE_DOMAIN is missing.' });
  }

  if (!storeDomain.endsWith('.myshopify.com')) {
    return res.status(500).json({
      error: 'Newsletter Shopify Admin domain must be the permanent .myshopify.com domain, not the public website domain.',
    });
  }

  const body = await parseBody(req);
  const email = String(body?.email || '').trim().toLowerCase();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 255;

  if (!emailOk) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  try {
    const adminToken = await getAdminAccessToken(storeDomain);

    try {
      const result = await subscribeViaGraphql(storeDomain, adminToken, email);
      return res.status(200).json(result);
    } catch (graphqlError: any) {
      console.warn('[newsletter] GraphQL path failed, trying REST fallback:', graphqlError?.message || graphqlError);
      const result = await subscribeViaRest(storeDomain, adminToken, email);
      return res.status(200).json(result);
    }
  } catch (error: any) {
    console.error('[newsletter]', error?.message || error);

    return res.status(500).json({
      error: 'Could not subscribe right now. Please try again.',
      detail: process.env.NODE_ENV === 'development' ? String(error?.message || error) : undefined,
    });
  }
}
