import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { PRIMARY_PRODUCT_HANDLE } from "@/lib/product-config";
import { ArrowRight } from "lucide-react";

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "FlexiKnee Shop — Knee Comfort & Massage Devices",
  url: "https://flexi-knee.com/shop",
};

export default function Shop() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getProducts(20)
      .then((list) => {
        if (!active) return;
        // Ana ürün her zaman ilk sırada görünsün
        const sorted = [...list].sort((a, b) => {
          if (a.node.handle === PRIMARY_PRODUCT_HANDLE) return -1;
          if (b.node.handle === PRIMARY_PRODUCT_HANDLE) return 1;
          return 0;
        });
        setProducts(sorted);
      })
      .catch(() => setProducts([]))
      .finally(() => active && setIsLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Shop Knee Comfort Devices | FlexiKnee™</title>
        <meta
          name="description"
          content="Explore the FlexiKnee collection: smart heated knee massagers, heated knee wraps, compression sleeves, and circulation support devices for daily knee comfort."
        />
        <link rel="canonical" href="https://flexi-knee.com/shop" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flexi-knee.com/shop" />
        <meta property="og:title" content="Shop Knee Comfort Devices | FlexiKnee™" />
        <meta property="og:description" content="Smart heated knee massagers, heated wraps, compression sleeves, and circulation support for daily knee comfort." />
        <script type="application/ld+json">{JSON.stringify(collectionJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-white text-slate-950">
        <Header />

        <main>
          <section className="bg-white py-14 md:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">The FlexiKnee system</p>
              <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-5xl">
                Knee comfort devices for every daily situation.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                From smart heated massage to circulation support — each device pairs with our practical guides, so you know exactly what fits your routine.
              </p>

              {isLoading ? (
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="h-80 animate-pulse rounded-[2rem] border border-slate-200 bg-slate-50" />
                  ))}
                </div>
              ) : products.length === 0 ? (
                <p className="mt-12 text-slate-600">
                  Products are loading slowly right now. Please refresh the page, or{" "}
                  <Link to="/guides" className="text-blue-600 hover:underline">browse our guides</Link> in the meantime.
                </p>
              ) : (
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {products.map((product) => {
                    const node = product.node;
                    const image = node.images?.edges?.[0]?.node;
                    const price = node.priceRange?.minVariantPrice;
                    const isPrimary = node.handle === PRIMARY_PRODUCT_HANDLE;
                    return (
                      <Link
                        key={node.id}
                        to={`/product/${node.handle}`}
                        className="group flex flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                      >
                        <div className="relative aspect-square overflow-hidden bg-slate-50">
                          {image && (
                            <img
                              src={image.url}
                              alt={image.altText || node.title}
                              loading="lazy"
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                          )}
                          {isPrimary && (
                            <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                              Best seller
                            </span>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <h2 className="text-base font-semibold leading-snug text-slate-950">{node.title}</h2>
                          {price && (
                            <p className="mt-2 text-sm text-slate-600">
                              From {price.currencyCode === "USD" ? "$" : `${price.currencyCode} `}
                              {Number(price.amount).toFixed(2)}
                            </p>
                          )}
                          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-blue-600">
                            View details
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}

              <div className="mt-14 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 md:p-10">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Not sure which device fits your knees?</h2>
                <p className="mt-2 max-w-xl text-slate-600">
                  Answer four quick questions and get a personalized routine with the right guides and device for your situation.
                </p>
                <Link
                  to="/knee-quiz"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Take the 60-second knee quiz
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
