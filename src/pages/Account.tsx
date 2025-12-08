import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingBag, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const Account = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back!</h1>
            <p className="text-muted-foreground">
              Manage your orders and explore our products from your personal dashboard.
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Order Tracking Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-2">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl">Track My Order</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground text-sm mb-4">
                  Check the status and delivery updates for your recent orders.
                </p>
                <Button asChild className="w-full">
                  <Link to="/track-order">
                    <Package className="w-4 h-4 mr-2" />
                    ORDER TRACKING
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Shop Now Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-2">
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ShoppingBag className="w-7 h-7 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-xl">Continue Shopping</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground text-sm mb-4">
                  Explore our products and discover the relief you deserve.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    SHOP NOW
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Login Notice */}
          <div className="mt-10 p-6 bg-muted/50 rounded-lg text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Need to access your Shopify account for billing or subscription details?
            </p>
            <Button
              variant="ghost"
              size="sm"
              asChild
            >
              <a
                href="https://shopify.com/97343734050/account"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Access Shopify Account
              </a>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Account;
