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

  const isMidArticle = placement === "mid_article";

  return (
    <div
      ref={cardRef}
      data-cta="product-card"
      data-cta-placement={placement}
      data-offer-code={NEWSLETTER_DISCOUNT_CODE}
      className={`${isMidArticle ? "my-7 p-3 sm:p-3.5" : "my-8 p-3.5 sm:p-4"} rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md [&_p]:!my-0 [&_p]:!leading-normal [&_a]:!no-underline`}
    >
      <div
        className={`grid grid-cols-[88px_minmax(0,1fr)] items-center ${isMidArticle ? "gap-2.5 sm:grid-cols-[96px_minmax(0,1fr)] sm:gap-3 md:grid-cols-[96px_minmax(0,1fr)_auto]" : "gap-3 sm:grid-cols-[100px_minmax(0,1fr)] md:grid-cols-[104px_minmax(0,1fr)_auto] md:gap-4"}`}
      >
        <div
          className={`flex flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 via-white to-blue-50/70 ${isMidArticle ? "h-[88px] w-[88px] sm:h-24 sm:w-24" : "h-24 w-24 sm:h-[100px] sm:w-[100px] md:h-[104px] md:w-[104px]"}`}
        >
          <img
            src={imageSrc}
            alt={rec.title}
            loading="lazy"
            onError={(event) => {
              const image = event.currentTarget;
              const fallbackUrl = new URL(rec.fallbackImage, window.location.origin).href;
              if (image.src !== fallbackUrl) image.src = rec.fallbackImage;
            }}
            className={`!my-0 !max-h-none !rounded-none !border-0 !bg-transparent !object-contain !shadow-none ${isMidArticle ? "!h-[82px] !w-[82px] sm:!h-[90px] sm:!w-[90px]" : "!h-[90px] !w-[90px] sm:!h-24 sm:!w-24 md:!h-[100px] md:!w-[100px]"}`}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="!text-[9px] !font-bold uppercase tracking-[0.12em] !text-emerald-700 sm:!text-[10px]">
            Recommended for this guide
          </p>
          <p className={`!mt-1 line-clamp-2 !font-semibold !leading-snug !text-slate-950 ${isMidArticle ? "!text-sm sm:!text-[15px]" : "!text-[15px] sm:!text-base"}`}>
            {displayHeadline}
          </p>
          <p className={`!mt-1 line-clamp-2 !text-slate-600 ${isMidArticle ? "!text-[11px] !leading-[1.45] sm:!text-xs" : "!text-xs !leading-[1.5] sm:!text-[13px]"}`}>
            {displayText}
          </p>
          <p className="!mt-1.5 line-clamp-1 !text-[11px] !font-semibold !text-slate-800 sm:!text-xs">
            {rec.title}
          </p>
          <div className={`${isMidArticle ? "mt-1.5" : "mt-2"} flex flex-wrap items-center gap-x-2 gap-y-1`}>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {price && (
                <span className={`${isMidArticle ? "text-sm" : "text-[15px]"} font-semibold text-slate-950`}>{price}</span>
              )}
              <ProductMarketplaceRating handle={rec.handle} showCount />
            </div>
            <div className="flex flex-wrap items-center gap-1">
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                {shippingLabel}
              </span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                {NEWSLETTER_DISCOUNT_CODE} · {NEWSLETTER_DISCOUNT_PCT}% off in cart
              </span>
            </div>
          </div>
          {!isMidArticle && (
            <p className="!mt-1 !text-[10px] !font-medium !text-slate-400">
              30-day returns from delivery · Secure Shopify checkout
            </p>
          )}
        </div>
        <Link
          to={offerProductPath}
          onClick={handleProductClick}
          className={`col-span-2 mt-0.5 inline-flex min-h-11 w-full flex-shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold !text-white !no-underline transition hover:bg-slate-800 md:col-span-1 md:mt-0 md:w-auto md:self-center ${isMidArticle ? "md:px-4" : "md:px-5 md:text-sm"}`}
        >
          View with {NEWSLETTER_DISCOUNT_PCT}% off
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default PremiumCTA;
