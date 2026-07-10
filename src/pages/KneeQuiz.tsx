import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Mail,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  PRIMARY_PRODUCT_HANDLE,
  PRIMARY_PRODUCT_PATH,
} from "@/lib/product-config";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { getProductProfile, ProductProfile } from "@/data/product-profiles";
import { trackEvent } from "@/hooks/use-google-analytics";

type OptionKey = string;
type ProductKey = ProductProfile["key"] | "smart-knee-massager";

interface QuizQuestion {
  id: string;
  question: string;
  options: { key: OptionKey; label: string }[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: "when",
    question: "When do your knees bother you most?",
    options: [
      { key: "activity", label: "During or after exercise and workouts" },
      { key: "daily", label: "Everyday moments — stairs, kneeling or walking" },
      {
        key: "rest",
        label: "After sitting, resting or first thing in the morning",
      },
      {
        key: "travel",
        label: "During or after travel, long drives or desk days",
      },
    ],
  },
  {
    id: "feel",
    question: "How would you describe the main pattern?",
    options: [
      { key: "stiff", label: "Stiffness or tightness" },
      { key: "ache", label: "A dull ache or post-activity soreness" },
      { key: "sharp", label: "Sharp or sudden discomfort" },
      { key: "sounds", label: "Clicking, popping or crunching sounds" },
    ],
  },
  {
    id: "tried",
    question: "What have you already tried consistently?",
    options: [
      { key: "nothing", label: "Nothing consistent yet" },
      { key: "heat_ice", label: "Heat packs or ice" },
      { key: "exercise", label: "Stretching or strengthening exercises" },
      { key: "devices", label: "Braces, sleeves or massage devices" },
    ],
  },
  {
    id: "goal",
    question: "What matters most to you right now?",
    options: [
      { key: "relief", label: "A simple day-to-day comfort routine" },
      {
        key: "active",
        label: "Staying active and recovering more consistently",
      },
      { key: "sleep", label: "A calmer evening and morning routine" },
      {
        key: "understand",
        label: "Understanding the pattern before buying anything",
      },
    ],
  },
];

interface GuideRec {
  slug: string;
  title: string;
  reason: string;
}

interface PlanDay {
  day: string;
  title: string;
  action: string;
}

interface QuizResult {
  resultKey: string;
  headline: string;
  summary: string;
  productKey: ProductKey;
  productReason: string;
  guides: GuideRec[];
  plan: PlanDay[];
}

const BASE_PLAN: PlanDay[] = [
  {
    day: "Day 1",
    title: "Notice the pattern",
    action:
      "Write down when the discomfort starts, what happened beforehand and how long it lasts.",
  },
  {
    day: "Day 2",
    title: "Add easy movement",
    action:
      "Use a short, comfortable walk or gentle range-of-motion session rather than complete inactivity.",
  },
  {
    day: "Day 3",
    title: "Review footwear and setup",
    action:
      "Check shoe wear, desk position or the activity setup most connected to your result.",
  },
  {
    day: "Day 4",
    title: "Test one comfort tool",
    action:
      "Try one short warmth, compression or recovery session and note how it feels afterward.",
  },
  {
    day: "Day 5",
    title: "Reduce the biggest load spike",
    action:
      "Shorten, split or modify the activity that creates the clearest next-day response.",
  },
  {
    day: "Day 6",
    title: "Repeat what helped",
    action:
      "Repeat the easiest useful habit instead of adding several new things at once.",
  },
  {
    day: "Day 7",
    title: "Review and adjust",
    action:
      "Compare the week, keep the useful habit and seek professional advice for persistent warning signs.",
  },
];

