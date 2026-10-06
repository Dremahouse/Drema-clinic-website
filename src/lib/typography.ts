import type { SiteLocale } from '@/lib/locale';

/** Request header set by middleware so the root layout can emit a
 *  server-rendered, locale-correct <html lang> without client-side mutation. */
export const DREMA_LOCALE_HEADER = 'x-drema-locale';

/** Resolves the document html lang from the locale request header.
 *  Only 'en' yields 'en'; everything else (including missing headers,
 *  e.g. the Sanity Studio route) falls back to the default Thai locale. */
export function resolveHtmlLang(
  headerLocale: string | null | undefined,
): SiteLocale {
  return headerLocale === 'en' ? 'en' : 'th';
}

/** Attributes that mark an element (and its subtree) with an explicit,
 *  deterministic locale typography scope. */
export function localeScopeAttributes(locale: SiteLocale): {
  'data-locale': SiteLocale;
  lang: SiteLocale;
} {
  return { 'data-locale': locale, lang: locale };
}
