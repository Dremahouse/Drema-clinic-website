import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AestheticTreatmentsPageContent from '@/components/pages/AestheticTreatmentsPageContent';
import { getRouteLocale } from '@/lib/routeLocale';
import { sanityFetch } from '@/lib/sanity/client/live';
import { formatMetaData } from '@/lib/sanity/client/seo';
import {
  aestheticTreatmentsPageQuery,
  settingsQuery,
} from '@/lib/sanity/queries/queries';

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
    pathname: '/aesthetic-treatments',
  });
}

export default async function AestheticTreatmentsPage({ params }: Props) {
  const locale = await getRouteLocale(params);
  const [{ data: pageData }, { data: settingsData }] = await Promise.all([
    sanityFetch({ query: aestheticTreatmentsPageQuery }),
    sanityFetch({ query: settingsQuery }),
  ]);

  if (!pageData) notFound();

  return (
    <AestheticTreatmentsPageContent
      page={pageData as never}
      globalCta={settingsData as never}
      socialLinks={
        ((settingsData as { socialLinks?: unknown[] | null } | null)
          ?.socialLinks || []) as never
      }
      locale={locale}
    />
  );
}
