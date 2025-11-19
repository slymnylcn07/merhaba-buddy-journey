import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container px-4 py-12 max-w-4xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center text-primary hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using FlexiKnee™ products and services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
            <p className="text-muted-foreground mb-4">
              Permission is granted to temporarily use FlexiKnee™ products for personal, non-commercial use only. This is the grant of a license, not a transfer of title.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Product Usage</h2>
            <p className="text-muted-foreground">
              FlexiKnee™ products are intended for personal therapeutic use. Please consult with a healthcare professional before use if you have any medical conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Warranty</h2>
            <p className="text-muted-foreground">
              All FlexiKnee™ products come with a manufacturer's warranty. Please refer to your product documentation for specific warranty terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              FlexiKnee™ shall not be liable for any damages arising from the use or inability to use our products.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Contact Information</h2>
            <p className="text-muted-foreground">
              For questions about these Terms of Service, please visit our <a href="https://flexi-knee.com/#support" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Support Center</a>.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
