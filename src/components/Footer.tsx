export const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Column 1 */}
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://flexi-knee.com/pages/returns-refund-policy"
                  className="text-muted-foreground hover:text-primary hover:underline transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Returns and Refund Policy
                </a>
              </li>
              <li>
                <a
                  href="https://flexi-knee.com/pages/shipping-policy"
                  className="text-muted-foreground hover:text-primary hover:underline transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Shipping Policy
                </a>
              </li>
              <li>
                <a
                  href="https://flexi-knee.com/apps/parcelpanel"
                  className="text-muted-foreground hover:text-primary hover:underline transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Track Your Order
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://flexi-knee.com/pages/privacy-policy"
                  className="text-muted-foreground hover:text-primary hover:underline transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://flexi-knee.com/pages/terms-of-service"
                  className="text-muted-foreground hover:text-primary hover:underline transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://flexi-knee.com/pages/contact"
                  className="text-muted-foreground hover:text-primary hover:underline transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact Information
                </a>
              </li>
            </ul>
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
