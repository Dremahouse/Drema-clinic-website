export const SUPPORTED_LOCALES = ['th', 'en'] as const;

export type SiteLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SiteLocale = 'th';

export function isSiteLocale(
  value: string | null | undefined
): value is SiteLocale {
  return value === 'th' || value === 'en';
}

/** Expands content-derived params only after their existing cap has been applied. */
export function withStaticLocales<T extends Record<string, string>>(
  params: T[]
): Array<T & { locale: SiteLocale }> {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    params.map((param) => ({ ...param, locale }))
  );
}

export function buildLocalizedPath(locale: SiteLocale, pathname = '/'): string {
  const [path, search = ''] = pathname.split('?', 2);
  const normalizedPath = path === '/' ? '' : `/${path.replace(/^\/+/, '')}`;
  return `/${locale}${normalizedPath}${search ? `?${search}` : ''}`;
}

export function buildLocalizedUrl(
  locale: SiteLocale,
  pathname: string,
  origin: string
): string {
  return `${origin.replace(/\/+$/, '')}${buildLocalizedPath(locale, pathname)}`;
}

export function buildDraftPreviewPath(
  locale: SiteLocale,
  pathname: string
): string {
  return buildLocalizedPath(locale, pathname);
}

export function normalizeAuthoredPublicUrl(
  value: string | null | undefined,
  locale: SiteLocale,
  siteOrigin: string
): string | undefined {
  if (!value) return undefined;
  const normalizedOrigin = siteOrigin.replace(/\/+$/, '');
  if (value.startsWith('/')) {
    return buildLocalizedUrl(
      locale,
      value.replace(/^\/(th|en)(?=\/|$)/, '') || '/',
      normalizedOrigin
    );
  }
  try {
    const url = new URL(value);
    if (url.origin !== normalizedOrigin) return value;
    return buildLocalizedUrl(
      locale,
      `${url.pathname.replace(/^\/(th|en)(?=\/|$)/, '') || '/'}${url.search}${url.hash}`,
      normalizedOrigin
    );
  } catch {
    return value;
  }
}

export function buildLocalizedAlternates(
  locale: SiteLocale,
  pathname: string,
  origin: string
): { canonical: string; languages: Record<'th' | 'en', string> } {
  const canonical = buildLocalizedUrl(locale, pathname, origin);
  return {
    canonical,
    languages: {
      th: buildLocalizedUrl('th', pathname, origin),
      en: buildLocalizedUrl('en', pathname, origin),
    },
  };
}
