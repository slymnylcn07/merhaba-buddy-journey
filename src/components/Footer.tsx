export const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <p className="text-muted-foreground">
                For questions or support, please visit our main website
              </p>
              <a
                href="https://flexi-knee.com"
                className="inline-block mt-2 text-primary hover:underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit FlexiKnee.com
              </a>
            </div>

            <div className="pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} FlexiKnee™. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
