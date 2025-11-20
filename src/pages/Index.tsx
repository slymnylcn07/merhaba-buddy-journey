import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useCartStore } from "@/stores/cartStore";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { Check, Flame, Zap, Activity, Battery, Shield, Truck, Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import productPainRelief from "@/assets/product-pain-relief.jpg";
import productTemperature from "@/assets/product-temperature.jpg";
import productMain from "@/assets/product-main.jpg";
import productVibration from "@/assets/product-vibration.jpg";
import productHowItWorks from "@/assets/product-how-it-works.jpg";
import laserTherapy from "@/assets/laser-therapy.png";
import heatActivation from "@/assets/heat-activation.jpg";
import heroBannerDesktop from "@/assets/hero-banner-desktop.png";
import heroBannerMobile from "@/assets/hero-banner-mobile.png";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ScrollingBanner from "@/components/ScrollingBanner";

export default function Index() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

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
    fetchProducts();
  }, []);

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
    <div className="min-h-screen">
      <Header />
      {/* Hero Banner */}
      {mainProduct ? (
        <Link to={`/product/${mainProduct.node.handle}`} className="block">
          <section className="relative w-full overflow-hidden cursor-pointer hover:opacity-95 transition-opacity">
            {/* Desktop Hero Banner */}
            <img 
              src={heroBannerDesktop} 
              alt="FlexiKnee Smart Heated Knee Massager" 
              className="hidden md:block w-full h-auto object-cover"
            />
            {/* Mobile Hero Banner */}
            <img 
              src={heroBannerMobile} 
              alt="FlexiKnee Smart Heated Knee Massager" 
              className="block md:hidden w-full h-auto object-cover"
            />
          </section>
        </Link>
      ) : (
        <section className="relative w-full overflow-hidden">
          <img 
            src={heroBannerDesktop} 
            alt="FlexiKnee Smart Heated Knee Massager" 
            className="hidden md:block w-full h-auto object-cover"
          />
          <img 
            src={heroBannerMobile} 
            alt="FlexiKnee Smart Heated Knee Massager" 
            className="block md:hidden w-full h-auto object-cover"
          />
        </section>
      )}

      {/* Scrolling Banner */}
      <ScrollingBanner />

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

      {/* How It Works - Collection Focus Carousel */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent>
              <CarouselItem>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <img 
                        src={productHowItWorks} 
                        alt="Step 1: Strap the Device"
                        className="rounded-lg w-full h-auto object-cover"
                      />
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-primary">Step 1: Strap the Device</h3>
                        <p className="text-muted-foreground">
                          Secure the FlexiKnee™ massager around your knee using the adjustable 
                          Velcro straps for a comfortable, customized fit.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <img 
                        src={productTemperature} 
                        alt="Step 2: Activate Red-Light Therapy"
                        className="rounded-lg w-full h-auto object-cover"
                      />
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-primary">Step 2: Activate Red-Light Therapy</h3>
                        <p className="text-muted-foreground">
                          18 infrared LEDs penetrate deep to support joint mobility and 
                          reduce inflammation at the cellular level.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <img 
                        src={heatActivation} 
                        alt="Step 3: Heat Activation"
                        className="rounded-lg w-full h-auto object-cover"
                      />
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-primary">Step 3: Heat Activation</h3>
                        <p className="text-muted-foreground">
                          Choose from three heat levels to improve circulation and 
                          relieve stiffness deep in the knee joint.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <img 
                        src={productMain} 
                        alt="Step 4: Vibration Modes" 
                        className="rounded-lg w-full h-auto object-cover"
                      />
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-primary">Step 4: Vibration Modes</h3>
                        <p className="text-muted-foreground">
                          Select from three vibration modes to loosen tight muscles 
                          and reduce tension around the knee for enhanced mobility.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Trusted by 50,000+ Customers</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "I felt relief in the first 10 minutes. Amazing product."
                </p>
                <p className="font-semibold">— John M.</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Perfect for stiffness and mobility. I use it every evening."
                </p>
                <p className="font-semibold">— Sara P.</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Love the heat + vibration combo. Worth every dollar."
                </p>
                <p className="font-semibold">— Brian K.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Featured Product Section */}
      <section id="features" className="py-16">
        <div className="container px-4">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          ) : mainProduct ? (
            <Link to={`/product/${mainProduct.node.handle}`} className="block cursor-pointer group">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors">{mainProduct.node.title}</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Advanced 3-in-1 therapy engineered for pain-free mobility.
                </p>
              </div>
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  {/* Left - Product Images */}
                  <div>
                    <Carousel className="mb-8">
                      <CarouselContent>
                        <CarouselItem>
                          <div className="rounded-2xl overflow-hidden shadow-2xl">
                            <img src={productMain} alt="FlexiKnee Main" className="w-full h-auto" />
                          </div>
                        </CarouselItem>
                        <CarouselItem>
                          <div className="rounded-2xl overflow-hidden shadow-2xl">
                            <img src={productPainRelief} alt="FlexiKnee Pain Relief" className="w-full h-auto" />
                          </div>
                        </CarouselItem>
                        <CarouselItem>
                          <div className="rounded-2xl overflow-hidden shadow-2xl">
                            <img src={productTemperature} alt="FlexiKnee Temperature Control" className="w-full h-auto" />
                          </div>
                        </CarouselItem>
                        <CarouselItem>
                          <div className="rounded-2xl overflow-hidden shadow-2xl">
                            <img src={productVibration} alt="FlexiKnee Vibration" className="w-full h-auto" />
                          </div>
                        </CarouselItem>
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </div>

                  {/* Right - Product Info */}
                  <div>
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                          ))}
                        </div>
                        <span className="text-sm font-medium">(4,800+ Reviews)</span>
                      </div>
                      <h3 className="text-3xl font-bold mb-4">{mainProduct.node.title}</h3>
                      <p className="text-lg text-muted-foreground mb-6">
                        {mainProduct.node.description}
                      </p>
                    </div>

                    <div className="flex flex-col gap-4">
                      <Button size="lg" className="text-lg px-8 w-full">
                        <Truck className="mr-2 h-5 w-5" />
                        Shop Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products available. Please connect your Shopify store.</p>
            </div>
          )}
        </div>
      </section>

      {/* Image with Text - 3-in-1 Technology */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                3-in-1 Pain Relief Technology
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Heat + Vibration + Red-Light work together to relax muscles, reduce stiffness and improve mobility.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Targeted Heat Therapy</h4>
                    <p className="text-sm text-muted-foreground">Penetrates deep to relieve stiffness</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Smart Vibration</h4>
                    <p className="text-sm text-muted-foreground">Loosens tight muscles instantly</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Red-Light Recovery</h4>
                    <p className="text-sm text-muted-foreground">Supports long-term joint health</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src={laserTherapy} alt="Laser Irradiation Technology" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Image with Highlights */}
      <section className="py-16">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Smart Features</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src={productVibration} alt="Product Usage" className="w-full h-auto" />
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-muted/50 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Touch Screen Panel</h4>
                  <p className="text-muted-foreground">Easy control at your fingertips</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-muted/50 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Infrared LED Ring</h4>
                  <p className="text-muted-foreground">18 therapeutic LEDs</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-muted/50 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Adjustable Velcro Straps</h4>
                  <p className="text-muted-foreground">Perfect fit for all knee sizes</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-muted/50 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Battery className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">USB-C Charging</h4>
                  <p className="text-muted-foreground">Fast and convenient power</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Better Knee Health Starts Here</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Flame className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-3">Why Heat Therapy Works for Knee Pain</h3>
                <p className="text-muted-foreground text-sm">
                  Discover how targeted heat therapy can improve circulation and reduce stiffness.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-3">Benefits of Red-Light Therapy</h3>
                <p className="text-muted-foreground text-sm">
                  Learn about the science behind infrared LEDs and joint recovery.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-3">Mobility Tips for Joint Recovery</h3>
                <p className="text-muted-foreground text-sm">
                  Simple exercises and habits to support long-term knee health.
                </p>
              </CardContent>
            </Card>
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
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-2 border-border focus:border-primary focus:outline-none"
              />
              <Button size="lg" className="px-8">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-muted/30">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-card px-6 rounded-lg border-2">
                <AccordionTrigger className="text-left font-semibold">
                  How does FlexiKnee™ help with knee pain?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  FlexiKnee™ combines three therapeutic technologies: heat therapy improves circulation and reduces stiffness, vibration massage loosens tight muscles, and red-light therapy supports cellular recovery and joint health.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-card px-6 rounded-lg border-2">
                <AccordionTrigger className="text-left font-semibold">
                  Is it safe to use every day?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, FlexiKnee™ is designed for daily use. We recommend 15-30 minute sessions, 1-2 times per day for optimal results.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card px-6 rounded-lg border-2">
                <AccordionTrigger className="text-left font-semibold">
                  How long does the battery last?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  The 3000mAh rechargeable battery provides approximately 3-5 hours of continuous use, depending on heat and vibration settings.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-card px-6 rounded-lg border-2">
                <AccordionTrigger className="text-left font-semibold">
                  What's your return policy?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We offer a 30-day money-back guarantee. If you're not completely satisfied, return it for a full refund, no questions asked.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-card px-6 rounded-lg border-2">
                <AccordionTrigger className="text-left font-semibold">
                  Will it fit my knee size?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! FlexiKnee™ features adjustable Velcro straps that comfortably fit all knee sizes, from petite to extra-large.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Your Pain-Free Journey Today
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands who have found relief with FlexiKnee™
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-12" onClick={handleAddToCart}>
            Shop FlexiKnee™ Now
          </Button>
          <div className="flex justify-center gap-8 mt-8 text-sm opacity-90">
            <span>✓ Free Shipping</span>
            <span>✓ 30-Day Guarantee</span>
            <span>✓ Secure Checkout</span>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
