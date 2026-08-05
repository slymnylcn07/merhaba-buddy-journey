import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SUPPORT_EMAIL } from "@/lib/support-config";
import { DELIVERY_ESTIMATES, SUPPORT_RESPONSE_TIME } from "@/lib/policy-config";
import { SHIPPING_SERVICE_ID } from "@/lib/merchant-schema";
import { getDeliveryWindow, HANDLING_WINDOW } from "@/lib/delivery-estimates";
import {
  formatFreeShippingThreshold,
  formatMarketMoney,
  formatPolicyStandardShippingRate,
  formatStandardShippingRate,
  getShippingPolicy,
  MARKET_SHIPPING_POLICIES,
} from "@/lib/shipping-policy";

const BUSINESS_DAYS = [
  "https://schema.org/Monday",
  "https://schema.org/Tuesday",
  "https://schema.org/Wednesday",
  "https://schema.org/Thursday",
  "https://schema.org/Friday",
];

const shippingPolicyJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://flexi-knee.com/#organization",
  name: "FlexiKnee",
  url: "https://flexi-knee.com/",
  hasShippingService: {
    "@type": "ShippingService",
    "@id": SHIPPING_SERVICE_ID,
    name: "FlexiKnee standard shipping",
    description: "Tracked standard shipping with free delivery at the eligible order threshold for each supported market.",
    fulfillmentType: "https://schema.org/FulfillmentTypeDelivery",
    handlingTime: {
      "@type": "ServicePeriod",
      businessDays: BUSINESS_DAYS,
      duration: {
        "@type": "QuantitativeValue",
        minValue: HANDLING_WINDOW.min,
        maxValue: HANDLING_WINDOW.max,
        unitCode: "DAY",
      },
    },
    shippingConditions: Object.values(MARKET_SHIPPING_POLICIES).flatMap((policy) => {
      const deliveryWindow = getDeliveryWindow(policy.shippingDestinations[0]);
      const sharedCondition = {
        "@type": "ShippingConditions",
        shippingDestination: policy.shippingDestinations.map((country) => ({
          "@type": "DefinedRegion",
          addressCountry: country,
        })),
        transitTime: {
          "@type": "ServicePeriod",
          businessDays: BUSINESS_DAYS,
          duration: {
            "@type": "QuantitativeValue",
            minValue: deliveryWindow.min,
            maxValue: deliveryWindow.max,
            unitCode: "DAY",
          },
        },
      };

      const paidCondition = {
          ...sharedCondition,
          orderValue: {
            "@type": "MonetaryAmount",
            maxValue: Number((policy.freeShippingThreshold - 0.01).toFixed(2)),
            currency: policy.currencyCode,
          },
          shippingRate: {
            "@type": "MonetaryAmount",
            value: policy.standardShippingRate,
            currency: policy.currencyCode,
          },
        };
      const freeCondition = {
          ...sharedCondition,
          orderValue: {
            "@type": "MonetaryAmount",
            minValue: policy.freeShippingThreshold,
            currency: policy.currencyCode,
          },
          shippingRate: {
            "@type": "MonetaryAmount",
            value: 0,
            currency: policy.currencyCode,
          },
        };

      // Europe's paid rate is converted by Shopify from the store currency,
      // so only the fixed free-shipping condition is safe to publish in schema.
      return policy.standardShippingRateIsApproximate
        ? [freeCondition]
        : [paidCondition, freeCondition];
    }),
  },
};

