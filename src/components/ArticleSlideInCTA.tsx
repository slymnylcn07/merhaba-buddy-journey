import { useState, useEffect, useCallback, useRef } from "react";
import { X, ArrowRight, CheckCircle2, Clock3, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { trackEvent } from "@/hooks/use-google-analytics";
import { pickProductForSlug, PRODUCT_RECS } from "@/lib/article-product-map";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { getProductPath, getPublicProductHandle } from "@/lib/product-config";
import { ProductMarketplaceRating } from "@/components/ProductMarketplaceRating";

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

const STORAGE_KEY = "flexiknee_article_cta_session";
const STAGE2_KEY = "flexiknee_article_cta_stage2_session";
const CTA_VERSION = "article-slide-in-v2";
const MOBILE_PRODUCT_SCROLL = 55;
const DESKTOP_PRODUCT_SCROLL = 50;
const QUIZ_SCROLL = 82;
const QUIZ_DELAY_AFTER_DISMISS_MS = 25_000;
const QUIZ_EXTRA_SCROLL = 20;

interface ProductPopupSession {
  slug: string;
  outcome: "dismissed" | "product" | "quiz";
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

function readProductPopupSession(): ProductPopupSession | null {
  const rawValue = window.sessionStorage.getItem(STORAGE_KEY);
  if (!rawValue || rawValue === "true") return null;
  try {
    return JSON.parse(rawValue) as ProductPopupSession;
  } catch {
    return null;
  }
}

function getQuizPopupContent(slug: string): { hook: string; support: string } {
  const value = slug.toLowerCase();

  if (
    value.includes("running") ||
    value.includes("exercise") ||
    value.includes("workout") ||
    value.includes("squat") ||
    value.includes("pilates")
  ) {
    return {
      hook: "Turn what you noticed during activity into a practical next step.",
      support: "Answer four quick questions to match your pattern with useful guides, a product category and a seven-day starter plan.",
    };
  }

  if (value.includes("stairs") || value.includes("walk") || value.includes("standing")) {
    return {
      hook: "Which everyday movements affect your knee most?",
      support: "The free quiz turns your walking, stair and daily-movement pattern into a clearer place to begin.",
    };
  }

  if (
    value.includes("night") ||
    value.includes("sleep") ||
    value.includes("morning") ||
    value.includes("sitting") ||
    value.includes("stiff")
  ) {
    return {
      hook: "Build a routine around when your knee bothers you.",
      support: "Four quick questions can match your timing and stiffness pattern with a practical seven-day starting routine.",
    };
  }

  if (
    value.includes("heat") ||
    value.includes("ice") ||
    value.includes("therapy") ||
    value.includes("massager") ||
    value.includes("brace")
  ) {
    return {
      hook: "Which comfort approach fits your current pattern?",
      support: "Compare a matched product category and useful guides before deciding what belongs in your routine.",
    };
  }

  if (
    value.includes("click") ||
    value.includes("sharp") ||
    value.includes("swelling") ||
    value.includes("burning")
  ) {
    return {
      hook: "Your knee pattern is more than one symptom.",
      support: "Use four quick questions to organize what you noticed and get a more relevant set of guides and next steps.",
    };
  }

  return {
    hook: "Turn this guide into a routine that fits you.",
    support: "Get a matched product category, three useful guides and a practical seven-day starter plan in four questions.",
  };
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

export const ArticleSlideInCTA = ({ slug, title }: ArticleSlideInCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [stage, setStage] = useState<1 | 2>(1);
  const [stage1Done, setStage1Done] = useState(false);
  const [stage2Done, setStage2Done] = useState(false);
  const [stage1DismissedAt, setStage1DismissedAt] = useState<number | null>(null);
  const [stage1DismissedScroll, setStage1DismissedScroll] = useState<number | null>(null);
  const [quizDelayReady, setQuizDelayReady] = useState(false);
  const [storageReady, setStorageReady] = useState(false);
  const stage1ImpressionSent = useRef(false);
  const stage2ImpressionSent = useRef(false);
  const pageStartedAt = useRef(Date.now());

  const { hook, support } = getContextualContent(slug);
  const quizContent = getQuizPopupContent(slug);
  const rec = pickProductForSlug(slug);
  const [liveImage, setLiveImage] = useState<string | null>(null);
  const [livePrice, setLivePrice] = useState<string | null>(null);

  useEffect(() => {
    setStorageReady(false);
    pageStartedAt.current = Date.now();
    stage1ImpressionSent.current = false;
    stage2ImpressionSent.current = false;
    setIsVisible(false);
    setStage(1);
    setQuizDelayReady(false);

    const rawSession = window.sessionStorage.getItem(STORAGE_KEY);
    const savedSession = readProductPopupSession();
    const quizPopupSeen = window.sessionStorage.getItem(STAGE2_KEY) === "true";

    if (rawSession === "true") {
      setStage1Done(true);
      setStage2Done(true);
      setStage1DismissedAt(null);
      setStage1DismissedScroll(null);
      setStorageReady(true);
      return;
    }

    if (!savedSession) {
      setStage1Done(false);
      setStage2Done(quizPopupSeen);
      setStage1DismissedAt(null);
      setStage1DismissedScroll(null);
      setStorageReady(true);
      return;
    }

    if (savedSession.slug !== slug || savedSession.outcome !== "dismissed") {
      setStage1Done(true);
      setStage2Done(true);
      setStage1DismissedAt(null);
      setStage1DismissedScroll(null);
      setStorageReady(true);
      return;
    }

    setStage1Done(true);
    setStage2Done(quizPopupSeen);
    setStage1DismissedAt(savedSession.dismissedAt || Date.now());
    setStage1DismissedScroll(savedSession.dismissedScroll ?? 0);
    setStorageReady(true);
  }, [slug]);

  useEffect(() => {
    if (!stage1DismissedAt || stage2Done) return;
    const remaining = Math.max(
      0,
      QUIZ_DELAY_AFTER_DISMISS_MS - (Date.now() - stage1DismissedAt),
    );
    const timer = window.setTimeout(() => setQuizDelayReady(true), remaining);
    return () => window.clearTimeout(timer);
  }, [stage1DismissedAt, stage2Done]);

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
    if (!storageReady) return;
    const scrollPercent = getScrollPercent();
    const productThreshold =
      getDeviceType() === "mobile" ? MOBILE_PRODUCT_SCROLL : DESKTOP_PRODUCT_SCROLL;

    if (
      !stage1Done &&
      !stage1ImpressionSent.current &&
      scrollPercent >= productThreshold
    ) {
      stage1ImpressionSent.current = true;
      setStage(1);
      setIsVisible(true);
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
      return;
    }

    const enoughScrollAfterDismiss =
      stage1DismissedScroll !== null &&
      scrollPercent >= stage1DismissedScroll + QUIZ_EXTRA_SCROLL;

    if (
      stage1Done &&
      stage1DismissedAt !== null &&
      !stage2Done &&
      !stage2ImpressionSent.current &&
      !isVisible &&
      quizDelayReady &&
      scrollPercent >= QUIZ_SCROLL &&
      enoughScrollAfterDismiss
    ) {
      stage2ImpressionSent.current = true;
      setStage(2);
      setIsVisible(true);
      trackEvent("article_quiz_popup_impression", {
        ...getEventContext(scrollPercent),
        stage: "quiz",
      });
    }
  }, [
    getEventContext,
    isVisible,
    quizDelayReady,
    rec.handle,
    rec.title,
    slug,
    stage1DismissedAt,
    stage1DismissedScroll,
    stage1Done,
    stage2Done,
    storageReady,
  ]);

  useEffect(() => {
    if (!storageReady) return;
    if (stage1Done && stage2Done) return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll, stage1Done, stage2Done, storageReady]);

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
          try {
            setLivePrice(
              new Intl.NumberFormat("en", {
                style: "currency",
                currency: currencyCode,
                minimumFractionDigits: 2,
              }).format(numericAmount)
            );
          } catch {
            setLivePrice(`${currencyCode} ${numericAmount.toFixed(2)}`);
          }
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
    if (stage === 1) {
      const dismissedAt = Date.now();
      setStage1Done(true);
      setStage1DismissedAt(dismissedAt);
      setStage1DismissedScroll(scrollPercent);
      window.sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          slug,
          outcome: "dismissed",
          dismissedAt,
          dismissedScroll: scrollPercent,
        } satisfies ProductPopupSession),
      );
      trackEvent("article_cta_dismissed", {
        ...getEventContext(scrollPercent),
        stage: "product",
      });
    } else {
      setStage2Done(true);
      window.sessionStorage.setItem(STAGE2_KEY, "true");
      trackEvent("article_quiz_popup_dismissed", {
        ...getEventContext(scrollPercent),
        stage: "quiz",
      });
    }
  };

  const handleCTAClick = () => {
    const scrollPercent = getScrollPercent();
    trackEvent("article_cta_clicked", {
      ...getEventContext(scrollPercent),
      stage: "product",
    });
    trackEvent("select_promotion", {
      promotion_id: `article-product-${slug}`,
      promotion_name: "Article product slide-in",
      creative_slot: "article_slide_in",
      items: [{ item_id: rec.handle, item_name: rec.title }],
    });
    setStage1Done(true);
    setStage2Done(true);
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ slug, outcome: "product" } satisfies ProductPopupSession),
    );
    window.sessionStorage.setItem(STAGE2_KEY, "true");
  };

  const handleQuizClick = (placement: "product_popup" | "quiz_popup") => {
    const scrollPercent = getScrollPercent();
    trackEvent(
      placement === "product_popup"
        ? "article_cta_quiz_clicked"
        : "article_quiz_popup_clicked",
      {
        ...getEventContext(scrollPercent),
        stage: placement === "product_popup" ? "product" : "quiz",
      },
    );
    setStage1Done(true);
    setStage2Done(true);
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ slug, outcome: "quiz" } satisfies ProductPopupSession),
    );
    window.sessionStorage.setItem(STAGE2_KEY, "true");
  };

  if (stage1Done && stage2Done && !isVisible) return null;

  const isMain = rec.handle === PRODUCT_RECS.main.handle;
  const productShortName = rec.title.replace("FlexiKnee ", "");
  const productCtaName =
    rec.handle === PRODUCT_RECS.iceWrap.handle
      ? "ice pack wrap"
      : productShortName.split(" ").slice(-2).join(" ").toLowerCase();
  const productImage = liveImage || rec.fallbackImage;
  const productPrice = livePrice || rec.fallbackPrice;

  return (
    <div
      role="dialog"
      aria-label={stage === 1 ? "FlexiKnee product suggestion" : "Knee quiz suggestion"}
      className={`fixed z-40 transition-all duration-500 ease-out
        bottom-0 left-0 right-0
        md:bottom-6 md:left-auto md:right-6 md:w-[420px]
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}
      `}
    >
        <div className="relative overflow-hidden border border-slate-200 bg-white px-5 pb-5 pt-4 shadow-[0_-10px_40px_rgba(15,23,42,0.16)] md:rounded-3xl md:shadow-[0_24px_70px_-20px_rgba(15,23,42,0.35)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-emerald-400" />

          <button
            onClick={handleDismiss}
            className="absolute right-2.5 top-2.5 inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          {stage === 2 ? (
            <div className="pr-7">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-blue-700">
                <Sparkles className="h-3.5 w-3.5" /> Free 60-second quiz
              </div>
              <p className="mt-3 text-base font-bold leading-snug text-slate-950">
                {quizContent.hook}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                {quizContent.support}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                  <Clock3 className="h-3.5 w-3.5 text-blue-600" /> 4 questions
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Instant result
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                  Email optional
                </span>
              </div>

              <Link
                to="/knee-quiz"
                state={{ sourceArticle: slug, sourceTitle: title }}
                onClick={() => handleQuizClick("quiz_popup")}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
              >
                Build my 7-day plan
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-start gap-3 pr-7">
                {productImage ? (
                  <img
                    src={productImage}
                    alt={rec.title}
                    onError={(event) => {
                      const image = event.currentTarget;
                      const fallbackUrl = new URL(rec.fallbackImage, window.location.origin).href;
                      if (image.src !== fallbackUrl) image.src = rec.fallbackImage;
                    }}
                    className="h-14 w-14 flex-shrink-0 rounded-2xl border border-slate-100 bg-slate-50 object-cover"
                  />
                ) : (
                  <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-50">
                    <Sparkles className="h-6 w-6 text-blue-600" />
                  </span>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-bold leading-snug text-slate-950">{hook}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{support}</p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-2xl bg-slate-50 px-3.5 py-2.5">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-slate-800">{productShortName}</p>
                  <ProductMarketplaceRating handle={rec.handle} showCount className="mt-1" />
                </div>
                <span className="text-sm font-bold text-slate-950">{productPrice}</span>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">30-day returns</span>
              </div>

              <div className="mt-3.5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
                <Link
                  to={getProductPath(rec.handle)}
                  onClick={handleCTAClick}
                  className="inline-flex min-h-11 min-w-0 items-center justify-center gap-1.5 rounded-full bg-slate-950 px-4 py-3 text-xs font-bold text-white transition hover:bg-slate-800"
                >
                  See the {isMain ? "FlexiKnee" : productCtaName}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/knee-quiz"
                  state={{ sourceArticle: slug, sourceTitle: title }}
                  onClick={() => handleQuizClick("product_popup")}
                  className="inline-flex min-h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-blue-200 bg-blue-50 px-3.5 py-3 text-xs font-bold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
                >
                  <Sparkles className="h-3.5 w-3.5" /> Knee quiz
                </Link>
              </div>
            </>
          )}
        </div>
    </div>
  );
};
