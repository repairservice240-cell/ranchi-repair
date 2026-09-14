import React from 'react';

interface HeroSectionProps {
  onOpenBooking?: (serviceSlug?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="w-full bg-white overflow-hidden relative">
      {/* 100% Edge-to-Edge Full Width Banner Container */}
      <div 
        onClick={() => onOpenBooking?.()}
        className="w-full relative overflow-hidden bg-white cursor-pointer group"
        title="Click to Book Service in Ranchi"
      >
        <img
          src="/images/ranchi-repair-hero-banner.png"
          alt="Get Your Appliances Repaired Hassle-Free - Ranchi Repair Services"
          className="w-full h-auto block object-cover object-center"
          loading="eager"
        />
      </div>
    </section>
  );
};
