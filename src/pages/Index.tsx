import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Zap, 
  Thermometer, 
  Waves, 
  Radio,
  Heart,
  Shield,
  Truck,
  Check,
  Star,
  Clock,
  Users,
  Award,
  Target,
  TrendingUp,
  Package
} from "lucide-react";
import { useEffect, useState } from "react";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Index = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await getProducts(10);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0].node;
    const cartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions
    };
    
    addItem(cartItem);
    toast.success("Added to cart!", {
      description: product.node.title,
      position: "top-center",
    });
  };

  const mainProduct = products[0];
  const price = mainProduct ? parseFloat(mainProduct.node.priceRange.minVariantPrice.amount) : 89.99;
  const originalPrice = price * 1.54;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25"></div>
        <div className="container relative px-4 py-20 md:py-32">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    <Clock className="w-3 h-3 mr-1" />
                    LIMITED TIME: SAVE UP TO 35%
                  </Badge>
                  <Badge variant="secondary" className="border-primary/20">
                    <Star className="w-3 h-3 mr-1 fill-primary text-primary" />
                    Trusted by Thousands
                  </Badge>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Say Goodbye to
                  <span className="text-primary"> Knee Pain</span>
                </h1>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Professional-grade wireless knee massager with red light therapy, heat treatment, and vibration massage.
                </p>

                <div className="grid grid-cols-2 gap-3 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium">Wireless</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium">3000mAh</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium">Red Light</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium">3 Heat Levels</span>
                  </div>
                </div>

                {mainProduct && (
                  <div className="space-y-4">
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-bold text-primary">
                        ${price.toFixed(2)}
                      </span>
                      <span className="text-2xl text-muted-foreground line-through">
                        ${originalPrice.toFixed(2)}
                      </span>
                      <Badge className="bg-green-500 hover:bg-green-600">SAVE 35%</Badge>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        size="lg" 
                        className="text-lg px-8"
                        onClick={() => handleAddToCart(mainProduct)}
                      >
                        Add to Cart - ${price.toFixed(2)}
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline"
                        asChild
                      >
                        <Link to={`/product/${mainProduct.node.handle}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                {mainProduct?.node.images.edges[0] && (
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={mainProduct.node.images.edges[0].node.url}
                      alt={mainProduct.node.title}
                      className="w-full h-auto"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-destructive text-lg px-4 py-2">
                        35% OFF
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Strip */}
      <section className="border-y bg-muted/30 py-8">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center gap-2">
              <Truck className="w-8 h-8 text-primary" />
              <div>
                <p className="font-semibold text-sm">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On all orders</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Shield className="w-8 h-8 text-primary" />
              <div>
                <p className="font-semibold text-sm">30-Day Guarantee</p>
                <p className="text-xs text-muted-foreground">Money back</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Heart className="w-8 h-8 text-primary" />
              <div>
                <p className="font-semibold text-sm">Pain Relief</p>
                <p className="text-xs text-muted-foreground">Proven results</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Award className="w-8 h-8 text-primary" />
              <div>
                <p className="font-semibold text-sm">Premium Quality</p>
                <p className="text-xs text-muted-foreground">Certified</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="container px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">TECHNOLOGY</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              4 Therapies in <span className="text-primary">One Device</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="p-6 hover:shadow-xl transition-all">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Thermometer className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Heat Therapy</h3>
              <p className="text-sm text-muted-foreground mb-3">
                3 heat levels for deep tissue warming
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Waves className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Vibration</h3>
              <p className="text-sm text-muted-foreground mb-3">
                3 modes for muscle relaxation
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Radio className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Red Light</h3>
              <p className="text-sm text-muted-foreground mb-3">
                18 LED points for healing
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Wireless</h3>
              <p className="text-sm text-muted-foreground mb-3">
                3000mAh portable battery
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4">QUESTIONS?</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                FAQ
              </h2>
            </div>

            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>How long does the battery last?</AccordionTrigger>
                <AccordionContent>
                  2-3 hours of use. Charging takes 2-3 hours via USB-C.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it safe for daily use?</AccordionTrigger>
                <AccordionContent>
                  Yes, 15-30 minute sessions, 1-3 times daily.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Will it fit all leg sizes?</AccordionTrigger>
                <AccordionContent>
                  Yes, adjustable straps fit all sizes.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto mb-8">
            <div>
              <h3 className="font-bold mb-4">KneeRelief</h3>
              <p className="text-sm text-muted-foreground">
                Professional knee pain relief
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About</li>
                <li>Contact</li>
                <li>Shipping</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>FAQ</li>
                <li>Returns</li>
                <li>Warranty</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Refunds</li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 KneeRelief. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