function buildRecommendations(answers: Record<string, OptionKey>): QuizResult {
  const when = answers.when;
  const feel = answers.feel;
  const tried = answers.tried;
  const goal = answers.goal;
  const guides: GuideRec[] = [];

  if (when === "activity") {
    guides.push(
      {
        slug: "knee-pain-after-exercise-but-not-during",
        title: "Knee Pain After Exercise But Not During",
        reason: "Explains the delayed post-workout pattern",
      },
      {
        slug: "knee-recovery-exercises-after-workout",
        title: "Knee Recovery Exercises After Workouts",
        reason: "A practical recovery sequence",
      },
    );
  } else if (when === "daily") {
    guides.push(
      {
        slug: "knee-pain-going-down-stairs",
        title: "Knee Pain Going Down Stairs",
        reason: "Covers a demanding everyday movement",
      },
      {
        slug: "daily-knee-care-routine",
        title: "Daily Knee Care Routine",
        reason: "Simple habits that are easier to repeat",
      },
    );
  } else if (when === "rest") {
    guides.push(
      {
        slug: "knee-pain-getting-up-after-sitting",
        title: "Knee Pain When Getting Up After Sitting",
        reason: "Matches the first-movement pattern",
      },
      {
        slug: "morning-knee-stiffness-after-40",
        title: "Morning Knee Stiffness",
        reason: "Explains why knees can feel rusty after rest",
      },
    );
  } else {
    guides.push(
      {
        slug: "knee-pain-after-flights",
        title: "Knee Pain After Flights",
        reason: "Travel, sitting time and movement breaks",
      },
      {
        slug: "knee-pain-after-car-rides",
        title: "Knee Pain After Long Car Rides",
        reason: "A better routine for long drives",
      },
    );
  }

  if (feel === "sharp") {
    guides.push({
      slug: "sharp-knee-pain-guide",
      title: "Sharp Knee Pain Guide",
      reason: "Helps separate common patterns from warning signs",
    });
  } else if (feel === "sounds") {
    guides.push({
      slug: "knee-clicking-when-walking",
      title: "Knee Clicking When Walking",
      reason: "What joint sounds can and cannot tell you",
    });
  } else if (feel === "stiff") {
    guides.push({
      slug: "knee-tightness-without-pain",
      title: "Knee Tightness Without Pain",
      reason: "A closer look at stiffness and tightness",
    });
  } else {
    guides.push({
      slug: "heat-vs-ice-for-knees",
      title: "Heat vs Ice for Knees",
      reason: "Choose a comfort tool by situation",
    });
  }

  let resultKey = "daily-consistency";
  let headline = "Your best starting point is a small routine you can repeat.";
  let summary =
    "Your answers point toward a consistent movement-and-comfort routine rather than an intense one-off session. Start with one practical adjustment, track the response and build from there.";
  let productKey: ProductKey = "smart-knee-massager";
  let productReason =
    "The premium all-in-one option for a repeatable warmth and massage-style routine at home.";

  if (when === "travel") {
    resultKey = "travel-lower-leg-recovery";
    headline =
      "Your routine should focus on movement breaks and lower-leg recovery.";
    summary =
      "Long sitting periods can leave the entire lower leg feeling heavy or stiff. Your plan prioritizes regular movement breaks, position changes and a simple recovery session after travel or desk time.";
    productKey = "calf-massager";
    productReason =
      "A focused choice for calf and lower-leg recovery after travel, desk days or prolonged sitting.";
  } else if (
    when === "activity" &&
    (goal === "active" || tried === "exercise")
  ) {
    resultKey = "active-foot-to-knee-support";
    headline = "Your next improvement may begin below the knee.";
    summary =
      "Because your pattern is connected to active days, it is worth reviewing footwear, load progression and post-activity recovery together. Small changes at the foot can alter what reaches the knee over thousands of steps.";
    productKey = "insoles";
    productReason =
      "Sport orthopedic insoles are the best product match for walking, training and foot-to-knee support.";
  } else if (when === "daily" && goal !== "sleep") {
    resultKey = "daily-movement-support";
    headline = "Your routine needs support that moves with you.";
    summary =
      "Your answers point toward everyday movement rather than a single recovery window. Prioritize fit, gradual strength work and a support option that is easy to wear during normal activities.";
    productKey = "compression-sleeve";
    productReason =
      "A lightweight compression sleeve fits walking, work and movement-focused routines without electronics.";
  } else if (tried === "heat_ice" && goal === "relief") {
    resultKey = "simple-warmth-routine";
    headline =
      "Keep the routine simple: controlled warmth and gentle movement.";
    summary =
      "You have already experimented with temperature-based comfort. The next step is making the routine more consistent, using comfortable heat settings and pairing warmth with easy movement rather than relying on heat alone.";
    productKey = "heated-wrap";
    productReason =
      "A straightforward heated wrap is the focused option when basic warmth is the main feature you want.";
  } else if (goal === "understand") {
    resultKey = "learn-before-buying";
    headline =
      "Your best first step is understanding the pattern, not buying immediately.";
    summary =
      "Start with the matched guides and the seven-day observation plan. A product can support a routine, but your answers suggest that clarity and pattern tracking should come first.";
    productKey = "generic";
    productReason =
      "Review the guides first, then compare the full FlexiKnee system once the pattern is clearer.";
  } else if (goal === "sleep" || when === "rest") {
    resultKey = "evening-warmth-routine";
    headline = "Your evening routine is the best place to begin.";
    summary =
      "Your answers point toward stiffness after rest or discomfort around the end of the day. Build a short evening routine around gentle movement, comfortable warmth and a consistent session length.";
    productKey = "smart-knee-massager";
    productReason =
      "The Smart Heated Knee Massager offers the most complete at-home option for an evening knee routine.";
  }

  const plan = BASE_PLAN.map((item) => ({ ...item }));
  if (resultKey === "travel-lower-leg-recovery") {
    plan[2] = {
      day: "Day 3",
      title: "Plan movement breaks",
      action:
        "Set a reminder to stand, walk or move the ankles regularly during long sitting periods.",
    };
  } else if (resultKey === "active-foot-to-knee-support") {
    plan[2] = {
      day: "Day 3",
      title: "Check shoes and insoles",
      action:
        "Inspect sole wear, toe space and whether the shoe still feels stable during walking or training.",
    };
  } else if (resultKey === "daily-movement-support") {
    plan[3] = {
      day: "Day 4",
      title: "Test support during movement",
      action:
        "Use the correctly sized sleeve for a short daily activity and check comfort, skin and circulation afterward.",
    };
  } else if (
    resultKey === "evening-warmth-routine" ||
    resultKey === "simple-warmth-routine"
  ) {
    plan[3] = {
      day: "Day 4",
      title: "Build a timed warmth session",
      action:
        "Use a comfortable low setting for a short, awake session and check the skin regularly.",
    };
  }

  return {
    resultKey,
    headline,
    summary,
    productKey,
    productReason,
    guides: guides.slice(0, 3),
    plan,
  };
}

