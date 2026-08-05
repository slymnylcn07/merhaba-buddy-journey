import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/shopify-analytics';
import { useAnalyticsConsent } from '@/lib/cookie-consent';
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
export function useShopifyPageView() {
  const location = useLocation();
  const { analyticsAllowed } = useAnalyticsConsent();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    if (!analyticsAllowed) return;
    // Avoid duplicate tracking on initial mount
    if (previousPath.current === location.pathname) {
      return;
    }
    
    // Determine page type based on route
    let pageType = 'page';
    
    if (location.pathname === '/') {
      pageType = 'home';
    } else if (location.pathname.startsWith('/product/')) {
      pageType = 'product';
    } else if (location.pathname === '/track-order') {
      pageType = 'page';
    } else if (location.pathname === '/account') {
      pageType = 'account';
    } else if (location.pathname.includes('policy')) {
      pageType = 'policy';
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
  }, [analyticsAllowed, location.pathname]);
}
