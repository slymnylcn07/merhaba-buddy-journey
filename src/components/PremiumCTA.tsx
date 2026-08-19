import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/hooks/use-google-analytics";
import { trackClarityEvent } from "@/hooks/use-microsoft-clarity";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { pickProductForSlug, ProductRec } from "@/lib/article-product-map";
import { getPublicProductHandle } from "@/lib/product-config";
import { ProductMarketplaceRating } from "@/components/ProductMarketplaceRating";
import { NEWSLETTER_DISCOUNT_CODE, NEWSLETTER_DISCOUNT_PCT } from "@/lib/newsletter-config";
import {
  buildGuideOfferProductPath,
  markGuideOfferSource,
} from "@/lib/guide-offer";
import { articleCTAs } from "@/data/article-ctas";
import { recentArticleCTAs } from "@/data/recent-article-ctas";
import {
  formatMarketMoney,
  getSafeUsdFallbackPrice,
  getShippingBadgeLabel,
  hasProductPriceRange,
} from "@/lib/shipping-policy";

/**
 * Makale içi ürün kartı (eski yeşil banner'ın yerini alır).
 *
 * - Okunan makalenin slug'ına göre konuyla ilgili ürünü gösterir
 *   (eşleşme yoksa ana ürün).
 * - Fiyat ve görseli Shopify'dan canlı çeker; API'ye ulaşamazsa
 *   yedek fiyat + ürünün yerel/public görseliyle çalışmaya devam eder.
 * - Rehbere özel headline/text metinlerini gösterir.
 * - Kartın gösterimini ve ürün tıklamasını yerleşim bilgisiyle ölçer.
 * - Ürün bağlantısını makale kaynaklı GUIDE10 teklifiyle işaretler.
 */

interface PremiumCTAProps {
  headline?: string;
  text?: string;
  articleSlug?: string;
  placement?: "mid_article" | "article_end";
}

// Tüm kartlar tek listeden beslensin diye modül seviyesinde önbellek
let productsPromise: Promise<ShopifyProduct[]> | null = null;
function getCachedProducts() {
  if (!productsPromise) {
    productsPromise = getProducts(20).catch(() => []);
  }
  return productsPromise;
}

