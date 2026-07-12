import { Truck, RotateCcw, Lock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ProductBenefit } from "@/data/product-page-config";

/* ------------------------------------------------------------------ */
/* 1) Fayda ikonları, açıklamanın altında 4'lü, Thrive stili          */
/* ------------------------------------------------------------------ */

export const BenefitIconsRow = ({ benefits }: { benefits: ProductBenefit[] }) => (
  <div className="mt-6 grid grid-cols-4 gap-2">
    {benefits.map(({ icon: Icon, label }) => (
      <div key={label} className="flex flex-col items-center text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
          <Icon className="h-5 w-5 text-blue-600" />
        </span>
        <span className="mt-2 text-[11px] font-medium leading-tight text-slate-700">
          {label}
        </span>
      </div>
    ))}
  </div>
);

/* ------------------------------------------------------------------ */
/* 2) Teklif seçici. Buy 1 / Buy 2 satırları, Thrive stili            */
/* ------------------------------------------------------------------ */

interface OfferSelectorProps {
  qty: 1 | 2;
  onSelect: (qty: 1 | 2) => void;
  /** Tek adet fiyatı (sayı) */
  unitPrice: number;
  /** Tek adet üstü çizili fiyat (Shopify compare-at; yoksa null) */
  unitCompareAt: number | null;
  currencyCode?: string;
  freeShipOnSingle: boolean;
  duoDiscountPct: number;
  formatMoney: (amount: string, currencyCode?: string) => string;
}

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="whitespace-nowrap rounded-md bg-emerald-100 px-1.5 py-[3px] text-[8px] font-bold uppercase tracking-wide text-emerald-700 sm:px-2 sm:text-[10px]">
    {children}
  </span>
);

