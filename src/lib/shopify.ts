import { getMarketCountry } from "@/lib/market";
import {
  SHOPIFY_STORE_DOMAIN as SHOPIFY_STORE_PERMANENT_DOMAIN,
  SHOPIFY_STOREFRONT_URL,
  SHOPIFY_STOREFRONT_TOKEN,
  isShopifyConfigured,
} from './shopify-config';

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    descriptionHtml?: string;
    handle: string;
    tags?: string[];
    priceRange: {
      minVariantPrice: {
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

interface CheckoutLineItem {
  variantId: string;
  quantity: number;
}

interface CartCreateData {
  cartCreate: {
    cart: {
      checkoutUrl: string;
    } | null;
    userErrors: Array<{ message: string }>;
  };
}

const STOREFRONT_QUERY = `
  query GetProducts($first: Int!, $country: CountryCode!) @inContext(country: $country) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          descriptionHtml
          handle
          tags
          priceRange {
            minVariantPrice {
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
      description
      descriptionHtml
      handle
      tags
      priceRange {
        minVariantPrice {
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

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!, $country: CountryCode!) @inContext(country: $country) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
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
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
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

  return data;
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

export async function createStorefrontCheckout(items: CheckoutLineItem[]): Promise<string> {
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

    if (cartData.data.cartCreate.userErrors.length > 0) {
      const errorMessage = `Cart creation failed: ${cartData.data.cartCreate.userErrors
        .map((error) => error.message)
        .join(', ')}`;
      throw new Error(errorMessage);
    }

    const cart = cartData.data.cartCreate.cart;

    if (!cart?.checkoutUrl) {
      throw new Error('No checkout URL returned from Shopify');
    }

    // Always use the permanent myshopify.com domain for checkout.
    let checkoutUrl = cart.checkoutUrl.replace(
      /https:\/\/[^/]+/,
      `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}`
    );

    const url = new URL(checkoutUrl);
    url.searchParams.set('channel', 'online_store');
    checkoutUrl = url.toString();

    return checkoutUrl;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error creating storefront checkout:', error);
    }
    throw error;
  }
}

