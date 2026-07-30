import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Minus,
  PackageCheck,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DeliveryEstimate } from "@/components/DeliveryEstimate";
import { BenefitIconsRow, OfferSelector, PaymentOptionsRow, TrustStrip, ProductInfoAccordion, SizeChartTrigger } from "@/components/product-page-blocks";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FlexiKneeSystem } from "@/components/FlexiKneeSystem";
import { getProductPageConfig } from "@/data/product-page-config";
import { createStorefrontCheckout, getProductByHandle, ShopifyProduct } from "@/lib/shopify";
import { getProductPath, resolveShopifyProductHandle } from "@/lib/product-config";
import { useCartStore } from "@/stores/cartStore";
import { getProductProfile } from "@/data/product-profiles";
import { PremiumProductStory } from "@/components/PremiumProductStory";
import { ProductMarketplaceRating } from "@/components/ProductMarketplaceRating";
import { ProductReviewSummary } from "@/components/ProductReviews";
import { buildMerchantOffer } from "@/lib/merchant-schema";

function formatMoney(amount?: string, currencyCode?: string) {
  const value = Number(amount || 0);
  const currency = currencyCode || "USD";

  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      maximumFractionDigits: value % 1 === 0 ? 0 : 2,
    }).format(value);
  } catch {
    return `${currency} ${value.toFixed(2)}`;
  }
}

