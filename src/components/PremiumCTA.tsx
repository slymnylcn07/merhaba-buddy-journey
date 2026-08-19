import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/hooks/use-google-analytics";
import { trackClarityEvent } from "@/hooks/use-microsoft-clarity";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { pickProductForSlug, ProductRec, PRODUCT_RECS } from "@/lib/article-product-map";
import { getPublicProductHandle } from "@/lib/product-config";
import { ProductMarketplaceRating } from "@/components/ProductMarketplaceRating";
import { NEWSLETTER_DISCOUNT_CODE, NEWSLETTER_DISCOUNT_PCT } from "@/lib/newsletter-config";
import {
  buildGuideOfferProductPath,
  markGuideOfferSource,
} from "@/lib/guide-offer";
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
 * - Makale başlığından türetilen, soru olmayan bağlamsal başlık gösterir.
 * - Her ürün için üç doğrulanmış teknik özellik ve kullanım görseli kullanır.
 * - Kartın gösterimini ve ürün tıklamasını yerleşim bilgisiyle ölçer.
 * - Ürün bağlantısını makale kaynaklı GUIDE10 teklifiyle işaretler.
 */

interface PremiumCTAProps {
  articleSlug?: string;
  articleTitle?: string;
  placement?: "mid_article" | "article_end";
}

interface CtaProductPresentation {
  shortName: string;
  lifestyleImage: string;
  objectPosition?: string;
  features: readonly [string, string, string];
}

const CTA_PRODUCT_PRESENTATIONS: Record<string, CtaProductPresentation> = {
  [PRODUCT_RECS.main.handle]: {
    shortName: "FlexiKnee Smart Massager",
    lifestyleImage: "/images/product-stories/massager-evening-reading.webp",
    objectPosition: "62% center",
    features: ["3000 mAh cordless", "Integrated red light", "3 vibration modes"],
  },
  [PRODUCT_RECS.calf.handle]: {
    shortName: "Calf Recovery Massager",
    lifestyleImage: "/images/product-stories/calf-massager-workday.webp",
    objectPosition: "center",
    features: ["3 compression modes", "Rechargeable battery", "15-minute sessions"],
  },
  [PRODUCT_RECS.insoles.handle]: {
    shortName: "Sport Orthopedic Insoles",
    lifestyleImage: "/images/product-stories/insoles-ready-to-move.webp",
    objectPosition: "58% center",
    features: ["Structured arch support", "Shock-absorbing layer", "Trim-to-fit sizing"],
  },
  [PRODUCT_RECS.sleeve.handle]: {
    shortName: "Compression Support Sleeve",
    lifestyleImage: "/images/product-stories/compression-sleeve-stairs.webp",
    objectPosition: "58% center",
    features: ["Breathable knit fabric", "Open-kneecap design", "Flexible pull-on sleeve"],
  },
  [PRODUCT_RECS.wrap.handle]: {
    shortName: "USB Heated Knee Wrap",
    lifestyleImage: "/images/product-stories/heated-wrap-home-lounge.webp",
    objectPosition: "58% center",
    features: ["Gentle focused heat", "USB powered", "Quick 15-min sessions"],
  },
  [PRODUCT_RECS.iceWrap.handle]: {
    shortName: "Reusable Knee Ice Pack Wrap",
    lifestyleImage: "/images/product-stories/ice-pack-wrap-post-activity.webp",
    objectPosition: "62% center",
    features: ["Reusable cold-compress gel", "24 cm center pad", "No pump or power needed"],
  },
  [PRODUCT_RECS.compressionSocks.handle]: {
    shortName: "Everyday Compression Socks",
    lifestyleImage: "/images/product-stories/compression-socks-travel.webp",
    objectPosition: "center",
    features: ["Knee-high closed toe", "Nylon knit", "3 unisex size groups"],
  },
};

