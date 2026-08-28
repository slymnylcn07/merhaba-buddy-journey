import { type CSSProperties, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import { trackEvent } from "@/hooks/use-google-analytics";
import { trackClarityEvent } from "@/hooks/use-microsoft-clarity";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { pickProductForSlug, ProductRec, PRODUCT_RECS } from "@/lib/article-product-map";
import { getPublicProductHandle } from "@/lib/product-config";
import { getProductMarketplaceFeedback } from "@/data/product-marketplace-feedback";
import { articleCTAs } from "@/data/article-ctas";
import { recentArticleCTAs } from "@/data/recent-article-ctas";
import { NEWSLETTER_DISCOUNT_CODE, NEWSLETTER_DISCOUNT_PCT } from "@/lib/newsletter-config";
import {
  buildGuideOfferProductPath,
  markGuideOfferSource,
} from "@/lib/guide-offer";
import {
  formatFreeShippingThreshold,
  formatMarketMoney,
  getSafeUsdFallbackPrice,
  hasProductPriceRange,
} from "@/lib/shipping-policy";

interface PremiumCTAProps {
  headline?: string;
  text?: string;
  articleSlug?: string;
  placement?: "mid_article" | "article_end";
}

interface CtaFeature {
  feature: string;
  benefit: string;
}

interface CtaProductPresentation {
  shortName: string;
  lifestyleImage: string;
  mobileObjectPosition: string;
  desktopObjectPosition: string;
  routineLabel: string;
  fallbackHeadline: string;
  fallbackSupport: string;
  features: readonly [CtaFeature, CtaFeature, CtaFeature];
}

const CTA_PRODUCT_PRESENTATIONS: Record<string, CtaProductPresentation> = {
  [PRODUCT_RECS.main.handle]: {
    shortName: "FlexiKnee",
    lifestyleImage: "/images/product-stories/massager-closeup-comfort.webp",
    mobileObjectPosition: "50% 55%",
    desktopObjectPosition: "50% 54%",
    routineLabel: "15-minute evening routine",
    fallbackHeadline: "Bring the comfort routine in this guide into one device",
    fallbackSupport:
      "The short comfort routine from this guide, without separate heat and vibration devices.",
    features: [
      { feature: "3000 mAh cordless", benefit: "use it on the sofa, no wall socket" },
      { feature: "Integrated red light", benefit: "one wrap instead of separate devices" },
      { feature: "3 vibration modes", benefit: "choose a gentler or stronger routine" },
    ],
  },
  [PRODUCT_RECS.calf.handle]: {
    shortName: "Calf Massager",
    lifestyleImage: "/images/product-stories/calf-massager-closeup.webp",
    mobileObjectPosition: "52% 52%",
    desktopObjectPosition: "52% center",
    routineLabel: "15-minute leg reset",
    fallbackHeadline: "Bring the lower-leg routine in this guide into one wrap",
    fallbackSupport:
      "The lower-leg routine from this guide, without a wall-powered recovery setup.",
    features: [
      { feature: "3 compression modes", benefit: "adjust the session to tired legs" },
      { feature: "Rechargeable battery", benefit: "use it without staying by an outlet" },
      { feature: "15-minute sessions", benefit: "fits after travel or long workdays" },
    ],
  },
  [PRODUCT_RECS.insoles.handle]: {
    shortName: "Sport Insoles",
    lifestyleImage: "/images/product-stories/insoles-closeup-fit.webp",
    mobileObjectPosition: "50% center",
    desktopObjectPosition: "50% center",
    routineLabel: "Daily walking support",
    fallbackHeadline: "Add ground-up support to the routine in this guide",
    fallbackSupport:
      "The walking-support routine from this guide, without another knee-worn device.",
    features: [
      { feature: "Structured arch support", benefit: "changes support from the ground up" },
      { feature: "Shock-absorbing layer", benefit: "adds cushioning inside compatible shoes" },
      { feature: "Trim-to-fit sizing", benefit: "shapes the insole to your footwear" },
    ],
  },
  [PRODUCT_RECS.sleeve.handle]: {
    shortName: "Support Sleeve",
    lifestyleImage: "/images/product-stories/compression-sleeve-closeup.webp",
    mobileObjectPosition: "52% center",
    desktopObjectPosition: "52% center",
    routineLabel: "Everyday movement support",
    fallbackHeadline: "Add flexible knee support to the routine in this guide",
    fallbackSupport:
      "The movement-support routine from this guide, without tape or rigid hardware.",
    features: [
      { feature: "Breathable knit", benefit: "wear it during walks or training" },
      { feature: "Open-kneecap design", benefit: "centers the sleeve around the joint" },
      { feature: "Flexible pull-on fit", benefit: "moves without rigid hardware" },
    ],
  },
  [PRODUCT_RECS.wrap.handle]: {
    shortName: "Heated Knee Wrap",
    lifestyleImage: "/images/product-stories/heated-wrap-closeup-fit.webp",
    mobileObjectPosition: "50% center",
    desktopObjectPosition: "50% center",
    routineLabel: "15-minute warmth routine",
    fallbackHeadline: "Bring the warmth routine in this guide into one wrap",
    fallbackSupport: "The warmth routine from this guide, without a bulky heating pad.",
    features: [
      { feature: "USB-powered warmth", benefit: "use it with a compatible power source" },
      { feature: "Focused heat panel", benefit: "keeps warmth around the knee" },
      { feature: "15-minute sessions", benefit: "fits an evening wind-down" },
    ],
  },
  [PRODUCT_RECS.iceWrap.handle]: {
    shortName: "Ice Wrap",
    lifestyleImage: "/images/product-stories/ice-pack-wrap-closeup-fit.webp",
    mobileObjectPosition: "50% center",
    desktopObjectPosition: "50% center",
    routineLabel: "Post-activity cold routine",
    fallbackHeadline: "Bring the cold routine in this guide into one reusable wrap",
    fallbackSupport: "The cold-compress routine from this guide, without a pump or tubing.",
    features: [
      { feature: "Reusable gel pad", benefit: "refreeze it for the next session" },
      { feature: "24 cm center pad", benefit: "covers the front of the knee" },
      { feature: "No pump or tubing", benefit: "sets up a cold routine quickly" },
    ],
  },
  [PRODUCT_RECS.compressionSocks.handle]: {
    shortName: "Compression Socks",
    lifestyleImage: "/images/product-stories/compression-socks-travel.webp",
    mobileObjectPosition: "50% center",
    desktopObjectPosition: "50% center",
    routineLabel: "Travel day support",
    fallbackHeadline: "Add lower-leg support to the routine in this guide",
    fallbackSupport:
      "The lower-leg support routine from this guide, without a powered device.",
    features: [
      { feature: "Knee-high coverage", benefit: "supports the lower leg through long days" },
      { feature: "Nylon knit", benefit: "keeps the sock lightweight" },
      { feature: "Three size groups", benefit: "uses calf size and shoe size" },
    ],
  },
};

const FORBIDDEN_CARD_COPY =
  /\b(do not|does not|not intended|not a treatment|replace|newly injured|warning signs?|cannot bear weight|swollen|unstable|urgent care|diagnos(?:e|is)|contraindication)\b/i;

function lowerFirst(value: string) {
  return value ? value.charAt(0).toLowerCase() + value.slice(1) : value;
}

function getDisplayHeadline(source: string | undefined, presentation: CtaProductPresentation) {
  const raw = (source || presentation.fallbackHeadline).trim().replace(/[?.!]+$/g, "");
  const rules: Array<[RegExp, (match: RegExpMatchArray) => string]> = [
    [/^Want (?:a |an )?(.+?) for (.+)$/i, (match) => `Bring ${lowerFirst(match[1])} to ${lowerFirst(match[2])}`],
    [/^Want (?:a |an )?(.+?) after (.+)$/i, (match) => `Bring ${lowerFirst(match[1])} into recovery after ${lowerFirst(match[2])}`],
    [/^Want (?:a |an )?(.+?) during (.+)$/i, (match) => `Add ${lowerFirst(match[1])} during ${lowerFirst(match[2])}`],
    [/^Want (?:a |an )?(.+?) before (.+)$/i, (match) => `Add ${lowerFirst(match[1])} before ${lowerFirst(match[2])}`],
    [/^Want (?:a |an )?(.+)$/i, (match) => `Bring ${lowerFirst(match[1])} into this routine`],
    [/^Considering (?:a |an )?(.+?) after (.+)$/i, (match) => `Bring ${lowerFirst(match[1])} into recovery after ${lowerFirst(match[2])}`],
    [/^Considering (?:a |an )?(.+)$/i, (match) => `Put ${lowerFirst(match[1])} into this routine`],
    [/^Need (.+?) for (.+)$/i, (match) => `Add ${lowerFirst(match[1])} for ${lowerFirst(match[2])}`],
    [/^Need (.+)$/i, (match) => `Add ${lowerFirst(match[1])} to this routine`],
    [/^Looking for (.+?) after (.+)$/i, (match) => `Bring ${lowerFirst(match[1])} into recovery after ${lowerFirst(match[2])}`],
    [/^Looking for (.+)$/i, (match) => `Add ${lowerFirst(match[1])} to this routine`],
    [/^Building (.+)$/i, (match) => `Build ${lowerFirst(match[1])}`],
    [/^Does (.+?) match (.+)$/i, (match) => `Match ${lowerFirst(match[1])} to ${lowerFirst(match[2])}`],
    [/^Would (?:a |an )?(.+?) fit your routine$/i, (match) => `Bring ${lowerFirst(match[1])} into this routine`],
    [/^Curious about (.+)$/i, (match) => `Explore ${lowerFirst(match[1])} in this routine`],
    [/^Interested in (.+)$/i, (match) => `Explore ${lowerFirst(match[1])} in this routine`],
    [/^Ready to (.+)$/i, (match) => `Put ${lowerFirst(match[1])} into practice`],
    [/^Prefer (.+)$/i, (match) => `Bring ${lowerFirst(match[1])} into this routine`],
  ];

  let headline = raw;
  for (const [pattern, formatter] of rules) {
    const match = headline.match(pattern);
    if (match) {
      headline = formatter(match);
      break;
    }
  }

  const stillQuestion = /^(can|could|would|should|is|are|do|does|why|what|how|when|which|who)\b/i.test(
    headline,
  );
  const mentionsAlternative = /\b(heat or ice|versus|vs\.)\b/i.test(headline);
  if (
    stillQuestion ||
    mentionsAlternative ||
    FORBIDDEN_CARD_COPY.test(headline)
  ) {
    return presentation.fallbackHeadline;
  }

  return headline;
}

function getDisplaySupport(source: string | undefined, presentation: CtaProductPresentation) {
  if (!source) return presentation.fallbackSupport;

  const safeSentence = source
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .find(
      (sentence) =>
        sentence.length > 0 &&
        sentence.length <= 108 &&
        !sentence.includes("?") &&
        !FORBIDDEN_CARD_COPY.test(sentence),
    );

  return safeSentence || presentation.fallbackSupport;
}

let productsPromise: Promise<ShopifyProduct[]> | null = null;
function getCachedProducts() {
  if (!productsPromise) {
    productsPromise = getProducts(20).catch(() => []);
  }
  return productsPromise;
}

const PremiumCTA = ({
  headline,
  text,
  articleSlug,
  placement = "article_end",
}: PremiumCTAProps) => {
  const location = useLocation();
  const slug = articleSlug || (location.pathname.startsWith("/guides/")
    ? location.pathname.replace("/guides/", "")
    : undefined);
  const mappedCopy = slug ? articleCTAs[slug] || recentArticleCTAs[slug] : undefined;

  const rec: ProductRec = pickProductForSlug(slug);
  const presentation =
    CTA_PRODUCT_PRESENTATIONS[rec.handle] || CTA_PRODUCT_PRESENTATIONS[PRODUCT_RECS.main.handle];
  const displayHeadline = getDisplayHeadline(headline || mappedCopy?.headline, presentation);
  const displaySupport = getDisplaySupport(text || mappedCopy?.text, presentation);
  const feedback = getProductMarketplaceFeedback(rec.handle);
  const cardRef = useRef<HTMLDivElement>(null);
  const impressionSent = useRef(false);

  const [liveImage, setLiveImage] = useState<string | null>(null);
  const [livePrice, setLivePrice] = useState<{
    label: string;
    amount: number;
    currencyCode: string;
    isRange: boolean;
  } | null>(null);

  useEffect(() => {
    let active = true;
    setLiveImage(null);
    setLivePrice(null);

    getCachedProducts().then((list) => {
      if (!active) return;
      const match = list.find(
        (product) =>
          getPublicProductHandle(decodeURIComponent(product.node.handle)) ===
          getPublicProductHandle(decodeURIComponent(rec.handle)),
      );
      if (match) {
        setLiveImage(match.node.images?.edges?.[0]?.node?.url || null);
        const amount = match.node.priceRange?.minVariantPrice?.amount;
        const currencyCode = match.node.priceRange?.minVariantPrice?.currencyCode;
        const numericAmount = Number(amount);
        if (Number.isFinite(numericAmount) && currencyCode) {
          const isRange = hasProductPriceRange(match.node.priceRange);
          const prefix = isRange ? "From " : "";
          setLivePrice({
            label: `${prefix}${formatMarketMoney(numericAmount, currencyCode)}`,
            amount: numericAmount,
            currencyCode,
            isRange,
          });
        }
      }
    });
    return () => {
      active = false;
    };
  }, [rec.handle]);

  const safeFallbackPrice = getSafeUsdFallbackPrice(rec.fallbackPrice);
  const fallbackUsdMatch = /^\$(\d+(?:\.\d{1,2})?)$/.exec(safeFallbackPrice);
  const fallbackUsdAmount = fallbackUsdMatch ? Number(fallbackUsdMatch[1]) : null;
  const regularAmount = livePrice?.amount ?? fallbackUsdAmount;
  const currencyCode = livePrice?.currencyCode || (fallbackUsdAmount !== null ? "USD" : null);
  const isRange = livePrice?.isRange || false;
  const pricePrefix = isRange ? "From " : "";
  const discountedAmount =
    regularAmount !== null && Number.isFinite(regularAmount)
      ? regularAmount * (1 - NEWSLETTER_DISCOUNT_PCT / 100)
      : null;
  const savingsAmount =
    regularAmount !== null && Number.isFinite(regularAmount)
      ? regularAmount * (NEWSLETTER_DISCOUNT_PCT / 100)
      : null;
  const normalizedSavingsAmount =
    savingsAmount !== null && Math.abs(savingsAmount - Math.round(savingsAmount)) < 0.01
      ? Math.round(savingsAmount)
      : savingsAmount;
  const guidePrice =
    discountedAmount !== null && currencyCode
      ? `${pricePrefix}${formatMarketMoney(discountedAmount, currencyCode)}`
      : null;
  const crossedPrice = livePrice?.label || (guidePrice ? safeFallbackPrice : null);
  const savingsLabel =
    normalizedSavingsAmount !== null && currencyCode
      ? `${formatMarketMoney(normalizedSavingsAmount, currencyCode)} saved`
      : `${NEWSLETTER_DISCOUNT_PCT}% saved`;
  const offerProductPath = buildGuideOfferProductPath(
    rec.handle,
    slug || "unknown",
    placement,
  );

  useEffect(() => {
    const element = cardRef.current;
    if (!element || impressionSent.current) return;

    const sendImpression = () => {
      if (impressionSent.current) return;
      impressionSent.current = true;
      trackClarityEvent("guide_product_card_view");
      trackEvent("view_promotion", {
        promotion_id: `guide10-${placement}-${slug || "unknown"}`,
        promotion_name: "Guide reader offer",
        content_slug: slug || "unknown",
        creative_slot: placement,
        placement,
        cta_variant: "guide-product-card-v3",
        product_handle: rec.handle,
        offer_code: NEWSLETTER_DISCOUNT_CODE,
        interaction_type: "impression",
        items: [{ item_id: rec.handle, item_name: rec.title }],
      });
    };

    if (!("IntersectionObserver" in window)) {
      sendImpression();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        sendImpression();
        observer.disconnect();
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [placement, rec.handle, rec.title, slug]);

  const handleProductClick = () => {
    markGuideOfferSource(slug || "unknown", placement);
    trackClarityEvent("guide_product_card_click");
    trackEvent("select_promotion", {
      promotion_id: `guide10-${placement}-${slug || "unknown"}`,
      promotion_name: "Guide reader offer",
      content_slug: slug || "unknown",
      creative_slot: placement,
      placement,
      cta_variant: "guide-product-card-v3",
      product_handle: rec.handle,
      offer_code: NEWSLETTER_DISCOUNT_CODE,
      interaction_type: "click",
      items: [{ item_id: rec.handle, item_name: rec.title }],
    });
  };

  const warrantyCopy = rec.handle === PRODUCT_RECS.main.handle
    ? "30-day returns · 2-year limited warranty"
    : "30-day returns · Secure Shopify checkout";
  const shippingCopy = `Free shipping over ${formatFreeShippingThreshold()}`;
  const isMidArticle = placement === "mid_article";
  const objectPositionStyle = {
    "--cta-object-mobile": presentation.mobileObjectPosition,
    "--cta-object-desktop": presentation.desktopObjectPosition,
  } as CSSProperties;

  return (
    <div
      ref={cardRef}
      data-cta="product-card"
      data-cta-placement={placement}
      data-offer-code={NEWSLETTER_DISCOUNT_CODE}
      className={`premium-article-cta not-prose mx-auto w-full max-w-[720px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_45px_-34px_rgba(15,23,42,0.45)] ${isMidArticle ? "my-7" : "my-10"}`}
    >
      <div className="bg-slate-950 px-4 py-1.5 sm:px-5">
        <p className="!m-0 whitespace-nowrap !text-[9px] font-semibold uppercase !leading-4 tracking-[0.13em] !text-slate-200 sm:!text-[10px]">
          The device discussed in this guide
        </p>
      </div>

      <div className={`grid grid-cols-1 ${isMidArticle ? "min-[860px]:grid-cols-[38%_62%]" : "min-[860px]:grid-cols-[40%_60%]"}`}>
        <div className={`relative overflow-hidden bg-slate-100 min-[860px]:h-auto min-[860px]:aspect-auto min-[860px]:self-stretch ${isMidArticle ? "aspect-[16/7]" : "aspect-video"}`}>
          <img
            src={presentation.lifestyleImage}
            alt={`${rec.title} in use during a comfort routine`}
            loading="lazy"
            onError={(event) => {
              const image = event.currentTarget;
              const liveUrl = liveImage ? new URL(liveImage, window.location.origin).href : null;
              const fallbackUrl = new URL(rec.fallbackImage, window.location.origin).href;
              if (liveUrl && image.src !== liveUrl) {
                image.src = liveImage;
              } else if (image.src !== fallbackUrl) {
                image.src = rec.fallbackImage;
              }
            }}
            className="!absolute !inset-0 !m-0 !h-full !w-full !max-w-none !rounded-none !border-0 bg-transparent !object-cover !shadow-none [object-position:var(--cta-object-mobile)] min-[860px]:[object-position:var(--cta-object-desktop)]"
            style={objectPositionStyle}
          />
          <span className="absolute bottom-3 left-3 rounded-full bg-slate-950/85 px-2.5 py-1 text-[10px] font-medium text-white shadow-sm backdrop-blur-sm">
            {presentation.routineLabel}
          </span>
        </div>

        <div className={`min-w-0 ${isMidArticle ? "p-3.5 sm:p-5" : "p-5 sm:p-6"}`}>
          <div>
            <h3 className={`!m-0 font-semibold !leading-[1.25] tracking-[-0.02em] text-slate-950 ${isMidArticle ? "!text-[18px]" : "!text-[19px]"}`}>
              {displayHeadline}
            </h3>
            <p className={`!mb-0 !mt-2 text-slate-600 ${isMidArticle ? "!text-[13px] !leading-[18px]" : "!text-sm !leading-5"}`}>
              {displaySupport}
            </p>
          </div>

          {!isMidArticle && (
            <>
              <ul className="!m-0 !mt-6 !list-none space-y-2 !p-0" aria-label="Product features">
                {presentation.features.map(({ feature, benefit }) => (
                  <li key={feature} className="!m-0 flex items-start gap-2 !text-[13px] !leading-[1.45] text-slate-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-slate-900">{feature}</strong>
                      <span> — {benefit}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <p className="!mb-0 !mt-4 !text-[13px] font-normal !leading-5 text-slate-500">{rec.title}</p>
            </>
          )}

          <div className={`rounded-xl border border-slate-200 bg-slate-50 ${isMidArticle ? "mt-3 px-3 py-2.5" : "mt-2 px-3.5 py-3"}`}>
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className={`${isMidArticle ? "text-[22px]" : "text-2xl"} font-bold tracking-[-0.025em] text-slate-950`}>
                {guidePrice || safeFallbackPrice}
              </span>
              {crossedPrice && (
                <span className="text-sm font-medium text-slate-400 line-through">{crossedPrice}</span>
              )}
              <span className="ml-auto rounded-full bg-blue-100 px-2 py-1 text-[11px] font-semibold text-blue-700">
                {savingsLabel}
              </span>
            </div>
            <p className="!mb-0 !mt-1 !text-[11px] !leading-4 text-slate-500">
              {NEWSLETTER_DISCOUNT_CODE} applied automatically in cart
            </p>
          </div>

          <Link
            to={offerProductPath}
            onClick={handleProductClick}
            className={`${isMidArticle ? "mt-2.5 min-h-11 py-2.5" : "mt-3 min-h-12 py-3"} flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-center text-base font-bold leading-5 !text-white !no-underline transition-colors hover:bg-blue-700 hover:!text-white hover:!no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2`}
          >
            <span>
              See how it works
            </span>
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </Link>

          {isMidArticle ? (
            <div className="mt-2 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-center text-slate-500">
              <p className="!m-0 !text-[10px] !leading-4">
                {warrantyCopy} · {shippingCopy}
              </p>
              {feedback && (
                <p
                  className="!m-0 flex items-center justify-center gap-1 !text-[11px] font-medium !leading-4"
                  aria-label={`${feedback.rating.toFixed(1)} out of 5, ${feedback.reviewCount.toLocaleString("en-US")} customer reviews`}
                >
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden="true" />
                  <span>
                    {feedback.rating.toFixed(1)}/5 · {feedback.reviewCount.toLocaleString("en-US")} customer reviews
                  </span>
                </p>
              )}
            </div>
          ) : (
            <>
              <p className="!mb-0 !mt-3 text-center !text-[11px] !leading-4 text-slate-500">
                {warrantyCopy} · {shippingCopy}
              </p>

              {feedback && (
                <p
                  className="!mb-0 !mt-3 flex items-center justify-center gap-1.5 !text-[12px] font-medium !leading-4 text-slate-500"
                  aria-label={`${feedback.rating.toFixed(1)} out of 5, ${feedback.reviewCount.toLocaleString("en-US")} customer reviews`}
                >
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                  <span>
                    {feedback.rating.toFixed(1)}/5 · {feedback.reviewCount.toLocaleString("en-US")} customer reviews
                  </span>
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PremiumCTA;
