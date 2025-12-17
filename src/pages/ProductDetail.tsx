import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getProducts, ShopifyProduct, createStorefrontCheckout } from "@/lib/shopify";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { ArrowLeft, Star, Package, Clock, BookOpen, Box, Check, Loader2, Zap } from "lucide-react";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";
import { trackEvent } from "@/hooks/use-google-analytics";
import { supabase } from "@/integrations/supabase/client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  detectUserCountry, 
  getCurrencyForCountry, 
  convertPrice, 
  formatPrice,
  getCountryName,
  CurrencyCode 
} from "@/lib/currency";
import { trackProductView } from "@/lib/shopify-analytics";
import productMain from "@/assets/product-main.jpg";
import productHowItWorks from "@/assets/product-how-it-works.jpg";
import DonationBanner from "@/components/DonationBanner";
import productTemperature from "@/assets/product-temperature.jpg";
import productPainRelief from "@/assets/product-pain-relief.jpg";
import productControl from "@/assets/product-control.jpg";
import productVibration from "@/assets/product-vibration.jpg";
import productSpecs from "@/assets/product-specs.jpg";
import giftEguideIcon from "@/assets/gift-eguide-new.png";
import giftBoxIcon from "@/assets/gift-box-icon.png";
import laserTherapyNew from "@/assets/laser-therapy-new.png";
import { VideoReviews } from "@/components/VideoReviews";
import ScrollingBanner from "@/components/ScrollingBanner";

