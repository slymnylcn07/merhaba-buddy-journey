import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { PRIMARY_PRODUCT_PATH } from "@/lib/product-config";

interface ArticleNextStepsProps {
  nextSlug?: string;
  nextTitle?: string;
}

/**
 * Makale biterken okuyucuya üç net yol sunar:
 * 1) İlgili ürün  2) Kişisel quiz  3) Sıradaki makale
 * "Back to Guides" çıkmaz sokağının yerine geçer.
 */
export const ArticleNextSteps = ({ nextSlug, nextTitle }: ArticleNextStepsProps) => (
  <section className="py-12" data-block="article-next-steps">
    <div className="container px-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold tracking-tight text-slate-950">
        Where to go from here
      </h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <Link
          to={PRIMARY_PRODUCT_PATH}
          className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <img
            src="/images/flexiknee-product-main.webp"
            alt="FlexiKnee Smart Heated Knee Massager"
            loading="lazy"
            className="h-28 w-full rounded-xl object-cover"
          />
          <span className="mt-3 text-sm font-semibold text-slate-950">
            Put this guide into practice
          </span>
          <span className="mt-1 text-xs leading-5 text-slate-500">
            Warmth, red light, and gentle vibration in one wireless wrap. 60-day home trial.
          </span>
          <span className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-semibold text-blue-600">
            See the FlexiKnee
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </span>
        </Link>

        <Link
          to="/knee-quiz"
          className="group flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <span className="flex h-28 w-full items-center justify-center rounded-xl bg-white">
            <Sparkles className="h-8 w-8 text-blue-600" />
          </span>
          <span className="mt-3 text-sm font-semibold text-slate-950">
            Not sure where to start?
          </span>
          <span className="mt-1 text-xs leading-5 text-slate-500">
            Answer 4 quick questions and get a personalized knee comfort routine.
          </span>
          <span className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-semibold text-blue-600">
            Take the 60-second quiz
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </span>
        </Link>

        {nextSlug ? (
          <Link
            to={`/guides/${nextSlug}`}
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="flex h-28 w-full items-center justify-center rounded-xl bg-slate-50 px-3 text-center text-xs font-medium text-slate-500">
              Keep reading
            </span>
            <span className="mt-3 text-sm font-semibold text-slate-950">
              {nextTitle || "Next guide"}
            </span>
            <span className="mt-1 text-xs leading-5 text-slate-500">
              Continue building your knee comfort knowledge.
            </span>
            <span className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-semibold text-blue-600">
              Read next
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        ) : (
          <Link
            to="/guides"
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="flex h-28 w-full items-center justify-center rounded-xl bg-slate-50 px-3 text-center text-xs font-medium text-slate-500">
              Explore all guides
            </span>
            <span className="mt-3 text-sm font-semibold text-slate-950">Browse the guide library</span>
            <span className="mt-1 text-xs leading-5 text-slate-500">
              70+ practical guides organized by situation.
            </span>
            <span className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-semibold text-blue-600">
              All guides
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        )}
      </div>
    </div>
  </section>
);
