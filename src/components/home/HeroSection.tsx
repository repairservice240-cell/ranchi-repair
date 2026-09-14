import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking?: (serviceSlug?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="w-full bg-white overflow-hidden relative">
      {/* 100% Edge-to-Edge Full Width Banner Container */}
      <div 
        className="w-full relative overflow-hidden bg-white group"
      >
        <img
          src="/images/ranchi-repair-hero-banner.png"
          alt="Get Your Appliances Repaired Hassle-Free - Ranchi Repair Services"
          className="w-full h-auto block object-cover object-center"
          loading="eager"
        />

        {/* Single Live Blinking / Pulsing "Book a Service Now" Button Overlay */}
        <div className="absolute left-[3.2%] sm:left-[3.8%] md:left-[4.2%] bottom-[6.5%] sm:bottom-[8.5%] md:bottom-[9.5%] lg:bottom-[10.5%] z-20">
          <button
            onClick={() => onOpenBooking?.()}
            id="hero-blinking-book-btn"
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-4 sm:px-6 md:px-7 py-2 sm:py-3 md:py-3.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-extrabold rounded-full text-[11px] sm:text-sm md:text-base shadow-xl shadow-orange-500/30 transition-all animate-pulse cursor-pointer border border-white/30"
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white shrink-0 animate-phone-ring" />
            <span className="whitespace-nowrap">Book a Service Now</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white shrink-0" />
          </button>
        </div>

      </div>
    </section>
  );
};
