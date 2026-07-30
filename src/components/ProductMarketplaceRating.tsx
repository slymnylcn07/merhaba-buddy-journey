import { Star } from "lucide-react";
import { getProductMarketplaceFeedback } from "@/data/product-marketplace-feedback";

interface ProductMarketplaceRatingProps {
  handle: string | undefined;
  className?: string;
  inverse?: boolean;
  showCount?: boolean;
  linkToReviews?: boolean;
}

export function ProductMarketplaceRating({
  handle,
  className = "",
  inverse = false,
  showCount = false,
  linkToReviews = false,
}: ProductMarketplaceRatingProps) {
  const feedback = getProductMarketplaceFeedback(handle);
  if (!feedback) return null;

  const label = `${feedback.rating.toFixed(1)} out of 5${
    showCount ? `, ${feedback.reviewCount.toLocaleString("en-US")} reviews` : ""
  }`;
  const textColor = inverse ? "text-slate-200" : "text-slate-600";

  const content = (
    <>
      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
      <span className={`text-xs font-medium ${textColor}`}>
        {feedback.rating.toFixed(1)}/5
        {showCount ? ` · ${feedback.reviewCount.toLocaleString("en-US")} reviews` : ""}
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
        className={`inline-flex items-center gap-1.5 underline-offset-2 hover:underline ${className}`}
        aria-label={`${label}. Jump to buyer reviews on this page.`}
      >
        {content}
      </a>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`} aria-label={label}>
      {content}
    </span>
  );
}
