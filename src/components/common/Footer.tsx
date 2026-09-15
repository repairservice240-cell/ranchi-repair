import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react';
import { useSiteContext } from '../../context/SiteContext';

export const Footer: React.FC = () => {
  const { businessInfo, socialLinks, services, localities, trackEvent } = useSiteContext();
  const publishedLocalities = localities.filter(l => l.status === 'published').slice(0, 10);

  const handleCall = () => {
    trackEvent('call_click', 'Footer');
    window.location.href = `tel:${businessInfo.phone}`;
  };

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', 'Footer');
    const msg = encodeURIComponent(`Hello ${businessInfo.companyName}, I need appliance repair in Ranchi.`);
    window.open(`https://wa.me/91${businessInfo.whatsapp.replace(/\D/g, '')}?text=${msg}`, '_blank');
  };

  const taglineText = businessInfo.tagline && !businessInfo.tagline.includes('[') ? businessInfo.tagline : 'Expert Doorstep Appliance Repair Service';
  const hoursText = businessInfo.businessHours && !businessInfo.businessHours.includes('[') ? businessInfo.businessHours : '8:00 AM - 9:00 PM (All 7 Days)';
  const addressText = businessInfo.officeAddress && !businessInfo.officeAddress.includes('[') ? businessInfo.officeAddress : 'Lac Factory Road, Hindpiri';

  return (
    <>
      {/* Top Gradient Accent Divider Bar */}
      <div className="w-full h-1 bg-gradient-to-r from-blue-600 via-orange-500 to-blue-600 relative z-20" />

      <footer className="bg-slate-900 text-white relative pt-10 sm:pt-16 pb-36 lg:pb-16 border-t border-slate-800">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* 1-col on mobile, 2-col on sm, 3-col on md */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 pb-10 border-b border-slate-800">

            {/* Col 1 – Brand: full width on mobile */}
            <div className="sm:col-span-2 md:col-span-1 space-y-3 sm:space-y-4">
              <Link to="/" className="group inline-block">
                <img
                  src="/logo.png"
                  alt={businessInfo.companyName}
                  className="h-12 sm:h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                />
              </Link>

              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {taglineText}. Serving Ranchi, Jharkhand with certified doorstep technicians.
              </p>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/60 text-blue-300 border border-blue-700/50 text-xs font-bold">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span>Serving Ranchi, Jharkhand Only</span>
              </div>

              {/* Quick Action Pill Buttons */}
              <div className="flex items-center gap-2.5 pt-2">
                <button
                  onClick={handleCall}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm group"
                >
                  <Phone className="w-3.5 h-3.5 text-white shrink-0 animate-phone-ring" />
                  <span>{businessInfo.phone}</span>
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm group"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Col 2 – Areas */}
            <div>
              <h3 className="text-white font-extrabold text-sm mb-4 tracking-wider uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                Ranchi Service Areas
              </h3>
              <ul className="space-y-2.5">
                {publishedLocalities.map(l => (
                  <li key={l.id}>
                    <Link
                      to={`/service-areas/ranchi/${l.slug}/`}
                      className="group flex items-center gap-2 text-xs text-slate-300 hover:text-blue-400 font-normal transition-all duration-200"
                    >
                      <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-blue-400 group-hover:scale-125 transition-all shrink-0" />
                      <span className="group-hover:translate-x-1 transition-transform">{l.name}</span>
                    </Link>
                  </li>
                ))}
                <li className="pt-1">
                  <Link to="/service-areas/" className="text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1">
                    <span>View All Areas</span>
                    <span>→</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3 – Company Info */}
            <div>
              <h3 className="text-white font-extrabold text-sm mb-4 tracking-wider uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                Company
              </h3>
              <ul className="space-y-2.5 mb-5">
                {[
                  { label: 'About Us', href: '/about-us/' },
                  { label: 'Reviews', href: '/reviews/' },
                  { label: 'FAQ', href: '/faq/' },
                  { label: 'Blog', href: '/blog/' },
                  { label: 'Contact Us', href: '/contact/' },
                  { label: 'Privacy Policy', href: '/privacy-policy/' },
                  { label: 'Terms & Conditions', href: '/terms-and-conditions/' },
                ].map(l => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className="group flex items-center gap-2 text-xs text-slate-300 hover:text-blue-400 font-normal transition-all duration-200"
                    >
                      <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-blue-400 group-hover:scale-125 transition-all shrink-0" />
                      <span className="group-hover:translate-x-1 transition-transform">{l.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex items-start gap-2 text-xs text-slate-300 font-normal">
                <Clock className="w-3.5 h-3.5 mt-0.5 text-orange-400 shrink-0" />
                <span>{hoursText}</span>
              </div>
              
              <div className="flex items-start gap-2 text-xs text-slate-300 font-normal mt-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 text-blue-400 shrink-0" />
                <span>{addressText}, Ranchi</span>
              </div>
            </div>
          </div>

          {/* Footer CTA Section */}
          <div className="my-8 py-6 px-6 sm:px-8 bg-slate-800/80 rounded-2xl border border-slate-700/80 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 text-blue-300 border border-blue-700/50 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>24/7 Fast Doorstep Technician Response</span>
              </div>
              <h4 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                Need Urgent Appliance Repair in Ranchi?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 font-normal">
                Connect directly with certified technicians for instant booking & doorstep service.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              <a
                href={`tel:${businessInfo.phone}`}
                onClick={handleCall}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs sm:text-sm transition-all duration-200 shadow-md active:scale-95 group cursor-pointer"
                id="footer-call-btn"
              >
                <Phone className="w-4 h-4 text-white animate-phone-ring" />
                <span>Call {businessInfo.phone}</span>
              </a>

              <button
                onClick={handleWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-xl text-xs sm:text-sm transition-all duration-200 shadow-md active:scale-95 cursor-pointer"
                id="footer-whatsapp-btn"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-normal">
            <p>© {new Date().getFullYear()} {businessInfo.companyName}. All rights reserved. Serving Ranchi, Jharkhand.</p>
            <p className="font-bold text-orange-400">Home Appliance Repair &amp; Service in Ranchi</p>
          </div>
        </div>
      </footer>
    </>
  );
};
