import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
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
  getProductPath,
} from "@/lib/product-config";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { getProductProfile, ProductProfile } from "@/data/product-profiles";
import { PRODUCT_RECS } from "@/lib/article-product-map";
import { trackEvent } from "@/hooks/use-google-analytics";
import { hasProductPriceRange } from "@/lib/shipping-policy";

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
      { key: "daily", label: "Everyday moments, stairs, kneeling or walking" },
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
      { key: "swollen", label: "Warmth or swelling after activity" },
      { key: "heavy", label: "Heaviness or tiredness in the lower leg" },
      { key: "sharp", label: "Sharp or sudden discomfort" },
      { key: "sounds", label: "Clicking, popping or crunching sounds" },
    ],
  },
  {
    id: "support",
    question: "Which kind of support would fit your routine best?",
    options: [
      {
        key: "smart_home",
        label: "A powered at-home heat and massage routine",
      },
      { key: "simple_warmth", label: "Simple, focused knee warmth" },
      { key: "cold", label: "A reusable cold wrap after activity" },
      {
        key: "wearable",
        label: "Wearable support while moving, working or travelling",
      },
      { key: "foot_support", label: "Support inside my shoes" },
      { key: "unsure", label: "I am not sure yet; help me learn first" },
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
  planHeading: string;
  planIntro: string;
}

const PRODUCT_REC_KEY: Partial<
  Record<Exclude<ProductKey, "generic">, keyof typeof PRODUCT_RECS>
> = {
  "smart-knee-massager": "main",
  "calf-massager": "calf",
  insoles: "insoles",
  "compression-sleeve": "sleeve",
  "heated-wrap": "wrap",
  "cold-wrap": "iceWrap",
  "compression-socks": "compressionSocks",
};

function addGuide(guides: GuideRec[], guide: GuideRec, sourceArticle?: string) {
  if (
    guide.slug !== sourceArticle &&
    !guides.some((current) => current.slug === guide.slug)
  ) {
    guides.push(guide);
  }
}

function buildGuides(
  when: OptionKey,
  feel: OptionKey,
  support: OptionKey,
  sourceArticle?: string,
) {
  const guides: GuideRec[] = [];

  const feelGuides: Record<string, GuideRec> = {
    sharp: {
      slug: "sharp-knee-pain-guide",
      title: "Sharp Knee Pain Guide",
      reason: "Check warning signs before testing a comfort product",
    },
    sounds: {
      slug: "knee-clicking-when-walking",
      title: "Knee Clicking When Walking",
      reason: "Separate painless sounds from sounds that need attention",
    },
    stiff: {
      slug: "knee-tightness-without-pain",
      title: "Knee Tightness Without Pain",
      reason: "A closer look at stiffness and first-movement patterns",
    },
    ache: {
      slug: "heat-vs-ice-for-knees",
      title: "Heat vs Ice for Knees",
      reason: "Choose a comfort tool by timing and situation",
    },
    swollen: {
      slug: "knee-swelling-after-exercise",
      title: "Knee Swelling After Exercise",
      reason: "Understand what swelling changes about the next step",
    },
    heavy: {
      slug: "heavy-feeling-in-knees",
      title: "Heavy-Feeling Knees",
      reason: "Explore heaviness, stiffness and lower-leg context",
    },
  };

  if (feelGuides[feel]) addGuide(guides, feelGuides[feel], sourceArticle);

  const whenGuides: Record<string, GuideRec> = {
    activity: {
      slug: "knee-pain-after-exercise",
      title: "Knee Pain After Exercise",
      reason: "Use timing and next-day response to adjust training load",
    },
    daily: {
      slug: "knee-pain-going-down-stairs",
      title: "Knee Pain Going Down Stairs",
      reason: "Break down one of the most demanding daily movements",
    },
    rest: {
      slug: "knee-pain-getting-up-after-sitting",
      title: "Knee Pain When Getting Up After Sitting",
      reason: "Match a first-movement or after-rest pattern",
    },
    travel: {
      slug: "knee-pain-after-flights",
      title: "Knee Pain After Flights",
      reason: "Plan sitting time, movement breaks and travel recovery",
    },
  };
  if (whenGuides[when]) addGuide(guides, whenGuides[when], sourceArticle);

  const supportGuides: Record<string, GuideRec> = {
    smart_home: {
      slug: "do-knee-massagers-work",
      title: "Do Knee Massagers Really Work?",
      reason: "Know what heat and massage-style devices can and cannot do",
    },
    simple_warmth: {
      slug: "heat-vs-ice-for-knees",
      title: "Heat vs Ice for Knees",
      reason: "Check when simple warmth fits the situation",
    },
    cold: {
      slug: "cold-therapy-machine-knee",
      title: "Cold Therapy for the Knee",
      reason: "Compare a reusable gel wrap with powered ice machines",
    },
    wearable: {
      slug:
        when === "travel"
          ? "varicose-veins-knee-pain"
          : "knee-brace-vs-compression-sleeve",
      title:
        when === "travel"
          ? "Varicose Veins and Knee Pain"
          : "Knee Brace vs Compression Sleeve",
      reason:
        when === "travel"
          ? "Review lower-leg symptoms before choosing compression"
          : "Choose the right level of wearable knee support",
    },
    foot_support: {
      slug: "best-insoles-for-knee-pain-2026",
      title: "Best Insoles for Knee Pain",
      reason: "Check shoe fit, cushioning and foot-to-knee load",
    },
    unsure: {
      slug: "daily-knee-care-routine",
      title: "Daily Knee Care Routine",
      reason: "Begin with a simple routine before comparing products",
    },
  };
  if (supportGuides[support])
    addGuide(guides, supportGuides[support], sourceArticle);

  const fallbacks: GuideRec[] = [
    {
      slug: "daily-knee-care-routine",
      title: "Daily Knee Care Routine",
      reason: "Turn useful observations into a repeatable routine",
    },
    {
      slug: "knee-recovery-exercises-after-workout",
      title: "Knee Recovery Exercises After Workouts",
      reason: "A gentle sequence for active-day recovery",
    },
    {
      slug: "morning-knee-stiffness-after-40",
      title: "Morning Knee Stiffness",
      reason: "Build a calmer first-movement routine",
    },
  ];
  fallbacks.forEach((guide) => addGuide(guides, guide, sourceArticle));
  return guides.slice(0, 3);
}

function chooseProduct(
  when: OptionKey,
  feel: OptionKey,
  support: OptionKey,
  goal: OptionKey,
): ProductKey {
  if (feel === "sharp" || goal === "understand") return "generic";
  if (feel === "swollen" && support === "simple_warmth") return "generic";

  if (support === "cold") return "cold-wrap";
  if (support === "foot_support") return "insoles";
  if (support === "simple_warmth") return "heated-wrap";
  if (support === "wearable")
    return when === "travel" || feel === "heavy"
      ? "compression-socks"
      : "compression-sleeve";
  if (support === "smart_home")
    return when === "travel" || feel === "heavy"
      ? "calf-massager"
      : "smart-knee-massager";

  if (feel === "swollen") return "cold-wrap";
  if (feel === "heavy" && when === "travel") return "compression-socks";
  return "generic";
}

const PRODUCT_RESULTS: Record<
  ProductKey,
  Pick<QuizResult, "resultKey" | "headline" | "summary" | "productReason">
> = {
  "smart-knee-massager": {
    resultKey: "evening-multimode-routine",
    headline: "A controlled at-home knee routine fits your answers best.",
    summary:
      "Your preference is a repeatable session rather than something worn all day. Test warmth and massage-style vibration one feature at a time, then keep only the settings that feel comfortable.",
    productReason:
      "The Smart Heated Knee Massager combines cordless warmth, red light and massage-style vibration for a structured at-home routine.",
  },
  "heated-wrap": {
    resultKey: "simple-warmth-routine",
    headline: "A simple, focused warmth routine matches your preference.",
    summary:
      "You chose a low-complexity comfort tool. A short, awake warmth session paired with easy movement gives you a clearer routine than changing several things at once.",
    productReason:
      "The USB Heated Knee Wrap is the focused choice when adjustable warmth is the main feature you want.",
  },
  "cold-wrap": {
    resultKey: "post-activity-cold-routine",
    headline: "A short post-activity cold routine matches your answers.",
    summary:
      "Your answers favor a reusable cooling option after activity. Keep sessions brief, protect the skin and judge the routine by comfort and the next-day response.",
    productReason:
      "The Reusable Knee Ice Pack Wrap holds a flexible gel pad around the knee without a powered pump or reservoir.",
  },
  "compression-sleeve": {
    resultKey: "daily-knee-support",
    headline: "Wearable knee support fits your daily movement pattern.",
    summary:
      "Your answers favor something that moves with you. Fit and gradual wear time matter more than choosing the tightest possible compression.",
    productReason:
      "The Compression Support Sleeve is the knee-focused wearable option for walking, work and training routines.",
  },
  insoles: {
    resultKey: "active-foot-to-knee-support",
    headline: "Your support routine may begin inside your shoes.",
    summary:
      "Footwear, fit and load progression can change how an active day feels from the ground up. Introduce an insole gradually and compare it in the same pair of shoes.",
    productReason:
      "Sport Orthopedic Insoles are the direct match for shoe-based cushioning, arch guidance and foot-to-knee support.",
  },
  "compression-socks": {
    resultKey: "travel-wearable-lower-leg-support",
    headline: "Wearable lower-leg support best matches your routine.",
    summary:
      "Your answers connect support with travel, standing or lower-leg heaviness. Correct sizing and regular movement breaks remain central to the routine.",
    productReason:
      "Everyday Compression Socks are the wearable lower-leg option for travel, standing and long active days when compression is appropriate for you.",
  },
  "calf-massager": {
    resultKey: "powered-lower-leg-recovery",
    headline: "A seated lower-leg recovery session matches your answers.",
    summary:
      "Your pattern points beyond the knee to the calf and lower leg. Begin with the gentlest setting after a movement break and change only one feature at a time.",
    productReason:
      "The Rechargeable Calf Recovery Massager is the powered option for seated lower-leg compression and warmth routines.",
  },
  generic: {
    resultKey: "general-consistency",
    headline: "A guide-first routine is the clearest next step.",
    summary:
      "Your answers do not support forcing one product match. Use the plan to clarify timing, triggers and response, then compare only the product category that fits the pattern you observe.",
    productReason:
      "Start with your matched reading and observation plan. You can compare products later without guessing today.",
  },
};

function buildPlan(
  when: OptionKey,
  feel: OptionKey,
  productKey: ProductKey,
  goal: OptionKey,
) {
  const feelDays: Record<string, Omit<PlanDay, "day">> = {
    stiff: {
      title: "Time the stiffness",
      action:
        "Note when stiffness begins and how many minutes of easy movement it takes to loosen.",
    },
    ache: {
      title: "Track the delayed response",
      action:
        "Record the activity, when the ache appeared and whether it changed later that day or the next morning.",
    },
    swollen: {
      title: "Check the swelling pattern",
      action:
        "Compare both knees after activity and note warmth, visible swelling and any loss of normal motion.",
    },
    heavy: {
      title: "Map the heavy feeling",
      action:
        "Note whether heaviness stays at the knee or extends into the calf, ankle or foot, and what relieves it.",
    },
    sharp: {
      title: "Stop repeating the trigger",
      action:
        "Write down the exact movement and location without repeatedly provoking a sharp response to test it.",
    },
    sounds: {
      title: "Separate sound from symptoms",
      action:
        "Notice whether clicking is painless or comes with swelling, catching, giving way or loss of motion.",
    },
  };

  const whenDays: Record<string, Omit<PlanDay, "day">> = {
    activity: {
      title: "Lower one training variable",
      action:
        "Reduce only duration, resistance, speed or range today, then compare the next-day response.",
    },
    daily: {
      title: "Modify one daily task",
      action:
        "Choose the hardest stair, kneeling or walking moment and make one practical change to pace or support.",
    },
    rest: {
      title: "Create a first-movement cue",
      action:
        "Before standing, use a brief comfortable bend-and-straighten sequence, then rise without rushing.",
    },
    travel: {
      title: "Schedule movement breaks",
      action:
        "Use regular standing, walking or ankle-movement breaks instead of waiting for stiffness or heaviness to build.",
    },
  };

  const productDays: Record<ProductKey, Omit<PlanDay, "day">> = {
    "smart-knee-massager": {
      title: "Test one powered feature",
      action:
        "Use a short, awake session on a comfortable setting. Try warmth or vibration first, not every feature at once.",
    },
    "heated-wrap": {
      title: "Set a simple warmth window",
      action:
        "Use comfortable low warmth for a short, awake session and check the skin before, during and after.",
    },
    "cold-wrap": {
      title: "Run a short cold trial",
      action:
        "Place fabric between skin and the chilled wrap, keep the session brief and stop if the skin becomes painful or numb.",
    },
    "compression-sleeve": {
      title: "Check sleeve fit",
      action:
        "Test the correct size during one short activity. It should feel supportive without numbness, discoloration or rolling edges.",
    },
    insoles: {
      title: "Start the insole break-in",
      action:
        "Try the insoles briefly in one roomy, familiar shoe and check heel position, toe space and pressure points.",
    },
    "compression-socks": {
      title: "Check lower-leg fit",
      action:
        "Try the correct size for a short period and remove it for pain, numbness, discoloration or a rolled tight band.",
    },
    "calf-massager": {
      title: "Begin with gentle compression",
      action:
        "After a short walk, test the lowest comfortable compression without heat and stop for pain, numbness or color change.",
    },
    generic: {
      title: "Read before choosing a tool",
      action:
        "Open the first matched guide and compare its warning signs and routine advice with the notes from Days 1 and 2.",
    },
  };

  const goalDays: Record<string, Omit<PlanDay, "day">> = {
    relief: {
      title: "Build a repeatable comfort window",
      action:
        "Choose one short time of day for the routine and rate comfort before and about an hour afterward.",
    },
    active: {
      title: "Repeat an easy active dose",
      action:
        "Choose a movement you tolerate well and finish while it still feels controlled rather than testing the limit.",
    },
    sleep: {
      title: "Create an evening sequence",
      action:
        "Pair a calm movement or comfort session with the same bedtime window and compare the following morning.",
    },
    understand: {
      title: "Compare patterns, not guesses",
      action:
        "Use your notes and matched guides to identify timing, location and warning signs before considering a product.",
    },
  };

  const followUpDays: Record<ProductKey, Omit<PlanDay, "day">> = {
    "smart-knee-massager": {
      title: "Keep only the useful setting",
      action:
        "Repeat the comfortable setting and leave out any feature that added no value or irritated the knee.",
    },
    "heated-wrap": {
      title: "Pair warmth with easy movement",
      action:
        "After warmth, try a few comfortable movements and note whether the knee starts moving more easily.",
    },
    "cold-wrap": {
      title: "Compare recovery days",
      action:
        "Compare a similar active day with your first cold trial, including skin response and how the knee feels the next morning.",
    },
    "compression-sleeve": {
      title: "Extend wear gradually",
      action:
        "If the short trial was comfortable, add a little wear time during the same type of activity and recheck the skin.",
    },
    insoles: {
      title: "Increase shoe time slowly",
      action:
        "Use the same shoes a little longer only if the first trial caused no rubbing, pressure or new foot discomfort.",
    },
    "compression-socks": {
      title: "Pair support with movement",
      action:
        "Use the socks only if the fit felt comfortable and keep regular movement breaks in the routine.",
    },
    "calf-massager": {
      title: "Change one setting",
      action:
        "If the first session felt comfortable, adjust either compression or warmth, not both, and compare the response.",
    },
    generic: {
      title: "Test one routine change",
      action:
        "Choose one low-risk adjustment from your guides and keep every other part of the day as consistent as practical.",
    },
  };

  const day6 =
    when === "travel"
      ? {
          title: "Rehearse the next long-sitting day",
          action:
            "Plan your seat setup, movement-break timing and post-travel routine before the next drive, flight or desk block.",
        }
      : when === "activity"
        ? {
            title: "Repeat the adjusted session",
            action:
              "Repeat the lower-load version once, keeping surface, shoes and pace as similar as possible for a fair comparison.",
          }
        : when === "rest"
          ? {
              title: "Compare two rest periods",
              action:
                "Use the same first-movement routine after two sitting periods and compare how the first few steps feel.",
            }
          : {
              title: "Use the routine in real life",
              action:
                "Repeat it during the daily task you identified, without adding a second new tool or exercise.",
            };

  return [
    { day: "Day 1", ...feelDays[feel] },
    { day: "Day 2", ...whenDays[when] },
    { day: "Day 3", ...productDays[productKey] },
    { day: "Day 4", ...goalDays[goal] },
    { day: "Day 5", ...followUpDays[productKey] },
    { day: "Day 6", ...day6 },
    {
      day: "Day 7",
      title: productKey === "generic" ? "Choose the next step" : "Keep, change or stop",
      action:
        feel === "sharp" || feel === "swollen"
          ? "Review the week. Arrange appropriate medical guidance if sharp pain, swelling, locking, giving way or reduced motion persists or worsens."
          : "Review the week, keep the habit that helped and get medical guidance for persistent, worsening or function-limiting symptoms.",
    },
  ];
}

function buildRecommendations(
  answers: Record<string, OptionKey>,
  sourceArticle?: string,
): QuizResult {
  const when = answers.when;
  const feel = answers.feel;
  const support = answers.support;
  const goal = answers.goal;
  const productKey = chooseProduct(
    when,
    feel,
    support,
    goal,
  );
  const productResult = { ...PRODUCT_RESULTS[productKey] };

  if (feel === "sharp") {
    productResult.resultKey = "clarify-sharp-pattern";
    productResult.headline = "Clarify the sharp pattern before choosing a product.";
    productResult.summary =
      "A sharp or sudden response should not be covered up with a guessed product match. Start with triggers and warning signs, avoid repeatedly testing the painful movement and arrange appropriate care if it persists or limits function.";
    productResult.productReason =
      "Your guide-first result is intentional. A product recommendation would be too speculative from this answer pattern.";
  } else if (goal === "understand") {
    productResult.resultKey = "learn-before-buying";
    productResult.headline = "Understand the pattern before buying anything.";
    productResult.summary =
      "You asked for clarity first. Use the matched guides and seven-day observation plan to identify timing, triggers and response before comparing a support product.";
    productResult.productReason =
      "No product is being forced into this result. Your first next step is the matched reading and observation plan.";
  } else if (feel === "swollen" && support === "simple_warmth") {
    productResult.resultKey = "general-consistency";
    productResult.headline = "Check the swelling pattern before using warmth.";
    productResult.summary =
      "Warmth is not the automatic match for a knee that feels warm or swollen after activity. Start with the swelling guide and observe motion, skin changes and the next-day response before choosing a comfort tool.";
    productResult.productReason =
      "This result stays guide-first because your symptom pattern and preferred tool do not form a confident match.";
  }

  return {
    ...productResult,
    productKey,
    guides: buildGuides(when, feel, support, sourceArticle),
    plan: buildPlan(when, feel, productKey, goal),
    planHeading:
      productKey === "generic"
        ? "Seven days to clarify your next step."
        : "Seven days to test the match carefully.",
    planIntro:
      feel === "sharp" || feel === "swollen"
        ? "Keep the week observational and comfortable. Do not use the plan to delay care for worsening or concerning symptoms."
        : "Change one variable at a time so you can tell what actually helps your routine.",
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
  const trackedResult = useRef("");

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
    () =>
      isDone
        ? buildRecommendations(answers, sourceState.sourceArticle)
        : null,
    [isDone, answers, sourceState.sourceArticle],
  );
  const displayProductKey: Exclude<ProductKey, "generic"> | null = result
    ? result.productKey === "generic"
      ? "smart-knee-massager"
      : result.productKey
    : null;

  useEffect(() => {
    if (!result || trackedResult.current === result.resultKey) return;
    trackedResult.current = result.resultKey;
    trackEvent("knee_quiz_completed", {
      category: "quiz",
      content_slug: sourceState.sourceArticle,
      placement: sourceState.sourceArticle ? "article_quiz" : "quiz_page",
      cta_variant: "knee-quiz-v2",
      interaction_type: "complete",
      result_type: result.resultKey,
      product_handle: displayProductKey || "guide-first",
    });
  }, [displayProductKey, result, sourceState.sourceArticle]);
  const recommendedProduct = useMemo(
    () =>
      displayProductKey
        ? products.find((product) =>
            productMatchesKey(product, displayProductKey),
          ) || null
        : null,
    [displayProductKey, products],
  );

  const fallbackProductRec = displayProductKey
    ? PRODUCT_RECS[PRODUCT_REC_KEY[displayProductKey] || "main"]
    : null;
  const productHref = recommendedProduct
    ? getProductPath(recommendedProduct.node.handle)
    : fallbackProductRec
      ? getProductPath(fallbackProductRec.handle)
      : result?.guides[0]
        ? `/guides/${result.guides[0].slug}`
        : "/guides";

  const handleAnswer = (questionId: string, key: OptionKey) => {
    setAnswers((previous) => ({ ...previous, [questionId]: key }));
    const next = step + 1;
    setStep(next);
  };

  const handleEmail = async (event: React.FormEvent) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
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
          marketingConsent: consent,
          emailRequested: true,
          source: sourceState.sourceArticle ? "article-quiz" : "knee-quiz",
          quiz: {
            resultKey: result.resultKey,
            productKey: result.productKey,
            sourceArticle: sourceState.sourceArticle || "direct",
            answers: {
              when: answers.when,
              feel: answers.feel,
              support: answers.support,
              goal: answers.goal,
            },
          },
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok)
        throw new Error(payload?.error || "Could not send your plan.");
      if (payload?.emailSent !== true)
        throw new Error(
          "Your request was saved, but the email could not be sent yet. Please try again shortly.",
        );

      setEmailSent(true);
      trackEvent("knee_quiz_email_captured", {
        category: "quiz",
        content_slug: sourceState.sourceArticle,
        placement: "quiz_result",
        cta_variant: "knee-quiz-v2",
        interaction_type: "email_submit",
        result_type: result.resultKey,
        product_handle: displayProductKey || "guide-first",
      });
      toast.success("Your personalized 7-day plan is on its way.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not send your plan. Please try again.",
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
  const recommendedHasPriceRange = recommendedProduct
    ? hasProductPriceRange(recommendedProduct.node.priceRange)
    : false;
  const productTitle =
    recommendedProduct?.node.title || fallbackProductRec?.title || null;
  const productImage = recommendedImage?.url || fallbackProductRec?.fallbackImage;
  const productReason =
    result?.productKey === "generic"
      ? "Your guides and seven-day plan still come first. When you are ready to compare one FlexiKnee option, the Smart Heated Knee Massager is our most complete at-home routine with adjustable warmth, red light and massage-style vibration."
      : result?.productReason;

  return (
    <>
      <Helmet>
        <title>Free Knee Comfort Quiz. Find Your Routine | FlexiKnee</title>
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

        <main data-clarity-mask="true">
          <section className="py-12 md:py-16">
            <div
              className={`mx-auto px-4 sm:px-6 lg:px-8 ${isDone ? "max-w-6xl" : "max-w-4xl"}`}
            >
              {sourceState.sourceTitle && !isDone && (
                <p className="mb-5 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">
                  You came from <strong>{sourceState.sourceTitle}</strong>. The
                  quiz will keep that guide in context and avoid repeating it
                  in your reading list.
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
                  <div className="space-y-5 md:space-y-6">
                    <section className="overflow-hidden rounded-[2.25rem] border border-blue-200 bg-white shadow-[0_35px_110px_-70px_rgba(37,99,235,0.7)]">
                      <div className="bg-[radial-gradient(circle_at_90%_0%,rgba(125,211,252,0.55),transparent_32%),linear-gradient(135deg,#eff6ff_0%,#eef2ff_55%,#ecfeff_100%)] p-6 sm:p-8 lg:p-10">
                        <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                          <CheckCircle2 className="h-5 w-5" /> Your result
                        </p>
                        <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-[-0.045em] text-slate-950 md:text-5xl">
                          {result.headline}
                        </h1>
                        <p className="mt-5 max-w-4xl text-base leading-8 text-slate-700">
                          {result.summary}
                        </p>
                      </div>

                      <div className="border-t border-white/10 bg-[radial-gradient(circle_at_8%_0%,rgba(37,99,235,0.32),transparent_28%),linear-gradient(145deg,#0f172a,#020617)] p-6 text-white sm:p-8 lg:p-10">
                        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
                          <div>
                            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                              <CalendarDays className="h-4 w-4" /> Your seven-day starter plan
                            </p>
                            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
                              {result.planHeading}
                            </h2>
                          </div>
                          <p className="max-w-xl text-sm leading-6 text-slate-300">
                            {result.planIntro}
                          </p>
                        </div>

                        <ol className="mt-6 grid gap-x-8 md:grid-flow-col md:grid-rows-4">
                          {result.plan.map((item) => (
                            <li
                              key={item.day}
                              className="grid grid-cols-[3.1rem_1fr] gap-3 border-t border-white/10 py-4"
                            >
                              <span className="pt-0.5 text-xs font-bold uppercase tracking-[0.12em] text-cyan-300">
                                {item.day}
                              </span>
                              <span>
                                <span className="block text-sm font-semibold text-white sm:text-base">
                                  {item.title}
                                </span>
                                <span className="mt-1 block text-sm leading-6 text-slate-300">
                                  {item.action}
                                </span>
                              </span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </section>

                    <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_70px_-55px_rgba(15,23,42,0.65)]">
                      <div className="p-6 sm:p-8">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                          Your matched next steps
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                          One routine, one product direction, three useful guides.
                        </h2>
                      </div>

                      <div className="grid border-t border-slate-200 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
                        <div className="p-5 sm:p-7">
                          <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                            <div className="flex h-64 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_20%,#ffffff,#eef4ff)] p-1 sm:h-72 lg:h-80 lg:p-2">
                              {productImage ? (
                                <img
                                  src={productImage}
                                  alt={
                                    recommendedImage?.altText ||
                                    productTitle ||
                                    "FlexiKnee matched support"
                                  }
                                  className="h-full w-full scale-110 object-contain"
                                />
                              ) : (
                                <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-blue-600 shadow-sm">
                                  <BookOpenCheck className="h-9 w-9" />
                                </span>
                              )}
                            </div>
                            <div className="border-t border-slate-200 bg-white p-5 sm:p-6">
                              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
                                {result.productKey === "generic"
                                  ? "Featured FlexiKnee product"
                                  : "Matched FlexiKnee product"}
                              </p>
                              <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
                                {productTitle || "FlexiKnee Smart Heated Knee Massager"}
                              </h3>
                              <p className="mt-3 text-sm leading-7 text-slate-600">
                                {productReason}
                              </p>
                              {recommendedPrice && (
                                <p className="mt-3 text-lg font-semibold text-slate-950">
                                  {recommendedHasPriceRange ? "From " : ""}
                                  {formatMoney(
                                    recommendedPrice.amount,
                                    recommendedPrice.currencyCode,
                                  )}
                                </p>
                              )}
                              <Link
                                to={productHref}
                                className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                              >
                                {result.productKey === "generic"
                                  ? "Explore our main product"
                                  : "View matched product"}
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-slate-200 p-5 sm:p-7 lg:border-l lg:border-t-0">
                          <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                              <BookOpenCheck className="h-5 w-5" />
                            </span>
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                                Matched reading
                              </p>
                              <h3 className="text-xl font-semibold tracking-tight text-slate-950">
                                Start with these guides
                              </h3>
                            </div>
                          </div>
                          <div className="mt-5 divide-y divide-slate-200 rounded-2xl border border-slate-200">
                            {result.guides.map((guide) => (
                              <Link
                                key={guide.slug}
                                to={`/guides/${guide.slug}`}
                                className="group flex items-center justify-between gap-4 px-4 py-4 transition first:rounded-t-2xl last:rounded-b-2xl hover:bg-blue-50/70 sm:px-5"
                              >
                                <span>
                                  <span className="block text-sm font-semibold text-slate-950 sm:text-base">
                                    {guide.title}
                                  </span>
                                  <span className="mt-1 block text-sm leading-6 text-slate-500">
                                    {guide.reason}
                                  </span>
                                </span>
                                <ArrowRight className="h-5 w-5 shrink-0 text-blue-600 transition group-hover:translate-x-1" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-slate-200 bg-[linear-gradient(120deg,#f8fafc,#eff6ff)] p-5 sm:p-7">
                        {emailSent ? (
                          <div className="flex gap-4">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                              <Check className="h-5 w-5" />
                            </span>
                            <div>
                              <h3 className="text-lg font-semibold text-slate-950">
                                Check your inbox.
                              </h3>
                              <p className="mt-1 text-sm leading-6 text-slate-600">
                                We sent this result, your matched links and all seven days to {email}.
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
                            <div className="flex items-start gap-3">
                              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                                <Mail className="h-5 w-5" />
                              </span>
                              <div>
                                <h3 className="text-lg font-semibold text-slate-950">
                                  Save your 7-day plan
                                </h3>
                                <p className="mt-1 text-sm leading-6 text-slate-600">
                                  Send your personalized result and all seven days to your inbox so you can follow them without keeping the page open.
                                </p>
                              </div>
                            </div>
                            <form onSubmit={handleEmail}>
                              <div className="flex flex-col gap-3 sm:flex-row">
                                <input
                                  type="email"
                                  value={email}
                                  onChange={(event) => setEmail(event.target.value)}
                                  placeholder="you@example.com"
                                  autoComplete="email"
                                  className="min-w-0 flex-1 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                />
                                <button
                                  type="submit"
                                  disabled={isSending}
                                  className="shrink-0 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
                                >
                                  {isSending ? "Sending..." : "Email my plan"}
                                </button>
                              </div>
                              <label className="mt-3 flex cursor-pointer items-start gap-2 text-xs leading-5 text-slate-600">
                                <input
                                  type="checkbox"
                                  checked={consent}
                                  onChange={(event) => setConsent(event.target.checked)}
                                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span>
                                  Also send occasional FlexiKnee guides and offers. Optional, unsubscribe any time.
                                </span>
                              </label>
                              <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                                <ShieldCheck className="h-4 w-4" /> The requested plan email does not require marketing signup.
                              </p>
                            </form>
                          </div>
                        )}
                      </div>
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
