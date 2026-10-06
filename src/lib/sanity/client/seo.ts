import type { Metadata } from 'next';
import { getBaseURL } from '@/lib/links';
import {
  buildLocalizedAlternates,
  buildLocalizedUrl,
  normalizeAuthoredPublicUrl,
  type SiteLocale,
} from '@/lib/locale';
import type { SeoFragmentType } from '../queries/fragments/fragment.types';
import { resolveOpenGraphImage } from './utils';

function parseAdditionalMetaTags(
  additionalMetaTags?: SeoFragmentType['additionalMetaTags']
) {
  if (!additionalMetaTags) {
    return undefined;
  }

  const otherTags: Record<string, string> = {};
  additionalMetaTags.forEach((metaTag) => {
    metaTag?.metaAttributes?.forEach((metaAttribute) => {
      if (metaAttribute?.attributeKey) {
        if (
          metaAttribute?.attributeType === 'string' &&
          metaAttribute?.attributeValueString
        ) {
          otherTags[metaAttribute.attributeKey] =
            metaAttribute.attributeValueString;
        }

        if (
          metaAttribute?.attributeType === 'image' &&
          metaAttribute?.attributeValueImage?.asset?.url
        ) {
          otherTags[metaAttribute.attributeKey] =
            metaAttribute.attributeValueImage.asset.url;
        }
      }
    });
  });

  return otherTags;
}

export const formatMetaData = (
  seo: SeoFragmentType,
  defaultTitle: string,
  context?: { locale: SiteLocale; pathname: string }
): Metadata => {
  const metaImage = resolveOpenGraphImage(seo.metaImage);
  const origin = getBaseURL();
  const openGraphUrl = context
    ? normalizeAuthoredPublicUrl(seo.openGraph?.url, context.locale, origin) ||
      buildLocalizedUrl(context.locale, context.pathname, origin)
    : (seo.openGraph?.url ?? undefined);

  return {
    title: seo?.metaTitle ?? defaultTitle,
    description: seo?.metaDescription,
    keywords: seo?.seoKeywords,
    // TEMPORARY PRE-LAUNCH NOINDEX — REMOVE AT LAUNCH.
    // Renders "noindex, follow" globally. Documents explicitly flagged
    // with seo.noIndex remain non-indexable and also disable follow.
    robots: seo?.noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: false,
          follow: true,
        },
    alternates: context
      ? buildLocalizedAlternates(context.locale, context.pathname, origin)
      : undefined,
    openGraph: seo?.openGraph
      ? {
          title: seo.openGraph.title ?? undefined,
          description: seo.openGraph.description ?? undefined,
          siteName: seo.openGraph.siteName ?? undefined,
          url: openGraphUrl,
          images: seo.openGraph.image
            ? resolveOpenGraphImage(seo.openGraph.image)
            : metaImage,
        }
      : undefined,
    twitter: seo?.twitter
      ? {
          site: seo.twitter.site || undefined,
          description:
            seo.openGraph?.description || seo.metaDescription || undefined,
          title: seo.openGraph?.title || seo.metaTitle || undefined,
          images: metaImage,
        }
      : undefined,
    other: parseAdditionalMetaTags(seo?.additionalMetaTags),
  };
};

export const buildWebPageJsonLd = ({
  canonicalUrl,
  locale,
  origin,
  title,
  description,
}: {
  canonicalUrl: string;
  locale: SiteLocale;
  origin: string;
  title?: string | null;
  description?: string | null;
}) => {
  const safeTitle = title?.trim() || undefined;
  const safeDescription = description?.trim() || undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    ...(safeTitle ? { name: safeTitle } : {}),
    inLanguage: locale === 'en' ? 'en-US' : 'th-TH',
    ...(safeDescription ? { description: safeDescription } : {}),
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${origin}/#website`,
    },
  };
};
