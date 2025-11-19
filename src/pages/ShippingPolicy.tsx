import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function ShippingPolicy() {
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
        
        <h1 className="text-4xl font-bold mb-8">Shipping Policy</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Processing Time</h2>
            <p className="text-muted-foreground">
              Orders are typically processed within 1-2 business days. You will receive a confirmation email with tracking information once your order ships.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Shipping Methods</h2>
            <p className="text-muted-foreground mb-4">
              We offer the following shipping options:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Standard Shipping (5-7 business days)</li>
              <li>Express Shipping (2-3 business days)</li>
              <li>Overnight Shipping (1 business day)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Shipping Costs</h2>
            <p className="text-muted-foreground">
              Shipping costs are calculated based on the shipping method selected and your delivery address. Free shipping is available for orders over certain amounts.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. International Shipping</h2>
            <p className="text-muted-foreground">
              We ship to select international destinations. International orders may be subject to customs fees and import duties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Order Tracking</h2>
            <p className="text-muted-foreground">
              Track your order using our <Link to="/track-order" className="text-primary hover:underline">Order Tracking</Link> page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Questions?</h2>
            <p className="text-muted-foreground">
              For shipping inquiries, please visit our <a href="https://flexi-knee.com/#support" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Support Center</a>.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
