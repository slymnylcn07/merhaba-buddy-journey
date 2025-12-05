import { Heart } from "lucide-react";

const DonationBanner = () => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-4 md:p-5 my-4 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-teal-50 rounded-full flex items-center justify-center">
          <Heart className="w-5 h-5 md:w-6 md:h-6 text-teal-600 fill-teal-100" />
        </div>
        
        {/* Text Content */}
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 text-sm md:text-base">
            Every Order Gives Back
          </h4>
          <p className="text-gray-600 text-xs md:text-sm mt-0.5">
            1% of each purchase supports joint health & mobility causes.
          </p>
        </div>
        
        {/* CTA Link */}
        <a 
          href="#" 
          className="text-teal-600 hover:text-teal-700 text-xs md:text-sm font-medium underline underline-offset-2 transition-colors whitespace-nowrap self-end sm:self-center"
        >
          Learn More
        </a>
      </div>
    </div>
  );
};

export default DonationBanner;
