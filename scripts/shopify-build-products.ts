import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

function loadLocalEnv(): void {
  const envPath = resolve(process.cwd(), ".env");
  if (!existsSync(envPath)) return;

  for (const rawLine of readFileSync(envPath, "utf-8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const separator = line.indexOf("=");
    if (separator < 1) continue;

    const key = line.slice(0, separator).trim();
    const value = line
      .slice(separator + 1)
      .trim()
      .replace(/^['"]|['"]$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

const SHOPIFY_TO_PUBLIC_PRODUCT_HANDLES: Record<string, string> = {
  "flexiknee™-compression-support-sleeve": "flexiknee-compression-support-sleeve",
  "360-electric-calf-massager-rechargeable-3-modes-air-compression-leg-massager-hot-compress-leg-massage-blood-circulation":
    "flexiknee-calf-massager",
  "electric-knee-heating-pad-a-usb-powered-warming-knee-strap-suitable-for-joints-with-adjustable-heating-band-ideal-for-daily":
    "flexiknee-usb-heated-knee-wrap",
  "sport-orthopedic-insoles-for-feet-men-women-eva-breathable-shock-absorption-shoes-insole-for-running-basketball-sport-care-pads":
    "flexiknee-sport-orthopedic-insoles",
  "varicose-veins-compression-socks-fit-for-golf-rugby-running-hiking-sports-for-anti-fatigue-driving-travel-flight-women-men-socks":
    "flexiknee-everyday-compression-socks",
};

export function getPublicBuildProductHandle(handle: string): string {
  return SHOPIFY_TO_PUBLIC_PRODUCT_HANDLES[handle] || handle;
}

const FALLBACK_PRODUCT_HANDLES = [
  "knee-massager-smart-red-light-and-massage-therapy",
  "flexiknee-compression-support-sleeve",
  "flexiknee-calf-massager",
  "flexiknee-usb-heated-knee-wrap",
  "flexiknee-sport-orthopedic-insoles",
  "flexiknee-reusable-knee-ice-pack-wrap",
];

export async function getShopifyProductHandles(): Promise<string[]> {
  loadLocalEnv();

  const domain = process.env.VITE_SHOPIFY_STORE_DOMAIN?.trim();
  const token = process.env.VITE_SHOPIFY_STOREFRONT_TOKEN?.trim();
  const apiVersion = process.env.VITE_SHOPIFY_API_VERSION?.trim() || "2026-04";

  if (!domain || !token) {
    console.warn(
      "⚠️  Shopify build variables are unavailable; product routes will use the static fallback only.",
    );
    return FALLBACK_PRODUCT_HANDLES;
  }

  const query = `
    query BuildProductHandles($first: Int!, $after: String) {
      products(first: $first, after: $after) {
        pageInfo { hasNextPage endCursor }
        nodes { handle }
      }
    }
  `;

  const handles: string[] = [];
  let after: string | null = null;

  try {
    do {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8_000);
      let response: Response;

      try {
        response = await fetch(
          `https://${domain}/api/${apiVersion}/graphql.json`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Shopify-Storefront-Access-Token": token,
            },
            body: JSON.stringify({ query, variables: { first: 100, after } }),
            signal: controller.signal,
          },
        );
      } finally {
        clearTimeout(timeout);
      }

      if (!response.ok) {
        throw new Error(`Storefront API returned ${response.status}`);
      }

      const payload = (await response.json()) as {
        data?: {
          products?: {
            pageInfo: { hasNextPage: boolean; endCursor: string | null };
            nodes: Array<{ handle?: string }>;
          };
        };
        errors?: Array<{ message: string }>;
      };

      if (payload.errors?.length) {
        throw new Error(
          payload.errors.map((error) => error.message).join("; "),
        );
      }

      const products = payload.data?.products;
      if (!products) break;

      handles.push(
        ...products.nodes
          .map((node) => node.handle?.trim())
          .filter((handle): handle is string => Boolean(handle)),
      );
      after = products.pageInfo.hasNextPage
        ? products.pageInfo.endCursor
        : null;
    } while (after);
  } catch (error) {
    console.warn(
      `⚠️  Could not fetch Shopify product handles: ${(error as Error).message}`,
    );
    return FALLBACK_PRODUCT_HANDLES;
  }

  return [...new Set(handles.map(getPublicBuildProductHandle))];
}
