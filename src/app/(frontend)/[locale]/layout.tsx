import Script from 'next/script';
import type { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import { getBaseURL } from '@/lib/links';
import { SUPPORTED_LOCALES } from '@/lib/locale';
import { getRouteLocale } from '@/lib/routeLocale';

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = await getRouteLocale(params);
  const origin = getBaseURL();

  return (
    <>
      <Header locale={locale} />
      {children}
      <Script
        id="website-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': `${origin}/#website`,
            name: 'Drema Clinic',
            url: origin,
            inLanguage: 'th',
            publisher: {
              '@id': `${origin}/#medical-clinic`,
            },
          }),
        }}
      />
    </>
  );
}
