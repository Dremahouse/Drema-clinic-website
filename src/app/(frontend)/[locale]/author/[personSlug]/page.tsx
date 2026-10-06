import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import ArticleCard from '@/components/modules/ArticleCard';
import { PersonArchiveByline } from '@/components/templates/PersonArchiveByline';
import { serverEnv } from '@/env/serverEnv';
import { getLocalizedCitationSummary } from '@/lib/author/jsonLd';
import { getBaseURL, getLocalizedDocumentLink } from '@/lib/links';
import { buildLocalizedAlternates, withStaticLocales } from '@/lib/locale';
import { getRouteLocale } from '@/lib/routeLocale';
import { client } from '@/lib/sanity/client/client';
import { serverClient } from '@/lib/sanity/client/serverClient';
import { urlForImage } from '@/lib/sanity/client/utils';
import {
  personQuery,
  personSlugs,
  postsByAuthorQuery,
  settingsQuery,
} from '@/lib/sanity/queries/queries';

type Props = {
  params: Promise<{ locale: string; personSlug: string }>;
};

const loadData = async (props: Props) => {
  const { personSlug } = await props.params;

  const personData = await serverClient.fetch(personQuery, {
    slug: personSlug,
  });
  const settings = await serverClient.fetch(settingsQuery);

  let authoredPosts: Array<{
    _id: string;
    title: string;
    titleEn?: string;
    slug: string;
    excerpt?: string;
    excerptEn?: string;
    image?: { asset?: { _ref?: string } } | null;
    categories?: Array<{ slug?: string; title?: string } | null> | null;
    date?: string;
  }> = [];

  if (personData?._id) {
    authoredPosts = (await serverClient.fetch(postsByAuthorQuery, {
      personId: personData._id,
    })) as typeof authoredPosts;
  }

  return {
    person: personData,
    settings,
    authoredPosts,
  };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const [{ person }, locale] = await Promise.all([
    loadData(props),
    getRouteLocale(props.params),
  ]);

  if (!person) {
    return {};
  }

  return {
    title: `Author ${person.firstName} ${person.lastName}`,
    alternates: buildLocalizedAlternates(
      locale,
      `/author/${person.slug}`,
      getBaseURL()
    ),
  };
}

export async function generateStaticParams() {
  const slugs = await client.fetch(personSlugs, {
    limit: serverEnv.MAX_STATIC_PARAMS,
  });

  const staticParams = slugs
    ? slugs
        .filter((slug) => slug !== null)
        .map((slug) => ({ personSlug: slug }))
    : [];
  return withStaticLocales(staticParams);
}

export default async function PostPage(props: Props) {
  const { person, settings, authoredPosts } = (await loadData(props)) || {};
  const locale = await getRouteLocale(props.params);

  if (!person) {
    notFound();
  }

  const socialLinks = Array.isArray(settings?.socialLinks)
    ? settings.socialLinks
    : [];
  const lineEmporiumHref =
    socialLinks.find((item) => {
      const platform = (item?.platform || '').toLowerCase();
      const label = (item?.label || '').toLowerCase();
      const url = (item?.url || '').toLowerCase();

      return (
        platform.includes('line') &&
        (label.includes('emporium') ||
          url.includes('@drema.emporium') ||
          url.includes('drema.emporium'))
      );
    })?.url || undefined;

  const origin = getBaseURL();
  const personUrl = getLocalizedDocumentLink(
    { _type: 'person', slug: person.slug },
    locale,
    true
  );
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${origin}/#person-${person.slug}`,
    name: `${person.firstName} ${person.lastName}`,
    ...(person.role
      ? {
          jobTitle:
            locale === 'en' ? person.roleEn || person.role : person.role,
        }
      : {}),
    ...(getLocalizedCitationSummary(
      locale,
      person.citationSummaryTh,
      person.citationSummaryEn
    )
      ? {
          description: getLocalizedCitationSummary(
            locale,
            person.citationSummaryTh,
            person.citationSummaryEn
          ),
        }
      : {}),
    ...(person.image?.asset?._ref
      ? {
          image: person.image.asset._ref
            ? `${origin}/api/sanity/image?asset=${person.image.asset._ref}`
            : undefined,
        }
      : {}),
    url: personUrl,
    worksFor: {
      '@type': 'Organization',
      '@id': `${origin}/#medical-clinic`,
      name: 'Drema Clinic',
    },
  };

  const webpageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${personUrl}#webpage`,
    url: personUrl,
    name: `${person.firstName} ${person.lastName}`,
    inLanguage: locale === 'en' ? 'en-US' : 'th-TH',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${origin}/#website`,
    },
  };

  const articleCards = (authoredPosts || [])
    .filter((post) => post.slug)
    .map((post) => ({
      id: post._id,
      title: locale === 'en' ? post.titleEn || post.title : post.title,
      excerpt: locale === 'en' ? post.excerptEn || post.excerpt : post.excerpt,
      href: getLocalizedDocumentLink(
        { _type: 'post', slug: post.slug },
        locale
      ),
      imageUrl: post.image?.asset?._ref
        ? urlForImage(post.image as never)
            ?.width(1200)
            .url()
        : undefined,
      imageAlt: post.image?.asset?._ref
        ? `${locale === 'en' ? post.titleEn || post.title : post.title}`
        : undefined,
      categoryLabel: post.categories?.[0]?.title || undefined,
      date: post.date || undefined,
    }));

  return (
    <>
      <Script
        id={`webpage-jsonld-${person._id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageJsonLd) }}
      />
      <Script
        id={`person-jsonld-${person._id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <PersonArchiveByline
        person={person}
        locale={locale}
        lineEmporiumHref={lineEmporiumHref}
      />
      {articleCards.length > 0 ? (
        <section className="mx-auto mt-10 max-w-6xl">
          <div className="mb-8 border-t border-[var(--marketing-border)] pt-6">
            <h2 className="font-heading text-4xl text-[var(--foreground)] md:text-5xl">
              {locale === 'en' ? 'Articles by this doctor' : 'บทความโดยแพทย์'}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articleCards.map((article) => (
              <ArticleCard key={article.id} article={article} locale={locale} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
