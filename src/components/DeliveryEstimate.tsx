import { useEffect, useState } from "react";
import { Truck } from "lucide-react";
import {
  getDeliveryWindow,
  HANDLING_WINDOW,
  addBusinessDays,
  formatDeliveryDate,
  hoursUntilMidnight,
} from "@/lib/delivery-estimates";
import { formatStandardShippingRate, getShippingPolicy } from "@/lib/shipping-policy";
import { getMarketCountry } from "@/lib/market";

interface DeliveryEstimateProps {
  className?: string;
  /** Kart basligi "Free Standard Delivery" mi "Standard Delivery" mi olsun */
  freeShipping?: boolean;
  currencyCode?: string;
  /** Sepet gibi dar alanlar icin kucuk surum */
  compact?: boolean;
}

/**
 * Teslimat karti: baslik + hedef ulke + tarih araligi +
 * hedef ulkenin gece yarisina geri sayim ("Order in the next Xh Ym").
 */
export const DeliveryEstimate = ({
  className = "",
  freeShipping = true,
  currencyCode,
  compact = false,
}: DeliveryEstimateProps) => {
  const country = getMarketCountry();
  const shippingPolicy = getShippingPolicy(country);
  const marketLabel = shippingPolicy.marketLabel;
  const standardShippingLabel =
    currencyCode && currencyCode !== shippingPolicy.currencyCode
      ? "calculated at checkout"
      : formatStandardShippingRate(country);
  const [countdown, setCountdown] = useState<{ hours: number; minutes: number } | null>(() =>
    hoursUntilMidnight(country),
  );

  // Geri sayimi dakikada bir tazele
  useEffect(() => {
    const id = window.setInterval(() => setCountdown(hoursUntilMidnight(country)), 60_000);
    return () => window.clearInterval(id);
  }, [country]);

  const window_ = getDeliveryWindow(country);
  const now = new Date();
  const startDate = formatDeliveryDate(
    addBusinessDays(now, HANDLING_WINDOW.min + window_.min),
  );
  const endDate = formatDeliveryDate(
    addBusinessDays(now, HANDLING_WINDOW.max + window_.max),
  );

  return (
    <div
      className={`flex items-center rounded-2xl border border-blue-100 bg-blue-50/70 ${
        compact ? "gap-2.5 px-3 py-2" : "gap-3 px-4 py-3"
      } ${className}`}
    >
      <span
        className={`flex flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm ${
          compact ? "h-8 w-8" : "h-10 w-10"
        }`}
      >
        <Truck className={compact ? "h-4 w-4 text-blue-600" : "h-5 w-5 text-blue-600"} />
      </span>
      <div className="min-w-0 text-left">
        <p className={`font-bold text-slate-950 ${compact ? "text-xs leading-4" : "text-sm leading-5"}`}>
          {freeShipping
            ? "Free Standard Delivery"
            : `Standard Delivery · ${standardShippingLabel}`}
        </p>
        <p className={`text-slate-600 ${compact ? "text-[11px] leading-4" : "text-xs leading-5"}`}>
          To <span className="font-semibold text-slate-800">{marketLabel}</span> · {startDate} – {endDate}
        </p>
        {countdown && (
          <p className={`text-blue-700 ${compact ? "text-[10px] leading-4" : "text-[11px] leading-4"}`}>
            Order in the next {countdown.hours}h {countdown.minutes}m for these dates
          </p>
        )}
      </div>
    </div>
  );
};
