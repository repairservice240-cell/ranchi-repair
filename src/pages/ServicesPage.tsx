import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ServiceCards } from '../components/home/ServiceCards';
import { SupportedBrands } from '../components/home/SupportedBrands';
import { useSeo } from '../hooks/useSeo';
import { useSiteContext } from '../context/SiteContext';
import { JsonLdSchema } from '../components/common/JsonLdSchema';
import { generateBreadcrumbSchema } from '../utils/schemaGenerator';

interface ServicesPageProps {
  onOpenBooking: (serviceSlug?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBooking }) => {
  const { businessInfo } = useSiteContext();

  useSeo({
    title: `All Home Appliance Repair Services in Ranchi | ${businessInfo.companyName}`,
    description: `Complete doorstep repair services in Ranchi for AC, Washing Machine, Refrigerator, Microwave Oven & Geyser. Certified technicians, transparent pricing & 90-day warranty.`,
    canonicalPath: '/services/'
  });

  const breadcrumbs = [{ name: 'Appliance Services', url: '/services/' }];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <JsonLdSchema schema={breadcrumbSchema} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mb-10 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Doorstep Appliance Services in Ranchi
          </h1>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            Professional repair, deep maintenance, gas charging, PCB board troubleshooting, and installation services across all Ranchi neighborhoods.
          </p>
        </div>

        <ServiceCards onOpenBooking={onOpenBooking} />
        <div className="mt-12">
          <SupportedBrands />
        </div>
      </div>
    </div>
  );
};
