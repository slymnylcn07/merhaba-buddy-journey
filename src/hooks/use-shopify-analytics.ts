import { useEffect, useRef } from 'react';
import { AnalyticsPageType, useShopifyCookies } from '@shopify/hydrogen-react';
import { useLocation } from 'react-router-dom';
import { setShopifyAnalyticsReady, trackPageView } from '@/lib/shopify-analytics';
import { useAnalyticsConsent } from '@/lib/cookie-consent';
import {
  SHOPIFY_STORE_DOMAIN,
  SHOPIFY_STOREFRONT_TOKEN,
  isShopifyConfigured,
} from '@/lib/shopify-config';
import {
  getReadyPage,
  isGuideArticlePath,
  PAGE_READY_EVENT,
  type PageReadyDetail,
} from '@/lib/page-ready';

/**
 * Hook to automatically track page views on route changes
 * Place this in your App component or layout
 */
export function useShopifyPageView(trackingValuesReady: boolean) {
  const location = useLocation();
  const { analyticsAllowed } = useAnalyticsConsent();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    if (!analyticsAllowed || !trackingValuesReady) return;
    // Avoid duplicate tracking on initial mount
    if (previousPath.current === location.pathname) {
      return;
    }
    
    // Determine page type based on route
    let pageType: string = AnalyticsPageType.page;
    
    if (location.pathname === '/') {
      pageType = AnalyticsPageType.home;
    } else if (isGuideArticlePath(location.pathname)) {
      pageType = AnalyticsPageType.article;
    } else if (location.pathname === '/guides' || location.pathname.startsWith('/guides/')) {
      pageType = AnalyticsPageType.blog;
    } else if (location.pathname === '/shop') {
      pageType = AnalyticsPageType.listCollections;
    } else if (location.pathname.startsWith('/product/')) {
      // Product pages send a richer event after Shopify product data is ready.
      return;
    } else if (location.pathname === '/track-order') {
      pageType = AnalyticsPageType.page;
    } else if (location.pathname === '/account') {
      pageType = AnalyticsPageType.customersAccount;
    } else if (location.pathname.includes('policy')) {
      pageType = AnalyticsPageType.policy;
    }

    const sendPageView = (pageTitle?: string) => {
      if (previousPath.current === location.pathname) return;
      previousPath.current = location.pathname;
      trackPageView(pageType, {
        pathname: location.pathname,
        ...(pageTitle ? { page_title: pageTitle } : {}),
      });
    };

    if (isGuideArticlePath(location.pathname)) {
      const readyPage = getReadyPage(location.pathname);
      if (readyPage) {
        sendPageView(readyPage.title);
        return;
      }

      const handlePageReady = (event: Event) => {
        const detail = (event as CustomEvent<PageReadyDetail>).detail;
        if (detail.path === location.pathname) sendPageView(detail.title);
      };
      window.addEventListener(PAGE_READY_EVENT, handlePageReady);
      return () => window.removeEventListener(PAGE_READY_EVENT, handlePageReady);
    }

    const timer = window.setTimeout(() => sendPageView(document.title), 50);
    return () => window.clearTimeout(timer);
  }, [analyticsAllowed, location.pathname, trackingValuesReady]);
}

export function useShopifyAnalytics() {
  const { analyticsAllowed } = useAnalyticsConsent();
  const configured = isShopifyConfigured();
  const cookiesReady = useShopifyCookies({
    hasUserConsent: analyticsAllowed,
    storefrontAccessToken: SHOPIFY_STOREFRONT_TOKEN,
    checkoutDomain: SHOPIFY_STORE_DOMAIN ? `https://${SHOPIFY_STORE_DOMAIN}` : undefined,
    fetchTrackingValues: configured && analyticsAllowed,
    ignoreDeprecatedCookies: true,
  });
  const trackingValuesReady = configured && analyticsAllowed && cookiesReady;

  useEffect(() => {
    setShopifyAnalyticsReady(trackingValuesReady);
  }, [trackingValuesReady]);

  useShopifyPageView(trackingValuesReady);
}
