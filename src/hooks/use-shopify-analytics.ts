import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/shopify-analytics';
import { useAnalyticsConsent } from '@/lib/cookie-consent';

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
    
    previousPath.current = location.pathname;

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

    // Track page view
    trackPageView(pageType, {
      pathname: location.pathname,
    });
  }, [analyticsAllowed, location.pathname]);
}
