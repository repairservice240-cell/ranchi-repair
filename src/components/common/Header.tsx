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
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-xs transition-all duration-300">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">

        {/* Logo (Shifted to Far Left Edge) */}
        <Link to="/" className="flex items-center shrink-0" aria-label="Home">
          <img
            src="/logo.png"
            alt={businessInfo.companyName}
            className="h-10 sm:h-12 w-auto object-contain hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Action Buttons (Shifted to Far Right Edge) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${businessInfo.phone}`}
            onClick={handleCall}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs sm:text-sm transition-all duration-200 shadow-md hover:-translate-y-0.5 active:scale-95 group"
            id="header-call-btn"
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
            <span className="whitespace-nowrap">+91 {businessInfo.phone}</span>
          </a>

          <button
            onClick={handleWhatsApp}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg text-xs sm:text-sm transition-all duration-200 shadow-md hover:-translate-y-0.5 active:scale-95"
            id="header-whatsapp-btn"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
            <span className="whitespace-nowrap">WhatsApp</span>
          </button>
        </div>

      </div>
    </header>
  );
};
