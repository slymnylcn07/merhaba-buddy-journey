import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container relative px-4 py-20 md:py-32">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="space-y-6">
                <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20">
                  <Clock className="w-3 h-3 mr-1" />
                  LIMITED TIME: SAVE UP TO 48%
                </Badge>
                
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Advanced Knee Pain Relief
                  <span className="text-primary"> At Home</span>
                </h1>
                
                <p className="text-lg text-muted-foreground">
                  Wireless heated knee massager with red light therapy, vibration massage, and 3 heat levels.
                </p>

                {mainProduct && (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="text-lg px-8"
                      onClick={() => handleAddToCart(mainProduct)}
                    >
                      Add to Cart - ${parseFloat(mainProduct.node.priceRange.minVariantPrice.amount).toFixed(2)}
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      asChild
                    >
                      <Link to={`/product/${mainProduct.node.handle}`}>
                        Learn More
                      </Link>
                    </Button>
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
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
