import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowRight,
  Check,
  ChevronRight,
  RotateCcw,
  Shield,
  Truck,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DeliveryEstimate } from "@/components/DeliveryEstimate";
import { BenefitIconsRow, OfferSelector, PaymentOptionsRow, TrustStrip, ProductInfoAccordion } from "@/components/product-page-blocks";
import { getProductPageConfig } from "@/data/product-page-config";
import { LIMITED_WARRANTY_YEARS, RETURN_WINDOW_DAYS } from "@/lib/policy-config";
import { VideoReviews } from "@/components/VideoReviews";
import { ProductReviews } from "@/components/ProductReviews";
import { KnowBeforeYouBuy } from "@/components/KnowBeforeYouBuy";
import { getProductByHandle, ShopifyProduct, createStorefrontCheckout } from "@/lib/shopify";
import { PRIMARY_PRODUCT_HANDLE } from "@/lib/product-config";
import { useCartStore } from "@/stores/cartStore";
import { featurePillars } from "@/data/product-system";
import { FlexiKneeSystem } from "@/components/FlexiKneeSystem";
import { PremiumProductStory } from "@/components/PremiumProductStory";
import { ProductMarketplaceRating } from "@/components/ProductMarketplaceRating";
import { buildMerchantOffer } from "@/lib/merchant-schema";
import thumbMassagerExpectations from "@/assets/guide-thumb-massager-expectations.jpg";
import thumbDailyRoutineNew from "@/assets/guide-thumb-daily-routine-new.jpg";
import thumbHeatVsIce from "@/assets/guide-thumb-heat-vs-ice.webp";

const fallbackGallery = [
  { src: "/images/shopify-gallery/flexiknee-gallery-01-main.webp", alt: "FlexiKnee knee massager main product image" },
  { src: "/images/shopify-gallery/flexiknee-gallery-02-lifestyle.webp", alt: "FlexiKnee lifestyle use at home" },
  { src: "/images/shopify-gallery/flexiknee-gallery-03-controls.webp", alt: "FlexiKnee touch control panel" },
  { src: "/images/shopify-gallery/flexiknee-gallery-04-heat.webp", alt: "FlexiKnee adjustable warmth feature" },
  { src: "/images/shopify-gallery/flexiknee-gallery-05-vibration.webp", alt: "FlexiKnee gentle vibration feature" },
  { src: "/images/shopify-gallery/flexiknee-gallery-06-routine.webp", alt: "FlexiKnee four step routine" },
  { src: "/images/shopify-gallery/flexiknee-gallery-07-system.webp", alt: "FlexiKnee comfort system features" },
];

const massagerStoryVisuals = [
  {
    title: "A calmer evening routine",
    text: "Settle in with adjustable warmth and massage-style vibration during a calm evening routine at home.",
    image: "/images/product-stories/massager-evening-reading.webp",
    alt: "Woman relaxing on a sofa while using the FlexiKnee knee massager in the evening",
  },
  {
    title: "Comfort that feels easy to set up",
    text: "Adjustable wraparound straps help keep the device comfortably positioned while the touch controls stay easy to reach.",
    image: "/images/product-stories/massager-closeup-comfort.webp",
    alt: "Close-up of the FlexiKnee knee massager strapped around the knee in a premium home environment",
  },
  {
    title: "Made to fit around work-from-home days",
    text: "Cordless use makes it easy to include FlexiKnee during reading, laptop time or a quiet break at home.",
    image: "/images/product-stories/massager-workday-routine.webp",
    alt: "Woman working at a laptop while wearing the FlexiKnee knee massager",
  },
  {
    title: "A premium reset after activity",
    text: "Add a short FlexiKnee session to your wind-down routine after exercise or a busy day on your feet.",
    image: "/images/product-stories/massager-post-workout.webp",
    alt: "Woman using the FlexiKnee knee massager after exercise in a bright fitness-inspired room",
  },
];

const productFaqs = [
  { question: "Is FlexiKnee wireless?", answer: "Yes. It is rechargeable and designed for simple, cord-free daily routines, use it on the couch, at your desk, or anywhere at home." },
  { question: "How long should I use it per session?", answer: "A 15-minute session is the sweet spot for most people, 1-3 times daily. Consistency over weeks matters more than long single sessions." },
  { question: "What warranty is included?", answer: `The main FlexiKnee device includes a ${LIMITED_WARRANTY_YEARS}-year limited warranty covering eligible manufacturing faults. Accidental damage, misuse and normal wear are not covered.` },
  { question: "Can I return it?", answer: `Yes. Eligible orders are covered by our ${RETURN_WINDOW_DAYS}-day return policy, counted from the day your order is delivered. Contact us with your order number and we will guide you through it.` },
  { question: "Is this a medical treatment?", answer: "No. FlexiKnee is a comfort and recovery support product, not a medical device. If you have a diagnosed condition, check with your healthcare provider first." },
];

