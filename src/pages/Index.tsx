import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowRight, Check, Shield, Sparkles, Star } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FlexiKneeSystem } from "@/components/FlexiKneeSystem";
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
  description: "FlexiKnee creates smart knee comfort products for daily recovery routines and at-home support.",
};

const guides = [
  {
    title: "Knee Clicking When Walking Explained",
    href: "/guides/knee-clicking-when-walking",
    image: "/images/flexiknee-how-it-works.webp",
  },
  {
    title: "Heat vs. Ice for Knees: What’s Best Daily?",
    href: "/guides/heat-vs-ice-for-knees",
    image: "/images/flexiknee-rapid-warming.webp",
  },
  {
    title: "Daily Habits for Stronger Knee Comfort",
    href: "/guides/daily-knee-care-routine",
    image: "/images/flexiknee-lifestyle-work.webp",
  },
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
    if (!variant) return;
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
        <title>FlexiKnee™ | Smart Knee Comfort & Recovery Products</title>
        <meta name="description" content="FlexiKnee™ builds smart knee comfort products for heat, vibration, compression support, and simple at-home recovery routines." />
        <link rel="canonical" href="https://flexi-knee.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flexi-knee.com/" />
        <meta property="og:title" content="FlexiKnee™ | Smart Knee Comfort & Recovery Products" />
        <meta property="og:description" content="A premium knee comfort system built around smart heat, gentle vibration, compression support, and recovery education." />
        <meta property="og:image" content="https://flexi-knee.com/images/flexiknee-product-main.webp" />
        <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-white text-slate-950">
        <Header />

        <main>
          <section className="relative overflow-hidden bg-[radial-gradient(circle_at_60%_20%,rgba(59,130,246,0.14),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]">
            <div className="mx-auto grid min-h-[760px] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-20">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700 shadow-sm">
                  <Sparkles className="h-3.5 w-3.5" /> Smart recovery solutions
                </div>
                <h1 className="mt-7 max-w-2xl text-5xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl">
                  Knee recovery, reimagined.
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                  A premium knee comfort system built around adjustable heat, gentle vibration, compression support, and simple daily recovery education.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link to={PRIMARY_PRODUCT_PATH} className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-7 text-sm font-semibold text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700">
                    Shop FlexiKnee
                  </Link>
                  <a href="#system" className="inline-flex h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-7 text-sm font-semibold text-slate-900 transition hover:border-blue-300 hover:text-blue-700">
                    Explore the system
                  </a>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5 font-medium text-slate-700"><Star className="h-4 w-4 fill-blue-600 text-blue-600" /> 4.8/5 customer rating</span>
                  <span>30-day returns</span>
                  <span>Secure checkout</span>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-x-16 bottom-12 h-28 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="relative rounded-[2.5rem] border border-white/70 bg-white/70 p-5 shadow-[0_50px_120px_-60px_rgba(15,23,42,0.55)] backdrop-blur-xl">
                  <div className="grid gap-4 lg:grid-cols-[1fr_0.82fr]">
                    <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-50 via-white to-blue-50">
                      <img src="/images/flexiknee-product-main.webp" alt="FlexiKnee white knee massager" className="relative z-10 w-[88%] max-w-[560px] object-contain drop-shadow-2xl" fetchPriority="high" />
                      <div className="absolute left-8 top-8 rounded-2xl bg-white/90 px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg">
                        Heat · Vibration · Compression
                      </div>
                    </div>
                    <div className="grid gap-4">
                      <img src="/images/flexiknee-lifestyle-home.webp" alt="FlexiKnee used at home" className="h-full min-h-[250px] rounded-[2rem] object-cover shadow-sm" />
                      <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl">
                        <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Daily comfort</p>
                        <p className="mt-3 text-3xl font-semibold tracking-tight">15-minute routines that fit your day.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-y border-slate-200 bg-white">
            <div className="mx-auto grid max-w-7xl gap-0 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
              {trustBadges.map((badge) => (
                <div key={badge} className="flex items-center gap-3 border-slate-200 py-5 lg:border-r lg:last:border-r-0">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-800">{badge}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="system" className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Explore the FlexiKnee system</p>
                  <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950">More ways to support your knees.</h2>
                </div>
                <p className="max-w-xl text-base leading-7 text-slate-500">
                  The homepage is now built like a product ecosystem, so future knee products can be added without rebuilding the brand from zero.
                </p>
              </div>
              <FlexiKneeSystem />
            </div>
          </section>

          <section id="why-it-works" className="bg-slate-50 py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Why it works</p>
                  <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950">Designed for comfort, built for daily use.</h2>
                  <p className="mt-5 text-base leading-8 text-slate-600">
                    FlexiKnee combines focused warmth, massage-style vibration, wraparound support, and clear touch controls into one simple device.
                  </p>
                  <Button onClick={handleQuickAdd} className="mt-8 rounded-full bg-slate-950 px-7 text-white hover:bg-slate-800">
                    Quick add to cart
                  </Button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {featurePillars.map((feature) => (
                    <div key={feature.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl font-semibold text-blue-600">{feature.icon}</div>
                      <h3 className="mt-5 text-lg font-semibold text-slate-950">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-500">{feature.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
                <div className="rounded-[2rem] bg-slate-950 p-8 text-white lg:p-10">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">Everyday scenarios</p>
                  <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">Comfort, designed for real life.</h2>
                  <p className="mt-5 text-base leading-8 text-slate-300">
                    Use it after walks, while working from home, during evening wind-down, or as part of a simple post-activity routine.
                  </p>
                  <Link to="/guides" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950">
                    Read the guides <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  {["/images/flexiknee-lifestyle-home.webp", "/images/flexiknee-lifestyle-work.webp", "/images/flexiknee-feature-overview.webp"].map((image, index) => (
                    <img key={image} src={image} alt={`FlexiKnee lifestyle ${index + 1}`} className="h-full min-h-[300px] rounded-[2rem] object-cover shadow-sm" loading="lazy" />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-slate-50 py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Guides & recovery education</p>
                  <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950">Learn before you buy.</h2>
                </div>
                <Link to="/guides" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">View all guides <ArrowRight className="h-4 w-4" /></Link>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {guides.map((guide) => (
                  <Link key={guide.title} to={guide.href} className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <img src={guide.image} alt={guide.title} className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Guide</p>
                      <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-950">{guide.title}</h3>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600">Read guide <ArrowRight className="h-4 w-4" /></span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section id="faq" className="bg-white py-20">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">FAQ</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950">Quick answers before checkout.</h2>
              </div>
              <Accordion type="single" collapsible className="rounded-[1.75rem] border border-slate-200 bg-white px-6 shadow-sm">
                {[
                  ["How often should I use FlexiKnee?", "Most customers use it in short daily sessions as part of a relaxed comfort routine. Always follow the included user instructions."],
                  ["Is it wireless?", "Yes. FlexiKnee is rechargeable and designed for cord-free daily use."],
                  ["Can I return it?", "Yes. The site keeps a 30-day return promise and secure checkout experience."],
                ].map(([q, a]) => (
                  <AccordionItem key={q} value={q} className="border-slate-200">
                    <AccordionTrigger className="text-left text-base font-semibold text-slate-950">{q}</AccordionTrigger>
                    <AccordionContent className="text-slate-500">{a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          <section className="bg-slate-950 py-16 text-white">
            <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8 lg:items-center">
              <div>
                <h2 className="text-4xl font-semibold tracking-[-0.04em]">Join the FlexiKnee comfort list.</h2>
                <p className="mt-4 max-w-xl text-slate-300">Get new guide drops, product updates, and future knee comfort launches.</p>
              </div>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row">
                <input value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} type="email" placeholder="Enter your email" className="h-12 flex-1 rounded-full border border-white/10 bg-white/10 px-5 text-white placeholder:text-slate-400 outline-none focus:border-blue-300" />
                <button disabled={isSubscribing} className="h-12 rounded-full bg-blue-600 px-7 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-60">
                  {isSubscribing ? "Joining..." : "Join"}
                </button>
              </form>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
