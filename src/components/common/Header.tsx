import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteContext } from '../../context/SiteContext';
import { Phone, MessageCircle } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: (serviceSlug?: string) => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const { businessInfo, trackEvent } = useSiteContext();

  const handleCall = () => {
    trackEvent('call_click', `Header: ${businessInfo.phone}`);
  };

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', `Header: ${businessInfo.whatsapp}`);
    window.open(
      `https://wa.me/91${businessInfo.whatsapp.replace(/\D/g, '')}?text=Hi%2C%20I%20need%20appliance%20repair%20service%20in%20Ranchi.`,
      '_blank'
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/70 shadow-lg shadow-slate-900/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-2">

        {/* Logo & Brand Name */}
        <Link to="/" className="group flex items-center min-w-0 shrink" aria-label="Home">
          <img
            src="/logo.png"
            alt={businessInfo.companyName}
            className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300 shrink-0"
          />
        </Link>

        {/* Mobile Direct Phone Link (No Hamburger Menu) */}
        <a
          href={`tel:${businessInfo.phone}`}
          onClick={handleCall}
          className="md:hidden inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold rounded-xl text-xs shadow-md shadow-emerald-600/30 border border-emerald-400/40 active:scale-95 transition-all shrink-0"
          id="header-mobile-phone-btn"
          aria-label={`Call ${businessInfo.phone}`}
        >
          <Phone className="w-3.5 h-3.5 text-white shrink-0 animate-pulse" />
          <span className="tracking-tight whitespace-nowrap">{businessInfo.phone}</span>
        </a>

        {/* Desktop CTAs (Hidden on mobile) */}
        <div className="hidden md:flex items-center gap-3">

          <a
            href={`tel:${businessInfo.phone}`}
            onClick={handleCall}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold rounded-xl text-xs transition-all duration-200 shadow-lg shadow-emerald-600/35 border border-emerald-400/40 animate-pulse hover:animate-none hover:-translate-y-0.5 active:scale-95 group"
            id="header-call-btn"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-ping shrink-0" />
            <Phone className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            <span>Call Now</span>
          </a>

          <button
            onClick={handleWhatsApp}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold rounded-xl text-xs transition-all duration-200 shadow-md shadow-blue-600/30 hover:shadow-lg hover:shadow-blue-600/40 hover:-translate-y-0.5 active:scale-95"
            id="header-whatsapp-btn"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>WhatsApp</span>
          </button>
        </div>

      </div>
    </header>
  );
};