const relatedGuides = [
  {
    title: "Do Knee Massagers Work? Realistic Expectations",
    href: "/guides/do-knee-massagers-work",
    image: thumbMassagerExpectations,
  },
  {
    title: "Daily Knee Care Routine: Simple Habits for Comfort",
    href: "/guides/daily-knee-care-routine",
    image: thumbDailyRoutineNew,
  },
  {
    title: "Heat vs. Ice for Knees: What Works Best Daily?",
    href: "/guides/heat-vs-ice-for-knees",
    image: thumbHeatVsIce,
  },
];

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

    setProduct(null);
    setSelectedImage(0);

    const requestedHandle = handle || PRIMARY_PRODUCT_HANDLE;

    getProductByHandle(requestedHandle)
      .then(async (item) => {
        if (!active) return;

        const firstImageUrl = item?.node.images.edges[0]?.node.url;
        if (firstImageUrl) {
          await new Promise<void>((resolve) => {
            const image = new Image();
            image.onload = () => resolve();
            image.onerror = () => resolve();
            image.src = firstImageUrl;
          });
        }

        if (active) setProduct(item);
      })
      .catch(() => {
        if (active) setProduct(null);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [handle]);

  const variant = product?.node.variants.edges[0]?.node;
  const variantPrice = variant?.price.amount || product?.node.priceRange.minVariantPrice.amount || "59.99";
  const currency = variant?.price.currencyCode || product?.node.priceRange.minVariantPrice.currencyCode || "GBP";
  const basePrice = Number(variantPrice || 0);
  const pageConfig = getProductPageConfig("main");
  const displayPrice = formatMoney(String(basePrice * bundleQty), currency);
  const compareAtAmount = variant?.compareAtPrice?.amount
    ? Number(variant.compareAtPrice.amount)
    : null;
  const compareAtDisplay =
    compareAtAmount && compareAtAmount > basePrice
      ? formatMoney(String(compareAtAmount * bundleQty), currency)
      : null;
  const productTitle = "FlexiKnee Smart Heated Knee Massager";
  const publicHandle = handle || PRIMARY_PRODUCT_HANDLE;

  const shopifyImages =
    product?.node.images.edges.map((edge) => ({
      src: edge.node.url,
      alt: edge.node.altText || productTitle,
    })) || [];

  const gallery = shopifyImages.length > 0 ? shopifyImages : fallbackGallery;

  useEffect(() => {
    setSelectedImage(0);
  }, [handle, shopifyImages.length]);

  const productJsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://flexi-knee.com/product/${publicHandle}#product`,
    name: productTitle,
    brand: { "@type": "Brand", name: "FlexiKnee" },
    category: "Knee massager",
    description:
      "A cordless knee comfort device with adjustable warmth, an integrated red light mode, three massage vibration modes, and a wraparound fit with simple touch controls.",
    image: gallery.map((image) => image.src),
    // Dogrulanmis teknik veriler (tedarikci teknik sayfasi). Tahmin edilen deger yok.
    additionalProperty: (pageConfig.specs || []).map((row) => ({
      "@type": "PropertyValue",
      name: row.label,
      value: row.value,
    })),
    weight: { "@type": "QuantitativeValue", value: 830, unitCode: "GRM" },
    offers: buildMerchantOffer({
      availability: Boolean(variant?.availableForSale),
      price: basePrice || 59.99,
      priceCurrency: currency,
      url: `https://flexi-knee.com/product/${publicHandle}`,
      sku: variant?.sku || undefined,
    }),
  }), [basePrice, currency, gallery, pageConfig.specs, publicHandle, variant?.availableForSale, variant?.sku]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-slate-950">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid animate-pulse gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(420px,540px)]">
            <div className="h-[420px] rounded-[2rem] bg-slate-100 sm:h-[560px] lg:h-[710px]" />
            <div className="space-y-5 rounded-[2rem] border border-slate-100 p-6 lg:p-8">
              <div className="h-4 w-40 rounded bg-slate-100" />
              <div className="h-14 w-4/5 rounded bg-slate-100" />
              <div className="h-24 rounded-3xl bg-slate-100" />
              <div className="h-40 rounded-3xl bg-slate-100" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product || !variant) {
    return (
      <div className="min-h-screen bg-white text-slate-950">
        <Helmet>
          <title>Product unavailable | FlexiKnee</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <Header />
        <main className="mx-auto max-w-3xl px-4 py-24 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Product unavailable</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">The product could not be loaded.</h1>
          <p className="mt-4 text-slate-600">Please return to the shop and try again.</p>
          <Link to="/shop" className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white">
            Return to shop <ArrowRight className="h-4 w-4" />
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const cartItem = () => {
    if (!product || !variant) return null;

    return {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      compareAtPrice: variant.compareAtPrice || null,
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
    <div className="min-h-screen bg-white pb-24 text-slate-950 lg:pb-0">
      <Helmet>
        <title>{productTitle} | FlexiKnee</title>
        <meta
          name="description"
          content="FlexiKnee is a smart at home knee comfort device with adjustable heat, massage style vibration, wraparound support, and simple touch controls."
        />
        <link rel="canonical" href={`https://flexi-knee.com/product/${publicHandle}`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`${productTitle} | FlexiKnee`} />
        <meta property="og:description" content="A premium knee comfort device for simple daily recovery routines." />
        <meta property="og:image" content="https://flexi-knee.com/images/shopify-gallery/flexiknee-gallery-01-main.webp" />
        <script type="application/ld+json">{JSON.stringify(productJsonLd)}</script>
      </Helmet>

      <Header />

      <main data-seo-page="product" data-seo-product={publicHandle}>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link to="/shop" className="hover:text-blue-600">Shop</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="max-w-[16rem] truncate text-slate-900">{productTitle}</span>
            </div>
          </div>
        </section>

        <section className="bg-[radial-gradient(circle_at_72%_16%,rgba(37,99,235,0.11),transparent_30%),linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] py-5 sm:py-8 lg:py-14">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 xl:grid-cols-[minmax(0,1fr)_minmax(420px,540px)] xl:items-start xl:gap-10 lg:px-8">
            <div className="min-w-0">
              <div className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white p-2 shadow-[0_35px_110px_-80px_rgba(15,23,42,0.75)] sm:rounded-[2.2rem] sm:p-3 lg:rounded-[2.6rem] lg:p-4">
                <img
                  src={gallery[selectedImage]?.src || fallbackGallery[0].src}
                  alt={gallery[selectedImage]?.alt || productTitle}
                  className="h-[360px] w-full rounded-[1.45rem] object-contain object-center sm:h-[500px] sm:rounded-[1.8rem] lg:h-[710px] lg:rounded-[2.1rem]"
                  fetchPriority="high"
                />
              </div>

              <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
                {gallery.map((image, index) => (
                  <button
                    key={`${image.src}-${index}`}
                    onClick={() => setSelectedImage(index)}
                    className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border bg-white p-1 transition sm:h-24 sm:w-24 ${
                      selectedImage === index ? "border-blue-500 shadow-lg shadow-blue-500/10" : "border-slate-200 hover:border-slate-300"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img src={image.src} alt={image.alt} className="h-full w-full rounded-xl object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <aside className="min-w-0 xl:sticky xl:top-24 xl:self-start">
              <div className="rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-[0_35px_120px_-80px_rgba(15,23,42,0.7)] sm:p-6 lg:rounded-[2rem] lg:p-8">
                <button
                  type="button"
                  onClick={() => document.getElementById("product-reviews")?.scrollIntoView({ behavior: "smooth" })}
                  className="group flex flex-wrap items-center gap-2"
                  aria-label="Jump to buyer reviews"
                >
                  <ProductMarketplaceRating handle={publicHandle} showCount />
                </button>
                <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-4xl lg:text-5xl">{productTitle}</h1>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Smart daily knee comfort</p>

                <p className="mt-5 text-base leading-7 text-slate-600">
                  FlexiKnee combines adjustable warmth, massage style vibration, and a secure wraparound fit for simple at home comfort routines.
                </p>

                <BenefitIconsRow benefits={pageConfig.benefits} />

                <OfferSelector
                  qty={bundleQty as 1 | 2}
                  onSelect={(q) => setBundleQty(q)}
                  unitPrice={basePrice}
                  unitCompareAt={compareAtAmount}
                  currencyCode={currency}
                  freeShipOnSingle={pageConfig.freeShipOnSingle}
                  duoDiscountPct={pageConfig.duoDiscountPct}
                  formatMoney={formatMoney}
                />

                <div className="mt-5 grid gap-3">
                  <Button onClick={handleAddToCart} disabled={!variant || isLoading} className="h-13 rounded-full bg-blue-600 text-base font-semibold text-white hover:bg-blue-700">
                    Add to Cart - {bundleQty === 2 ? formatMoney(String(basePrice * 2 * (1 - pageConfig.duoDiscountPct / 100)), currency) : displayPrice}
                  </Button>
                  <Button onClick={handleBuyNow} disabled={!variant || isLoading || isBuying} variant="outline" className="h-13 rounded-full border-slate-300 text-base font-semibold text-slate-950 hover:bg-slate-950 hover:text-white">
                    {isBuying ? "Opening checkout..." : "Buy Now"}
                  </Button>
                </div>

                <DeliveryEstimate className="mt-4" freeShipping={pageConfig.freeShipOnSingle || bundleQty === 2} />

                <PaymentOptionsRow />

                <TrustStrip />

                <ProductInfoAccordion howToUse={pageConfig.howToUse} faqs={productFaqs} specs={pageConfig.specs} />
              </div>
            </aside>
          </div>
        </section>

        <VideoReviews />

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Why people choose it</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-5xl">
                  Built around short routines, not complicated claims.
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-600">
                  Adjustable warmth, massage-style vibration and simple controls make it easy to build a repeatable comfort routine.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {featurePillars.map((feature) => (
                  <div key={feature.title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl font-semibold text-blue-600">{feature.icon}</div>
                    <h3 className="mt-5 text-xl font-semibold text-slate-950">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{feature.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">How it fits your day</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-5xl">
                A simple routine flow.
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              {[
                ["01", "Position", "Wrap FlexiKnee around your knee and adjust the straps."],
                ["02", "Select", "Choose warmth and vibration settings from the touch panel."],
                ["03", "Relax", "Use it during a short calm routine at home or after activity."],
                ["04", "Repeat", "Keep the routine consistent when your knees need support."],
              ].map(([step, title, text]) => (
                <div key={step} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="text-sm font-semibold text-blue-600">{step}</span>
                  <h3 className="mt-4 text-xl font-semibold text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PremiumProductStory
          productName="FlexiKnee Smart Heated Knee Massager"
          productKey="massager"
          eyebrow="The flagship FlexiKnee experience"
          headline="More than a product image, a routine people can picture themselves using."
          intro="Designed to feel easy at home, whether you are relaxing, reading or winding down after activity."
          visuals={massagerStoryVisuals}
          highlights={["Adjustable warmth", "Massage-style vibration", "Wireless wraparound design", "Simple touch control"]}
        />

        <KnowBeforeYouBuy />

        <ProductReviews />

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Explore the system</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-5xl">
                  Explore the full FlexiKnee support lineup.
                </h2>
              </div>
              <Link to="/guides" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                Visit knee comfort hub <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

<FlexiKneeSystem />
          </div>
        </section>

        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Learn before you buy</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-5xl">
                  Related guides for smarter choices.
                </h2>
              </div>
              <Link to="/guides" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                View all guides <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {relatedGuides.map((guide) => (
                <Link key={guide.title} to={guide.href} className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <img src={guide.image} alt={guide.title} className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Guide</p>
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

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">FAQ</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-slate-950">Product questions.</h2>
            </div>
            <Accordion type="single" collapsible className="rounded-[2rem] border border-slate-200 bg-white px-6 shadow-sm">
              {productFaqs.map(({ question: q, answer: a }) => (
                <AccordionItem key={q} value={q} className="border-slate-200">
                  <AccordionTrigger className="text-left text-base font-semibold text-slate-950">{q}</AccordionTrigger>
                  <AccordionContent className="text-slate-600">{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-18px_60px_-35px_rgba(15,23,42,0.65)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-slate-500">FlexiKnee Massager</p>
            <p className="flex items-baseline gap-1.5 text-base font-semibold text-slate-950">
              {compareAtDisplay && <s className="text-xs font-normal text-slate-400">{compareAtDisplay}</s>}
              {displayPrice}
            </p>
          </div>
          <Button onClick={handleAddToCart} disabled={!variant || isLoading} className="h-11 rounded-full bg-blue-600 px-5 text-sm font-semibold text-white">
            Add
          </Button>
          <Button onClick={handleBuyNow} disabled={!variant || isLoading || isBuying} className="h-11 rounded-full bg-slate-950 px-5 text-sm font-semibold text-white">
            Buy
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
