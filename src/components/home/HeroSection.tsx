import React from 'react';
import { useSiteContext } from '../../context/SiteContext';
import { Phone, ChevronRight, Calendar } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: (serviceSlug?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const { businessInfo, trackEvent } = useSiteContext();

  const handleCall = () => {
    trackEvent('call_click', `Hero CTA: ${businessInfo.phone}`);
    window.location.href = `tel:${businessInfo.phone}`;
  };

  return (
    <section className="w-full bg-white overflow-hidden relative">
      {/* Full Width Edge-to-Edge Container */}
      <div className="w-full relative">
        
        {/* Banner Wrapper */}
        <div className="relative w-full overflow-hidden bg-white">
          
          {/* Full Width Banner Graphic Image */}
          <img
            src="/images/ranchi-repair-hero-banner.png"
            alt="Ranchi Repair - Trusted Home Appliance Repair Services in Ranchi"
            className="w-full h-auto block object-cover object-center"
            loading="eager"
          />

          {/* Overlaid CTA Buttons Bar */}
          <div className="absolute left-[3%] sm:left-[4%] md:left-[4.5%] top-[84%] sm:top-[82%] md:top-[81%] lg:top-[82%] z-20 flex flex-row items-center gap-2.5 sm:gap-4 max-w-[90%] sm:max-w-[50%]">
            
            {/* Book Service Now Button — Blue Solid */}
            <button
              onClick={() => onOpenBooking()}
              className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-95 shrink-0"
              id="hero-banner-book-btn"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              <span>Book Service Now</span>
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Call Now Button — Orange Solid */}
            <button
              onClick={handleCall}
              className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-95 shrink-0"
              id="hero-banner-call-btn"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              <span>Call Now</span>
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white group-hover:translate-x-0.5 transition-transform" />
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};
