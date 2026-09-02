import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSiteContext } from '../context/SiteContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useSeo } from '../hooks/useSeo';
import { JsonLdSchema } from '../components/common/JsonLdSchema';
import { generateServiceSchema, generateBreadcrumbSchema } from '../utils/schemaGenerator';
import { isLocalityServiceDisabled } from '../config/siteConfig';
import { MapPin, Navigation, CheckCircle2, ShieldCheck, Clock, Phone, MessageSquare, Wrench } from 'lucide-react';
import { BookingForm } from '../components/booking/BookingForm';

interface LocalityDetailPageProps {
  onOpenBooking: (serviceSlug?: string, localityName?: string) => void;
}

export const LocalityDetailPage: React.FC<LocalityDetailPageProps> = ({ onOpenBooking }) => {
  const { localitySlug, serviceSlug } = useParams<{ localitySlug: string; serviceSlug?: string }>();
  const { localities, services, businessInfo, trackEvent } = useSiteContext();

  const locality = localities.find(l => l.slug === localitySlug || l.id === localitySlug);
  const matchedService = serviceSlug ? services.find(s => s.slug === serviceSlug || s.id === serviceSlug) : undefined;
  const isPageDisabled = Boolean(localitySlug && serviceSlug && isLocalityServiceDisabled(localitySlug, serviceSlug));

  // Compute SEO values (may be empty strings when locality is not found — hook must always be called)
  const isDraft = locality?.status === 'draft';
  const pageTitle = locality && !isPageDisabled
    ? matchedService
      ? `${matchedService.name} in ${locality.name}, Ranchi | ${businessInfo.companyName}`
      : `Appliance Repair Service in ${locality.name}, Ranchi | ${businessInfo.companyName}`
    : `Locality Page Not Found | ${businessInfo.companyName}`;

  const pageDesc = locality && !isPageDisabled
    ? matchedService
      ? `Doorstep ${matchedService.name} in ${locality.name}, Ranchi (${locality.pincode}). Certified local technicians, fast 30-minute doorstep response, 90-day parts warranty.`
      : `Fast doorstep AC, washing machine, fridge, microwave & geyser repair service in ${locality.name}, Ranchi. Certified technicians near ${locality.landmarks[0] || 'your area'}.`
    : '';

  const canonical = locality && !isPageDisabled
    ? matchedService
      ? `/service-areas/ranchi/${locality.slug}/${matchedService.slug}/`
      : `/service-areas/ranchi/${locality.slug}/`
    : '/service-areas/ranchi/';

  // Always call useSeo unconditionally (Rules of Hooks)
  useSeo({
    title: pageTitle,
    description: pageDesc,
    canonicalPath: canonical,
    noindex: !locality || isDraft || isPageDisabled
  });

  if (!locality || isPageDisabled) {
    return (
      <div className="py-20 text-center max-w-xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Locality Page Not Found</h1>
        <p className="text-slate-600 text-sm mb-6">The requested Ranchi locality service page could not be found or is currently unavailable.</p>
        <Link to="/service-areas/ranchi/" className="px-6 py-2.5 bg-brand-600 text-white rounded-xl font-bold text-sm">
          View All Active Ranchi Localities
        </Link>
      </div>
    );
  }

  const breadcrumbs = [
    { name: 'Service Areas', url: '/service-areas/' },
    { name: 'Ranchi', url: '/service-areas/ranchi/' },
    { name: locality.name, url: `/service-areas/ranchi/${locality.slug}/` }
  ];

  if (matchedService) {
    breadcrumbs.push({
      name: `${matchedService.name}`,
      url: `/service-areas/ranchi/${locality.slug}/${matchedService.slug}/`
    });
  }

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const serviceSchema = matchedService ? generateServiceSchema(matchedService, businessInfo, locality.name) : null;

  const handleCall = () => {
    trackEvent('call_click', `Locality Call: ${locality.name}`);
    window.location.href = `tel:${businessInfo.phone}`;
  };

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', `Locality WhatsApp: ${locality.name}`);
    const msg = encodeURIComponent(`Hello ${businessInfo.companyName}, I need doorstep appliance repair in ${locality.name}, Ranchi.`);
    window.open(`https://wa.me/${businessInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
  };

  return (
    <article className="py-8 bg-slate-50 min-h-screen">
      <JsonLdSchema schema={[breadcrumbSchema, serviceSchema]} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={breadcrumbs} />

        {/* Draft Notice Banner (if draft mode) */}
        {isDraft && (
          <div className="mb-6 p-4 bg-amber-100 border-l-4 border-amber-500 text-amber-900 rounded-r-xl text-xs font-bold">
            ⚠️ This locality page is currently in <strong>DRAFT MODE</strong>. It is set to noindex and visible for admin preview.
          </div>
        )}

        {/* Hero Section – Vibrant Golden Yellow & Amber Gradient Theme */}
        <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 rounded-3xl p-6 sm:p-10 mb-12 relative overflow-hidden shadow-2xl border-2 border-amber-300">
          
          {/* Subtle Radial Glow */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-yellow-200/50 blur-[100px] pointer-events-none rounded-full" />

          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-950 text-amber-300 border border-slate-800 text-xs font-black uppercase tracking-wider shadow-md">
              <Navigation className="w-3.5 h-3.5 text-amber-400" />
              <span>Doorstep Service Hub: {locality.name}, Ranchi ({locality.pincode})</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              {matchedService ? `${matchedService.name} in ${locality.name}, Ranchi` : `Home Appliance Repair in ${locality.name}, Ranchi`}
            </h1>

            <p className="text-slate-900 text-sm sm:text-base font-extrabold leading-relaxed">
              {locality.description} Our certified engineers provide 30-minute doorstep visits across {locality.name} and surrounding landmarks.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs font-black pt-2">
              <div className="flex items-center gap-1.5 bg-white/90 px-3.5 py-1.5 rounded-xl border border-amber-500/40 text-slate-950 shadow-xs">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>30-60 Min Arrival</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/90 px-3.5 py-1.5 rounded-xl border border-amber-500/40 text-slate-950 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>90-Day Parts Warranty</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/90 px-3.5 py-1.5 rounded-xl border border-amber-500/40 text-slate-950 shadow-xs">
                <MapPin className="w-4 h-4 text-amber-700" />
                <span>Doorstep Visit in {locality.pincode}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={() => onOpenBooking(matchedService?.slug, locality.name)}
                className="px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-xl shadow-blue-600/35 hover:shadow-blue-500/50 hover:-translate-y-0.5 active:scale-95 border border-blue-400/30"
              >
                Book Technician in {locality.name}
              </button>

              <button
                onClick={handleCall}
                className="px-5 py-3.5 rounded-2xl font-black text-xs sm:text-sm text-white bg-slate-950 hover:bg-slate-900 transition-all duration-200 shadow-md border border-slate-800 flex items-center gap-2 group active:scale-95"
              >
                <Phone className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>Call Now</span>
              </button>

              <button
                onClick={handleWhatsApp}
                className="px-5 py-3.5 rounded-2xl font-black text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-all duration-200 shadow-md border border-emerald-500 flex items-center gap-2 group active:scale-95"
              >
                <MessageSquare className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-8 space-y-10">
            
            {/* Landmark Service Coverage */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
              <h2 className="text-2xl font-black text-slate-900 mb-4">
                Landmarks Covered in {locality.name}
              </h2>
              <p className="text-xs text-slate-600 mb-6">
                Our technicians carry specialized repair tools and original spare parts near all key locations in {locality.name}:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {locality.landmarks.map((lm, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2.5 text-xs text-slate-800 font-bold">
                    <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
                    <span>{lm}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Services Available in this Locality */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
              <h2 className="text-2xl font-black text-slate-900 mb-6">
                Appliance Services Available in {locality.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services
                  .filter((serv) => !isLocalityServiceDisabled(locality.slug, serv.slug))
                  .map((serv) => (
                    <Link
                      key={serv.id}
                      to={`/service-areas/ranchi/${locality.slug}/${serv.slug}/`}
                    className="p-5 rounded-2xl bg-gradient-to-br from-amber-300/40 via-yellow-200/30 to-amber-400/20 border-2 border-amber-300/90 hover:border-amber-400 shadow-md hover:shadow-xl hover:shadow-amber-400/25 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="font-black text-slate-950 group-hover:text-blue-700 text-base transition-colors">
                          {serv.name}
                        </div>
                        <span className="text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 px-3 py-1 rounded-full border border-amber-300 shadow-xs shrink-0">
                          ₹{serv.startingPrice}
                        </span>
                      </div>
                      <p className="text-xs text-slate-800 font-medium leading-relaxed line-clamp-2 mb-4">
                        {serv.shortDesc}
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-black text-slate-950 group-hover:text-blue-700 transition-colors">
                      <span>Book in {locality.name}</span>
                      <Wrench className="w-3.5 h-3.5 text-blue-600 group-hover:rotate-45 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Service Process */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
              <h2 className="text-2xl font-black text-slate-900 mb-4">
                How Doorstep Repair Works in {locality.name}
              </h2>
              <div className="space-y-3">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Step 1: Online Booking</strong> - Submit your request with {locality.name} address.
                  </div>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Step 2: Technician Dispatch</strong> - Local technician assigned within 30 minutes.
                  </div>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Step 3: On-Site Repair & Warranty</strong> - Clean repair with 90-day parts warranty.
                  </div>
                </div>
              </div>
            </section>

          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-24">
              <BookingForm 
                initialServiceId={matchedService?.slug}
                initialLocality={locality.name}
                onSuccess={() => onOpenBooking(matchedService?.slug, locality.name)}
                isModal={true}
              />
            </div>
          </aside>

        </div>
      </div>
    </article>
  );
};
