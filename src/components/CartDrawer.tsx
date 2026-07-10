import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  Lock,
  Loader2,
  Truck,
  RotateCcw,
} from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { CurrencyCode, detectUserCountry, getCurrencyForCountry, convertPrice, getCountryName } from "@/lib/currency";
import { trackCartView } from "@/lib/shopify-analytics";

const EXTENDED_DELIVERY_COUNTRIES = ["FI", "NL", "SE", "CH", "NO", "NZ", "AT", "BE", "DK"];

type DeliveryInfo = {
  startDate: string;
  endDate: string;
  minDays: number;
  maxDays: number;
};

function addBusinessDays(date: Date, days: number) {
  const result = new Date(date);
  let added = 0;

  while (added < days) {
    result.setDate(result.getDate() + 1);
    const day = result.getDay();
    if (day !== 0 && day !== 6) added += 1;
  }

  return result;
}

function getDeliveryInfo(countryCode: string): DeliveryInfo {
  const today = new Date();
  const minDays = EXTENDED_DELIVERY_COUNTRIES.includes(countryCode) ? 7 : 5;
  const maxDays = EXTENDED_DELIVERY_COUNTRIES.includes(countryCode) ? 10 : 8;

  const start = addBusinessDays(today, minDays);
  const end = addBusinessDays(today, maxDays);
  const formatOptions: Intl.DateTimeFormatOptions = { weekday: "short", day: "numeric", month: "short" };

  return {
    startDate: start.toLocaleDateString("en-GB", formatOptions),
    endDate: end.toLocaleDateString("en-GB", formatOptions),
    minDays,
    maxDays,
  };
}

