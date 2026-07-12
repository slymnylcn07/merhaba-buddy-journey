/**
 * FlexiKnee newsletter + knee quiz capture endpoint.
 *
 * The browser only calls /api/newsletter. Shopify Admin credentials stay on Vercel.
 *
 * Required Vercel environment variables:
 *   SHOPIFY_STORE_DOMAIN      permanent *.myshopify.com domain
 *   SHOPIFY_CLIENT_ID         FlexiKnee Newsletter API client ID
 *   SHOPIFY_CLIENT_SECRET     FlexiKnee Newsletter API client secret
 *
 * Optional legacy fallback:
 *   SHOPIFY_ADMIN_TOKEN
 *
 * Required app scopes:
 *   read_customers, write_customers
 */

const API_VERSION = process.env.SHOPIFY_ADMIN_API_VERSION || '2026-07';
const QUIZ_TRIGGER_TAG = 'quiz-plan-requested';

type JsonObject = Record<string, unknown>;

interface ApiRequest {
  method?: string;
  body?: unknown;
}

interface ApiResponse {
  status: (statusCode: number) => ApiResponse;
  json: (payload: unknown) => unknown;
}

interface ShopifyUserError {
  field?: string[] | null;
  message: string;
  code?: string;
}

interface ShopifyCustomer {
  id: string;
  email?: string | null;
  tags: string[];
}

interface QuizPayload {
  resultKey?: unknown;
  productKey?: unknown;
  sourceArticle?: unknown;
}

interface NewsletterBody {
  email?: unknown;
  consent?: unknown;
  source?: unknown;
  quiz?: QuizPayload | null;
}

interface TokenResponse {
  access_token?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
}

interface GraphqlEnvelope<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

let cachedToken: { token: string; expiresAt: number } | null = null;

function normalizeShopDomain(value: string): string {
  return String(value || '')
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/\/.*$/, '')
    .replace(/\s+/g, '');
}

async function parseBody(req: ApiRequest): Promise<NewsletterBody> {
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body) as NewsletterBody;
    } catch {
      return {};
    }
  }

  if (req.body && typeof req.body === 'object') {
    return req.body as NewsletterBody;
  }

  return {};
}

function safeToken(value: unknown, fallback: string): string {
  const cleaned = String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  return cleaned || fallback;
}

function normalizeEmail(value: unknown): string {
  return String(value || '').trim().toLowerCase();
}

function validEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 255;
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

async function getAdminAccessToken(storeDomain: string): Promise<string> {
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

  const data = await response.json().catch(() => ({})) as TokenResponse;

  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || data.error || 'Could not obtain Shopify Admin access token');
  }

  const expiresInSeconds = Number(data.expires_in || 86400);
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + Math.max(60, expiresInSeconds - 300) * 1000,
  };

  return cachedToken.token;
}

