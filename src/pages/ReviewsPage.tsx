import React from 'react';
import { useSiteContext } from '../context/SiteContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { useSeo } from '../hooks/useSeo';
import { JsonLdSchema } from '../components/common/JsonLdSchema';
import { generateBreadcrumbSchema } from '../utils/schemaGenerator';

export const ReviewsPage: React.FC = () => {
  const { businessInfo } = useSiteContext();

  useSeo({
    title: `Customer Reviews & Testimonials | ${businessInfo.companyName} Ranchi`,
    description: `Read customer feedback and reviews for AC, washing machine, fridge, microwave & geyser repair service in Ranchi localities like Morabadi, Kanke, Doranda & Harmu.`,
    canonicalPath: '/reviews/'
  });

  const breadcrumbs = [{ name: 'Customer Reviews', url: '/reviews/' }];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <JsonLdSchema schema={breadcrumbSchema} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={breadcrumbs} />
        <TestimonialsSection />
      </div>
    </div>
  );
};
