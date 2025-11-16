import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { 
  Check, 
  Truck, 
  Shield, 
  ArrowLeft,
  Star,
  Package,
  Clock,
  BookOpen,
  Box
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import productMain from "@/assets/product-main.jpg";
import productHowItWorks from "@/assets/product-how-it-works.jpg";
import productTemperature from "@/assets/product-temperature.jpg";
import productPainRelief from "@/assets/product-pain-relief.jpg";
import productControl from "@/assets/product-control.jpg";
import productVibration from "@/assets/product-vibration.jpg";
import productSpecs from "@/assets/product-specs.jpg";
import giftEbookIcon from "@/assets/gift-ebook-icon.png";
import giftShippingIcon from "@/assets/gift-shipping-icon.png";
import { VideoReviews } from "@/components/VideoReviews";

const ProductDetail = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedBundle, setSelectedBundle] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const reviewsPerPage = 10;
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

  // All reviews with dates (most recent first)
  const allReviews = [
    { name: "Emma W.", rating: 5, text: "This is the best investment I've made for my knee health. The heat therapy combined with vibration is incredibly soothing.", date: "2025-10-15" },
    { name: "James P.", rating: 5, text: "After just one week, I noticed a significant reduction in my chronic knee pain. The wireless design is perfect!", date: "2025-10-14" },
    { name: "Lisa M.", rating: 4, text: "Great product overall. The heat levels are perfect and it's very comfortable to wear. Battery could last a bit longer though.", date: "2025-10-13" },
    { name: "Robert K.", rating: 5, text: "My arthritis pain has improved dramatically. I use it twice daily and the results are amazing.", date: "2025-10-12" },
    { name: "Amanda S.", rating: 5, text: "So easy to use and the relief is instant! Love that it's wireless so I can move around.", date: "2025-10-11" },
    { name: "Chris D.", rating: 4, text: "Works well for post-workout recovery. The red light feature is a nice bonus. Would recommend!", date: "2025-10-10" },
    { name: "Michelle T.", rating: 5, text: "I've tried many knee massagers and this is by far the best. The quality is exceptional.", date: "2025-10-09" },
    { name: "David H.", rating: 5, text: "Perfect for my elderly mother. Easy controls and she says it helps her knee pain tremendously.", date: "2025-10-08" },
    { name: "Jennifer B.", rating: 5, text: "The adjustable heat settings are great. I can customize it based on how I'm feeling each day.", date: "2025-10-07" },
    { name: "Thomas R.", rating: 5, text: "After knee surgery, this has been essential for my recovery. Highly recommend to anyone post-op.", date: "2025-10-06" },
    { name: "Sarah M.", rating: 5, text: "After years of knee pain from running, this massager has been a game-changer. The heat and vibration combination provides instant relief.", date: "2025-10-05" },
    { name: "Michael R.", rating: 5, text: "I was skeptical at first, but FlexiKnee™ has exceeded my expectations. The red light therapy feature is incredible.", date: "2025-10-04" },
    { name: "Jennifer L.", rating: 5, text: "Love how portable this is! I can use it while watching TV or even at work. The wireless design and long battery life make it so convenient.", date: "2025-10-03" },
    { name: "David K.", rating: 5, text: "As a construction worker, my knees take a beating daily. This massager helps me recover faster and keeps me pain-free.", date: "2025-10-02" },
    { name: "Patricia H.", rating: 5, text: "I bought one for myself and loved it so much I ordered two more for my parents. The adjustable straps fit comfortably.", date: "2025-10-01" },
    { name: "Robert T.", rating: 5, text: "After knee surgery, my physical therapist recommended heat therapy. FlexiKnee™ has been perfect for my recovery.", date: "2025-09-30" },
    { name: "Karen G.", rating: 5, text: "The vibration massage is so relaxing. I use it every evening and sleep so much better now.", date: "2025-09-29" },
    { name: "Daniel F.", rating: 5, text: "Great value for the price. Works better than my expensive physical therapy sessions!", date: "2025-09-28" },
    { name: "Nancy L.", rating: 5, text: "My doctor was impressed with my progress. This device really helps with inflammation and stiffness.", date: "2025-09-27" },
    { name: "Brian C.", rating: 5, text: "I use it before and after my gym sessions. It helps prevent soreness and keeps my knees healthy.", date: "2025-09-26" },
    { name: "Rachel A.", rating: 5, text: "The red light therapy is amazing! I can feel the warmth penetrating deep into my knee joint.", date: "2025-09-25" },
    { name: "Steven W.", rating: 5, text: "Finally found something that actually works for my knee pain. Worth every penny!", date: "2025-09-24" },
    { name: "Linda P.", rating: 5, text: "Very comfortable to wear and the controls are intuitive. My husband wants one now too!", date: "2025-09-23" },
    { name: "George M.", rating: 5, text: "Excellent for arthritis pain. The heat settings are perfect and it's so easy to use.", date: "2025-09-22" },
    { name: "Carol S.", rating: 5, text: "I'm a nurse on my feet all day. This massager is a lifesaver for my tired, aching knees.", date: "2025-09-21" },
    { name: "Mark J.", rating: 5, text: "The build quality is impressive. Feels premium and durable. Great investment!", date: "2025-09-20" },
    { name: "Susan E.", rating: 5, text: "Helps so much with my osteoarthritis. I wish I had found this product sooner!", date: "2025-09-19" },
    { name: "Kevin B.", rating: 5, text: "Perfect for post-marathon recovery. My knees feel rejuvenated after each session.", date: "2025-09-18" },
    { name: "Diane R.", rating: 5, text: "My physical therapist recommended this and I'm so glad she did. It's been wonderful for my recovery.", date: "2025-09-17" },
    { name: "Paul N.", rating: 5, text: "The battery life is impressive. I can use it for several sessions before needing to recharge.", date: "2025-09-16" },
    { name: "Helen K.", rating: 5, text: "So much better than ice packs or heating pads. This actually targets the pain effectively.", date: "2025-09-15" },
    { name: "Richard L.", rating: 5, text: "Great for chronic pain management. I've reduced my pain medication since using this.", date: "2025-09-14" },
    { name: "Maria G.", rating: 5, text: "The combination of heat, vibration, and red light is perfect. I feel relief within minutes.", date: "2025-09-13" },
    { name: "Joseph D.", rating: 5, text: "Very well made product. The straps are comfortable and it stays in place during use.", date: "2025-09-12" },
    { name: "Barbara H.", rating: 5, text: "I use it while reading or watching TV. It's so convenient and really works!", date: "2025-09-11" },
    { name: "Frank W.", rating: 5, text: "Best knee massager I've ever used. The wireless feature makes it so much more practical.", date: "2025-09-10" },
    { name: "Dorothy M.", rating: 5, text: "Helps with my knee stiffness every morning. I can move around so much easier now.", date: "2025-09-09" },
    { name: "Anthony S.", rating: 5, text: "The heat penetrates deeply and the vibration is just right. Not too strong, not too weak.", date: "2025-09-08" },
    { name: "Betty T.", rating: 5, text: "I'm very satisfied with this purchase. It's exactly what I needed for my knee problems.", date: "2025-09-07" },
    { name: "Charles R.", rating: 5, text: "The red light therapy feature sets this apart from other massagers. Really effective!", date: "2025-09-06" },
    { name: "Margaret F.", rating: 5, text: "Easy to clean and maintain. The quality is outstanding for the price.", date: "2025-09-05" },
    { name: "William C.", rating: 5, text: "I've recommended this to all my friends with knee pain. It's that good!", date: "2025-09-04" },
    { name: "Elizabeth B.", rating: 5, text: "The adjustable settings let me customize the therapy exactly how I need it.", date: "2025-09-03" },
    { name: "Jason V.", rating: 5, text: "Perfect for athletes. Helps with recovery and prevents injury. Love it!", date: "2025-09-02" },
    { name: "Ruth L.", rating: 5, text: "My knee feels so much better after using this daily. The pain has decreased significantly.", date: "2025-09-01" },
    { name: "Gary P.", rating: 5, text: "Great product! The heat therapy is so soothing and helps me relax after a long day.", date: "2025-08-31" },
    { name: "Sharon K.", rating: 5, text: "I love how portable it is. I take it with me when traveling and it's perfect!", date: "2025-08-30" },
    { name: "Raymond H.", rating: 5, text: "The vibration massage combined with heat is incredibly therapeutic. Highly recommend!", date: "2025-08-29" },
    { name: "Cynthia D.", rating: 5, text: "This has made such a difference in my daily life. I can walk without pain now!", date: "2025-08-28" },
    { name: "Gregory M.", rating: 5, text: "Excellent customer service and an even better product. Very happy with my purchase!", date: "2025-08-27" },
  ];

  const totalPages = Math.ceil(allReviews.length / reviewsPerPage);
  const displayedReviews = showAllReviews 
    ? allReviews.slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage)
    : allReviews.slice(0, 6);
  const totalPrice = currentBundle.priceEach * currentBundle.qty;
  const discount = currentBundle.discount;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Scarcity Banner */}
      <div className="bg-destructive text-destructive-foreground py-3 sticky top-0 z-40">
        <div className="container px-4 text-center">
          <p className="font-semibold text-sm md:text-base">🔥 LIMITED TIME OFFER — 50% OFF TODAY ONLY</p>
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
            <button 
              onClick={() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex flex-wrap items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-1">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: 'inset(0 30% 0 0)' }} />
              </div>
              <span className="text-sm font-semibold">4.7 (1,128 Reviews)</span>
              <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20">
                Happy Customers
              </Badge>
            </button>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3 text-[#111111] dark:text-white">FlexiKnee™ Smart Heated Knee Massager</h1>
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

            {/* Key Benefits - Above Bundle */}
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Relieves knee pain with heat + red light + vibration</p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Easy 3-level control for personalized comfort</p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Wireless, portable design for use anywhere</p>
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


            {/* CTA */}
            <Button 
              onClick={handleAddToCart}
              size="lg"
              className="w-full text-lg h-14 font-bold"
            >
              <Package className="w-5 h-5 mr-2" />
              ADD TO CART - ${totalPrice.toFixed(2)}
            </Button>

            {/* Free Gifts Section */}
            <div className="space-y-3 py-4">
              <h3 className="font-bold text-center text-sm tracking-wide">
                FREE GIFTS WITH YOUR FIRST ORDER
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Gift 1 - eBook */}
                <div className="relative p-5 border-2 border-dashed border-[#D6C4AA] rounded-[12px] bg-[#FFE9C7] hover:bg-[#FFE0B3] transition-all cursor-pointer shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]">
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0.5 font-bold">
                      FREE <span className="line-through">$10</span>
                    </Badge>
                  </div>
                  <div className="flex flex-col items-center text-center gap-3 pt-2">
                    <div className="w-24 h-24 flex items-center justify-center">
                      <img src={giftEbookIcon} alt="eBook" className="w-full h-full object-contain drop-shadow-sm" />
                    </div>
                    <p className="text-sm font-bold uppercase tracking-wide">EBOOK</p>
                  </div>
                </div>

                {/* Gift 2 - Shipping */}
                <div className="relative p-5 border-2 border-dashed border-[#D6C4AA] rounded-[12px] bg-[#FFE9C7] hover:bg-[#FFE0B3] transition-all cursor-pointer shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]">
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0.5 font-bold">
                      FREE <span className="line-through">$6</span>
                    </Badge>
                  </div>
                  <div className="flex flex-col items-center text-center gap-3 pt-2">
                    <div className="w-24 h-24 flex items-center justify-center">
                      <img src={giftShippingIcon} alt="Free Shipping" className="w-full h-full object-contain drop-shadow-sm" />
                    </div>
                    <p className="text-sm font-bold uppercase tracking-wide">FREE SHIPPING</p>
                  </div>
                </div>
              </div>
            </div>

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
              <img
                src={productPainRelief}
                alt="Knee pain relief targets"
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Product in Use */}
        <section className="py-12 mb-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={productHowItWorks}
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
                src={productControl}
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
                  src={productVibration}
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

        {/* Customer Reviews Section */}
        <section id="reviews-section" className="py-12 mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4">CUSTOMER REVIEWS</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our <span className="text-primary">Customers Say</span>
              </h2>
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="flex gap-1">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                  <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" style={{ clipPath: 'inset(0 30% 0 0)' }} />
                </div>
                <span className="text-xl font-bold">4.7 out of 5</span>
              </div>
              <p className="text-muted-foreground">Based on 1,128 reviews</p>
            </div>


            <div className="space-y-6">
              {displayedReviews.map((review, idx) => (
                <Card key={idx}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="font-semibold">{review.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                        <p className="text-muted-foreground">"{review.text}"</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {!showAllReviews && allReviews.length > 6 && (
              <div className="mt-8 text-center">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setShowAllReviews(true)}
                >
                  Show All {allReviews.length} Reviews
                </Button>
              </div>
            )}

            {showAllReviews && (
              <div className="mt-8 flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
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
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
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
