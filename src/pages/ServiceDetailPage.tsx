import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSiteContext } from '../context/SiteContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useSeo } from '../hooks/useSeo';
import { JsonLdSchema } from '../components/common/JsonLdSchema';
import { generateServiceSchema, generateFaqSchema, generateBreadcrumbSchema } from '../utils/schemaGenerator';
import { isLocalityServiceDisabled } from '../config/siteConfig';
import { CheckCircle2, ShieldCheck, Phone, MessageSquare, Clock, MapPin, Star, Wrench, ChevronRight } from 'lucide-react';
import { BookingForm } from '../components/booking/BookingForm';

interface ServiceDetailPageProps {
  onOpenBooking: (serviceSlug?: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ onOpenBooking }) => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const navigate = useNavigate();
  const { services, businessInfo, localities, reviews, trackEvent } = useSiteContext();

  // Match service by slug or fallback
  const service = services.find(s => s.slug === serviceSlug || s.id === serviceSlug);

  // Always call useSeo unconditionally (Rules of Hooks)
  useSeo({
    title: service?.seoTitle || `Appliance Service in Ranchi | ${businessInfo.companyName}`,
    description: service?.metaDescription || `Professional doorstep appliance repair in Ranchi, Jharkhand.`,
    canonicalPath: service ? `/${service.slug}/` : '/services/',
    noindex: !service
  });

  if (!service) {
    return (
      <div className="py-20 text-center max-w-xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Service Page Not Found</h1>
        <p className="text-slate-600 text-sm mb-6">The requested appliance service page could not be located.</p>
        <Link to="/services/" className="px-6 py-2.5 bg-brand-600 text-white rounded-xl font-bold text-sm">
          View All Ranchi Services
        </Link>
      </div>
    );
  }

  const publishedLocalities = localities.filter(l => l.status === 'published');
  const serviceReviews = reviews.filter(r => r.status === 'published' && r.service.toLowerCase().includes(service.name.toLowerCase().split(' ')[0]));

  const breadcrumbs = [
    { name: 'Services', url: '/services/' },
    { name: `${service.name} in Ranchi`, url: `/${service.slug}/` }
  ];

  const serviceSchema = generateServiceSchema(service, businessInfo);
  const faqSchema = generateFaqSchema(service.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  const handleCall = () => {
    trackEvent('call_click', `Service Page Call: ${service.name}`);
    window.location.href = `tel:${businessInfo.phone}`;
  };

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', `Service Page WhatsApp: ${service.name}`);
    const msg = encodeURIComponent(`Hello ${businessInfo.companyName}, I need doorstep ${service.name} in Ranchi.`);
    window.open(`https://wa.me/${businessInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
  };

  return (
    <article className="py-8 bg-slate-50 min-h-screen">
      <JsonLdSchema schema={[serviceSchema, faqSchema, breadcrumbSchema]} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Banner for Service */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 mb-12 relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                Ranchi Doorstep Specialist
              </div>

              {/* H1 Heading */}
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {service.name} in Ranchi
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {service.fullDesc}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold pt-2 text-slate-300">
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <Clock className="w-4 h-4 text-blue-400" />
                  30-Min Doorstep Response
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  90-Day Parts Warranty
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 text-amber-300">
                  <Star className="w-4 h-4 fill-amber-400" />
                  Starting at ₹{service.startingPrice}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={() => onOpenBooking(service.slug)}
                  className="px-6 py-3 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 shadow-lg shadow-blue-600/25 hover:from-blue-700 hover:to-blue-800 transition-all"
                >
                  Book Doorstep Service Now
                </button>
                <button
                  onClick={handleCall}
                  className="px-5 py-3 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>Call Technician ({businessInfo.phone})</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-700 max-h-72">
                <img 
                  src={service.heroImage} 
                  alt={`${service.name} technician in Ranchi`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Content Body */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Specific Service Offerings */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <Wrench className="w-6 h-6 text-brand-600" />
                Our {service.name} Offerings in Ranchi
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.serviceOfferings.map((offering, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{offering}</div>
                      <div className="text-xs text-slate-500">Available across all Ranchi localities</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Problems We Fix */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
              <h2 className="text-2xl font-black text-slate-900 mb-4">
                Common {service.name} Problems We Diagnose & Fix
              </h2>
              <p className="text-xs text-slate-600 mb-6">
                Our technicians bring original replacement spare parts, pressure meters, and electronic testing equipment directly to your doorstep.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.problemsFixed.map((problem, idx) => (
                  <div key={idx} className="p-3 bg-brand-50/50 rounded-xl border border-brand-100 flex items-center gap-2.5 text-xs text-slate-800 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-brand-500" />
                    <span>{problem}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Brands Supported */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
              <h2 className="text-2xl font-black text-slate-900 mb-4">
                Supported {service.name} Brands
              </h2>
              <div className="flex flex-wrap gap-2">
                {service.supportedBrands.map((brand) => (
                  <span key={brand} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-800 border border-slate-200">
                    {brand}
                  </span>
                ))}
              </div>
            </section>

            {/* Ranchi Locality Coverage List */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
              <h2 className="text-2xl font-black text-slate-900 mb-4">
                {service.name} Service Localities in Ranchi
              </h2>
              <p className="text-xs text-slate-600 mb-6">
                We provide doorstep technician visits across all registered residential neighborhoods in Ranchi city:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {publishedLocalities
                  .filter((loc) => !isLocalityServiceDisabled(loc.slug, service.slug))
                  .map((loc) => (
                    <Link
                      key={loc.id}
                      to={`/service-areas/ranchi/${loc.slug}/${service.slug}/`}
                    className="p-3 bg-slate-50 hover:bg-brand-50 rounded-xl border border-slate-200 hover:border-brand-300 text-xs font-bold text-slate-800 hover:text-brand-600 flex items-center justify-between transition-colors"
                  >
                    <span>{loc.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                ))}
              </div>
            </section>

            {/* FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
                <h2 className="text-2xl font-black text-slate-900 mb-6">
                  {service.name} FAQs (Ranchi)
                </h2>
                <div className="space-y-4">
                  {service.faqs.map((faq, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="font-bold text-slate-900 text-sm mb-1">{faq.question}</div>
                      <div className="text-xs text-slate-600 leading-relaxed">{faq.answer}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Sidebar Booking Widget & Immediate Contact */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-24">
              <BookingForm 
                initialServiceId={service.slug}
                onSuccess={() => onOpenBooking(service.slug)}
                isModal={true}
              />

              {/* Direct Phone / WhatsApp Contact Card */}
              <div className="mt-6 p-6 bg-brand-900 text-white rounded-3xl shadow-xl space-y-4 border border-brand-800">
                <div className="font-extrabold text-base text-white">
                  Speak Directly with Ranchi Service Manager
                </div>
                <p className="text-xs text-slate-300">
                  Prefer discussing over phone or sending photos of your damaged appliance? Contact our Ranchi team:
                </p>

                <div className="space-y-2.5">
                  <button
                    onClick={handleCall}
                    className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md"
                  >
                    <Phone className="w-4 h-4" />
                    Call {businessInfo.phone}
                  </button>

                  <button
                    onClick={handleWhatsApp}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    WhatsApp Chat
                  </button>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </article>
  );
};
