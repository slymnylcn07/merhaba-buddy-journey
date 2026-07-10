import { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowRight, CheckCircle2, RefreshCcw } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PRIMARY_PRODUCT_PATH } from "@/lib/product-config";
import { trackEvent } from "@/hooks/use-google-analytics";

type OptionKey = string;

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
      { key: "daily", label: "Everyday moments — stairs, kneeling, walking" },
      { key: "rest", label: "After sitting, resting, or first thing in the morning" },
      { key: "travel", label: "During or after travel (flights, long drives, desk days)" },
    ],
  },
  {
    id: "feel",
    question: "How would you describe the feeling?",
    options: [
      { key: "stiff", label: "Stiffness or tightness" },
      { key: "ache", label: "A dull ache or soreness" },
      { key: "sharp", label: "Sharp or sudden discomfort" },
      { key: "sounds", label: "Clicking, popping, or crunching sounds" },
    ],
  },
  {
    id: "tried",
    question: "What have you already tried?",
    options: [
      { key: "nothing", label: "Nothing consistent yet" },
      { key: "heat_ice", label: "Heat packs or ice" },
      { key: "exercise", label: "Stretching or strengthening exercises" },
      { key: "devices", label: "Braces, sleeves, or massage devices" },
    ],
  },
  {
    id: "goal",
    question: "What matters most to you right now?",
    options: [
      { key: "relief", label: "Feeling more comfortable day to day" },
      { key: "active", label: "Staying active without paying for it later" },
      { key: "sleep", label: "Better evenings and sleep" },
      { key: "understand", label: "Understanding what my knees are telling me" },
    ],
  },
];

interface GuideRec {
  slug: string;
  title: string;
  reason: string;
}

function buildRecommendations(answers: Record<string, OptionKey>): {
  headline: string;
  summary: string;
  guides: GuideRec[];
} {
  const when = answers.when;
  const feel = answers.feel;
  const goal = answers.goal;

  const guides: GuideRec[] = [];

  if (when === "activity") {
    guides.push({
      slug: "knee-pain-after-exercise",
      title: "Knee Pain After Exercise",
      reason: "Matches when your knees speak up",
    });
    guides.push({
      slug: "knee-recovery-exercises-after-workout",
      title: "Knee Recovery Exercises After Workouts",
      reason: "A recovery routine for active days",
    });
  } else if (when === "daily") {
    guides.push({
      slug: "knee-pain-going-down-stairs",
      title: "Knee Pain Going Down Stairs",
      reason: "Covers the most demanding daily movement",
    });
    guides.push({
      slug: "daily-knee-care-routine",
      title: "Daily Knee Care Routine",
      reason: "Simple habits that compound",
    });
  } else if (when === "rest") {
    guides.push({
      slug: "knee-pain-getting-up-after-sitting",
      title: "Knee Pain When Getting Up After Sitting",
      reason: "Matches when your knees speak up",
    });
    guides.push({
      slug: "morning-knee-stiffness-after-40",
      title: "Morning Knee Stiffness",
      reason: "Why knees feel rusty after rest",
    });
  } else {
    guides.push({
      slug: "knee-pain-after-flights",
      title: "Knee Pain After Flights",
      reason: "Travel and circulation explained",
    });
    guides.push({
      slug: "knee-pain-after-car-rides",
      title: "Knee Pain After Long Car Rides",
      reason: "Seat time and stiff knees",
    });
  }

  if (feel === "sharp") {
    guides.push({
      slug: "sharp-knee-pain-guide",
      title: "Sharp Knee Pain Guide",
      reason: "Understand sudden, sharp signals",
    });
  } else if (feel === "sounds") {
    guides.push({
      slug: "knee-clicking-when-walking",
      title: "Knee Clicking When Walking",
      reason: "What those sounds usually mean",
    });
  } else if (feel === "stiff") {
    guides.push({
      slug: "knee-tightness-without-pain",
      title: "Knee Tightness Without Pain",
      reason: "Decode the stiffness pattern",
    });
  } else {
    guides.push({
      slug: "heat-vs-ice-for-knees",
      title: "Heat vs. Ice for Knees",
      reason: "Pick the right comfort tool",
    });
  }

  let headline = "Your knees want consistency, not intensity.";
  let summary =
    "Based on your answers, your knees respond best to a simple daily warmth-and-movement routine — a few intentional minutes, repeated, beats occasional intensive care.";

  if (goal === "active") {
    headline = "Your knees need a recovery routine, not less activity.";
    summary =
      "You don't have to move less — you need to recover smarter. Warmth after activity, gentle mobility work, and consistent habits let you stay active without paying for it the next day.";
  } else if (goal === "sleep") {
    headline = "Your evenings set up how your knees feel all day.";
    summary =
      "An evening wind-down with gentle warmth helps stiff, achy knees relax before sleep — most people notice calmer mornings within a couple of weeks of a consistent routine.";
  } else if (goal === "understand") {
    headline = "Your knees are giving you readable signals.";
    summary =
      "The pattern you described is common and usually manageable. Start with the guides below to understand what's happening — then build a simple daily comfort routine around it.";
  }

  return { headline, summary, guides: guides.slice(0, 3) };
}

