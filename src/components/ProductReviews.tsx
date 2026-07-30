import { useState } from "react";
import { BadgeCheck, ChevronDown, ShieldCheck, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { getProductMarketplaceFeedback } from "@/data/product-marketplace-feedback";
import { getPublicProductHandle, PRIMARY_PRODUCT_HANDLE } from "@/lib/product-config";

interface Review {
  name: string;
  date: string;
  details: string;
  text: string;
  rating?: number;
}

interface ProductReviewSet {
  reviews: Review[];
  highlights: string[];
}

const productReviewsByHandle: Record<string, ProductReviewSet> = {
  [PRIMARY_PRODUCT_HANDLE]: {
    highlights: ["Comfortable warmth", "Easy to use", "Secure fit", "Simple controls"],
    reviews: [
      {
        name: "Buyer",
        date: "19 May 2026",
        details: "Color: White",
        text: "Very good. I am looking forward to using it regularly.",
      },
      {
        name: "Buyer",
        date: "31 Mar 2026",
        details: "Color: White",
        text:
          "Two relatives recommended this model to me. It matches the description and images, arrived earlier than expected and feels like excellent value for the quality.",
      },
      {
        name: "Buyer",
        date: "10 Mar 2026",
        details: "Color: White",
        text: "It ran smoothly from the first use and felt comfortable on my knee. I am happy to recommend it.",
      },
      {
        name: "Buyer",
        date: "09 Jan 2026",
        details: "Color: White",
        text: "The carrier initially sent it to the wrong address, but it was recovered and delivered. The device itself arrived in good condition.",
      },
      {
        name: "Buyer",
        date: "01 Jan 2026",
        details: "Color: White",
        text:
          "I have used the knee massager each day since delivery and it is working well. The higher setting gets very warm, so I keep fabric between the device and my skin and recharge it regularly.",
      },
      {
        name: "Buyer",
        date: "27 Sep 2025",
        details: "Color: White",
        text: "My knee feels more comfortable after using it.",
      },
      {
        name: "Buyer",
        date: "16 Jul 2025",
        details: "Color: White",
        text: "I also tried it around my Achilles area and liked the experience. For the price, the device feels like good value.",
      },
      {
        name: "Buyer",
        date: "26 Jan 2026",
        details: "Color: White",
        text: "The delivery was very fast and the massager is excellent.",
      },
      {
        name: "Buyer",
        date: "11 Dec 2025",
        details: "Color: White",
        text: "I bought it for my mother and it works very well. The massage surprised me and the heat feels strong.",
      },
    ],
  },
  "flexiknee-compression-support-sleeve": {
    highlights: ["Supportive fit", "Stays in place", "Stretchy fabric", "Easy to wear"],
    reviews: [
      {
        name: "Buyer",
        date: "12 Jan 2026",
        details: "Color: Orange, Size: XL",
        text: "Very satisfied. It is longer than my old sleeve, covers more of the knee and is easy to spot in the wash.",
      },
      {
        name: "Buyer",
        date: "16 Feb 2026",
        details: "Color: Black, Size: S",
        text: "Fits my leg well and feels firmer than another brand. It stayed in place better during a workout, so I ordered a second one.",
      },
      {
        name: "Buyer",
        date: "16 Nov 2025",
        details: "Color: Black, Size: M",
        text: "Good quality and very satisfying. I would buy it for friends.",
      },
      {
        name: "Buyer",
        date: "05 Jan 2026",
        details: "Color: Dark blue, Size: XL",
        text: "Looks good and feels comfortable. I plan to use it for pickleball.",
      },
      {
        name: "Buyer",
        date: "04 Nov 2025",
        details: "Color: Dark blue, Size: L",
        text: "Works well and stretches the way I need.",
      },
      {
        name: "Buyer",
        date: "30 Jan 2026",
        details: "Color: Red, Size: L",
        text: "The smaller size fits me better for pickleball than the XL sleeve I bought before.",
      },
      {
        name: "Buyer",
        date: "20 Sep 2025",
        details: "Color: Black, Size: M",
        text: "The support helped me get through a long school and work day more comfortably.",
      },
      {
        name: "Buyer",
        date: "30 Nov 2025",
        details: "Color: Red, Size: L",
        text: "The material feels excellent and gives my legs good support.",
      },
      {
        name: "Buyer",
        date: "06 Mar 2026",
        details: "Color: Dark blue, Size: M",
        text: "Perfect fit and it looks high quality.",
      },
    ],
  },
  "flexiknee-calf-massager": {
    highlights: ["Strong compression", "Wireless use", "Easy controls", "Comfortable routine"],
    reviews: [
      {
        name: "Buyer",
        date: "10 Jan 2026",
        details: "1 piece, 3 modes",
        text: "The finish feels good, the fastening is durable and the compression is pleasantly firm during a 15 minute routine.",
      },
      {
        name: "Buyer",
        date: "13 May 2026",
        details: "2 pieces, 4 modes",
        text: "It arrived quickly. The squeezing and releasing action feels strong even before increasing the level, and the stitching looks better than in the photos.",
      },
      {
        name: "Buyer",
        date: "05 Sep 2025",
        details: "2 pieces, 3 modes",
        text: "The pressure feels just right and the wireless design is convenient. It is good value for the price.",
      },
      {
        name: "Buyer",
        date: "01 Sep 2025",
        details: "1 piece, 3 modes",
        text: "The air pressure is strong and the massage feels cool and pleasant. Highly recommended.",
      },
      {
        name: "Buyer",
        date: "14 Feb 2026",
        details: "2 pieces, 4 modes",
        text: "A good purchase with satisfying compression. Wearing the adjuster toward the side made the fit more comfortable for me.",
      },
      {
        name: "Buyer",
        date: "16 Aug 2025",
        details: "2 pieces, 3 modes",
        text: "Great value for money. The second pressure level is enough for my routine.",
      },
      {
        name: "Buyer",
        date: "02 Sep 2025",
        details: "2 pieces, 3 modes",
        text: "The massage feels good and leaves my calves relaxed after a tiring day.",
      },
      {
        name: "Buyer",
        date: "04 Jun 2026",
        details: "1 piece, 3 modes",
        text: "I have been using it every evening since it arrived. Very good and easy to recommend.",
      },
      {
        name: "Buyer",
        date: "03 Sep 2025",
        details: "2 pieces, 3 modes",
        text: "It arrived quickly and works wonderfully. My calves feel pleasantly relaxed after a session.",
      },
    ],
  },
  "flexiknee-usb-heated-knee-wrap": {
    highlights: ["Pleasant warmth", "Adjustable heat", "Flexible fit", "Portable power"],
    reviews: [
      {
        name: "Buyer",
        date: "05 Nov 2025",
        details: "Heating model, Black",
        text: "The controls are a little large, but the wrap fits well around my knee and the warmth feels great.",
      },
      {
        name: "Buyer",
        date: "26 Mar 2026",
        details: "Color: Black",
        text: "Everything works well. I am very pleased with the product.",
      },
      {
        name: "Buyer",
        date: "08 Feb 2026",
        details: "Color: Black",
        text: "It feels very good on my knee and I am satisfied with it.",
      },
      {
        name: "Buyer",
        date: "10 Oct 2025",
        details: "Color: Black",
        text: "Excellent and very practical for a simple warming routine.",
      },
      {
        name: "Buyer",
        date: "26 Oct 2025",
        details: "Heating model, Black",
        text: "Fits really well and should be useful when my knees feel tight or sore. It was also packed nicely.",
      },
      {
        name: "Buyer",
        date: "30 Oct 2025",
        details: "Heating model, Black",
        text: "A solid product that works as described.",
      },
      {
        name: "Buyer",
        date: "23 May 2026",
        details: "Color: Black",
        text: "It arrived undamaged and works without any issues. The highest heat setting is especially comfortable in cold weather.",
      },
      {
        name: "Buyer",
        date: "12 Feb 2026",
        details: "Color: Black",
        text: "Works perfectly and gets very warm on the highest setting. A power bank makes it easy to use away from an outlet.",
      },
      {
        name: "Buyer",
        date: "26 Mar 2026",
        details: "Color: Black",
        text: "The quality feels good. It warms up quickly on the maximum setting, then the lower level is enough to maintain the warmth.",
      },
    ],
  },
  "flexiknee-sport-orthopedic-insoles": {
    highlights: ["Comfortable fit", "Arch support", "Lightweight feel", "Good finish"],
    reviews: [
      {
        name: "Buyer",
        date: "04 Dec 2025",
        details: "Blue, EU 45-46",
        text: "The EU size matches perfectly. The material feels good in my shoes and the arch support is a welcome feature.",
      },
      {
        name: "Buyer",
        date: "15 Jan 2026",
        details: "Blue, EU 37-38",
        text: "It arrived in 11 days and appears to meet my needs so far.",
      },
      {
        name: "Buyer",
        date: "07 Sep 2025",
        details: "Blue, EU 43-44",
        text: "Satisfied so far. They are lightweight, hold their shape well and feel comfortable inside my shoes.",
      },
      {
        name: "Buyer",
        date: "15 Sep 2025",
        details: "Blue, EU 43-44",
        text: "The description was accurate and I am very satisfied with the insoles.",
      },
      {
        name: "Buyer",
        date: "11 Nov 2025",
        details: "Blue, EU 45-46",
        text: "The arch felt firm at first, but these are excellent if you prefer noticeable support.",
        rating: 4,
      },
      {
        name: "Buyer",
        date: "12 Oct 2025",
        details: "Blue, EU 45-46",
        text: "Very pleased with the purchase and I would buy them again.",
      },
      {
        name: "Buyer",
        date: "31 Jul 2025",
        details: "Blue, EU 43-44",
        text: "Excellent insoles with a good finish.",
      },
      {
        name: "Buyer",
        date: "11 Nov 2025",
        details: "Blue, EU 41-42",
        text: "Very good and comfortable in my shoes.",
      },
      {
        name: "Buyer",
        date: "31 Oct 2025",
        details: "Blue, EU 43-44",
        text: "They are not extremely rigid, but they feel fair for the price.",
        rating: 4,
      },
    ],
  },
};

function Stars({ value, className = "" }: { value: number; className?: string }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= Math.round(value) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

function ProductReviewsSection({
  handle,
  productName,
}: {
  handle: string;
  productName: string;
}) {
  const [showNotice, setShowNotice] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const publicHandle = getPublicProductHandle(handle);
  const feedback = getProductMarketplaceFeedback(publicHandle);
  const reviewSet = productReviewsByHandle[publicHandle];

  if (!feedback || !reviewSet) return null;

  const visibleReviews = showAll ? reviewSet.reviews : reviewSet.reviews.slice(0, 3);
  const headingId = `reviews-heading-${publicHandle}`;

  return (
    <section id="product-reviews" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20" aria-labelledby={headingId}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-2 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          <BadgeCheck className="h-4 w-4" /> Buyer feedback
        </div>
        <h2
          id={headingId}
          className="text-center text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl"
        >
          What buyers say about {productName}
        </h2>

        <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:justify-center sm:gap-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold text-slate-950">{feedback.rating.toFixed(1)}</span>
            <div>
              <Stars value={feedback.rating} />
              <p className="mt-1 text-sm text-slate-500">
                {feedback.reviewCount.toLocaleString("en-US")} buyer reviews
              </p>
            </div>
          </div>
          <div className="hidden h-12 w-px bg-slate-200 sm:block" />
          <div className="flex flex-col items-center gap-1.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              What customers mention
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {reviewSet.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>
        <p className="mx-auto mt-3 max-w-2xl text-center text-xs leading-5 text-slate-400">
          Buyer feedback reflects individual experiences with the product. Comfort, fit and preferences may vary.
        </p>

        <div className="mt-8 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0">
          {visibleReviews.map((review, index) => (
            <div
              key={`${review.date}-${index}`}
              className="flex w-[80vw] max-w-[300px] flex-shrink-0 snap-center flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:w-auto sm:max-w-none"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                  {review.name.charAt(0)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">{review.name}</p>
                  <p className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                    <ShieldCheck className="h-3 w-3" /> Verified purchase
                  </p>
                </div>
              </div>
              <Stars value={review.rating ?? 5} className="mt-3" />
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{review.text}</p>
              <p className="mt-3 text-xs text-slate-400">
                {review.details} · {review.date}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() => setShowAll((visible) => !visible)}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-500 hover:bg-slate-50"
          >
            {showAll ? "Show fewer reviews" : "More reviews"}
            <ChevronDown className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
          </button>
        </div>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setShowNotice((visible) => !visible)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-500 hover:text-blue-600"
          >
            Write a review
          </button>
          {showNotice && (
            <div className="mx-auto mt-4 max-w-lg rounded-2xl border border-amber-200 bg-amber-50 p-5 text-left">
              <p className="text-sm font-semibold text-amber-900">Reviews are for verified customers only</p>
              <p className="mt-1 text-sm leading-6 text-amber-800">
                To keep reviews trustworthy, only customers who have purchased this product can leave one. If you have
                placed an order, reply to your order confirmation email or{" "}
                <Link to="/track-order" className="font-semibold underline">
                  reach us through your order
                </Link>{" "}
                to share your experience.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function ProductReviews() {
  return (
    <ProductReviewsSection
      handle={PRIMARY_PRODUCT_HANDLE}
      productName="the FlexiKnee massager"
    />
  );
}

export function ProductReviewSummary({
  handle,
  productName,
}: {
  handle: string | undefined;
  productName: string;
}) {
  if (!handle) return null;
  return <ProductReviewsSection handle={handle} productName={productName} />;
}
