import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
        
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: November 18, 2025
          </p>

          <p className="text-muted-foreground mb-6">
            FlexiKnee™ operates this store and website, including all related information, content, features, tools, products and services, in order to provide you, the customer, with a curated shopping experience (the "Services"). FlexiKnee™ is powered by Shopify, which enables us to provide the Services to you. This Privacy Policy describes how we collect, use, and disclose your personal information when you visit, use, or make a purchase or other transaction using the Services or otherwise communicate with us. If there is a conflict between our Terms of Service and this Privacy Policy, this Privacy Policy controls with respect to the collection, processing, and disclosure of your personal information.
          </p>

          <p className="text-muted-foreground mb-8">
            Please read this Privacy Policy carefully. By using and accessing any of the Services, you acknowledge that you have read this Privacy Policy and understand the collection, use, and disclosure of your information as described in this Privacy Policy.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Personal Information We Collect or Process</h2>
            <p className="text-muted-foreground mb-4">
              When we use the term "personal information," we are referring to information that identifies or can reasonably be linked to you or another person. Personal information does not include information that is collected anonymously or that has been de-identified, so that it cannot identify or be reasonably linked to you. We may collect or process the following categories of personal information, including inferences drawn from this personal information, depending on how you interact with the Services, where you live, and as permitted or required by applicable law:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Contact details</strong> including your name, address, billing address, shipping address, phone number, and email address.</li>
              <li><strong>Financial information</strong> including credit card, debit card, and financial account numbers, payment card information, financial account information, transaction details, form of payment, payment confirmation and other payment details.</li>
              <li><strong>Account information</strong> including your username, password, security questions, preferences and settings.</li>
              <li><strong>Transaction information</strong> including the items you view, put in your cart, add to your wishlist, or purchase, return, exchange or cancel and your past transactions.</li>
              <li><strong>Communications with us</strong> including the information you include in communications with us, for example, when sending a customer support inquiry.</li>
              <li><strong>Device information</strong> including information about your device, browser, or network connection, your IP address, and other unique identifiers.</li>
              <li><strong>Usage information</strong> including information regarding your interaction with the Services, including how and when you interact with or navigate the Services.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Personal Information Sources</h2>
            <p className="text-muted-foreground">
              We may collect personal information from the following sources: directly from you when you provide it to us, automatically when you interact with the Services, from third-party sources, and from publicly available sources.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Personal Information</h2>
            <p className="text-muted-foreground mb-4">
              Depending on how you interact with us or which of the Services you use, we may use personal information for the following purposes:
            </p>
            
            <h3 className="text-xl font-semibold mb-2 mt-6">Provide, Tailor, and Improve the Services</h3>
            <p className="text-muted-foreground mb-4">
              We use your personal information to provide you with the Services, including to perform our contract with you, to process your payments, to fulfill your orders, to remember your preferences and items you are interested in, to send notifications to you related to your account, to process purchases, returns, exchanges or other transactions, to create, maintain and otherwise manage your account, to arrange for shipping, to facilitate any returns and exchanges, to enable you to post reviews, and to create a customized shopping experience for you, such as recommending products related to your purchases. This may include using your personal information to better tailor and improve the Services.
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-6">Marketing and Advertising</h3>
            <p className="text-muted-foreground mb-4">
              We use your personal information for marketing and promotional purposes, such as to send marketing, advertising and promotional communications by email, text message or postal mail, and to show you online advertisements for products or services on the Services or other websites, including based on items you previously have purchased or added to your cart and other activity on the Services.
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-6">Security and Fraud Prevention</h3>
            <p className="text-muted-foreground mb-4">
              We use your personal information to authenticate your account, to provide a secure payment and shopping experience, detect, investigate or take action regarding possible fraudulent, illegal, unsafe, or malicious activity, protect public safety, and to secure our services. If you choose to use the Services and register an account, you are responsible for keeping your account credentials safe. We highly recommend that you do not share your username, password or other access details with anyone else.
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-6">Communicating with You</h3>
            <p className="text-muted-foreground mb-4">
              We use your personal information to provide you with customer support, to be responsive to you, to provide effective services to you and to maintain our business relationship with you.
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-6">Legal Reasons</h3>
            <p className="text-muted-foreground">
              We use your personal information to comply with applicable law or respond to valid legal process, including requests from law enforcement or government agencies, to investigate or participate in civil discovery, potential or actual litigation, or other adversarial legal proceedings, and to enforce or investigate potential violations of our terms or policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How We Disclose Personal Information</h2>
            <p className="text-muted-foreground mb-4">
              In certain circumstances, we may disclose your personal information to third parties for legitimate purposes subject to this Privacy Policy. Such circumstances may include:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>With Shopify, vendors and other third parties who perform services on our behalf (e.g. IT management, payment processing, data analytics, customer support, cloud storage, fulfillment and shipping).</li>
              <li>With business and marketing partners to provide marketing services and advertise to you. For example, we use Shopify to support personalized advertising with third-party services based on your online activity with different merchants and websites.</li>
              <li>When you direct, request us or otherwise consent to our disclosure of certain information to third parties, such as to ship you products or through your use of social media widgets or login integrations.</li>
              <li>With our affiliates or otherwise within our corporate group.</li>
              <li>In connection with a business transaction such as a merger or bankruptcy, to comply with any applicable legal obligations (including to respond to subpoenas, search warrants and similar requests), to enforce any applicable terms of service or policies, and to protect or defend the Services, our rights, and the rights of our users or others.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Relationship with Shopify</h2>
            <p className="text-muted-foreground mb-4">
              The Services are hosted by Shopify, which collects and processes personal information about your access to and use of the Services in order to provide and improve the Services for you. Information you submit to the Services will be transmitted to and shared with Shopify as well as third parties that may be located in countries other than where you reside, in order to provide and improve the Services for you.
            </p>
            <p className="text-muted-foreground mb-4">
              In addition, to help protect, grow, and improve our business, we use certain Shopify enhanced features that incorporate data and information obtained from your interactions with our Store, along with other merchants and with Shopify. To provide these enhanced features, Shopify may make use of personal information collected about your interactions with our store, along with other merchants, and with Shopify.
            </p>
            <p className="text-muted-foreground mb-4">
              In these circumstances, Shopify is responsible for the processing of your personal information, including for responding to your requests to exercise your rights over use of your personal information for these purposes.
            </p>
            <p className="text-muted-foreground">
              To learn more about how Shopify uses your personal information and any rights you may have, you can visit the{" "}
              <a href="https://www.shopify.com/legal/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Shopify Consumer Privacy Policy</a>. 
              Depending on where you live, you may exercise certain rights with respect to your personal information here:{" "}
              <a href="https://privacy.shopify.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Shopify Privacy Portal</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Third Party Websites and Links</h2>
            <p className="text-muted-foreground mb-4">
              The Services may provide links to websites or other online platforms operated by third parties. If you follow links to sites not affiliated or controlled by us, you should review their privacy and security policies and other terms and conditions. We do not guarantee and are not responsible for the privacy or security of such sites, including the accuracy, completeness, or reliability of information found on these sites.
            </p>
            <p className="text-muted-foreground">
              Information you provide on public or semi-public platforms, including social media, may be viewable by others without limitation as to its use by us or by a third party.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Children's Data</h2>
            <p className="text-muted-foreground mb-4">
              The Services are not intended to be used by children, and we do not knowingly collect any personal information about children under the age of majority in your jurisdiction. If you are the parent or guardian of a child who has provided us with their personal information, you may contact us using the contact details set out below to request that it be deleted.
            </p>
            <p className="text-muted-foreground">
              As of the Effective Date of this Privacy Policy, we do not have actual knowledge that we "share" or "sell" personal information of individuals under 16 years of age.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Security and Retention of Your Information</h2>
            <p className="text-muted-foreground mb-4">
              Please be aware that no security measures are perfect or impenetrable, and we cannot guarantee "perfect security." In addition, any information you send to us may not be secure while in transit. We recommend that you do not use unsecure channels to communicate sensitive or confidential information.
            </p>
            <p className="text-muted-foreground">
              How long we retain your personal information depends on different factors, such as whether we need the information to maintain your account, to provide you with Services, comply with legal obligations, resolve disputes or enforce other applicable contracts and policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Rights and Choices</h2>
            
            <h3 className="text-xl font-semibold mb-2 mt-6">Privacy Rights</h3>
            <p className="text-muted-foreground mb-4">
              Depending on where you live, you may have some or all of the rights listed below in relation to your personal information. These rights may apply only in certain circumstances:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Right to Access / Know</li>
              <li>Right to Delete</li>
              <li>Right to Correct</li>
              <li>Right of Portability</li>
              <li>Right to Opt out of Sale or Sharing for Targeted Advertising</li>
              <li>Managing Communication Preferences</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              If you reside in the UK or EEA, you may also have:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Objection to Processing / Restriction of Processing</li>
              <li>Right to Withdraw Consent</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              You may exercise any of these rights where indicated on the Services or by contacting us using the contact details below.
            </p>
            <p className="text-muted-foreground mb-4">
              We will not discriminate against you for exercising any rights.
            </p>
            <p className="text-muted-foreground">
              We may need to verify your identity before processing any requests.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Complaints</h2>
            <p className="text-muted-foreground">
              If you have complaints about how we process your personal information, please contact us using the contact details provided below. You may also have the right to appeal or lodge a complaint with your local data protection authority.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">International Transfers</h2>
            <p className="text-muted-foreground mb-4">
              We may transfer, store and process your personal information outside the country you live in.
            </p>
            <p className="text-muted-foreground">
              If we transfer personal information out of the EEA or UK, we rely on recognized transfer mechanisms such as Standard Contractual Clauses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. Changes will be posted on this website and the "Last updated" date will be revised accordingly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p className="text-muted-foreground mb-4">
              Should you have any questions about our privacy practices or this Privacy Policy, or if you would like to exercise any of the rights available to you, please email us at:
            </p>
            <p className="text-muted-foreground mb-4">
              📩 <a href="mailto:flexikneeofficial@gmail.com" className="text-primary hover:underline">flexikneeofficial@gmail.com</a>
            </p>
            <p className="text-muted-foreground">
              For the purpose of applicable data protection laws, we are the data controller of your personal information.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
