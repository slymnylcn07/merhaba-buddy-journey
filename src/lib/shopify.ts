import {
  getTrackingValues,
  SHOPIFY_STOREFRONT_ID_HEADER,
  SHOPIFY_UNIQUE_TOKEN_HEADER,
  SHOPIFY_VISIT_TOKEN_HEADER,
} from '@shopify/hydrogen-react';
import { getMarketCountry } from "@/lib/market";
import {
  SHOPIFY_ANALYTICS_STOREFRONT_ID,
  SHOPIFY_API_STOREFRONT_TOKEN,
  SHOPIFY_STOREFRONT_URL,
  isShopifyConfigured,
} from './shopify-config';

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    vendor?: string;
    productType?: string;
    description: string;
    descriptionHtml?: string;
    handle: string;
    tags?: string[];
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
      maxVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          sku?: string | null;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          compareAtPrice?: {
            amount: string;
            currencyCode: string;
          } | null;
          availableForSale: boolean;
          image?: {
            url: string;
            altText: string | null;
          } | null;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
}


interface StorefrontGraphqlError {
  message: string;
}

interface StorefrontResponse<T> {
  data: T;
  errors?: StorefrontGraphqlError[];
}

const LEGACY_FLEXIKNEE_MARK = /(FlexiKnee)\s*(?:\u2122|\u00AE|&trade;|&#8482;|&#x2122;)/gi;

function normalizeStorefrontPayload<T>(value: T): T {
  if (typeof value === "string") {
    return value.replace(LEGACY_FLEXIKNEE_MARK, "$1") as unknown as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizeStorefrontPayload(item)) as unknown as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, nestedValue]) => [
        key,
        normalizeStorefrontPayload(nestedValue),
      ]),
    ) as unknown as T;
  }

  return value;
}

export interface CheckoutLineItem {
  variantId: string;
  quantity: number;
}

interface StorefrontCartGraphql {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
        };
      };
    }>;
  };
}

interface CartMutationPayload {
  cart: StorefrontCartGraphql | null;
  userErrors: Array<{ message: string }>;
}

interface CartCreateData {
  cartCreate: CartMutationPayload;
}

interface CartLinesAddData {
  cartLinesAdd: CartMutationPayload;
}

interface CartLinesUpdateData {
  cartLinesUpdate: CartMutationPayload;
}

interface CartLinesRemoveData {
  cartLinesRemove: CartMutationPayload;
}

export interface StorefrontCheckout {
  cartId: string;
  checkoutUrl: string;
  lineIdsByVariantId: Record<string, string>;
}

interface ShopifyAnalyticsContextData {
  shop: {
    id: string;
  };
}

const SHOPIFY_ANALYTICS_CONTEXT_QUERY = `
  query ShopifyAnalyticsContext {
    shop {
      id
    }
  }
`;

let analyticsContextPromise: Promise<{ shopId: string }> | null = null;

function isUsableTrackingToken(value?: string): value is string {
  return Boolean(value && !value.startsWith('00000000-'));
}

function getStorefrontTrackingHeaders(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  const { uniqueToken, visitToken } = getTrackingValues();
  const headers: Record<string, string> = {};

  if (isUsableTrackingToken(uniqueToken)) {
    headers[SHOPIFY_UNIQUE_TOKEN_HEADER] = uniqueToken;
  }
  if (isUsableTrackingToken(visitToken)) {
    headers[SHOPIFY_VISIT_TOKEN_HEADER] = visitToken;
  }
  if (SHOPIFY_ANALYTICS_STOREFRONT_ID) {
    headers[SHOPIFY_STOREFRONT_ID_HEADER] = SHOPIFY_ANALYTICS_STOREFRONT_ID;
  }

  return headers;
}

const STOREFRONT_QUERY = `
  query GetProducts($first: Int!, $country: CountryCode!) @inContext(country: $country) {
    products(first: $first) {
      edges {
        node {
          id
          title
          vendor
          productType
          description
          descriptionHtml
          handle
          tags
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 10) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                sku
                title
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                availableForSale
                image {
                  url
                  altText
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;



const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!, $country: CountryCode!) @inContext(country: $country) {
    product(handle: $handle) {
      id
      title
      vendor
      productType
      description
      descriptionHtml
      handle
      tags
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 20) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 50) {
        edges {
          node {
            id
            sku
            title
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            availableForSale
            image {
              url
              altText
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

const STOREFRONT_CART_FIELDS = `
  id
  checkoutUrl
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
          }
        }
      }
    }
  }
