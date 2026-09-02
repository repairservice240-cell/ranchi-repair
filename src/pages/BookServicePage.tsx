import React from 'react';
import { useSiteContext } from '../context/SiteContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { BookingForm } from '../components/booking/BookingForm';
import { useSeo } from '../hooks/useSeo';
import { JsonLdSchema } from '../components/common/JsonLdSchema';
import { generateBreadcrumbSchema } from '../utils/schemaGenerator';

interface BookServicePageProps {
  onSuccess: (lead: any) => void;
}

export const BookServicePage: React.FC<BookServicePageProps> = ({ onSuccess }) => {
  const { businessInfo } = useSiteContext();

  useSeo({
    title: `Book Doorstep Appliance Service in Ranchi | ${businessInfo.companyName}`,
    description: `Online service booking for AC, washing machine, refrigerator, microwave oven & geyser repair in Ranchi, Jharkhand. Certified technician visits in 30-60 mins.`,
    canonicalPath: '/book-service/'
  });

  const breadcrumbs = [{ name: 'Book Service', url: '/book-service/' }];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <JsonLdSchema schema={breadcrumbSchema} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={breadcrumbs} />
        <BookingForm onSuccess={onSuccess} isModal={false} />
      </div>
    </div>
  );
};
