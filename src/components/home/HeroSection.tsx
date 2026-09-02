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
      {/* 1370px Max Width Container */}
      <div className="max-w-[1370px] mx-auto w-full relative">
        
        {/* Banner Wrapper - White background natural aspect scaling */}
        <div className="relative w-full overflow-hidden bg-white">
          
          {/* Banner Graphic Image - 100% full image rendered without any top or bottom crop */}
          <img
            src="/images/ranchi-repair-hero-banner.png"
            alt="Ranchi Repair - Trusted Home Appliance Repair Services in Ranchi"
            className="w-full h-auto block object-contain object-center"
            loading="eager"
          />

          {/* Overlaid CTA Buttons Bar - Positioned lower in open space below feature icons */}
          <div className="absolute left-[4.5%] top-[84%] sm:top-[82%] md:top-[81%] lg:top-[82%] z-20 flex flex-row items-center gap-2.5 sm:gap-4 max-w-[90%] sm:max-w-[50%]">
            
            {/* Book Service Now Button - Modern Glowing Blue Gradient */}
            <button
              onClick={() => onOpenBooking()}
              className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-xl sm:rounded-2xl text-xs sm:text-sm shadow-xl shadow-blue-600/35 hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 border border-blue-400/30 shrink-0"
              id="hero-banner-book-btn"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white group-hover:scale-110 transition-transform" />
              <span>Book Service Now</span>
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Call Now Button - Modern Metallic Dark Glassmorphism */}
            <button
              onClick={handleCall}
              className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-slate-900/90 hover:bg-slate-950 text-white font-extrabold rounded-xl sm:rounded-2xl text-xs sm:text-sm shadow-lg shadow-slate-950/40 hover:shadow-xl transition-all duration-300 border border-slate-700/80 hover:border-blue-500/60 transform hover:-translate-y-0.5 active:scale-95 backdrop-blur-md shrink-0"
              id="hero-banner-call-btn"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 group-hover:scale-110 transition-transform" />
              <span>Call Now</span>
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};
