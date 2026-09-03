export const PRIMARY_PRODUCT_HANDLE =
  import.meta.env.VITE_PRIMARY_PRODUCT_HANDLE ||
  "knee-massager-smart-red-light-and-massage-therapy";

const SHOPIFY_HANDLE_ALIASES: Record<string, string> = {};

const PUBLIC_HANDLE_ALIASES: Record<string, string> = Object.fromEntries(
  Object.entries(SHOPIFY_HANDLE_ALIASES).map(([publicHandle, shopifyHandle]) => [
    shopifyHandle,
    publicHandle,
  ]),
);

// Historical public handles seen by search engines. Vercel redirects these at
// the edge, and this client-side fallback prevents a stale in-app navigation
// from ever rendering a thin "product unavailable" page.
const LEGACY_PUBLIC_HANDLE_ALIASES: Record<string, string> = {
  flexiknee: PRIMARY_PRODUCT_HANDLE,
  "multifunctional-smart-cordless-knee-massager-vibration-knee-relaxing-massage-machine-joint-knee-device-gifts-for-grandma-grandpa": PRIMARY_PRODUCT_HANDLE,
};

export function resolveShopifyProductHandle(handle: string): string {
  return SHOPIFY_HANDLE_ALIASES[handle] || handle;
}

export function getPublicProductHandle(handle: string): string {
  return LEGACY_PUBLIC_HANDLE_ALIASES[handle] || PUBLIC_HANDLE_ALIASES[handle] || handle;
}

export function getProductPath(handle: string): string {
  return `/product/${getPublicProductHandle(handle)}`;
}

export const PRIMARY_PRODUCT_PATH = getProductPath(PRIMARY_PRODUCT_HANDLE);
