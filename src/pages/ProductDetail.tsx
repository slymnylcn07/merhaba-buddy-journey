import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { 
  Check, 
  Truck, 
  Shield, 
  ArrowLeft,
  Star,
  Package,
  Clock
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import productMain from "@/assets/product-main.jpg";
import productBenefits from "@/assets/product-benefits.jpg";
import productSpecs from "@/assets/product-specs.jpg";
import productInner from "@/assets/product-inner.jpg";
import productFeatures from "@/assets/product-features.jpg";
import productUsage from "@/assets/product-usage.jpg";

const ProductDetail = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedBundle, setSelectedBundle] = useState(1);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const products = await getProducts(10);
        const found = products.find(p => p.node.handle === handle);
        if (found) {
          setProduct(found);
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [handle]);

  const handleAddToCart = () => {
    if (!product) return;
    
    const variant = product.node.variants.edges[0].node;
    const cartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: selectedBundle,
      selectedOptions: variant.selectedOptions
    };
    
    addItem(cartItem);
    toast.success("Added to cart!", {
      description: `${selectedBundle}x ${product.node.title}`,
      position: "top-center",
    });
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
  
  const bundles = [
    { qty: 1, priceEach: 149, original: 298, discount: 50, tag: null },
    { qty: 2, priceEach: 134.1, original: 596, discount: 55, tag: "MOST POPULAR" },
    { qty: 3, priceEach: 128.14, original: 894, discount: 57, tag: null },
    { qty: 4, priceEach: 119.2, original: 1192, discount: 60, tag: "BEST OFFER" },
  ];
  
  const currentBundle = bundles.find(b => b.qty === selectedBundle) || bundles[0];
  const totalPrice = currentBundle.priceEach * currentBundle.qty;
  const discount = currentBundle.discount;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Scarcity Banner */}
      <div className="bg-destructive text-destructive-foreground py-3 sticky top-0 z-40">
        <div className="container px-4 text-center">
          <p className="font-semibold text-sm md:text-base">🔥 LIMITED TIME OFFER - SAVE {discount}% TODAY ONLY!</p>
        </div>
      </div>

      <div className="container px-4 py-6 md:py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        {/* Top Section - Premium Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-muted aspect-square">
              {images[selectedImage] && (
                <img
                  src={images[selectedImage].node.url}
                  alt={product.node.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute top-4 right-4">
                <Badge className="bg-destructive text-destructive-foreground text-base px-4 py-2">
                  {discount}% OFF
                </Badge>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.slice(0, 4).map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-primary shadow-lg' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={image.node.url}
                      alt={`View ${idx + 1}`}
                      className="w-full aspect-square object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Rating & Social Proof */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-sm font-semibold">4.9 (2,137 Reviews)</span>
              <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20">
                Happy Customers
              </Badge>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{product.node.title}</h1>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  #1 Best-Selling
                </Badge>
                <Badge variant="outline">
                  <Clock className="w-3 h-3 mr-1" />
                  2,500+ sold this week
                </Badge>
              </div>
            </div>

            {/* Bundle & Save */}
            <div className="space-y-2">
              <h3 className="font-bold text-base">BUNDLE & SAVE</h3>
              <div className="space-y-2">
                {bundles.map((bundle) => (
                  <button
                    key={bundle.qty}
                    onClick={() => setSelectedBundle(bundle.qty)}
                    className={`w-full text-left p-2.5 rounded-lg border-2 transition-all relative ${
                      selectedBundle === bundle.qty
                        ? 'border-primary bg-sky-50 dark:bg-sky-950/20'
                        : 'border-border bg-sky-50/50 dark:bg-sky-950/10 hover:border-primary/50'
                    }`}
                  >
                    {bundle.tag && (
                      <div className="absolute -top-1.5 right-3">
                        <Badge className="bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0">
                          {bundle.tag}
                        </Badge>
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          selectedBundle === bundle.qty ? 'border-primary' : 'border-muted-foreground'
                        }`}>
                          {selectedBundle === bundle.qty && (
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-sm">
                            {bundle.qty}x Knee Massager{bundle.qty > 1 ? 's' : ''}
                          </div>
                          {bundle.qty > 1 && (
                            <div className="text-[11px] text-muted-foreground">${bundle.priceEach.toFixed(2)} each</div>
                          )}
                          <div className="text-[11px] text-primary font-medium">You Saved {bundle.discount}% + Ebook</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-base">${(bundle.priceEach * bundle.qty).toFixed(2)}</div>
                        <div className="text-[11px] text-muted-foreground line-through">${bundle.original.toFixed(2)}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Instant Pain Relief</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Heat + Vibration + Red Light</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">3000mAh Wireless Battery</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Helps Circulation</p>
                </div>
              </div>
            </div>


            {/* CTA */}
            <Button 
              onClick={handleAddToCart}
              size="lg"
              className="w-full text-lg h-14 font-bold"
            >
              <Package className="w-5 h-5 mr-2" />
              ADD TO CART - ${totalPrice.toFixed(2)}
            </Button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck className="w-8 h-8 text-primary" />
                <p className="text-xs font-medium">Free Shipping</p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Shield className="w-8 h-8 text-primary" />
                <p className="text-xs font-medium">30-Day Guarantee</p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Check className="w-8 h-8 text-primary" />
                <p className="text-xs font-medium">Secure Checkout</p>
              </div>
            </div>
          </div>
        </div>

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
              <img
                src={productBenefits}
                alt="Knee pain relief targets"
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Trusted by Wellness Communities */}
        <section className="py-12 bg-muted/40 -mx-4 px-4 mb-12">
          <div className="container px-8">
            <h3 className="text-2xl font-bold text-center mb-3">Trusted by Wellness Communities</h3>
            <p className="text-center text-muted-foreground mb-8">
              Recommended by athletes, trainers and mobility experts.
            </p>
            <div className="overflow-hidden">
              <div className="flex gap-12 items-center justify-center animate-scroll">
                <div className="flex-shrink-0 w-10 h-10 bg-foreground/10 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-foreground/60">W</span>
                </div>
                <div className="flex-shrink-0 w-10 h-10 bg-foreground/10 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-foreground/60">F</span>
                </div>
                <div className="flex-shrink-0 w-10 h-10 bg-foreground/10 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-foreground/60">H</span>
                </div>
                <div className="flex-shrink-0 w-10 h-10 bg-foreground/10 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-foreground/60">M</span>
                </div>
                <div className="flex-shrink-0 w-10 h-10 bg-foreground/10 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-foreground/60">T</span>
                </div>
                <div className="flex-shrink-0 w-10 h-10 bg-foreground/10 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-foreground/60">A</span>
                </div>
                <div className="flex-shrink-0 w-10 h-10 bg-foreground/10 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-foreground/60">P</span>
                </div>
                <div className="flex-shrink-0 w-10 h-10 bg-foreground/10 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-foreground/60">R</span>
                </div>
                <div className="flex-shrink-0 w-10 h-10 bg-foreground/10 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-foreground/60">K</span>
                </div>
                <div className="flex-shrink-0 w-10 h-10 bg-foreground/10 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-foreground/60">N</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product in Use */}
        <section className="py-12 mb-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={productUsage}
                  alt="Product in use"
                  className="w-full h-auto"
                />
              </div>
              <div className="space-y-6">
                <Badge>HOW IT WORKS</Badge>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Advanced <span className="text-primary">Heat Therapy</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Triple therapy combines infrared heat, vibration massage, and red light technology to penetrate deep into your knee joint, providing instant relief and promoting healing.
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
              <img
                src={productFeatures}
                alt="Product features"
                className="w-full h-auto"
              />
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
                  Clinical-grade red light therapy penetrates deep into tissue to promote healing, reduce pain, and accelerate recovery.
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
                <img
                  src={productInner}
                  alt="Red light technology"
                  className="w-full h-auto"
                />
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
              <img
                src={productSpecs}
                alt="Product specifications"
                className="w-full h-auto"
              />
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
                <AccordionTrigger className="text-left font-semibold">
                  How long does the battery last?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  The 3000mAh battery provides 2-3 hours of continuous use. Charging takes 2-3 hours via the included USB-C cable.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  Is it safe for daily use?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! We recommend 15-30 minute sessions, 1-3 times daily. Consult your doctor if you have any medical conditions.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  Will it fit all leg sizes?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, the adjustable straps accommodate all leg sizes comfortably. The design is universal and fits most users.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  What's included in the box?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  You'll receive the knee massager, USB-C charging cable, user manual, and date line.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
              <Button 
                onClick={handleAddToCart}
                size="lg"
                className="text-lg px-8 h-14"
              >
                <Package className="w-5 h-5 mr-2" />
                Add to Cart - ${totalPrice.toFixed(2)}
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">30-Day Money-Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Secure Checkout</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
