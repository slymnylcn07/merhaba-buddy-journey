import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { PRODUCT_RECS, pickProductForSlug, ProductRec } from "@/lib/article-product-map";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/policy-config";
import { MAIN_PRODUCT_RATING } from "@/lib/main-product-rating";
import { getProductPath } from "@/lib/product-config";

/**
 * Makale içi ürün kartı (eski yeşil banner'ın yerini alır).
 *
 * - Okunan makalenin slug'ına göre konuyla ilgili ürünü gösterir
 *   (eşleşme yoksa ana ürün).
 * - Fiyat ve görseli Shopify'dan canlı çeker; API'ye ulaşamazsa
 *   yedek fiyat + ürünün yerel/public görseliyle çalışmaya devam eder.
 * - headline/text prop'ları geriye dönük uyumluluk için korunur;
 *   yeni tasarımda per-ürün metin kullanıldığından görmezden gelinir.
 */

interface PremiumCTAProps {
  headline?: string;
  text?: string;
}

// Tüm kartlar tek listeden beslensin diye modül seviyesinde önbellek
let productsPromise: Promise<ShopifyProduct[]> | null = null;
function getCachedProducts() {
  if (!productsPromise) {
    productsPromise = getProducts(20).catch(() => []);
  }
  return productsPromise;
}

function formatPrice(amount?: string, currencyCode?: string) {
  if (!amount) return null;
  const value = Number(amount);
  if (Number.isNaN(value)) return null;
  const symbol = currencyCode === "USD" || !currencyCode ? "$" : `${currencyCode} `;
  return `${symbol}${value.toFixed(2)}`;
}

const PremiumCTA = (_props: PremiumCTAProps) => {
  const location = useLocation();
  const slug = location.pathname.startsWith("/guides/")
    ? location.pathname.replace("/guides/", "")
    : undefined;

  const rec: ProductRec = pickProductForSlug(slug);
  const isMain = rec.handle === PRODUCT_RECS.main.handle;

  const [liveImage, setLiveImage] = useState<string | null>(null);
  const [livePrice, setLivePrice] = useState<string | null>(null);
  const [livePriceAmount, setLivePriceAmount] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    setLiveImage(null);
    setLivePrice(null);
    setLivePriceAmount(null);

    getCachedProducts().then((list) => {
      if (!active) return;
      const match = list.find(
        (p) => decodeURIComponent(p.node.handle) === decodeURIComponent(rec.handle)
      );
      if (match) {
        setLiveImage(match.node.images?.edges?.[0]?.node?.url || null);
        const amount = match.node.priceRange?.minVariantPrice?.amount;
        setLivePrice(
          formatPrice(
            amount,
            match.node.priceRange?.minVariantPrice?.currencyCode
          )
        );
        const numericAmount = Number(amount);
        setLivePriceAmount(Number.isFinite(numericAmount) ? numericAmount : null);
      }
    });
    return () => {
      active = false;
    };
  }, [rec.handle]);

  const imageSrc = liveImage || rec.fallbackImage;
  const price = livePrice || rec.fallbackPrice;
  const fallbackPriceAmount = Number(rec.fallbackPrice.replace(/[^0-9.]/g, ""));
  const currentPriceAmount = livePriceAmount ?? fallbackPriceAmount;
  const shippingLabel =
    Number.isFinite(currentPriceAmount) && currentPriceAmount > FREE_SHIPPING_THRESHOLD
      ? "Free Shipping"
      : `Free shipping $${FREE_SHIPPING_THRESHOLD}+`;

  return (
    <div
      data-cta="product-card"
      className="my-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md [&_p]:!my-0 [&_p]:!leading-normal [&_img]:!my-0 [&_img]:!w-24 [&_img]:sm:!w-28 [&_img]:!h-24 [&_img]:sm:!h-28 [&_img]:!max-h-28 [&_img]:!rounded-xl [&_img]:!border-0 [&_img]:!shadow-none [&_img]:!object-cover [&_a]:!no-underline"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <img
          src={imageSrc}
          alt={rec.title}
          loading="lazy"
          onError={(event) => {
            const image = event.currentTarget;
            const fallbackUrl = new URL(rec.fallbackImage, window.location.origin).href;
            if (image.src !== fallbackUrl) image.src = rec.fallbackImage;
          }}
          className="h-24 w-24 flex-shrink-0 rounded-xl bg-slate-50 object-cover sm:h-28 sm:w-28"
        />
        <div className="min-w-0 flex-1">
          <p className="!text-xs !font-medium uppercase tracking-wide !text-slate-400">
            Recommended for this guide
          </p>
          <p className="!mt-1 !text-base !font-semibold !leading-snug !text-slate-950">
            {rec.title}
          </p>
          <p className="!mt-1.5 !text-sm !leading-relaxed !text-slate-600">{rec.benefit}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            {price && (
              <span className="text-base font-semibold text-slate-950">{price}</span>
            )}
            {isMain && (
              <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                {MAIN_PRODUCT_RATING.toFixed(1)} rated
              </span>
            )}
            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
              {shippingLabel}
            </span>
            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
              30-day returns from delivery
            </span>
          </div>
        </div>
        <Link
          to={getProductPath(rec.handle)}
          className="inline-flex flex-shrink-0 items-center justify-center gap-1.5 self-start rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium !text-white !no-underline transition hover:bg-slate-800 sm:self-center"
        >
          View product
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default PremiumCTA;
