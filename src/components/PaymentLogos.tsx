const PAYMENT_METHODS = [
  "Shop Pay",
  "Visa",
  "Mastercard",
  "American Express",
  "Google Pay",
  "PayPal",
  "Apple Pay",
] as const;

type PaymentMethod = (typeof PAYMENT_METHODS)[number];

const PaymentBadge = ({ method }: { method: PaymentMethod }) => {
  if (method === "Shop Pay") {
    return (
      <span className="rounded-md bg-[#5a31f4] px-2 py-1 text-[10px] font-bold leading-none text-white">
        Shop Pay
      </span>
    );
  }

  if (method === "Visa") {
    return <span className="text-[14px] font-black italic leading-none tracking-tighter text-[#1434cb]">VISA</span>;
  }

  if (method === "Mastercard") {
    return (
      <span className="relative inline-flex h-5 w-8 items-center" aria-hidden="true">
        <span className="absolute left-0 h-5 w-5 rounded-full bg-[#eb001b]" />
        <span className="absolute right-0 h-5 w-5 rounded-full bg-[#f79e1b] opacity-90" />
      </span>
    );
  }

  if (method === "American Express") {
    return (
      <span className="rounded-sm bg-[#006fcf] px-1.5 py-1 text-[8px] font-extrabold leading-none tracking-tight text-white">
        AMEX
      </span>
    );
  }

  if (method === "Google Pay") {
    return (
      <span className="text-[12px] font-semibold leading-none tracking-tight text-slate-800">
        <span className="font-bold text-[#4285f4]">G</span> Pay
      </span>
    );
  }

  if (method === "PayPal") {
    return (
      <span className="text-[12px] font-extrabold italic leading-none tracking-tight">
        <span className="text-[#003087]">Pay</span>
        <span className="text-[#009cde]">Pal</span>
      </span>
    );
  }

  return (
    <span className="rounded-[5px] bg-black px-2 py-[4px] text-[10px] font-semibold leading-none tracking-tight text-white">
      Apple Pay
    </span>
  );
};

export const PaymentLogosRow = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 ${className}`}>
    {PAYMENT_METHODS.map((method) => (
      <span
        key={method}
        role="img"
        aria-label={method}
        className="inline-flex h-6 items-center opacity-80 transition hover:opacity-100"
      >
        <PaymentBadge method={method} />
      </span>
    ))}
  </div>
);

export const PaymentOptionsRow = ({ className = "" }: { className?: string }) => (
  <div className={`mt-5 ${className}`}>
    <p className="text-center text-xs font-medium text-slate-500">More payment options</p>
    <PaymentLogosRow className="mt-3" />
  </div>
);
