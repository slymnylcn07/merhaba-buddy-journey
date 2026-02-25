import deviceImage from '@/assets/flexiknee-device-main.jpg';

const PRODUCT_URL = "https://flexi-knee.com/product/knee-massager-smart-heated-red-light-and-massage-therapy";

interface PremiumCTAProps {
  headline: string;
  text: string;
}

const PremiumCTA = ({ headline, text }: PremiumCTAProps) => (
  <div
    data-cta="premium"
    className="my-10 flex flex-col sm:flex-row items-start gap-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg [&_img]:!w-24 [&_img]:sm:!w-28 [&_img]:!h-24 [&_img]:sm:!h-28 [&_img]:!max-h-28 [&_img]:!my-0 [&_img]:!object-cover [&_p]:!mb-2 [&_p:last-of-type]:!mb-4 [&_a]:!text-white [&_a]:!no-underline"
    style={{
      background: '#F2FFF8',
      border: '1.5px solid #C0EECF',
      borderRadius: '14px',
      padding: '20px',
    }}
  >
    <img
      src={deviceImage}
      alt="FlexiKnee Smart Heated Knee Device"
      className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl flex-shrink-0"
    />
    <div className="flex-1">
      <p className="text-foreground font-semibold text-base mb-2 leading-snug">{headline}</p>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{text}</p>
      <a
        href={PRODUCT_URL}
        className="inline-block font-medium text-sm text-white px-5 py-2.5 transition-opacity hover:opacity-90"
        style={{
          background: '#1CA64C',
          borderRadius: '10px',
        }}
      >
        View Full Product Details
      </a>
    </div>
  </div>
);

export default PremiumCTA;
