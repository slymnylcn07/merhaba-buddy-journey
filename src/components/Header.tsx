import { CartDrawer } from "./CartDrawer";
import { Menu, User } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/flexiknee-logo-new.png";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    setMenuOpen(false);
    
    if (location.pathname === "/") {
      // Already on homepage, just scroll to section
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to homepage with hash
      navigate("/" + hash);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left - Mobile Menu */}
        <div className="flex items-center">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <nav className="flex flex-col gap-6 mt-8">
                <a
                  href="/"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="/#benefits"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={(e) => handleAnchorClick(e, "#benefits")}
                >
                  Benefits
                </a>
                <a
                  href="/#features"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={(e) => handleAnchorClick(e, "#features")}
                >
                  Features
                </a>
                <a
                  href="/#faq"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={(e) => handleAnchorClick(e, "#faq")}
                >
                  FAQ
                </a>
                <a
                  href="/why-flexiknee"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Why FlexiKnee
                </a>
                <a
                  href="/track-order"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Track Your Order
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Center - Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <a href="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="FlexiKnee™"
              className="w-[280px] max-h-[90px] md:w-[360px] md:max-h-[120px] object-contain"
            />
          </a>
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center gap-6 absolute left-4">
          <a href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </a>
          <a href="/#benefits" className="text-sm font-medium hover:text-primary transition-colors" onClick={(e) => handleAnchorClick(e, "#benefits")}>
            Benefits
          </a>
          <a href="/#features" className="text-sm font-medium hover:text-primary transition-colors" onClick={(e) => handleAnchorClick(e, "#features")}>
            Features
          </a>
          <a href="/#faq" className="text-sm font-medium hover:text-primary transition-colors" onClick={(e) => handleAnchorClick(e, "#faq")}>
            FAQ
          </a>
          <a
            href="/why-flexiknee"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Why FlexiKnee
          </a>
          <a
            href="/track-order"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Track Your Order
          </a>
        </nav>

        {/* Right - Account & Cart */}
        <div className="flex items-center gap-2 ml-auto">
          <a
            href="/account"
            className="hidden md:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <User className="h-4 w-4" />
            <span>My Account</span>
          </a>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            asChild
          >
            <a href="/account">
              <User className="h-5 w-5" />
            </a>
          </Button>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
};
