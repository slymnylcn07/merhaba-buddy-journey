import { useEffect, useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
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
  Sparkles,
  ShieldCheck,
  X,
} from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { PaymentLogosRow } from "@/components/product-page-blocks";
import { getProductByHandle, ShopifyProduct } from "@/lib/shopify";
import { PRODUCT_RECS } from "@/lib/article-product-map";
import { getShopifyProductHandleCandidates } from "@/lib/product-config";
import { trackEvent } from "@/hooks/use-google-analytics";
import { trackClarityEvent } from "@/hooks/use-microsoft-clarity";

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
    cartCost,
    discountCodes,
    discountApplications,
    requestedDiscountCodes,
    discountError,
    applyDiscountCode,
    removeDiscountCode,
  } = useCartStore();

  const [promoCode, setPromoCode] = useState("");
  const [promoBusy, setPromoBusy] = useState(false);

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

  const cartQty = items.reduce((sum, item) => sum + item.quantity, 0);
  const remoteTotal = Number(cartCost?.totalAmount.amount);
  const hasRemotePricing = Boolean(
    cartCost && Number.isFinite(remoteTotal),
  );
  const pricingCurrency = cartCost?.totalAmount.currencyCode || cartCurrency;
  const totalAfterDiscount = hasRemotePricing ? remoteTotal : subtotal;

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

  const suggestionBundlePct = cartQty + 1 >= 3 ? 20 : 15;

  const visibleDiscountCodes = useMemo(() => {
    const byCode = new Map<string, { code: string; applicable: boolean; pending: boolean }>();

    requestedDiscountCodes.forEach((code) => {
      const normalized = code.trim().toUpperCase();
      if (normalized) byCode.set(normalized, { code: normalized, applicable: false, pending: true });
    });

    discountCodes.forEach((entry) => {
      const normalized = entry.code.trim().toUpperCase();
      if (!normalized) return;
      byCode.set(normalized, {
        code: normalized,
        applicable: entry.applicable,
        pending: false,
      });
    });

    return Array.from(byCode.values());
  }, [discountCodes, requestedDiscountCodes]);

  const handleApplyPromoCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const code = promoCode.trim().toUpperCase();

    if (!code) {
      toast.error("Enter a promo code first.");
      return;
    }

    setPromoBusy(true);
    try {
      const result = await applyDiscountCode(code);
      trackEvent("cart_promo_code_submitted", {
        promo_code: code,
        promo_status: result.applied ? "applied" : result.pending ? "pending" : "rejected",
      });
      trackClarityEvent(
        result.applied
          ? "cart_promo_applied"
          : result.pending
            ? "cart_promo_pending"
            : "cart_promo_rejected",
      );

      if (result.applied) {
        setPromoCode("");
        toast.success(`${code} applied`, {
          description: "Shopify confirmed the discount for this cart.",
        });
      } else if (result.pending) {
        setPromoCode("");
        toast.success(`${code} saved`, {
          description: "The code will be confirmed as soon as the cart finishes syncing.",
        });
      } else {
        toast.error("Promo code not applied", {
          description: result.message || "This code is not available for the current cart.",
        });
      }
    } finally {
      setPromoBusy(false);
    }
  };

  const handleRemovePromoCode = async (code: string) => {
    setPromoBusy(true);
    try {
      await removeDiscountCode(code);
      trackEvent("cart_promo_code_removed", { promo_code: code });
      trackClarityEvent("cart_promo_removed");
    } catch {
      toast.error("Promo code could not be removed. Please try again.");
    } finally {
      setPromoBusy(false);
    }
  };

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

      <SheetContent className="flex h-[100dvh] max-h-[100dvh] w-full flex-col gap-0 overflow-hidden bg-[#F7F8FC] px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 sm:max-w-lg sm:px-4 sm:pb-3 sm:pt-3 [&>button]:right-2 [&>button]:top-1.5 [&>button]:flex [&>button]:h-11 [&>button]:w-11 [&>button]:items-center [&>button]:justify-center">
        <SheetHeader className="flex-shrink-0 space-y-0 border-b border-slate-200 pb-2 pr-8">
          <SheetTitle className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
            Your Cart{totalItems > 0 ? ` (${totalItems})` : ""}
          </SheetTitle>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col pt-1.5">
          {items.length === 0 ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            </div>
          ) : (
            <>
              <div className="min-h-0 flex-1 overscroll-contain overflow-y-auto pb-1 pr-1">
                <div className="space-y-2">
                  {items.map((item) => {
                    const unitPrice = Number(item.price.amount || 0);
                    const lineTotal = unitPrice * item.quantity;
                    const compareUnit = item.compareAtPrice?.amount ? Number(item.compareAtPrice.amount) : null;
                    const compareTotal = compareUnit && compareUnit > unitPrice ? compareUnit * item.quantity : null;
                    const visibleOptions = item.selectedOptions.filter((option) => option.value.toLowerCase() !== "default title");

                    return (
                      <div key={item.variantId} className="rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm sm:p-3">
                        <div className="flex gap-2.5">
                          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50 sm:h-[4.5rem] sm:w-[4.5rem]">
                            {item.product.node.images?.edges?.[0]?.node && (
                              <img
                                src={item.product.node.images.edges[0].node.url}
                                alt={item.product.node.title}
                                className="h-full w-full object-contain p-1.5"
                              />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <h4 className="line-clamp-2 text-sm font-semibold leading-5 text-slate-950">{item.product.node.title}</h4>
                            {visibleOptions.length > 0 && (
                              <p className="mt-0.5 truncate text-[10px] font-medium uppercase tracking-[0.1em] text-slate-500">
                                {visibleOptions.map((option) => option.value).join(" • ")}
                              </p>
                            )}
                            <p className="mt-1.5 flex items-baseline gap-1.5">
                              {compareTotal && (
                                <s className="text-xs font-medium text-slate-400">{formatDisplayPrice(compareTotal, item.price.currencyCode)}</s>
                              )}
                              <span className="text-base font-bold text-slate-950">{formatDisplayPrice(lineTotal, item.price.currencyCode)}</span>
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-[10px] text-slate-500">{formatDisplayPrice(unitPrice, item.price.currencyCode)} each</p>
                            )}
                          </div>
                        </div>

                        <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2">
                          <div className="flex items-center gap-1.5">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-11 w-11 rounded-xl border-slate-200"
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              aria-label={`Decrease quantity of ${item.product.node.title}`}
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </Button>
                            <span className="w-6 text-center text-xs font-semibold text-slate-900">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-11 w-11 rounded-xl border-slate-200"
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
                              aria-label={`Increase quantity of ${item.product.node.title}`}
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="min-h-11 rounded-xl px-2 text-xs text-red-500 hover:bg-red-50 hover:text-red-700"
                            onClick={() => removeItem(item.variantId)}
                          >
                            <Trash2 className="mr-1 h-3.5 w-3.5" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                
                  {suggestion && (
                    <div className="rounded-2xl bg-gradient-to-br from-blue-500 via-blue-400 to-emerald-400 p-px shadow-[0_16px_36px_-28px_rgba(37,99,235,0.55)]">
                      <div className="rounded-[calc(1rem-1px)] bg-white p-2.5">
                        <div className="flex items-center justify-between">
                          <p className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.14em] text-blue-700">
                            <Sparkles className="h-3 w-3" />
                            Bundle &amp; Save
                          </p>
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-700">
                            {suggestionBundlePct}% off order
                          </span>
                        </div>
                        <div className="mt-2 flex items-center gap-2.5">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-50 ring-1 ring-slate-200">
                            {suggestion.node.images?.edges?.[0]?.node && (
                              <img
                                src={suggestion.node.images.edges[0].node.url}
                                alt={suggestion.node.title}
                                className="h-full w-full object-contain p-1"
                              />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="line-clamp-2 text-xs font-semibold leading-4 text-slate-950">{suggestion.node.title}</p>
                            {suggestionOptionGroups.length > 0 && (
                              <div className="mt-1 flex flex-wrap gap-1">
                                {suggestionOptionGroups.map((group) => (
                                  <select
                                    key={group.name}
                                    value={suggestionOpts[group.name] || ""}
                                    onChange={(e) =>
                                      setSuggestionOpts((prev) => ({ ...prev, [group.name]: e.target.value }))
                                    }
                                    className="h-9 max-w-32 rounded-lg border border-slate-200 bg-white px-2 text-[11px] font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                            <p className="mt-1 text-xs font-bold text-slate-950">
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
                            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-slate-950 text-white shadow-md shadow-slate-950/20 transition hover:scale-105 hover:bg-blue-600 disabled:opacity-40 disabled:hover:scale-100"
                            aria-label={`Add ${suggestion.node.title} to cart`}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm">
                  <form onSubmit={handleApplyPromoCode} className="flex gap-2">
                    <label className="sr-only" htmlFor="cart-promo-code">Promo code</label>
                    <input
                      id="cart-promo-code"
                      value={promoCode}
                      onChange={(event) => setPromoCode(event.target.value)}
                      placeholder="Enter promo code"
                      autoComplete="off"
                      className="h-11 min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold uppercase tracking-[0.08em] text-slate-950 outline-none transition placeholder:normal-case placeholder:tracking-normal placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                    <Button
                      type="submit"
                      disabled={promoBusy || !promoCode.trim()}
                      className="h-11 rounded-xl bg-blue-600 px-4 text-xs font-semibold text-white hover:bg-blue-700"
                    >
                      {promoBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply"}
                    </Button>
                  </form>

                  {visibleDiscountCodes.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {visibleDiscountCodes.map((entry) => (
                        <span
                          key={entry.code}
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                            entry.applicable
                              ? "bg-emerald-50 text-emerald-700"
                              : entry.pending
                                ? "bg-blue-50 text-blue-700"
                                : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {entry.code}
                          <span className="font-medium opacity-75">
                            {entry.applicable ? "Applied" : entry.pending ? "Checking" : "Not available"}
                          </span>
                          <button
                            type="button"
                            onClick={() => void handleRemovePromoCode(entry.code)}
                            disabled={promoBusy}
                            className="ml-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current disabled:opacity-50"
                            aria-label={`Remove promo code ${entry.code}`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {discountError && (
                    <p className="mt-1.5 text-[10px] leading-4 text-amber-700">{discountError}</p>
                  )}
                </div>
              </div>

              <div className="flex-shrink-0 border-t border-slate-200 bg-[#F7F8FC] pt-1.5">
                <div className="space-y-1.5 px-0.5">
                  <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                    {discountApplications.map((discount, index) => (
                      <div
                        key={`${discount.type}-${discount.label}-${index}`}
                        className="mb-1.5 flex items-center justify-between gap-2 rounded-lg bg-emerald-50 px-2.5 py-1.5"
                      >
                        <span className="min-w-0 truncate text-[10px] font-semibold text-emerald-700">
                          {discount.label}
                          <span className="ml-1 font-medium opacity-75">
                            {discount.type === "automatic" ? "Automatically applied" : "Applied"}
                          </span>
                        </span>
                        <span className="shrink-0 tabular-nums text-xs font-bold text-emerald-700">
                          -{formatDisplayPrice(
                            Number(discount.discountedAmount.amount),
                            discount.discountedAmount.currencyCode,
                          )}
                        </span>
                      </div>
                    ))}

                    {!hasRemotePricing && cartQty >= 2 && (
                      <div className="mb-1.5 rounded-lg bg-blue-50 px-2.5 py-1.5 text-[10px] font-semibold leading-4 text-blue-700">
                        Shopify is checking your automatic bundle savings.
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-medium text-slate-600">Subtotal</span>
                      <span className="shrink-0 tabular-nums text-sm font-semibold text-slate-950">
                        {formatDisplayPrice(subtotal, cartCurrency)}
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between gap-3 border-t border-slate-200 pt-1.5">
                      <span className="text-sm font-semibold text-slate-950">Total</span>
                      <span className="shrink-0 tabular-nums text-xl font-bold leading-none text-slate-950">
                        {hasRemotePricing
                          ? formatDisplayPrice(totalAfterDiscount, pricingCurrency)
                          : "Syncing..."}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    className="min-h-12 w-full rounded-full bg-slate-950 text-sm font-semibold text-white hover:bg-blue-600"
                    disabled={items.length === 0 || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Checkout...
                      </>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Secure Checkout
                      </span>
                    )}
                  </Button>

                  <PaymentLogosRow className="!gap-x-3 !gap-y-1 py-0.5 [&>span]:!h-5" />

                  <div className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600">
                      <ShieldCheck className="h-3 w-3 text-white" />
                    </span>
                    <p className="text-[10px] font-bold text-slate-950">Try It Risk-Free for 30 Days</p>
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
