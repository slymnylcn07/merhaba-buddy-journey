import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import TrackOrder from "./pages/TrackOrder";
import Account from "./pages/Account";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import Foundation from "./pages/Foundation";
import AdminAuth from "./pages/AdminAuth";
import AdminReturns from "./pages/AdminReturns";
import WhyFlexiKnee from "./pages/WhyFlexiKnee";
import NotFound from "./pages/NotFound";
import { useShopifyPageView } from "./hooks/use-shopify-analytics";

// Component to handle Shopify analytics
const ShopifyAnalyticsProvider = ({ children }: { children: React.ReactNode }) => {
  useShopifyPageView();
  return <>{children}</>;
};

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <ShopifyAnalyticsProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/product/:handle" element={<ProductDetail />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/account" element={<Account />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/foundation" element={<Foundation />} />
            <Route path="/why-flexiknee" element={<WhyFlexiKnee />} />
            <Route path="/admin" element={<AdminAuth />} />
            <Route path="/admin/returns" element={<AdminReturns />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ShopifyAnalyticsProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
