import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ImageOff } from "lucide-react";
import { productSystem } from "@/data/product-system";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { getProductPath } from "@/lib/product-config";
import { ProductMarketplaceRating } from "@/components/ProductMarketplaceRating";

type ProductKind = "massager" | "sleeve" | "calf" | "insoles" | "wrap" | "ice" | "other";

type SystemCard = {
  key: string;
  name: string;
  label: string;
  description: string;
  price: string;
  image: string;
  href: string;
  status: string;
  accent: string;
  kind: ProductKind;
  isLive: boolean;
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

function identifyProduct(product: ShopifyProduct): ProductKind {
  const text = `${product.node.title} ${product.node.handle}`.toLowerCase();

  if (/ice-pack|cold-therapy|cold-compress|gel-knee-wrap/.test(text)) return "ice";
  if (/insole|orthopedic|orthotic|footbed|arch-support/.test(text)) return "insoles";
  if (/calf|lower-leg|leg-massager|air-compression/.test(text)) return "calf";
  if (/sleeve|compression-support|knee-support/.test(text)) return "sleeve";
  if (/usb|heating-pad|heated-knee-wrap|warming-knee|heat-wrap/.test(text)) return "wrap";
  if (/knee-massager|red-light|smart-heated/.test(text)) return "massager";
  return "other";
}

const profileByKind: Record<ProductKind, Omit<SystemCard, "key" | "name" | "price" | "image" | "href" | "isLive">> = {
  massager: {
    kind: "massager",
    label: "Heat · vibration · red light",
    description: "The flagship all-in-one device for short, repeatable knee comfort routines.",
    status: "Best seller",
    accent: "from-blue-50 via-white to-slate-50",
  },
  sleeve: {
    kind: "sleeve",
    label: "Flexible compression",
    description: "Breathable support for walking, work, training and everyday movement.",
    status: "Daily support",
    accent: "from-slate-50 via-white to-indigo-50",
  },
  calf: {
    kind: "calf",
    label: "Lower-leg recovery",
    description: "Rechargeable compression and warmth for tired calves and lower legs.",
    status: "Recovery",
    accent: "from-cyan-50 via-white to-blue-50",
  },
  insoles: {
    kind: "insoles",
    label: "Foot-to-knee support",
    description: "Structured support designed to improve comfort from the ground up.",
    status: "New",
    accent: "from-emerald-50 via-white to-blue-50",
  },
  wrap: {
    kind: "wrap",
    label: "Targeted knee warmth",
    description: "A lightweight USB-powered wrap for simple, focused warming sessions.",
    status: "Simple warmth",
    accent: "from-orange-50 via-white to-amber-50",
  },
  ice: {
    kind: "ice",
    label: "Reusable cold therapy",
    description: "A flexible gel wrap for hands-free knee cooling after activity or while resting.",
    status: "New",
    accent: "from-cyan-50 via-white to-blue-50",
  },
  other: {
    kind: "other",
    label: "FlexiKnee system",
    description: "A practical addition to the FlexiKnee daily comfort system.",
    status: "Available",
    accent: "from-slate-50 via-white to-blue-50",
  },
};

const order: ProductKind[] = ["massager", "sleeve", "ice", "calf", "insoles", "wrap", "other"];

function toLiveCard(product: ShopifyProduct): SystemCard {
  const kind = identifyProduct(product);
  const profile = profileByKind[kind];
  const minPrice = product.node.priceRange.minVariantPrice;
  const firstAvailablePrice = product.node.variants.edges.find((edge) => edge.node.availableForSale)?.node.price;

  return {
    ...profile,
    key: product.node.id,
    name: product.node.title,
    price: formatMoney(
      firstAvailablePrice?.amount || minPrice.amount,
      firstAvailablePrice?.currencyCode || minPrice.currencyCode,
    ),
    image: product.node.images.edges[0]?.node.url || "",
    href: getProductPath(product.node.handle),
    isLive: true,
  };
}

export const FlexiKneeSystem = () => {
  const [liveProducts, setLiveProducts] = useState<ShopifyProduct[]>([]);

  useEffect(() => {
    let active = true;

    getProducts(20)
      .then((products) => {
        if (active) setLiveProducts(products);
      })
      .catch(() => {
        if (active) setLiveProducts([]);
      })

    return () => {
      active = false;
    };
  }, []);

  const items = useMemo<SystemCard[]>(() => {
    if (liveProducts.length > 0) {
      const cards = liveProducts.map(toLiveCard);
      const selected = new Map<ProductKind, SystemCard>();
      const overflow: SystemCard[] = [];

      cards.forEach((card) => {
        if (card.kind !== "other" && !selected.has(card.kind)) {
          selected.set(card.kind, card);
        } else {
          overflow.push(card);
        }
      });

      const sorted = order.flatMap((kind) => (selected.has(kind) ? [selected.get(kind)!] : []));
      return [...sorted, ...overflow].slice(0, 6);
    }

    return productSystem.map((item, index) => ({
      key: `${item.name}-${index}`,
      name: item.name,
      label: item.label,
      description: item.description,
      price: item.price,
      image: item.image,
      href: item.href,
      status: item.status,
      accent: item.accent,
      kind: (item.kind || "other") as ProductKind,
      isLive: false,
    }));
  }, [liveProducts]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.key}
          to={item.href}
          className="group min-w-0 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/70"
        >
          <div className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br ${item.accent}`}>
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className={`h-full w-full transition duration-500 group-hover:scale-[1.035] ${item.isLive ? "object-contain p-3 sm:p-4" : "object-cover"}`}
                loading="lazy"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] border border-slate-200 bg-white/80 shadow-sm">
                <ImageOff className="h-9 w-9 text-slate-300" />
              </div>
            )}
            <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-blue-700 shadow-sm backdrop-blur">
              {item.status}
            </span>
          </div>

          <div className="p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-blue-600">{item.label}</p>
            <h3 className="mt-2 text-base font-semibold leading-snug tracking-tight text-slate-950">{item.name}</h3>
            <ProductMarketplaceRating
              handle={item.href.replace(/^\/product\//, "")}
              className="mt-2"
            />
            <p className="mt-2 min-h-[66px] text-sm leading-6 text-slate-500">{item.description}</p>
            <div className="mt-5 flex items-center justify-between gap-3">
              <span className="truncate text-sm font-semibold text-slate-950">{item.price}</span>
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-white transition group-hover:bg-blue-600">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
