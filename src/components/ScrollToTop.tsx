import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Skip if it's just a hash change on the same page (anchor navigation)
    if (hash && prevPathname.current === pathname) {
      prevPathname.current = pathname;
      return;
    }

    // Check if this is a back/forward navigation using the navigation API
    const navType = window.performance?.getEntriesByType?.("navigation")?.[0] as PerformanceNavigationTiming | undefined;
    const isBackForward = navType?.type === "back_forward" || 
      (window.history.state?.idx !== undefined && window.history.state?.scroll !== undefined);

    // Don't scroll to top on back/forward - let browser handle scroll restoration
    if (!isBackForward) {
      window.scrollTo(0, 0);
    }

    prevPathname.current = pathname;
  }, [pathname, hash]);

  // Save scroll position before leaving the page
  useEffect(() => {
    const saveScrollPosition = () => {
      if (window.history.state) {
        window.history.replaceState(
          { ...window.history.state, scroll: window.scrollY },
          ""
        );
      }
    };

    window.addEventListener("beforeunload", saveScrollPosition);
    
    // Also save on route changes
    return () => {
      saveScrollPosition();
      window.removeEventListener("beforeunload", saveScrollPosition);
    };
  }, [pathname]);

  // Restore scroll position on back/forward
  useEffect(() => {
    const savedScroll = window.history.state?.scroll;
    if (typeof savedScroll === "number") {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo(0, savedScroll);
      });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
