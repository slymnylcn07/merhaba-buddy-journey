import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function RefundPolicy() {
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
        
        <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Return Window</h2>
            <p className="text-muted-foreground">
              We offer a 30-day return policy. You have 30 days from the date of delivery to request a return.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Return Eligibility</h2>
            <p className="text-muted-foreground mb-4">
              To be eligible for a return, your item must be:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>In its original condition</li>
              <li>Unused and unwashed</li>
              <li>In the original packaging</li>
              <li>With receipt or proof of purchase</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Refund Process</h2>
            <p className="text-muted-foreground">
              Once we receive and inspect your return, we will send you an email notification. If approved, your refund will be processed within 5-10 business days.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Return Shipping</h2>
            <p className="text-muted-foreground">
              You will be responsible for paying shipping costs for returning your item. Shipping costs are non-refundable.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Exchanges</h2>
            <p className="text-muted-foreground">
              We only replace items if they are defective or damaged. If you need to exchange for the same item, please contact our support team.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
            <p className="text-muted-foreground">
              For return requests and questions, please visit our <a href="https://flexi-knee.com/#support" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Support Center</a>.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
