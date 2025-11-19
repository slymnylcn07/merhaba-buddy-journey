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
                  href="https://flexi-knee.com/#support"
                  className="text-muted-foreground hover:text-primary hover:underline transition-colors"
                >
                  Support Center
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://flexi-knee.com"
                  className="text-muted-foreground hover:text-primary hover:underline transition-colors"
                >
                  Main Store
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <p className="text-muted-foreground text-sm">
              Visit our main website for contact information and support.
            </p>
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
