import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/utils/getBaseUrl';

/**
 * Indexing policy for the isolated UI redesign repository.
 *
 * Indexing is allowed ONLY on Vercel production deployments
 * (VERCEL_ENV === "production"). Vercel Preview deployments run with
 * NODE_ENV=production, so NODE_ENV must never be used to gate indexing.
 * Preview and local development are always noindex.
 */
export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV === 'production') {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
      sitemap: `${getBaseUrl()}/sitemap.xml`,
    };
  }

  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  };
}