`;

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!, $country: CountryCode!) @inContext(country: $country) {
    cartCreate(input: $input) {
      cart {
        ${STOREFRONT_CART_FIELDS}
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!, $country: CountryCode!) @inContext(country: $country) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ${STOREFRONT_CART_FIELDS}
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!, $country: CountryCode!) @inContext(country: $country) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ${STOREFRONT_CART_FIELDS}
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_REMOVE_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!, $country: CountryCode!) @inContext(country: $country) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ${STOREFRONT_CART_FIELDS}
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function storefrontApiRequest<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<StorefrontResponse<T>> {
  if (!isShopifyConfigured()) {
    throw new Error(
      'Shopify is not configured (missing VITE_SHOPIFY_STORE_DOMAIN / VITE_SHOPIFY_STOREFRONT_TOKEN).'
    );
  }

  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_API_STOREFRONT_TOKEN,
      ...getStorefrontTrackingHeaders(),
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    if (import.meta.env.DEV) {
      console.error('Shopify API Error:', response.status, response.statusText);
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json() as StorefrontResponse<T>;

  if (data.errors?.length) {
    if (import.meta.env.DEV) {
      console.error('Shopify GraphQL Errors:', data.errors);
    }
    throw new Error(`Error calling Shopify: ${data.errors.map((error) => error.message).join(', ')}`);
  }

  return normalizeStorefrontPayload(data);
}

export async function getProducts(first: number = 10, country?: string): Promise<ShopifyProduct[]> {
  const response = await storefrontApiRequest<{ products: { edges: ShopifyProduct[] } }>(
    STOREFRONT_QUERY,
    { first, country: country || getMarketCountry() }
  );
  return response.data.products.edges;
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  if (!handle) return null;

  const response = await storefrontApiRequest<{ product: ShopifyProduct['node'] | null }>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle, country: getMarketCountry() }
  );
  const node = response.data.product;

  return node ? { node } : null;
}

export function getShopifyAnalyticsContext(): Promise<{ shopId: string }> {
  if (!analyticsContextPromise) {
    analyticsContextPromise = storefrontApiRequest<ShopifyAnalyticsContextData>(
      SHOPIFY_ANALYTICS_CONTEXT_QUERY,
    )
      .then((response) => ({ shopId: response.data.shop.id }))
      .catch((error) => {
        analyticsContextPromise = null;
        throw error;
      });
  }

  return analyticsContextPromise;
}

function toStorefrontCheckout(
  payload: CartMutationPayload,
  operation: string,
): StorefrontCheckout {
  if (payload.userErrors.length > 0) {
    throw new Error(
      `${operation} failed: ${payload.userErrors
        .map((error) => error.message)
        .join(', ')}`,
    );
  }

  const cart = payload.cart;
  if (!cart?.id || !cart.checkoutUrl) {
    throw new Error(`${operation} did not return a cart ID and checkout URL`);
  }

  const lineIdsByVariantId = Object.fromEntries(
    cart.lines.edges
      .filter(({ node }) => Boolean(node.merchandise?.id && node.id))
      .map(({ node }) => [node.merchandise.id, node.id]),
  );

  return {
    cartId: cart.id,
    checkoutUrl: cart.checkoutUrl,
    lineIdsByVariantId,
  };
}

export async function createStorefrontCheckout(
  items: CheckoutLineItem[],
): Promise<StorefrontCheckout> {
  try {
    const lines = items.map((item) => ({
      quantity: item.quantity,
      merchandiseId: item.variantId,
    }));

    const country = getMarketCountry();
    const cartData = await storefrontApiRequest<CartCreateData>(CART_CREATE_MUTATION, {
      input: { lines, buyerIdentity: { countryCode: country } },
      country,
    });

    // Keep Shopify's returned checkout URL untouched. The Storefront API token
    // attributes the order to the Headless storefront that created the cart.
    return toStorefrontCheckout(cartData.data.cartCreate, 'Cart creation');
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error creating storefront checkout:', error);
    }
    throw error;
  }
}

export async function addStorefrontCartLines(
  cartId: string,
  items: CheckoutLineItem[],
): Promise<StorefrontCheckout> {
  const country = getMarketCountry();
  const response = await storefrontApiRequest<CartLinesAddData>(
    CART_LINES_ADD_MUTATION,
    {
      cartId,
      country,
      lines: items.map((item) => ({
        quantity: item.quantity,
        merchandiseId: item.variantId,
      })),
    },
  );

  return toStorefrontCheckout(response.data.cartLinesAdd, 'Adding cart lines');
}

export async function updateStorefrontCartLine(
  cartId: string,
  lineId: string,
  quantity: number,
): Promise<StorefrontCheckout> {
  const response = await storefrontApiRequest<CartLinesUpdateData>(
    CART_LINES_UPDATE_MUTATION,
    {
      cartId,
      country: getMarketCountry(),
      lines: [{ id: lineId, quantity }],
    },
  );

  return toStorefrontCheckout(response.data.cartLinesUpdate, 'Updating cart line');
}

export async function removeStorefrontCartLine(
  cartId: string,
  lineId: string,
): Promise<StorefrontCheckout> {
  const response = await storefrontApiRequest<CartLinesRemoveData>(
    CART_LINES_REMOVE_MUTATION,
    {
      cartId,
      country: getMarketCountry(),
      lineIds: [lineId],
    },
  );

  return toStorefrontCheckout(response.data.cartLinesRemove, 'Removing cart line');
}

