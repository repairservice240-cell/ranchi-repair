import React from 'react';
import { useSiteContext } from '../context/SiteContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FaqSection } from '../components/home/FaqSection';
import { useSeo } from '../hooks/useSeo';
import { JsonLdSchema } from '../components/common/JsonLdSchema';
import { generateFaqSchema, generateBreadcrumbSchema } from '../utils/schemaGenerator';

export const FaqPage: React.FC = () => {
  const { businessInfo, faqs } = useSiteContext();

  useSeo({
    title: `Appliance Repair FAQs | ${businessInfo.companyName} Ranchi`,
    description: `Answers to frequently asked questions about doorstep AC, washing machine, fridge, microwave & geyser repair service charges, warranties & visit times in Ranchi.`,
    canonicalPath: '/faq/'
  });

  const breadcrumbs = [{ name: 'FAQ', url: '/faq/' }];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFaqSchema(faqs.filter(f => f.status === 'published'));

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <JsonLdSchema schema={[breadcrumbSchema, faqSchema]} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={breadcrumbs} />
        <FaqSection />
      </div>
    </div>
  );
};
