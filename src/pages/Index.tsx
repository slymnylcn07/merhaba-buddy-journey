import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowRight, Check, ChevronRight, Flame, Play, Sparkles, Waves } from "lucide-react";
import { Header } from "@/components/Header";
import { DiscountCodeModal } from "@/components/DiscountCodeModal";
import { Footer } from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FlexiKneeSystem } from "@/components/FlexiKneeSystem";
import { VideoReviews } from "@/components/VideoReviews";
import { featurePillars } from "@/data/product-system";
import { PRIMARY_PRODUCT_PATH } from "@/lib/product-config";

const HERO_DESKTOP_IMAGE = "/images/flexiknee-hero-desktop-premium-v2.webp";
const HERO_MOBILE_IMAGE = "/images/flexiknee-hero-final-mobile.png";

const featuredGuides = [
  {
    title: "Knee Clicking When Walking Explained",
    href: "/guides/knee-clicking-when-walking",
    image: "/images/flexiknee-lifestyle-home.webp",
    tag: "Movement",
  },
  {
    title: "Heat vs. Ice for Knees: What Works Best Daily?",
    href: "/guides/heat-vs-ice-for-knees",
    image: "/images/og-image.jpg",
    tag: "Routine",
  },
  {
    title: "Daily Knee Care Routine: Simple Habits for Comfort",
    href: "/guides/daily-knee-care-routine",
    image: "/images/flexiknee-lifestyle-work.webp",
    tag: "Comfort",
  },
];

const problemPaths = [
  ["After exercise", "Knee soreness after activity or workouts", "/guides/knee-pain-after-exercise"],
  ["Going down stairs", "Pressure and discomfort during descents", "/guides/knee-pain-going-down-stairs"],
  ["Clicking or popping", "Understand sounds during walking or bending", "/guides/knee-clicking-when-walking"],
  ["Stiff after sitting", "Daily patterns after work, travel, or rest", "/guides/why-do-my-knees-feel-tight-after-resting"],
] as const;

const healthSources = [
  "Mayo Clinic",
  "Cleveland Clinic",
  "Johns Hopkins Medicine",
  "NHS",
  "Arthritis Foundation",
  "Harvard Health",
  "NIH",
  "WebMD",
  "Healthline",
];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FlexiKnee",
  url: "https://flexi-knee.com",
  logo: "https://flexi-knee.com/images/og-image.jpg",
};

