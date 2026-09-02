import React from 'react';
import { useSiteContext } from '../context/SiteContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useSeo } from '../hooks/useSeo';
import { Phone, MessageSquare, Mail, MapPin, Clock, ExternalLink, ShieldCheck } from 'lucide-react';
import { JsonLdSchema } from '../components/common/JsonLdSchema';
import { generateBreadcrumbSchema, generateLocalBusinessSchema } from '../utils/schemaGenerator';

export const ContactPage: React.FC = () => {
  const { businessInfo, trackEvent } = useSiteContext();

  useSeo({
    title: `Contact Us | ${businessInfo.companyName} Ranchi`,
    description: `Contact ${businessInfo.companyName} for doorstep AC, washing machine, fridge, microwave & geyser repair in Ranchi. Phone: ${businessInfo.phone}, Office: ${businessInfo.officeAddress}, Ranchi, Jharkhand.`,
    canonicalPath: '/contact/'
  });

  const breadcrumbs = [{ name: 'Contact Us', url: '/contact/' }];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const localBusinessSchema = generateLocalBusinessSchema(businessInfo);

  const handleCall = () => {
    trackEvent('call_click', 'Contact Page Phone Click');
    window.location.href = `tel:${businessInfo.phone}`;
  };

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', 'Contact Page WhatsApp Click');
    const msg = encodeURIComponent(`Hello ${businessInfo.companyName}, I want to contact you for doorstep appliance service in Ranchi.`);
    window.open(`https://wa.me/${businessInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <JsonLdSchema schema={[breadcrumbSchema, localBusinessSchema]} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            Local Ranchi Contact Hub
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Contact {businessInfo.companyName}
          </h1>
          <p className="text-slate-600 text-base mt-2">
            Servicing exclusively within Ranchi, Jharkhand, India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* NAP Information Cards */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Office Address</div>
                  <div className="font-extrabold text-slate-900 text-base mt-1">{businessInfo.officeAddress}</div>
                  <div className="text-xs text-slate-500">{businessInfo.area}, Ranchi, Jharkhand - {businessInfo.pincode}</div>
                  <div className="text-xs font-bold text-emerald-600 mt-1 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Strictly Servicing Ranchi City Limits
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone Booking</div>
                  <button onClick={handleCall} className="font-black text-slate-900 text-lg hover:text-brand-600 transition-colors block mt-1">
                    {businessInfo.phone}
                  </button>
                  <div className="text-xs text-slate-500">Tap to call our Ranchi helpline</div>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">WhatsApp Helpline</div>
                  <button onClick={handleWhatsApp} className="font-black text-emerald-600 text-lg hover:underline transition-colors block mt-1">
                    {businessInfo.whatsapp}
                  </button>
                  <div className="text-xs text-slate-500">Fast photo & address sharing on WhatsApp</div>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</div>
                  <a href={`mailto:${businessInfo.email}`} className="font-bold text-slate-900 text-sm hover:underline block mt-1">
                    {businessInfo.email}
                  </a>
                  <div className="text-xs text-slate-500">For commercial & AMC enquiries</div>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Business Working Hours</div>
                  <div className="font-bold text-slate-900 text-sm mt-1">{businessInfo.businessHours}</div>
                  <div className="text-xs text-slate-500">7 Days Doorstep Service Available</div>
                </div>
              </div>

            </div>
          </div>

          {/* Action CTAs & Maps Info */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-brand-900 text-white rounded-3xl p-6 sm:p-8 border border-brand-800 shadow-xl space-y-6">
              <h2 className="text-2xl font-black text-white">
                Request Immediate Ranchi Technician Dispatch
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect with our local customer support manager to confirm technician visit timings in Morabadi, Kanke, Doranda, Harmu, Hatia, Lalpur, Bariatu, or any Ranchi locality.
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleCall}
                  className="w-full py-4 rounded-xl bg-brand-500 hover:bg-brand-600 font-extrabold text-white text-sm flex items-center justify-center gap-2 shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  Call Customer Helpline ({businessInfo.phone})
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-extrabold text-white text-sm flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageSquare className="w-5 h-5" />
                  WhatsApp Direct Message
                </button>
              </div>

              {businessInfo.googleMapsUrl && businessInfo.googleMapsUrl !== '[GOOGLE MAPS URL]' && (
                <div className="pt-4 border-t border-brand-800">
                  <a 
                    href={businessInfo.googleMapsUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:underline"
                  >
                    <span>View Official Office Location on Google Maps</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
