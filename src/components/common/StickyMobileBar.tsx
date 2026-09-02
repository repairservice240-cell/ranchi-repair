import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { useSiteContext } from '../../context/SiteContext';
import { trackPhoneClick, trackWhatsappClick } from '../../utils/analytics';

interface StickyMobileBarProps {
  onOpenBooking: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = () => {
  const { businessInfo, trackEvent } = useSiteContext();

  const handleCallClick = () => {
    trackEvent('call_click', 'Sticky Mobile Bar Phone Click');
    trackPhoneClick('StickyMobileBar');
    window.location.href = `tel:${businessInfo.phone}`;
  };

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', 'Sticky Mobile Bar WhatsApp Click');
    trackWhatsappClick('StickyMobileBar');
    const message = encodeURIComponent(`Hello ${businessInfo.companyName}, I need doorstep appliance repair in Ranchi.`);
    window.open(`https://wa.me/91${businessInfo.whatsapp.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-2.5 shadow-2xl">
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        
        {/* Call Now Button (Glowing Emerald Green) */}
        <a
          href={`tel:${businessInfo.phone}`}
          onClick={handleCallClick}
          className="flex items-center justify-center gap-2 py-3 px-3 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 border border-emerald-400/40 active:scale-95 text-white rounded-xl font-extrabold transition-all shadow-lg shadow-emerald-600/35 animate-pulse text-xs text-center"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-ping shrink-0" />
          <Phone className="w-4 h-4 text-white shrink-0" />
          <span>Call Now</span>
        </a>

        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsAppClick}
          className="flex items-center justify-center gap-2 py-3 px-3 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 active:scale-95 text-white rounded-xl font-extrabold transition-all shadow-md shadow-blue-600/30 text-xs text-center cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 text-white shrink-0" />
          <span>WhatsApp</span>
        </button>

      </div>
    </div>
  );
};
