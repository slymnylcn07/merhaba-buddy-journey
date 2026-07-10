import { Link } from "react-router-dom";
import { PRIMARY_PRODUCT_PATH } from "@/lib/product-config";
import { Mail, MapPin, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_2fr]">
          <div>
            <Link to="/" className="inline-flex items-baseline gap-1 text-2xl font-semibold tracking-tight text-slate-950">
              FlexiKnee<span className="text-xs">™</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-500">
              Smart knee comfort products for daily movement, recovery routines, and simple at-home support.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
              {['Free shipping', '30-day returns', 'Secure checkout', '2-year warranty'].map((item) => (
                <span key={item} className="rounded-full border border-slate-200 px-3 py-1.5">{item}</span>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-950">Shop</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-500">
                <li><Link to={PRIMARY_PRODUCT_PATH} className="hover:text-blue-600">FlexiKnee Massager</Link></li>
                <li><Link to="/guides" className="hover:text-blue-600">Recovery Guides</Link></li>
                <li><Link to="/why-flexiknee" className="hover:text-blue-600">Why FlexiKnee</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-950">Support</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-500">
                <li><Link to="/track-order" className="hover:text-blue-600">Track Order</Link></li>
                <li><Link to="/shipping-policy" className="hover:text-blue-600">Shipping Policy</Link></li>
                <li><Link to="/refund-policy" className="hover:text-blue-600">Returns & Refunds</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-blue-600">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="hover:text-blue-600">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-950">Contact</h3>
              <div className="mt-4 space-y-4 text-sm text-slate-500">
                <p className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" /> support@flexi-knee.com</p>
                <p className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" /> +1 302-722-4637</p>
                <p className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" /> UK & USA fulfillment support</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} FlexiKnee™. All rights reserved. FlexiKnee content is for general wellness education and is not medical advice.
        </div>
      </div>
    </footer>
  );
};
