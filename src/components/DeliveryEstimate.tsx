import { useEffect, useState } from "react";
import { Truck } from "lucide-react";
import {
  getDeliveryWindow,
  getCountryName,
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

/**
 * "Estimated delivery to United States: 7-12 business days" satiri.
 * Ulke tespit edilemezse (lokal gelistirme, VPN vb.) genel araligi gosterir.
 */
export const DeliveryEstimate = ({ className = "" }: { className?: string }) => {
  const [country, setCountry] = useState<string | null>(null);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    let active = true;
    fetchCountry().then((c) => {
      if (!active) return;
      setCountry(c);
      setResolved(true);
    });
    return () => {
      active = false;
    };
  }, []);

  const window = country ? getDeliveryWindow(country) : DEFAULT_WINDOW;

  return (
    <p
      className={`flex items-start gap-2 text-sm text-slate-600 sm:items-center ${className}`}
      aria-live="polite"
    >
      <Truck className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600 sm:mt-0" />
      {!resolved ? (
        <span>Checking delivery time...</span>
      ) : country ? (
        <span className="min-w-0">
          <span className="block sm:inline">
            Estimated delivery to <span className="font-medium text-slate-800">{getCountryName(country)}</span>
            <span className="hidden sm:inline">:</span>
          </span>{" "}
          <span className="block font-medium text-slate-800 sm:inline sm:font-normal sm:text-slate-600">
            {window.min}–{window.max} business days
          </span>
        </span>
      ) : (
        <span className="min-w-0">
          <span className="block sm:inline">Estimated delivery<span className="hidden sm:inline">:</span></span>{" "}
          <span className="block font-medium text-slate-800 sm:inline sm:font-normal sm:text-slate-600">
            {DEFAULT_WINDOW.min}–{DEFAULT_WINDOW.max} business days worldwide
          </span>
        </span>
      )}
    </p>
  );
};
