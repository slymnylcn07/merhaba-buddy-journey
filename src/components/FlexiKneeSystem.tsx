import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { productSystem } from "@/data/product-system";
import { getProductProfile } from "@/data/product-profiles";
import { PRIMARY_PRODUCT_HANDLE } from "@/lib/product-config";
import { getProducts, ShopifyProduct } from "@/lib/shopify";

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

const accentByProfile: Record<string, string> = {
  generic: "from-slate-50 via-white to-blue-50",
  insoles: "from-emerald-50 via-white to-blue-50",
  "compression-sleeve": "from-slate-50 via-white to-indigo-50",
  "calf-massager": "from-blue-50 via-white to-cyan-50",
  "heated-wrap": "from-orange-50 via-white to-amber-50",
};

export const FlexiKneeSystem = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);

  useEffect(() => {
    let active = true;

    getProducts(20)
      .then((items) => {
        if (!active) return;

        const sorted = [...items].sort((a, b) => {
          if (a.node.handle === PRIMARY_PRODUCT_HANDLE) return -1;
          if (b.node.handle === PRIMARY_PRODUCT_HANDLE) return 1;
          return a.node.title.localeCompare(b.node.title);
        });

        setProducts(sorted.slice(0, 5));
      })
      .catch(() => {
        if (active) setProducts([]);
      });

    return () => {
      active = false;
    };
  }, []);

  const items = useMemo(() => {
    if (products.length > 0) {
      return products.map((product) => {
        const node = product.node;
        const profile = getProductProfile(product);
        const price = node.priceRange.minVariantPrice;
        const isPrimary = node.handle === PRIMARY_PRODUCT_HANDLE;

        return {
          key: node.id,
          name: node.title,
          label: isPrimary ? "Flagship device" : profile.eyebrow,
          description: isPrimary
            ? "The flagship all-in-one device for warmth, massage-style vibration and short daily knee routines."
            : profile.cardCopy,
          price: formatMoney(price.amount, price.currencyCode),
          image: node.images.edges[0]?.node.url || "",
          imageAlt: node.images.edges[0]?.node.altText || node.title,
          href: `/product/${node.handle}`,
          status: isPrimary ? "Best seller" : profile.badge,
          accent: accentByProfile[profile.key] || accentByProfile.generic,
          isLiveProduct: true,
        };
      });
    }

    return productSystem.map((item) => ({
      ...item,
      imageAlt: item.name,
      isLiveProduct: false,
    }));
  }, [products]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {items.map((item) => (
        <Link
          key={item.key || item.name}
          to={item.href}
          className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/70"
        >
          <div className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br ${item.accent}`}>
            {item.image ? (
              <img
                src={item.image}
                alt={item.imageAlt}
                className={`h-full w-full transition duration-500 group-hover:scale-105 ${item.isLiveProduct ? "object-contain p-4" : "object-cover"}`}
                loading="lazy"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] border border-slate-200 bg-white/80 shadow-sm">
                <Sparkles className="h-10 w-10 text-slate-300" />
              </div>
            )}
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700 shadow-sm">
              {item.status}
            </span>
          </div>

          <div className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">{item.label}</p>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-950">{item.name}</h3>
            <p className="mt-2 min-h-[72px] text-sm leading-6 text-slate-500">{item.description}</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-950">{item.price}</span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-white transition group-hover:bg-blue-600">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
