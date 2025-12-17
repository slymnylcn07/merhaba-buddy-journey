import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const TrackOrder = () => {
  useEffect(() => {
    // Add custom styles for ParcelPanel widget
    const style = document.createElement('style');
    style.textContent = `
      #pp-tracking-page-app input[type="text"],
      #pp-tracking-page-app input[type="email"] {
        border: 2px solid hsl(var(--input)) !important;
        border-radius: 0.5rem !important;
        padding: 0.75rem !important;
        background: hsl(var(--background)) !important;
        color: hsl(var(--foreground)) !important;
        font-size: 1rem !important;
        transition: all 0.2s !important;
      }
      
      #pp-tracking-page-app input[type="text"]:focus,
      #pp-tracking-page-app input[type="email"]:focus {
        border-color: hsl(var(--primary)) !important;
        outline: none !important;
        box-shadow: 0 0 0 3px hsl(var(--primary) / 0.1) !important;
      }
      
      #pp-tracking-page-app button {
        background: hsl(var(--primary)) !important;
        color: hsl(var(--primary-foreground)) !important;
        border-radius: 0.5rem !important;
        padding: 0.75rem 1.5rem !important;
        font-weight: 600 !important;
        transition: all 0.2s !important;
      }
      
      #pp-tracking-page-app button:hover {
        opacity: 0.9 !important;
      }
      
      #pp-tracking-page-app label {
        color: hsl(var(--foreground)) !important;
        font-weight: 500 !important;
        margin-bottom: 0.5rem !important;
        display: block !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

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

  // Auto-fill tracking number from URL query parameter
  useEffect(() => {
    function getQueryParam(name: string) {
      return new URLSearchParams(window.location.search).get(name);
    }

    function setVueInputValue(input: HTMLInputElement, value: string) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      if (nativeInputValueSetter) {
        nativeInputValueSetter.call(input, value);
      }
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }

    const tracking = getQueryParam("tracking");
    if (!tracking) return;

    let attempts = 0;
    const timer = setInterval(() => {
      attempts++;
      const input = document.querySelector('input[name="nums"]') as HTMLInputElement;
      if (input) {
        setVueInputValue(input, tracking);
        // Auto-click Track button
        const btn = document.querySelector(
          ".pp_tracking_button button, button[type='submit']"
        ) as HTMLButtonElement;
        if (btn) btn.click();
        clearInterval(timer);
      }
      if (attempts > 80) clearInterval(timer); // ~24 seconds
    }, 300);

    return () => {
      clearInterval(timer);
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
