import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import PageSections from '@/components/sections/PageSections';
import {
  getBreadcrumbLabel,
  homeBreadcrumb,
} from '@/components/shared/Breadcrumbs';
import { serverEnv } from '@/env/serverEnv';
import {
  buildLocalizedAlternates,
  buildLocalizedUrl,
  withStaticLocales,
} from '@/lib/locale';
import { getRouteLocale } from '@/lib/routeLocale';
import { client } from '@/lib/sanity/client/client';
import { sanityFetch } from '@/lib/sanity/client/live';
import { buildWebPageJsonLd, formatMetaData } from '@/lib/sanity/client/seo';
import {
  getPageQuery,
  homePageQuery,
  settingsQuery,
} from '@/lib/sanity/queries/queries';
import { getBaseUrl } from '@/utils/getBaseUrl';

// Top-level system pages have dedicated routes; only CMS pages without one belong here.
const genericPageSlugsQuery = `*[_type == "page" && slug.current in ["contact"]][0...$limit].slug.current`;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(genericPageSlugsQuery, {
    limit: serverEnv.MAX_STATIC_PARAMS,
  });
  return withStaticLocales(
    slugs
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => ({ slug }))
  );
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const locale = await getRouteLocale(props.params);
  const metadataContext = {
    locale,
    pathname: `/${params.slug}`,
  };

  const { data: page } = await sanityFetch({
    query: getPageQuery,
    params,
  });

  if (!page) {
    return {};
  }

  if (!page.seo) {
    return {
      alternates: buildLocalizedAlternates(
        metadataContext.locale,
        metadataContext.pathname,
        getBaseUrl()
      ),
    };
  }

  return formatMetaData(page.seo, page?.name || '', {
    ...metadataContext,
  });
}

export default async function Page(props: Props) {
  const params = await props.params;
  const isContactPage = params.slug === 'contact';
  const locale = await getRouteLocale(props.params);

  const [{ data: page }, { data: settings }, homePageResult] =
    await Promise.all([
      sanityFetch({
        query: getPageQuery,
        params,
      }),
      sanityFetch({
        query: settingsQuery,
      }),
      isContactPage
        ? sanityFetch({
            query: homePageQuery,
          })
        : Promise.resolve({ data: null }),
    ]);

  if (!page) {
    notFound();
  }

  const { _id, _type, pageSections } = page;
  const pageTitle = isContactPage
    ? getBreadcrumbLabel(locale, 'contact')
    : page.name || params.slug;
  const homeTestimonialsSection =
    homePageResult?.data?.pageSections?.find(
      (section: { _type?: string }) => section?._type === 'testimonials'
    ) || null;

  const baseUrl = getBaseUrl();
  const pageUrl = buildLocalizedUrl(locale, `/${params.slug}`, baseUrl);
  const webpageJsonLd = buildWebPageJsonLd({
    canonicalUrl: pageUrl,
    locale: locale as 'th' | 'en',
    origin: baseUrl,
    title: page.name || undefined,
    description:
      (page as { seo?: { metaDescription?: string | null } })?.seo
        ?.metaDescription || undefined,
  });

  return (
    <>
      <Script
        id={`page-webpage-jsonld-${_id}`}
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires dangerouslySetInnerHTML
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageJsonLd) }}
      />
      <PageSections
        documentId={_id}
        documentType={_type}
        locale={locale}
        sections={pageSections}
        breadcrumbs={[homeBreadcrumb(locale), { label: pageTitle }]}
        pageUrl={buildLocalizedUrl(locale, `/${params.slug}`, getBaseUrl())}
        settingsSocialLinks={settings?.socialLinks || []}
        globalCta={settings || null}
        sharedTestimonialsSection={homeTestimonialsSection}
      />
    </>
  );
}
