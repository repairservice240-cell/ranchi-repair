import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSiteContext } from '../../context/SiteContext';
import { Phone, MessageCircle, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: (serviceSlug?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const { businessInfo, trackEvent } = useSiteContext();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleCall = () => {
    trackEvent('call_click', `Header: ${businessInfo.phone}`);
    window.location.href = `tel:${businessInfo.phone}`;
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between flex-wrap">

        {/* Logo */}
        <Link to="/" className="group flex items-center gap-2.5" aria-label="Home">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-600/30 group-hover:scale-105 transition-transform duration-300">
            <span className="text-white font-black text-xl">R</span>
          </div>
          <span className="text-lg font-extrabold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors duration-200">
            {businessInfo.companyName}
          </span>
        </Link>

        {/* Desktop CTAs */}
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

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-slate-700 hover:bg-slate-100/80 rounded-xl transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu — Call & WhatsApp */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 py-4 shadow-xl">
          <div className="flex gap-2.5">
            <a
              href={`tel:${businessInfo.phone}`}
              onClick={() => { handleCall(); setMobileOpen(false); }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold rounded-xl text-sm transition-all shadow-lg shadow-emerald-600/35 border border-emerald-400/40 animate-pulse active:scale-95"
              id="header-mobile-call-btn"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping shrink-0" />
              <Phone className="w-4 h-4 text-white" /> Call Now
            </a>
            <button
              onClick={() => { handleWhatsApp(); setMobileOpen(false); }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white rounded-xl text-sm font-extrabold shadow-md shadow-blue-600/30 active:scale-95"
              id="header-mobile-whatsapp-btn"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
