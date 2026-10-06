import { notFound } from 'next/navigation';
import { isSiteLocale, type SiteLocale } from '@/lib/locale';

/** Validates the real App Router locale segment for frontend route wrappers. */
export async function getRouteLocale(
  params: Promise<{ locale: string }>
): Promise<SiteLocale> {
  const { locale } = await params;

  if (!isSiteLocale(locale)) {
    notFound();
  }

  return locale;
}
