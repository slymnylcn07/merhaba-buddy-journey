export const PRIMARY_PRODUCT_HANDLE =
  import.meta.env.VITE_PRIMARY_PRODUCT_HANDLE ||
  "knee-massager-smart-red-light-and-massage-therapy";

const SHOPIFY_HANDLE_ALIASES: Record<string, string> = {
  "flexiknee-compression-support-sleeve": "flexiknee™-compression-support-sleeve",
};

const PUBLIC_HANDLE_ALIASES: Record<string, string> = Object.fromEntries(
  Object.entries(SHOPIFY_HANDLE_ALIASES).map(([publicHandle, shopifyHandle]) => [
    shopifyHandle,
    publicHandle,
  ]),
);

export function resolveShopifyProductHandle(handle: string): string {
  return SHOPIFY_HANDLE_ALIASES[handle] || handle;
}

export function getPublicProductHandle(handle: string): string {
  return PUBLIC_HANDLE_ALIASES[handle] || handle;
}

export function getProductPath(handle: string): string {
  return `/product/${getPublicProductHandle(handle)}`;
}

export const PRIMARY_PRODUCT_PATH = getProductPath(PRIMARY_PRODUCT_HANDLE);
