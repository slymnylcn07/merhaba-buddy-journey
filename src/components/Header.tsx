import { CartDrawer } from "./CartDrawer";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import logo from "@/assets/flexiknee-logo-new.png";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left - Hamburger Menu */}
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Center - Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <a href="/" className="flex items-center gap-2">
            <img src={logo} alt="FlexiKnee™" className="h-10 md:h-12" />
          </a>
        </div>
        
        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center gap-6 absolute left-4">
          <a href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</a>
          <a href="#benefits" className="text-sm font-medium hover:text-primary transition-colors">Benefits</a>
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
          <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</a>
        </nav>
        
        {/* Right - Cart */}
        <div className="flex items-center ml-auto">
          <CartDrawer />
        </div>
      </div>
    </header>
  );
};
