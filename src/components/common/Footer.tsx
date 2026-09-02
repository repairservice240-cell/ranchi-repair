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
      <div className="w-full h-1 bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600 shadow-md relative z-20" />

      <footer className="bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden shadow-2xl border-t border-blue-900/40 pt-16 pb-36 lg:pb-16">
        
        {/* Background Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 pb-12 border-b border-slate-800/80">

            {/* Col 1 – Brand */}
            <div className="space-y-4">
              <Link to="/" className="group flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/35 border border-blue-400/30 group-hover:scale-105 transition-transform duration-300">
                  <span className="text-white font-black text-xl">R</span>
                </div>
                <span className="text-white font-black text-lg tracking-tight group-hover:text-blue-400 transition-colors">
                  {businessInfo.companyName}
                </span>
              </Link>

              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {taglineText}. Serving Ranchi, Jharkhand with certified doorstep technicians.
              </p>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-extrabold shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Serving Ranchi, Jharkhand Only</span>
              </div>

              {/* Quick Action Pill Buttons */}
              <div className="flex items-center gap-2.5 pt-2">
                <button
                  onClick={handleCall}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white rounded-xl text-xs font-extrabold border border-blue-500/30 transition-all shadow-xs group"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-400 group-hover:text-white transition-colors" />
                  <span>Call Now</span>
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-xl text-xs font-extrabold border border-emerald-500/30 transition-all shadow-xs group"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:text-white transition-colors" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Col 2 – Areas */}
            <div>
              <h3 className="text-white font-extrabold text-sm mb-4 tracking-wider uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Ranchi Service Areas
              </h3>
              <ul className="space-y-2.5">
                {publishedLocalities.map(l => (
                  <li key={l.id}>
                    <Link
                      to={`/service-areas/ranchi/${l.slug}/`}
                      className="group flex items-center gap-2 text-xs text-slate-300 hover:text-blue-400 font-medium transition-all duration-200"
                    >
                      <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-blue-400 group-hover:scale-125 transition-all shrink-0" />
                      <span className="group-hover:translate-x-1 transition-transform">{l.name}</span>
                    </Link>
                  </li>
                ))}
                <li className="pt-1">
                  <Link to="/service-areas/" className="text-xs font-extrabold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                    <span>View All Areas</span>
                    <span>→</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4 – Company Info */}
            <div>
              <h3 className="text-white font-extrabold text-sm mb-4 tracking-wider uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
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
                      className="group flex items-center gap-2 text-xs text-slate-300 hover:text-blue-400 font-medium transition-all duration-200"
                    >
                      <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-blue-400 group-hover:scale-125 transition-all shrink-0" />
                      <span className="group-hover:translate-x-1 transition-transform">{l.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex items-start gap-2 text-xs text-slate-300 font-medium">
                <Clock className="w-3.5 h-3.5 mt-0.5 text-amber-400 shrink-0" />
                <span>{hoursText}</span>
              </div>
              
              <div className="flex items-start gap-2 text-xs text-slate-300 font-medium mt-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 text-blue-400 shrink-0" />
                <span>{addressText}, Ranchi</span>
              </div>
            </div>
          </div>

          {/* Footer CTA Section */}
          <div className="my-8 py-6 px-6 sm:px-8 bg-slate-800/40 rounded-3xl border border-slate-700/60 backdrop-blur-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-extrabold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>24/7 Fast Doorstep Technician Response</span>
              </div>
              <h4 className="text-lg sm:text-xl font-black text-white tracking-tight">
                Need Urgent Appliance Repair in Ranchi?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                Connect directly with certified technicians for instant booking & doorstep service.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              <a
                href={`tel:${businessInfo.phone}`}
                onClick={handleCall}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold rounded-xl text-xs sm:text-sm transition-all duration-200 shadow-lg shadow-emerald-600/35 border border-emerald-400/40 animate-pulse hover:animate-none hover:-translate-y-0.5 active:scale-95 group cursor-pointer"
                id="footer-call-btn"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-ping shrink-0" />
                <Phone className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span>Call Now</span>
              </a>

              <button
                onClick={handleWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold rounded-xl text-xs sm:text-sm transition-all duration-200 shadow-md shadow-blue-600/30 hover:shadow-lg hover:shadow-blue-600/40 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                id="footer-whatsapp-btn"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-medium">
            <p>© {new Date().getFullYear()} {businessInfo.companyName}. All rights reserved. Serving Ranchi, Jharkhand.</p>
            <p className="font-bold text-blue-400">Home Appliance Repair &amp; Service in Ranchi</p>
          </div>
        </div>
      </footer>
    </>
  );
};
