import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ServiceCards } from '../components/home/ServiceCards';
import { LocalSeoSection } from '../components/home/LocalSeoSection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { HowItWorks } from '../components/home/HowItWorks';

import { RanchiLocalitiesSection } from '../components/home/RanchiLocalitiesSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { FaqSection } from '../components/home/FaqSection';
import { HomeContactSection } from '../components/home/HomeContactSection';
import { useSeo } from '../hooks/useSeo';
import { JsonLdSchema } from '../components/common/JsonLdSchema';
import { generateLocalBusinessSchema, generateFaqSchema } from '../utils/schemaGenerator';
import { useSiteContext } from '../context/SiteContext';

interface HomePageProps {
  onOpenBooking: (serviceSlug?: string, localityName?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenBooking }) => {
  const { businessInfo, faqs } = useSiteContext();

  useSeo({
    title: `Home Appliance Repair Services in Ranchi | ${businessInfo.companyName}`,
    description: `Doorstep AC repair, washing machine, refrigerator, microwave oven, and geyser repair service in Ranchi, Jharkhand. Fast 30-minute technician visit. Book online today!`,
    canonicalPath: '/'
  });

  const localBusinessSchema = generateLocalBusinessSchema(businessInfo);
  const faqSchema = generateFaqSchema(faqs.filter(f => f.status === 'published'));

  return (
    <main>
      <JsonLdSchema schema={[localBusinessSchema, faqSchema]} />

      {/* 1. Hero */}
      <HeroSection onOpenBooking={() => onOpenBooking()} />

      {/* 2. Services grid */}
      <ServiceCards onOpenBooking={(slug) => onOpenBooking(slug)} />

      {/* 4. Local SEO text blurb */}
      <LocalSeoSection />

      {/* 5. Why Choose Us */}
      <WhyChooseUs />

      {/* 6. How It Works */}
      <HowItWorks />

      {/* 7. Ranchi Localities */}
      <RanchiLocalitiesSection onOpenBooking={(serviceSlug, localityName) => onOpenBooking(serviceSlug, localityName)} />

      {/* 8. Customer Testimonials */}
      <TestimonialsSection />

      {/* 9. FAQ */}
      <FaqSection />

      {/* 10. Contact / Booking CTA section */}
      <HomeContactSection onOpenBooking={() => onOpenBooking()} />
    </main>
  );
};
