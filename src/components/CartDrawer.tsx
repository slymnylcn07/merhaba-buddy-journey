import { useState, useEffect } from "react";
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
import { ShoppingCart, Minus, Plus, Trash2, Lock, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { CURRENCY_CONFIG, CurrencyCode, detectUserCountry, getCurrencyForCountry, convertPrice, formatPrice, getCountryName } from "@/lib/currency";
import { trackCartView } from "@/lib/shopify-analytics";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userCurrency, setUserCurrency] = useState<CurrencyCode>('GBP');
  const [userCountry, setUserCountry] = useState<string>('GB');
  const { 
    items, 
    isLoading, 
    updateQuantity, 
    removeItem, 
    createCheckout 
  } = useCartStore();

  // Countries with extended delivery time (12 days)
  const EXTENDED_DELIVERY_COUNTRIES = ['FI', 'NL', 'SE', 'CH', 'NO', 'NZ', 'AT', 'BE', 'DK'];

  // Calculate delivery date
  const getDeliveryInfo = (countryCode: string) => {
    const now = new Date();
    const ukTime = new Date(now.toLocaleString("en-US", { timeZone: "Europe/London" }));
    
    const midnight = new Date(ukTime);
    midnight.setHours(24, 0, 0, 0);
    const diffMs = midnight.getTime() - ukTime.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    const deliveryDays = EXTENDED_DELIVERY_COUNTRIES.includes(countryCode) ? 12 : 9;
    
    const deliveryDate = new Date(ukTime);
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
    
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    };
    const formattedDate = deliveryDate.toLocaleDateString('en-GB', options);
    
    return {
      hours: diffHours,
      minutes: diffMinutes,
      deliveryDate: formattedDate
    };
  };

  const [deliveryInfo, setDeliveryInfo] = useState(getDeliveryInfo('GB'));

  // Detect user's currency and country on mount
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

  // Track cart view when drawer is opened
  useEffect(() => {
    if (isOpen && items.length > 0) {
      const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmount = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);
      const currency = items[0]?.price.currencyCode || 'GBP';
      
      trackCartView({
        totalQuantity,
        totalAmount: totalAmount.toFixed(2),
        currency,
        lines: items.map(item => ({
          variantId: item.variantId,
          productTitle: item.product.node.title,
          quantity: item.quantity,
          price: item.price.amount,
        })),
      });
    }
  }, [isOpen, items]);
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Fixed GBP prices matching ProductDetail.tsx: 1 purchase = £59.99, 2+ purchases = £54.99 each
  const SINGLE_PRICE_GBP = 59.99;
  const TWO_PACK_PRICE_EACH_GBP = 54.99;
  const ORIGINAL_PRICE_GBP = 119.98; // Original price per item (2x single price)
  
  // Get discount percentage based on quantity (matching ProductDetail)
  const getDiscountPercentage = (quantity: number): number => {
    if (quantity >= 2) return 54; // 2+ items get 54% off
    return 50; // Single item gets 50% off
  };
  
  const discountPercentage = getDiscountPercentage(totalItems);
  
  // Get price per item based on quantity
  const getPricePerItem = (): number => {
    if (totalItems >= 2) {
      return convertPrice(TWO_PACK_PRICE_EACH_GBP, userCurrency);
    }
    return convertPrice(SINGLE_PRICE_GBP, userCurrency);
  };
  
  // Get original price per item
  const getOriginalPricePerItem = (): number => {
    return convertPrice(ORIGINAL_PRICE_GBP, userCurrency);
  };
  
  // Calculate total
  const calculateTotal = () => {
    const pricePerItem = getPricePerItem();
    const originalPricePerItem = getOriginalPricePerItem();
    
    const totalOriginalPrice = originalPricePerItem * totalItems;
    const totalPrice = pricePerItem * totalItems;
    
    return { totalOriginalPrice, totalPrice };
  };
  
  const { totalOriginalPrice, totalPrice } = calculateTotal();
  
  // Get currency symbol
  const getCurrencySymbol = (): string => {
    return CURRENCY_CONFIG[userCurrency].symbol;
  };
  
  // Format price for display - all currencies show decimals
  const formatDisplayPrice = (price: number): string => {
    return `${getCurrencySymbol()}${price.toFixed(2)}`;
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Cart is empty", {
        description: "Add some products to your cart first",
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
      
      // Redirect to checkout - using location.href to avoid popup blockers on mobile
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
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full bg-[#F8F7FF]">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="text-2xl font-bold">Your Cart 🛒</SheetTitle>
          <SheetDescription className="text-base font-medium">
            ⭐ 4.7 · 2,000+ Happy Customers
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => {
                    const originalPrice = getOriginalPricePerItem();
                    const dynamicPrice = getPricePerItem();
                    const currencySymbol = getCurrencySymbol();
                    
                    return (
                      <div key={item.variantId} className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex gap-4">
                          <div className="w-20 h-20 bg-secondary/20 rounded-md overflow-hidden flex-shrink-0">
                            {item.product.node.images?.edges?.[0]?.node && (
                              <img
                                src={item.product.node.images.edges[0].node.url}
                                alt={item.product.node.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-2 mb-1">
                              <h4 className="font-semibold text-sm flex-1">{item.product.node.title}</h4>
                              <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs whitespace-nowrap">
                                SAVE {discountPercentage}% TODAY
                              </Badge>
                            </div>
                            {item.selectedOptions.filter(option => option.value.toLowerCase() !== 'default title').length > 0 && (
                              <p className="text-xs text-muted-foreground mb-2">
                                {item.selectedOptions.filter(option => option.value.toLowerCase() !== 'default title').map(option => option.value).join(' • ')}
                              </p>
                            )}
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400 line-through text-sm">
                                {formatDisplayPrice(originalPrice)}
                              </span>
                              <span className="text-lg font-bold text-green-600">
                                {formatDisplayPrice(dynamicPrice)}
                              </span>
                              <span className="text-xs font-semibold text-green-600">
                                (SAVE {discountPercentage}%)
                              </span>
                            </div>
                          </div>
                      
                        </div>
                        
                        <div className="flex items-center justify-between mt-3 pt-3 border-t">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
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
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeItem(item.variantId)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Dynamic Incentive Message - Only for 1 item */}
                {totalItems === 1 && (
                  <div className="mt-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-lg p-3 text-center animate-pulse">
                    <p className="text-sm font-semibold text-amber-700">
                      🔥 Add 1 more for 54% OFF! Limited time offer
                    </p>
                  </div>
                )}
                {totalItems >= 2 && (
                  <div className="mt-4 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-400 rounded-lg p-3 text-center">
                    <p className="text-sm font-bold text-green-700">
                      🎉 You're saving 54% on your order!
                    </p>
                  </div>
                )}

                {/* Delivery Information */}
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                  <p className="text-sm font-bold text-blue-700">
                    📦 FREE DELIVERY to <span className="font-black">{getCountryName(userCountry)}</span> <span className="font-black">{deliveryInfo.deliveryDate}</span>
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Order within <span className="text-green-600 font-semibold">{deliveryInfo.hours} hours {deliveryInfo.minutes} minutes</span>
                  </p>
                </div>
              </div>
              
              <div className="flex-shrink-0 space-y-4 pt-4 border-t bg-[#F8F7FF]">
                {(() => {
                  return (
                    <div className="space-y-2 px-2">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total</span>
                        <div className="text-right">
                          <div className="text-sm text-gray-400 line-through">
                            {formatDisplayPrice(totalOriginalPrice)}
                          </div>
                          <div className="text-2xl font-bold text-green-600">
                            {formatDisplayPrice(totalPrice)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold" 
                  size="lg"
                  disabled={items.length === 0 || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Creating Checkout...
                    </>
                  ) : (
                    <span className="flex items-center text-[105%]">
                      🔒 Secure Checkout
                    </span>
                  )}
                </Button>
                
                {/* Payment Icons - Same as Product Page */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <img
                    className="h-5 w-auto"
                    src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Shop_Pay_logo.svg"
                    alt="Shop Pay"
                  />
                  <img
                    className="h-5 w-auto"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                    alt="Visa"
                  />
                  <img
                    className="h-5 w-auto"
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                    alt="Mastercard"
                  />
                  <img
                    className="h-5 w-auto"
                    src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg"
                    alt="American Express"
                  />
                  <img
                    className="h-5 w-auto"
                    src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg"
                    alt="Google Pay"
                  />
                  <img
                    className="h-5 w-auto"
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                    alt="PayPal"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
