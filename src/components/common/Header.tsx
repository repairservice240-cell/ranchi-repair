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
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm transition-all duration-300">
      <div className="w-full px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2">

        {/* Logo & Company Name */}
        <Link to="/" className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 group min-w-0" aria-label="Home">
          <img
            src="/logo.png"
            alt={businessInfo.companyName}
            className="h-8 sm:h-11 w-auto object-contain group-hover:scale-105 transition-transform duration-300 shrink-0"
          />
          <span className="text-base sm:text-2xl font-black tracking-tight text-slate-900 leading-none whitespace-nowrap">
            <span className="text-blue-600">Ranchi</span>
            <span className="text-orange-500 ml-0.5 sm:ml-1">Repair</span>
          </span>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">

          {/* Call Button — icon only on xs, full on sm+ */}
          <a
            href={`tel:${businessInfo.phone}`}
            onClick={handleCall}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2
                       px-2.5 sm:px-5 py-2 sm:py-2
                       bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg
                       text-xs sm:text-sm transition-all duration-200
                       shadow-md hover:-translate-y-0.5 active:scale-95"
            id="header-call-btn"
            aria-label="Call us"
          >
            <Phone className="w-4 h-4 sm:w-4 sm:h-4 text-white shrink-0" />
            {/* Phone number: hidden on xs, short on sm, full on md+ */}
            <span className="hidden sm:inline whitespace-nowrap">+91 {businessInfo.phone}</span>
          </a>

          {/* WhatsApp Button — icon only on xs, full on sm+ */}
          <button
            onClick={handleWhatsApp}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2
                       px-2.5 sm:px-5 py-2 sm:py-2
                       bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg
                       text-xs sm:text-sm transition-all duration-200
                       shadow-md hover:-translate-y-0.5 active:scale-95"
            id="header-whatsapp-btn"
            aria-label="WhatsApp us"
          >
            <MessageCircle className="w-4 h-4 sm:w-4 sm:h-4 text-white shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">WhatsApp</span>
          </button>

        </div>

      </div>
    </header>
  );
};
