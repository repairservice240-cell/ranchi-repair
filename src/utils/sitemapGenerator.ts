import { ApplianceService, RanchiLocality, BlogPost } from '../types';
import { isLocalityServiceDisabled } from '../config/siteConfig';

export const generateXmlSitemap = (
  domain: string,
  services: ApplianceService[],
  localities: RanchiLocality[],
  blogPosts: BlogPost[]
): string => {
  const baseUrl = `https://${domain.replace(/^https?:\/\//, '') || '[DOMAIN]'}`;
  
  const staticRoutes = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/services/', priority: '0.9', changefreq: 'weekly' },
    { url: '/service-areas/', priority: '0.8', changefreq: 'weekly' },
    { url: '/service-areas/ranchi/', priority: '0.9', changefreq: 'weekly' },
    { url: '/about-us/', priority: '0.7', changefreq: 'monthly' },
    { url: '/reviews/', priority: '0.7', changefreq: 'weekly' },
    { url: '/faq/', priority: '0.7', changefreq: 'weekly' },
    { url: '/contact/', priority: '0.8', changefreq: 'monthly' },
    { url: '/book-service/', priority: '0.9', changefreq: 'weekly' },
    { url: '/blog/', priority: '0.7', changefreq: 'weekly' },
    { url: '/privacy-policy/', priority: '0.3', changefreq: 'yearly' },
    { url: '/terms-and-conditions/', priority: '0.3', changefreq: 'yearly' },
    { url: '/cancellation-policy/', priority: '0.3', changefreq: 'yearly' }
  ];

  const serviceRoutes = services.map(service => ({
    url: `/${service.slug}/`,
    priority: '0.9',
    changefreq: 'daily'
  }));

  // Only published localities get indexed in sitemap
  const localityRoutes: { url: string; priority: string; changefreq: string }[] = [];
  localities.filter(loc => loc.status === 'published' && loc.isIndexable).forEach(loc => {
    localityRoutes.push({
      url: `/service-areas/ranchi/${loc.slug}/`,
      priority: '0.8',
      changefreq: 'weekly'
    });

    services.forEach(serv => {
      if (!isLocalityServiceDisabled(loc.slug, serv.slug)) {
        localityRoutes.push({
          url: `/service-areas/ranchi/${loc.slug}/${serv.slug}/`,
          priority: '0.7',
          changefreq: 'weekly'
        });
      }
    });
  });

  const blogRoutes = blogPosts.filter(b => b.status === 'published').map(b => ({
    url: `/blog/${b.slug}/`,
    priority: '0.6',
    changefreq: 'monthly'
  }));

  const allUrls = [...staticRoutes, ...serviceRoutes, ...localityRoutes, ...blogRoutes];

  const xmlUrls = allUrls.map(item => `  <url>
    <loc>${baseUrl}${item.url}</loc>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;
};
