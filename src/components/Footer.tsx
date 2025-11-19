export const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-4">FlexiKnee™</h3>
            <p className="text-muted-foreground mb-4">
              For customer service, policies, and contact information
            </p>
            <a
              href="https://flexi-knee.com"
              className="inline-block text-primary hover:underline font-semibold text-lg"
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
    </footer>
  );
};