export default function SecondaryProductDetail() {
  const { handle = "" } = useParams();
  const shopifyHandle = resolveShopifyProductHandle(handle);
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isBuying, setIsBuying] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setProduct(null);

    getProductByHandle(shopifyHandle)
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

        if (!active) return;
        setProduct(item);
        const firstAvailable = item?.node.variants.edges.find((edge) => edge.node.availableForSale)?.node;
        const firstVariant = firstAvailable || item?.node.variants.edges[0]?.node;
        setSelectedVariantId(firstVariant?.id || "");
        const initialImageIndex = item?.node.images.edges.findIndex(
          (edge) => edge.node.url === firstVariant?.image?.url,
        ) ?? -1;
        setSelectedImage(initialImageIndex >= 0 ? initialImageIndex : 0);
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
  }, [handle, shopifyHandle]);

  const node = product?.node;
  const profile = useMemo(() => getProductProfile(product || handle), [product, handle]);
  const variants = useMemo(() => node?.variants.edges.map((edge) => edge.node) || [], [node]);
  const selectedVariant = variants.find((variant) => variant.id === selectedVariantId) || variants[0];
  const options = node?.options.filter((option) => option.name.toLowerCase() !== "title") || [];
  const images = useMemo(() => node?.images.edges.map((edge) => edge.node) || [], [node]);
  const price = selectedVariant?.price || node?.priceRange.minVariantPrice;
  const compareAt =
    selectedVariant?.compareAtPrice &&
    Number(selectedVariant.compareAtPrice.amount) > Number(selectedVariant.price.amount)
      ? selectedVariant.compareAtPrice
      : null;
  const isPairable = profile.key === "compression-sleeve" || profile.key === "heated-wrap";
  const pageConfig = getProductPageConfig(profile.key);
  const unitPriceNum = price ? Number(price.amount) : 0;
  const canonical = `https://flexi-knee.com${getProductPath(handle)}`;

  useEffect(() => {
    setSelectedImage(0);
  }, [handle]);

  const selectOption = (name: string, value: string) => {
    const currentSelections = Object.fromEntries(
      (selectedVariant?.selectedOptions || []).map((option) => [option.name, option.value])
    );
    currentSelections[name] = value;

    const exactMatch = variants.find((variant) =>
      variant.selectedOptions.every((option) => currentSelections[option.name] === option.value)
    );

    const partialMatch = variants.find((variant) =>
      variant.selectedOptions.some((option) => option.name === name && option.value === value)
    );

    const nextVariant = exactMatch || partialMatch;
    if (nextVariant) {
      setSelectedVariantId(nextVariant.id);
      const variantImageIndex = images.findIndex((image) => image.url === nextVariant.image?.url);
      if (variantImageIndex >= 0) setSelectedImage(variantImageIndex);
    }
  };

  const makeCartItem = () => {
    if (!product || !selectedVariant) return null;

    return {
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      compareAtPrice: selectedVariant.compareAtPrice || null,
      quantity,
      selectedOptions: selectedVariant.selectedOptions,
    };
  };

  const handleAddToCart = () => {
    const item = makeCartItem();
    if (!item) {
      toast.error("This product is still loading. Please try again.");
      return;
    }
    if (!selectedVariant.availableForSale) {
      toast.error("This option is currently unavailable.");
      return;
    }

    addItem(item);
    toast.success(`${node?.title || "Product"} added to cart.`);
  };

  const handleBuyNow = async () => {
    const item = makeCartItem();
    if (!item || !selectedVariant?.availableForSale) {
      toast.error("Please choose an available option.");
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

  const productJsonLd = useMemo(() => {
    if (!node || !price) return null;
    const productSchema = {
      "@type": "Product",
      "@id": `${canonical}#product`,
      name: profile.h1,
      brand: { "@type": "Brand", name: "FlexiKnee" },
      description: profile.seoDescription,
      image: images.map((image) => image.url),
      offers: variants.map((variant) => buildMerchantOffer({
        sku: variant.sku || undefined,
        availability: variant.availableForSale,
        price: variant.price.amount,
        priceCurrency: variant.price.currencyCode,
        url: canonical,
      })),
    };

    return {
      "@context": "https://schema.org",
      "@graph": [
        productSchema,
        {
          "@type": "BreadcrumbList",
          "@id": `${canonical}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://flexi-knee.com/" },
            { "@type": "ListItem", position: 2, name: "Shop", item: "https://flexi-knee.com/shop" },
            { "@type": "ListItem", position: 3, name: profile.h1, item: canonical },
          ],
        },
      ],
    };
  }, [node, price, profile.h1, profile.seoDescription, images, variants, canonical]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-slate-950">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid animate-pulse gap-8 lg:grid-cols-2">
            <div className="aspect-square rounded-[2rem] bg-slate-100" />
            <div className="space-y-5 py-4">
              <div className="h-4 w-40 rounded bg-slate-100" />
              <div className="h-12 w-4/5 rounded bg-slate-100" />
              <div className="h-6 w-32 rounded bg-slate-100" />
              <div className="h-32 rounded-3xl bg-slate-100" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product || !node) {
    return (
      <div className="min-h-screen bg-white text-slate-950">
        <Helmet>
          <title>Product not found | FlexiKnee</title>
          <meta name="robots" content="noindex, follow" />
          <link rel="canonical" href={canonical} />
        </Helmet>
        <Header />
        <main className="mx-auto max-w-3xl px-4 py-24 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Product unavailable</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">We could not find this product.</h1>
          <p className="mt-4 text-slate-600">
            It may not be published to the Headless sales channel yet, or its Shopify handle may have changed.
          </p>
          <Link to="/shop" className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white">
            Return to shop <ArrowRight className="h-4 w-4" />
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const mainImage = images[selectedImage] || images[0];

  return (
    <div className="min-h-screen bg-white pb-24 text-slate-950 lg:pb-0">
      <Helmet>
        <title>{profile.seoTitle}</title>
        <meta name="description" content={profile.seoDescription} />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={profile.seoTitle} />
        <meta property="og:description" content={profile.seoDescription} />
        {images[0] && <meta property="og:image" content={images[0].url} />}
        <meta property="og:site_name" content="FlexiKnee" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={profile.seoTitle} />
        <meta name="twitter:description" content={profile.seoDescription} />
        {images[0] && <meta name="twitter:image" content={images[0].url} />}
        {productJsonLd && <script type="application/ld+json">{JSON.stringify(productJsonLd)}</script>}
      </Helmet>

      <Header />

      <main data-seo-page="product" data-seo-product={handle}>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link to="/shop" className="hover:text-blue-600">Shop</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="max-w-[16rem] truncate text-slate-900">{profile.h1}</span>
            </div>
          </div>
        </section>

        <section className="bg-[radial-gradient(circle_at_80%_10%,rgba(37,99,235,0.10),transparent_32%),linear-gradient(180deg,#fff_0%,#f8fbff_100%)] py-8 lg:py-14">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 xl:grid-cols-[minmax(0,1fr)_minmax(420px,540px)] xl:items-start lg:px-8">
            <div className="min-w-0">
              <div className="flex min-h-[360px] items-center justify-center overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_35px_100px_-75px_rgba(15,23,42,0.8)] sm:min-h-[520px]">
                {mainImage ? (
                  <img
                    src={mainImage.url}
                    alt={mainImage.altText || node.title}
                    className="max-h-[650px] w-full rounded-[1.5rem] object-contain"
                    fetchPriority="high"
                  />
                ) : (
                  <ShoppingBag className="h-20 w-20 text-slate-200" />
                )}
              </div>

              {images.length > 1 && (
                <div className="mt-4 flex snap-x gap-3 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={`${image.url}-${index}`}
                      type="button"
                      onClick={() => setSelectedImage(index)}
                      className={`h-20 w-20 shrink-0 snap-start overflow-hidden rounded-2xl border bg-white p-1 transition sm:h-24 sm:w-24 ${
                        selectedImage === index ? "border-blue-500 shadow-md" : "border-slate-200 hover:border-slate-400"
                      }`}
                      aria-label={`View product image ${index + 1}`}
                    >
                      <img src={image.url} alt={image.altText || node.title} className="h-full w-full rounded-xl object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <aside className="min-w-0 xl:sticky xl:top-24 xl:self-start">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_35px_120px_-80px_rgba(15,23,42,0.75)] lg:p-8">
                <h1 className="text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-4xl">{profile.h1}</h1>
                <ProductMarketplaceRating handle={handle} showCount linkToReviews className="mt-3" />
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">{profile.eyebrow}</p>
                <p className="mt-3 text-sm font-medium text-blue-700">Best for: {profile.bestFor}</p>
                <p className="mt-4 text-base leading-7 text-slate-600">{profile.summary}</p>
                <BenefitIconsRow benefits={pageConfig.benefits} />



                {options.map((option) => {
                  const chosen = selectedVariant?.selectedOptions.find((selected) => selected.name === option.name)?.value;
                  // 3'e kadar secenek: pill; fazlasi: sik acilir menu
                  if (option.values.length > 3) {
                    return (
                      <div key={option.name} className="mt-6">
                        <div className="mb-2 flex items-center justify-between">
                          <p className="text-sm font-semibold text-slate-900">{option.name}</p>
                          {option.name.toLowerCase() === "size" && <SizeChartTrigger profileKey={profile.key} />}
                        </div>
                        <Select value={chosen} onValueChange={(value) => selectOption(option.name, value)}>
                          <SelectTrigger className="h-12 w-full rounded-2xl border-slate-300 bg-white px-4 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-blue-500">
                            <SelectValue placeholder={`Select ${option.name.toLowerCase()}`} />
                          </SelectTrigger>
                          <SelectContent className="max-h-72 rounded-2xl border-slate-200 bg-white shadow-xl">
                            {option.values.map((value) => (
                              <SelectItem key={value} value={value} className="rounded-xl py-2.5 text-sm">
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    );
                  }
                  return (
                    <div key={option.name} className="mt-6">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-slate-900">{option.name}</p>
                        <span className="flex items-center gap-3">
                          {option.name.toLowerCase() === "size" && <SizeChartTrigger profileKey={profile.key} />}
                          <span className="text-xs text-slate-500">{chosen}</span>
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {option.values.map((value) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => selectOption(option.name, value)}
                            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                              chosen === value
                                ? "border-slate-950 bg-slate-950 text-white"
                                : "border-slate-300 bg-white text-slate-700 hover:border-slate-500"
                            }`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}

                <OfferSelector
                  qty={quantity as 1 | 2}
                  onSelect={(q) => setQuantity(q)}
                  unitPrice={unitPriceNum}
                  unitCompareAt={compareAt ? Number(compareAt.amount) : null}
                  currencyCode={price?.currencyCode}
                  freeShipOnSingle={pageConfig.freeShipOnSingle}
                  duoDiscountPct={pageConfig.duoDiscountPct}
                  formatMoney={formatMoney}
                />

                <div className="mt-6 grid gap-3">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={!selectedVariant?.availableForSale}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    {selectedVariant?.availableForSale
                      ? `Add to cart - ${formatMoney(String(quantity === 2 ? unitPriceNum * 2 * (1 - pageConfig.duoDiscountPct / 100) : unitPriceNum), price?.currencyCode)}`
                      : "Currently unavailable"}
                  </button>
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    disabled={!selectedVariant?.availableForSale || isBuying}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isBuying ? "Opening checkout..." : "Buy now"}
                    {!isBuying && <ArrowRight className="h-4 w-4" />}
                  </button>
                </div>

                <DeliveryEstimate className="mt-4" freeShipping={pageConfig.freeShipOnSingle || quantity === 2} />

                <PaymentOptionsRow />

                <TrustStrip />

                <ProductInfoAccordion howToUse={pageConfig.howToUse} faqs={profile.faqs} />
              </div>
            </aside>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Why it fits the system</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">A clear job, without unnecessary claims.</h2>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {profile.benefitCards.map((benefit) => (
                <div key={benefit.title} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  <h3 className="mt-4 text-lg font-semibold text-slate-950">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{benefit.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-14 text-white lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">What to expect</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Practical features for a repeatable routine.</h2>
              <div className="mt-7 grid gap-3">
                {profile.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-blue-300" />
                    <span className="text-sm leading-6 text-slate-200">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
              <h3 className="text-xl font-semibold">How to start</h3>
              <div className="mt-6 space-y-6">
                {profile.steps.map((step, index) => (
                  <div key={step.title} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold">{index + 1}</span>
                    <div>
                      <p className="font-semibold">{step.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <PremiumProductStory
          productName={node.title}
          productKey={profile.key}
          eyebrow={profile.eyebrow}
          headline={`See how ${node.title.replace("FlexiKnee ", "")} fits into real life.`}
          intro={profile.summary}
          visuals={profile.visuals}
          highlights={profile.highlights}
        />

        <ProductReviewSummary handle={handle} productName={node.title} />

        <section className="bg-white py-14 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Product information</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">Details, care and sensible use.</h2>
              {node.description && <p className="mt-5 whitespace-pre-line text-base leading-8 text-slate-600">{node.description}</p>}
              <div className="mt-7 rounded-[1.75rem] border border-blue-100 bg-blue-50 p-6">
                <p className="text-sm font-semibold text-blue-950">General wellness notice</p>
                <p className="mt-2 text-sm leading-6 text-blue-900/80">
                  FlexiKnee products support general comfort routines and are not intended to diagnose, treat or replace professional medical care.
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-slate-950">Care</h3>
                <ul className="mt-4 space-y-3">
                  {profile.care.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600"><Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />{item}</li>)}
                </ul>
              </div>
              <div className="rounded-[1.75rem] border border-amber-200 bg-amber-50 p-6">
                <h3 className="text-lg font-semibold text-amber-950">Safety</h3>
                <ul className="mt-4 space-y-3">
                  {profile.safety.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-amber-900/80"><Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />{item}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-14 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Learn before you buy</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">Guides matched to this product.</h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {profile.guides.map((guide) => (
                <Link key={guide.href} to={guide.href} className="group flex flex-col rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="text-base font-semibold text-slate-950">{guide.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{guide.description}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-blue-600">Read guide <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-14 lg:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-semibold tracking-[-0.04em] text-slate-950">Frequently asked questions</h2>
            <Accordion type="single" collapsible className="mt-8 rounded-[2rem] border border-slate-200 bg-white px-6">
              {profile.faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left text-base font-semibold text-slate-950">{faq.question}</AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-7 text-slate-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

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

      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-15px_40px_-25px_rgba(15,23,42,0.45)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-950">{node.title}</p>
            {price && (
              <p className="flex items-baseline gap-1.5 text-xs text-slate-500">
                {compareAt && <s className="text-[11px] text-slate-400">{formatMoney(compareAt.amount, compareAt.currencyCode)}</s>}
                <span className="font-semibold text-slate-900">{formatMoney(price.amount, price.currencyCode)}</span>
              </p>
            )}
          </div>
          <button type="button" onClick={handleAddToCart} disabled={!selectedVariant?.availableForSale} className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white disabled:bg-slate-300">
            Add to cart
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