function getTopicLabel(articleTitle: string | undefined, slug: string | undefined) {
  const titleTopic = articleTitle?.split(/[:?]/)[0].replace(/[?!.]+$/g, "").trim();
  if (titleTopic) {
    const normalized = titleTopic
      .replace(/^can (.+) cause (.+)$/i, "$1 and $2 connection")
      .replace(/^why do my knees feel heavy, stiff, or full$/i, "Knee heaviness, stiffness, and fullness")
      .replace(/^why do my knees crack or pop$/i, "Knee cracking and popping")
      .replace(/^why do my knees hurt\s+(.+)$/i, "Knee discomfort $1")
      .replace(/^knees hurt in cold weather$/i, "Cold-weather knee discomfort")
      .replace(/^are\s+(.+)\s+bad$/i, "$1 considerations")
      .replace(/^do\s+(.+?)\s+(?:really\s+)?work.*$/i, "$1 use and evidence")
      .replace(/^is\s+(.+)\s+safe for\s+(.+)$/i, "$1 safety for $2")
      .replace(/^who benefits most from\s+(.+)$/i, "$1 suitability")
      .replace(/^what does\s+(.+)\s+mean$/i, "$1 explained")
      .replace(/^what is\s+/i, "")
      .replace(/^what causes\s+(.+)$/i, "$1 causes")
      .replace(/^how to\s+/i, "")
      .replace(/^is\s+(.+)\s+safe$/i, "$1 safety");
    return normalized.charAt(0).toUpperCase() + normalized.slice(1);
  }

  const slugTopic = (slug || "daily-knee-comfort")
    .replace(/-20\d{2}$/g, "")
    .replace(/-(guide|explained|authoritative)$/g, "")
    .replace(/-/g, " ");
  return slugTopic.charAt(0).toUpperCase() + slugTopic.slice(1);
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
  articleSlug,
  articleTitle,
  placement = "article_end",
}: PremiumCTAProps) => {
  const location = useLocation();
  const slug = articleSlug || (location.pathname.startsWith("/guides/")
    ? location.pathname.replace("/guides/", "")
    : undefined);

  const rec: ProductRec = pickProductForSlug(slug);
  const presentation =
    CTA_PRODUCT_PRESENTATIONS[rec.handle] || CTA_PRODUCT_PRESENTATIONS[PRODUCT_RECS.main.handle];
  const topicLabel = getTopicLabel(articleTitle, slug);
  const cardRef = useRef<HTMLDivElement>(null);
  const impressionSent = useRef(false);

  const [liveImage, setLiveImage] = useState<string | null>(null);
  const [livePrice, setLivePrice] = useState<{
    label: string;
    amount: number;
    currencyCode: string;
    isRange: boolean;
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
          const isRange = hasProductPriceRange(match.node.priceRange);
          const prefix = isRange ? "From " : "";
          setLivePrice({
            label: `${prefix}${formatMarketMoney(numericAmount, currencyCode)}`,
            amount: numericAmount,
            currencyCode,
            isRange,
          });
        }
      }
    });
    return () => {
      active = false;
    };
  }, [rec.handle]);

  const imageSrc = presentation.lifestyleImage;
  const safeFallbackPrice = getSafeUsdFallbackPrice(rec.fallbackPrice);
  const price = livePrice?.label || safeFallbackPrice;
  const fallbackUsdMatch = /^\$(\d+(?:\.\d{1,2})?)$/.exec(safeFallbackPrice);
  const fallbackUsdAmount = fallbackUsdMatch ? Number(fallbackUsdMatch[1]) : null;
  const guidePrice = livePrice
    ? `${livePrice.isRange ? "From " : ""}${formatMarketMoney(
        livePrice.amount * (1 - NEWSLETTER_DISCOUNT_PCT / 100),
        livePrice.currencyCode,
      )}`
    : fallbackUsdAmount !== null && Number.isFinite(fallbackUsdAmount)
      ? formatMarketMoney(
          fallbackUsdAmount * (1 - NEWSLETTER_DISCOUNT_PCT / 100),
          "USD",
        )
      : null;
  const crossedPrice = livePrice?.label || (guidePrice ? safeFallbackPrice : null);
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
      className={`${isMidArticle ? "my-7" : "my-9"} overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md [&_p]:!my-0 [&_p]:!leading-normal [&_a]:!no-underline`}
    >
      <div className="bg-slate-900 px-4 py-2 text-white sm:px-5">
        <p className="!text-xs !font-medium !tracking-[0.02em] !text-slate-100">
          Product details for this guide
        </p>
      </div>

      <div
        className={`grid grid-cols-1 ${
          isMidArticle
            ? "sm:grid-cols-[176px_minmax(0,1fr)] md:grid-cols-[196px_minmax(0,1fr)]"
            : "sm:grid-cols-[190px_minmax(0,1fr)] md:grid-cols-[220px_minmax(0,1fr)]"
        }`}
      >
        <div
          className={`overflow-hidden bg-slate-100 sm:row-span-2 ${
            isMidArticle
              ? "h-[138px] sm:h-auto sm:min-h-[238px]"
              : "h-[150px] sm:h-auto sm:min-h-[264px]"
          }`}
        >
          <img
            src={imageSrc}
            alt={`${rec.title} in use`}
            loading="lazy"
            onError={(event) => {
              const image = event.currentTarget;
              const liveUrl = liveImage
                ? new URL(liveImage, window.location.origin).href
                : null;
              const fallbackUrl = new URL(rec.fallbackImage, window.location.origin).href;
              if (liveUrl && image.src !== liveUrl) {
                image.src = liveImage;
              } else if (image.src !== fallbackUrl) {
                image.src = rec.fallbackImage;
              }
            }}
            className="!my-0 !h-full !min-h-full !w-full !max-h-none !rounded-none !border-0 !bg-transparent !object-cover !shadow-none"
            style={{ objectPosition: presentation.objectPosition || "center" }}
          />
        </div>

        <div className={`${isMidArticle ? "p-3 sm:p-3.5" : "p-3.5 sm:p-4"} min-w-0`}>
          <p className="line-clamp-1 !text-[10px] !font-semibold !tracking-[0.04em] !text-blue-700 sm:!text-[11px]">
            {rec.title}
          </p>
          <p className={`${isMidArticle ? "line-clamp-2 !text-[15px] sm:!text-base" : "line-clamp-3 !text-base sm:!text-lg"} !mt-1.5 !font-semibold !leading-[1.28] !tracking-[-0.015em] !text-slate-950`}>
            {topicLabel}
          </p>

          <ul className={`${isMidArticle ? "mt-2 space-y-1" : "mt-3 space-y-1.5"} list-none !pl-0`} aria-label="Product features">
            {presentation.features.map((feature) => (
              <li key={feature} className="!mb-0 flex items-center gap-1.5 !text-[10px] !font-medium !leading-4 !text-slate-600 sm:!text-[11px]">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className={`${isMidArticle ? "mt-2" : "mt-3"}`}>
            <ProductMarketplaceRating handle={rec.handle} showCount />
          </div>

          <div className={`${isMidArticle ? "mt-2" : "mt-3"} flex flex-wrap items-end gap-x-2 gap-y-0.5`}>
            {guidePrice ? (
              <>
                {crossedPrice && (
                  <span className="text-xs font-medium text-slate-400 line-through">
                    {crossedPrice}
                  </span>
                )}
                <span className={`${isMidArticle ? "text-lg" : "text-xl"} font-bold tracking-[-0.02em] text-slate-950`}>
                  {guidePrice}
                </span>
                <span className="pb-0.5 text-[10px] font-semibold text-blue-700">
                  With {NEWSLETTER_DISCOUNT_CODE}
                </span>
              </>
            ) : (
              <>
                <span className={`${isMidArticle ? "text-base" : "text-lg"} font-bold text-slate-950`}>
                  {price}
                </span>
                <span className="pb-0.5 text-[10px] font-medium text-slate-500">
                  Current price
                </span>
              </>
            )}
          </div>

          <p className="!mt-1 !text-[10px] !font-medium !text-slate-500">
            {shippingLabel}
          </p>
        </div>

        <div
          className={`${
            isMidArticle ? "p-3 pt-2" : "p-3.5 pt-2.5 sm:p-4 sm:pt-2.5"
          } min-w-0 border-t border-slate-100 sm:col-start-2`}
        >
          <Link
            to={offerProductPath}
            onClick={handleProductClick}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-blue-600 px-4 py-2.5 text-xs font-semibold !text-white !no-underline transition hover:bg-blue-700 sm:text-sm"
          >
            <span className="min-w-0 truncate">
              {guidePrice ? `Explore FlexiKnee · ${guidePrice}` : "Explore FlexiKnee"}
            </span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0" />
          </Link>
          <p className="!mt-1.5 text-center !text-[10px] !font-medium !text-slate-500">
            {rec.handle === PRODUCT_RECS.main.handle
              ? "30-day returns · 2-year limited warranty"
              : "30-day returns · Secure Shopify checkout"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumCTA;
