import React from 'react';
import { useSiteContext } from '../../context/SiteContext';
import { ShieldCheck, Clock, ThumbsUp, Headphones, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking?: (serviceSlug?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const { businessInfo, trackEvent } = useSiteContext();

  const handleCall = () => {
    trackEvent('call_click', `Hero Quote CTA: ${businessInfo.phone}`);
    window.location.href = `tel:${businessInfo.phone}`;
  };

  const handleBook = () => {
    trackEvent('book_service_click', 'Hero Book Service');
    onOpenBooking?.();
  };

  return (
    <section className="w-full bg-white py-8 sm:py-12 lg:py-16 overflow-hidden relative border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Subtitle */}
            <div className="text-xs sm:text-sm font-bold text-slate-400 tracking-widest uppercase">
              PROFESSIONAL REPAIR SERVICES
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Your Trusted<br />
              Repair Partner<br />
              in <span className="text-orange-500">Ranchi</span>
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-sm sm:text-base font-normal max-w-lg leading-relaxed">
              We repair your home &amp; office appliances with expert care, quick service and affordable pricing.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleBook}
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold rounded-full text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200"
                id="hero-book-service-btn"
              >
                <span>Book a Service</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>

              <button
                onClick={handleCall}
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 border-2 border-blue-600 hover:bg-blue-50 active:scale-95 text-blue-600 font-extrabold rounded-full text-sm sm:text-base transition-all duration-200"
                id="hero-free-quote-btn"
              >
                Get a Free Quote
              </button>
            </div>

            {/* 4 Trust Icons Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
              
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-xs font-bold text-slate-700 leading-tight">
                  Trusted<br /><span className="text-slate-500 font-normal">Professionals</span>
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-xs font-bold text-slate-700 leading-tight">
                  Same Day<br /><span className="text-slate-500 font-normal">Service</span>
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <ThumbsUp className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-xs font-bold text-slate-700 leading-tight">
                  Affordable<br /><span className="text-slate-500 font-normal">Pricing</span>
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Headphones className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-xs font-bold text-slate-700 leading-tight">
                  Customer<br /><span className="text-slate-500 font-normal">Support</span>
                </span>
              </div>

            </div>

          </div>

          {/* Right Image Graphic Column */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Banner Graphic Image */}
            <div className="relative w-full max-w-[540px]">
              <img
                src="/images/ranchi-repair-hero-banner.png"
                alt="Ranchi Repair - Trusted Appliance Repair Partner in Ranchi"
                className="w-full h-auto object-contain block drop-shadow-md rounded-2xl"
                loading="eager"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
