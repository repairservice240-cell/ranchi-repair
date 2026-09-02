import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSiteContext } from '../context/SiteContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useSeo } from '../hooks/useSeo';

export const LegalPages: React.FC = () => {
  const { pathname } = useLocation();
  const { businessInfo } = useSiteContext();

  let title = 'Privacy Policy';
  let canonicalPath = '/privacy-policy/';

  if (pathname.includes('terms-and-conditions')) {
    title = 'Terms & Conditions';
    canonicalPath = '/terms-and-conditions/';
  } else if (pathname.includes('cancellation-policy')) {
    title = 'Cancellation & Refund Policy';
    canonicalPath = '/cancellation-policy/';
  }

  useSeo({
    title: `${title} | ${businessInfo.companyName} Ranchi`,
    description: `${title} for ${businessInfo.companyName} home appliance repair services in Ranchi, Jharkhand.`,
    canonicalPath
  });

  const breadcrumbs = [{ name: title, url: canonicalPath }];

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={breadcrumbs} />

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-6 text-slate-700 text-sm leading-relaxed">
          <h1 className="text-3xl font-black text-slate-900">{title}</h1>

          {pathname.includes('privacy-policy') && (
            <div className="space-y-4">
              <p>At <strong>{businessInfo.companyName}</strong>, accessible from our Ranchi service domain, we prioritize consumer privacy.</p>
              <h2 className="text-lg font-bold text-slate-900">Information We Collect</h2>
              <p>We collect customer names, phone numbers, doorstep addresses in Ranchi, and appliance details solely for service technician scheduling and invoice issuing.</p>
              <h2 className="text-lg font-bold text-slate-900">Data Protection</h2>
              <p>We do not share, sell, or trade personal data to third-party marketing companies.</p>
            </div>
          )}

          {pathname.includes('terms-and-conditions') && (
            <div className="space-y-4">
              <p>Welcome to <strong>{businessInfo.companyName}</strong>. By booking appliance repair services in Ranchi, you agree to these terms.</p>
              <h2 className="text-lg font-bold text-slate-900">Service Terms</h2>
              <p>Inspection fees cover technician visit & diagnosis. Replaced spare parts carry a 90-day written warranty against manufacturing defects.</p>
            </div>
          )}

          {pathname.includes('cancellation-policy') && (
            <div className="space-y-4">
              <p>Customers in Ranchi can cancel or reschedule technician bookings free of charge up to 15 minutes before technician doorstep dispatch.</p>
              <h2 className="text-lg font-bold text-slate-900">Refund Terms</h2>
              <p>Prepaid amounts (if any) are refunded via original payment mode within 3-5 working days upon valid cancellation.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
