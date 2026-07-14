import { Link } from "react-router-dom";
import { MarketSelector } from "@/components/MarketSelector";
import { SUPPORT_EMAIL } from "@/lib/support-config";
import { PRIMARY_PRODUCT_PATH } from "@/lib/product-config";
import { BadgeCheck, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { PaymentOptionsRow } from "@/components/PaymentLogos";
import { OFFICIAL_FACEBOOK_URL, OFFICIAL_INSTAGRAM_URL } from "@/lib/brand-config";

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_2fr]">
          <div>
            <Link to="/" className="inline-flex items-baseline gap-1 text-2xl font-semibold tracking-tight text-slate-950">
              FlexiKnee
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-500">
              Smart knee comfort products for daily movement, recovery routines, and simple at-home support.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">
              <BadgeCheck className="h-4 w-4" /> Official FlexiKnee website: flexi-knee.com
            </div>
            <div className="mt-5 flex items-center gap-3">
              <a href={OFFICIAL_INSTAGRAM_URL} target="_blank" rel="me noopener noreferrer" aria-label="FlexiKnee on Instagram" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={OFFICIAL_FACEBOOK_URL} target="_blank" rel="me noopener noreferrer" aria-label="FlexiKnee on Facebook" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-950">Shop</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-500">
                <li><Link to="/shop" className="hover:text-blue-600">All Devices</Link></li>
                <li><Link to={PRIMARY_PRODUCT_PATH} className="hover:text-blue-600">FlexiKnee Massager</Link></li>
                <li><Link to="/knee-quiz" className="hover:text-blue-600">Knee Comfort Quiz</Link></li>
                <li><Link to="/guides" className="hover:text-blue-600">Recovery Guides</Link></li>
                <li><Link to="/why-flexiknee" className="hover:text-blue-600">About FlexiKnee</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-950">Support</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-500">
                <li><Link to="/contact" className="hover:text-blue-600">Contact Us</Link></li>
                <li><Link to="/track-order" className="hover:text-blue-600">Track Your Order</Link></li>
                <li><Link to="/shipping-policy" className="hover:text-blue-600">Shipping Policy</Link></li>
                <li><Link to="/refund-policy" className="hover:text-blue-600">Returns & Refunds</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-blue-600">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="hover:text-blue-600">Terms of Service</Link></li>
                <li><Link to="/editorial-team" className="hover:text-blue-600">Editorial Team</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-950">Contact</h3>
              <div className="mt-4 space-y-4 text-sm text-slate-500">
                <a href={`mailto:${SUPPORT_EMAIL}`} className="flex gap-2 hover:text-blue-600"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" /> {SUPPORT_EMAIL}</a>
                <p className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" /> +1 302-722-4637</p>
                <p className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" /> UK & USA fulfillment support</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
            <div className="text-center md:text-left">
              <div className="mb-4 flex justify-center md:justify-start">
                <MarketSelector />
              </div>
              <p className="text-xs text-slate-400">
                © {new Date().getFullYear()} FlexiKnee. All rights reserved. FlexiKnee content is for general wellness education and is not medical advice.
              </p>
            </div>
            <PaymentOptionsRow className="mt-0 shrink-0" />
          </div>
        </div>
      </div>
    </footer>
  );
};
