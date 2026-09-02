import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Navigation, ArrowRight } from 'lucide-react';
import { useSiteContext } from '../../context/SiteContext';

interface RanchiLocalitiesSectionProps {
  onOpenBooking?: (serviceSlug?: string, localityName?: string) => void;
}

export const RanchiLocalitiesSection: React.FC<RanchiLocalitiesSectionProps> = ({ onOpenBooking }) => {
  const { localities } = useSiteContext();
  const publishedLocalities = localities.filter(l => l.status === 'published');

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              Doorstep Coverage Area
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Doorstep Service Localities in Ranchi
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-2xl font-medium">
              Our technicians operate locally across Ranchi city to guarantee 30 to 60 minute doorstep arrival times.
            </p>
          </div>

          <Link
            to="/service-areas/ranchi/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors shrink-0"
          >
            <span>View All Ranchi Areas</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedLocalities.map((loc) => (
            <div
              key={loc.id}
              onClick={() => onOpenBooking?.(undefined, loc.name)}
              className="group relative bg-gradient-to-br from-white via-slate-50/60 to-blue-50/40 p-6 rounded-3xl border border-slate-200/90 hover:border-blue-500/80 shadow-md hover:shadow-xl hover:shadow-blue-600/15 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 overflow-hidden cursor-pointer"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-600/25 group-hover:scale-110 transition-transform duration-300 shrink-0">
                      <Navigation className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">
                        {loc.name}
                      </h3>
                      <span className="inline-block text-[11px] font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-md mt-0.5">
                        PIN: {loc.pincode}
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 shadow-xs shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Active Area
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 mb-5 font-medium leading-relaxed">
                  {loc.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-black text-blue-600 group-hover:text-blue-700">
                <span>Book Technician in {loc.name}</span>
                <div className="w-7 h-7 rounded-full bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Local SEO Guarantee Footer Box - Vibrant Golden Yellow & Amber Gradient Theme */}
        <div className="mt-12 p-6 sm:p-8 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-3xl text-slate-950 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl shadow-amber-400/30 border-2 border-amber-300 transition-all duration-300 relative overflow-hidden">
          {/* Subtle Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 bg-yellow-200/50 blur-[100px] pointer-events-none rounded-full" />

          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-slate-950 text-amber-300 flex items-center justify-center shrink-0 shadow-md border border-slate-800">
              <MapPin className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="font-black text-slate-950 text-lg sm:text-xl tracking-tight">Do you live in another neighborhood in Ranchi?</div>
              <div className="text-slate-900 text-xs sm:text-sm font-extrabold mt-1">We exclusively service Ranchi, Jharkhand. Submit your locality for instant technician dispatch.</div>
            </div>
          </div>

          <Link
            to="/contact/"
            className="px-6 py-3.5 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm rounded-2xl shrink-0 transition-all duration-300 shadow-xl shadow-blue-600/35 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-95 border border-blue-400/30 relative z-10"
          >
            Book Ranchi Technician Visit &rarr;
          </Link>
        </div>

      </div>
    </section>
  );
};
