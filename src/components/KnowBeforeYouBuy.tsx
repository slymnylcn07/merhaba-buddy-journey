import { Sparkles, ShieldAlert, Stethoscope } from "lucide-react";

/**
 * Know before you buy.
 *
 * Dürüst çerçeve: cihazın ne yaptığını, neyi iddia ETMEDİĞİNİ ve
 * kullanmadan önce hekime danışılması gereken durumları açıkça söyler.
 * Hem müşteri güveni hem reklam/FTC riski açısından önemli.
 */

const CARDS = [
  {
    icon: Sparkles,
    tone: "blue",
    title: "What it does",
    body:
      "Provides adjustable warmth, massage-style vibration and a secure wraparound fit for a short at-home comfort routine.",
  },
  {
    icon: ShieldAlert,
    tone: "slate",
    title: "What it does not claim",
    body:
      "FlexiKnee is not presented as a cure, a medical treatment, or a replacement for professional healthcare.",
  },
  {
    icon: Stethoscope,
    tone: "amber",
    title: "Before you use it",
    body:
      "Ask a healthcare professional first if you have had recent surgery, an acute injury, unexplained swelling, reduced sensation, or advice to avoid heat.",
  },
] as const;

const TONES: Record<string, { ring: string; icon: string; bg: string }> = {
  blue: { ring: "ring-blue-100", icon: "text-blue-600", bg: "bg-blue-50" },
  slate: { ring: "ring-slate-200", icon: "text-slate-600", bg: "bg-slate-100" },
  amber: { ring: "ring-amber-100", icon: "text-amber-600", bg: "bg-amber-50" },
};

export const KnowBeforeYouBuy = () => (
  <section className="bg-white py-14 sm:py-16" aria-labelledby="know-before-heading">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <h2
        id="know-before-heading"
        className="text-center text-2xl font-semibold tracking-[-0.02em] text-slate-950 sm:text-3xl"
      >
        Know before you buy
      </h2>
      <p className="mx-auto mt-2 max-w-2xl text-center text-sm leading-6 text-slate-600">
        Clear about what this device is, and what it is not.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {CARDS.map((card) => {
          const tone = TONES[card.tone];
          return (
            <div
              key={card.title}
              className={`flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ${tone.ring}`}
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone.bg}`}>
                <card.icon className={`h-5 w-5 ${tone.icon}`} />
              </span>
              <p className="mt-3.5 text-sm font-bold text-slate-950">{card.title}</p>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">{card.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
