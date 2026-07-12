import { useEffect, useState } from "react";
import { Truck } from "lucide-react";
import {
  getDeliveryWindow,
  getCountryName,
  addBusinessDays,
  formatDeliveryDate,
  hoursUntilMidnight,
  DEFAULT_WINDOW,
} from "@/lib/delivery-estimates";

// Ulke bilgisini oturum boyunca bir kez cek, tum kartlar paylassin
let geoPromise: Promise<string | null> | null = null;
function fetchCountry(): Promise<string | null> {
  if (!geoPromise) {
    geoPromise = fetch("/api/geo")
      .then((r) => (r.ok ? r.json() : { country: null }))
      .then((d) => d.country || null)
      .catch(() => null);
  }
  return geoPromise;
}

interface DeliveryEstimateProps {
  className?: string;
  /** Kart basligi "Free Standard Delivery" mi "Standard Delivery" mi olsun */
  freeShipping?: boolean;
  /** Sepet gibi dar alanlar icin kucuk surum */
  compact?: boolean;
}

/**
 * Teslimat karti: baslik + hedef ulke + tarih araligi +
 * hedef ulkenin gece yarisina geri sayim ("Order in the next Xh Ym").
 */
export const DeliveryEstimate = ({ className = "", freeShipping = true, compact = false }: DeliveryEstimateProps) => {
  const [country, setCountry] = useState<string | null>(null);
  const [resolved, setResolved] = useState(false);
  const [countdown, setCountdown] = useState<{ hours: number; minutes: number } | null>(null);

  useEffect(() => {
    let active = true;
    fetchCountry().then((c) => {
      if (!active) return;
      setCountry(c);
      setResolved(true);
      setCountdown(hoursUntilMidnight(c));
    });
    return () => {
      active = false;
    };
  }, []);

  // Geri sayimi dakikada bir tazele
  useEffect(() => {
    if (!resolved) return;
    const id = window.setInterval(() => setCountdown(hoursUntilMidnight(country)), 60_000);
    return () => window.clearInterval(id);
  }, [resolved, country]);

  const window_ = country ? getDeliveryWindow(country) : DEFAULT_WINDOW;
  const now = new Date();
  const startDate = formatDeliveryDate(addBusinessDays(now, window_.min));
  const endDate = formatDeliveryDate(addBusinessDays(now, window_.max));

  return (
    <div
      className={`flex items-center rounded-2xl border border-blue-100 bg-blue-50/70 ${
        compact ? "gap-2.5 px-3 py-2" : "gap-3 px-4 py-3"
      } ${className}`}
      aria-live="polite"
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
          {freeShipping ? "Free Standard Delivery" : "Standard Delivery"}
        </p>
        {!resolved ? (
          <p className={compact ? "text-[11px] text-slate-500" : "text-xs text-slate-500"}>Checking delivery dates...</p>
        ) : (
          <>
            <p className={`text-slate-600 ${compact ? "text-[11px] leading-4" : "text-xs leading-5"}`}>
              {country ? (
                <>
                  To <span className="font-semibold text-slate-800">{getCountryName(country)}</span> · {startDate} – {endDate}
                </>
              ) : (
                <>Estimated {startDate} – {endDate}</>
              )}
            </p>
            {countdown && (
              <p className={`text-blue-700 ${compact ? "text-[10px] leading-4" : "text-[11px] leading-4"}`}>
                Order in the next {countdown.hours}h {countdown.minutes}m for these dates
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};
