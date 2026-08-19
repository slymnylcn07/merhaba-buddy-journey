import { Star } from "lucide-react";
import { getProductMarketplaceFeedback } from "@/data/product-marketplace-feedback";

interface ProductMarketplaceRatingProps {
  handle: string | undefined;
  className?: string;
  inverse?: boolean;
  showCount?: boolean;
  linkToReviews?: boolean;
  prominent?: boolean;
  marketplaceLabel?: boolean;
}

export function ProductMarketplaceRating({
  handle,
  className = "",
  inverse = false,
  showCount = false,
  linkToReviews = false,
  prominent = false,
  marketplaceLabel = false,
}: ProductMarketplaceRatingProps) {
  const feedback = getProductMarketplaceFeedback(handle);
  if (!feedback) return null;

  const reviewLabel = marketplaceLabel ? "marketplace reviews" : "reviews";
  const label = `${feedback.rating.toFixed(1)} out of 5${
    showCount ? `, ${feedback.reviewCount.toLocaleString("en-US")} ${reviewLabel}` : ""
  }`;
  const textColor = inverse ? "text-slate-200" : "text-slate-600";
  const iconSize = prominent ? "h-4 w-4" : "h-3.5 w-3.5";
  const textSize = prominent ? "text-sm font-semibold" : "text-xs font-medium";
  const gap = prominent ? "gap-2" : "gap-1.5";

  const content = (
    <>
      <Star className={`${iconSize} shrink-0 fill-amber-400 text-amber-400`} aria-hidden="true" />
      <span className={`${textSize} ${textColor}`}>
        {feedback.rating.toFixed(1)}/5
        {showCount ? ` · ${feedback.reviewCount.toLocaleString("en-US")} ${reviewLabel}` : ""}
      </span>
    </>
  );

  if (linkToReviews) {
    return (
      <a
        href="#product-reviews"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("product-reviews")?.scrollIntoView({ behavior: "smooth" });
        }}
        className={`inline-flex shrink-0 items-center whitespace-nowrap ${gap} underline-offset-2 hover:underline ${className}`}
        aria-label={`${label}. Jump to buyer reviews on this page.`}
      >
        {content}
      </a>
    );
  }

  return (
    <span className={`inline-flex shrink-0 items-center whitespace-nowrap ${gap} ${className}`} aria-label={label}>
      {content}
    </span>
  );
}
