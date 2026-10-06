import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import Post from '@/components/templates/Post';
import { serverEnv } from '@/env/serverEnv';
import { getBaseURL, getLocalizedDocumentLink } from '@/lib/links';
import { withStaticLocales } from '@/lib/locale';
import { getRouteLocale } from '@/lib/routeLocale';
import { client } from '@/lib/sanity/client/client';
import { sanityFetch } from '@/lib/sanity/client/live';
import { serverClient } from '@/lib/sanity/client/serverClient';
import { urlForImage } from '@/lib/sanity/client/utils';
import {
  postQuery,
  postsInSameCategoriesQuery,
  settingsQuery,
  underEyeFillerPostNestedSlugs,
} from '@/lib/sanity/queries/queries';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const loadData = async (props: Props) => {
  const { slug } = await props.params;
  const fullSlug = `filler/under-eye/${slug}`;
  return serverClient.fetch(postQuery, { slug: fullSlug });
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const [routeData, locale] = await Promise.all([
    loadData(props),
    getRouteLocale(props.params),
  ]);

  if (!routeData) {
    return {};
  }

  const origin = getLocalizedDocumentLink(routeData, locale, true);
  const hasEnglishContent = Array.isArray(routeData.contentEn) && routeData.contentEn.length > 0;
  const languages: Record<string, string> = {
    th: getLocalizedDocumentLink(routeData, 'th', true),
  };
  if (hasEnglishContent) {
    languages.en = getLocalizedDocumentLink(routeData, 'en', true);
  }

  return {
    alternates: {
      canonical: origin,
      languages,
    },
  };
}

export async function generateStaticParams() {
  const slugs = await client.fetch(underEyeFillerPostNestedSlugs, {
    limit: serverEnv.MAX_STATIC_PARAMS,
  });

  const staticParams = slugs
    ? slugs
        .filter((slug) => slug !== null)
        .map((slug) => String(slug).replace(/^filler\/under-eye\//, ''))
        .map((slug) => ({ slug }))
    : [];

  return withStaticLocales(staticParams);
}

export default async function UnderEyeFillerPostPage(props: Props) {
  const [post, settings] = await Promise.all([
    loadData(props),
    serverClient.fetch(settingsQuery),
  ]);
  const locale = await getRouteLocale(props.params);

  if (!post) {
    notFound();
  }
  const typedPost = post as any;
  const categoryIds = (post.categories || [])
    .map((category) => category?._id)
    .filter(Boolean) as string[];

  let previousPost: any = null;
  let nextPost: any = null;

  if (categoryIds.length) {
    const { data: siblingPosts } = await sanityFetch({
      query: postsInSameCategoriesQuery,
      params: {
        currentId: post._id,
        categoryIds,
      },
    });

    const ordered = [post, ...(siblingPosts || [])].sort((a: any, b: any) => {
      const dateA = new Date(a?.date || a?._updatedAt || 0).getTime();
      const dateB = new Date(b?.date || b?._updatedAt || 0).getTime();
      if (dateA !== dateB) return dateB - dateA;
      return String(b?._id || '').localeCompare(String(a?._id || ''));
    });

    const currentIndex = ordered.findIndex(
      (item: any) => item?._id === post._id
    );
    if (currentIndex !== -1) {
      previousPost = ordered[currentIndex + 1] || null;
      nextPost = ordered[currentIndex - 1] || null;
    }
  }

  const canonicalUrl = getLocalizedDocumentLink(post, locale, true);
  const origin = getBaseURL();
  const imageUrl = post.image
    ? urlForImage(post.image)?.width(1200).url()
    : undefined;

  const headline = locale === 'en' ? typedPost.titleEn || post.title : post.title;
  const webpageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: headline,
    inLanguage: locale === 'en' ? 'en-US' : 'th-TH',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${origin}/#website`,
    },
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${canonicalUrl}#article`,
    headline,
    description:
      locale === 'en'
        ? typedPost.excerptEn || post.excerpt || undefined
        : post.excerpt || undefined,
    datePublished: post.date || undefined,
    mainEntityOfPage: `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    inLanguage: locale === 'en' ? 'en-US' : 'th-TH',
    image: imageUrl ? [imageUrl] : undefined,
    author: post.author
      ? {
          '@type': 'Person',
          '@id': `${origin}/#person-${post.author.slug}`,
          name: [post.author.firstName, post.author.lastName]
            .filter(Boolean)
            .join(' '),
        }
      : undefined,
    about: post.categories?.map((category) => ({
      '@type': 'Thing',
      name: category.title,
      url: getLocalizedDocumentLink(category, locale, true),
    })),
    publisher: {
      '@type': 'Organization',
      '@id': `${origin}/#medical-clinic`,
      name: 'Drema Clinic',
    },
    ...(post.medicalReviewer
      ? {
          reviewedBy: {
            '@type': 'Person',
            '@id': `${origin}/#person-${post.medicalReviewer.slug}`,
            name: [post.medicalReviewer.firstName, post.medicalReviewer.lastName]
              .filter(Boolean)
              .join(' '),
          },
        }
      : {}),
  };

  return (
    <>
      <Script
        id={`webpage-jsonld-${post._id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageJsonLd) }}
      />
      <Script
        id={`blogposting-jsonld-${post._id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Post
        post={post}
        locale={locale}
        blogHeroBackgroundImage={
          (
            settings as {
              blogArticleHeroBackgroundImage?: {
                alt?: string | null;
                asset?: { _id?: string | null; _ref?: string | null } | null;
              } | null;
            } | null
          )?.blogArticleHeroBackgroundImage
        }
        siblingNav={{
          previous: previousPost,
          next: nextPost,
        }}
      />
    </>
  );
}
