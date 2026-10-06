import { cookies, headers } from 'next/headers';

const LOCALES = ['th', 'en'] as const;

function localeFromPathname(pathname?: string | null): 'th' | 'en' | null {
  if (!pathname) return null;
  for (const locale of LOCALES) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return locale;
    }
  }
  return null;
}

function localeFromUrlLike(value?: string | null): 'th' | 'en' | null {
  if (!value) return null;
  try {
    const parsed = new URL(value, 'http://localhost');
    return localeFromPathname(parsed.pathname);
  } catch {
    return localeFromPathname(value);
  }
}

export async function getRequestLocale(): Promise<'th' | 'en'> {
  const headerStore = await headers();

  // Prefer explicit locale set by middleware for deterministic behavior.
  const headerLocale = headerStore.get('x-site-locale');
  if (headerLocale === 'th' || headerLocale === 'en') {
    return headerLocale;
  }

  // Derive locale from request path-like headers only.
  const headerDerivedLocale =
    localeFromUrlLike(headerStore.get('next-url')) ||
    localeFromUrlLike(headerStore.get('x-next-url')) ||
    localeFromUrlLike(headerStore.get('x-url')) ||
    localeFromUrlLike(headerStore.get('x-pathname')) ||
    localeFromUrlLike(headerStore.get('x-matched-path'));

  if (headerDerivedLocale) {
    return headerDerivedLocale;
  }

  // Final fallback is persisted user preference.
  const cookieStore = await cookies();
  return cookieStore.get('site_lang')?.value === 'en' ? 'en' : 'th';
}

