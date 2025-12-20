import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Return Policy | FlexiKnee™</title>
        <meta name="description" content="FlexiKnee offers a 30-day return policy. Learn about our return process, eligibility requirements, and how to start a return." />
        <link rel="canonical" href="https://flexi-knee.com/refund-policy" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flexi-knee.com/refund-policy" />
        <meta property="og:title" content="Return Policy | FlexiKnee™" />
        <meta property="og:description" content="FlexiKnee offers a 30-day return policy. Learn about our return process and eligibility requirements." />
        <meta property="og:image" content="https://flexi-knee.com/images/og-image.jpg" />
        <meta property="og:site_name" content="FlexiKnee" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@FlexiKnee" />
        <meta name="twitter:title" content="Return Policy | FlexiKnee™" />
        <meta name="twitter:description" content="FlexiKnee offers a 30-day return policy." />
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
        
        <h1 className="text-4xl font-bold mb-8">Return Policy</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-muted-foreground mb-6">
            We have a 30-day return policy, which means you have 30 days after receiving your item to request a return.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Eligibility for Return</h2>
            <p className="text-muted-foreground">
              To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You'll also need the receipt or proof of purchase.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How to Start a Return</h2>
            <p className="text-muted-foreground">
              To start a return, you can contact us at <a href="mailto:flexikneeofficial@gmail.com" className="text-primary hover:underline">flexikneeofficial@gmail.com</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Return Shipping Address</h2>
            <p className="text-muted-foreground mb-4">
              Please note that returns will need to be sent to the following address:
            </p>
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">For UK:</h3>
              <p className="text-muted-foreground">
                Densea Ltd (# 2649)<br />
                Unit 4 651 Thurmaston Village Ct<br />
                LE4 8EB Leicester<br />
                United Kingdom
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">For USA:</h3>
              <p className="text-muted-foreground">
                Alphazone (# 1393)<br />
                655 Driving Park Ave West Dock,<br />
                14613 Rochester, New York<br />
                United States
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Return Process</h2>
            <p className="text-muted-foreground">
              If your return is accepted, we'll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact for Return Questions</h2>
            <p className="text-muted-foreground">
              You can always contact us for any return question at <a href="mailto:flexikneeofficial@gmail.com" className="text-primary hover:underline">flexikneeofficial@gmail.com</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Damages and Issues</h2>
            <p className="text-muted-foreground">
              Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Exceptions / Non-returnable Items</h2>
            <p className="text-muted-foreground mb-4">
              Certain types of items cannot be returned, like perishable goods (such as food, flowers, or plants), custom products (such as special orders or personalized items), and personal care goods (such as beauty products). We also do not accept returns for hazardous materials, flammable liquids, or gases. Please get in touch if you have questions or concerns about your specific item.
            </p>
            <p className="text-muted-foreground">
              Unfortunately, we cannot accept returns on sale items or gift cards.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Exchanges</h2>
            <p className="text-muted-foreground">
              The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">European Union 14 day cooling off period</h2>
            <p className="text-muted-foreground">
              Notwithstanding the above, if the merchandise is being shipped into the European Union, you have the right to cancel or return your order within 14 days, for any reason and without a justification. As above, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You'll also need the receipt or proof of purchase.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Refunds</h2>
            <p className="text-muted-foreground mb-4">
              We will notify you once we've received and inspected your return, and let you know if the refund was approved or not. If approved, you'll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.
            </p>
            <p className="text-muted-foreground">
              If more than 15 business days have passed since we've approved your return, please contact us at <a href="mailto:flexikneeofficial@gmail.com" className="text-primary hover:underline">flexikneeofficial@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
