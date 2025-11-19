import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const TrackOrder = () => {
  useEffect(() => {
    // Load ParcelPanel tracking script
    const script = document.createElement('script');
    script.src = '//pp-proxy.parcelpanel.com/assets/tracking/track-page.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Track Your Order</h1>
            <p className="text-muted-foreground">
              Enter your order details below to track your shipment
            </p>
          </div>

          {/* ParcelPanel Widget Container */}
          <div id="pp-tracking-page-app"></div>
          
          {/* Store Domain for External Pages */}
          <div id="pp-tracking-shop" style={{ display: 'none' }}>
            lovable-project-y7ubq.myshopify.com
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TrackOrder;
