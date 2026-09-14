import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteContext } from '../context/SiteContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useSeo } from '../hooks/useSeo';
import { JsonLdSchema } from '../components/common/JsonLdSchema';
import { generateBreadcrumbSchema } from '../utils/schemaGenerator';
import { isLocalityServiceDisabled } from '../config/siteConfig';
import { MapPin, Navigation, ArrowRight, ShieldCheck } from 'lucide-react';

interface ServiceAreasPageProps {
  onOpenBooking?: (serviceSlug?: string, localityName?: string) => void;
}

export const ServiceAreasPage: React.FC<ServiceAreasPageProps> = ({ onOpenBooking }) => {
  const { businessInfo, localities, services } = useSiteContext();
  const publishedLocalities = localities.filter(l => l.status === 'published');

  useSeo({
    title: `Appliance Repair Service Areas in Ranchi | ${businessInfo.companyName}`,
    description: `Doorstep AC repair, washing machine, fridge, microwave & geyser service across all Ranchi localities including Morabadi, Kanke, Doranda, Harmu, Hatia, Lalpur & Bariatu.`,
    canonicalPath: '/service-areas/ranchi/'
  });

  const breadcrumbs = [
    { name: 'Service Areas', url: '/service-areas/' },
    { name: 'Ranchi', url: '/service-areas/ranchi/' }
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <JsonLdSchema schema={breadcrumbSchema} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            Ranchi Local SEO Hub
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Doorstep Service Localities in Ranchi
          </h1>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            We provide fast 30-minute doorstep repair visits across all registered municipal sectors and housing colonies in Ranchi, Jharkhand.
          </p>
        </div>

        {/* Locality Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {publishedLocalities.map((loc) => (
            <div 
              key={loc.id}
              className="group bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-blue-500 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-0.5 overflow-hidden"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20 shrink-0">
                      <Navigation className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="font-extrabold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                        {loc.name}
                      </h2>
                      <span className="inline-block text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md mt-0.5 border border-blue-100">PIN: {loc.pincode}</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4 font-normal">
                  {loc.description}
                </p>

                {/* Available Locality Services */}
                <div className="space-y-1.5 mb-6 pt-3 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-blue-800 uppercase tracking-wider mb-1">
                    Locality Services:
                  </div>
                  {services
                    .filter(serv => !isLocalityServiceDisabled(loc.slug, serv.slug))
                    .map(serv => (
                      <Link
                        key={serv.id}
                        to={`/service-areas/ranchi/${loc.slug}/${serv.slug}/`}
                        className="block text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                      >
                        • {serv.name} in {loc.name}
                      </Link>
                    ))}
                </div>
              </div>

              <button
                onClick={() => onOpenBooking?.(undefined, loc.name)}
                className="w-full py-3 rounded-xl font-extrabold text-xs text-center text-white bg-blue-600 hover:bg-blue-700 transition-all block shadow-sm cursor-pointer"
              >
                Book Technician in {loc.name} &rarr;
              </button>
            </div>
          ))}
        </div>

        {/* Ranchi Restriction Guarantee Banner - Clean Blue & Orange Theme */}
        <div className="p-6 sm:p-8 bg-slate-900 text-white rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Service Guarantee</span>
            </div>
            <h3 className="text-xl font-extrabold text-white tracking-tight">
              Do you live in another neighborhood in Ranchi?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-normal max-w-2xl leading-relaxed">
              We exclusively service Ranchi, Jharkhand. If your locality is not listed above, submit your pincode or address in our booking form for instant technician dispatch.
            </p>
          </div>

          <Link
            to="/book-service/"
            className="px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm shrink-0 transition-all shadow-md active:scale-95 relative z-10"
          >
            Book Ranchi Technician Visit &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
};
