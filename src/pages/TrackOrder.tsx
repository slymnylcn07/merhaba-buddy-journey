import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const TrackOrder = () => {
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  useEffect(() => {
    // Load ParcelPanel tracking script
    const script = document.createElement('script');
    script.src = 'https://pp-proxy.parcelpanel.com/assets/tracking/track-page.js';
    script.type = 'text/javascript';
    script.async = true;
    
    script.onload = () => {
      console.log('ParcelPanel widget loaded');
      setWidgetLoaded(true);
    };
    
    script.onerror = () => {
      console.error('ParcelPanel widget failed to load');
      setWidgetLoaded(false);
    };
    
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Track Your Order</h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Enter your order details below to track your shipment
            </p>
          </div>

          {/* ParcelPanel Widget Container */}
          <div className="bg-card rounded-lg shadow-sm border p-6 md:p-8 mb-8">
            <div id="pp-tracking-page-app" className="min-h-[500px]"></div>
          </div>
          
          {/* Store Domain for External Pages */}
          <div id="pp-tracking-shop" style={{ display: 'none' }}>
            lovable-project-y7ubq.myshopify.com
          </div>

          {/* Fallback link if widget doesn't load */}
          <div className="text-center border-t pt-8">
            <p className="text-sm text-muted-foreground mb-4">
              Having trouble with the tracking widget?
            </p>
            <Button asChild variant="outline" size="lg">
              <a 
                href="https://lovable-project-y7ubq.myshopify.com/apps/parcelpanel"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                Open Tracking Page
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TrackOrder;
