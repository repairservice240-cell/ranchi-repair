// Digital Marketing Analytics & Conversion Event Tracking Utility for Google Ads & Meta Pixel

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
  }
}

export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return;

  // 1. Google Tag Manager / GA4 DataLayer Event
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params,
  });

  // 2. Direct GA4 gtag event (if installed)
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }

  // 3. Meta / Facebook Pixel Custom Event (if installed)
  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', eventName, params);
  }
};

export const trackLeadConversion = (serviceName?: string, localityName?: string) => {
  trackEvent('generate_lead', {
    category: 'Lead',
    action: 'Form Submission',
    service: serviceName || 'General Service',
    locality: localityName || 'Ranchi',
    event_category: 'engagement',
    event_label: 'Service Booking Lead',
  });

  // Track Standard Lead Event for Facebook Ads Pixel
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', {
      content_name: serviceName || 'General Service',
      content_category: localityName || 'Ranchi',
    });
  }
};

export const trackPhoneClick = (source: string) => {
  trackEvent('click_to_call', {
    category: 'Contact',
    action: 'Phone Call Click',
    label: source,
  });
};

export const trackWhatsappClick = (source: string) => {
  trackEvent('whatsapp_click', {
    category: 'Contact',
    action: 'WhatsApp Chat Click',
    label: source,
  });
};