export const OfferSelector = ({
  qty,
  onSelect,
  unitPrice,
  unitCompareAt,
  currencyCode,
  freeShipOnSingle,
  duoDiscountPct,
  formatMoney,
}: OfferSelectorProps) => {
  const fm = (n: number) => formatMoney(String(n), currencyCode);
  const duoFull = unitPrice * 2;
  const duoDiscounted = duoFull * (1 - duoDiscountPct / 100);

  const rows: Array<{
    value: 1 | 2;
    title: string;
    badges: string[];
    price: number;
    strike: number | null;
    note?: string;
  }> = [
    {
      value: 1,
      title: "Buy 1",
      badges: freeShipOnSingle ? ["Free Shipping"] : [],
      price: unitPrice,
      strike: unitCompareAt && unitCompareAt > unitPrice ? unitCompareAt : null,
    },
    {
      value: 2,
      title: "Buy 2",
      badges: [`Get Extra ${duoDiscountPct}%`, "Free Shipping"],
      price: duoDiscounted,
      strike: duoFull,
      note: "Discount applied automatically at checkout",
    },
  ];

  return (
    <div className="mt-6 grid gap-3" role="radiogroup" aria-label="Choose your offer">
      {rows.map((row) => {
        const selected = qty === row.value;
        return (
          <button
            key={row.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onSelect(row.value)}
            className={`flex w-full items-center gap-3 rounded-2xl border-2 bg-white px-4 py-4 text-left transition ${
              selected
                ? "border-slate-950 shadow-[0_12px_35px_-20px_rgba(15,23,42,0.5)]"
                : "border-slate-200 hover:border-slate-400"
            }`}
          >
            <span
              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                selected ? "border-slate-950" : "border-slate-300"
              }`}
            >
              {selected && <span className="h-2.5 w-2.5 rounded-full bg-slate-950" />}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2 sm:gap-2.5">
                <span className="whitespace-nowrap text-base font-bold text-slate-950">{row.title}</span>
                {row.badges.length > 0 && (
                  <span className="text-base font-bold text-emerald-600">+</span>
                )}
                {row.badges.length > 0 && (
                  <span className="flex min-w-0 flex-col items-start gap-0.5">
                    {row.badges.map((b) => (
                      <Badge key={b}>{b}</Badge>
                    ))}
                  </span>
                )}
              </span>
              {row.note && (
                <span className="mt-1 hidden text-[11px] text-slate-400 sm:block">{row.note}</span>
              )}
            </span>
            <span className="flex flex-col items-end">
              <span className="text-lg font-bold text-slate-950">{fm(row.price)}</span>
              {row.strike && (
                <s className="text-sm text-slate-400">{fm(row.strike)}</s>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 3) Ödeme seçenekleri, sepettekiyle birebir aynı logolar            */
/* ------------------------------------------------------------------ */

const PAYMENT_LOGOS = [
  { label: "Shop Pay", src: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Shop_Pay_logo.svg", className: "h-4 w-auto" },
  { label: "Visa", src: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Visa_Inc._logo_%282021%E2%80%93present%29.svg", className: "h-3 w-auto" },
  { label: "Mastercard", src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg", className: "h-5 w-auto" },
  { label: "American Express", src: "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg", className: "h-3 w-auto" },
  { label: "Google Pay", src: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg", className: "h-3.5 w-auto" },
  { label: "PayPal", src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg", className: "h-4 w-auto" },
];

export const PaymentLogosRow = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 ${className}`}>
    {PAYMENT_LOGOS.map((logo) => (
      <img
        key={logo.label}
        className={`${logo.className} opacity-80 transition hover:opacity-100`}
        src={logo.src}
        alt={logo.label}
        loading="lazy"
      />
    ))}
    <span className="rounded-[5px] bg-black px-2 py-[3px] text-[10px] font-semibold leading-none tracking-tight text-white">
      Apple Pay
    </span>
  </div>
);

export const PaymentOptionsRow = () => (
  <div className="mt-5">
    <p className="text-center text-xs font-medium text-slate-500">More payment options</p>
    <PaymentLogosRow className="mt-3" />
  </div>
);

/* ------------------------------------------------------------------ */
/* 4) Güven şeridi, tek satır, üç hücre, Thrive stili                 */
/* ------------------------------------------------------------------ */

export const TrustStrip = () => (
  <div className="mt-5 grid grid-cols-3 divide-x divide-slate-200 rounded-2xl border border-slate-200 bg-slate-50">
    {[
      { icon: Truck, top: "FREE SHIPPING", bottom: "On orders over $24.99" },
      { icon: RotateCcw, top: "30-DAY RETURNS", bottom: "From delivery day" },
      { icon: Lock, top: "SECURE CHECKOUT", bottom: "SSL encrypted" },
    ].map(({ icon: Icon, top, bottom }) => (
      <div key={top} className="flex flex-col items-center gap-1 px-2 py-4 text-center">
        <Icon className="h-4 w-4 text-slate-700" />
        <span className="text-[10px] font-bold tracking-wide text-slate-900">{top}</span>
        <span className="text-[10px] leading-tight text-slate-500">{bottom}</span>
      </div>
    ))}
  </div>
);

/* ------------------------------------------------------------------ */
/* 5) Bilgi accordion'u. How to Use / FAQ / Shipping & Returns        */
/* ------------------------------------------------------------------ */

interface ProductInfoAccordionProps {
  howToUse: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export const ProductInfoAccordion = ({ howToUse, faqs }: ProductInfoAccordionProps) => (
  <Accordion type="single" collapsible className="mt-5 rounded-2xl border border-slate-200 bg-white px-4">
    <AccordionItem value="how-to-use" className="border-slate-200">
      <AccordionTrigger className="text-left text-sm font-semibold text-slate-950">
        How to use
      </AccordionTrigger>
      <AccordionContent className="text-sm text-slate-600">
        <ol className="grid list-decimal gap-2 pl-4">
          {howToUse.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="faq" className="border-slate-200">
      <AccordionTrigger className="text-left text-sm font-semibold text-slate-950">
        Frequently asked questions
      </AccordionTrigger>
      <AccordionContent className="text-sm text-slate-600">
        <div className="grid gap-3">
          {faqs.slice(0, 4).map((faq) => (
            <div key={faq.question}>
              <p className="font-medium text-slate-900">{faq.question}</p>
              <p className="mt-1">{faq.answer}</p>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="shipping" className="border-b-0 border-slate-200">
      <AccordionTrigger className="text-left text-sm font-semibold text-slate-950">
        Shipping &amp; returns
      </AccordionTrigger>
      <AccordionContent className="text-sm text-slate-600">
        <p>
          Free shipping on orders over $24.99. Delivery typically takes 6-7 business days to the US, UK, Europe, Australia and New Zealand, 7-8 to Canada, and 5-6 to Singapore; other regions take 10-18 business days. Every order is covered by our 30-day return policy, counted from the day your order is delivered.
        </p>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

/* ------------------------------------------------------------------ */
/* 6) Beden tablosu — yalnizca Size varyasyonu olan urunlerde          */
/* ------------------------------------------------------------------ */

import { Ruler } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link as RouterLink } from "react-router-dom";

interface SizeChartData {
  title: string;
  columns: string[];
  rows: string[][];
  note: string;
  guideSlug?: string;
  guideLabel?: string;
}

const SIZE_CHARTS: Record<string, SizeChartData> = {
  "compression-sleeve": {
    title: "Knee sleeve size chart",
    columns: ["Size", "Length", "Upper width", "Bottom width"],
    rows: [
      ["M", "26.5 cm / 10.43 in", "15 cm / 5.91 in", "13 cm / 5.12 in"],
      ["L", "27 cm / 10.63 in", "16.5 cm / 6.5 in", "14.5 cm / 5.71 in"],
      ["XL", "27 cm / 10.63 in", "18 cm / 7.09 in", "15.5 cm / 6.1 in"],
    ],
    note: "Widths are measured with the sleeve laid flat; the knit stretches to fit. To choose, measure your leg circumference about 10 cm (4 in) above the knee and compare it to roughly twice the upper width. If you land between sizes, the manufacturer recommends the smaller size for a secure fit. A 1-3 cm variance from manual measurement is normal.",
    guideSlug: "compression-knee-sleeve-sizing-guide",
    guideLabel: "Read the full sizing guide",
  },
  insoles: {
    title: "Insole size chart",
    columns: ["Insole size", "EU", "US Men", "US Women", "Foot length"],
    rows: [
      ["35-36", "35-36", "3.5-4.5", "5-6", "22.5-23 cm"],
      ["37-38", "37-38", "5-6", "6.5-7.5", "23.5-24 cm"],
      ["39-40", "39-40", "6.5-7.5", "8-9", "24.5-25.5 cm"],
      ["41-42", "41-42", "8-9", "9.5-10.5", "26-26.5 cm"],
      ["43-44", "43-44", "9.5-10.5", "11-12", "27-28 cm"],
      ["45-46", "45-46", "11-12", "12.5-13.5", "28.5-29 cm"],
    ],
    note: "Insoles are trim-to-fit: if you are between sizes, choose the larger size and trim along the printed guide lines using your shoe's original insole as a template.",
  },
};

export const SizeChartTrigger = ({ profileKey }: { profileKey: string }) => {
  const chart = SIZE_CHARTS[profileKey];
  if (!chart) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 transition hover:text-blue-800 hover:underline"
        >
          <Ruler className="h-3.5 w-3.5" />
          Size chart
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-3xl border-slate-200 bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold tracking-tight text-slate-950">
            {chart.title}
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-slate-200 text-left">
                {chart.columns.map((col) => (
                  <th key={col} className="py-2 pr-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chart.rows.map((row) => (
                <tr key={row[0]} className="border-b border-slate-100 last:border-0">
                  {row.map((cell, i) => (
                    <td key={i} className={`py-2.5 pr-3 ${i === 0 ? "font-bold text-slate-950" : "text-slate-600"}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-1 rounded-2xl bg-slate-50 px-4 py-3 text-xs leading-5 text-slate-600">{chart.note}</p>
        {chart.guideSlug && (
          <RouterLink
            to={`/guides/${chart.guideSlug}`}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            {chart.guideLabel} →
          </RouterLink>
        )}
      </DialogContent>
    </Dialog>
  );
};
