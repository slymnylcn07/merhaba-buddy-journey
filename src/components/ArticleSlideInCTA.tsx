import { useState, useEffect, useCallback, useRef } from "react";
import { X, ArrowRight, Sparkles, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { trackEvent } from "@/hooks/use-google-analytics";
import { trackClarityEvent } from "@/hooks/use-microsoft-clarity";
import { pickProductForSlug, PRODUCT_RECS } from "@/lib/article-product-map";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { getPublicProductHandle } from "@/lib/product-config";
import { ProductMarketplaceRating } from "@/components/ProductMarketplaceRating";
import {
  buildGuideOfferProductPath,
  markGuideOfferSource,
} from "@/lib/guide-offer";
import { NEWSLETTER_DISCOUNT_CODE, NEWSLETTER_DISCOUNT_PCT } from "@/lib/newsletter-config";
import {
  formatMarketMoney,
  getSafeUsdFallbackPrice,
  hasProductPriceRange,
} from "@/lib/shipping-policy";

// Urun gorselleri icin oturum ici tek istek (PremiumCTA ile ayni desen)
let slideInProductsPromise: Promise<ShopifyProduct[]> | null = null;
function getSlideInProducts() {
  if (!slideInProductsPromise) {
    slideInProductsPromise = getProducts(20).catch(() => []);
  }
  return slideInProductsPromise;
}

interface ArticleSlideInCTAProps {
  slug: string;
  title: string;
}

const STORAGE_KEY_PREFIX = "flexiknee_article_product_cta_v4:";
const CTA_VERSION = "article-slide-in-v4";
const MOBILE_PRODUCT_SCROLL = 30;
const DESKTOP_PRODUCT_SCROLL = 25;

interface ProductPopupSession {
  slug: string;
  outcome: "dismissed" | "product";
  dismissedAt?: number;
  dismissedScroll?: number;
}

function getScrollPercent() {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollHeight <= 0) return 0;
  return Math.min(100, Math.max(0, (window.scrollY / scrollHeight) * 100));
}

function getDeviceType() {
  return window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop";
}

function getStorageKey(slug: string) {
  return `${STORAGE_KEY_PREFIX}${slug}`;
}

function readProductPopupSession(slug: string): ProductPopupSession | null {
  const rawValue = window.sessionStorage.getItem(getStorageKey(slug));
  if (!rawValue) return null;
  try {
    return JSON.parse(rawValue) as ProductPopupSession;
  } catch {
    return null;
  }
}

