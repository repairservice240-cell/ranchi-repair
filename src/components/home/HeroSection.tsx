import React from 'react';

interface HeroSectionProps {
  onOpenBooking?: (serviceSlug?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="w-full bg-white py-3 sm:py-6 overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Graphic Container - Bounded to max-w-7xl so it never zooms in */}
        <div 
          onClick={() => onOpenBooking?.()}
          className="relative w-full overflow-hidden bg-white cursor-pointer group"
          title="Click to Book Service in Ranchi"
        >
          <img
            src="/images/ranchi-repair-hero-banner.png"
            alt="Your Trusted Repair Partner in Ranchi - Professional Home Appliance Repair Services"
            className="w-full h-auto block object-contain mx-auto transition-transform duration-300 group-hover:scale-[1.01]"
            loading="eager"
          />
        </div>

      </div>
    </section>
  );
};
