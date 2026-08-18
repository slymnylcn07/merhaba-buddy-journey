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
  RotateCcw, Sparkles, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { PaymentLogosRow } from "@/components/product-page-blocks";
import { DeliveryEstimate } from "@/components/DeliveryEstimate";
import { getProductByHandle, ShopifyProduct } from "@/lib/shopify";
import { PRODUCT_RECS } from "@/lib/article-product-map";
import { getShopifyProductHandleCandidates } from "@/lib/product-config";
import {
  formatStandardShippingRate,
  getShippingPolicy,
  isFreeShippingEligible,
} from "@/lib/shipping-policy";

// Cross-sell needs every size/color variant, so fetch only the matched product
// by handle instead of downloading a large variant list for every product.
const cartSuggestionPromises = new Map<string, Promise<ShopifyProduct | null>>();
function getCartSuggestionProduct(handle: string) {
  const cached = cartSuggestionPromises.get(handle);
  if (cached) return cached;

  const request = (async () => {
    for (const candidate of getShopifyProductHandleCandidates(handle)) {
      const product = await getProductByHandle(candidate).catch(() => null);
      if (product) return product;
    }
    return null;
  })();
  cartSuggestionPromises.set(handle, request);
  return request;
}

const MAIN_HANDLE = PRODUCT_RECS.main.handle;
const SLEEVE_HANDLE = PRODUCT_RECS.sleeve.handle;

