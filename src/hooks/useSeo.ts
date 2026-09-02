import { useEffect } from 'react';
import { useSiteContext } from '../context/SiteContext';

interface SeoProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  noindex?: boolean;
}

export const useSeo = ({ title, description, canonicalPath, ogImage, noindex }: SeoProps) => {
  const { businessInfo } = useSiteContext();

  useEffect(() => {
    // Document Title
    const defaultTitle = `Home Appliance Repair Services in Ranchi | ${businessInfo.companyName}`;
    const pageTitle = title ? `${title}` : defaultTitle;
    document.title = pageTitle;

    // Meta Description
    const defaultDesc = `Doorstep AC repair, washing machine, refrigerator, microwave oven, and geyser repair service in Ranchi, Jharkhand. Certified local technicians, fast 30-minute response. Book today!`;
    const pageDesc = description || defaultDesc;

    let metaDescTag = document.querySelector('meta[name="description"]');
    if (!metaDescTag) {
      metaDescTag = document.createElement('meta');
      metaDescTag.setAttribute('name', 'description');
      document.head.appendChild(metaDescTag);
    }
    metaDescTag.setAttribute('content', pageDesc);

    // Canonical Tag
    const cleanDomain = businessInfo.domain ? businessInfo.domain.replace(/^https?:\/\//, '') : 'ranchirepair.in';
    const path = canonicalPath || window.location.pathname;
    const fullCanonicalUrl = `https://${cleanDomain}${path.startsWith('/') ? path : '/' + path}`;

    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', fullCanonicalUrl);

    // Helper for Meta Tags
    const setMeta = (attrName: string, attrVal: string, content: string) => {
      let tag = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrVal);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Open Graph Tags
    setMeta('property', 'og:title', pageTitle);
    setMeta('property', 'og:description', pageDesc);
    setMeta('property', 'og:url', fullCanonicalUrl);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', businessInfo.companyName || 'Ranchi Repair');
    setMeta('property', 'og:image', ogImage || `https://${cleanDomain}/images/og-image.jpg`);

    // Twitter Card Tags
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', pageTitle);
    setMeta('name', 'twitter:description', pageDesc);
    setMeta('name', 'twitter:image', ogImage || `https://${cleanDomain}/images/og-image.jpg`);

    // Robots meta (for draft pages / noindex)
    let robotsTag = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!robotsTag) {
        robotsTag = document.createElement('meta');
        robotsTag.setAttribute('name', 'robots');
        document.head.appendChild(robotsTag);
      }
      robotsTag.setAttribute('content', 'noindex, nofollow');
    } else if (robotsTag) {
      robotsTag.setAttribute('content', 'index, follow');
    }

  }, [title, description, canonicalPath, ogImage, noindex, businessInfo]);
};
