
import { MetadataRoute } from 'next'

// This is a list of static pages.
// I'll add more pages here as your site grows.
const staticPages = [
  '/',
  '/about-us',
  '/services',
  '/projects',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lkUrl = 'https://bigcosta.lk';
  const comUrl = 'https://www.bigcosta.com';

  const lkEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${lkUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: page === '/' ? 1 : 0.8,
  }));

  const comEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${comUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: page === '/' ? 1 : 0.8,
  }));
  
  // Note: We can't dynamically serve different sitemaps for different domains
  // in a static build. A common approach is to have one primary domain for SEO
  // or manage separate sitemaps. For now, this will generate a sitemap
  // primarily for the .lk domain as it is set as the metadataBase.
  // To have fully separate sitemaps, a more complex server-side setup is needed.
  // This setup provides a good foundation.

  return lkEntries;
}
