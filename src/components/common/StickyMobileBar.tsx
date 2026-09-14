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
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 shadow-2xl">
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        
        {/* Call Now Button (Solid Blue - Matching Header Call Button) */}
        <a
          href={`tel:${businessInfo.phone}`}
          onClick={handleCallClick}
          className="flex items-center justify-center gap-2 py-3 px-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl font-bold transition-all shadow-md text-xs text-center"
        >
          <Phone className="w-4 h-4 text-white shrink-0 animate-phone-ring" />
          <span>Call Now</span>
        </a>

        {/* WhatsApp Button (Solid Orange - Matching Header WhatsApp Button) */}
        <button
          onClick={handleWhatsAppClick}
          className="flex items-center justify-center gap-2 py-3 px-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white rounded-xl font-bold transition-all shadow-md text-xs text-center cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 text-white shrink-0" />
          <span>WhatsApp</span>
        </button>

      </div>
    </div>
  );
};
