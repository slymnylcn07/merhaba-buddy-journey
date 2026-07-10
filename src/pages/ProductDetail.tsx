import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock,
  RotateCcw,
  Shield,
  Star,
  Truck,
  Zap,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getProducts, ShopifyProduct, createStorefrontCheckout } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { featurePillars, productSystem } from "@/data/product-system";

const fallbackImages = [
  "/images/flexiknee-product-main.webp",
  "/images/flexiknee-lifestyle-home.webp",
  "/images/flexiknee-lifestyle-work.webp",
  "/images/flexiknee-how-it-works.webp",
  "/images/flexiknee-touch-control.webp",
];

const guideLinks = [
  {
    title: "Do Knee Massagers Work? Realistic Expectations",
    href: "/guides/do-knee-massagers-work",
    image: "/images/flexiknee-how-it-works.webp",
  },
  {
    title: "Heat vs. Ice for Knees: What Works Best Daily?",
    href: "/guides/heat-vs-ice-for-knees",
    image: "/images/flexiknee-rapid-warming.webp",
  },
  {
    title: "Daily Knee Care Routine: Simple Habits for Comfort",
    href: "/guides/daily-knee-care-routine",
    image: "/images/flexiknee-lifestyle-work.webp",
  },
];

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "FlexiKnee™ Knee Massager",
  brand: { "@type": "Brand", name: "FlexiKnee" },
  description:
    "A smart knee comfort device with adjustable heat, massage-style vibration, wraparound support, and simple touch controls.",
  image: "https://flexi-knee.com/images/flexiknee-product-main.webp",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://flexi-knee.com/product/knee-massager-smart-red-light-and-massage-therapy",
  },
};

function formatMoney(amount?: string, currencyCode?: string) {
  const value = Number(amount || 0);
  const currency = currencyCode || "GBP";
  try {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency,
      maximumFractionDigits: value % 1 === 0 ? 0 : 2,
    }).format(value);
  } catch {
    return `${currency} ${value.toFixed(2)}`;
  }
}

