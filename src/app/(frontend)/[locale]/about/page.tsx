import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AboutPageContent from '@/components/pages/AboutPageContent';
import { getRouteLocale } from '@/lib/routeLocale';
import { formatMetaData } from '@/lib/sanity/client/seo';
import { serverClient } from '@/lib/sanity/client/serverClient';
import { aboutPageQuery, settingsQuery } from '@/lib/sanity/queries/queries';

type AboutPageQueryData = {
  seo?: unknown;
  name?: string | null;
} | null;
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  const page = (await serverClient.fetch(aboutPageQuery)) as AboutPageQueryData;

  if (!page?.seo) {
    return {
      title: 'About Us',
    };
  }

  return formatMetaData(page.seo as never, page.name || 'About Us', {
    locale,
    pathname: '/about',
  });
}

export default async function AboutPage({ params }: Props) {
  const locale = await getRouteLocale(params);
  const [data, settings] = await Promise.all([
    serverClient.fetch(aboutPageQuery),
    serverClient.fetch(settingsQuery),
  ]);

  if (!data) {
    notFound();
  }

  return (
    <AboutPageContent
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