export default function KneeQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, OptionKey>>({});
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const isDone = step >= QUESTIONS.length;
  const result = useMemo(
    () => (isDone ? buildRecommendations(answers) : null),
    [isDone, answers]
  );

  const handleAnswer = (questionId: string, key: OptionKey) => {
    setAnswers((prev) => ({ ...prev, [questionId]: key }));
    const next = step + 1;
    setStep(next);
    if (next >= QUESTIONS.length) {
      trackEvent("knee_quiz_completed", { category: "quiz" });
    }
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setIsSending(true);
    try {
      const resp = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!resp.ok) throw new Error();
      setEmailSent(true);
      trackEvent("knee_quiz_email_captured", { category: "quiz" });
      toast.success("Sent! Check your inbox for your routine.");
    } catch {
      toast.error("Could not save your email. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers({});
    setEmail("");
    setEmailSent(false);
  };

  const progress = Math.min(100, Math.round((step / QUESTIONS.length) * 100));

  return (
    <>
      <Helmet>
        <title>Free Knee Comfort Quiz — Find Your Routine | FlexiKnee™</title>
        <meta
          name="description"
          content="Answer 4 quick questions about your knees and get a personalized comfort routine with the right guides and at-home support for your situation."
        />
        <link rel="canonical" href="https://flexi-knee.com/knee-quiz" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "FlexiKnee Knee Comfort Quiz",
          url: "https://flexi-knee.com/knee-quiz",
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-white text-slate-950">
        <Header />

        <main>
          <section className="bg-white py-14 md:py-20">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              {!isDone ? (
                <>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Knee quiz</p>
                  <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">
                    Find your knee comfort routine in 60 seconds.
                  </h1>
                  <p className="mt-3 text-slate-600">
                    Four quick questions. No wrong answers — just pick what sounds most like you.
                  </p>

                  <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs font-medium text-slate-500">
                    Question {step + 1} of {QUESTIONS.length}
                  </p>

                  <h2 className="mt-8 text-xl font-semibold text-slate-950">
                    {QUESTIONS[step].question}
                  </h2>
                  <div className="mt-5 grid gap-3">
                    {QUESTIONS[step].options.map((option) => (
                      <button
                        key={option.key}
                        type="button"
                        onClick={() => handleAnswer(QUESTIONS[step].id, option.key)}
                        className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left text-base font-medium text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                result && (
                  <>
                    <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
                      <CheckCircle2 className="h-4 w-4" />
                      Your result
                    </p>
                    <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">
                      {result.headline}
                    </h1>
                    <p className="mt-4 text-base leading-8 text-slate-600">{result.summary}</p>

                    <h2 className="mt-10 text-lg font-semibold text-slate-950">Start with these guides</h2>
                    <div className="mt-4 grid gap-3">
                      {result.guides.map((guide) => (
                        <Link
                          key={guide.slug}
                          to={`/guides/${guide.slug}`}
                          className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                          <span>
                            <span className="block text-base font-semibold text-slate-950">{guide.title}</span>
                            <span className="block text-sm text-slate-500">{guide.reason}</span>
                          </span>
                          <ArrowRight className="h-5 w-5 shrink-0 text-blue-600 transition group-hover:translate-x-1" />
                        </Link>
                      ))}
                    </div>

                    <div className="mt-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-7 md:p-8">
                      <h2 className="text-lg font-semibold text-slate-950">
                        One device covers the routine in your result
                      </h2>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        The FlexiKnee combines soothing warmth, red light, and gentle vibration — the three approaches your recommended guides talk about — in one wireless wrap. 60-day home trial, free shipping.
                      </p>
                      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                        <Link
                          to={PRIMARY_PRODUCT_PATH}
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                          See the FlexiKnee
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                          to="/shop"
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400"
                        >
                          Browse all devices
                        </Link>
                      </div>
                    </div>

                    <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-7 md:p-8">
                      {emailSent ? (
                        <p className="text-sm font-medium text-emerald-700">
                          Your personalized routine is on its way. We'll also send occasional knee comfort tips — unsubscribe anytime.
                        </p>
                      ) : (
                        <>
                          <h2 className="text-lg font-semibold text-slate-950">Email me my routine</h2>
                          <p className="mt-1 text-sm text-slate-600">
                            Get your result and a simple 7-day starter plan in your inbox.
                          </p>
                          <form onSubmit={handleEmail} className="mt-4 flex flex-col gap-3 sm:flex-row">
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="you@example.com"
                              className="w-full rounded-full border border-slate-300 px-5 py-3 text-sm outline-none transition focus:border-blue-500"
                            />
                            <button
                              type="submit"
                              disabled={isSending}
                              className="shrink-0 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
                            >
                              {isSending ? "Sending..." : "Send my routine"}
                            </button>
                          </form>
                        </>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={restart}
                      className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-800"
                    >
                      <RefreshCcw className="h-4 w-4" />
                      Retake the quiz
                    </button>
                  </>
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
