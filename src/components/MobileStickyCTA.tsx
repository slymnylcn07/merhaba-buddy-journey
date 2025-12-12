import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Package, Loader2, Zap } from "lucide-react";
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
    const handleScroll = () => {
      if (!ctaSectionRef.current) return;

      const rect = ctaSectionRef.current.getBoundingClientRect();
      const ctaSectionBottom = rect.bottom;
      
      // Show sticky bar when CTA section is scrolled out of view (above viewport)
      setIsVisible(ctaSectionBottom < 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, [ctaSectionRef]);

  const handleAddToCartClick = async () => {
    trackEvent("sticky_add_to_cart_click");
    await onAddToCart();
  };

  const handleBuyNowClick = async () => {
    trackEvent("sticky_buy_now_click");
    await onBuyNow();
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-[0_-4px_20px_rgba(0,0,0,0.1)] md:hidden"
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
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddToCartClick}
            disabled={isAddingToCart || isBuyingNow}
            className="h-11 px-3 text-sm font-semibold"
          >
            {isAddingToCart ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Package className="w-4 h-4 mr-1" />
                ADD
              </>
            )}
          </Button>
          <Button
            size="sm"
            onClick={handleBuyNowClick}
            disabled={isAddingToCart || isBuyingNow}
            className="h-11 px-4 text-sm font-bold bg-primary hover:bg-primary/90"
          >
            {isBuyingNow ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Zap className="w-4 h-4 mr-1" />
                BUY NOW
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