async function shopifyGraphql<T>(
  storeDomain: string,
  adminToken: string,
  query: string,
  variables: JsonObject
): Promise<T> {
  const response = await fetch(`https://${storeDomain}/admin/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': adminToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json().catch(() => ({})) as GraphqlEnvelope<T>;
  if (!response.ok || json.errors?.length) {
    throw new Error(json.errors?.[0]?.message || `Shopify GraphQL error ${response.status}`);
  }
  if (!json.data) throw new Error('Shopify returned an empty GraphQL response');
  return json.data;
}

async function findCustomer(
  storeDomain: string,
  adminToken: string,
  email: string
): Promise<ShopifyCustomer | null> {
  const data = await shopifyGraphql<{
    customers: { edges: Array<{ node: ShopifyCustomer }> };
  }>(
    storeDomain,
    adminToken,
    `query findCustomer($query: String!) {
      customers(first: 1, query: $query) {
        edges {
          node {
            id
            email
            tags
          }
        }
      }
    }`,
    { query: `email:${email}` }
  );

  return data.customers.edges[0]?.node || null;
}

async function createCustomer(
  storeDomain: string,
  adminToken: string,
  email: string
): Promise<ShopifyCustomer | null> {
  const data = await shopifyGraphql<{
    customerCreate: {
      customer: ShopifyCustomer | null;
      userErrors: ShopifyUserError[];
    };
  }>(
    storeDomain,
    adminToken,
    `mutation createCustomer($input: CustomerInput!) {
      customerCreate(input: $input) {
        customer { id email tags }
        userErrors { field message }
      }
    }`,
    {
      input: {
        email,
        tags: ['newsletter', 'website-signup', 'flexiknee', 'flexiknee-newsletter-api'],
      },
    }
  );

  const { customer, userErrors } = data.customerCreate;
  if (customer?.id) return customer;

  const duplicate = userErrors.some((error) => {
    const message = error.message.toLowerCase();
    return message.includes('already') || message.includes('taken');
  });

  if (duplicate) return findCustomer(storeDomain, adminToken, email);
  throw new Error(userErrors[0]?.message || 'Could not create Shopify customer');
}

async function updateEmailConsent(
  storeDomain: string,
  adminToken: string,
  customerId: string
): Promise<void> {
  const data = await shopifyGraphql<{
    customerEmailMarketingConsentUpdate: { userErrors: ShopifyUserError[] };
  }>(
    storeDomain,
    adminToken,
    `mutation updateConsent($input: CustomerEmailMarketingConsentUpdateInput!) {
      customerEmailMarketingConsentUpdate(input: $input) {
        customer { id }
        userErrors { field message }
      }
    }`,
    {
      input: {
        customerId,
        emailMarketingConsent: {
          marketingState: 'SUBSCRIBED',
          marketingOptInLevel: 'SINGLE_OPT_IN',
          consentUpdatedAt: new Date().toISOString(),
        },
      },
    }
  );

  const errors = data.customerEmailMarketingConsentUpdate.userErrors;
  if (errors.length) throw new Error(errors[0]?.message || 'Could not update email consent');
}

async function removeTags(
  storeDomain: string,
  adminToken: string,
  customerId: string,
  tags: string[]
): Promise<void> {
  if (!tags.length) return;
  const data = await shopifyGraphql<{
    tagsRemove: { userErrors: ShopifyUserError[] };
  }>(
    storeDomain,
    adminToken,
    `mutation removeTags($id: ID!, $tags: [String!]!) {
      tagsRemove(id: $id, tags: $tags) {
        node { id }
        userErrors { field message }
      }
    }`,
    { id: customerId, tags }
  );
  const errors = data.tagsRemove.userErrors;
  if (errors.length) throw new Error(errors[0]?.message || 'Could not refresh customer tags');
}

async function addTags(
  storeDomain: string,
  adminToken: string,
  customerId: string,
  tags: string[]
): Promise<void> {
  const data = await shopifyGraphql<{
    tagsAdd: { userErrors: ShopifyUserError[] };
  }>(
    storeDomain,
    adminToken,
    `mutation addTags($id: ID!, $tags: [String!]!) {
      tagsAdd(id: $id, tags: $tags) {
        node { id }
        userErrors { field message }
      }
    }`,
    { id: customerId, tags }
  );
  const errors = data.tagsAdd.userErrors;
  if (errors.length) throw new Error(errors[0]?.message || 'Could not add customer tags');
}

async function saveQuizMetafield(
  storeDomain: string,
  adminToken: string,
  customerId: string,
  value: JsonObject
): Promise<void> {
  const data = await shopifyGraphql<{
    metafieldsSet: { userErrors: ShopifyUserError[] };
  }>(
    storeDomain,
    adminToken,
    `mutation saveQuizProfile($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields { id namespace key }
        userErrors { field message code }
      }
    }`,
    {
      metafields: [
        {
          ownerId: customerId,
          namespace: 'flexiknee',
          key: 'knee_quiz_profile',
          type: 'json',
          value: JSON.stringify(value),
        },
      ],
    }
  );

  const errors = data.metafieldsSet.userErrors;
  if (errors.length) throw new Error(errors[0]?.message || 'Could not save quiz profile');
}

export default async function handler(req: ApiRequest, res: ApiResponse): Promise<unknown> {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const storeDomain = normalizeShopDomain(
    process.env.SHOPIFY_STORE_DOMAIN || process.env.VITE_SHOPIFY_STORE_DOMAIN || ''
  );

  if (!storeDomain) {
    return res.status(500).json({ error: 'Newsletter is not configured. SHOPIFY_STORE_DOMAIN is missing.' });
  }

  if (!storeDomain.endsWith('.myshopify.com')) {
    return res.status(500).json({
      error: 'Shopify Admin requests must use the permanent .myshopify.com domain.',
    });
  }

  const body = await parseBody(req);
  const email = normalizeEmail(body.email);
  const consent = body.consent === true;
  const source = safeToken(body.source, 'website');
  const quiz = body.quiz && typeof body.quiz === 'object' ? body.quiz : null;

  if (!validEmail(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  if (!consent) {
    return res.status(400).json({ error: 'Please confirm that you want to receive the routine by email.' });
  }

  try {
    const adminToken = await getAdminAccessToken(storeDomain);
    let customer = await findCustomer(storeDomain, adminToken, email);
    if (!customer) customer = await createCustomer(storeDomain, adminToken, email);
    if (!customer?.id) throw new Error('Shopify customer could not be resolved');

    await updateEmailConsent(storeDomain, adminToken, customer.id);

    const resultKey = safeToken(quiz?.resultKey, 'general-comfort');
    const productKey = safeToken(quiz?.productKey, 'smart-knee-massager');
    const sourceArticle = safeToken(quiz?.sourceArticle, 'direct');

    const oldDynamicTags = customer.tags.filter((tag) =>
      tag.startsWith('quiz-result-') || tag.startsWith('quiz-product-') || tag === QUIZ_TRIGGER_TAG
    );
    await removeTags(storeDomain, adminToken, customer.id, oldDynamicTags);

    const tags = [
      'newsletter',
      'website-signup',
      'flexiknee',
      'flexiknee-newsletter-api',
      `signup-source-${source}`,
    ];

    if (quiz) {
      tags.push(
        'knee-quiz',
        `quiz-result-${resultKey}`,
        `quiz-product-${productKey}`,
        QUIZ_TRIGGER_TAG
      );
    }

    await addTags(storeDomain, adminToken, customer.id, tags);

    let profileSaved = false;
    if (quiz) {
      try {
        await saveQuizMetafield(storeDomain, adminToken, customer.id, {
          resultKey,
          productKey,
          sourceArticle,
          source,
          completedAt: new Date().toISOString(),
        });
        profileSaved = true;
      } catch (metafieldError: unknown) {
        // Tagging and consent are the core workflow. A missing metafield permission
        // should not block the signup or the Shopify Flow trigger.
        console.warn('[newsletter] quiz metafield was not saved:', errorMessage(metafieldError));
      }
    }

    // Hos geldin e-postasi: kupon kodunu kutusuna gonder.
    // Resend'de flexi-knee.com dogrulanana kadar keyfi alicilara gonderim
    // BASARISIZ olabilir - bu yuzden kayit akisini asla bozmuyoruz.
    sendWelcomeEmail(email).catch((err) =>
      console.error('Welcome email failed (signup still OK):', err)
    );

    return res.status(200).json({
      ok: true,
      customerStored: true,
      profileSaved,
      automationTrigger: quiz ? QUIZ_TRIGGER_TAG : null,
    });
  } catch (error: unknown) {
    console.error('[newsletter]', errorMessage(error));
    return res.status(500).json({
      error: 'Could not save your email right now. Please try again.',
      detail: process.env.NODE_ENV === 'development' ? errorMessage(error) : undefined,
    });
  }
}

/**
 * Hos geldin e-postasi (GUIDE10 kodu) - Resend uzerinden.
 * Gereksinim: Vercel'de RESEND_API_KEY ve (alan adi dogrulaninca)
 * RESEND_FROM ornegi "FlexiKnee <hello@flexi-knee.com>".
 */
const WELCOME_DISCOUNT_CODE = 'GUIDE10';

async function sendWelcomeEmail(toEmail: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;
  const from = process.env.RESEND_FROM || 'FlexiKnee <onboarding@resend.dev>';

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [toEmail],
      subject: 'Your 10% welcome code is inside',
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;padding:28px 20px;color:#0f172a;">
          <h1 style="font-size:22px;margin:0 0 8px;">Welcome to FlexiKnee</h1>
          <p style="font-size:14px;line-height:22px;color:#475569;margin:0 0 20px;">
            Thanks for joining the comfort list. New guides will land in your inbox first,
            and here is your welcome discount for any FlexiKnee device:
          </p>
          <div style="text-align:center;margin:24px 0;">
            <span style="display:inline-block;border:2px dashed #93c5fd;background:#eff6ff;color:#1d4ed8;font-size:22px;font-weight:800;letter-spacing:4px;padding:12px 28px;border-radius:14px;">
              ${WELCOME_DISCOUNT_CODE}
            </span>
            <p style="font-size:12px;color:#94a3b8;margin:8px 0 0;">10% off, applied at checkout</p>
          </div>
          <div style="text-align:center;margin:26px 0;">
            <a href="https://flexi-knee.com/shop" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:13px 30px;border-radius:999px;">
              Shop with 10% off
            </a>
          </div>
          <p style="font-size:12px;line-height:18px;color:#94a3b8;margin:20px 0 0;">
            You are receiving this because you signed up at flexi-knee.com.
            Reply to this email any time - a real person reads it.
          </p>
        </div>
      `,
    }),
  });

  if (!r.ok) {
    const body = await r.text().catch(() => '');
    throw new Error(`Resend ${r.status}: ${body.slice(0, 200)}`);
  }
}
