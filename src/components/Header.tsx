import { CartDrawer } from "./CartDrawer";
import { MarketSelector } from "./MarketSelector";
import { SHOPIFY_CUSTOMER_ACCOUNT_URL } from "@/lib/shopify-config";
import { PRIMARY_PRODUCT_PATH } from "@/lib/product-config";
import { Menu, Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Shop", href: "/shop", type: "route" },
  { label: "Knee Quiz", href: "/knee-quiz", type: "route" },
  { label: "Guides", href: "/guides", type: "route" },
  { label: "Track Your Order", href: "/track-order", type: "route" },
  { label: "About FlexiKnee", href: "/why-flexiknee", type: "route" },
  { label: "Contact", href: "/contact", type: "route" },
];

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname === "/") {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/" + hash);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-white">
              <Link to="/" onClick={() => setMenuOpen(false)} className="mt-2 inline-flex items-baseline gap-1 text-xl font-semibold tracking-tight text-slate-950">
                FlexiKnee
              </Link>
              <nav className="mt-10 grid gap-2">
                {navItems.map((item) =>
                  item.type === "anchor" ? (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleAnchorClick(e, item.href.replace("/", ""))}
                      className="rounded-2xl px-4 py-3 text-base font-medium text-slate-700 transition hover:bg-slate-50 hover:text-blue-600"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-2xl px-4 py-3 text-base font-medium text-slate-700 transition hover:bg-slate-50 hover:text-blue-600"
                    >
                      {item.label}
                    </Link>
                  )
                )}
                <Link to={PRIMARY_PRODUCT_PATH} onClick={() => setMenuOpen(false)} className="mt-4 rounded-full bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-blue-600/20">
                  Shop FlexiKnee
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link to="/" className="inline-flex items-baseline gap-1 text-xl font-semibold tracking-tight text-slate-950">
            FlexiKnee
          </Link>
        </div>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) =>
            item.type === "anchor" ? (
              <a key={item.label} href={item.href} onClick={(e) => handleAnchorClick(e, item.href.replace("/", ""))} className="text-sm font-medium text-slate-600 transition hover:text-blue-600">
                {item.label}
              </a>
            ) : (
              <Link key={item.label} to={item.href} className="text-sm font-medium text-slate-600 transition hover:text-blue-600">
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-1.5">
          <Link to="/guides" aria-label="Search guides" className="hidden h-9 w-9 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-blue-600 sm:inline-flex">
            <Search className="h-4 w-4" />
          </Link>
          <a href={SHOPIFY_CUSTOMER_ACCOUNT_URL} target="_blank" rel="noopener noreferrer" aria-label="My Account" className="hidden h-9 w-9 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-blue-600 sm:inline-flex">
            <User className="h-4 w-4" />
          </a>
          <span className="hidden sm:block">
            <MarketSelector compact />
          </span>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
};
