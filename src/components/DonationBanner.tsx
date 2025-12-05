import { Heart, Sparkles } from "lucide-react";
import foundationBg from "@/assets/foundation-bg.jpg";

const DonationBanner = () => {
  return (
    <div className="w-full relative overflow-hidden rounded-xl my-4 shadow-lg">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${foundationBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-teal-900/85 via-teal-800/80 to-teal-700/75" />
      
      {/* Content */}
      <div className="relative z-10 p-4 md:p-5">
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4">
          
          {/* Foundation Badge */}
          <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-teal-400/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-teal-300/30 shadow-[0_0_20px_rgba(0,196,162,0.3)]">
              <Heart className="w-6 h-6 md:w-7 md:h-7 text-teal-200 fill-teal-300/50" />
            </div>
            <span className="text-[10px] md:text-xs font-semibold tracking-wider text-teal-200/90 uppercase">
              Foundation
            </span>
          </div>
          
          {/* Text Content */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h4 className="font-bold text-white text-base md:text-lg tracking-tight">
                Every Order Creates Impact
              </h4>
            </div>
            <p className="text-teal-100/90 text-xs md:text-sm leading-relaxed max-w-md">
              1% of each purchase supports joint health, mobility awareness, and pain research initiatives.
            </p>
          </div>
          
          {/* CTA Link */}
          <a 
            href="#" 
            className="text-teal-200 hover:text-white text-xs font-medium underline underline-offset-2 decoration-teal-300/50 hover:decoration-white transition-colors whitespace-nowrap"
          >
            Learn More →
          </a>
        </div>
      </div>
    </div>
  );
};

export default DonationBanner;
