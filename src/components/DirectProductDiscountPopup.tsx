import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Check, Copy, Gift, ShoppingBag, Sparkles } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { trackEvent } from "@/hooks/use-google-analytics";
import { trackClarityEvent } from "@/hooks/use-microsoft-clarity";
import {
  captureGuideOfferFromSearch,
  GUIDE_OFFER_CODE,
  hasGuideOfferSource,
  hasSeenDirectProductOfferToday,
  markDirectProductOfferSeenToday,
} from "@/lib/guide-offer";
import { NEWSLETTER_DISCOUNT_PCT } from "@/lib/newsletter-config";
import { useCartStore } from "@/stores/cartStore";

const DIRECT_OFFER_DELAY_MS = 18_000;

interface DirectProductDiscountPopupProps {
  productHandle: string;
  productName: string;
  productImage?: string;
  priceLabel?: string;
}

function normalizeCode(value: string) {
  return value.trim().toUpperCase();
}

export function DirectProductDiscountPopup({
  productHandle,
  productName,
  productImage,
  priceLabel,
}: DirectProductDiscountPopupProps) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [guideSourceActive, setGuideSourceActive] = useState(hasGuideOfferSource);
  const guideOfferPrepared = useRef(false);
  const claimed = useRef(false);

  const items = useCartStore((state) => state.items);
  const isDrawerOpen = useCartStore((state) => state.isDrawerOpen);
  const setDrawerOpen = useCartStore((state) => state.setDrawerOpen);
  const discountCodes = useCartStore((state) => state.discountCodes);
  const requestedDiscountCodes = useCartStore((state) => state.requestedDiscountCodes);
  const applyDiscountCode = useCartStore((state) => state.applyDiscountCode);

  const normalizedOfferCode = normalizeCode(GUIDE_OFFER_CODE);
  const offerIsReady = useMemo(
    () =>
      requestedDiscountCodes.some(
        (code) => normalizeCode(code) === normalizedOfferCode,
      ) ||
      discountCodes.some(
        (discount) =>
          normalizeCode(discount.code) === normalizedOfferCode &&
          discount.applicable,
      ),
    [discountCodes, normalizedOfferCode, requestedDiscountCodes],
  );

  useEffect(() => {
    const capturedSource = captureGuideOfferFromSearch(location.search);
    const cameFromGuide = Boolean(capturedSource) || hasGuideOfferSource();

    if (!cameFromGuide) return;
    setGuideSourceActive(true);

    if (guideOfferPrepared.current || offerIsReady) return;
    guideOfferPrepared.current = true;

    void applyDiscountCode(GUIDE_OFFER_CODE).then((result) => {
      trackEvent("guide_offer_prepared", {
        product_handle: productHandle,
        offer_code: GUIDE_OFFER_CODE,
        content_slug: capturedSource?.guide || "session",
        placement: capturedSource?.placement || "continued_session",
        cta_variant: "guide10-product-page",
        interaction_type: "prepare",
        offer_status: result.applied
          ? "applied"
          : result.pending
            ? "pending"
            : "not_applicable",
      });
      trackClarityEvent("guide_offer_prepared");

      if (capturedSource && (result.applied || result.pending)) {
        toast.success(`${GUIDE_OFFER_CODE} is ready`, {
          description: result.applied
            ? "Your 10% guide offer is applied to the cart."
            : "Your 10% guide offer will be applied when you add a product.",
        });
      }
    });
  }, [applyDiscountCode, location.search, offerIsReady, productHandle]);

  useEffect(() => {
    if (
      guideSourceActive ||
      offerIsReady ||
      isDrawerOpen ||
      hasSeenDirectProductOfferToday()
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      markDirectProductOfferSeenToday();
      setOpen(true);
      trackEvent("direct_product_offer_impression", {
        product_handle: productHandle,
        offer_code: GUIDE_OFFER_CODE,
        placement: "product_page_modal",
        cta_variant: "direct-guide10-v1",
        interaction_type: "impression",
        delay_seconds: DIRECT_OFFER_DELAY_MS / 1000,
      });
      trackClarityEvent("direct_product_offer_impression");
    }, DIRECT_OFFER_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [guideSourceActive, isDrawerOpen, offerIsReady, productHandle]);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen && !claimed.current) {
      trackEvent("direct_product_offer_dismissed", {
        product_handle: productHandle,
        offer_code: GUIDE_OFFER_CODE,
        placement: "product_page_modal",
        cta_variant: "direct-guide10-v1",
        interaction_type: "dismiss",
      });
      trackClarityEvent("direct_product_offer_dismissed");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(GUIDE_OFFER_CODE);
      setCopied(true);
      trackEvent("direct_product_offer_code_copied", {
        product_handle: productHandle,
        offer_code: GUIDE_OFFER_CODE,
        placement: "product_page_modal",
        cta_variant: "direct-guide10-v1",
        interaction_type: "copy",
      });
      window.setTimeout(() => setCopied(false), 2_000);
    } catch {
      toast.error("Could not copy the code. You can enter GUIDE10 manually.");
    }
  };

  const handleClaim = async () => {
    if (isApplying) return;
    setIsApplying(true);

    try {
      const result = await applyDiscountCode(GUIDE_OFFER_CODE);
      const status = result.applied
        ? "applied"
        : result.pending
          ? "pending"
          : "not_applicable";

      trackEvent("direct_product_offer_claimed", {
        product_handle: productHandle,
        offer_code: GUIDE_OFFER_CODE,
        placement: "product_page_modal",
        cta_variant: "direct-guide10-v1",
        interaction_type: "claim",
        offer_status: status,
        cart_has_items: items.length > 0,
      });
      trackClarityEvent(`direct_product_offer_${status}`);

      if (!result.applied && !result.pending) {
        toast.error("This offer could not be applied", {
          description:
            result.message ||
            "The current cart may already have a stronger or incompatible promotion.",
        });
        return;
      }

      claimed.current = true;
      setOpen(false);

      if (items.length > 0) {
        toast.success(
          result.applied
            ? `${GUIDE_OFFER_CODE} applied`
            : `${GUIDE_OFFER_CODE} saved`,
          {
            description: result.applied
              ? "Shopify has confirmed the offer in your cart."
              : "The cart will check the offer again before checkout.",
          },
        );
        window.setTimeout(() => setDrawerOpen(true), 120);
      } else {
        toast.success(`${GUIDE_OFFER_CODE} saved`, {
          description: "Choose your option and the offer will follow you to checkout.",
        });
        window.setTimeout(() => {
          document
            .querySelector<HTMLElement>("[data-product-purchase-panel]")
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 120);
      }
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[88svh] w-[calc(100%-1.5rem)] max-w-md overflow-y-auto rounded-[1.75rem] border-slate-200 bg-white p-0 shadow-2xl sm:w-full">
        <div className="bg-[radial-gradient(circle_at_100%_0%,rgba(59,130,246,0.22),transparent_45%),linear-gradient(135deg,#ffffff_0%,#f8fbff_62%,#ecfdf5_100%)] px-5 pb-5 pt-7 sm:px-7 sm:pb-6">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.17em] text-blue-700">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/25">
              <Gift className="h-4 w-4" />
            </span>
            A welcome offer for today
          </div>

          <DialogTitle className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-3xl">
            Take {NEWSLETTER_DISCOUNT_PCT}% off your order.
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm leading-6 text-slate-600">
            Apply {GUIDE_OFFER_CODE} now. Shopify will keep the offer with your cart while you choose what fits your routine.
          </DialogDescription>

          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/90 p-3 shadow-sm">
            {productImage ? (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-50 ring-1 ring-slate-200">
                <img
                  src={productImage}
                  alt=""
                  className="h-full w-full object-contain p-1.5"
                />
              </div>
            ) : (
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ShoppingBag className="h-6 w-6" />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-sm font-semibold leading-5 text-slate-950">
                {productName}
              </p>
              {priceLabel && (
                <p className="mt-1 text-sm font-bold text-blue-700">{priceLabel}</p>
              )}
            </div>
          </div>
        </div>

        <div className="px-5 pb-6 sm:px-7 sm:pb-7">
          <button
            type="button"
            onClick={handleCopy}
            className="group -mt-1 flex w-full items-center justify-between rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50 px-4 py-3 text-left transition hover:border-blue-400"
            aria-label={`Copy discount code ${GUIDE_OFFER_CODE}`}
          >
            <span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600">
                Your code
              </span>
              <span className="mt-0.5 block text-lg font-black tracking-[0.16em] text-blue-950">
                {GUIDE_OFFER_CODE}
              </span>
            </span>
            {copied ? (
              <Check className="h-5 w-5 text-emerald-600" />
            ) : (
              <Copy className="h-5 w-5 text-blue-500 transition group-hover:text-blue-700" />
            )}
          </button>

          <button
            type="button"
            onClick={handleClaim}
            disabled={isApplying}
            className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-65"
          >
            <Sparkles className="h-4 w-4" />
            {isApplying
              ? "Applying offer..."
              : items.length > 0
                ? `Apply ${GUIDE_OFFER_CODE} to my cart`
                : `Save ${NEWSLETTER_DISCOUNT_PCT}% for checkout`}
          </button>

          <p className="mt-3 text-center text-[11px] leading-4 text-slate-500">
            Shopify confirms discount eligibility and combinations in the cart.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
