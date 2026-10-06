import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServicePageContent from '@/components/pages/ServicePageContent';
import { serverEnv } from '@/env/serverEnv';
import { withStaticLocales } from '@/lib/locale';
import { getRouteLocale } from '@/lib/routeLocale';
import { client } from '@/lib/sanity/client/client';
import { formatMetaData } from '@/lib/sanity/client/seo';
import { servicePageQuery, settingsQuery } from '@/lib/sanity/queries/queries';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const privilegedClient = client.withConfig({
  useCdn: false,
  perspective: 'published',
  token: serverEnv.SANITY_API_READ_TOKEN,
  stega: false,
});

const servicePageSlugsQuery = `*[_type == "servicePage" && defined(slug.current)][0...$limit].slug.current`;

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(servicePageSlugsQuery, {
    limit: serverEnv.MAX_STATIC_PARAMS,
  });
  return withStaticLocales(
    slugs
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => ({ slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getRouteLocale(params);
  const pageData = (await privilegedClient.fetch(servicePageQuery, {
    slug,
  })) as { seo?: unknown; name?: string | null } | null;
  if (!pageData?.seo) return {};
  return formatMetaData(pageData.seo as never, pageData?.name || '', {
    locale,
    pathname: `/services/${slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const locale = await getRouteLocale(params);
  const [pageData, settings] = await Promise.all([
    privilegedClient.fetch(servicePageQuery, { slug }),
    privilegedClient.fetch(settingsQuery),
  ]);

  if (!pageData) notFound();

  return (
    <ServicePageContent
      page={pageData as never}
      locale={locale}
      globalCta={settings as never}
      socialLinks={
        ((settings as { socialLinks?: unknown[] | null } | null)?.socialLinks ||
          []) as never
      }
    />
  );
}
