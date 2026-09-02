import React from 'react';
import { CheckCircle2, Phone, MessageSquare, X, MapPin, Wrench, ShieldCheck } from 'lucide-react';
import { ServiceBookingLead } from '../../types';
import { useSiteContext } from '../../context/SiteContext';

interface BookingSuccessModalProps {
  lead: ServiceBookingLead;
  onClose: () => void;
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({ lead, onClose }) => {
  const { businessInfo, trackEvent } = useSiteContext();

  const handleCallNow = () => {
    trackEvent('call_click', 'Booking Confirmation Phone Click');
    window.location.href = `tel:${businessInfo.phone}`;
  };

  const handleWhatsAppNow = () => {
    trackEvent('whatsapp_click', 'Booking Confirmation WhatsApp Click');
    const msg = encodeURIComponent(
      `Hello ${businessInfo.companyName}, I just submitted a booking request for ${lead.appliance} in ${lead.locality}, Ranchi. Request ID: ${lead.id}`
    );
    window.open(`https://wa.me/${businessInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl relative border border-slate-100 max-h-[90vh] overflow-y-auto my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors z-10"
          aria-label="Close window"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 shrink-0 shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="text-center mb-5">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Booking Confirmed!
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Thank you, <strong className="text-slate-900">{lead.name}</strong>. Your doorstep appliance repair request has been registered.
          </p>
        </div>

        {/* Lead Details Box */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs text-slate-700 mb-5">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
            <span className="text-slate-500 font-medium">Service Request ID:</span>
            <span className="font-mono font-bold text-blue-600">{lead.id}</span>
          </div>

          <div className="flex items-center justify-between pt-0.5">
            <span className="flex items-center gap-1.5 text-slate-500 font-medium">
              <Wrench className="w-3.5 h-3.5 text-slate-400" />
              Appliance & Service:
            </span>
            <span className="font-bold text-slate-900">{lead.appliance}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-500 font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Ranchi Area:
            </span>
            <span className="font-bold text-slate-900">{lead.locality}, Ranchi</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-500 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Doorstep Response:
            </span>
            <span className="font-bold text-emerald-700">30-60 Min Arrival</span>
          </div>
        </div>

        {/* Immediate Call / WhatsApp CTAs */}
        <div className="space-y-3">
          <p className="text-[11px] text-center font-bold text-slate-500 uppercase tracking-wider">
            Need Faster Response? Connect directly with local technician:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleCallNow}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now ({businessInfo.phone})</span>
            </button>

            <button
              onClick={handleWhatsAppNow}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Message</span>
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 text-xs font-bold text-slate-500 hover:text-slate-800 py-1 transition-colors cursor-pointer"
        >
          Close Window
        </button>

      </div>
    </div>
  );
};
