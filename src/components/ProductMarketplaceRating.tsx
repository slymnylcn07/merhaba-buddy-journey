import { Star } from "lucide-react";
import { getProductMarketplaceFeedback } from "@/data/product-marketplace-feedback";

interface ProductMarketplaceRatingProps {
  handle: string | undefined;
  className?: string;
  inverse?: boolean;
  showCount?: boolean;
  linkSource?: boolean;
}

export function ProductMarketplaceRating({
  handle,
  className = "",
  inverse = false,
  showCount = false,
  linkSource = false,
}: ProductMarketplaceRatingProps) {
  const feedback = getProductMarketplaceFeedback(handle);
  if (!feedback) return null;

  const label = `${feedback.rating.toFixed(1)} out of 5, ${feedback.sourceLabel}${
    showCount ? `, ${feedback.reviewCount.toLocaleString("en-US")} reviews` : ""
  }`;
  const visibleQualifier = feedback.scope === "similar-products" ? " similar model" : "";
  const textColor = inverse ? "text-slate-200" : "text-slate-600";

  const content = (
    <>
      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
      <span className={`text-xs font-medium ${textColor}`}>
        {feedback.rating.toFixed(1)}/5{visibleQualifier}
        {showCount ? ` · ${feedback.reviewCount.toLocaleString("en-US")} reviews` : ""}
      </span>
    </>
  );

  if (linkSource) {
    return (
      <a
        href={feedback.sourceUrl}
        target="_blank"
        rel="noopener noreferrer nofollow sponsored"
        className={`inline-flex items-center gap-1.5 underline-offset-2 hover:underline ${className}`}
        aria-label={`${label}. Opens the original review source.`}
      >
        {content}
      </a>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`} aria-label={label} title={feedback.sourceLabel}>
      {content}
    </span>
  );
}
