import { useState } from "react";
import { Star, ShieldCheck, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Verified product reviews for the flagship device.
 *
 * These are real, verified-purchase reviews of this exact product, aggregated
 * at the product level (not store-exclusive claims). Rating/count reflect the
 * product's verified reviews. Do NOT invent additional reviews or present the
 * count as flexi-knee.com order volume — that is an FTC fake-review risk.
 */

const RATING = 4.7;
const REVIEW_COUNT = 238;

interface Review {
  name: string;
  date: string;
  color: string;
  text: string;
}

const REVIEWS: Review[] = [
  {
    name: "Verified Buyer",
    date: "19 May 2026",
    color: "White",
    text: "I will use it well. It's very good.",
  },
  {
    name: "Verified Buyer",
    date: "31 Mar 2026",
    color: "White",
    text:
      "Two close relatives who already have it recommended it to me. It perfectly matches the entire description and the images shown. Personally, this is the most highly valued model. I received it earlier than expected, very good service through the postal service. Excellent quality-price ratio. Highly recommended.",
  },
  {
    name: "Verified Buyer",
    date: "10 Mar 2026",
    color: "White",
    text:
      "After the first use it works smoothly and feels like real pain relief. Really good product, I recommend it to anyone who suffers, it helps.",
  },
  {
    name: "J.",
    date: "09 Jan 2026",
    color: "White",
    text:
      "Everything is fine. It was marked as delivered before it reached me; it was tracked with the carrier, had gone to the wrong address, was retrieved and I finally received it. I repeat, everything is okay.",
  },
  {
    name: "Verified Buyer",
    date: "01 Jan 2026",
    color: "White",
    text:
      "The knee massager is fantastic. I've used it each day since delivery and it's working well. One day I used it on bare skin, which wasn't a good idea as my skin got extremely hot, so keep the sleeve between. The manual says not to run the unit flat, so every couple of days I recharge it.",
  },
  {
    name: "T.",
    date: "27 Sep 2025",
    color: "White",
    text: "My knee feels better after using it.",
  },
  {
    name: "J.",
    date: "16 Jul 2025",
    color: "White",
    text:
      "I'm not sure yet if it's working on my knee, but I've used it on my achilles and it's fantastic. For the price, I would definitely recommend it for chronic issues like tendinitis and degenerative joints.",
  },
];

const HIGHLIGHTS = ["Pain relief", "Works well", "Comfortable fit", "Easy to use"];

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

export function ProductReviews() {
  const [showNotice, setShowNotice] = useState(false);

  return (
    <section id="product-reviews" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20" aria-labelledby="reviews-heading">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-2 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          <BadgeCheck className="h-4 w-4" /> Verified product reviews
        </div>
        <h2
          id="reviews-heading"
          className="text-center text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl"
        >
          What customers say about this device
        </h2>

        {/* Summary */}
        <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:justify-center sm:gap-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold text-slate-950">{RATING.toFixed(1)}</span>
            <div>
              <Stars value={RATING} />
              <p className="mt-1 text-sm text-slate-500">{REVIEW_COUNT} verified buyer reviews</p>
            </div>
          </div>
          <div className="hidden h-12 w-px bg-slate-200 sm:block" />
          <div className="flex flex-wrap justify-center gap-2">
            {HIGHLIGHTS.map((h) => (
              <span key={h} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                {h}
              </span>
            ))}
          </div>
        </div>
        <p className="mx-auto mt-3 max-w-2xl text-center text-xs leading-5 text-slate-400">
          Verified-purchase reviews for this product. Individual results vary; this device supports everyday
          comfort.
        </p>

        {/* Review cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <div key={i} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                  {r.name.charAt(0)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">{r.name}</p>
                  <p className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                    <ShieldCheck className="h-3 w-3" /> Verified purchase
                  </p>
                </div>
              </div>
              <Stars value={5} className="mt-3" />
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{r.text}</p>
              <p className="mt-3 text-xs text-slate-400">
                Color: {r.color} · {r.date}
              </p>
            </div>
          ))}
        </div>

        {/* Write a review (verified buyers only) */}
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setShowNotice((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-500 hover:text-blue-600"
          >
            Write a review
          </button>
          {showNotice && (
            <div className="mx-auto mt-4 max-w-lg rounded-2xl border border-amber-200 bg-amber-50 p-5 text-left">
              <p className="text-sm font-semibold text-amber-900">Reviews are for verified customers only</p>
              <p className="mt-1 text-sm leading-6 text-amber-800">
                To keep reviews trustworthy, only customers who have purchased this device can leave one. If
                you have placed an order, reply to your order confirmation email or{" "}
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
