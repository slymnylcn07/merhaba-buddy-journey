import { CartDrawer } from "./CartDrawer";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <a href="/" className="font-bold text-xl">KneeRelief</a>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</a>
          <a href="#benefits" className="text-sm font-medium hover:text-primary transition-colors">Benefits</a>
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
          <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</a>
        </nav>
        
        <CartDrawer />
      </div>
    </header>
  );
};
