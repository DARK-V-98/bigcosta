
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
  
  // Note: This combines sitemaps for both domains into one file. 
  // For optimal SEO, it's often recommended to host separate sitemap files for each domain 
  // and submit them individually to search consoles. However, this combined approach is a valid starting point.

  return [...lkEntries, ...comEntries];
}
