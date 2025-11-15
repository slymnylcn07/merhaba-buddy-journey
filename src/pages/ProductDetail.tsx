import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { 
  Check, 
  Truck, 
  Shield, 
  ArrowLeft,
  Thermometer,
  Waves,
  Radio,
  Zap,
  Package
} from "lucide-react";

const ProductDetail = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
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
      quantity: 1,
      selectedOptions: variant.selectedOptions
    };
    
    addItem(cartItem);
    toast.success("Added to cart!", {
      description: product.node.title,
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
  const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
  const originalPrice = price * 1.54; // Showing ~35% discount

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Scarcity Banner */}
      <div className="bg-destructive text-destructive-foreground py-3">
        <div className="container px-4 text-center">
          <p className="font-semibold">🔥 LIMITED TIME OFFER - SAVE 35% TODAY ONLY!</p>
        </div>
      </div>

      <div className="container px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
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
              <Badge className="absolute top-4 right-4 bg-destructive">
                SAVE 35%
              </Badge>
            </div>
            
            <div className="grid grid-cols-6 gap-2">
              {images.slice(0, 6).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx 
                      ? 'border-primary ring-2 ring-primary/20' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <img
                    src={img.node.url}
                    alt={`View ${idx + 1}`}
                    className="w-full h-full object-cover aspect-square"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">Best Seller</Badge>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                  ⭐ 4.9/5.0 (2,123 Reviews)
                </Badge>
              </div>
              <h1 className="text-4xl font-bold mb-4">{product.node.title}</h1>
              
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-primary">
                  ${price.toFixed(2)}
                </span>
                <span className="text-2xl text-muted-foreground line-through">
                  ${originalPrice.toFixed(2)}
                </span>
                <Badge className="bg-green-500 hover:bg-green-600">20% OFF</Badge>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed">
                See noticeably reduced knee pain in just hours with our advanced formula featuring red light therapy, heat treatment, and vibration massage.
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span>Instant Pain Relief</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span>Wireless & Portable</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span>Deep Hydration</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span>3 Heat Levels</span>
              </div>
            </div>

            {/* Quantity & Purchase */}
            <Card className="p-6 bg-muted/30">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Buy 1</p>
                    <p className="text-sm text-muted-foreground">(1 Massager)</p>
                  </div>
                  <span className="text-2xl font-bold">${price.toFixed(2)}</span>
                </div>

                <Button 
                  size="lg" 
                  className="w-full text-lg"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>

                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Truck className="w-4 h-4 text-primary" />
                    <span>Free Delivery</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-primary" />
                    <span>30-Day Money-Back</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-muted/30 rounded-lg">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-background mx-auto mb-2 flex items-center justify-center">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs font-medium">FREE SHIPPING</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-background mx-auto mb-2 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs font-medium">SECURE CHECKOUT</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-background mx-auto mb-2 flex items-center justify-center">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs font-medium">MONEY BACK</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="max-w-6xl mx-auto mt-16">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="usage">How to Use</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Thermometer className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Heat Therapy</h3>
                      <p className="text-muted-foreground">
                        3 adjustable heat levels provide soothing warmth that penetrates deep into tissues, improving blood circulation and reducing stiffness.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Waves className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Vibration Massage</h3>
                      <p className="text-muted-foreground">
                        3 vibration modes deliver targeted massage to relieve muscle tension and promote relaxation throughout your knee area.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Radio className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Red Light Therapy</h3>
                      <p className="text-muted-foreground">
                        18 red LED points deliver infrared therapy that promotes cellular regeneration and accelerates natural healing processes.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Wireless Design</h3>
                      <p className="text-muted-foreground">
                        Powered by a 3000mAh rechargeable battery for complete freedom of movement. Use it anywhere, anytime.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="specs" className="mt-8">
              <Card className="p-8">
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                  <div className="flex justify-between border-b pb-3">
                    <span className="font-semibold">Model</span>
                    <span className="text-muted-foreground">ST-1101A</span>
                  </div>
                  <div className="flex justify-between border-b pb-3">
                    <span className="font-semibold">Weight</span>
                    <span className="text-muted-foreground">0.977kg</span>
                  </div>
                  <div className="flex justify-between border-b pb-3">
                    <span className="font-semibold">Package Size</span>
                    <span className="text-muted-foreground">276×162×205MM</span>
                  </div>
                  <div className="flex justify-between border-b pb-3">
                    <span className="font-semibold">Rated Voltage</span>
                    <span className="text-muted-foreground">3.7V</span>
                  </div>
                  <div className="flex justify-between border-b pb-3">
                    <span className="font-semibold">Input</span>
                    <span className="text-muted-foreground">DC5V--2A</span>
                  </div>
                  <div className="flex justify-between border-b pb-3">
                    <span className="font-semibold">Battery Capacity</span>
                    <span className="text-muted-foreground">3000mAh</span>
                  </div>
                  <div className="flex justify-between border-b pb-3">
                    <span className="font-semibold">Charging Port</span>
                    <span className="text-muted-foreground">USB-C</span>
                  </div>
                  <div className="flex justify-between border-b pb-3">
                    <span className="font-semibold">Heat Levels</span>
                    <span className="text-muted-foreground">3 (Low, Medium, High)</span>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="usage" className="mt-8">
              <Card className="p-8">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Charge the Device</h3>
                      <p className="text-muted-foreground">
                        Fully charge your knee massager using the included USB-C cable before first use. Charging takes 2-3 hours.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Secure the Straps</h3>
                      <p className="text-muted-foreground">
                        Place the massager on your knee and adjust the straps for a comfortable, secure fit. The adjustable design fits all leg sizes.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Select Your Mode</h3>
                      <p className="text-muted-foreground">
                        Use the touch screen control panel to select your preferred heat level and vibration mode. Start with lower settings and adjust as needed.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Relax & Enjoy</h3>
                      <p className="text-muted-foreground">
                        Enjoy 15-30 minute sessions, 1-3 times daily. The automatic shut-off ensures safe operation. Clean after each use with a soft, damp cloth.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
