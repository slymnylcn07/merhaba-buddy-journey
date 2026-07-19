const PAYMENT_LOGOS = [
  { label: "Shop Pay", src: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Shop_Pay_logo.svg", className: "h-4 w-auto" },
  { label: "Visa", src: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Visa_Inc._logo_%282021%E2%80%93present%29.svg", className: "h-3 w-auto" },
  { label: "Mastercard", src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg", className: "h-5 w-auto" },
  { label: "American Express", src: "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg", className: "h-3 w-auto" },
  { label: "Google Pay", src: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg", className: "h-3.5 w-auto" },
  { label: "PayPal", src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg", className: "h-4 w-auto" },
] as const;

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

export const PaymentOptionsRow = ({ className = "" }: { className?: string }) => (
  <div className={`mt-5 ${className}`}>
    <p className="text-center text-xs font-medium text-slate-500">More payment options</p>
    <PaymentLogosRow className="mt-3" />
  </div>
);
