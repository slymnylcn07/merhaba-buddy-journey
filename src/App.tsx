import { useState, lazy, Suspense } from "react";
import { initMarketFromGeo } from "@/lib/market";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ScrollToTop from "./components/ScrollToTop";
import { useShopifyPageView } from "./hooks/use-shopify-analytics";
import { useGoogleAnalytics } from "./hooks/use-google-analytics";
import { useMetaTracking } from "./hooks/use-meta-tracking";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Lazy load non-critical routes for code splitting
const ProductRoute = lazy(() => import("./pages/ProductRoute"));
const TrackOrder = lazy(() => import("./pages/TrackOrder"));
const Account = lazy(() => import("./pages/Account"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const ShippingPolicy = lazy(() => import("./pages/ShippingPolicy"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const Foundation = lazy(() => import("./pages/Foundation"));
const AdminAuth = lazy(() => import("./pages/AdminAuth"));
const AdminReturns = lazy(() => import("./pages/AdminReturns"));
const WhyFlexiKnee = lazy(() => import("./pages/WhyFlexiKnee"));
const Guides = lazy(() => import("./pages/Guides"));
const Shop = lazy(() => import("./pages/Shop"));
const KneeQuiz = lazy(() => import("./pages/KneeQuiz"));
const Contact = lazy(() => import("./pages/Contact"));
const GuideArticle = lazy(() => import("./pages/GuideArticle"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// Component to handle analytics
const AnalyticsProvider = ({ children }: { children: React.ReactNode }) => {
  useShopifyPageView();
  useGoogleAnalytics();
  useMetaTracking();
  return <>{children}</>;
};

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <Analytics />
      <SpeedInsights />
      <BrowserRouter>
        <ScrollToTop />
        <AnalyticsProvider>
          <main>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/product/knee-massager-smart-heated-red-light-and-massage-therapy" element={<Navigate to="/product/knee-massager-smart-red-light-and-massage-therapy" replace />} />
                <Route path="/product/:handle" element={<ProductRoute />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="/account" element={<Account />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/shipping-policy" element={<ShippingPolicy />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/foundation" element={<Foundation />} />
                <Route path="/why-flexiknee" element={<WhyFlexiKnee />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/knee-quiz" element={<KneeQuiz />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/guides/running-shoes-knee-pain-causes-fixes" element={<Navigate to="/guides/best-running-shoes-knee-pain" replace />} />
                <Route path="/guides/running-shoes-knee-pain-discomfort" element={<Navigate to="/guides/best-running-shoes-knee-pain" replace />} />
                <Route path="/guides/post-exercise-knee-pain-guide" element={<Navigate to="/guides/knee-pain-after-exercise" replace />} />
                <Route path="/guides/sore-knees-after-workout" element={<Navigate to="/guides/knee-pain-after-exercise" replace />} />
                <Route path="/guides/knee-pain-location-map-2026" element={<Navigate to="/guides/knee-pain-locations-visual-guide" replace />} />
                <Route path="/guides/pain-in-the-knee-causes-locations" element={<Navigate to="/guides/knee-pain-locations-visual-guide" replace />} />
                <Route path="/guides/daily-knee-comfort-routine" element={<Navigate to="/guides/daily-knee-care-routine" replace />} />
                <Route path="/guides/heat-or-ice-knee-pain-situations" element={<Navigate to="/guides/heat-vs-ice-for-knees" replace />} />
                <Route path="/guides" element={<Guides />} />
                <Route path="/guides/:slug" element={<GuideArticle />} />
                <Route path="/admin" element={<AdminAuth />} />
                <Route path="/admin/returns" element={<AdminReturns />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
        </AnalyticsProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