function getContextualContent(slug: string): { hook: string; support: string } {
  const s = slug.toLowerCase();

  if (s === "varicose-veins-knee-pain")
    return {
      hook: "Would everyday compression fit your standing or travel routine?",
      support: "If compression has been confirmed as appropriate for you, a correctly sized knee-high sock can provide a supported feel during long days on your feet.",
    };

  if (s === "cold-therapy-machine-knee")
    return {
      hook: "Would a reusable cold wrap fit your routine better than a machine?",
      support: "A freezer-cooled knee wrap offers a pump-free option for brief cold-comfort sessions when cold is appropriate, with regular skin checks.",
    };

  if (s.includes("low-impact-cardio"))
    return {
      hook: "Trying to build cardio without overloading your knees?",
      support: "Breathable compression can add a supported feel during walking, cycling, and other controlled sessions.",
    };

  if (s.includes("backward-walking"))
    return {
      hook: "Practicing short walking drills with more confidence?",
      support: "A flexible compression sleeve can add warmth and sensory feedback while you progress carefully.",
    };

  if (s.includes("stairs") || s.includes("going-down"))
    return {
      hook: "Does your knee give you trouble on the stairs?",
      support: "Targeted heat support may help ease the pressure your knee feels during each step down.",
    };

  if (s.includes("exercise") || s.includes("workout") || s.includes("leg-workouts") || s.includes("post-exercise"))
    return {
      hook: "Do your knees feel weak or sore after workouts?",
      support: "Gentle heat-based recovery may help ease the tension your knees carry after activity.",
    };

  if (s.includes("stiffness") || s.includes("resting") || s.includes("getting-up") || s.includes("sitting"))
    return {
      hook: "Is your knee feeling stiff or locked up right now?",
      support: "Consistent warmth support may help loosen tight knee joints after long periods of rest.",
    };

  if (s.includes("walk") || s.includes("hiking"))
    return {
      hook: "Does your knee slow you down when walking?",
      support: "Some people find that heat-based support helps ease movement-related knee tension.",
    };

  if (s.includes("night") || s.includes("sleep"))
    return {
      hook: "Is knee discomfort keeping you awake at night?",
      support: "An evening warmth routine may help calm restless knee discomfort before bed.",
    };

  if (s.includes("morning"))
    return {
      hook: "Does your knee feel locked up every morning?",
      support: "A short warmth session before starting your day may help loosen stiff joints faster.",
    };

  if (s.includes("heat") || s.includes("ice") || s.includes("infrared") || s.includes("red-light") || s.includes("therapy") || s.includes("warmth"))
    return {
      hook: "Still unsure which therapy approach suits your knee?",
      support: "FlexiKnee combines heat and red light in one simple, at-home routine.",
    };

  if (s.includes("sharp") || s.includes("stabbing"))
    return {
      hook: "Are you dealing with sudden, sharp knee sensations?",
      support: "Targeted warmth support may help reduce sharp discomfort during everyday movements.",
    };

  if (s.includes("click") || s.includes("crack") || s.includes("pop"))
    return {
      hook: "Hearing clicking or popping every time you move your knee?",
      support: "Gentle heat-based support may help ease the stiffness behind those sounds.",
    };

  if (s.includes("weakness") || s.includes("heavy"))
    return {
      hook: "Does your knee feel unstable or heavy when you move?",
      support: "Warmth-based support may help improve comfort and confidence in your knee.",
    };

  if (s.includes("burning") || s.includes("warm-feeling"))
    return {
      hook: "Is your knee giving off a burning or warm sensation?",
      support: "Targeted support routines may help manage uncomfortable heat in the joint area.",
    };

  if (s.includes("squat") || s.includes("kneel") || s.includes("yoga"))
    return {
      hook: "Does bending your knee feel uncomfortable or risky?",
      support: "Simple warmth support can help ease knee pressure during bending and stretching.",
    };

  if (s.includes("cold-weather") || s.includes("cold"))
    return {
      hook: "Does cold weather make your knees ache more than usual?",
      support: "Consistent warmth support can help counter the stiffness cold temperatures bring.",
    };

  if (s.includes("car") || s.includes("flight"))
    return {
      hook: "Do your knees feel stiff and sore after sitting in a car or plane?",
      support: "A quick warmth session before and after travel can support joint comfort.",
    };

  if (s.includes("after-40") || s.includes("after-50") || s.includes("age") || s.includes("mobility"))
    return {
      hook: "Are your knees reminding you of every year that passes?",
      support: "Gentle warmth support can help maintain joint comfort as you stay active.",
    };

  if (s.includes("location") || s.includes("side") || s.includes("back-of") || s.includes("front") || s.includes("behind") || s.includes("it-band") || s.includes("runner") || s.includes("patello") || s.includes("plica") || s.includes("bursitis"))
    return {
      hook: "Trying to figure out exactly where your knee pain is coming from?",
      support: "Targeted warmth and light support can help ease area-specific knee discomfort.",
    };

  if (s.includes("massager") || s.includes("flexiknee") || s.includes("competitor") || s.includes("brace") || s.includes("device"))
    return {
      hook: "Still searching for the right knee comfort solution?",
      support: "See how FlexiKnee combines heat and red light therapy in one simple device.",
    };

  if (s.includes("remedies") || s.includes("worse") || s.includes("weight"))
    return {
      hook: "Looking for practical ways to support your knees every day?",
      support: "Simple support methods can help reduce the pressure your knees carry daily.",
    };

  if (s.includes("shoe") || s.includes("running"))
    return {
      hook: "Is knee discomfort affecting your runs or daily walks?",
      support: "Pairing the right footwear with a warmth routine can ease recurring knee tension.",
    };

  if (s.includes("swelling"))
    return {
      hook: "Is your knee swelling up after activity?",
      support: "Gentle heat-based support may help ease the discomfort that comes with post-activity swelling.",
    };

  if (s.includes("tight-calves") || s.includes("calf"))
    return {
      hook: "Do your calves feel tight after walking, work, or training?",
      support: "A short compression-and-warmth recovery session can help tired lower legs unwind after activity.",
    };

  if (s.includes("compression") || s.includes("sleeve"))
    return {
      hook: "Would a flexible support sleeve fit your daily routine?",
      support: "Breathable compression can add a supported feel during walking, work, and training.",
    };

  return {
    hook: "Is knee discomfort affecting your daily comfort?",
    support: "Simple heat-based support methods can help reduce the pressure your knees feel every day.",
  };
}

