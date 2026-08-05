import { useState, useEffect, useCallback, useRef } from "react";
import { X, ArrowRight, CheckCircle2, Clock3, ListChecks, Sparkles } from "lucide-react";
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
const CROSS_ARTICLE_KEY = "flexiknee_article_cta_cross_article_session";
const CTA_VERSION = "article-slide-in-v3";
const MOBILE_PRODUCT_SCROLL = 55;
const DESKTOP_PRODUCT_SCROLL = 50;
const QUIZ_SCROLL = 78;
const QUIZ_DELAY_AFTER_DISMISS_MS = 20_000;
const QUIZ_MIN_GAP_AFTER_DISMISS_MS = 1_500;
const CROSS_ARTICLE_QUIZ_SCROLL = 50;

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
      hook: "Get a knee plan built around the movement that bothers you.",
      support: "Connect your training triggers with matched guides and a practical seven-day starting routine.",
    };
  }

  if (value.includes("stairs") || value.includes("walk") || value.includes("standing")) {
    return {
      hook: "Turn your walking or stair pattern into a clearer knee plan.",
      support: "Use what you notice during daily movement to find a more relevant place to begin.",
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
      hook: "Get a routine built around when stiffness shows up.",
      support: "Match the timing of your symptoms with useful guides and a seven-day comfort routine.",
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
      hook: "Compare comfort options for the knee pattern you actually have.",
      support: "See a matched product category and useful guides before deciding what fits your routine.",
    };
  }

  if (
    value.includes("click") ||
    value.includes("sharp") ||
    value.includes("swelling") ||
    value.includes("burning")
  ) {
    return {
      hook: "Turn the symptoms you noticed into clearer next steps.",
      support: "Organize the details of your pattern and get a more relevant set of guides and starting points.",
    };
  }

  return {
    hook: "Get a practical knee plan built around your answers.",
    support: "Move from general reading to a matched starting point in four quick questions.",
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
  const [crossArticleQuiz, setCrossArticleQuiz] = useState(false);
  const [quizScrollGapReady, setQuizScrollGapReady] = useState(false);
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
    setCrossArticleQuiz(false);
    setQuizScrollGapReady(false);
    setQuizDelayReady(false);

    const rawSession = window.sessionStorage.getItem(STORAGE_KEY);
    const savedSession = readProductPopupSession();
    const quizPopupSeen = window.sessionStorage.getItem(STAGE2_KEY) === "true";
    const crossArticleQuizSeen =
      window.sessionStorage.getItem(CROSS_ARTICLE_KEY) === "true";

    if (rawSession === "true") {
      setStage1Done(true);
      setStage2Done(true);
      setStage1DismissedAt(null);
      setStorageReady(true);
      return;
    }

    if (!savedSession) {
      setStage1Done(false);
      setStage2Done(quizPopupSeen);
      setStage1DismissedAt(null);
      setStorageReady(true);
      return;
    }

    if (savedSession.slug !== slug) {
      const canShowCrossArticleQuiz =
        savedSession.outcome === "dismissed" && !crossArticleQuizSeen;
      setStage1Done(true);
      setStage2Done(!canShowCrossArticleQuiz);
      setStage1DismissedAt(null);
      setCrossArticleQuiz(canShowCrossArticleQuiz);
      setStorageReady(true);
      return;
    }

    if (savedSession.outcome !== "dismissed") {
      setStage1Done(true);
      setStage2Done(true);
      setStage1DismissedAt(null);
      setStorageReady(true);
      return;
    }

    setStage1Done(true);
    setStage2Done(quizPopupSeen);
    setStage1DismissedAt(savedSession.dismissedAt || Date.now());
    setStorageReady(true);
  }, [slug]);

  useEffect(() => {
    if (crossArticleQuiz || !stage1DismissedAt || stage2Done) return;
    const elapsed = Date.now() - stage1DismissedAt;
    const remainingForScroll = Math.max(
      0,
      QUIZ_MIN_GAP_AFTER_DISMISS_MS - elapsed,
    );
    const remainingForTimer = Math.max(
      0,
      QUIZ_DELAY_AFTER_DISMISS_MS - elapsed,
    );
    const scrollTimer = window.setTimeout(
      () => setQuizScrollGapReady(true),
      remainingForScroll,
    );
    const delayTimer = window.setTimeout(
      () => setQuizDelayReady(true),
      remainingForTimer,
    );
    return () => {
      window.clearTimeout(scrollTimer);
      window.clearTimeout(delayTimer);
    };
  }, [crossArticleQuiz, stage1DismissedAt, stage2Done]);

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

    const sameArticleQuizReady =
      !crossArticleQuiz &&
      stage1DismissedAt !== null &&
      ((quizScrollGapReady && scrollPercent >= QUIZ_SCROLL) || quizDelayReady);
    const crossArticleQuizReady =
      crossArticleQuiz && scrollPercent >= CROSS_ARTICLE_QUIZ_SCROLL;

    if (
      stage1Done &&
      !stage2Done &&
      !stage2ImpressionSent.current &&
      !isVisible &&
      (sameArticleQuizReady || crossArticleQuizReady)
    ) {
      stage2ImpressionSent.current = true;
      setStage(2);
      setIsVisible(true);
      if (crossArticleQuiz) {
        window.sessionStorage.setItem(CROSS_ARTICLE_KEY, "true");
      }
      trackEvent("article_quiz_popup_impression", {
        ...getEventContext(scrollPercent),
        stage: "quiz",
        opportunity: crossArticleQuiz ? "cross_article" : "same_article",
        quiz_trigger: crossArticleQuiz
          ? "cross_article_scroll"
          : scrollPercent >= QUIZ_SCROLL
            ? "same_article_scroll"
            : "dismiss_timer",
      });
    }
  }, [
    getEventContext,
    crossArticleQuiz,
    isVisible,
    quizDelayReady,
    quizScrollGapReady,
    rec.handle,
    rec.title,
    slug,
    stage1DismissedAt,
    stage1Done,
    stage2Done,
    storageReady,
  ]);

  useEffect(() => {
    if (!storageReady) return;
    if (stage1Done && stage2Done) return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      document.removeEventListener("visibilitychange", handleScroll);
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
      setQuizScrollGapReady(false);
      setQuizDelayReady(false);
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
      if (crossArticleQuiz) {
        window.sessionStorage.setItem(CROSS_ARTICLE_KEY, "true");
      }
      trackEvent("article_quiz_popup_dismissed", {
        ...getEventContext(scrollPercent),
        stage: "quiz",
        opportunity: crossArticleQuiz ? "cross_article" : "same_article",
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
    window.sessionStorage.setItem(CROSS_ARTICLE_KEY, "true");
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
        opportunity:
          placement === "quiz_popup"
            ? crossArticleQuiz
              ? "cross_article"
              : "same_article"
            : "product_popup",
      },
    );
    setStage1Done(true);
    setStage2Done(true);
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ slug, outcome: "quiz" } satisfies ProductPopupSession),
    );
    window.sessionStorage.setItem(STAGE2_KEY, "true");
    window.sessionStorage.setItem(CROSS_ARTICLE_KEY, "true");
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
  const activeQuizContent = crossArticleQuiz
    ? {
        hook: "Still comparing what fits your knee?",
        support:
          "You have explored more than one guide. Four quick answers can narrow the options and give you a more useful next step.",
      }
    : quizContent;

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
                <ListChecks className="h-3.5 w-3.5" /> Free 60-second knee quiz
              </div>
              <p className="mt-3 text-base font-bold leading-snug text-slate-950">
                {activeQuizContent.hook}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                {activeQuizContent.support}
              </p>

              <div className="mt-3 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-emerald-50/70 p-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                  Your free result includes
                </p>
                <div className="mt-2 grid grid-cols-3 gap-1.5 text-[10px] font-semibold leading-tight text-slate-700">
                  <span className="flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5 shrink-0 text-blue-600" /> 4 quick answers
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" /> 3 matched guides
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" /> 7-day plan
                  </span>
                </div>
              </div>

              <Link
                to="/knee-quiz"
                state={{ sourceArticle: slug, sourceTitle: title }}
                onClick={() => handleQuizClick("quiz_popup")}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
              >
                Get my free 7-day plan
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-2 text-center text-[10px] font-medium text-slate-500">
                See your result instantly. Email is optional.
              </p>
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

              <div className="mt-3.5 grid grid-cols-1 items-center gap-2 min-[380px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
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
                  className="group inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-blue-300 bg-gradient-to-r from-blue-50 via-white to-cyan-50 px-3 py-2 text-blue-900 shadow-[0_10px_24px_-18px_rgba(37,99,235,0.9)] transition hover:-translate-y-0.5 hover:border-blue-500 hover:shadow-[0_14px_28px_-16px_rgba(37,99,235,0.75)]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm transition group-hover:bg-blue-700">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <span className="text-left leading-tight">
                    <span className="block text-xs font-extrabold text-slate-950">
                      Knee Quiz
                    </span>
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.08em] text-blue-600">
                      Free · 60 sec
                    </span>
                  </span>
                </Link>
              </div>
            </>
          )}
        </div>
    </div>
  );
};
