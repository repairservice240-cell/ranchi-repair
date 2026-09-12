import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  BusinessInfo, SocialLinks, AnalyticsConfig, ApplianceService, 
  RanchiLocality, CustomerReview, FaqItem, BlogPost, ServiceBookingLead, EventLog, AuthUser
} from '../types';
import { 
  initialBusinessInfo, initialSocialLinks, initialSupportedBrands, 
  initialServices, initialLocalities, initialReviews, initialFaqs, initialBlogPosts 
} from '../config/siteConfig';

interface SiteContextType {
  businessInfo: BusinessInfo;
  updateBusinessInfo: (info: Partial<BusinessInfo>) => void;
  socialLinks: SocialLinks;
  updateSocialLinks: (links: Partial<SocialLinks>) => void;
  analyticsConfig: AnalyticsConfig;
  updateAnalyticsConfig: (config: Partial<AnalyticsConfig>) => void;
  supportedBrands: string[];
  setSupportedBrands: (brands: string[]) => void;
  services: ApplianceService[];
  updateService: (serviceId: string, data: Partial<ApplianceService>) => void;
  localities: RanchiLocality[];
  addLocality: (locality: Omit<RanchiLocality, 'id'>) => void;
  updateLocality: (localityId: string, data: Partial<RanchiLocality>) => void;
  toggleLocalityStatus: (localityId: string) => void;
  reviews: CustomerReview[];
  addReview: (review: Omit<CustomerReview, 'id'>) => void;
  updateReviewStatus: (id: string, status: 'published' | 'draft') => void;
  faqs: FaqItem[];
  addFaq: (faq: Omit<FaqItem, 'id'>) => void;
  blogPosts: BlogPost[];
  leads: ServiceBookingLead[];
  addLead: (lead: Omit<ServiceBookingLead, 'id' | 'createdAt' | 'status'>) => ServiceBookingLead;
  updateLeadStatus: (leadId: string, status: ServiceBookingLead['status']) => void;
  events: EventLog[];
  trackEvent: (eventType: EventLog['eventType'], label: string) => void;
  currentUser: AuthUser | null;
  loginUser: (user: AuthUser) => void;
  logoutUser: () => void;
  resetToDefaults: () => void;
}

const defaultAnalytics: AnalyticsConfig = {
  gtmId: '',
  ga4Id: '',
  metaPixelId: '',
  googleSearchConsoleMeta: ''
};

const SiteContext = createContext<SiteContextType | undefined>(undefined);

