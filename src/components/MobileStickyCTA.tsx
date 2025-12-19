import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { trackEvent } from "@/hooks/use-google-analytics";

interface MobileStickyCTAProps {
  price: string;
  variantSummary?: string;
  onAddToCart: () => Promise<void>;
  onBuyNow: () => Promise<void>;
  ctaSectionRef: React.RefObject<HTMLElement>;
  isAddingToCart: boolean;
  isBuyingNow: boolean;
}

export const MobileStickyCTA = ({
  price,
  variantSummary,
  onAddToCart,
  onBuyNow,
  ctaSectionRef,
  isAddingToCart,
  isBuyingNow,
}: MobileStickyCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ctaSectionRef.current) return;

    // Use IntersectionObserver instead of scroll listener to avoid forced reflows
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when CTA section is not intersecting (scrolled past)
        setIsVisible(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      }
    );

    observer.observe(ctaSectionRef.current);

    return () => observer.disconnect();
  }, [ctaSectionRef]);

  const handleAddToCartClick = async () => {
    trackEvent("sticky_add_to_cart_click");
    await onAddToCart();
  };

  const handleBuyNowClick = async () => {
    trackEvent("sticky_buy_now_click");
    await onBuyNow();
  };

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-[0_-4px_20px_rgba(0,0,0,0.1)] md:hidden transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        {/* Left side - Price and variant info */}
        <div className="flex flex-col min-w-0 flex-shrink-0">
          <span className="font-bold text-base text-foreground">{price}</span>
          {variantSummary && (
            <span className="text-xs text-muted-foreground truncate max-w-[100px]">
              {variantSummary}
            </span>
          )}
        </div>

        {/* Right side - Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0 mr-14">
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddToCartClick}
            disabled={isAddingToCart || isBuyingNow}
            className="h-12 px-5 text-sm font-semibold"
          >
            {isAddingToCart ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "ADD TO CART"
            )}
          </Button>
          <Button
            size="sm"
            onClick={handleBuyNowClick}
            disabled={isAddingToCart || isBuyingNow}
            className="h-12 px-6 text-sm font-bold bg-primary hover:bg-primary/90"
          >
            {isBuyingNow ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "BUY NOW"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
