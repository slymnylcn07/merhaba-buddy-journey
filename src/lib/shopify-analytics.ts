import {
  AnalyticsEventName,
  AnalyticsPageType,
  getClientBrowserParameters,
  sendShopifyAnalytics,
  ShopifySalesChannel,
  type ShopifyAddToCartPayload,
  type ShopifyAnalyticsProduct,
  type ShopifyPageViewPayload,
} from "@shopify/hydrogen-react";
import { hasAnalyticsConsent } from "./cookie-consent";
import { getCurrentMarket } from "./market";
import { getShopifyAnalyticsContext } from "./shopify";
import {
  SHOPIFY_ANALYTICS_SALES_CHANNEL,
  SHOPIFY_ANALYTICS_STOREFRONT_ID,
  isShopifyConfigured,
} from "./shopify-config";

type ShopifyBasePayload = Omit<
  ShopifyPageViewPayload,
  "canonicalUrl" | "collectionHandle" | "collectionId" | "pageType" | "products" | "resourceId" | "searchString" | "totalValue"
>;

let trackingReady = false;
let readyResolvers: Array<() => void> = [];

function isUsableTrackingToken(value?: string): value is string {
  return Boolean(value && !value.startsWith("00000000-"));
}

export function setShopifyAnalyticsReady(ready: boolean): void {
  trackingReady = ready;
  if (!ready) return;

  const resolvers = readyResolvers;
  readyResolvers = [];
  resolvers.forEach((resolve) => resolve());
}

function waitForTrackingValues(): Promise<void> {
  if (trackingReady) return Promise.resolve();
  return new Promise((resolve) => readyResolvers.push(resolve));
}

function normalizePageType(pageType?: string): string {
  switch (pageType) {
    case "home":
    case AnalyticsPageType.home:
      return AnalyticsPageType.home;
    case "article":
      return AnalyticsPageType.article;
    case "blog":
      return AnalyticsPageType.blog;
    case "cart":
      return AnalyticsPageType.cart;
    case "collection":
      return AnalyticsPageType.collection;
    case AnalyticsPageType.listCollections:
      return AnalyticsPageType.listCollections;
    case "product":
      return AnalyticsPageType.product;
    case "policy":
      return AnalyticsPageType.policy;
    case "search":
      return AnalyticsPageType.search;
    case "account":
    case AnalyticsPageType.customersAccount:
      return AnalyticsPageType.customersAccount;
    default:
      return AnalyticsPageType.page;
  }
}

async function getBasePayload(): Promise<ShopifyBasePayload | null> {
  if (!hasAnalyticsConsent() || !isShopifyConfigured()) return null;

  await waitForTrackingValues();
  if (!hasAnalyticsConsent()) return null;

  const browser = getClientBrowserParameters();
  if (
    !isUsableTrackingToken(browser.uniqueToken) ||
    !isUsableTrackingToken(browser.visitToken)
  ) {
    return null;
  }

  const { shopId } = await getShopifyAnalyticsContext();
  const market = getCurrentMarket();

  return {
    ...browser,
    shopId,
    currency: market.currency as ShopifyPageViewPayload["currency"],
    acceptedLanguage: "EN" as ShopifyPageViewPayload["acceptedLanguage"],
    hasUserConsent: true,
    analyticsAllowed: true,
    marketingAllowed: false,
    saleOfDataAllowed: false,
    shopifySalesChannel:
      SHOPIFY_ANALYTICS_SALES_CHANNEL === "hydrogen"
        ? ShopifySalesChannel.hydrogen
        : ShopifySalesChannel.headless,
    ...(SHOPIFY_ANALYTICS_STOREFRONT_ID
      ? { storefrontId: SHOPIFY_ANALYTICS_STOREFRONT_ID }
      : {}),
  };
}

async function sendPageView(
  pageType: string,
  extra: Partial<ShopifyPageViewPayload> = {},
): Promise<void> {
  try {
    const base = await getBasePayload();
    if (!base) return;

    await sendShopifyAnalytics({
      eventName: AnalyticsEventName.PAGE_VIEW,
      payload: {
        ...base,
        pageType: normalizePageType(pageType),
        canonicalUrl: `${window.location.origin}${window.location.pathname}`,
        ...extra,
      },
    });
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn("[Shopify Analytics] Event could not be sent", error);
    }
  }
}

export function trackPageView(
  pageType?: string,
  additionalData?: Record<string, unknown>,
): void {
  const pageTitle = additionalData?.page_title;
  void sendPageView(pageType || AnalyticsPageType.page, {
    ...(typeof pageTitle === "string" ? { title: pageTitle } : {}),
  });
}

export interface ProductViewData {
  productId: string;
  productTitle: string;
  productHandle: string;
  productPrice: string;
  productCurrency: string;
  productVariantId?: string;
  productVariantTitle?: string;
  productImageUrl?: string;
  productVendor?: string;
  productType?: string;
  productSku?: string;
}

function toAnalyticsProduct(
  product: ProductViewData,
  quantity = 1,
): ShopifyAnalyticsProduct {
  return {
    productGid: product.productId,
    variantGid: product.productVariantId,
    name: product.productTitle,
    variantName: product.productVariantTitle,
    brand: product.productVendor || "FlexiKnee",
    category: product.productType,
    price: product.productPrice,
    sku: product.productSku,
    quantity,
  };
}

export function trackProductView(product: ProductViewData): void {
  void sendPageView(AnalyticsPageType.product, {
    resourceId: product.productId,
    products: [toAnalyticsProduct(product)],
    totalValue: Number(product.productPrice) || 0,
    currency: product.productCurrency as ShopifyPageViewPayload["currency"],
  });
}

export function trackCollectionView(
  collectionTitle: string,
  collectionHandle: string,
  collectionId?: string,
): void {
  void sendPageView(AnalyticsPageType.collection, {
    title: collectionTitle,
    collectionHandle,
    collectionId,
  });
}

export interface AddToCartData extends ProductViewData {
  cartId: string;
  quantity: number;
}

export async function trackAddToCart(item: AddToCartData): Promise<void> {
  try {
    const base = await getBasePayload();
    if (!base) return;

    const payload: ShopifyAddToCartPayload = {
      ...base,
      cartId: item.cartId,
      currency: item.productCurrency as ShopifyAddToCartPayload["currency"],
      products: [toAnalyticsProduct(item, item.quantity)],
      totalValue: (Number(item.productPrice) || 0) * item.quantity,
    };

    await sendShopifyAnalytics({
      eventName: AnalyticsEventName.ADD_TO_CART,
      payload,
    });
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn("[Shopify Analytics] Add to cart event could not be sent", error);
    }
  }
}

export async function settleShopifyAnalyticsBeforeNavigation(
  analyticsRequest: Promise<void>,
  timeoutMs = 800,
): Promise<void> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<void>((resolve) => {
    timeoutId = setTimeout(resolve, timeoutMs);
  });

  await Promise.race([analyticsRequest, timeout]);
  if (timeoutId) clearTimeout(timeoutId);
}

export function trackSearch(searchQuery: string): void {
  void sendPageView(AnalyticsPageType.search, { searchString: searchQuery });
}
