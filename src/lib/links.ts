import { clientEnv } from '@/env/clientEnv';
import {
  buildLocalizedPath,
  buildLocalizedUrl,
  type SiteLocale,
} from '@/lib/locale';
import type { LinkFragmentType } from './sanity/queries/fragments/fragment.types';

export const getBaseURL = () => {
  return clientEnv.NEXT_PUBLIC_SITE_URL || '';
};

/**
 * Generic function to generate a link to a document based on its type and slug
 */
export const getDocumentLink = (
  { _type, slug }: { _type: string; slug: string | null },
  absolute: boolean = false
) => {
  const linkBase = absolute ? getBaseURL() : '';

  switch (_type) {
    case 'page':
      return `${linkBase}/${slug}`;
    case 'post':
      return `${linkBase}/blog/${slug}`;
    case 'person':
      return `${linkBase}/author/${slug}`;
    case 'category':
      return `${linkBase}/category/${slug}`;
    case 'reviewCategory':
      return `${linkBase}/reviews/${slug}`;
    case 'homePage':
      return `${linkBase}/`;
    case 'aboutPage':
      return `${linkBase}/about`;
    default:
      return `${linkBase}/`;
  }
};

export const getLocalizedDocumentLink = (
  document: { _type: string; slug: string | null },
  locale: SiteLocale,
  absolute = false
) => {
  const path = getDocumentLink(document, false);
  const localizedPath = buildLocalizedPath(locale, path);
  return absolute
    ? buildLocalizedUrl(locale, path, getBaseURL())
    : localizedPath;
};

export const getLinkByLinkObject = (
  link: Pick<LinkFragmentType, 'type' | 'external' | 'internal'>
) => {
  const { type, external, internal } = link;

  if (type === 'external') {
    return external || '';
  }

  if (type === 'internal' && internal) {
    return getDocumentLink(internal, false);
  }
};