function productMatchesKey(product: ShopifyProduct, productKey: ProductKey) {
  if (productKey === "smart-knee-massager")
    return product.node.handle === PRIMARY_PRODUCT_HANDLE;
  if (productKey === "generic") return false;
  return getProductProfile(product).key === productKey;
}

function formatMoney(amount?: string, currencyCode?: string) {
  const value = Number(amount || 0);
  const currency = currencyCode || "USD";
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${currency} ${value.toFixed(2)}`;
  }
}

export default function KneeQuiz() {
  const location = useLocation();
  const sourceState = (location.state || {}) as {
    sourceArticle?: string;
    sourceTitle?: string;
  };
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, OptionKey>>({});
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);

  useEffect(() => {
    let active = true;
    getProducts(30)
      .then((items) => active && setProducts(items))
      .catch(() => active && setProducts([]));
    return () => {
      active = false;
    };
  }, []);

  const isDone = step >= QUESTIONS.length;
  const result = useMemo(
    () => (isDone ? buildRecommendations(answers) : null),
    [isDone, answers],
  );
  const recommendedProduct = useMemo(
    () =>
      result
        ? products.find((product) =>
            productMatchesKey(product, result.productKey),
          ) || null
        : null,
    [products, result],
  );

  const productHref = recommendedProduct
    ? `/product/${recommendedProduct.node.handle}`
    : result?.productKey === "smart-knee-massager"
      ? PRIMARY_PRODUCT_PATH
      : "/shop";

  const handleAnswer = (questionId: string, key: OptionKey) => {
    setAnswers((previous) => ({ ...previous, [questionId]: key }));
    const next = step + 1;
    setStep(next);
    if (next >= QUESTIONS.length) {
      trackEvent("knee_quiz_completed", {
        category: "quiz",
        label: sourceState.sourceArticle || "direct",
      });
    }
  };

  const handleEmail = async (event: React.FormEvent) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!consent) {
      toast.error(
        "Please confirm that you want to receive the routine by email.",
      );
      return;
    }
    if (!result) return;

    setIsSending(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          consent,
          source: sourceState.sourceArticle ? "article-quiz" : "knee-quiz",
          quiz: {
            resultKey: result.resultKey,
            productKey: result.productKey,
            sourceArticle: sourceState.sourceArticle || "direct",
          },
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok)
        throw new Error(payload?.error || "Could not save your email.");

      setEmailSent(true);
      trackEvent("knee_quiz_email_captured", {
        category: "quiz",
        label: result.resultKey,
      });
      toast.success("Your routine request is saved.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not save your email. Please try again.",
      );
    } finally {
      setIsSending(false);
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers({});
    setEmail("");
    setConsent(false);
    setEmailSent(false);
  };

  const progress = Math.min(100, Math.round((step / QUESTIONS.length) * 100));
  const recommendedImage = recommendedProduct?.node.images.edges[0]?.node;
  const recommendedPrice = recommendedProduct?.node.priceRange.minVariantPrice;

  return (
    <>
      <Helmet>
        <title>Free Knee Comfort Quiz — Find Your Routine | FlexiKnee™</title>
        <meta
          name="description"
          content="Answer four practical questions and get a matched product category, useful guides and a seven-day knee comfort starter plan."
        />
        <link rel="canonical" href="https://flexi-knee.com/knee-quiz" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "FlexiKnee Knee Comfort Quiz",
            url: "https://flexi-knee.com/knee-quiz",
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-[radial-gradient(circle_at_85%_5%,rgba(56,189,248,0.16),transparent_25%),linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] text-slate-950">
        <Header />

        <main>
          <section className="py-12 md:py-18">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              {sourceState.sourceTitle && !isDone && (
                <p className="mb-5 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">
                  You came from <strong>{sourceState.sourceTitle}</strong>. The
                  quiz will use that as context for your saved routine.
                </p>
              )}

              {!isDone ? (
                <div className="rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-[0_35px_110px_-75px_rgba(15,23,42,0.65)] sm:p-9">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                    <Sparkles className="h-4 w-4" /> Knee routine finder
                  </p>
                  <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-slate-950 md:text-5xl">
                    Find your best starting point in 60 seconds.
                  </h1>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                    This is an educational product-and-guide matcher, not a
                    diagnosis. Pick the answer that best describes your usual
                    pattern.
                  </p>

                  <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs font-medium text-slate-500">
                    Question {step + 1} of {QUESTIONS.length}
                  </p>

                  <h2 className="mt-8 text-xl font-semibold text-slate-950 md:text-2xl">
                    {QUESTIONS[step].question}
                  </h2>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {QUESTIONS[step].options.map((option) => (
                      <button
                        key={option.key}
                        type="button"
                        onClick={() =>
                          handleAnswer(QUESTIONS[step].id, option.key)
                        }
                        className="group flex min-h-24 items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left text-base font-medium text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50/40 hover:shadow-md"
                      >
                        {option.label}
                        <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                result && (
                  <div className="space-y-8">
                    <section className="overflow-hidden rounded-[2.25rem] border border-blue-200 bg-[radial-gradient(circle_at_90%_0%,rgba(125,211,252,0.55),transparent_32%),linear-gradient(135deg,#eff6ff_0%,#eef2ff_55%,#ecfeff_100%)] p-7 shadow-[0_35px_110px_-70px_rgba(37,99,235,0.75)] md:p-10">
                      <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                        <CheckCircle2 className="h-5 w-5" /> Your result
                      </p>
                      <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.045em] text-slate-950 md:text-5xl">
                        {result.headline}
                      </h1>
                      <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700">
                        {result.summary}
                      </p>
                    </section>

                    <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                        <div className="flex min-h-64 items-center justify-center bg-slate-50 p-5">
                          {recommendedImage ? (
                            <img
                              src={recommendedImage.url}
                              alt={
                                recommendedImage.altText ||
                                recommendedProduct?.node.title
                              }
                              className="max-h-72 w-full object-contain"
                            />
                          ) : (
                            <Sparkles className="h-16 w-16 text-blue-200" />
                          )}
                        </div>
                        <div className="p-6">
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
                            Matched product category
                          </p>
                          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                            {recommendedProduct?.node.title ||
                              (result.productKey === "generic"
                                ? "Explore after reading your guides"
                                : "Your matched FlexiKnee product")}
                          </h2>
                          <p className="mt-3 text-sm leading-7 text-slate-600">
                            {result.productReason}
                          </p>
                          {recommendedPrice && (
                            <p className="mt-4 text-xl font-semibold text-slate-950">
                              {formatMoney(
                                recommendedPrice.amount,
                                recommendedPrice.currencyCode,
                              )}
                            </p>
                          )}
                          <Link
                            to={productHref}
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                          >
                            {result.productKey === "generic"
                              ? "Compare all products"
                              : "View matched product"}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>

                      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                          Start with these guides
                        </h2>
                        <div className="mt-5 grid gap-3">
                          {result.guides.map((guide) => (
                            <Link
                              key={guide.slug}
                              to={`/guides/${guide.slug}`}
                              className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
                            >
                              <span>
                                <span className="block text-base font-semibold text-slate-950">
                                  {guide.title}
                                </span>
                                <span className="mt-1 block text-sm text-slate-500">
                                  {guide.reason}
                                </span>
                              </span>
                              <ArrowRight className="h-5 w-5 shrink-0 text-blue-600 transition group-hover:translate-x-1" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </section>

                    <section className="rounded-[2rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-lg md:p-9">
                      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
                            Your seven-day starter plan
                          </p>
                          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                            One useful action each day.
                          </h2>
                        </div>
                        <p className="max-w-md text-sm leading-6 text-slate-300">
                          Keep it comfortable. Stop and seek appropriate care
                          for significant swelling, instability, injury or
                          worsening symptoms.
                        </p>
                      </div>
                      <div className="mt-8 grid gap-4 md:grid-cols-2">
                        {result.plan.map((item) => (
                          <div
                            key={item.day}
                            className="rounded-2xl border border-white/10 bg-white/5 p-5"
                          >
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-300">
                              {item.day}
                            </p>
                            <h3 className="mt-2 text-base font-semibold">
                              {item.title}
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-slate-300">
                              {item.action}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm md:p-9">
                      {emailSent ? (
                        <div className="flex gap-4">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                            <Check className="h-5 w-5" />
                          </span>
                          <div>
                            <h2 className="text-xl font-semibold text-slate-950">
                              Your routine request is saved.
                            </h2>
                            <p className="mt-2 text-sm leading-7 text-slate-600">
                              Your result and email preference have been saved.
                              The matching seven-day routine can now be
                              delivered through the FlexiKnee email workflow.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-start gap-4">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                              <Mail className="h-5 w-5" />
                            </span>
                            <div>
                              <h2 className="text-xl font-semibold text-slate-950">
                                Email me this result and starter plan
                              </h2>
                              <p className="mt-1 text-sm leading-6 text-slate-600">
                                We’ll save this result and use it to send the
                                version of the routine that matches your
                                recommendation.
                              </p>
                            </div>
                          </div>
                          <form onSubmit={handleEmail} className="mt-6">
                            <div className="flex flex-col gap-3 sm:flex-row">
                              <input
                                type="email"
                                value={email}
                                onChange={(event) =>
                                  setEmail(event.target.value)
                                }
                                placeholder="you@example.com"
                                autoComplete="email"
                                className="w-full rounded-full border border-slate-300 px-5 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                              />
                              <button
                                type="submit"
                                disabled={isSending}
                                className="shrink-0 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
                              >
                                {isSending ? "Saving..." : "Send my routine"}
                              </button>
                            </div>
                            <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                              <input
                                type="checkbox"
                                checked={consent}
                                onChange={(event) =>
                                  setConsent(event.target.checked)
                                }
                                className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span>
                                I agree to receive my quiz routine and
                                occasional FlexiKnee emails. I can unsubscribe
                                at any time.
                              </span>
                            </label>
                            <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                              <ShieldCheck className="h-4 w-4" /> Your consent
                              is stored securely, and you can unsubscribe at any
                              time.
                            </p>
                          </form>
                        </>
                      )}
                    </section>

                    <button
                      type="button"
                      onClick={restart}
                      className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
                    >
                      <RefreshCcw className="h-4 w-4" /> Retake the quiz
                    </button>
                  </div>
                )
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
