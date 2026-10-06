import { buildLocalizedPath, type SiteLocale } from '@/lib/locale';

export const getBlogPaginationRedirectPath = (locale: SiteLocale) =>
  buildLocalizedPath(locale, '/blog');

export const getCategoryPaginationRedirectPath = (
  locale: SiteLocale,
  categorySlug: string
) => buildLocalizedPath(locale, `/category/${categorySlug}`);

export const getAuthorPaginationRedirectPath = (
  locale: SiteLocale,
  personSlug: string
) => buildLocalizedPath(locale, `/author/${personSlug}`);
