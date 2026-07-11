import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  ChevronRight,
  CircleHelp,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { PRIMARY_PRODUCT_HANDLE } from "@/lib/product-config";
import { getProductProfile } from "@/data/product-profiles";

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "FlexiKnee Shop — Knee Comfort & Recovery Products",
  url: "https://flexi-knee.com/shop",
};

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

export default function Shop() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getProducts(30)
      .then((list) => {
        if (!active) return;
        const sorted = [...list].sort((a, b) => {
          if (a.node.handle === PRIMARY_PRODUCT_HANDLE) return -1;
          if (b.node.handle === PRIMARY_PRODUCT_HANDLE) return 1;
          return a.node.title.localeCompare(b.node.title);
        });
        setProducts(sorted);
      })
      .catch(() => setProducts([]))
      .finally(() => active && setIsLoading(false));

    return () => {
      active = false;
    };
  }, []);

  const primaryProduct = products.find((product) => product.node.handle === PRIMARY_PRODUCT_HANDLE);
  const supportProducts = products.filter((product) => product.node.handle !== PRIMARY_PRODUCT_HANDLE);

  const itemListJsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://flexi-knee.com/product/${product.node.handle}`,
      name: product.node.title,
    })),
  }), [products]);

  return (
    <>
      <Helmet>
        <title>Shop Knee Comfort & Recovery Products | FlexiKnee™</title>
        <meta
          name="description"
          content="Explore FlexiKnee products for warming routines, compression support, lower-leg recovery and foot-to-knee comfort — including the FlexiKnee Sport Orthopedic Insoles."
        />
        <link rel="canonical" href="https://flexi-knee.com/shop" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flexi-knee.com/shop" />
        <meta property="og:title" content="Shop Knee Comfort & Recovery Products | FlexiKnee™" />
        <meta property="og:description" content="One premium knee device, plus focused products for warmth, compression, travel recovery and foot support." />
        <script type="application/ld+json">{JSON.stringify(collectionJsonLd)}</script>
        {products.length > 0 && <script type="application/ld+json">{JSON.stringify(itemListJsonLd)}</script>}
      </Helmet>

      <div className="min-h-screen bg-white text-slate-950">
        <Header />

        <main>
          <section className="overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_82%_12%,rgba(37,99,235,0.13),transparent_30%),linear-gradient(180deg,#ffffff_0%,#f7faff_100%)] py-14 md:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.72fr]">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">The FlexiKnee system</p>
                  <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-6xl">
                    One clear product for each part of your routine.
                  </h1>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                    Start with the premium Smart Heated Knee Massager, or choose a focused solution for compression, simple warmth, lower-leg recovery or foot support.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
                    <Truck className="mx-auto h-5 w-5 text-blue-600" />
                    <p className="mt-2 text-xs font-semibold text-slate-800">Free shipping over $24.99</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
                    <ShieldCheck className="mx-auto h-5 w-5 text-blue-600" />
                    <p className="mt-2 text-xs font-semibold text-slate-800">Secure checkout</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
                    <CircleHelp className="mx-auto h-5 w-5 text-blue-600" />
                    <p className="mt-2 text-xs font-semibold text-slate-800">30-day returns from delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {isLoading ? (
                <div className="space-y-8">
                  <div className="h-[430px] animate-pulse rounded-[2.25rem] bg-slate-100" />
                  <div className="grid gap-6 md:grid-cols-2">
                    {[0, 1, 2, 3].map((item) => <div key={item} className="h-96 animate-pulse rounded-[2rem] bg-slate-100" />)}
                  </div>
                </div>
              ) : products.length === 0 ? (
                <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-10 text-center">
                  <h2 className="text-2xl font-semibold">Products could not be loaded.</h2>
                  <p className="mt-3 text-slate-600">Confirm that the products are published to the Shopify Headless sales channel, then refresh this page.</p>
                  <Link to="/guides" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                    Browse the guide library <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <>
                  {primaryProduct && (() => {
                    const node = primaryProduct.node;
                    const image = node.images.edges[0]?.node;
                    const price = node.priceRange.minVariantPrice;
                    return (
                      <article className="overflow-hidden rounded-[2.4rem] border border-slate-200 bg-slate-950 text-white shadow-[0_35px_110px_-70px_rgba(15,23,42,0.9)]">
                        <div className="grid lg:grid-cols-[1.06fr_0.94fr]">
                          <Link to={`/product/${node.handle}`} className="group relative flex min-h-[360px] items-center justify-center overflow-hidden bg-white p-5 sm:min-h-[480px]">
                            {image && (
                              <img
                                src={image.url}
                                alt={image.altText || node.title}
                                className="h-full max-h-[560px] w-full object-contain transition duration-700 group-hover:scale-[1.025]"
                                fetchPriority="high"
                              />
                            )}
                            <span className="absolute left-5 top-5 rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-lg">Featured · Best seller</span>
                          </Link>
                          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">The complete knee routine</p>
                            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{node.title}</h2>
                            <p className="mt-4 max-w-xl text-base leading-8 text-slate-300">
                              The premium all-in-one option for users who want adjustable warmth, massage-style vibration and a dedicated at-home knee routine.
                            </p>
                            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                              {["Adjustable warming routine", "Massage-style vibration", "Wireless wraparound design", "Dedicated premium product page"].map((item) => (
                                <div key={item} className="flex items-center gap-2 text-sm text-slate-200">
                                  <Check className="h-4 w-4 text-blue-300" /> {item}
                                </div>
                              ))}
                            </div>
                            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                              <Link to={`/product/${node.handle}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-blue-50">
                                Explore the main FlexiKnee <ArrowRight className="h-4 w-4" />
                              </Link>
                              <p className="text-lg font-semibold text-white">From {formatMoney(price.amount, price.currencyCode)}</p>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })()}

                  <div className="mt-16 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Focused support products</p>
                      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">Choose by the job you need done.</h2>
                    </div>
                    <Link to="/knee-quiz" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
                      Not sure? Take the quiz <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className="mt-8 grid gap-6 md:grid-cols-2">
                    {supportProducts.map((product) => {
                      const node = product.node;
                      const image = node.images.edges[0]?.node;
                      const price = node.priceRange.minVariantPrice;
                      const profile = getProductProfile(product);

                      return (
                        <article key={node.id} className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                          <Link to={`/product/${node.handle}`} className="grid h-full sm:grid-cols-[0.9fr_1.1fr]">
                            <div className="relative flex min-h-[270px] items-center justify-center overflow-hidden bg-slate-50 p-4">
                              {image ? (
                                <img src={image.url} alt={image.altText || node.title} loading="lazy" className="h-full max-h-[330px] w-full object-contain transition duration-500 group-hover:scale-105" />
                              ) : (
                                <Sparkles className="h-14 w-14 text-slate-200" />
                              )}
                              <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-sm">{profile.badge}</span>
                            </div>
                            <div className="flex flex-col p-6">
                              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">{profile.eyebrow}</p>
                              <h3 className="mt-3 text-xl font-semibold leading-snug tracking-[-0.02em] text-slate-950">{node.title}</h3>
                              <p className="mt-3 text-sm leading-7 text-slate-600">{profile.cardCopy}</p>
                              <div className="mt-4 rounded-2xl bg-slate-50 p-3">
                                <p className="text-xs font-semibold text-slate-500">BEST FOR</p>
                                <p className="mt-1 text-sm font-medium text-slate-800">{profile.bestFor}</p>
                              </div>
                              <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                                <div>
                                  <p className="text-xs text-slate-500">From</p>
                                  <p className="text-xl font-semibold text-slate-950">{formatMoney(price.amount, price.currencyCode)}</p>
                                </div>
                                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                                  View product <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                </span>
                              </div>
                            </div>
                          </Link>
                        </article>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </section>

          {products.length > 1 && (
            <section className="border-y border-slate-200 bg-slate-50 py-14 md:py-20">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Quick comparison</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">Compare by purpose, not by feature count.</h2>
                  <p className="mt-4 text-base leading-8 text-slate-600">The best choice is the product that matches the routine you will actually use consistently.</p>
                </div>

                <div className="mt-8 overflow-x-auto rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                  <table className="w-full min-w-[850px] border-collapse text-left">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-950 text-white">
                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider">Product</th>
                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider">Best use</th>
                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider">Heat</th>
                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider">Massage</th>
                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider">Support</th>
                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider">Portability</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => {
                        const isPrimary = product.node.handle === PRIMARY_PRODUCT_HANDLE;
                        const profile = getProductProfile(product);
                        const comparison = isPrimary
                          ? { use: "Complete knee routine", heat: "Adjustable", massage: "Vibration", support: "Wraparound", portability: "Wireless" }
                          : profile.comparison;
                        return (
                          <tr key={product.node.id} className="border-b border-slate-100 last:border-b-0">
                            <td className="px-5 py-4">
                              <Link to={`/product/${product.node.handle}`} className="font-semibold text-slate-950 hover:text-blue-600">{product.node.title}</Link>
                            </td>
                            <td className="px-5 py-4 text-sm text-slate-600">{comparison.use}</td>
                            <td className="px-5 py-4 text-sm text-slate-600">{comparison.heat}</td>
                            <td className="px-5 py-4 text-sm text-slate-600">{comparison.massage}</td>
                            <td className="px-5 py-4 text-sm text-slate-600">{comparison.support}</td>
                            <td className="px-5 py-4 text-sm text-slate-600">{comparison.portability}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          <section className="bg-white py-14 md:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative overflow-hidden rounded-[2.4rem] bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_55%,#38bdf8_130%)] p-8 text-white shadow-[0_35px_100px_-60px_rgba(37,99,235,0.85)] md:p-12">
                <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
                <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold">
                      <Sparkles className="h-4 w-4" /> 60-second product finder
                    </div>
                    <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-[-0.04em] md:text-4xl">Not sure which product belongs in your routine?</h2>
                    <p className="mt-4 max-w-2xl text-base leading-8 text-blue-100">
                      Answer four practical questions. The quiz matches your pattern with a product category, useful guides and a seven-day starter routine.
                    </p>
                  </div>
                  <Link to="/knee-quiz" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50">
                    Find my best starting point <ArrowRight className="h-4 w-4" />
                  </Link>
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
