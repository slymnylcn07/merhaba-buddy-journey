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
  RotateCcw, Sparkles } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { getCountryName, getDeliveryWindow } from "@/lib/delivery-estimates";
import { PaymentLogosRow } from "@/components/product-page-blocks";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { PRODUCT_RECS } from "@/lib/article-product-map";

// Sepet onerisi icin urunleri oturumda bir kez cek
let cartProductsPromise: Promise<ShopifyProduct[]> | null = null;
function getCartSuggestionProducts() {
  if (!cartProductsPromise) {
    cartProductsPromise = getProducts(20).catch(() => []);
  }
  return cartProductsPromise;
}

const MAIN_HANDLE = PRODUCT_RECS.main.handle;
const SLEEVE_HANDLE = PRODUCT_RECS.sleeve.handle;
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
  const { min: minDays, max: maxDays } = getDeliveryWindow(countryCode);

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
  const [userCountry, setUserCountry] = useState<string>("US");
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>(getDeliveryInfo("US"));
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
    fetch("/api/geo")
      .then((r) => (r.ok ? r.json() : { country: null }))
      .then((d) => {
        const countryCode = String(d.country || "US").toUpperCase();
        setUserCountry(countryCode);
        setDeliveryInfo(getDeliveryInfo(countryCode));
      })
      .catch(() => {
        /* varsayilan US ile devam */
      });
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

  const cartCurrency = items[0]?.price.currencyCode || "USD";

  const formatDisplayPrice = (price: number, currencyCode?: string) => {
    const code = currencyCode || cartCurrency;
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: code,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(price);
    } catch {
      return `${code} ${price.toFixed(2)}`;
    }
  };

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.price.amount || 0) * item.quantity, 0),
    [items],
  );

  // Shopify'daki otomatik indirimlerin aynasi:
  // 2 adet -> siparise %15, 3+ adet -> %20 (checkout'ta otomatik uygulanir)
  const cartQty = items.reduce((sum, item) => sum + item.quantity, 0);
  const bundlePct = cartQty >= 3 ? 20 : cartQty === 2 ? 15 : 0;
  const bundleDiscount = (subtotal * bundlePct) / 100;
  const totalAfterDiscount = subtotal - bundleDiscount;

  // ---- Cross-sell: sepettekine gore eslesen urun oner ----
  const [suggestion, setSuggestion] = useState<ShopifyProduct | null>(null);
  const { addItem } = useCartStore();

  useEffect(() => {
    if (!isOpen || items.length === 0) {
      setSuggestion(null);
      return;
    }
    const handlesInCart = items.map((i) => decodeURIComponent(i.product.node.handle));
    const hasMain = handlesInCart.includes(decodeURIComponent(MAIN_HANDLE));
    // Ana cihaz sepette -> sleeve oner; degilse -> ana cihazi oner
    const targetHandle = hasMain ? SLEEVE_HANDLE : MAIN_HANDLE;
    if (handlesInCart.includes(decodeURIComponent(targetHandle))) {
      setSuggestion(null);
      return;
    }
    let active = true;
    getCartSuggestionProducts().then((list) => {
      if (!active) return;
      const match = list.find(
        (p) => decodeURIComponent(p.node.handle) === decodeURIComponent(targetHandle)
      );
      setSuggestion(match || null);
    });
    return () => {
      active = false;
    };
  }, [isOpen, items]);

  const handleAddSuggestion = () => {
    if (!suggestion) return;
    const variant = suggestion.node.variants?.edges?.[0]?.node;
    if (!variant) return;
    addItem({
      product: suggestion,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      compareAtPrice: variant.compareAtPrice || null,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
  };

  const suggestionIsMain =
    suggestion && decodeURIComponent(suggestion.node.handle) === decodeURIComponent(MAIN_HANDLE);

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
                    const unitPrice = Number(item.price.amount || 0);
                    const lineTotal = unitPrice * item.quantity;
                    const compareUnit = item.compareAtPrice?.amount ? Number(item.compareAtPrice.amount) : null;
                    const compareTotal = compareUnit && compareUnit > unitPrice ? compareUnit * item.quantity : null;
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
                            <p className="mt-3 flex items-baseline gap-2">
                              {compareTotal && (
                                <s className="text-sm font-medium text-slate-400">{formatDisplayPrice(compareTotal, item.price.currencyCode)}</s>
                              )}
                              <span className="text-xl font-bold text-slate-950">{formatDisplayPrice(lineTotal, item.price.currencyCode)}</span>
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-xs text-slate-500">{formatDisplayPrice(unitPrice, item.price.currencyCode)} each</p>
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
                
                  {suggestion && (
                    <div className="rounded-[1.35rem] bg-gradient-to-br from-blue-500 via-blue-400 to-emerald-400 p-[1.5px] shadow-[0_18px_45px_-28px_rgba(37,99,235,0.55)]">
                      <div className="rounded-[calc(1.35rem-1.5px)] bg-white px-4 py-3.5">
                        <div className="flex items-center justify-between">
                          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700">
                            <Sparkles className="h-3.5 w-3.5" />
                            Bundle &amp; Save
                          </p>
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                            15% off order
                          </span>
                        </div>
                        <div className="mt-3 flex items-center gap-3.5">
                          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-50 ring-1 ring-slate-200">
                            {suggestion.node.images?.edges?.[0]?.node && (
                              <img
                                src={suggestion.node.images.edges[0].node.url}
                                alt={suggestion.node.title}
                                className="h-full w-full object-contain p-1.5"
                              />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-slate-950">{suggestion.node.title}</p>
                            <p className="mt-0.5 text-xs leading-4 text-slate-500">
                              {suggestionIsMain
                                ? "Add the FlexiKnee device and your whole order gets 15% off at checkout."
                                : "Complete the routine and unlock 15% off your entire order."}
                            </p>
                            <p className="mt-1.5 text-sm font-bold text-slate-950">
                              {formatDisplayPrice(
                                Number(suggestion.node.variants?.edges?.[0]?.node?.price?.amount || suggestion.node.priceRange.minVariantPrice.amount),
                                suggestion.node.variants?.edges?.[0]?.node?.price?.currencyCode || suggestion.node.priceRange.minVariantPrice.currencyCode
                              )}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={handleAddSuggestion}
                            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-950 text-white shadow-lg shadow-slate-950/25 transition hover:scale-105 hover:bg-blue-600"
                            aria-label="Add to cart"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
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
                    {bundlePct > 0 && (
                      <div className="mb-2 flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-2.5">
                        <span className="text-xs font-semibold text-emerald-700">
                          Bundle discount ({bundlePct}%) · applied automatically at checkout
                        </span>
                        <span className="text-sm font-bold text-emerald-700">-{formatDisplayPrice(bundleDiscount)}</span>
                      </div>
                    )}
                                        <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-slate-950">Total</span>
                      <span className="flex items-baseline gap-2.5">
                        {bundlePct > 0 && (
                          <s className="text-sm font-medium text-slate-400">{formatDisplayPrice(subtotal)}</s>
                        )}
                        <span className="text-[1.85rem] font-bold leading-none text-slate-950">{formatDisplayPrice(totalAfterDiscount)}</span>
                      </span>
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

                  <PaymentLogosRow className="pb-0.5 pt-2" />

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
