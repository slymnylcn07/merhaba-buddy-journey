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
  <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
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
      badges: freeShipOnSingle ? ["+ Free Shipping"] : [],
      price: unitPrice,
      strike: unitCompareAt && unitCompareAt > unitPrice ? unitCompareAt : null,
    },
    {
      value: 2,
      title: "Buy 2",
      badges: [
        `Get Extra ${duoDiscountPct}%`,
        ...(!freeShipOnSingle ? ["+ Free Shipping"] : []),
      ],
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
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-base font-bold text-slate-950">{row.title}</span>
                {row.badges.map((b) => (
                  <Badge key={b}>{b}</Badge>
                ))}
              </span>
              {row.note && (
                <span className="mt-0.5 hidden text-[11px] text-slate-400 sm:block">{row.note}</span>
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

export const PaymentOptionsRow = () => (
  <div className="mt-5">
    <p className="text-center text-xs font-medium text-slate-500">More payment options</p>
    <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5">
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
          Free shipping on orders over $24.99. Delivery typically takes 7–12 business days to the US and UK, 8–14 to most other regions. Every order is covered by our 30-day return policy, counted from the day your order is delivered.
        </p>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
