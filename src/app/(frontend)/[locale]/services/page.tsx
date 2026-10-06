import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import AestheticTreatmentsPageContent from '@/components/pages/AestheticTreatmentsPageContent';
import { getRouteLocale } from '@/lib/routeLocale';
import { sanityFetch } from '@/lib/sanity/client/live';
import { buildWebPageJsonLd, formatMetaData } from '@/lib/sanity/client/seo';
import {
  aestheticTreatmentsPageQuery,
  settingsQuery,
} from '@/lib/sanity/queries/queries';
import { getBaseUrl } from '@/utils/getBaseUrl';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  const { data } = await sanityFetch({
    query: aestheticTreatmentsPageQuery,
  });
  const pageData = data as { seo?: unknown; name?: string | null } | null;
  if (!pageData?.seo) return {};
  return formatMetaData(pageData.seo as never, pageData?.name || '', {
    locale,
    pathname: '/services',
  });
}

export default async function ServicesPage({ params }: Props) {
  const locale = await getRouteLocale(params);
  const [{ data: pageData }, { data: settingsData }] = await Promise.all([
    sanityFetch({ query: aestheticTreatmentsPageQuery }),
    sanityFetch({ query: settingsQuery }),
  ]);

  if (!pageData) notFound();

  const baseUrl = getBaseUrl();
  const servicesUrl = new URL(`/${locale}/services`, baseUrl).toString();
  const webpageJsonLd = buildWebPageJsonLd({
    canonicalUrl: servicesUrl,
    locale: locale as 'th' | 'en',
    origin: baseUrl,
    title: (pageData as { name?: string | null } | null)?.name || undefined,
    description:
      (pageData as { seo?: { metaDescription?: string | null } } | null)?.seo
        ?.metaDescription || undefined,
  });

  return (
    <>
      <Script
        id="services-webpage-jsonld"
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires dangerouslySetInnerHTML
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageJsonLd) }}
      />
      <AestheticTreatmentsPageContent
        page={pageData as never}
        globalCta={settingsData as never}
        socialLinks={
          ((settingsData as { socialLinks?: unknown[] | null } | null)
            ?.socialLinks || []) as never
        }
        locale={locale}
        breadcrumbKey="services"
      />
    </>
  );
}
