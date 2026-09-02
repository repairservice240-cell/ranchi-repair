export interface BusinessInfo {
  companyName: string;
  tagline: string;
  logo: string;
  favicon: string;
  phone: string;
  whatsapp: string;
  email: string;
  officeAddress: string;
  area: string;
  city: string; // Locked to Ranchi
  district: string;
  state: string; // Locked to Jharkhand
  country: string;
  pincode: string;
  googleMapsUrl: string;
  googleBusinessProfileUrl: string;
  latitude: string;
  longitude: string;
  businessHours: string;
  yearEstablished: string;
  domain: string;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  youtube: string;
  linkedin: string;
  other: string;
}

export interface AnalyticsConfig {
  gtmId: string;
  ga4Id: string;
  metaPixelId: string;
  googleSearchConsoleMeta: string;
}

export interface ApplianceService {
  id: string;
  name: string;
  slug: string; // e.g. ac-repair
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  heroImage: string;
  startingPrice: number;
  problemsFixed: string[];
  serviceOfferings: string[];
  supportedBrands: string[];
  seoTitle: string;
  metaDescription: string;
  faqs: { question: string; answer: string }[];
}

export interface RanchiLocality {
  id: string;
  name: string;
  slug: string; // e.g. morabadi
  description: string;
  landmarks: string[];
  pincode: string;
  status: 'published' | 'draft';
  seoTitle: string;
  metaDescription: string;
  isIndexable: boolean;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  locality: string;
  service: string;
  rating: number;
  date: string;
  comment: string;
  status: 'published' | 'draft';
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  status: 'published' | 'draft';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: string;
  status: 'published' | 'draft';
}

export interface ServiceBookingLead {
  id: string;
  name: string;
  mobile: string;
  whatsapp: string;
  appliance: string;
  brand: string;
  serviceRequired: string;
  problemDesc: string;
  city: string; // Ranchi
  locality: string;
  pincode: string;
  address: string;
  preferredDate: string;
  preferredTime: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Assigned' | 'Completed';
}

export interface EventLog {
  id: string;
  eventType: 'call_click' | 'whatsapp_click' | 'book_service_click' | 'form_start' | 'form_submit' | 'service_page_view' | 'locality_page_view';
  label: string;
  timestamp: string;
}
