import React from 'react';
import { useSiteContext } from '../context/SiteContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useSeo } from '../hooks/useSeo';
import { ShieldCheck, Award, Users, MapPin, CheckCircle2 } from 'lucide-react';
import { JsonLdSchema } from '../components/common/JsonLdSchema';
import { generateBreadcrumbSchema } from '../utils/schemaGenerator';

export const AboutUsPage: React.FC = () => {
  const { businessInfo } = useSiteContext();

  useSeo({
    title: `About Us | ${businessInfo.companyName} Ranchi`,
    description: `Learn about ${businessInfo.companyName}, Ranchi's leading home appliance repair company. Certified local engineers, transparent doorstep service, and 90-day warranty.`,
    canonicalPath: '/about-us/'
  });

  const breadcrumbs = [{ name: 'About Us', url: '/about-us/' }];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <JsonLdSchema schema={breadcrumbSchema} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={breadcrumbs} />

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Award className="w-4 h-4 text-brand-600" />
              Trusted Local Appliance Experts
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              About {businessInfo.companyName}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Dedicated exclusively to providing high-quality, doorstep home appliance repair services across Ranchi, Jharkhand.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <MapPin className="w-8 h-8 text-brand-600 mx-auto mb-2" />
              <div className="font-extrabold text-slate-900 text-lg">Ranchi Only</div>
              <div className="text-xs text-slate-500 mt-1">100% focused local service</div>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <div className="font-extrabold text-slate-900 text-lg">90-Day Warranty</div>
              <div className="text-xs text-slate-500 mt-1">Written parts & labor policy</div>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="font-extrabold text-slate-900 text-lg">Certified Team</div>
              <div className="text-xs text-slate-500 mt-1">Background checked engineers</div>
            </div>
          </div>

          <div className="space-y-4 text-slate-700 text-sm leading-relaxed pt-4 border-t border-slate-100">
            <h2 className="text-xl font-extrabold text-slate-900">Our Mission & Principles</h2>
            <p>
              At <strong>{businessInfo.companyName}</strong>, we understand how inconvenient a broken air conditioner, noisy washing machine, or non-cooling refrigerator can be during peak seasons. That's why we built a local doorstep service team right here in Ranchi, Jharkhand.
            </p>
            <p>
              Unlike generic directory platforms, our technicians are locally deployed across Morabadi, Kanke, Doranda, Harmu, Hatia, Lalpur, Ashok Nagar, and Bariatu. This allows us to guarantee rapid 30-to-60 minute arrival times with complete repair toolkits.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-brand-600" />
                Original replacement spare parts with digital receipts.
              </div>
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-brand-600" />
                Upfront price estimation before starting work.
              </div>
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-brand-600" />
                Zero hidden fees or forced replacements.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