export default function Index() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const [showCodeModal, setShowCodeModal] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newsletterEmail || !emailRegex.test(newsletterEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubscribing(true);

    try {
      const resp = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      if (!resp.ok) throw new Error("Subscription failed");
      setNewsletterEmail("");
      setShowCodeModal(true);
    } catch {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>FlexiKnee? | Knee Comfort Guides & Smart Recovery Products</title>
        <meta
          name="description"
          content="FlexiKnee? combines practical knee comfort education with smart at-home support products for heat, vibration, wraparound positioning, and daily routines."
        />
        <link rel="canonical" href="https://flexi-knee.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flexi-knee.com/" />
        <meta property="og:title" content="FlexiKnee? | Knee Comfort Guides & Smart Recovery Products" />
        <meta property="og:description" content="A premium knee comfort hub with practical guides and smart at-home recovery products." />
        <meta property="og:image" content="https://flexi-knee.com/images/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-white text-slate-950">
        <Header />

        <main>
          <h1 className="sr-only">
            FlexiKnee Smart Heated Knee Massager with Red Light Therapy. Knee Comfort Guides and Recovery Products
          </h1>
          <section className="bg-white">
            <div className="mx-auto max-w-[1800px] px-0 py-0 sm:px-4 sm:py-5 lg:px-8 lg:py-8">
              <div className="relative overflow-hidden bg-white shadow-[0_35px_120px_-90px_rgba(15,23,42,0.65)] sm:rounded-[2rem]">
                <picture>
                  <source media="(max-width: 767px)" srcSet={HERO_MOBILE_IMAGE} />
                  <img
                    src={HERO_DESKTOP_IMAGE}
                    alt="FlexiKnee smart knee comfort for daily home routines"
                    className="block w-full"
                    fetchPriority="high"
                  />
                </picture>

                <Link
                  to={PRIMARY_PRODUCT_PATH}
                  aria-label="Shop FlexiKnee"
                  className="absolute bottom-[9.2%] left-[8%] h-[5.4%] w-[84%] rounded-full md:hidden"
                />

                <Link
                  to="/guides/do-knee-massagers-work"
                  aria-label="How FlexiKnee works"
                  className="absolute bottom-[2.6%] left-[8%] h-[5.4%] w-[84%] rounded-full md:hidden"
                />

                <div className="absolute inset-y-0 left-0 hidden w-[53%] flex-col justify-center px-[5.3%] md:flex">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600 shadow-sm backdrop-blur lg:px-4 lg:text-xs">
                    <Sparkles className="h-3.5 w-3.5" /> Smart knee comfort
                  </div>
                  <h2 className="mt-[4%] max-w-[760px] text-[clamp(2.35rem,4.2vw,5rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-slate-950">
                    Comfort that keeps you moving.
                  </h2>
                  <p className="mt-[4%] max-w-xl text-[clamp(0.9rem,1.35vw,1.35rem)] leading-relaxed text-slate-600">
                    Heat, vibration, and wraparound support for simple daily comfort at home.
                  </p>

                  <div className="mt-[5%] flex items-center gap-3">
                    <Link
                      to={PRIMARY_PRODUCT_PATH}
                      className="inline-flex h-11 items-center gap-2 rounded-full bg-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 lg:h-14 lg:px-7 lg:text-base"
                    >
                      Shop FlexiKnee <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/guides/do-knee-massagers-work"
                      className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-5 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur transition hover:border-blue-200 hover:text-blue-600 lg:h-14 lg:px-7 lg:text-base"
                    >
                      How It Works <Play className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className="mt-[6%] grid max-w-[650px] grid-cols-3 gap-2 lg:gap-3">
                    {[
                      { label: "Heat Therapy", icon: Flame, tone: "text-orange-500" },
                      { label: "Vibration", icon: Waves, tone: "text-blue-600" },
                      { label: "Daily Support", icon: Check, tone: "text-emerald-600" },
                    ].map(({ label, icon: Icon, tone }) => (
                      <div key={label} className="flex min-h-14 items-center gap-2 rounded-2xl border border-white/80 bg-white/85 px-3 py-2 text-[11px] font-semibold leading-tight text-slate-800 shadow-md shadow-slate-300/20 backdrop-blur lg:min-h-20 lg:gap-3 lg:px-4 lg:text-sm">
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-current bg-white ${tone} lg:h-10 lg:w-10`}>
                          <Icon className="h-4 w-4 lg:h-5 lg:w-5" strokeWidth={2.4} />
                        </span>
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-y border-slate-200 bg-slate-50 py-4">
            <div className="mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8">
              <div className="animate-scroll flex w-max min-w-max items-center gap-10 pr-10 text-sm italic text-slate-500 will-change-transform">
                {[...healthSources, ...healthSources].map((source, index) => (
                  <span key={`${source}-${index}`} className="whitespace-nowrap font-medium tracking-wide">
                    {source}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Start by situation</p>
                  <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-5xl">
                    Where does your knee bother you most?
                  </h2>
                </div>
                <p className="max-w-2xl text-base leading-8 text-slate-600 lg:pt-12">
                  Start with your situation, stairs, workouts, stiffness, or clicking, and get a practical, science-informed guide for it.
                </p>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {problemPaths.map(([title, text, href], index) => (
                  <Link
                    key={title}
                    to={href}
                    className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <span className="inline-flex rounded-2xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-7 text-2xl font-semibold tracking-tight text-slate-950">{title}</h3>
                    <p className="mt-3 text-base leading-7 text-slate-500">{text}</p>
                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                      Read guide <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section id="why-it-works" className="bg-slate-950 py-20 text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10 max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">Routine-first product story</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] md:text-5xl">
                  What it supports in a daily comfort routine.
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-4">
                {featurePillars.map((feature) => (
                  <div key={feature.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl font-semibold text-blue-600">{feature.icon}</div>
                    <h3 className="mt-5 text-lg font-semibold text-white">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{feature.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <VideoReviews />

          <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Guides & recovery education</p>
                  <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-5xl">
                    Content that sells without shouting.
                  </h2>
                </div>
                <Link to="/guides" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                  View all guides <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {featuredGuides.map((guide) => (
                  <Link key={guide.title} to={guide.href} className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <img src={guide.image} alt={guide.title} className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">{guide.tag}</p>
                      <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">{guide.title}</h3>
                      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                        Read guide <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section id="system" className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">FlexiKnee system</p>
                  <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-5xl">
                    A cleaner brand ecosystem before the FAQ.
                  </h2>
                </div>
                <p className="max-w-2xl text-base leading-8 text-slate-600">
                  Active product pricing can update dynamically from Shopify, while future products still have a natural place in the system.
                </p>
              </div>
              <FlexiKneeSystem />
            </div>
          </section>

          <section id="faq" className="bg-slate-50 py-20">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">FAQ</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-slate-950">
                  Quick answers before checkout.
                </h2>
                <p className="mt-4 max-w-md text-base leading-7 text-slate-600">
                  Cleaner claims, calmer language, and more trust before the user hits the cart.
                </p>
              </div>
              <Accordion type="single" collapsible className="rounded-[2rem] border border-slate-200 bg-white px-6 shadow-sm">
                {[
                  ["How often should I use FlexiKnee?", "Most people use it in short routine sessions. Follow the included instructions and stop if something feels uncomfortable."],
                  ["Is it wireless?", "Yes. FlexiKnee is rechargeable and designed for cord-free daily use."],
                  ["Is this a medical treatment?", "No. FlexiKnee is positioned as an at-home comfort and recovery support product, not a medical treatment or diagnosis tool."],
                  ["Can I return it?", "Yes. Every order is covered by our 30-day return policy, counted from the day it is delivered. Contact us with your order number and we will guide you through it."],
                ].map(([q, a]) => (
                  <AccordionItem key={q} value={q} className="border-slate-200">
                    <AccordionTrigger className="text-left text-base font-semibold text-slate-950">{q}</AccordionTrigger>
                    <AccordionContent className="text-slate-600">{a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          <section className="bg-white py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="overflow-hidden rounded-[2.2rem] border border-slate-200 bg-[radial-gradient(circle_at_85%_10%,rgba(37,99,235,0.14),transparent_30%),linear-gradient(135deg,#f8fbff_0%,#ffffff_58%,#eef6ff_100%)] p-6 shadow-[0_35px_100px_-80px_rgba(15,23,42,0.75)] md:p-10">
                <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Newsletter</p>
                    <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-5xl">
                      Get 10% off your first FlexiKnee order.
                    </h2>
                    <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                      Join the comfort list for guide drops, launch updates, and your welcome discount.
                    </p>
                  </div>

                  <form onSubmit={handleSubscribe} className="rounded-[1.7rem] border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/60">
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <input
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        type="email"
                        placeholder="Enter your email address"
                        className="h-14 flex-1 rounded-full border border-slate-200 bg-slate-50 px-5 text-base text-slate-950 outline-none placeholder:text-slate-400 focus:border-blue-300 focus:bg-white"
                      />
                      <button
                        disabled={isSubscribing}
                        className="h-14 rounded-full bg-slate-950 px-8 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:opacity-60"
                      >
                        {isSubscribing ? "Joining..." : "Get 10% off"}
                      </button>
                    </div>
                    <p className="px-2 pt-3 text-xs leading-5 text-slate-500">
                      No spam. Product updates, helpful guides, and launch offers only.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>

        <DiscountCodeModal open={showCodeModal} onOpenChange={setShowCodeModal} />

        <Footer />
      </div>
    </>
  );
}
