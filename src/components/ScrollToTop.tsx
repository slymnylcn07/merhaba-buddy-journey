import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();
  const prevPathname = useRef(pathname);
  const scrollPositions = useRef<Map<string, number>>(new Map());

  // Save scroll position before route change
  useEffect(() => {
    const handleScroll = () => {
      scrollPositions.current.set(prevPathname.current, window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Skip if it's just a hash change on the same page (anchor navigation)
    if (hash && prevPathname.current === pathname) {
      prevPathname.current = pathname;
      return;
    }

    // Save current scroll position before navigating away
    scrollPositions.current.set(prevPathname.current, window.scrollY);

    // Check if this is a back/forward navigation (POP = browser back/forward)
    const isBackForward = navigationType === "POP";

    if (isBackForward) {
      // Restore saved scroll position for this route
      const savedPosition = scrollPositions.current.get(pathname);
      if (typeof savedPosition === "number") {
        // Delay to ensure DOM is rendered
        requestAnimationFrame(() => {
          setTimeout(() => {
            window.scrollTo(0, savedPosition);
          }, 0);
        });
      }
    } else {
      // Normal navigation - scroll to top
      window.scrollTo(0, 0);
    }

    prevPathname.current = pathname;
  }, [pathname, hash, navigationType]);

  return null;
};

export default ScrollToTop;
