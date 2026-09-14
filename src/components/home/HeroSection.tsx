import React from 'react';

interface HeroSectionProps {
  onOpenBooking?: (serviceSlug?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
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

        </div>
      </div>
    </section>
  );
};