export default function ShippingPolicy() {
  const selectedShippingPolicy = getShippingPolicy();
  const selectedThreshold = formatFreeShippingThreshold();
  const selectedStandardRate = formatStandardShippingRate();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Shipping Policy | FlexiKnee</title>
        <meta name="description" content="Review FlexiKnee tracked shipping, regional delivery estimates, shipping fees and order-support information." />
        <link rel="canonical" href="https://flexi-knee.com/shipping-policy" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flexi-knee.com/shipping-policy" />
        <meta property="og:title" content="Shipping Policy | FlexiKnee" />
        <meta property="og:description" content="Tracked FlexiKnee delivery estimates and shipping information by region." />
        <meta property="og:image" content="https://flexi-knee.com/images/og-image.jpg" />
        <meta property="og:site_name" content="FlexiKnee" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@FlexiKnee" />
        <meta name="twitter:title" content="Shipping Policy | FlexiKnee" />
        <script type="application/ld+json">{JSON.stringify(shippingPolicyJsonLd)}</script>
      </Helmet>

      <Header />
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <Link to="/" className="mb-6 inline-flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="mb-8 text-4xl font-bold">Shipping Policy</h1>

        <div className="prose prose-slate max-w-none">
          <p className="mb-6 text-muted-foreground">
            FlexiKnee orders are prepared for tracked delivery, normally within one business day. The delivery windows below begin after dispatch and match the estimates shown on our main product page.
          </p>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Estimated Delivery Times</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border p-3 text-left font-semibold">Region</th>
                    <th className="border border-border p-3 text-left font-semibold">Estimated Delivery</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-3 text-muted-foreground">United States, United Kingdom, Europe, Australia & New Zealand</td>
                    <td className="border border-border p-3 text-muted-foreground">{DELIVERY_ESTIMATES.primary}</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 text-muted-foreground">Canada</td>
                    <td className="border border-border p-3 text-muted-foreground">{DELIVERY_ESTIMATES.canada}</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 text-muted-foreground">Singapore</td>
                    <td className="border border-border p-3 text-muted-foreground">{DELIVERY_ESTIMATES.singapore}</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 text-muted-foreground">Other supported regions</td>
                    <td className="border border-border p-3 text-muted-foreground">{DELIVERY_ESTIMATES.other}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Delivery dates are estimates rather than guarantees. Carrier delays, customs checks, severe weather and other events outside our control may extend them.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Tracking</h2>
            <p className="text-muted-foreground">
              Tracking is provided when available and is sent to the email used at checkout after the order is dispatched. Tracking events can take time to appear after a label is created or while a parcel moves between carrier networks.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Shipping Fees</h2>
            <p className="text-muted-foreground">
              Standard shipping is {selectedStandardRate} below {selectedThreshold} and free from {selectedThreshold} for the selected {selectedShippingPolicy.currencyCode} market. Any upgraded service or destination-specific charge will be shown before payment at checkout. We do not add a separate handling fee.
            </p>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full border-collapse border border-border text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border p-3 text-left font-semibold">Market</th>
                    <th className="border border-border p-3 text-left font-semibold">Standard shipping</th>
                    <th className="border border-border p-3 text-left font-semibold">Free shipping from</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(MARKET_SHIPPING_POLICIES).map((policy) => (
                    <tr key={policy.country}>
                      <td className="border border-border p-3 text-muted-foreground">{policy.marketLabel}</td>
                      <td className="border border-border p-3 text-muted-foreground">
                        {formatPolicyStandardShippingRate(policy)}
                      </td>
                      <td className="border border-border p-3 text-muted-foreground">
                        {formatMarketMoney(policy.freeShippingThreshold, policy.currencyCode)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Delays and Missing Packages</h2>
            <p className="mb-4 text-muted-foreground">
              Contact us if your order is outside the maximum estimate shown above or tracking has not meaningfully updated for an extended period. We will review the carrier information and help determine the appropriate next step, which may include a replacement or refund after the investigation.
            </p>
            <p className="text-muted-foreground">
              If tracking shows “Delivered,” first check the delivery area, household members, neighbours and any safe-place notice. Contact us promptly if the parcel still cannot be found.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Address Changes</h2>
            <p className="text-muted-foreground">
              Contact us as soon as possible after ordering if an address needs correction. We cannot guarantee a change after fulfillment begins or the parcel is handed to a carrier.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Customer Support</h2>
            <p className="text-muted-foreground">
              For shipping questions, email <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary hover:underline">{SUPPORT_EMAIL}</a> with your order number. We normally reply {SUPPORT_RESPONSE_TIME}.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