export const CartDrawer = () => {
  const {
    items,
    isLoading,
    isDrawerOpen: isOpen,
    setDrawerOpen: setIsOpen,
    updateQuantity,
    removeItem,
    createCheckout,
  } = useCartStore();

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
  const hasFreeShipping = isFreeShippingEligible(totalAfterDiscount, cartCurrency);
  const shippingPolicy = getShippingPolicy();
  const shippingCurrencyMatches = cartCurrency === shippingPolicy.currencyCode;
  const shippingAmount = hasFreeShipping
    ? 0
    : shippingCurrencyMatches
      ? shippingPolicy.standardShippingRate
      : null;
  const estimatedTotal = shippingAmount === null ? null : totalAfterDiscount + shippingAmount;
  const shippingDisplay = hasFreeShipping
    ? "Free"
    : shippingCurrencyMatches
      ? formatStandardShippingRate()
      : "Calculated at checkout";
  const estimatedTotalPrefix =
    !hasFreeShipping && shippingPolicy.standardShippingRateIsApproximate ? "about " : "";

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
    getCartSuggestionProduct(targetHandle).then((match) => {
      if (!active) return;
      setSuggestion(match || null);
    });
    return () => {
      active = false;
    };
  }, [isOpen, items]);

  // Onerilen urunun secenek gruplari (Color, Size...) - varyantlardan turetilir
  const [suggestionOpts, setSuggestionOpts] = useState<Record<string, string>>({});

  const suggestionOptionGroups = useMemo(() => {
    if (!suggestion) return [] as Array<{ name: string; values: string[] }>;
    const groups = new Map<string, Set<string>>();
    suggestion.node.variants?.edges?.forEach(({ node }) => {
      node.selectedOptions?.forEach((opt) => {
        if (opt.name.toLowerCase() === "title") return; // tek varyantli urunler
        if (!groups.has(opt.name)) groups.set(opt.name, new Set());
        groups.get(opt.name)!.add(opt.value);
      });
    });
    return Array.from(groups.entries()).map(([name, values]) => ({
      name,
      values: Array.from(values),
    }));
  }, [suggestion]);

  // Varsayilan secimler: ilk satilabilir varyantin secenekleri
  useEffect(() => {
    if (!suggestion || suggestionOptionGroups.length === 0) {
      setSuggestionOpts({});
      return;
    }
    const firstAvailable =
      suggestion.node.variants?.edges?.find((e) => e.node.availableForSale)?.node ||
      suggestion.node.variants?.edges?.[0]?.node;
    const defaults: Record<string, string> = {};
    firstAvailable?.selectedOptions?.forEach((opt) => {
      if (opt.name.toLowerCase() !== "title") defaults[opt.name] = opt.value;
    });
    setSuggestionOpts(defaults);
  }, [suggestion, suggestionOptionGroups.length]);

  const suggestionVariant = useMemo(() => {
    if (!suggestion) return null;
    const edges = suggestion.node.variants?.edges || [];
    if (suggestionOptionGroups.length === 0) return edges[0]?.node || null;
    return (
      edges.find(({ node }) =>
        node.selectedOptions?.every(
          (opt) => opt.name.toLowerCase() === "title" || suggestionOpts[opt.name] === opt.value
        )
      )?.node || null
    );
  }, [suggestion, suggestionOpts, suggestionOptionGroups.length]);

  const handleAddSuggestion = () => {
    if (!suggestion) return;
    const variant = suggestionVariant;
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
                                if (item.quantity >= 2) {
                                  toast.error("Maximum quantity reached", {
                                    description: "You can purchase up to 2 of each item.",
                                    position: "top-center",
                                  });
                                  return;
                                }
                                updateQuantity(item.variantId, item.quantity + 1);
                              }}
                              disabled={item.quantity >= 2}
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
                            {suggestionOptionGroups.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {suggestionOptionGroups.map((group) => (
                                  <select
                                    key={group.name}
                                    value={suggestionOpts[group.name] || ""}
                                    onChange={(e) =>
                                      setSuggestionOpts((prev) => ({ ...prev, [group.name]: e.target.value }))
                                    }
                                    className="h-7 rounded-lg border border-slate-200 bg-white px-1.5 text-[11px] font-medium text-slate-700 outline-none focus:border-blue-500"
                                    aria-label={group.name}
                                  >
                                    {group.values.map((value) => (
                                      <option key={value} value={value}>
                                        {value}
                                      </option>
                                    ))}
                                  </select>
                                ))}
                              </div>
                            )}
                            <p className="mt-1.5 text-sm font-bold text-slate-950">
                              {formatDisplayPrice(
                                Number(suggestionVariant?.price?.amount || suggestion.node.priceRange.minVariantPrice.amount),
                                suggestionVariant?.price?.currencyCode || suggestion.node.priceRange.minVariantPrice.currencyCode
                              )}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={handleAddSuggestion}
                            disabled={!suggestionVariant || !suggestionVariant.availableForSale}
                            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-950 text-white shadow-lg shadow-slate-950/25 transition hover:scale-105 hover:bg-blue-600 disabled:opacity-40 disabled:hover:scale-100"
                            aria-label="Add to cart"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <DeliveryEstimate
                  compact
                  currencyCode={cartCurrency}
                  freeShipping={hasFreeShipping}
                  className="mt-3"
                />
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
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-slate-600">Subtotal</span>
                      <span className="flex items-baseline gap-2.5">
                        {bundlePct > 0 && (
                          <s className="text-sm font-medium text-slate-400">{formatDisplayPrice(subtotal)}</s>
                        )}
                        <span className="text-base font-semibold text-slate-950">{formatDisplayPrice(totalAfterDiscount)}</span>
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-3 text-sm">
                      <span className="font-medium text-slate-600">Standard shipping</span>
                      <span className="font-semibold text-slate-950">{shippingDisplay}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3 border-t border-slate-200 pt-3">
                      <span className="text-base font-semibold text-slate-950">Estimated total</span>
                      <span className="text-[1.65rem] font-bold leading-none text-slate-950">
                        {estimatedTotal === null
                          ? "At checkout"
                          : `${estimatedTotalPrefix}${formatDisplayPrice(estimatedTotal)}`}
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

                  <div className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-emerald-50 px-4 py-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600">
                      <ShieldCheck className="h-3.5 w-3.5 text-white" />
                    </span>
                    <p className="text-xs font-bold text-slate-950">Try It Risk-Free for 30 Days</p>
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
