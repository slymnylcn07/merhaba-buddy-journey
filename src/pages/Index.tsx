import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Clock,
  Shield,
  Sparkles,
  Star,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FlexiKneeSystem } from "@/components/FlexiKneeSystem";
import { VideoReviews } from "@/components/VideoReviews";
import { featurePillars, trustBadges } from "@/data/product-system";
import { PRIMARY_PRODUCT_PATH } from "@/lib/product-config";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FlexiKnee",
  url: "https://flexi-knee.com",
  logo: "https://flexi-knee.com/logo.png",
  description: "FlexiKnee is a knee comfort and recovery education brand with smart at-home support products.",
};

const heroGuides = [
  {
    title: "Knee clicking when walking",
    href: "/guides/knee-clicking-when-walking",
    tag: "Movement",
  },
  {
    title: "Knee pain going down stairs",
    href: "/guides/knee-pain-going-down-stairs",
    tag: "Stairs",
  },
  {
    title: "Heat vs. ice for knees",
    href: "/guides/heat-vs-ice-for-knees",
    tag: "Daily routine",
  },
];

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
  ["Stiff after sitting", "Daily patterns after work, travel, or rest", "/guides/knee-stiffness-after-resting"],
];

export default function Index() {
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    getProducts(4)
      .then((items) => setProduct(items[0]?.node ? items[0] : null))
      .catch(() => setProduct(null));
  }, []);

  const handleQuickAdd = () => {
    if (!product) {
      window.location.href = PRIMARY_PRODUCT_PATH;
      return;
    }

    const variant = product.node.variants.edges[0]?.node;
    if (!variant) {
      window.location.href = PRIMARY_PRODUCT_PATH;
      return;
    }

    addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions,
    });

    toast.success("FlexiKnee added to cart.");
  };

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
      toast.success("You are on the FlexiKnee list.");
      setNewsletterEmail("");
    } catch {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>FlexiKnee™ | Knee Comfort Guides & Smart Recovery Products</title>
        <meta
          name="description"
          content="FlexiKnee™ combines practical knee comfort education with smart at-home support products for heat, vibration, wraparound positioning, and daily routines."
        />
        <link rel="canonical" href="https://flexi-knee.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flexi-knee.com/" />
        <meta property="og:title" content="FlexiKnee™ | Knee Comfort Guides & Smart Recovery Products" />
        <meta property="og:description" content="A premium knee comfort hub with practical guides and smart at-home recovery products." />
        <meta property="og:image" content="https://flexi-knee.com/images/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-white text-slate-950">
        <Header />

        <main>
          <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)]">
            <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:px-8 lg:py-18">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700 shadow-sm">
                  <Sparkles className="h-3.5 w-3.5" /> Smart knee comfort
                </div>

                <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.94] tracking-[-0.065em] text-slate-950 sm:text-6xl lg:text-7xl">
                  Move easier, recover smarter.
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                  Explore practical knee comfort guides and FlexiKnee products designed for short daily routines at home, work, and after activity.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to={PRIMARY_PRODUCT_PATH}
                    className="inline-flex h-13 items-center justify-center rounded-full bg-blue-600 px-7 text-sm font-semibold text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700"
                  >
                    Shop FlexiKnee
                  </Link>
                  <Link
                    to="/guides"
                    className="inline-flex h-13 items-center justify-center rounded-full border border-slate-300 bg-white px-7 text-sm font-semibold text-slate-900 transition hover:border-blue-300 hover:text-blue-700"
                  >
                    Explore guides
                  </Link>
                </div>

                <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
                  {heroGuides.map((guide) => (
                    <Link
                      key={guide.title}
                      to={guide.href}
                      className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600">{guide.tag}</p>
                      <p className="mt-2 text-sm font-semibold leading-5 text-slate-950 group-hover:text-blue-700">{guide.title}</p>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-x-8 bottom-8 h-28 rounded-full bg-blue-500/20 blur-3xl" />
                <picture>
                  <source media="(max-width: 767px)" srcSet="/images/flexiknee-hero-mobile-premium.webp" />
                  <img
                    src="/images/flexiknee-hero-desktop-premium.webp"
                    alt="FlexiKnee smart knee comfort system"
                    className="relative w-full rounded-[2rem] border border-slate-200 bg-white shadow-[0_45px_120px_-70px_rgba(15,23,42,0.65)] md:rounded-[2.6rem]"
                    fetchPriority="high"
                  />
                </picture>
              </div>
            </div>
          </section>

          <section className="border-b border-slate-200 bg-white">
            <div className="mx-auto grid max-w-7xl gap-0 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
              {trustBadges.map((badge) => (
                <div key={badge} className="flex items-center gap-3 border-slate-200 py-5 lg:border-r lg:last:border-r-0">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-800">{badge}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate-50 py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Start by situation</p>
                  <h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-5xl">
                    The homepage now works like an authority hub.
                  </h2>
                </div>
                <p className="max-w-xl text-base leading-7 text-slate-600">
                  Visitors can enter through their problem first, then discover the product naturally. This is the Concept 3 direction.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                {problemPaths.map(([title, text, href], index) => (
                  <Link
                    key={title}
                    to={href}
                    className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-sm font-semibold text-blue-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-950">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                      Read guide <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section id="system" className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">FlexiKnee system</p>
                  <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-5xl">
                    One product now. A full knee comfort system later.
                  </h2>
                  <p className="mt-5 text-base leading-8 text-slate-600">
                    This structure is ready for the extra knee products you said you will add later. The page feels like a brand ecosystem instead of a one-off dropshipping page.
                  </p>
                  <Button onClick={handleQuickAdd} className="mt-8 rounded-full bg-blue-600 px-7 text-white hover:bg-blue-700">
                    Quick add FlexiKnee
                  </Button>
                </div>
                <FlexiKneeSystem />
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
                  ["Can I return it?", "Yes. Keep the 30-day return promise visible so the purchase feels lower risk."],
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

        <Footer />
      </div>
    </>
  );
}
