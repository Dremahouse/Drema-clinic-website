import type { MetadataRoute } from 'next';
import { buildLocalizedPath } from '@/lib/locale';
import { client } from '@/lib/sanity/client/client';
import { getSitemapQuery } from '@/lib/sanity/queries/queries';
import { getBaseUrl } from '@/utils/getBaseUrl';

const locales = ['th', 'en'] as const;

const staticPaths = [
  '/faq',
  '/privacy-policy',
  '/terms',
  '/cookies',
  '/medical-disclaimer',
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const paths = await client.fetch(getSitemapQuery);

    if (!paths) return [];

    const baseUrl = getBaseUrl();
    const seen = new Set<string>();
    const now = new Date();

    const toLocalizedEntries = ({
      href,
      lastModified,
      priority,
    }: {
      href: string;
      lastModified: Date;
      priority: number;
    }): MetadataRoute.Sitemap =>
      locales.flatMap((locale) => {
        const url = new URL(
          buildLocalizedPath(locale, href),
          baseUrl
        ).toString();

        if (seen.has(url)) return [];
        seen.add(url);

        return {
          url,
          lastModified,
          changeFrequency: 'weekly' as const,
          priority,
        };
      });

    const staticEntries = staticPaths.flatMap((href) =>
      toLocalizedEntries({
        href,
        lastModified: now,
        priority: 0.7,
      })
    );

    const contentPaths = paths.flatMap((path) => {
      const rawHref = path.href || '/';
      const lastModified = path._updatedAt ? new Date(path._updatedAt) : now;

      return toLocalizedEntries({
        href: rawHref,
        lastModified,
        priority: rawHref === '/' ? 1 : 0.9,
      });
    });

    return [...contentPaths, ...staticEntries];
  } catch (error) {
    console.error('Failed to generate sitemap:', error);
    return [];
  }
}
