// Next.js generates this as /robots.txt — it tells search engine crawlers
// which pages to index and where to find the sitemap.

import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Don't let search engines index the raw API endpoints
      disallow: '/api/',
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
