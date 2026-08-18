const ENSURE_COOKIES_QUERY =
  'query ensureCookies { consentManagement { cookies(visitorConsent:{}) { cookieDomain } } }';
const MAX_REQUEST_BYTES = 16 * 1024;
const SHOPIFY_COOKIE_NAMES = new Set([
  '_cmp_a',
  '_shopify_analytics',
  '_shopify_essential',
  '_shopify_marketing',
]);

interface TrackingRequest {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
}

interface TrackingResponse {
  setHeader(name: string, value: string | string[]): void;
  status(code: number): TrackingResponse;
  json(body: unknown): unknown;
  send(body: string): unknown;
}

function readHeader(req: TrackingRequest, name: string): string {
  const value = req.headers[name.toLowerCase()] ?? req.headers[name];
  return Array.isArray(value) ? value[0] || '' : value || '';
}

function parseCookies(value: string): Map<string, string> {
  const cookies = new Map<string, string>();

  value.split(';').forEach((part) => {
    const separator = part.indexOf('=');
    if (separator <= 0) return;

    const name = part.slice(0, separator).trim();
    const cookieValue = part.slice(separator + 1).trim();
    if (name && cookieValue) cookies.set(name, cookieValue);
  });

  return cookies;
}

function isUsableTrackingToken(value: string): boolean {
  const token = value.trim();
  return (
    token.length >= 16 &&
    token.length <= 128 &&
    /^[A-Za-z0-9_-]+$/.test(token) &&
    !token.startsWith('00000000-')
  );
}

function getTrackingToken(
  req: TrackingRequest,
  headerName: string,
): string | undefined {
  const headerToken = readHeader(req, headerName);
  return isUsableTrackingToken(headerToken) ? headerToken : undefined;
}

function getShopifyCookieHeader(req: TrackingRequest): string {
  const cookies = parseCookies(readHeader(req, 'cookie'));

  return Array.from(cookies.entries())
    .filter(([name]) => SHOPIFY_COOKIE_NAMES.has(name))
    .map(([name, value]) => `${name}=${value}`)
    .join('; ');
}

function getForwardedHeader(req: TrackingRequest, name: string, maxLength: number): string {
  const value = readHeader(req, name).trim();
  return value && value.length <= maxLength ? value : '';
}

function getHostOnlyCookies(headers: Headers): string[] {
  const setCookies = headers.getSetCookie();

  // Shopify's current HttpOnly tracking cookies are host-only. Legacy cookies
  // target the myshopify.com domain and must not be rewritten onto flexi-knee.com.
  return setCookies.filter((cookie) => !/;\s*domain=/i.test(cookie));
}

function getShopDomain(): string {
  const configured =
    process.env.SHOPIFY_STORE_DOMAIN ||
    process.env.VITE_SHOPIFY_STORE_DOMAIN ||
    'flexi-knee-store.myshopify.com';
  const domain = configured.replace(/^https?:\/\//i, '').split('/')[0].toLowerCase();

  return /^[a-z0-9][a-z0-9-]*\.myshopify\.com$/.test(domain)
    ? domain
    : 'flexi-knee-store.myshopify.com';
}

function getPublicStorefrontToken(): string {
  return (
    process.env.SHOPIFY_ANALYTICS_STOREFRONT_TOKEN ||
    process.env.VITE_SHOPIFY_ANALYTICS_STOREFRONT_TOKEN ||
    process.env.SHOPIFY_STOREFRONT_TOKEN ||
    process.env.VITE_SHOPIFY_STOREFRONT_TOKEN ||
    ''
  );
}

export default async function handler(req: TrackingRequest, res: TrackingResponse) {
  res.setHeader('Cache-Control', 'private, no-store, max-age=0');
  res.setHeader('Vary', 'Cookie, Origin');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const contentLength = Number(readHeader(req, 'content-length') || 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return res.status(413).json({ error: 'Request too large' });
  }

  const storefrontAccessToken = getPublicStorefrontToken();
  if (!storefrontAccessToken || storefrontAccessToken.startsWith('shpat_')) {
    return res.status(500).json({ error: 'Shopify tracking is not configured' });
  }

  const uniqueToken = getTrackingToken(
    req,
    'x-shopify-uniquetoken',
  );
  const visitToken = getTrackingToken(
    req,
    'x-shopify-visittoken',
  );

  const upstreamHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
  };
  if (uniqueToken) upstreamHeaders['X-Shopify-UniqueToken'] = uniqueToken;
  if (visitToken) upstreamHeaders['X-Shopify-VisitToken'] = visitToken;

  const storefrontId =
    process.env.SHOPIFY_ANALYTICS_STOREFRONT_ID ||
    process.env.VITE_SHOPIFY_ANALYTICS_STOREFRONT_ID ||
    '';
  if (/^\d+$/.test(storefrontId)) {
    upstreamHeaders['Shopify-Storefront-Id'] = storefrontId;
  }

  const shopifyCookies = getShopifyCookieHeader(req);
  if (shopifyCookies) upstreamHeaders.Cookie = shopifyCookies;

  const forwardedHeaders: Array<[string, string, number]> = [
    ['Origin', 'origin', 512],
    ['Referer', 'referer', 2048],
    ['User-Agent', 'user-agent', 1024],
    ['Accept-Language', 'accept-language', 512],
  ];
  forwardedHeaders.forEach(([upstreamName, requestName, maxLength]) => {
    const value = getForwardedHeader(req, requestName, maxLength);
    if (value) upstreamHeaders[upstreamName] = value;
  });

  try {
    const upstream = await fetch(
      `https://${getShopDomain()}/api/unstable/graphql.json`,
      {
        method: 'POST',
        headers: upstreamHeaders,
        body: JSON.stringify({ query: ENSURE_COOKIES_QUERY }),
        cache: 'no-store',
      },
    );
    const responseBody = await upstream.text();

    res.setHeader(
      'Content-Type',
      upstream.headers.get('content-type') || 'application/json; charset=utf-8',
    );

    const serverTiming = upstream.headers.get('server-timing');
    if (serverTiming) {
      res.setHeader('Server-Timing', serverTiming);
      res.setHeader('Timing-Allow-Origin', '*');
    }

    const hostOnlyCookies = getHostOnlyCookies(upstream.headers);
    if (hostOnlyCookies.length > 0) {
      res.setHeader('Set-Cookie', hostOnlyCookies);
    }

    return res.status(upstream.status).send(responseBody);
  } catch {
    return res.status(502).json({ error: 'Shopify tracking request failed' });
  }
}
