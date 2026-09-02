import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteContext } from '../context/SiteContext';
import { useSeo } from '../hooks/useSeo';
import { AlertTriangle, Home, Wrench, Phone } from 'lucide-react';

interface NotFoundPageProps {
  onOpenBooking: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onOpenBooking }) => {
  const { businessInfo, services } = useSiteContext();

  useSeo({
    title: `404 - Page Not Found | ${businessInfo.companyName} Ranchi`,
    description: `Page not found. Explore doorstep AC, washing machine, fridge, microwave & geyser repair services in Ranchi.`,
    noindex: true
  });

  return (
    <div className="py-16 sm:py-24 bg-slate-50 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest">Error 404</div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            The page you are looking for might have been moved or doesn't exist. Explore our doorstep repair services in Ranchi below:
          </p>
        </div>

        {/* Links to Core Services */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-left">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Ranchi Home Appliance Repair Services:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-800">
            <Link to="/" className="p-2 hover:bg-slate-50 rounded-lg hover:text-brand-600 flex items-center gap-2">
              <Home className="w-3.5 h-3.5 text-brand-500" /> Home Page
            </Link>
            <Link to="/services/" className="p-2 hover:bg-slate-50 rounded-lg hover:text-brand-600 flex items-center gap-2">
              <Wrench className="w-3.5 h-3.5 text-brand-500" /> All Services
            </Link>
            {services.map(s => (
              <Link key={s.id} to={`/${s.slug}/`} className="p-2 hover:bg-slate-50 rounded-lg hover:text-brand-600 flex items-center gap-2">
                • {s.name}
              </Link>
            ))}
            <Link to="/contact/" className="p-2 hover:bg-slate-50 rounded-lg hover:text-brand-600 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-brand-500" /> Contact Us
            </Link>
          </div>
        </div>

        <button
          onClick={onOpenBooking}
          className="px-8 py-3.5 rounded-xl font-extrabold text-sm text-white bg-brand-600 hover:bg-brand-700 shadow-lg transition-all"
        >
          Book a Repair Service Now
        </button>
      </div>
    </div>
  );
};
