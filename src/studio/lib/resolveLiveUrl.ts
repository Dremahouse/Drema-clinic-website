import { getBaseURL } from '@/lib/links';
import {
  buildLocalizedPath,
  DEFAULT_LOCALE,
  type SiteLocale,
} from '@/lib/locale';

export const DEFAULT_VIEW_LIVE_LOCALE: SiteLocale = 'th';

export const STATIC_LIVE_URLS: Record<string, string> = {
  homePage: '/',
  aboutPage: '/about',
  aestheticTreatmentsPage: '/services',
  blogPage: '/blog',
  pricingPage: '/pricing',
  promotionsPage: '/promotions',
  reviewsPage: '/reviews',
};

export const DYNAMIC_LIVE_URL_PATTERNS: Record<
  string,
  (document: { slug?: { current?: string | null } | string | null }) => string | null
> = {
  page: (document) => {
    const slug = typeof document.slug === 'string' ? document.slug : document.slug?.current;
    return slug ? `/${slug}` : null;
  },
  servicePage: (document) => {
    const slug = typeof document.slug === 'string' ? document.slug : document.slug?.current;
    return slug ? `/services/${slug}` : null;
  },
  post: (document) => {
    const slug = typeof document.slug === 'string' ? document.slug : document.slug?.current;
    return slug ? `/blog/${slug}` : null;
  },
  category: (document) => {
    const slug = typeof document.slug === 'string' ? document.slug : document.slug?.current;
    return slug ? `/category/${slug}` : null;
  },
  reviewCategory: (document) => {
    const slug = typeof document.slug === 'string' ? document.slug : document.slug?.current;
    return slug ? `/reviews/${slug}` : null;
  },
  person: (document) => {
    const slug = typeof document.slug === 'string' ? document.slug : document.slug?.current;
    return slug ? `/author/${slug}` : null;
  },
};

/**
 * Origin used for "view live" links in the Studio.
 *
 * Uses the configured NEXT_PUBLIC_SITE_URL (via getBaseURL) when set, so a
 * preview deployment points at its own preview origin. When unset, the
 * returned URL is relative to the current origin (the embedded Studio host).
 * This intentionally never falls back to the production site.
 */
function liveOrigin(): string {
  return getBaseURL().replace(/\/+$/, '');
}

export function resolveLiveUrl(
  schemaType: string,
  document: { slug?: { current?: string | null } | string | null } | null | undefined
): string | null {
  if (!schemaType) return null;

  const origin = liveOrigin();

  const staticPath = STATIC_LIVE_URLS[schemaType];
  if (staticPath) {
    return `${origin}${buildLocalizedPath(DEFAULT_LOCALE, staticPath)}`;
  }

  const dynamicResolver = DYNAMIC_LIVE_URL_PATTERNS[schemaType];
  if (dynamicResolver && document) {
    const path = dynamicResolver(document);
    if (path) {
      return `${origin}${buildLocalizedPath(DEFAULT_LOCALE, path)}`;
    }
  }

  return null;
}

export function hasLiveUrl(schemaType: string, document?: { slug?: { current?: string | null } | string | null } | null): boolean {
  return resolveLiveUrl(schemaType, document) !== null;
}
