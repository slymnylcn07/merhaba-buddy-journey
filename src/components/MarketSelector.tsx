import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  SUPPORTED_MARKETS,
  getCurrentMarket,
  getMarketCountry,
  setMarketCountry,
} from "@/lib/market";

/**
 * Para birimi / pazar seçici.
 * Seçim değişince sepet temizlenir ve sayfa yenilenir;
 * tüm fiyatlar Shopify Markets'in o pazar için tanımlı kurundan gelir.
 */
export const MarketSelector = ({ compact = false }: { compact?: boolean }) => {
  const current = getMarketCountry();
  const currentMarket = getCurrentMarket();

  return (
    <Select value={current} onValueChange={(value) => setMarketCountry(value)}>
      <SelectTrigger
        className={
          compact
            ? "h-9 w-[104px] rounded-full border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700"
            : "h-10 w-[120px] rounded-full border-slate-300 bg-white px-3.5 text-sm font-semibold text-slate-800"
        }
        aria-label="Country and currency"
      >
        <SelectValue>{currentMarket.flag} {currentMarket.label}</SelectValue>
      </SelectTrigger>
      <SelectContent className="rounded-2xl border-slate-200 bg-white shadow-xl">
        {SUPPORTED_MARKETS.map((market) => (
          <SelectItem key={market.country} value={market.country} className="rounded-xl text-sm">
            {market.flag} {market.name} · {market.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
