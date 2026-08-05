export const PRIMARY_PRODUCT_HANDLE =
  import.meta.env.VITE_PRIMARY_PRODUCT_HANDLE ||
  "knee-massager-smart-red-light-and-massage-therapy";

export const ICE_PACK_PRODUCT_HANDLE = "flexiknee-reusable-knee-ice-pack-wrap";
export const COMPRESSION_SOCKS_PRODUCT_HANDLE = "flexiknee-everyday-compression-socks";

export const COMPRESSION_SOCKS_SHOPIFY_HANDLE =
  "varicose-veins-compression-socks-fit-for-golf-rugby-running-hiking-sports-for-anti-fatigue-driving-travel-flight-women-men-socks";

const SHOPIFY_HANDLE_ALIASES: Record<string, string> = {
  [COMPRESSION_SOCKS_PRODUCT_HANDLE]: COMPRESSION_SOCKS_SHOPIFY_HANDLE,
};

const PUBLIC_HANDLE_ALIASES: Record<string, string> = {
  [COMPRESSION_SOCKS_SHOPIFY_HANDLE]: COMPRESSION_SOCKS_PRODUCT_HANDLE,
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

export function getShopifyProductHandleCandidates(handle: string): string[] {
  const publicHandle = getPublicProductHandle(handle);
  const legacyShopifyHandle = SHOPIFY_HANDLE_ALIASES[publicHandle];
  const reverseAliases = Object.entries(PUBLIC_HANDLE_ALIASES)
    .filter(([, publicAlias]) => publicAlias === publicHandle)
    .map(([shopifyHandle]) => shopifyHandle);

  return [
    ...new Set(
      [publicHandle, legacyShopifyHandle, ...reverseAliases].filter(
        (candidate): candidate is string => Boolean(candidate),
      ),
    ),
  ];
}

export function getPublicProductHandle(handle: string): string {
  return LEGACY_PUBLIC_HANDLE_ALIASES[handle] || PUBLIC_HANDLE_ALIASES[handle] || handle;
}

export function getProductPath(handle: string): string {
  return `/product/${getPublicProductHandle(handle)}`;
}

export const PRIMARY_PRODUCT_PATH = getProductPath(PRIMARY_PRODUCT_HANDLE);
export const ICE_PACK_PRODUCT_PATH = getProductPath(ICE_PACK_PRODUCT_HANDLE);
export const COMPRESSION_SOCKS_PRODUCT_PATH = getProductPath(COMPRESSION_SOCKS_PRODUCT_HANDLE);