export const CartDrawer = () => {
  const [userCurrency, setUserCurrency] = useState<CurrencyCode>("GBP");
  const [userCountry, setUserCountry] = useState<string>("GB");
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>(getDeliveryInfo("GB"));
  const {
    items,
    isLoading,
    isDrawerOpen: isOpen,
    setDrawerOpen: setIsOpen,
    updateQuantity,
    removeItem,
    createCheckout,
  } = useCartStore();

  useEffect(() => {
    const detectCurrency = async () => {
      const countryCode = await detectUserCountry();
      const detectedCurrency = getCurrencyForCountry(countryCode);
      setUserCurrency(detectedCurrency);
      setUserCountry(countryCode);
      setDeliveryInfo(getDeliveryInfo(countryCode));
    };

    detectCurrency();
  }, []);

  useEffect(() => {
    if (isOpen && items.length > 0) {
      const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmount = items.reduce((sum, item) => sum + parseFloat(item.price.amount) * item.quantity, 0);
      const currency = items[0]?.price.currencyCode || "GBP";

      trackCartView({
        totalQuantity,
        totalAmount: totalAmount.toFixed(2),
        currency,
        lines: items.map((item) => ({
          variantId: item.variantId,
          productTitle: item.product.node.title,
          quantity: item.quantity,
          price: item.price.amount,
        })),
      });
    }
  }, [isOpen, items]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const formatDisplayPrice = (price: number) => {
    try {
      return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: userCurrency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(price);
    } catch {
      return `${userCurrency} ${price.toFixed(2)}`;
    }
  };

  const getConvertedUnitPrice = (rawAmount: string) => convertPrice(Number(rawAmount || 0), userCurrency);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + getConvertedUnitPrice(item.price.amount) * item.quantity, 0),
    [items, userCurrency],
  );

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Cart is empty", {
        description: "Add a product before checkout.",
        position: "top-center",
      });
      return;
    }

    try {
      await createCheckout();

      const checkoutUrl = useCartStore.getState().checkoutUrl;

      if (!checkoutUrl) {
        toast.error("Checkout failed", {
          description: "Unable to create checkout. Please try again.",
          position: "top-center",
        });
        return;
      }

      setIsOpen(false);
      window.location.href = checkoutUrl;
    } catch (error) {
      toast.error("Checkout error", {
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        position: "top-center",
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative" aria-label="Open shopping cart">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex h-full w-full flex-col bg-[#F7F8FC] px-5 pt-4 sm:max-w-lg">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="text-[1.95rem] font-bold tracking-tight text-slate-950">Your Cart</SheetTitle>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col pt-2">
          {items.length === 0 ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            </div>
          ) : (
            <>
              <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                <div className="space-y-3">
                  {items.map((item) => {
                    const unitPrice = getConvertedUnitPrice(item.price.amount);
                    const lineTotal = unitPrice * item.quantity;
                    const visibleOptions = item.selectedOptions.filter((option) => option.value.toLowerCase() !== "default title");

                    return (
                      <div key={item.variantId} className="rounded-[1.2rem] border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
                        <div className="flex gap-4">
                          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-[1.1rem] border border-slate-100 bg-slate-50">
                            {item.product.node.images?.edges?.[0]?.node && (
                              <img
                                src={item.product.node.images.edges[0].node.url}
                                alt={item.product.node.title}
                                className="h-full w-full object-contain p-2"
                              />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <h4 className="text-base font-semibold leading-6 text-slate-950">{item.product.node.title}</h4>
                            {visibleOptions.length > 0 && (
                              <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                                {visibleOptions.map((option) => option.value).join(" • ")}
                              </p>
                            )}
                            <p className="mt-3 text-xl font-bold text-slate-950">{formatDisplayPrice(lineTotal)}</p>
                            {item.quantity > 1 && (
                              <p className="text-xs text-slate-500">{formatDisplayPrice(unitPrice)} each</p>
                            )}
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-9 w-9 rounded-xl border-slate-200"
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </Button>
                            <span className="w-8 text-center text-sm font-semibold text-slate-900">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-9 w-9 rounded-xl border-slate-200"
                              onClick={() => {
                                if (totalItems >= 2) {
                                  toast.error("Maximum quantity reached", {
                                    description: "A customer can purchase a maximum of 2 items.",
                                    position: "top-center",
                                  });
                                  return;
                                }
                                updateQuantity(item.variantId, item.quantity + 1);
                              }}
                              disabled={totalItems >= 2}
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-xl text-red-500 hover:bg-red-50 hover:text-red-700"
                            onClick={() => removeItem(item.variantId)}
                          >
                            <Trash2 className="mr-1.5 h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 rounded-[1.5rem] border border-blue-200 bg-gradient-to-br from-white to-blue-50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                      <Truck className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-600">Estimated delivery</p>
                      <p className="mt-1 text-base font-semibold text-slate-950">
                        {getCountryName(userCountry)} · {deliveryInfo.startDate} – {deliveryInfo.endDate}
                      </p>

                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 border-t border-slate-200 bg-[#F7F8FC] pt-2">
                <div className="space-y-2.5 px-1">
                  <div className="rounded-[1.35rem] border border-slate-200 bg-white px-4 py-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-slate-950">Total</span>
                      <span className="text-[1.85rem] font-bold leading-none text-slate-950">{formatDisplayPrice(subtotal)}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    className="h-13 w-full rounded-full bg-slate-950 text-base font-semibold text-white hover:bg-blue-600"
                    disabled={items.length === 0 || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Creating Checkout...
                      </>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Secure Checkout
                      </span>
                    )}
                  </Button>

                  <div className="grid grid-cols-7 gap-1 pb-0.5 pt-1">
                    {[
                      { label: "Shop Pay", src: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Shop_Pay_logo.svg", className: "h-3 w-auto max-w-[34px]" },
                      { label: "Visa", src: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Visa_Inc._logo_%282021%E2%80%93present%29.svg", className: "h-2.5 w-auto max-w-[28px]" },
                      { label: "Mastercard", src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg", className: "h-3.5 w-auto max-w-[24px]" },
                      { label: "American Express", src: "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg", className: "h-2.5 w-auto max-w-[30px]" },
                      { label: "Google Pay", src: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg", className: "h-2.5 w-auto max-w-[31px]" },
                      { label: "PayPal", src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg", className: "h-3 w-auto max-w-[29px]" },
                    ].map((logo) => (
                      <div key={logo.label} className="flex h-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-1 shadow-sm">
                        <img className={logo.className} src={logo.src} alt={logo.label} />
                      </div>
                    ))}
                    <div className="flex h-9 items-center justify-center rounded-lg border border-slate-200 bg-black px-1 shadow-sm">
                      <span className="text-[10px] font-semibold tracking-tight text-white">Apple Pay</span>
                    </div>
                  </div>

                  <div className="flex justify-center pt-2">
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-sm">
                      <RotateCcw className="h-3.5 w-3.5 text-blue-600" />
                      <span>30-Day Returns</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
