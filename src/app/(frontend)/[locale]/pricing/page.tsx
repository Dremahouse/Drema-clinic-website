import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PricingPageContent from '@/components/pages/PricingPageContent';
import { getRouteLocale } from '@/lib/routeLocale';
import { sanityFetch } from '@/lib/sanity/client/live';
import { formatMetaData } from '@/lib/sanity/client/seo';
import { pricingPageQuery, settingsQuery } from '@/lib/sanity/queries/queries';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  const { data } = await sanityFetch({ query: pricingPageQuery });
  const pageData = data as { seo?: unknown; name?: string | null } | null;
  if (!pageData?.seo) return {};
  return formatMetaData(pageData.seo as never, pageData?.name || 'Pricing', {
    locale,
    pathname: '/pricing',
  });
}

export default async function PricingPage({ params }: Props) {
  const locale = await getRouteLocale(params);
  const [{ data }, { data: settings }] = await Promise.all([
    sanityFetch({ query: pricingPageQuery }),
    sanityFetch({ query: settingsQuery }),
  ]);

  if (!data) notFound();

  return (
    <PricingPageContent
      page={data as never}
      locale={locale}
      globalCta={settings as never}
      socialLinks={
        ((settings as { socialLinks?: unknown[] | null } | null)?.socialLinks ||
          []) as never
      }
    />
  );
}