export const ArticleSlideInCTA = ({ slug, title: _title }: ArticleSlideInCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [storageReady, setStorageReady] = useState(false);
  const impressionSent = useRef(false);
  const pageStartedAt = useRef(Date.now());

  const { hook, support } = getContextualContent(slug);
  const rec = pickProductForSlug(slug);
  const [liveImage, setLiveImage] = useState<string | null>(null);
  const [livePrice, setLivePrice] = useState<string | null>(null);

  useEffect(() => {
    setStorageReady(false);
    pageStartedAt.current = Date.now();
    impressionSent.current = false;
    setIsVisible(false);
    setIsDone(Boolean(readProductPopupSession(slug)));
    setStorageReady(true);
  }, [slug]);

  const getEventContext = useCallback(
    (scrollPercent: number) => ({
      slug,
      device_type: getDeviceType(),
      scroll_percent: Math.round(scrollPercent),
      seconds_on_page: Math.max(
        0,
        Math.round((Date.now() - pageStartedAt.current) / 1000),
      ),
      product_handle: rec.handle,
      cta_version: CTA_VERSION,
    }),
    [rec.handle, slug],
  );

  const handleScroll = useCallback(() => {
    if (!storageReady || document.visibilityState !== "visible") return;
    const scrollPercent = getScrollPercent();
    const productThreshold =
      getDeviceType() === "mobile" ? MOBILE_PRODUCT_SCROLL : DESKTOP_PRODUCT_SCROLL;

    if (
      !isDone &&
      !impressionSent.current &&
      scrollPercent >= productThreshold
    ) {
      impressionSent.current = true;
      setIsVisible(true);
      trackClarityEvent("guide_product_popup_view");
      const eventContext = getEventContext(scrollPercent);
      trackEvent("article_cta_impression", {
        ...eventContext,
        stage: "product",
      });
      trackEvent("view_promotion", {
        promotion_id: `article-product-${slug}`,
        promotion_name: "Article product slide-in",
        creative_slot: "article_slide_in",
        items: [{ item_id: rec.handle, item_name: rec.title }],
      });
    }
  }, [
    getEventContext,
    isDone,
    rec.handle,
    rec.title,
    slug,
    storageReady,
  ]);

  useEffect(() => {
    if (!storageReady || isDone) return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      document.removeEventListener("visibilitychange", handleScroll);
    };
  }, [handleScroll, isDone, storageReady]);

  useEffect(() => {
    let active = true;
    setLiveImage(null);
    setLivePrice(null);
    getSlideInProducts().then((list) => {
      if (!active) return;
      const match = list.find(
        (p) =>
          getPublicProductHandle(decodeURIComponent(p.node.handle)) ===
          getPublicProductHandle(decodeURIComponent(rec.handle))
      );
      if (match) {
        setLiveImage(match.node.images?.edges?.[0]?.node?.url || null);
        const amount = match.node.priceRange?.minVariantPrice?.amount;
        const currencyCode = match.node.priceRange?.minVariantPrice?.currencyCode || "USD";
        const numericAmount = Number(amount);
        if (Number.isFinite(numericAmount)) {
          const prefix = hasProductPriceRange(match.node.priceRange) ? "From " : "";
          setLivePrice(`${prefix}${formatMarketMoney(numericAmount, currencyCode)}`);
        }
      }
    });
    return () => {
      active = false;
    };
  }, [rec.handle]);

  const handleDismiss = () => {
    const scrollPercent = getScrollPercent();
    setIsVisible(false);
    setIsDone(true);
    trackClarityEvent("guide_product_popup_dismiss");
    window.sessionStorage.setItem(
      getStorageKey(slug),
      JSON.stringify({
        slug,
        outcome: "dismissed",
        dismissedAt: Date.now(),
        dismissedScroll: scrollPercent,
      } satisfies ProductPopupSession),
    );
    trackEvent("article_cta_dismissed", {
      ...getEventContext(scrollPercent),
      stage: "product",
      offer_code: NEWSLETTER_DISCOUNT_CODE,
    });
  };

  const handleCTAClick = () => {
    const scrollPercent = getScrollPercent();
    markGuideOfferSource(slug, "slide_in");
    trackClarityEvent("guide_product_popup_click");
    trackEvent("article_cta_clicked", {
      ...getEventContext(scrollPercent),
      stage: "product",
      offer_code: NEWSLETTER_DISCOUNT_CODE,
    });
    trackEvent("select_promotion", {
      promotion_id: `article-product-${slug}`,
      promotion_name: "Article product slide-in",
      creative_slot: "article_slide_in",
      items: [{ item_id: rec.handle, item_name: rec.title }],
    });
    setIsDone(true);
    window.sessionStorage.setItem(
      getStorageKey(slug),
      JSON.stringify({ slug, outcome: "product" } satisfies ProductPopupSession),
    );
  };

  if (isDone && !isVisible) return null;

  const isMain = rec.handle === PRODUCT_RECS.main.handle;
  const productShortName = rec.title.replace("FlexiKnee ", "");
  const productCtaName =
    rec.handle === PRODUCT_RECS.iceWrap.handle
      ? "ice pack wrap"
      : productShortName.split(" ").slice(-2).join(" ").toLowerCase();
  const productImage = liveImage || rec.fallbackImage;
  const productPrice = livePrice || getSafeUsdFallbackPrice(rec.fallbackPrice);
  const offerProductPath = buildGuideOfferProductPath(rec.handle, slug, "slide_in");

  return (
    <div
      role="dialog"
      aria-label="FlexiKnee product suggestion"
      className={`fixed z-40 transition-all duration-500 ease-out
        bottom-0 left-0 right-0
        md:bottom-6 md:left-auto md:right-6 md:w-[420px]
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}
      `}
    >
        <div className="relative overflow-hidden border border-slate-200 bg-white px-4 pb-3 pt-3 shadow-[0_-10px_40px_rgba(15,23,42,0.16)] md:rounded-3xl md:px-5 md:pb-5 md:pt-4 md:shadow-[0_24px_70px_-20px_rgba(15,23,42,0.35)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-emerald-400" />

          <button
            onClick={handleDismiss}
            className="absolute right-2.5 top-2.5 inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-start gap-2.5 pr-7 md:gap-3">
                {productImage ? (
                  <img
                    src={productImage}
                    alt={rec.title}
                    onError={(event) => {
                      const image = event.currentTarget;
                      const fallbackUrl = new URL(rec.fallbackImage, window.location.origin).href;
                      if (image.src !== fallbackUrl) image.src = rec.fallbackImage;
                    }}
                    className="h-16 w-16 flex-shrink-0 rounded-xl border border-slate-100 bg-slate-50 object-contain p-1 md:h-20 md:w-20 md:rounded-2xl"
                  />
                ) : (
                  <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 md:h-20 md:w-20 md:rounded-2xl">
                    <Sparkles className="h-6 w-6 text-blue-600" />
                  </span>
                )}
                <div className="min-w-0">
                  <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-emerald-700">
                    <Tag className="h-3 w-3" /> Guide reader offer
                  </span>
                  <p className="text-[13px] font-bold leading-[1.3] text-slate-950 md:text-sm md:leading-snug">{hook}</p>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-[1.45] text-slate-500 [@media(max-width:767px)_and_(max-height:740px)]:line-clamp-1 md:line-clamp-none md:text-xs md:leading-relaxed">{support}</p>
                </div>
              </div>

              <div className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-xl bg-slate-50 px-3 py-2 md:mt-3 md:rounded-2xl md:px-3.5 md:py-2.5">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-slate-800">{productShortName}</p>
                  <ProductMarketplaceRating handle={rec.handle} showCount className="mt-1" />
                </div>
                <span className="text-sm font-bold text-slate-950">{productPrice}</span>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">30-day returns</span>
              </div>

              <div className="mt-2.5 rounded-xl border border-emerald-200 bg-emerald-50/80 px-3 py-2 text-center md:mt-3">
                <p className="text-xs font-semibold text-emerald-800">
                  Use {NEWSLETTER_DISCOUNT_CODE} for {NEWSLETTER_DISCOUNT_PCT}% off your order
                </p>
              </div>

              <div className="mt-2.5 md:mt-3.5">
                <Link
                  to={offerProductPath}
                  onClick={handleCTAClick}
                  className="inline-flex min-h-11 w-full min-w-0 items-center justify-center gap-1.5 rounded-full bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                >
                  See the {isMain ? "FlexiKnee" : productCtaName} and save {NEWSLETTER_DISCOUNT_PCT}%
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
        </div>
    </div>
  );
};
