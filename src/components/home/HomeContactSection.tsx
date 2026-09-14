import React from 'react';
import { useSiteContext } from '../../context/SiteContext';
import { Phone, MessageCircle, Mail, MapPin, Clock, ShieldCheck, ThumbsUp } from 'lucide-react';

interface HomeContactSectionProps {
  onOpenBooking: () => void;
}

export const HomeContactSection: React.FC<HomeContactSectionProps> = ({ onOpenBooking }) => {
  const { businessInfo, trackEvent } = useSiteContext();

  const handleCall = () => {
    trackEvent('call_click', `Home Contact Section: ${businessInfo.phone}`);
    window.location.href = `tel:${businessInfo.phone}`;
  };

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', `Home Contact Section: ${businessInfo.whatsapp}`);
    window.open(
      `https://wa.me/91${businessInfo.whatsapp.replace(/\D/g, '')}?text=Hi%2C%20I%20need%20appliance%20repair%20service%20in%20Ranchi.`,
      '_blank'
    );
  };

  const displayPhone = businessInfo.phone && !businessInfo.phone.includes('[') ? businessInfo.phone : '8229893196';
  const hoursText = businessInfo.businessHours && !businessInfo.businessHours.includes('[') ? businessInfo.businessHours : 'Mon - Sun: 8:00 AM - 9:00 PM';
  const emailText = businessInfo.email && !businessInfo.email.includes('[') ? businessInfo.email : 'repairservice240@gmail.com';
  const addressText = businessInfo.officeAddress && !businessInfo.officeAddress.includes('[') ? businessInfo.officeAddress : 'Lac Factory Road, Hindpiri';

  return (
    <section id="contact" className="py-16 md:py-24 bg-white border-y border-slate-200/80 relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left Column – Contact Information & Appliance Graphic */}
          <div className="lg:col-span-7">

            {/* Top Badge */}
            <div className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span>GET IN TOUCH</span>
              <span className="w-8 h-0.5 bg-orange-500 rounded-full inline-block" />
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
              We're Here to <span className="text-blue-600">Help!</span>
            </h2>

            {/* Description */}
            <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed max-w-lg mb-8">
              Have a question, need support, or want to book a service? Reach out to us – we'll get back to you as soon as possible.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 items-center">
              
              {/* Contact Info Rows */}
              <div className="space-y-5">
                
                {/* Call Us Row */}
                <div className="flex items-center gap-4 group cursor-pointer" onClick={handleCall}>
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform duration-300">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-0.5">Call Us</div>
                    <button className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors block">
                      +91 {displayPhone}
                    </button>
                  </div>
                </div>

                {/* WhatsApp Us Row */}
                <div className="flex items-center gap-4 group cursor-pointer" onClick={handleWhatsApp}>
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform duration-300">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider mb-0.5">WhatsApp Us</div>
                    <button className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors block">
                      +91 {displayPhone}
                    </button>
                  </div>
                </div>

                {/* Working Hours Row */}
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-amber-600 uppercase tracking-wider mb-0.5">Working Hours</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900">
                      {hoursText}
                    </div>
                  </div>
                </div>

              </div>

              {/* Appliance Showcase Image */}
              <div className="flex items-center justify-center p-2 my-4 sm:my-0">
                <img
                  src="/images/user-appliance-showcase.png"
                  alt="Ranchi Repair AC Fridge Washing Machine Appliances"
                  className="w-full max-w-[280px] sm:max-w-[320px] h-auto object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-300"
                />
              </div>

            </div>

          </div>

          {/* Right Column – Request Immediate Dispatch Card */}
          <div className="lg:col-span-5 flex items-center">
            <div className="w-full bg-slate-900 rounded-2xl p-7 sm:p-8 shadow-xl relative overflow-hidden">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug mb-3 relative z-10">
                Request Immediate Ranchi<br />Technician Dispatch
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-normal mb-6 leading-relaxed relative z-10">
                Connect with our local customer support manager to confirm technician visit timings in
                Morabadi, Kanke, Doranda, Harmu, Hatia, Lalpur, Bariatu, or any Ranchi locality.
              </p>

              {/* Call Button */}
              <button
                onClick={handleCall}
                id="home-dispatch-call-btn"
                className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm sm:text-base shadow-md transition-all active:scale-95 mb-3 relative z-10"
              >
                <Phone className="w-5 h-5" />
                Call Customer Helpline ({businessInfo.phone})
              </button>

              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsApp}
                id="home-dispatch-whatsapp-btn"
                className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base shadow-md transition-all active:scale-95 relative z-10"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Direct Message
              </button>
            </div>
          </div>

        </div>

        {/* Bottom 4 Feature / Info Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          
          {/* Card 1: Our Location */}
          <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex items-center gap-4 text-center sm:text-left group hover:-translate-y-0.5">
            <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mx-auto sm:mx-0 shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Our Location</div>
              <div className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">{addressText}, Ranchi</div>
            </div>
          </div>

          {/* Card 2: Email Us */}
          <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex items-center gap-4 text-center sm:text-left group hover:-translate-y-0.5">
            <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mx-auto sm:mx-0 shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Email Us</div>
              <a href={`mailto:${emailText}`} className="text-[11px] text-blue-600 font-bold leading-tight mt-0.5 block hover:underline">
                {emailText}
              </a>
            </div>
          </div>

          {/* Card 3: Trusted Service */}
          <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex items-center gap-4 text-center sm:text-left group hover:-translate-y-0.5">
            <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mx-auto sm:mx-0 shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Trusted Service</div>
              <div className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">Certified Technicians • Quality Repairs</div>
            </div>
          </div>

          {/* Card 4: Customer Satisfaction */}
          <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex items-center gap-4 text-center sm:text-left group hover:-translate-y-0.5">
            <div className="w-11 h-11 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 mx-auto sm:mx-0 shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <ThumbsUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-orange-600 transition-colors">Customer Satisfaction</div>
              <div className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">Your Satisfaction • Our Priority</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
