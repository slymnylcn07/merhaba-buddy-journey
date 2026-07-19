import shopPayLogo from "@/assets/payment-shop-pay.svg";
import visaLogo from "@/assets/payment-visa.svg";
import mastercardLogo from "@/assets/payment-mastercard.svg";
import amexLogo from "@/assets/payment-amex.svg";
import googlePayLogo from "@/assets/payment-google-pay.svg";
import paypalLogo from "@/assets/payment-paypal.svg";
import applePayLogo from "@/assets/payment-apple-pay.svg";

const PAYMENT_LOGOS = [
  { label: "Shop Pay", src: shopPayLogo, className: "h-5 w-auto" },
  { label: "Visa", src: visaLogo, className: "h-5 w-auto" },
  { label: "Mastercard", src: mastercardLogo, className: "h-5 w-auto" },
  { label: "American Express", src: amexLogo, className: "h-5 w-auto" },
  { label: "Google Pay", src: googlePayLogo, className: "h-5 w-auto" },
  { label: "PayPal", src: paypalLogo, className: "h-5 w-auto" },
  { label: "Apple Pay", src: applePayLogo, className: "h-5 w-auto" },
] as const;

export const PaymentLogosRow = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 ${className}`}>
    {PAYMENT_LOGOS.map((logo) => (
      <img
        key={logo.label}
        className={`${logo.className} max-w-[64px] opacity-85 transition hover:opacity-100`}
        src={logo.src}
        alt={logo.label}
        loading="lazy"
        decoding="async"
      />
    ))}
  </div>
);

export const PaymentOptionsRow = ({ className = "" }: { className?: string }) => (
  <div className={`mt-5 ${className}`}>
    <p className="text-center text-xs font-medium text-slate-500">More payment options</p>
    <PaymentLogosRow className="mt-3" />
  </div>
);