const ProductDetail = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedBundle, setSelectedBundle] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [currency, setCurrency] = useState<CurrencyCode>('GBP');
  const [userCountry, setUserCountry] = useState<string>('GB');
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const reviewsPerPage = 10;
  const { addItem, clearCart } = useCartStore();
  const hasTrackedProductView = useRef(false);
  const navigate = useNavigate();
  const ctaSectionRef = useRef<HTMLDivElement>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [buyNowError, setBuyNowError] = useState<string | null>(null);

  // Countries with extended delivery time (12 days)
  const EXTENDED_DELIVERY_COUNTRIES = ['FI', 'NL', 'SE', 'CH', 'NO', 'NZ', 'AT', 'BE', 'DK'];

  // Calculate delivery date and countdown timer
  const getDeliveryInfo = (countryCode: string) => {
    const now = new Date();
    // Convert to UK time
    const ukTime = new Date(now.toLocaleString("en-US", { timeZone: "Europe/London" }));
    
    // Calculate time until midnight UK
    const midnight = new Date(ukTime);
    midnight.setHours(24, 0, 0, 0);
    const diffMs = midnight.getTime() - ukTime.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    // Determine delivery days based on country (12 days for extended countries, 9 days for others)
    const deliveryDays = EXTENDED_DELIVERY_COUNTRIES.includes(countryCode) ? 12 : 9;
    
    // Calculate delivery date
    const deliveryDate = new Date(ukTime);
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
    
    // Format delivery date
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

  // Update countdown every minute and when country changes
  useEffect(() => {
    setDeliveryInfo(getDeliveryInfo(userCountry));
    const timer = setInterval(() => {
      setDeliveryInfo(getDeliveryInfo(userCountry));
    }, 60000);
    return () => clearInterval(timer);
  }, [userCountry]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) {
      toast.error("Please enter your email address");
      return;
    }
    setIsSubscribing(true);
    try {
      const { data, error } = await supabase.functions.invoke('subscribe-newsletter', {
        body: { email: newsletterEmail }
      });
      if (error) throw error;
      toast.success("Thank you! You have successfully subscribed to our newsletter.", {
        duration: 5000,
      });
      setNewsletterEmail("");
    } catch (error: any) {
      console.error('Subscription error:', error);
      toast.error(error.message || "Failed to subscribe. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  // Detect user's country and currency on mount
  useEffect(() => {
    const detectCountryAndCurrency = async () => {
      const countryCode = await detectUserCountry();
      setUserCountry(countryCode);
      const detectedCurrency = getCurrencyForCountry(countryCode);
      setCurrency(detectedCurrency);
    };
    detectCountryAndCurrency();
  }, []);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const products = await getProducts(10);
        // Try to find product by handle first
        let found = products.find((p) => p.node.handle === handle);

        // If not found by handle, use the first product as default
        if (!found && products.length > 0) {
          found = products[0];
        }

        if (found) {
          setProduct(found);
        }
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [handle]);

  // Track product view for Shopify Analytics
  useEffect(() => {
    if (product && !hasTrackedProductView.current) {
      hasTrackedProductView.current = true;
      const variant = product.node.variants.edges[0]?.node;
      const image = product.node.images.edges[0]?.node;
      
      trackProductView({
        productId: product.node.id,
        productTitle: product.node.title,
        productHandle: product.node.handle,
        productPrice: product.node.priceRange.minVariantPrice.amount,
        productCurrency: product.node.priceRange.minVariantPrice.currencyCode,
        productVariantId: variant?.id,
        productImageUrl: image?.url,
      });
    }
  }, [product]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    // Check current cart total
    const { items } = useCartStore.getState();
    const currentTotal = items.reduce((sum, item) => sum + item.quantity, 0);
    
    if (currentTotal + selectedBundle > 2) {
      toast.error("Maximum quantity reached", {
        description: "A customer can purchase a maximum of 2 items.",
        position: "top-center",
      });
      return;
    }
    
    setIsAddingToCart(true);

    try {
      const variant = product.node.variants.edges[0].node;
      const bundle = bundles.find((b) => b.qty === selectedBundle) || bundles[0];
      
      const cartItem = {
        product,
        variantId: variant.id,
        variantTitle: variant.title,
        price: {
          amount: bundle.priceEach.toFixed(2),
          currencyCode: currency,
        },
        quantity: selectedBundle,
        selectedOptions: variant.selectedOptions,
      };

      addItem(cartItem);
      toast.success("Added to cart!", {
        description: `${selectedBundle}x ${product.node.title}`,
        position: "top-center",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (!product) return;
    setIsBuyingNow(true);
    setBuyNowError(null);

    try {
      const variant = product.node.variants.edges[0].node;
      
      // Track buy now click event
      trackEvent("buy_now_click", {
        product_id: product.node.id,
        variant_id: variant.id,
        product_title: product.node.title,
      });

      // Clear cart and add single item
      clearCart();
      
      const cartItem = {
        product,
        variantId: variant.id,
        variantTitle: variant.title,
        price: {
          amount: variant.price.amount,
          currencyCode: variant.price.currencyCode,
        },
        quantity: 1,
        selectedOptions: variant.selectedOptions,
      };

      addItem(cartItem);

      // Create checkout and redirect (use location.href to avoid pop-up blocker)
      const checkoutUrl = await createStorefrontCheckout([cartItem]);
      
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Buy now failed:", error);
      setBuyNowError("Failed to proceed to checkout. Please try again.");
      toast.error("Failed to proceed to checkout", {
        description: "Please try again or use Add to Cart.",
        position: "top-center",
      });
    } finally {
      setIsBuyingNow(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const images = product.node.images.edges;
  const basePrice = parseFloat(product.node.priceRange.minVariantPrice.amount);
  const baseCurrency = product.node.priceRange.minVariantPrice.currencyCode;

  // Fixed GBP prices: 1 purchase = £59.99, 2 purchases = £54.99 each
  const singlePrice = 59.99;
  const twoPackPriceEach = 54.99;
  const originalPriceMultiplier = 2;
  
  const baseBundles = [
    { 
      qty: 1, 
      priceEach: singlePrice, 
      original: singlePrice * originalPriceMultiplier, 
      discount: 50, 
      tag: null,
      label: "One purchase"
    },
    { 
      qty: 2, 
      priceEach: twoPackPriceEach,
      original: singlePrice * originalPriceMultiplier * 2, 
      discount: 54, 
      tag: "MOST POPULAR",
      label: "Two purchases"
    },
  ];

  // Convert bundles to selected currency
  const bundles = baseBundles.map(bundle => ({
    ...bundle,
    priceEach: convertPrice(bundle.priceEach, currency),
    original: convertPrice(bundle.original, currency),
  }));

  const currentBundle = bundles.find((b) => b.qty === selectedBundle) || bundles[0];

  // All reviews with dates (most recent first)
  const allReviews = [
    {
      name: "Emma W.",
      rating: 5,
      text: "This is the best investment I've made for my knee health. The heat therapy combined with vibration is incredibly soothing.",
      date: "2025-10-15",
      image: "/images/review-photo-1.png",
    },
    {
      name: "James P.",
      rating: 5,
      text: "After just one week, I noticed a significant reduction in my chronic knee pain. The wireless design is perfect!",
      date: "2025-10-14",
      image: "/images/review-photo-2.png",
    },
    {
      name: "Lisa M.",
      rating: 4,
      text: "Great product overall. The heat levels are perfect and it's very comfortable to wear. Battery could last a bit longer though.",
      date: "2025-10-13",
    },
    {
      name: "Robert K.",
      rating: 5,
      text: "My arthritis pain has improved dramatically. I use it twice daily and the results are amazing.",
      date: "2025-10-12",
    },
    {
      name: "Amanda S.",
      rating: 5,
      text: "So easy to use and the relief is instant! Love that it's wireless so I can move around.",
      date: "2025-10-11",
    },
    {
      name: "Chris D.",
      rating: 4,
      text: "Works well for post-workout recovery. The red light feature is a nice bonus. Would recommend!",
      date: "2025-10-10",
    },
    {
      name: "Michelle T.",
      rating: 5,
      text: "I've tried many knee massagers and this is by far the best. The quality is exceptional.",
      date: "2025-10-09",
    },
    {
      name: "David H.",
      rating: 5,
      text: "Perfect for my elderly mother. Easy controls and she says it helps her knee pain tremendously.",
      date: "2025-10-08",
    },
    {
      name: "Jennifer B.",
      rating: 5,
      text: "The adjustable heat settings are great. I can customize it based on how I'm feeling each day.",
      date: "2025-10-07",
    },
    {
      name: "Thomas R.",
      rating: 5,
      text: "After knee surgery, this has been essential for my recovery. Highly recommend to anyone post-op.",
      date: "2025-10-06",
    },
    {
      name: "Sarah M.",
      rating: 4,
      text: "After years of knee pain from running, this massager has been a game-changer. The heat and vibration combination provides instant relief.",
      date: "2025-10-05",
    },
    {
      name: "Michael R.",
      rating: 5,
      text: "I was skeptical at first, but FlexiKnee™ has exceeded my expectations. The red light therapy feature is incredible.",
      date: "2025-10-04",
    },
    {
      name: "Jennifer L.",
      rating: 5,
      text: "Love how portable this is! I can use it while watching TV or even at work. The wireless design and long battery life make it so convenient.",
      date: "2025-10-03",
    },
    {
      name: "David K.",
      rating: 3,
      text: "As a construction worker, my knees take a beating daily. This massager helps me recover faster. Wish the heat was slightly warmer though.",
      date: "2025-10-02",
    },
    {
      name: "Patricia H.",
      rating: 5,
      text: "I bought one for myself and loved it so much I ordered two more for my parents. The adjustable straps fit comfortably.",
      date: "2025-10-01",
    },
    {
      name: "Robert T.",
      rating: 4,
      text: "After knee surgery, my physical therapist recommended heat therapy. FlexiKnee™ has been perfect for my recovery. Battery life is decent.",
      date: "2025-09-30",
    },
    {
      name: "Karen G.",
      rating: 5,
      text: "The vibration massage is so relaxing. I use it every evening and sleep so much better now.",
      date: "2025-09-29",
    },
    {
      name: "Daniel F.",
      rating: 5,
      text: "Great value for the price. Works better than my expensive physical therapy sessions!",
      date: "2025-09-28",
    },
    {
      name: "Nancy L.",
      rating: 3,
      text: "My doctor was impressed with my progress. This device really helps with inflammation and stiffness. Would be better with more vibration levels.",
      date: "2025-09-27",
    },
    {
      name: "Brian C.",
      rating: 5,
      text: "I use it before and after my gym sessions. It helps prevent soreness and keeps my knees healthy.",
      date: "2025-09-26",
    },
    {
      name: "Rachel A.",
      rating: 4,
      text: "The red light therapy is amazing! I can feel the warmth penetrating deep into my knee joint. Great overall product.",
      date: "2025-09-25",
    },
    {
      name: "Steven W.",
      rating: 5,
      text: "Finally found something that actually works for my knee pain. Worth every penny!",
      date: "2025-09-24",
    },
    {
      name: "Linda P.",
      rating: 5,
      text: "Very comfortable to wear and the controls are intuitive. My husband wants one now too!",
      date: "2025-09-23",
    },
    {
      name: "George M.",
      rating: 3,
      text: "Excellent for arthritis pain. The heat settings are perfect and it's easy to use. Could be more portable.",
      date: "2025-09-22",
    },
    {
      name: "Carol S.",
      rating: 5,
      text: "I'm a nurse on my feet all day. This massager is a lifesaver for my tired, aching knees.",
      date: "2025-09-21",
    },
    {
      name: "Mark J.",
      rating: 5,
      text: "The build quality is impressive. Feels premium and durable. Great investment!",
      date: "2025-09-20",
    },
    {
      name: "Susan E.",
      rating: 4,
      text: "Helps so much with my osteoarthritis. I wish I had found this product sooner! Works as advertised.",
      date: "2025-09-19",
    },
    {
      name: "Kevin L.",
      rating: 5,
      text: "The wireless feature is a game changer. No more dealing with annoying cords!",
      date: "2025-09-18",
    },
    {
      name: "Dorothy R.",
      rating: 5,
      text: "My physiotherapist was impressed when I showed her this. She recommends it to her other patients now.",
      date: "2025-09-17",
    },
    {
      name: "Paul N.",
      rating: 3,
      text: "Good product for the price. The heat function works well. Would prefer if it came in different sizes though.",
      date: "2025-09-16",
    },
    {
      name: "Maria V.",
      rating: 5,
      text: "After trying countless remedies, this is the only thing that's given me consistent relief from knee pain.",
      date: "2025-09-15",
    },
    {
      name: "Charles D.",
      rating: 5,
      text: "Bought this for post-marathon recovery. It's become an essential part of my training routine.",
      date: "2025-09-14",
    },
    {
      name: "Betty A.",
      rating: 4,
      text: "Very pleased with this purchase. The different heat levels let me customize the treatment. Battery life is acceptable.",
      date: "2025-09-13",
    },
    {
      name: "Donald W.",
      rating: 5,
      text: "I have severe osteoarthritis and this helps immensely. Can finally enjoy my daily walks again!",
      date: "2025-09-12",
    },
    {
      name: "Sandra G.",
      rating: 5,
      text: "Love the red light therapy feature! You can really feel it working on the inflammation.",
      date: "2025-09-11",
    },
    {
      name: "Joseph P.",
      rating: 3,
      text: "Works well for my knee pain. The vibration is soothing. Charging cable could be longer.",
      date: "2025-09-10",
    },
    {
      name: "Barbara M.",
      rating: 5,
      text: "Best knee massager I've ever used. The combination of heat and vibration is perfect.",
      date: "2025-09-09",
    },
    {
      name: "Richard B.",
      rating: 5,
      text: "I'm a professional athlete and this helps with recovery after intense training sessions.",
      date: "2025-09-08",
    },
    {
      name: "Elizabeth K.",
      rating: 4,
      text: "Great for daily use. The adjustable straps ensure a perfect fit. Very comfortable to wear for extended periods.",
      date: "2025-09-07",
    },
    {
      name: "William S.",
      rating: 5,
      text: "My wife and I both use it. It's helped both of us with our knee issues remarkably.",
      date: "2025-09-06",
    },
    {
      name: "Margaret L.",
      rating: 5,
      text: "The quality exceeded my expectations. You can tell it's built to last.",
      date: "2025-09-05",
    },
    {
      name: "Jason H.",
      rating: 4,
      text: "Really effective for managing my runner's knee. The heat penetrates deep into the joint. Solid product overall.",
      date: "2025-09-04",
    },
    {
      name: "Angela B.",
      rating: 5,
      text: "Worth every cent. My knee pain is significantly reduced.",
      date: "2025-09-03",
    },
    {
      name: "Raymond C.",
      rating: 3,
      text: "Great for recovery after long runs. Love the wireless convenience. Would be nice if it was slightly lighter.",
      date: "2025-09-02",
    },
    {
      name: "Deborah M.",
      rating: 5,
      text: "Easy to use and very effective. My physical therapist approved!",
      date: "2025-09-01",
    },
    {
      name: "Gary F.",
      rating: 5,
      text: "Finally something that actually helps with chronic knee pain. No more painkillers for me!",
      date: "2025-08-31",
    },
    {
      name: "Helen R.",
      rating: 4,
      text: "Very comfortable and effective. The heat settings are perfect for my needs. Battery holds charge well.",
      date: "2025-08-30",
    },
    {
      name: "Frank T.",
      rating: 5,
      text: "I'm amazed at how quickly this relieved my knee pain. Noticed improvement within days.",
      date: "2025-08-29",
    },
    {
      name: "Ruth W.",
      rating: 5,
      text: "My arthritis symptoms have improved so much since I started using this daily.",
      date: "2025-08-28",
    },
    {
      name: "Larry M.",
      rating: 3,
      text: "Does what it says. The red light feature is interesting. Takes some time to see full results but worth it.",
      date: "2025-08-27",
    },
  ];

  const totalPages = Math.ceil(allReviews.length / reviewsPerPage);
  const displayedReviews = showAllReviews
    ? allReviews.slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage)
    : allReviews.slice(0, 6);
  const totalPrice = currentBundle.priceEach * currentBundle.qty;
  const discount = currentBundle.discount;

  return (
    <div className="min-h-screen bg-background">
      {/* Scarcity Banner - Now at the very top */}
      <div className="bg-destructive text-destructive-foreground py-3 sticky top-0 z-50">
        <div className="container px-4 text-center">
          <p className="font-semibold text-sm md:text-base">🔥 LIMITED TIME OFFER — 50% OFF TODAY ONLY</p>
        </div>
      </div>

      <Header />

      <div className="container px-3 sm:px-4 py-4 md:py-6 max-w-[100vw] overflow-x-hidden">

        {/* Top Section - Premium Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-7xl mx-auto mb-12">
          {/* Product Images */}
          <div className="space-y-4 min-w-0">
            <div className="relative rounded-2xl overflow-hidden bg-muted aspect-square">
              {images[selectedImage] && (
                <img
                  src={images[selectedImage].node.url}
                  alt={product.node.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute top-1 right-1">
                <Badge className="bg-destructive text-destructive-foreground text-xs px-2 py-1 shadow-lg">
                  {discount}% OFF
                </Badge>
              </div>
            </div>

            {/* Thumbnail Gallery - Scrollable */}
            {images.length > 1 && (
              <div className="relative">
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/40">
                  {images.map((image, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === idx ? "border-primary shadow-lg" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <img src={image.node.url} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6 min-w-0 w-full">
            {/* Title First */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3 text-[#111111] dark:text-white">
                {product.node.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge className="bg-[#FF9900] text-white border-[#FF9900] hover:bg-[#FF9900]/90 font-bold px-3 py-1">#1 Best-Selling</Badge>
                <Badge variant="outline">
                  <Clock className="w-3 h-3 mr-1" />
                  2,500+ sold this week
                </Badge>
              </div>
            </div>

            {/* Rating & Social Proof - Below Title */}
            <button
              onClick={() => document.getElementById("reviews-section")?.scrollIntoView({ behavior: "smooth" })}
              className="flex flex-wrap items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-1">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 30% 0 0)" }} />
              </div>
              <span className="text-sm font-semibold">4.7 (1128 Reviews)</span>
            </button>

            {/* Key Benefits - 4 Feature Grid */}
            <div className="grid grid-cols-2 gap-6 mb-4">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-xl flex-shrink-0">🩺</span>
                  <div>
                    <p className="font-bold text-sm text-foreground">Relief</p>
                    <p className="text-xs text-muted-foreground">Fast-acting heat & vibration to ease knee pain.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-xl flex-shrink-0">💆</span>
                  <div>
                    <p className="font-bold text-sm text-foreground">Therapy</p>
                    <p className="text-xs text-muted-foreground">Deep heat + red light targeting stiff joints.</p>
                  </div>
                </div>
              </div>
              {/* Right Column */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-xl flex-shrink-0">🚶</span>
                  <div>
                    <p className="font-bold text-sm text-foreground">Freedom</p>
                    <p className="text-xs text-muted-foreground">Move comfortably again — anytime, anywhere.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-xl flex-shrink-0">⚡</span>
                  <div>
                    <p className="font-bold text-sm text-foreground">Wireless</p>
                    <p className="text-xs text-muted-foreground">Rechargeable + cord-free for everyday mobility.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase Options */}
            <div className="space-y-2">
              <div className="flex items-center gap-4 mb-2">
                <div className="flex-1 h-px bg-border"></div>
                <h3 className="font-bold text-base whitespace-nowrap">Purchase Options</h3>
                <div className="flex-1 h-px bg-border"></div>
              </div>

              <div className="space-y-2">
                {bundles.map((bundle) => (
                  <button
                    key={bundle.qty}
                    onClick={() => setSelectedBundle(bundle.qty)}
                    className={`w-full text-left p-2.5 rounded-lg border-2 transition-all relative ${
                      selectedBundle === bundle.qty
                        ? "border-primary bg-sky-50 dark:bg-sky-950/20"
                        : "border-border bg-sky-50/50 dark:bg-sky-950/10 hover:border-primary/50"
                    }`}
                  >
                    {bundle.tag && (
                      <div className="absolute -top-1.5 right-3">
                        <Badge className="bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0">
                          {bundle.tag}
                        </Badge>
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-2 min-w-0">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div
                          className={`w-4 h-4 flex-shrink-0 rounded-full border-2 flex items-center justify-center ${
                            selectedBundle === bundle.qty ? "border-primary" : "border-muted-foreground"
                          }`}
                        >
                          {selectedBundle === bundle.qty && <div className="w-2 h-2 rounded-full bg-primary" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-sm truncate">
                            {bundle.label}
                          </div>
                          {bundle.qty > 1 && (
                            <div className="text-[11px] text-muted-foreground">
                              {formatPrice(bundle.priceEach, currency)} each
                            </div>
                          )}
                          <div className="text-[11px] text-primary font-medium truncate">
                            You Saved {bundle.discount}% + Ebook
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-bold text-base whitespace-nowrap">
                          {formatPrice(bundle.priceEach * bundle.qty, currency)}
                        </div>
                        <div className="text-[11px] text-muted-foreground line-through whitespace-nowrap">
                          {formatPrice(bundle.original, currency)}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full h-14 rounded-lg border-2 border-border bg-gray-100 dark:bg-gray-800 px-4 font-bold text-lg focus:border-primary focus:outline-none cursor-pointer"
              >
                {[1, 2].map((num) => (
                  <option key={num} value={num}>
                    Quantity: {num}
                  </option>
                ))}
              </select>
            </div>

            {/* CTA Section */}
            <div ref={ctaSectionRef} className="space-y-3">
              <Button 
                onClick={handleAddToCart} 
                size="lg" 
                className="w-full text-lg h-14 font-bold"
                disabled={isAddingToCart || isBuyingNow}
              >
                {isAddingToCart ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "ADD TO CART"
                )}
              </Button>

              <Button 
                onClick={handleBuyNow}
                variant="outline"
                size="lg" 
                className="w-full text-lg h-14 font-bold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                disabled={isAddingToCart || isBuyingNow}
              >
                {isBuyingNow ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "BUY NOW"
                )}
              </Button>

              {buyNowError && (
                <p className="text-sm text-destructive text-center">{buyNowError}</p>
              )}
            </div>

            {/* Delivery Information with Countdown */}
            <p className="text-center text-[0.75em] md:text-[0.945em] mt-3 mb-0 font-bold text-foreground">
              📦 FREE DELIVERY to <span className="font-black">{getCountryName(userCountry)}</span> <span className="font-black">{deliveryInfo.deliveryDate}</span>. Order within <span className="text-green-600">{deliveryInfo.hours} hours {deliveryInfo.minutes} minutes</span>
            </p>
            <button
              onClick={async () => {
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                  window.location.href = '/account#returns';
                } else {
                  window.location.href = '/account';
                }
              }}
              className="text-center text-[0.75em] md:text-[0.945em] mt-1 mb-0 font-bold hover:underline cursor-pointer transition-opacity hover:opacity-80 w-full"
              style={{ color: "#555555" }}
            >
              🛡️ 30-Day Easy Returns + 2-Year Warranty Included
            </button>
            <p className="text-center text-[0.75em] md:text-[0.945em] mt-1 mb-0 font-bold" style={{ color: "#333333" }}>
              💷 VAT Included in Price
            </p>

            {/* Payment Methods */}
            <div className="flex items-center justify-center py-2">
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 lg:gap-4 p-0 m-0 leading-none w-full">
                {/* Shop Pay */}
                <img
                  className="h-6 md:h-7 lg:h-8 w-auto block"
                  src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Shop_Pay_logo.svg"
                  alt="Shop Pay"
                />

                {/* Visa */}
                <img
                  className="h-6 md:h-7 lg:h-8 w-auto block"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                  alt="Visa"
                />

                {/* Mastercard */}
                <img
                  className="h-6 md:h-7 lg:h-8 w-auto block"
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                  alt="Mastercard"
                />

                {/* American Express */}
                <img
                  className="h-6 md:h-7 lg:h-8 w-auto block"
                  src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg"
                  alt="American Express"
                />

                {/* Google Pay */}
                <img
                  className="h-6 md:h-7 lg:h-8 w-auto block"
                  src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg"
                  alt="Google Pay"
                />

                {/* PayPal */}
                <img
                  className="h-6 md:h-7 lg:h-8 w-auto block"
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                  alt="PayPal"
                />
              </div>
            </div>

            {/* Donation Impact Banner */}
            <DonationBanner />

            {/* Free Gifts Section */}
            <div className="space-y-3 mt-1">
              <h3 className="font-bold text-center text-sm tracking-wide">FREE GIFTS WITH YOUR FIRST ORDER</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Gift 1 - eBook */}
                <div className="relative p-5 border-[3px] border-dashed border-black rounded-[12px] bg-[#FFFFE0] hover:bg-[#FFFACD] transition-all cursor-pointer shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]">
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0.5 font-bold">
                      FREE <span className="line-through">$10</span>
                    </Badge>
                  </div>
                  <div className="flex flex-col items-center text-center gap-3 pt-2">
                    <div className="w-32 h-32 flex items-center justify-center">
                      <img
                        src={giftEguideIcon}
                        alt="eBook"
                        className="w-full h-full object-contain"
                        style={{ mixBlendMode: "multiply" }}
                      />
                    </div>
                    <p className="text-sm font-bold uppercase tracking-wide">EBOOK</p>
                  </div>
                </div>

                {/* Gift 2 - Shipping */}
                <div className="relative p-5 border-[3px] border-dashed border-black rounded-[12px] bg-[#FFFFE0] hover:bg-[#FFFACD] transition-all cursor-pointer shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]">
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0.5 font-bold">
                      FREE <span className="line-through">$6</span>
                    </Badge>
                  </div>
                  <div className="flex flex-col items-center text-center gap-3 pt-2">
                    <div className="w-32 h-32 flex items-center justify-center">
                      <img
                        src={giftBoxIcon}
                        alt="Free Shipping"
                        className="w-full h-full object-contain"
                        style={{ mixBlendMode: "multiply" }}
                      />
                    </div>
                    <p className="text-sm font-bold uppercase tracking-wide">FREE SHIPPING</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling Banner */}
        <ScrollingBanner />

        {/* Customer Video Reviews */}
        <VideoReviews />

        {/* Pain Points Section */}
        <section className="py-12 bg-muted/30 -mx-4 px-4 mb-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4">TARGETS THESE PROBLEMS</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Say Goodbye to <span className="text-primary">Knee Pain</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Advanced therapy technology designed to relieve pain and improve mobility
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden">
              <img src={productPainRelief} alt="Knee pain relief targets" className="w-full h-auto" />
            </div>
          </div>
        </section>

        {/* Product in Use */}
        <section className="py-12 mb-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="rounded-2xl overflow-hidden">
                <img src={productHowItWorks} alt="Product in use" className="w-full h-auto" />
              </div>
              <div className="space-y-6">
                <Badge>HOW IT WORKS</Badge>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Advanced <span className="text-primary">Heat Therapy</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Triple therapy combines infrared heat, vibration massage, and red light technology to penetrate deep
                  into your knee joint, providing instant relief and promoting healing.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Reduces Inflammation</p>
                      <p className="text-sm text-muted-foreground">Deep heat penetrates to reduce swelling</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Improves Blood Flow</p>
                      <p className="text-sm text-muted-foreground">Enhanced circulation speeds recovery</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Relaxes Muscles</p>
                      <p className="text-sm text-muted-foreground">Vibration massage eases tension</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Diagram */}
        <section className="py-12 bg-muted/30 -mx-4 px-4 mb-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4">PREMIUM FEATURES</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Designed for <span className="text-primary">Maximum Comfort</span>
              </h2>
            </div>

            <div className="rounded-2xl overflow-hidden bg-background">
              <img src={productControl} alt="Product features" className="w-full h-auto" />
            </div>
          </div>
        </section>

        {/* Red Light Technology */}
        <section className="py-12 mb-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 order-2 md:order-1">
                <Badge>ADVANCED TECHNOLOGY</Badge>
                <h2 className="text-3xl md:text-4xl font-bold">
                  18 LED <span className="text-primary">Red Light</span> Points
                </h2>
                <p className="text-lg text-muted-foreground">
                  Clinical-grade red light therapy penetrates deep into tissue to promote healing, reduce pain, and
                  accelerate recovery.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4">
                    <p className="text-3xl font-bold text-primary mb-2">18</p>
                    <p className="text-sm text-muted-foreground">LED Points</p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-3xl font-bold text-primary mb-2">3</p>
                    <p className="text-sm text-muted-foreground">Intensity Levels</p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-3xl font-bold text-primary mb-2">45-55°C</p>
                    <p className="text-sm text-muted-foreground">Heat Range</p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-3xl font-bold text-primary mb-2">2-3h</p>
                    <p className="text-sm text-muted-foreground">Battery Life</p>
                  </Card>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden order-1 md:order-2">
                <img src={laserTherapyNew} alt="Red light technology" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="py-12 bg-muted/30 -mx-4 px-4 mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4">TECHNICAL DETAILS</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Product <span className="text-primary">Specifications</span>
              </h2>
            </div>

            <div className="rounded-2xl overflow-hidden bg-background">
              <img src={productSpecs} alt="Product specifications" className="w-full h-auto" />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 mb-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4">QUESTIONS?</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">How long does the battery last?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  The 3000mAh battery provides 2-3 hours of continuous use. Charging takes 2-3 hours via the included
                  USB-C cable.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">Is it safe for daily use?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! We recommend 15-30 minute sessions, 1-3 times daily. Consult your doctor if you have any medical
                  conditions.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">Will it fit all leg sizes?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, the adjustable straps accommodate all leg sizes comfortably. The design is universal and fits
                  most users.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">What's included in the box?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  You'll receive the knee massager, USB-C charging cable, user manual, and date line.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section id="reviews-section" className="py-12 mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4">CUSTOMER REVIEWS</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our <span className="text-primary">Customers Say</span>
              </h2>
            </div>

            {/* Rating Overview */}
            <div className="bg-secondary/30 rounded-lg p-8 mb-12">
              <div className="grid md:grid-cols-[1fr_2fr_auto] gap-8 items-center">
                {/* Average Rating */}
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">4.7</div>
                  <div className="flex gap-1 justify-center mb-2">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <Star
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      style={{ clipPath: "inset(0 30% 0 0)" }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">1,128 reviews</p>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-2">
                  {[
                    { stars: 5, percentage: 76 },
                    { stars: 4, percentage: 18 },
                    { stars: 3, percentage: 4 },
                    { stars: 2, percentage: 1 },
                    { stars: 1, percentage: 1 },
                  ].map(({ stars, percentage }) => (
                    <div key={stars} className="flex items-center gap-3">
                      <div className="flex gap-0.5 w-20">
                        {[...Array(stars)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                        {[...Array(5 - stars)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-gray-300" />
                        ))}
                      </div>
                      <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-10 text-right">{percentage}%</span>
                    </div>
                  ))}
                </div>

                {/* Write Review Button */}
                <div>
                  <Button
                    onClick={() => {
                      toast.info("Purchase Required", {
                        description: "You need to purchase the product first to write a review.",
                        position: "top-center",
                      });
                    }}
                    className="whitespace-nowrap"
                  >
                    WRITE A REVIEW
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {displayedReviews.map((review, idx) => (
                <Card key={idx}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <div className="flex gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="font-semibold">{review.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            Verified Buyer
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">"{review.text}"</p>
                        {review.image && (
                          <div className="mt-3">
                            <img
                              src={review.image}
                              alt="Customer review photo"
                              className="rounded-lg max-w-xs w-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {!showAllReviews && allReviews.length > 6 && (
              <div className="mt-8 text-center">
                <Button variant="outline" size="lg" onClick={() => setShowAllReviews(true)}>
                  Show All {allReviews.length} Reviews
                </Button>
              </div>
            )}

            {showAllReviews && (
              <div className="mt-8 flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-2 px-4">
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">FlexiKnee™ vs. Other Knee Devices</h2>
            <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-primary text-primary-foreground">
                      <th className="p-4 text-left font-bold">Feature</th>
                      <th className="p-4 text-center font-bold">FlexiKnee™</th>
                      <th className="p-4 text-center font-bold">Others</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-4 font-medium">Heat Levels</td>
                      <td className="p-4 text-center text-primary font-semibold">✓ 3 Levels</td>
                      <td className="p-4 text-center text-destructive">✗ weak heating</td>
                    </tr>
                    <tr className="bg-muted/20">
                      <td className="p-4 font-medium">Vibration</td>
                      <td className="p-4 text-center text-primary font-semibold">✓ 3 Modes</td>
                      <td className="p-4 text-center text-destructive">✗ none</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Red-Light</td>
                      <td className="p-4 text-center text-primary font-semibold">✓ 18 LEDs</td>
                      <td className="p-4 text-center text-destructive">✗ none</td>
                    </tr>
                    <tr className="bg-muted/20">
                      <td className="p-4 font-medium">Battery</td>
                      <td className="p-4 text-center text-primary font-semibold">✓ 3000mAh</td>
                      <td className="p-4 text-center text-destructive">✗ low capacity</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Comfort</td>
                      <td className="p-4 text-center text-primary font-semibold">✓ ergonomic</td>
                      <td className="p-4 text-center text-destructive">✗ bulky</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5 -mx-4 px-4 rounded-2xl">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="text-base px-4 py-2">LIMITED TIME OFFER</Badge>
            <h2 className="text-3xl md:text-5xl font-bold">
              Ready to End Your <span className="text-primary">Knee Pain?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied customers who have found relief with our wireless heated knee massager.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button onClick={handleAddToCart} size="lg" className="text-lg px-8 h-14">
                <Package className="w-5 h-5 mr-2" />
                Add to Cart - {formatPrice(convertPrice(totalPrice, currency), currency)}
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter Sign-Up */}
        <section className="py-16">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center bg-primary/5 rounded-2xl p-12 border-2 border-primary/20">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join 50,000+ People Improving Their Knee Health
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get exclusive tips, discounts and early access.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-border focus:border-primary focus:outline-none"
                  disabled={isSubscribing}
                />
                <Button size="lg" className="px-8" type="submit" disabled={isSubscribing}>
                  {isSubscribing ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </div>

      <Footer />

      {/* Mobile Sticky CTA Bar */}
      <MobileStickyCTA
        price={formatPrice(product.node.variants.edges[0]?.node.price.amount ? parseFloat(product.node.variants.edges[0].node.price.amount) : 0, currency)}
        variantSummary={product.node.variants.edges[0]?.node.title !== "Default Title" ? product.node.variants.edges[0]?.node.title : undefined}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        ctaSectionRef={ctaSectionRef}
        isAddingToCart={isAddingToCart}
        isBuyingNow={isBuyingNow}
      />
    </div>
  );
};

export default ProductDetail;
