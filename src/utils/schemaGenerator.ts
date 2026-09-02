import { BusinessInfo, ApplianceService, RanchiLocality, FaqItem } from '../types';

export const generateLocalBusinessSchema = (info: BusinessInfo) => {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": info.companyName,
    "image": info.logo || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e",
    "@id": `https://${info.domain}/#organization`,
    "url": `https://${info.domain}/`,
    "telephone": info.phone,
    "priceRange": "₹199 - ₹2499",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": info.officeAddress,
      "addressLocality": "Ranchi",
      "addressRegion": "Jharkhand",
      "postalCode": info.pincode,
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": info.latitude || "23.3441",
      "longitude": info.longitude || "85.3096"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "08:00",
      "closes": "21:00"
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Ranchi, Jharkhand, India"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Home Appliance Repair Services in Ranchi",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AC Repair & Service in Ranchi" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Washing Machine Repair in Ranchi" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Refrigerator Repair in Ranchi" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Microwave Repair in Ranchi" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Geyser Repair & Service in Ranchi" } }
      ]
    }
  };
};

export const generateServiceSchema = (service: ApplianceService, info: BusinessInfo, localityName?: string) => {
  const serviceTitle = localityName 
    ? `${service.name} in ${localityName}, Ranchi`
    : `${service.name} in Ranchi`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceTitle,
    "serviceType": service.name,
    "provider": {
      "@type": "LocalBusiness",
      "name": info.companyName,
      "telephone": info.phone,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Ranchi",
        "addressRegion": "Jharkhand",
        "addressCountry": "IN"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": localityName ? `${localityName}, Ranchi` : "Ranchi, Jharkhand"
    },
    "description": service.metaDescription,
    "offers": {
      "@type": "Offer",
      "price": service.startingPrice,
      "priceCurrency": "INR"
    }
  };
};

export const generateFaqSchema = (faqs: { question: string; answer: string }[]) => {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};