const STORAGE_KEYS = {
  INFO: 'ranchi_repair_info_v1',
  SOCIAL: 'ranchi_repair_social_v1',
  ANALYTICS: 'ranchi_repair_analytics_v1',
  BRANDS: 'ranchi_repair_brands_v1',
  SERVICES: 'ranchi_repair_services_v1',
  LOCALITIES: 'ranchi_repair_localities_v1',
  REVIEWS: 'ranchi_repair_reviews_v1',
  FAQS: 'ranchi_repair_faqs_v1',
  BLOGS: 'ranchi_repair_blogs_v1',
  LEADS: 'ranchi_repair_leads_v1',
  EVENTS: 'ranchi_repair_events_v1',
  USER: 'ranchi_repair_user_v1',
};

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INFO);
    if (!saved) return initialBusinessInfo;
    const parsed = JSON.parse(saved);
    if (!parsed.companyName || parsed.companyName.includes('[') || parsed.companyName.includes('M/s') || !parsed.phone || parsed.phone.includes('[')) {
      const updated = { ...initialBusinessInfo, ...parsed, companyName: 'Ranchi Repair' };
      localStorage.setItem(STORAGE_KEYS.INFO, JSON.stringify(updated));
      return updated;
    }
    return { ...initialBusinessInfo, ...parsed };
  });

  const [socialLinks, setSocialLinks] = useState<SocialLinks>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SOCIAL);
    return saved ? JSON.parse(saved) : initialSocialLinks;
  });

  const [analyticsConfig, setAnalyticsConfig] = useState<AnalyticsConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
    return saved ? JSON.parse(saved) : defaultAnalytics;
  });

  const [supportedBrands, setSupportedBrandsState] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BRANDS);
    return saved ? JSON.parse(saved) : initialSupportedBrands;
  });

  const [services, setServices] = useState<ApplianceService[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [localities, setLocalities] = useState<RanchiLocality[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LOCALITIES);
    return saved ? JSON.parse(saved) : initialLocalities;
  });

  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    return saved ? JSON.parse(saved) : initialReviews;
  });

  const [faqs, setFaqs] = useState<FaqItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FAQS);
    return saved ? JSON.parse(saved) : initialFaqs;
  });

  const [blogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BLOGS);
    return saved ? JSON.parse(saved) : initialBlogPosts;
  });

  const [leads, setLeads] = useState<ServiceBookingLead[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LEADS);
    return saved ? JSON.parse(saved) : [];
  });

  const [events, setEvents] = useState<EventLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
    return saved ? JSON.parse(saved) : [];
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INFO, JSON.stringify(businessInfo));
  }, [businessInfo]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SOCIAL, JSON.stringify(socialLinks));
  }, [socialLinks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(analyticsConfig));
  }, [analyticsConfig]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BRANDS, JSON.stringify(supportedBrands));
  }, [supportedBrands]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOCALITIES, JSON.stringify(localities));
  }, [localities]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  }, [events]);

  const updateBusinessInfo = (info: Partial<BusinessInfo>) => {
    setBusinessInfo(prev => ({ ...prev, ...info, city: 'Ranchi', state: 'Jharkhand' }));
  };

  const updateSocialLinks = (links: Partial<SocialLinks>) => {
    setSocialLinks(prev => ({ ...prev, ...links }));
  };

  const updateAnalyticsConfig = (config: Partial<AnalyticsConfig>) => {
    setAnalyticsConfig(prev => ({ ...prev, ...config }));
  };

  const setSupportedBrands = (brands: string[]) => {
    setSupportedBrandsState(brands);
  };

  const updateService = (serviceId: string, data: Partial<ApplianceService>) => {
    setServices(prev => prev.map(s => s.id === serviceId ? { ...s, ...data } : s));
  };

  const addLocality = (newLocality: Omit<RanchiLocality, 'id'>) => {
    const id = newLocality.slug || `loc-${Date.now()}`;
    setLocalities(prev => [...prev, { ...newLocality, id }]);
  };

  const updateLocality = (localityId: string, data: Partial<RanchiLocality>) => {
    setLocalities(prev => prev.map(l => l.id === localityId ? { ...l, ...data } : l));
  };

  const toggleLocalityStatus = (localityId: string) => {
    setLocalities(prev => prev.map(l => {
      if (l.id === localityId) {
        const nextStatus = l.status === 'published' ? 'draft' : 'published';
        return { ...l, status: nextStatus, isIndexable: nextStatus === 'published' };
      }
      return l;
    }));
  };

  const addReview = (review: Omit<CustomerReview, 'id'>) => {
    const id = `rev-${Date.now()}`;
    setReviews(prev => [{ ...review, id }, ...prev]);
  };

  const updateReviewStatus = (id: string, status: 'published' | 'draft') => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const addFaq = (faq: Omit<FaqItem, 'id'>) => {
    const id = `faq-${Date.now()}`;
    setFaqs(prev => [...prev, { ...faq, id }]);
  };

  const addLead = (leadData: Omit<ServiceBookingLead, 'id' | 'createdAt' | 'status'>) => {
    const newLead: ServiceBookingLead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      city: 'Ranchi',
      createdAt: new Date().toISOString(),
      status: 'New'
    };
    setLeads(prev => [newLead, ...prev]);
    trackEvent('form_submit', `Booking Lead: ${newLead.appliance} in ${newLead.locality}`);
    return newLead;
  };

  const updateLeadStatus = (leadId: string, status: ServiceBookingLead['status']) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status } : l));
  };

  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    return saved ? JSON.parse(saved) : null;
  });

  const loginUser = (user: AuthUser) => {
    setCurrentUser(user);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
  };

  const trackEvent = (eventType: EventLog['eventType'], label: string) => {
    const newEvent: EventLog = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      eventType,
      label,
      timestamp: new Date().toISOString()
    };
    setEvents(prev => [newEvent, ...prev.slice(0, 49)]); // Keep last 50 events
  };

  const resetToDefaults = () => {
    localStorage.clear();
    setBusinessInfo(initialBusinessInfo);
    setSocialLinks(initialSocialLinks);
    setAnalyticsConfig(defaultAnalytics);
    setSupportedBrandsState(initialSupportedBrands);
    setServices(initialServices);
    setLocalities(initialLocalities);
    setReviews(initialReviews);
    setFaqs(initialFaqs);
    setLeads([]);
    setEvents([]);
    setCurrentUser(null);
  };

  return (
    <SiteContext.Provider value={{
      businessInfo,
      updateBusinessInfo,
      socialLinks,
      updateSocialLinks,
      analyticsConfig,
      updateAnalyticsConfig,
      supportedBrands,
      setSupportedBrands,
      services,
      updateService,
      localities,
      addLocality,
      updateLocality,
      toggleLocalityStatus,
      reviews,
      addReview,
      updateReviewStatus,
      faqs,
      addFaq,
      blogPosts,
      leads,
      addLead,
      updateLeadStatus,
      events,
      trackEvent,
      currentUser,
      loginUser,
      logoutUser,
      resetToDefaults
    }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteContext = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSiteContext must be used within a SiteProvider');
  }
  return context;
};
