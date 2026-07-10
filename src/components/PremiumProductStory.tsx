import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import type { ProductProfile, ProductVisual } from "@/data/product-profiles";

type StoryKey = ProductProfile["key"] | "massager";

interface PremiumProductStoryProps {
  productName: string;
  productKey: StoryKey;
  eyebrow: string;
  headline: string;
  intro: string;
  visuals: ProductVisual[];
  highlights?: string[];
}

const themeMap: Record<StoryKey, { soft: string; glow: string; accent: string }> = {
  massager: {
    soft: "from-blue-50 via-white to-slate-50",
    glow: "bg-blue-400/20",
    accent: "text-blue-300",
  },
  insoles: {
    soft: "from-emerald-50 via-white to-blue-50",
    glow: "bg-emerald-400/20",
    accent: "text-emerald-300",
  },
  "compression-sleeve": {
    soft: "from-slate-50 via-white to-indigo-50",
    glow: "bg-indigo-400/20",
    accent: "text-indigo-300",
  },
  "heated-wrap": {
    soft: "from-orange-50 via-white to-amber-50",
    glow: "bg-orange-400/20",
    accent: "text-orange-300",
  },
  "calf-massager": {
    soft: "from-cyan-50 via-white to-blue-50",
    glow: "bg-cyan-400/20",
    accent: "text-cyan-300",
  },
  generic: {
    soft: "from-slate-50 via-white to-blue-50",
    glow: "bg-blue-400/20",
    accent: "text-blue-300",
  },
};

export const PremiumProductStory = ({
  productName,
  productKey,
  eyebrow,
  headline,
  intro,
  visuals,
  highlights = [],
}: PremiumProductStoryProps) => {
  const theme = themeMap[productKey] || themeMap.generic;
  const [hero, second, third, fourth] = visuals;

  if (!hero) return null;

  return (
    <section className={`overflow-hidden bg-gradient-to-b ${theme.soft} py-16 sm:py-20 lg:py-24`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">{eyebrow}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-4xl lg:text-5xl">
            {headline}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">{intro}</p>
        </div>

        <article className="relative mt-10 overflow-hidden rounded-[2rem] border border-white/70 bg-slate-950 shadow-[0_40px_120px_-65px_rgba(15,23,42,0.95)] sm:rounded-[2.5rem]">
          <img
            src={hero.image}
            alt={hero.alt}
            className="h-[420px] w-full object-cover sm:h-[520px] lg:h-[610px]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          <div className={`absolute -right-24 -top-24 h-80 w-80 rounded-full blur-3xl ${theme.glow}`} />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14">
            <div className="max-w-2xl">
              <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${theme.accent}`}>{productName}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">{hero.title}</h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200 sm:text-base sm:leading-8">{hero.text}</p>
            </div>
          </div>
        </article>

        {(second || third) && (
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {second && (
              <article className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="overflow-hidden">
                  <img
                    src={second.image}
                    alt={second.alt}
                    className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Designed for real routines</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">{second.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{second.text}</p>
                </div>
              </article>
            )}

            {third && (
              <article className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="overflow-hidden">
                  <img
                    src={third.image}
                    alt={third.alt}
                    className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Made to stay in the day</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">{third.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{third.text}</p>
                </div>
              </article>
            )}
          </div>
        )}

        {fourth && (
          <article className="relative mt-6 overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-[0_35px_100px_-70px_rgba(15,23,42,0.95)] sm:rounded-[2.5rem]">
            <div className="grid lg:grid-cols-[1.04fr_0.96fr] lg:items-stretch">
              <div className="relative min-h-[340px] overflow-hidden sm:min-h-[420px]">
                <img src={fourth.image} alt={fourth.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-950/20 lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950/70" />
              </div>
              <div className="relative flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                <div className={`absolute -right-24 top-0 h-72 w-72 rounded-full blur-3xl ${theme.glow}`} />
                <div className="relative">
                  <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${theme.accent}`}>A more complete product story</p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{fourth.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">{fourth.text}</p>

                  {highlights.length > 0 && (
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {highlights.slice(0, 4).map((item) => (
                        <div key={item} className="flex items-start gap-2.5 rounded-2xl border border-white/10 bg-white/5 p-3.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" />
                          <span className="text-sm leading-6 text-slate-200">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Link to="/knee-quiz" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-blue-300">
                    Find the right FlexiKnee product <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        )}
      </div>
    </section>
  );
};
