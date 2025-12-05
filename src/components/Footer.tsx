import { Link } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";
import flexikneeLogo from "@/assets/flexiknee-logo-new.png";

export const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Column 1 - Logo */}
          <div className="flex flex-col items-start">
            <Link to="/">
              <img 
                src={flexikneeLogo} 
                alt="FlexiKnee Logo" 
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground mt-4">
              Advanced knee pain relief technology
            </p>
          </div>

          {/* Column 2 - Legal */}
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-muted-foreground hover:text-primary hover:underline transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-muted-foreground hover:text-primary hover:underline transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping-policy"
                  className="text-muted-foreground hover:text-primary hover:underline transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/refund-policy"
                  className="text-muted-foreground hover:text-primary hover:underline transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    const tidio = (window as any).tidioChatApi;
                    if (tidio) {
                      tidio.open();
                    }
                  }}
                  className="text-muted-foreground hover:text-primary hover:underline transition-colors text-left"
                >
                  Chat with us
                </button>
              </li>
              <li>
                <Link
                  to="/track-order"
                  className="text-muted-foreground hover:text-primary hover:underline transition-colors"
                >
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact Information */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            
            {/* UK Address */}
            <div className="mb-4">
              <p className="font-semibold text-sm mb-1">UK Office</p>
              <div className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <div>
                  <p>Unit 4 651 Thurmaston Village Ct</p>
                  <p>LE4 8EB Leicester</p>
                  <p>United Kingdom</p>
                </div>
              </div>
            </div>

            {/* USA Address */}
            <div className="mb-4">
              <p className="font-semibold text-sm mb-1">USA Office</p>
              <div className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <div>
                  <p>655 Driving Park Ave West Dock</p>
                  <p>14613 Rochester, New York</p>
                  <p>United States</p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Phone className="h-4 w-4 shrink-0" />
              <a href="tel:+13027224637" className="hover:text-primary transition-colors">
                +1 302-722-4637
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FlexiKnee™. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};