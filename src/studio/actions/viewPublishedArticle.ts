import { LaunchIcon } from '@sanity/icons';
import type { DocumentActionComponent } from 'sanity';
import { buildLocalizedPath, type SiteLocale } from '@/lib/locale';
import { getBaseURL } from '@/lib/links';

/**
 * Build the absolute production URL for a published Blog article.
 *
 * Uses the centralized production site URL (NEXT_PUBLIC_SITE_URL via getBaseURL,
 * the same source used for canonical/sitemap URLs) and the existing locale path
 * helper. Returns null when a valid absolute URL cannot be formed so callers
 * never construct an invalid link.
 */
export function buildPublishedArticleUrl(
  locale: SiteLocale,
  slug?: string | null,
  baseUrl: string = getBaseURL(),
): string | null {
  if (!slug || !baseUrl) return null;
  const origin = baseUrl.replace(/\/+$/, '');
  return `${origin}${buildLocalizedPath(locale, `/blog/${slug}`)}`;
}

/**
 * Document action factory that opens the published production article for a
 * given locale in a new browser tab.
 *
 * Visibility rules (intentional, pre-launch safe):
 * - Uses the PUBLISHED slug only, so draft slug edits are never implied live.
 * - Hidden (returns null) when there is no published document (never published)
 *   or when the published document has no slug (cannot form a valid URL).
 */
export function viewPublishedArticleAction(
  locale: SiteLocale,
): DocumentActionComponent {
  return (props) => {
    const published = props.published as
      | { slug?: { current?: string } }
      | undefined;
    const slug = published?.slug?.current;
    const url = buildPublishedArticleUrl(locale, slug);
    if (!url) return null;

    return {
      label: locale === 'th' ? 'View TH ↗' : 'View EN ↗',
      icon: LaunchIcon,
      onHandle: () => {
        window.open(url, '_blank', 'noopener,noreferrer');
      },
    };
  };
}
