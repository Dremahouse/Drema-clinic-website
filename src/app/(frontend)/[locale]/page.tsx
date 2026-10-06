import { notFound } from 'next/navigation';
import Script from 'next/script';
import HomePageContent from '@/components/pages/HomePageContent';
import { buildLocalizedUrl } from '@/lib/locale';
import { getRouteLocale } from '@/lib/routeLocale';
import { buildWebPageJsonLd, formatMetaData } from '@/lib/sanity/client/seo';
import { serverClient } from '@/lib/sanity/client/serverClient';
import { homePageQuery, settingsQuery } from '@/lib/sanity/queries/queries';
import { getBaseUrl } from '@/utils/getBaseUrl';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await getRouteLocale(params);
  const homePage = await serverClient.fetch(homePageQuery);

  if (!homePage?.seo) {
    return {};
  }

  return formatMetaData(homePage.seo, homePage?.name || '', {
    locale,
    pathname: '/',
  });
}

export default async function Page({ params }: Props) {
  const locale = await getRouteLocale(params);
  const [homePage, settings] = await Promise.all([
    serverClient.fetch(homePageQuery),
    serverClient.fetch(settingsQuery),
  ]);

  if (!homePage) {
    notFound();
  }

  const { _id, _type, pageSections } = homePage;
  const baseUrl = getBaseUrl();
  const homeUrl = buildLocalizedUrl(locale, '/', baseUrl);
  const webpageJsonLd = buildWebPageJsonLd({
    canonicalUrl: homeUrl,
    locale: locale as 'th' | 'en',
    origin: baseUrl,
    title: homePage?.name || undefined,
    description: homePage?.seo?.metaDescription || undefined,
  });

  return (
    <>
      <Script
        id="home-webpage-jsonld"
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires dangerouslySetInnerHTML
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageJsonLd) }}
      />
      <HomePageContent
        documentId={_id}
        documentType={_type}
        locale={locale}
        sections={pageSections}
        homePage={homePage}
        settingsSocialLinks={settings?.socialLinks || []}
        globalCta={settings || null}
      />
    </>
  );
}
