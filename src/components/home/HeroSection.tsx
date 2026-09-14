import React from 'react';

interface HeroSectionProps {
  onOpenBooking?: (serviceSlug?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section className="w-full bg-white overflow-hidden relative">
      <div className="w-full relative">
        <div className="relative w-full overflow-hidden bg-white">
          <img
            src="/images/ranchi-repair-hero-banner.png"
            alt="Your Trusted Repair Partner in Ranchi - Ranchi Repair Services"
            className="w-full h-auto block object-cover object-center"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};
