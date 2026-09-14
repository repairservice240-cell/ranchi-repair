import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSiteContext } from '../../context/SiteContext';
import { Phone, MessageCircle } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: (serviceSlug?: string) => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const { businessInfo, trackEvent } = useSiteContext();
  const location = useLocation();

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

  const navLinks = [
    { label: 'Home',      href: '/'          },
    { label: 'Services',  href: '/services/' },
    { label: 'About Us',  href: '/about-us/' },
    { label: 'Why Us',    href: '/#why-us'   },
    { label: 'Contact',   href: '/contact/'  },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0" aria-label="Home">
          <img
            src="/logo.png"
            alt={businessInfo.companyName}
            className="h-10 sm:h-12 w-auto object-contain hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className={`nav-link${location.pathname === link.href ? ' active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Direct Phone Link */}
        <a
          href={`tel:${businessInfo.phone}`}
          onClick={handleCall}
          className="md:hidden inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs shadow-md active:scale-95 transition-all shrink-0"
          id="header-mobile-phone-btn"
          aria-label={`Call ${businessInfo.phone}`}
        >
          <Phone className="w-3.5 h-3.5 text-white shrink-0" />
          <span className="tracking-tight whitespace-nowrap">{businessInfo.phone}</span>
        </a>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={`tel:${businessInfo.phone}`}
            onClick={handleCall}
            className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm transition-all duration-200 shadow-md hover:-translate-y-0.5 active:scale-95 group"
            id="header-call-btn"
          >
            <Phone className="w-4 h-4 text-white" />
            <span>+91 {businessInfo.phone}</span>
          </a>

          <button
            onClick={handleWhatsApp}
            className="inline-flex items-center gap-2 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg text-sm transition-all duration-200 shadow-md hover:-translate-y-0.5 active:scale-95"
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
