import { useEffect, useState, lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/stores/cartStore";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { Flame, Zap, Activity, Battery } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ScrollingBanner from "@/components/ScrollingBanner";

// Lazy load heavy below-fold content to improve TTI
const IndexBelowFold = lazy(() => import("@/components/IndexBelowFold"));

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "FlexiKnee",
  "url": "https://flexi-knee.com",
  "logo": "https://flexi-knee.com/logo.png",
  "description": "FlexiKnee offers innovative smart knee massagers combining heat therapy, vibration massage, and red-light technology for knee pain relief.",
  "sameAs": [
    "https://facebook.com/flexiknee",
    "https://instagram.com/flexiknee",
    "https://twitter.com/flexiknee"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "support@flexi-knee.com"
  }
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "FlexiKnee",
  "url": "https://flexi-knee.com",
  "description": "Smart knee massagers with heat therapy, vibration, and red-light technology for effective knee pain relief.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://flexi-knee.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function Index() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const location = useLocation();

  // Handle hash navigation (scroll to section)
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location.hash]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts(10);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    // Defer Shopify API call to break the critical network dependency chain
    const runDeferred = () => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => fetchProducts(), { timeout: 3000 });
      } else {
        setTimeout(fetchProducts, 1000);
      }
    };

    if (document.readyState === 'complete') {
      runDeferred();
    } else {
      window.addEventListener('load', runDeferred, { once: true });
    }
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newsletterEmail || !emailRegex.test(newsletterEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubscribing(true);
    try {
      const { data, error } = await supabase.functions.invoke("subscribe-newsletter", {
        body: { email: newsletterEmail },
      });

      if (error) throw error;

      toast.success("Thank you! You have successfully subscribed to our newsletter.", {
        duration: 5000,
      });
      setNewsletterEmail("");
    } catch (error: any) {
      console.error("Subscription error:", error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  const mainProduct = products[0];

  const handleAddToCart = () => {
    if (!mainProduct) return;
    const variant = mainProduct.node.variants.edges[0].node;
    
    addItem({
      product: mainProduct,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions,
    });
  };

  return (
    <>
      <Helmet>
        <title>FlexiKnee™ | Smart Heated Knee Massager with Red Light Therapy</title>
        <meta name="description" content="FlexiKnee™ targets inflammation, stiffness and mobility issues using heat, vibration and red-light technology — all in one smart device." />
        <link rel="canonical" href="https://flexi-knee.com/" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flexi-knee.com/" />
        <meta property="og:title" content="FlexiKnee™ | Smart Heated Knee Massager with Red Light Therapy" />
        <meta property="og:description" content="FlexiKnee™ targets inflammation, stiffness and mobility issues using heat, vibration and red-light technology — all in one smart device." />
        <meta property="og:image" content="https://flexi-knee.com/images/og-image.jpg" />
        <meta property="og:site_name" content="FlexiKnee" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@FlexiKnee" />
        <meta name="twitter:title" content="FlexiKnee™ | Smart Heated Knee Massager with Red Light Therapy" />
        <meta name="twitter:description" content="FlexiKnee™ targets inflammation, stiffness and mobility issues using heat, vibration and red-light technology — all in one smart device." />
        <meta name="twitter:image" content="https://flexi-knee.com/images/og-image.jpg" />
        
        <script type="application/ld+json">
          {JSON.stringify(organizationJsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteJsonLd)}
        </script>
      </Helmet>
      <div className="min-h-screen">
        <Header />
        <h1 className="sr-only">FlexiKnee Smart Heated Knee Massager with Red Light Therapy</h1>
      {/* Hero Banner */}
      {/* Hero Banner - Always render immediately */}
      <Link to={mainProduct ? `/product/${mainProduct.node.handle}` : '/product/knee-massager-smart-red-light-and-massage-therapy'} className="block">
        <section className="relative w-full overflow-hidden cursor-pointer hover:opacity-95 transition-opacity">
          <picture>
            <source media="(min-width: 768px)" srcSet="/images/hero-banner-desktop.webp" type="image/webp" />
            <source media="(max-width: 767px)" srcSet="/images/hero-banner-mobile.webp" type="image/webp" />
            <img 
              src="/images/hero-banner-mobile.webp" 
              alt="FlexiKnee Smart Heated Knee Massager" 
              className="w-full h-auto object-cover"
              width={450}
              height={675}
              loading="eager"
              fetchPriority="high"
              decoding="sync"
            />
          </picture>
        </section>
      </Link>

      {/* Scrolling Banner */}
      <div className="mt-8">
        <ScrollingBanner />
      </div>

      {/* Feature Text Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Say Goodbye to Knee Pain</h2>
          <p className="text-lg text-muted-foreground">
            FlexiKnee™ targets inflammation, stiffness and mobility issues using heat, vibration and red-light technology — all in one smart device.
          </p>
        </div>
      </section>

      {/* Icon List Section */}
      <section id="benefits" className="py-16">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-2 hover:border-primary transition-all">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Flame className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Heat Therapy</h3>
                <p className="text-sm text-muted-foreground">
                  Relieves stiffness & improves circulation
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Smart Vibration</h3>
                <p className="text-sm text-muted-foreground">
                  Loosens tight muscles
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Red-Light Technology</h3>
                <p className="text-sm text-muted-foreground">
                  Supports joint mobility
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Battery className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Wireless & Portable</h3>
                <p className="text-sm text-muted-foreground">
                  3000mAh battery for freedom
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Below-fold content loaded lazily for better TTI */}
      <Suspense fallback={<div className="py-16 text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div></div>}>
        <IndexBelowFold
          mainProduct={mainProduct}
          loading={loading}
          newsletterEmail={newsletterEmail}
          setNewsletterEmail={setNewsletterEmail}
          isSubscribing={isSubscribing}
          handleSubscribe={handleSubscribe}
        />
      </Suspense>
      
      <Footer />
      </div>
    </>
  );
}
