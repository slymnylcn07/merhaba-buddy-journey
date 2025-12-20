import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Shipping Policy | FlexiKnee™</title>
        <meta name="description" content="FlexiKnee provides fast, reliable tracked delivery. Learn about our shipping regions, delivery times, and tracking options." />
        <link rel="canonical" href="https://flexi-knee.com/shipping-policy" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flexi-knee.com/shipping-policy" />
        <meta property="og:title" content="Shipping Policy | FlexiKnee™" />
        <meta property="og:description" content="FlexiKnee provides fast, reliable tracked delivery worldwide." />
        <meta property="og:image" content="https://flexi-knee.com/images/og-image.jpg" />
        <meta property="og:site_name" content="FlexiKnee" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@FlexiKnee" />
        <meta name="twitter:title" content="Shipping Policy | FlexiKnee™" />
        <meta name="twitter:description" content="FlexiKnee provides fast, reliable tracked delivery worldwide." />
      </Helmet>
      
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
            At FlexiKnee™, we aim to provide fast, reliable and fully tracked delivery for all orders. Every order is processed within 24 hours (Monday–Saturday), and shipped with a tracked service for your peace of mind.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Shipping Regions & Delivery Times</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border p-3 text-left font-semibold">Region</th>
                    <th className="border border-border p-3 text-left font-semibold">Countries</th>
                    <th className="border border-border p-3 text-left font-semibold">Estimated Delivery</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-3 text-muted-foreground">United Kingdom & Southern Europe</td>
                    <td className="border border-border p-3 text-muted-foreground">UK, Ireland, Spain, Portugal, Italy, Greece, France, Malta, Cyprus</td>
                    <td className="border border-border p-3 text-muted-foreground">5–9 Business Days</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 text-muted-foreground">Northern Europe</td>
                    <td className="border border-border p-3 text-muted-foreground">Norway, Sweden, Finland, Denmark, Iceland, Estonia, Latvia, Lithuania</td>
                    <td className="border border-border p-3 text-muted-foreground">7–12 Business Days</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 text-muted-foreground">USA, Canada, Australia & New Zealand</td>
                    <td className="border border-border p-3 text-muted-foreground">—</td>
                    <td className="border border-border p-3 text-muted-foreground">7–12 Business Days</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              Most customers receive their order within 1 week.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Tracked Shipping Included</h2>
            <p className="text-muted-foreground">
              All orders include tracked delivery at no additional cost. Your tracking number is sent via email as soon as your package ships, allowing you to monitor your delivery in real time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Priority Processing</h2>
            <p className="text-muted-foreground mb-4">
              Orders placed before 3 PM are typically dispatched the same day. Priority is automatically given to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Express checkout payments</li>
              <li>Returning customers</li>
              <li>High-volume order days</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Shipping Fees</h2>
            <p className="text-muted-foreground mb-4">
              We believe in transparent, simple pricing.
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Tracked Shipping: <strong>FREE</strong></li>
              <li>Processing / Handling: <strong>FREE</strong></li>
              <li>No hidden charges.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Delivery Guarantee</h2>
            <p className="text-muted-foreground mb-4">
              If your order does not arrive within the maximum timeframe listed for your region, you qualify for one of the following:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>✔ A free replacement, or</li>
              <li>✔ A full refund, no questions asked.</li>
            </ul>
            <p className="text-muted-foreground mt-4 font-medium">
              We stand behind every FlexiKnee™ order.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Address Issues & Lost Packages</h2>
            <p className="text-muted-foreground mb-4">
              If you entered an incorrect address, contact us within 12 hours. Once dispatched, address changes are not possible.
            </p>
            <p className="text-muted-foreground">
              If your tracking shows "Delivered" but you haven't received your parcel, contact us — we will assist you immediately and arrange a solution.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Customer Support</h2>
            <p className="text-muted-foreground mb-2">
              For any shipping-related questions, reach us at:
            </p>
            <p className="text-muted-foreground mb-2">
              📧 <a href="mailto:flexikneeofficial@gmail.com" className="text-primary hover:underline">flexikneeofficial@gmail.com</a>
            </p>
            <p className="text-muted-foreground">
              We reply within 2-4 hours on average.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
