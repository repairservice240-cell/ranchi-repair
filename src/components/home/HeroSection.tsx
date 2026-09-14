import React from 'react';

interface HeroSectionProps {
  onOpenBooking?: (serviceSlug?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="w-full bg-white py-2 sm:py-4 overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Landscape Banner Graphic Container - Matches Sample Image Proportions Exactly */}
        <div 
          onClick={() => onOpenBooking?.()}
          className="relative w-full overflow-hidden bg-white cursor-pointer group rounded-2xl"
          title="Click to Book Service in Ranchi"
        >
          <img
            src="/images/ranchi-repair-hero-banner.png"
            alt="Your Trusted Repair Partner in Ranchi - Professional Home Appliance Repair Services"
            className="w-full h-auto max-h-[440px] block object-contain mx-auto transition-transform duration-300 group-hover:scale-[1.005]"
            loading="eager"
          />
        </div>

      </div>
    </section>
  );
};