export default function ProductDetail() {
  const { handle } = useParams();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [bundleQty, setBundleQty] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuying, setIsBuying] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    getProducts(20)
      .then((items) => {
        if (!active) return;
        const matched = items.find((item) => item.node.handle === handle) || items[0] || null;
        setProduct(matched);
      })
      .catch(() => {
        if (!active) return;
        setProduct(null);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [handle]);

  const variant = product?.node.variants.edges[0]?.node;
  const shopifyImages = product?.node.images.edges.map((edge) => ({
    src: edge.node.url,
    alt: edge.node.altText || product.node.title,
  })) || [];

  const gallery = useMemo(() => {
    const merged = [
      ...shopifyImages,
      ...fallbackImages.map((src) => ({ src, alt: "FlexiKnee product and lifestyle image" })),
    ];

    const seen = new Set<string>();
    return merged.filter((img) => {
      if (seen.has(img.src)) return false;
      seen.add(img.src);
      return true;
    }).slice(0, 8);
  }, [shopifyImages]);

  const productTitle = "FlexiKnee™ Knee Massager";
  const variantPrice = variant?.price.amount || product?.node.priceRange.minVariantPrice.amount || "0";
  const currency = variant?.price.currencyCode || product?.node.priceRange.minVariantPrice.currencyCode || "GBP";
  const basePrice = Number(variantPrice || 0);
  const displayPrice = formatMoney(String(basePrice * bundleQty), currency);

  const cartItem = () => {
    if (!product || !variant) return null;
    return {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: bundleQty,
      selectedOptions: variant.selectedOptions,
    };
  };

  const handleAddToCart = () => {
    const item = cartItem();
    if (!item) {
      toast.error("Product is still loading. Please try again.");
      return;
    }
    addItem(item);
    toast.success(`${bundleQty === 2 ? "2 FlexiKnee units" : "FlexiKnee"} added to cart.`);
  };

  const handleBuyNow = async () => {
    const item = cartItem();
    if (!item) {
      toast.error("Product is still loading. Please try again.");
      return;
    }

    setIsBuying(true);
    try {
      const checkoutUrl = await createStorefrontCheckout([item]);
      window.location.href = checkoutUrl;
    } catch {
      toast.error("Checkout could not be created. Please try again.");
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Helmet>
        <title>{productTitle} | FlexiKnee™</title>
        <meta
          name="description"
          content="FlexiKnee™ combines adjustable heat, massage-style vibration, wraparound support, and smart touch controls for simple daily knee comfort routines."
        />
        <link rel="canonical" href={`https://flexi-knee.com/product/${handle || "knee-massager-smart-red-light-and-massage-therapy"}`} />
        <meta property="og:title" content={`${productTitle} | FlexiKnee™`} />
        <meta
          property="og:description"
          content="A premium knee comfort device built for everyday recovery routines, simple use, and at-home support."
        />
        <meta property="og:image" content="https://flexi-knee.com/images/flexiknee-product-main.webp" />
        <script type="application/ld+json">{JSON.stringify(productJsonLd)}</script>
      </Helmet>

      <Header />

      <main>
        <section className="border-b border-slate-200 bg-[radial-gradient(circle_at_55%_10%,rgba(37,99,235,0.12),transparent_30%),linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)]">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link to="/guides" className="hover:text-blue-600">Shop</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-slate-900">FlexiKnee</span>
            </div>
          </div>
        </section>

        <section className="bg-white py-10 lg:py-14">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
            <div className="grid gap-4 lg:grid-cols-[88px_1fr]">
              <div className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:flex-col">
                {gallery.map((image, index) => (
                  <button
                    key={image.src}
                    onClick={() => setSelectedImage(index)}
                    className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border bg-white transition ${
                      selectedImage === index ? "border-blue-500 shadow-lg shadow-blue-500/10" : "border-slate-200 hover:border-slate-300"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="order-1 lg:order-2">
                <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-[2.4rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6 shadow-[0_40px_120px_-70px_rgba(15,23,42,0.55)] lg:min-h-[620px]">
                  <div className="absolute left-6 top-6 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-blue-600/20">
                    Bestseller
                  </div>
                  {isLoading ? (
                    <div className="h-64 w-64 animate-pulse rounded-[2rem] bg-slate-200" />
                  ) : (
                    <img
                      src={gallery[selectedImage]?.src || fallbackImages[0]}
                      alt={gallery[selectedImage]?.alt || productTitle}
                      className="max-h-[560px] w-full object-contain drop-shadow-2xl"
                    />
                  )}
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_100px_-70px_rgba(15,23,42,0.7)] lg:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Heat · Vibration · Compression</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-slate-950 lg:text-5xl">{productTitle}</h1>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1 text-blue-600">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-blue-600" />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-slate-700">4.8 rating</span>
                  <span className="text-sm text-slate-400">•</span>
                  <span className="text-sm text-slate-500">Built for daily comfort routines</span>
                </div>

                <p className="mt-5 text-base leading-7 text-slate-600">
                  A premium at-home knee comfort device with adjustable warmth, massage-style vibration, wraparound positioning, and a clean smart-control interface.
                </p>

                <div className="mt-6 grid gap-3">
                  {[
                    "Adjustable heat levels for a consistent routine",
                    "Massage-style vibration modes for tired legs",
                    "Wraparound fit to keep the device comfortably positioned",
                    "Rechargeable, wireless design for easy daily use",
                  ].map((item) => (
                    <div key={item} className="flex gap-3 text-sm text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-950">Choose your option</span>
                    <span className="text-sm font-semibold text-blue-600">{displayPrice}</span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      onClick={() => setBundleQty(1)}
                      className={`rounded-2xl border p-4 text-left transition ${
                        bundleQty === 1 ? "border-blue-500 bg-white shadow-lg shadow-blue-500/10" : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <span className="block text-sm font-semibold text-slate-950">Single</span>
                      <span className="mt-1 block text-sm text-slate-500">1x FlexiKnee device</span>
                    </button>
                    <button
                      onClick={() => setBundleQty(2)}
                      className={`rounded-2xl border p-4 text-left transition ${
                        bundleQty === 2 ? "border-blue-500 bg-white shadow-lg shadow-blue-500/10" : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <span className="block text-sm font-semibold text-slate-950">Duo</span>
                      <span className="mt-1 block text-sm text-slate-500">2x devices for both knees</span>
                    </button>
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  <Button onClick={handleAddToCart} disabled={!variant || isLoading} className="h-13 rounded-full bg-blue-600 text-base font-semibold text-white hover:bg-blue-700">
                    Add to Cart
                  </Button>
                  <Button onClick={handleBuyNow} disabled={!variant || isLoading || isBuying} variant="outline" className="h-13 rounded-full border-slate-300 text-base font-semibold text-slate-950 hover:bg-slate-950 hover:text-white">
                    {isBuying ? "Opening checkout..." : "Buy Now"}
                  </Button>
                </div>

                <div className="mt-6 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
                  {[
                    [Truck, "Free shipping"],
                    [RotateCcw, "30-day returns"],
                    [Shield, "Secure checkout"],
                  ].map(([Icon, text]) => (
                    <div key={String(text)} className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-3">
                      <Icon className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">{String(text)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-10">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
            {featurePillars.map((feature) => (
              <div key={feature.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-xl font-semibold text-blue-600">{feature.icon}</div>
                <h2 className="mt-4 text-base font-semibold text-slate-950">{feature.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">How it fits your routine</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950">Four simple steps. No complicated setup.</h2>
                <p className="mt-5 text-base leading-8 text-slate-600">
                  The page now tells a cleaner product story: choose your fit, select your comfort mode, relax for a short session, and return to your day.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["01", "Position", "Wrap FlexiKnee around the knee and adjust the straps for a secure fit."],
                  ["02", "Select", "Choose warmth and vibration settings from the clear touch panel."],
                  ["03", "Relax", "Use it during a short daily comfort routine at home, work, or after activity."],
                  ["04", "Repeat", "Make it part of your regular routine when your knees need support."],
                ].map(([step, title, text]) => (
                  <div key={step} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <span className="text-sm font-semibold text-blue-600">{step}</span>
                    <h3 className="mt-3 text-xl font-semibold text-slate-950">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-20 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">FlexiKnee system</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">Built for more than one product.</h2>
              <p className="mt-5 text-base leading-8 text-slate-300">
                This section creates the foundation for future knee-related products, so the brand feels like a premium recovery ecosystem from day one.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {productSystem.map((item) => (
                <Link key={item.name} to={item.href} className="group rounded-[1.6rem] border border-white/10 bg-white/5 p-4 transition hover:-translate-y-1 hover:bg-white/10">
                  <img src={item.image} alt={item.name} className="aspect-square rounded-2xl bg-white object-cover" />
                  <p className="mt-4 text-sm font-semibold text-white">{item.name}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">{item.label}</p>
                  <p className="mt-3 text-sm font-semibold text-blue-300">{item.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Expert guides</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950">Learn what fits your routine.</h2>
              </div>
              <Link to="/guides" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                View all guides <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {guideLinks.map((guide) => (
                <Link key={guide.title} to={guide.href} className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <img src={guide.image} alt={guide.title} className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105" />
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
      </main>

      <Footer />
    </div>
  );
}