const PremiumCTA = ({
  headline,
  text,
  articleSlug,
  placement = "article_end",
}: PremiumCTAProps) => {
  const location = useLocation();
  const slug = articleSlug || (location.pathname.startsWith("/guides/")
    ? location.pathname.replace("/guides/", "")
    : undefined);

  const rec: ProductRec = pickProductForSlug(slug);
  const mappedCopy = slug ? articleCTAs[slug] || recentArticleCTAs[slug] : undefined;
  const displayHeadline = headline || mappedCopy?.headline || rec.title;
  const displayText = text || mappedCopy?.text || rec.benefit;
  const cardRef = useRef<HTMLDivElement>(null);
  const impressionSent = useRef(false);

  const [liveImage, setLiveImage] = useState<string | null>(null);
  const [livePrice, setLivePrice] = useState<{
    label: string;
    amount: number;
    currencyCode: string;
  } | null>(null);

  useEffect(() => {
    let active = true;
    setLiveImage(null);
    setLivePrice(null);

    getCachedProducts().then((list) => {
      if (!active) return;
      const match = list.find(
        (p) =>
          getPublicProductHandle(decodeURIComponent(p.node.handle)) ===
          getPublicProductHandle(decodeURIComponent(rec.handle))
      );
      if (match) {
        setLiveImage(match.node.images?.edges?.[0]?.node?.url || null);
        const amount = match.node.priceRange?.minVariantPrice?.amount;
        const currencyCode = match.node.priceRange?.minVariantPrice?.currencyCode;
        const numericAmount = Number(amount);
        if (Number.isFinite(numericAmount) && currencyCode) {
          const prefix = hasProductPriceRange(match.node.priceRange) ? "From " : "";
          setLivePrice({
            label: `${prefix}${formatMarketMoney(numericAmount, currencyCode)}`,
            amount: numericAmount,
            currencyCode,
          });
        }
      }
    });
    return () => {
      active = false;
    };
  }, [rec.handle]);

  const imageSrc = liveImage || rec.fallbackImage;
  const safeFallbackPrice = getSafeUsdFallbackPrice(rec.fallbackPrice);
  const price = livePrice?.label || safeFallbackPrice;
  const shippingLabel = getShippingBadgeLabel(
    livePrice?.amount,
    livePrice?.currencyCode,
  );
  const offerProductPath = buildGuideOfferProductPath(
    rec.handle,
    slug || "unknown",
    placement,
  );

  useEffect(() => {
    const element = cardRef.current;
    if (!element || impressionSent.current) return;

    const sendImpression = () => {
      if (impressionSent.current) return;
      impressionSent.current = true;
      trackClarityEvent("guide_product_card_view");
      trackEvent("product_card_impression", {
        slug: slug || "unknown",
        placement,
        product_handle: rec.handle,
        offer_code: NEWSLETTER_DISCOUNT_CODE,
        cta_version: "guide-product-card-v2",
      });
      trackEvent("view_promotion", {
        promotion_id: `guide10-${placement}-${slug || "unknown"}`,
        promotion_name: "Guide reader offer",
        creative_slot: placement,
        items: [{ item_id: rec.handle, item_name: rec.title }],
      });
    };

    if (!("IntersectionObserver" in window)) {
      sendImpression();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          sendImpression();
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [placement, rec.handle, rec.title, slug]);

  const handleProductClick = () => {
    markGuideOfferSource(slug || "unknown", placement);
    trackClarityEvent("guide_product_card_click");
    trackEvent("product_card_click", {
      slug: slug || "unknown",
      placement,
      product_handle: rec.handle,
      offer_code: NEWSLETTER_DISCOUNT_CODE,
      cta_version: "guide-product-card-v2",
    });
    trackEvent("select_promotion", {
      promotion_id: `guide10-${placement}-${slug || "unknown"}`,
      promotion_name: "Guide reader offer",
      creative_slot: placement,
      items: [{ item_id: rec.handle, item_name: rec.title }],
    });
  };

  return (
    <div
      ref={cardRef}
      data-cta="product-card"
      data-cta-placement={placement}
      data-offer-code={NEWSLETTER_DISCOUNT_CODE}
      className="my-10 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-5 [&_p]:!my-0 [&_p]:!leading-normal [&_a]:!no-underline"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex h-40 w-full flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-white to-blue-50/70 md:h-28 md:w-28 md:rounded-xl">
          <img
            src={imageSrc}
            alt={rec.title}
            loading="lazy"
            onError={(event) => {
              const image = event.currentTarget;
              const fallbackUrl = new URL(rec.fallbackImage, window.location.origin).href;
              if (image.src !== fallbackUrl) image.src = rec.fallbackImage;
            }}
            className="!my-0 !h-36 !w-36 !max-h-none !rounded-none !border-0 !bg-transparent !object-contain !shadow-none md:!h-28 md:!w-28"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="!text-xs !font-medium uppercase tracking-wide !text-slate-400">
            Recommended for this guide · {NEWSLETTER_DISCOUNT_PCT}% reader offer
          </p>
          <p className="!mt-1 !text-base !font-semibold !leading-snug !text-slate-950">
            {displayHeadline}
          </p>
          <p className="!mt-1.5 !text-sm !leading-relaxed !text-slate-600">
            {displayText}
          </p>
          <p className="!mt-2 !text-xs !font-semibold !text-slate-800">{rec.title}</p>
          <div className="mt-3 flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:gap-x-3 md:gap-y-1.5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              {price && (
                <span className="text-base font-semibold text-slate-950">{price}</span>
              )}
              <ProductMarketplaceRating handle={rec.handle} showCount />
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                {shippingLabel}
              </span>
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                30-day returns from delivery
              </span>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                {NEWSLETTER_DISCOUNT_CODE} · {NEWSLETTER_DISCOUNT_PCT}% off
              </span>
            </div>
          </div>
        </div>
        <Link
          to={offerProductPath}
          onClick={handleProductClick}
          className="inline-flex min-h-11 w-full flex-shrink-0 items-center justify-center gap-1.5 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold !text-white !no-underline transition hover:bg-slate-800 md:w-auto md:self-center"
        >
          View product with {NEWSLETTER_DISCOUNT_PCT}% off
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default PremiumCTA;
