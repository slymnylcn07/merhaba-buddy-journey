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
import { CURRENCY_CONFIG, CurrencyCode, detectUserCountry, getCurrencyForCountry } from "@/lib/currency";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userCurrency, setUserCurrency] = useState<CurrencyCode>('GBP');
  const { 
    items, 
    isLoading, 
    updateQuantity, 
    removeItem, 
    createCheckout 
  } = useCartStore();

  // Detect user's currency on mount
  useEffect(() => {
    const detectCurrency = async () => {
      const countryCode = await detectUserCountry();
      const detectedCurrency = getCurrencyForCountry(countryCode);
      setUserCurrency(detectedCurrency);
    };
    detectCurrency();
  }, []);
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);
  
  // Get currency symbol - use detected currency as fallback for consistency
  const getCurrencySymbol = (currencyCode: string): string => {
    const config = CURRENCY_CONFIG[currencyCode as CurrencyCode];
    if (config) return config.symbol;
    // Fallback to user's detected currency
    return CURRENCY_CONFIG[userCurrency]?.symbol || '£';
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
      console.log('Creating checkout...');
      console.log('Cart items for checkout:', items);
      
      console.log('Calling createStorefrontCheckout...');
      await createCheckout();
      
      const checkoutUrl = useCartStore.getState().checkoutUrl;
      console.log('Received checkout URL:', checkoutUrl);
      
      if (!checkoutUrl) {
        toast.error("Checkout failed", {
          description: "Unable to create checkout. Please try again.",
          position: "top-center",
        });
        return;
      }
      
      // Redirect to checkout - using location.href to avoid popup blockers on mobile
      console.log('Redirecting to checkout...');
      setIsOpen(false);
      window.location.href = checkoutUrl;
      
    } catch (error) {
      console.error('Checkout failed:', error);
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
                    const originalPrice = parseFloat(item.price.amount) * 2; // Calculate original price (50% off)
                    const currentPrice = parseFloat(item.price.amount);
                    const currencySymbol = getCurrencySymbol(item.price.currencyCode);
                    
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
                                SAVE 50% TODAY
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">
                              {item.selectedOptions.map(option => option.value).join(' • ')}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400 line-through text-sm">
                                {currencySymbol}{originalPrice.toFixed(2)}
                              </span>
                              <span className="text-lg font-bold text-green-600">
                                {currencySymbol}{currentPrice.toFixed(2)}
                              </span>
                              <span className="text-xs font-semibold text-green-600">
                                (SAVE 50%)
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
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
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
                
                {/* Most Popular Choice Bar */}
                <div className="mt-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-3 text-center">
                  <p className="text-sm font-medium text-gray-700">
                    💬 85% of customers made the same choice.
                  </p>
                </div>
              </div>
              
              <div className="flex-shrink-0 space-y-4 pt-4 border-t bg-[#F8F7FF]">
                {(() => {
                  const firstCurrency = items[0]?.price.currencyCode || userCurrency;
                  const currencySymbol = getCurrencySymbol(firstCurrency);
                  return (
                    <div className="flex justify-between items-center px-2">
                      <span className="text-lg font-semibold">Total</span>
                      <div className="text-right">
                        <div className="text-sm text-gray-400 line-through">
                          {currencySymbol}{(totalPrice * 2).toFixed(2)}
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                          {currencySymbol}{totalPrice.toFixed(2)}
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
