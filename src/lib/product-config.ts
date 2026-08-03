export const PRIMARY_PRODUCT_HANDLE =
  import.meta.env.VITE_PRIMARY_PRODUCT_HANDLE ||
  "knee-massager-smart-red-light-and-massage-therapy";

export const ICE_PACK_PRODUCT_HANDLE = "flexiknee-reusable-knee-ice-pack-wrap";

const SHOPIFY_HANDLE_ALIASES: Record<string, string> = {};

const PUBLIC_HANDLE_ALIASES: Record<string, string> = {
  "flexiknee™-compression-support-sleeve": "flexiknee-compression-support-sleeve",
  "360-electric-calf-massager-rechargeable-3-modes-air-compression-leg-massager-hot-compress-leg-massage-blood-circulation":
    "flexiknee-calf-massager",
  "electric-knee-heating-pad-a-usb-powered-warming-knee-strap-suitable-for-joints-with-adjustable-heating-band-ideal-for-daily":
    "flexiknee-usb-heated-knee-wrap",
  "sport-orthopedic-insoles-for-feet-men-women-eva-breathable-shock-absorption-shoes-insole-for-running-basketball-sport-care-pads":
    "flexiknee-sport-orthopedic-insoles",
};

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
export const ICE_PACK_PRODUCT_PATH = getProductPath(ICE_PACK_PRODUCT_HANDLE);
