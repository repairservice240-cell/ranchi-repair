import React from 'react';
import { useSiteContext } from '../../context/SiteContext';
import { MapPin } from 'lucide-react';

export const LocalSeoSection: React.FC = () => {
  const { businessInfo } = useSiteContext();

  return (
    <section className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
          Reliable Appliance Repair Near You in Ranchi
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed max-w-3xl mx-auto font-medium">
          Looking for trusted appliance repair near you in Ranchi? {businessInfo.companyName} provides
          expert AC repair, washing machine repair, refrigerator repair, microwave repair and geyser repair
          across all major areas of Ranchi, Jharkhand. Our experienced technicians offer same-day doorstep
          service with genuine spare parts and transparent pricing.
        </p>
        <div className="inline-flex items-center gap-2 mt-5 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span className="text-blue-900 text-sm font-bold">Serving All Areas of Ranchi, Jharkhand</span>
        </div>
      </div>
    </section>
  );
};
