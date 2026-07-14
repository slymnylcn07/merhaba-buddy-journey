import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SUPPORT_EMAIL } from "@/lib/support-config";
import { LIMITED_WARRANTY_YEARS, RETURN_WINDOW_DAYS, SUPPORT_RESPONSE_TIME } from "@/lib/policy-config";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Returns, Refunds & Warranty | FlexiKnee</title>
        <meta name="description" content={`FlexiKnee offers eligible orders a ${RETURN_WINDOW_DAYS}-day return window and the main device a ${LIMITED_WARRANTY_YEARS}-year limited warranty.`} />
        <link rel="canonical" href="https://flexi-knee.com/refund-policy" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flexi-knee.com/refund-policy" />
        <meta property="og:title" content="Returns, Refunds & Warranty | FlexiKnee" />
        <meta property="og:description" content={`Review the FlexiKnee ${RETURN_WINDOW_DAYS}-day return process, refund timing and limited warranty coverage.`} />
        <meta property="og:image" content="https://flexi-knee.com/images/og-image.jpg" />
        <meta property="og:site_name" content="FlexiKnee" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@FlexiKnee" />
        <meta name="twitter:title" content="Returns, Refunds & Warranty | FlexiKnee" />
      </Helmet>

      <Header />
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <Link to="/" className="mb-6 inline-flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="mb-8 text-4xl font-bold">Returns, Refunds & Warranty</h1>

        <div className="prose prose-slate max-w-none">
          <p className="mb-6 text-muted-foreground">
            Eligible orders may be returned within {RETURN_WINDOW_DAYS} days of delivery. Contact us before sending anything back so we can confirm eligibility and provide the correct return instructions.
          </p>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Eligibility for Return</h2>
            <p className="text-muted-foreground">
              Items must be returned in the same condition in which they were received, with the original packaging, included accessories and proof of purchase. Reasonable inspection is allowed, but items showing avoidable damage, misuse or missing parts may not qualify for a full refund.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">How to Start a Return</h2>
            <p className="text-muted-foreground">
              Email <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary hover:underline">{SUPPORT_EMAIL}</a> with your order number and the email used at checkout. Our team normally replies {SUPPORT_RESPONSE_TIME}. Items sent without prior return authorization may be refused or delayed.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Return Shipping</h2>
            <p className="text-muted-foreground">
              Once a return is approved, we will provide the correct return address and instructions. Return shipping is normally the customer's responsibility unless the item arrived damaged, defective or incorrect. Do not send a return to a fulfillment address shown elsewhere on the site without receiving instructions first.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Damaged, Defective or Incorrect Items</h2>
            <p className="text-muted-foreground">
              Inspect your order after delivery and contact us promptly if it is damaged, defective or different from what you ordered. Include your order number, a short description and clear photos or video where useful so we can assess the issue and arrange an appropriate solution.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Sale Items and Exceptions</h2>
            <p className="mb-4 text-muted-foreground">
              Sale-priced items remain eligible for the {RETURN_WINDOW_DAYS}-day return policy unless they were clearly marked “Final Sale” before purchase. Gift cards and items that cannot legally or safely be returned are excluded.
            </p>
            <p className="text-muted-foreground">
              Custom or personalized products, opened hygiene-sensitive goods, hazardous materials and items damaged through misuse may be ineligible. Contact us before ordering if you are unsure about a specific product.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Exchanges</h2>
            <p className="text-muted-foreground">
              The quickest way to obtain a different item is normally to return the original item after approval and place a separate order for the replacement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">European Union Cooling-Off Rights</h2>
            <p className="text-muted-foreground">
              Where applicable, customers in the European Union may have a statutory 14-day right to cancel an eligible distance purchase. These statutory rights are separate from and are not reduced by our voluntary {RETURN_WINDOW_DAYS}-day return policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Refunds</h2>
            <p className="mb-4 text-muted-foreground">
              We will notify you after the return is received and inspected. Approved refunds are issued to the original payment method within 10 business days. Your bank or card provider may need additional time to post the funds.
            </p>
            <p className="text-muted-foreground">
              If more than 15 business days have passed since we confirmed approval, contact <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary hover:underline">{SUPPORT_EMAIL}</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">{LIMITED_WARRANTY_YEARS}-Year Limited Warranty</h2>
            <p className="mb-4 text-muted-foreground">
              The main FlexiKnee Smart Heated Knee Massager includes a {LIMITED_WARRANTY_YEARS}-year limited warranty from the delivery date for eligible manufacturing defects in materials or workmanship under normal household use.
            </p>
            <p className="mb-4 text-muted-foreground">
              The warranty does not cover accidental or cosmetic damage, misuse, improper charging or cleaning, unauthorized modification, loss, theft, normal wear, or expected battery-capacity reduction over time. Proof of purchase is required.
            </p>
            <p className="text-muted-foreground">
              After assessment, an eligible claim may be resolved through repair, replacement or another appropriate remedy. This limited warranty does not affect any mandatory consumer rights that apply in your location.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
