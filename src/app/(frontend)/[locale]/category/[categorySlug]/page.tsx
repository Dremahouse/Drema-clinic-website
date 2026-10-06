import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import Script from 'next/script';
import type { ArticleCardItem } from '@/components/modules/ArticleCard';
import CategoryLoadMoreGrid from '@/components/modules/CategoryLoadMoreGrid';
import {
  Breadcrumbs,
  getBreadcrumbLabel,
  homeBreadcrumb,
} from '@/components/shared/Breadcrumbs';
import Page from '@/components/templates/Page';
import { serverEnv } from '@/env/serverEnv';
import { resolveCategorySlugAlias } from '@/lib/categorySlugAliases';
import { getLocalizedDocumentLink } from '@/lib/links';
import {
  buildLocalizedAlternates,
  buildLocalizedPath,
  buildLocalizedUrl,
  type SiteLocale,
  withStaticLocales,
} from '@/lib/locale';
import { getRouteLocale } from '@/lib/routeLocale';
import { client } from '@/lib/sanity/client/client';
import { buildWebPageJsonLd } from '@/lib/sanity/client/seo';
import { urlForImage } from '@/lib/sanity/client/utils';
import {
  categoryChildrenByParentSlugQuery,
  categoryQuery,
  categorySlugs,
  postsArchiveQuery,
} from '@/lib/sanity/queries/queries';
import { getBaseUrl } from '@/utils/getBaseUrl';

type Props = { params: Promise<{ locale: string; categorySlug: string }> };
type SanityImageLike = {
  asset?: {
    _ref?: string | null;
    _id?: string | null;
  } | null;
  alt?: string | null;
} | null;
type PostItem = {
  _id: string;
  _type: 'post' | string;
  title: string;
  titleEn?: string | null;
  slug: string;
  excerpt?: string | null;
  excerptEn?: string | null;
  date?: string | null;
  image?: SanityImageLike;
  categories?: Array<{
    slug?: string | null;
    title?: string | null;
  } | null> | null;
};
type CategoryItem = {
  _id: string;
  _type: 'category' | string;
  title: string;
  slug: string;
  description?: string | null;
  descriptionTh?: string | null;
  descriptionEn?: string | null;
  coverImage?: SanityImageLike;
  parentCategory?: {
    _id?: string | null;
    _type?: string | null;
    title?: string | null;
    slug?: string | null;
  } | null;
  featuredSectionTitleTh?: string | null;
  featuredSectionTitleEn?: string | null;
  subtitleTh?: string | null;
  subtitleEn?: string | null;
  reasonHeadingTh?: string | null;
  reasonHeadingEn?: string | null;
  reasonPoints?: Array<{
    _key?: string;
    textTh?: string | null;
    textEn?: string | null;
  }> | null;
  compareHeadingTh?: string | null;
  compareHeadingEn?: string | null;
  compareRows?: Array<{
    _key?: string;
    topicTh?: string | null;
    topicEn?: string | null;
    bestForTh?: string | null;
    bestForEn?: string | null;
    typeTh?: string | null;
    typeEn?: string | null;
  }> | null;
  faqHeadingTh?: string | null;
  faqHeadingEn?: string | null;
  faqItems?: Array<{
    _key?: string;
    questionTh?: string | null;
    questionEn?: string | null;
    answerTh?: string | null;
    answerEn?: string | null;
  }> | null;
  featuredItems?: Array<PostItem | CategoryItem> | null;
};
type PostsArchiveLike = { results?: PostItem[] | null } | null;
type FaqItem = { q: string; a: string };
type CompareRow = { tech: string; bestFor: string; type: string };
const privilegedClient = client.withConfig({
  useCdn: false,
  perspective: 'published',
  token: serverEnv.SANITY_API_READ_TOKEN,
  stega: false,
});

const loadData = async (
  props: Props
): Promise<{
  category: CategoryItem | null;
  childCategories: CategoryItem[];
  posts: PostsArchiveLike;
}> => {
  const { categorySlug } = await props.params;

  const [archiveData, categoryData, childCategoriesData] = await Promise.all([
    privilegedClient.fetch(postsArchiveQuery, {
      from: 0,
      to: 999,
      filters: { categorySlug },
    }),
    privilegedClient.fetch(categoryQuery, { slug: categorySlug }),
    privilegedClient.fetch(categoryChildrenByParentSlugQuery, {
      parentSlug: categorySlug,
    }),
  ]);

  return {
    category:
      categoryData &&
      typeof categoryData === 'object' &&
      typeof (categoryData as { slug?: unknown }).slug === 'string'
        ? ({
            _id: (categoryData as { _id?: string })._id || '',
            _type: 'category',
            title: (categoryData as { title?: string }).title || '',
            slug: (categoryData as { slug: string }).slug,
            description:
              (categoryData as { description?: string | null }).description ||
              null,
            descriptionTh:
              (categoryData as { descriptionTh?: string | null })
                .descriptionTh || null,
            descriptionEn:
              (categoryData as { descriptionEn?: string | null })
                .descriptionEn || null,
            subtitleTh:
              (categoryData as { subtitleTh?: string | null }).subtitleTh ||
              null,
            subtitleEn:
              (categoryData as { subtitleEn?: string | null }).subtitleEn ||
              null,
            coverImage:
              ((categoryData as { coverImage?: SanityImageLike }).coverImage ??
                null) ||
              null,
            parentCategory:
              ((
                categoryData as {
                  parentCategory?: CategoryItem['parentCategory'];
                }
              ).parentCategory ??
                null) ||
              null,
            featuredSectionTitleTh:
              (categoryData as { featuredSectionTitleTh?: string | null })
                .featuredSectionTitleTh || null,
            featuredSectionTitleEn:
              (categoryData as { featuredSectionTitleEn?: string | null })
                .featuredSectionTitleEn || null,
            reasonHeadingTh:
              (categoryData as { reasonHeadingTh?: string | null })
                .reasonHeadingTh || null,
            reasonHeadingEn:
              (categoryData as { reasonHeadingEn?: string | null })
                .reasonHeadingEn || null,
            reasonPoints:
              (
                categoryData as {
                  reasonPoints?: Array<{
                    _key?: string;
                    textTh?: string | null;
                    textEn?: string | null;
                  }> | null;
                }
              ).reasonPoints || null,
            compareHeadingTh:
              (categoryData as { compareHeadingTh?: string | null })
                .compareHeadingTh || null,
            compareHeadingEn:
              (categoryData as { compareHeadingEn?: string | null })
                .compareHeadingEn || null,
            compareRows:
              (
                categoryData as {
                  compareRows?: Array<{
                    _key?: string;
                    topicTh?: string | null;
                    topicEn?: string | null;
                    bestForTh?: string | null;
                    bestForEn?: string | null;
                    typeTh?: string | null;
                    typeEn?: string | null;
                  }> | null;
                }
              ).compareRows || null,
            faqHeadingTh:
              (categoryData as { faqHeadingTh?: string | null }).faqHeadingTh ||
              null,
            faqHeadingEn:
              (categoryData as { faqHeadingEn?: string | null }).faqHeadingEn ||
              null,
            faqItems:
              (
                categoryData as {
                  faqItems?: Array<{
                    _key?: string;
                    questionTh?: string | null;
                    questionEn?: string | null;
                    answerTh?: string | null;
                    answerEn?: string | null;
                  }> | null;
                }
              ).faqItems || null,
            featuredItems: (
              ((categoryData as { featuredItems?: unknown[] })
                .featuredItems as Array<Record<string, unknown>>) || []
            )
              .filter(
                (item) =>
                  (item?._type === 'category' || item?._type === 'post') &&
                  typeof item?._id === 'string' &&
                  typeof item?.slug === 'string' &&
                  typeof item?.title === 'string'
              )
              .map((item) =>
                item._type === 'category'
                  ? ({
                      _id: item._id as string,
                      _type: 'category',
                      title: item.title as string,
                      slug: item.slug as string,
                      description: (item.excerpt as string) || null,
                      descriptionTh:
                        (item.descriptionTh as string | undefined) || null,
                      descriptionEn:
                        (item.descriptionEn as string | undefined) || null,
                      coverImage: (item.image as SanityImageLike) || null,
                    } as CategoryItem)
                  : ({
                      _id: item._id as string,
                      _type: 'post',
                      title: item.title as string,
                      titleEn: (item.titleEn as string | undefined) || null,
                      slug: item.slug as string,
                      excerpt: (item.excerpt as string) || null,
                      excerptEn: (item.excerptEn as string | undefined) || null,
                      image: (item.image as SanityImageLike) || null,
                      categories:
                        (item.categories as Array<{
                          slug?: string | null;
                        } | null>) || null,
                    } as PostItem)
              ) as Array<PostItem | CategoryItem>,
          } as CategoryItem)
        : null,
    childCategories: (
      (childCategoriesData as Array<Record<string, unknown>>) || []
    )
      .filter((item) => typeof item?.slug === 'string')
      .map((item) => ({
        _id: (item._id as string) || '',
        _type: 'category',
        title: (item.title as string) || '',
        slug: item.slug as string,
        description: (item.description as string) || null,
        descriptionTh: (item.descriptionTh as string) || null,
        descriptionEn: (item.descriptionEn as string) || null,
        coverImage: (item.coverImage as SanityImageLike) || null,
      })),
    posts: {
      results: (
        ((archiveData as { results?: Array<Record<string, unknown>> })
          ?.results || []) as Array<Record<string, unknown>>
      )
        .filter(
          (item) =>
            typeof item?._id === 'string' &&
            typeof item?.title === 'string' &&
            typeof item?.slug === 'string'
        )
        .map((item) => ({
          _id: item._id as string,
          _type: 'post',
          title: item.title as string,
          titleEn: (item.titleEn as string) || null,
          slug: item.slug as string,
          excerpt: (item.excerpt as string) || null,
          excerptEn: (item.excerptEn as string) || null,
          image: (item.image as SanityImageLike) || null,
          categories:
            (item.categories as Array<{ slug?: string | null } | null>) || null,
        })),
    },
  };
};

function isBrokenText(value?: string | null) {
  if (!value) return true;
  const text = value.trim();
  if (!text) return true;
  if (/[ï¿½]/.test(text)) return true;
  if (/\?{4,}/.test(text)) return true;
  return false;
}

function cleanDisplayText(value?: string | null) {
  if (!value) return '';
  return value
    .replace(/[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractLocalizedSegment(
  value: string | null | undefined,
  locale: 'th' | 'en'
) {
  const text = cleanDisplayText(value);
  if (!text) return '';

  const match = text.match(/(?:^|\s)TH:\s*([\s\S]*?)(?:\s+EN:\s*([\s\S]*))?$/i);
  if (!match) return text;

  const thText = cleanDisplayText(match[1]);
  const enText = cleanDisplayText(match[2]);
  return locale === 'en' ? enText || thText : thText || enText;
}

function getLocalizedCategoryDescription(
  category: Pick<
    CategoryItem,
    'description' | 'descriptionTh' | 'descriptionEn'
  >,
  locale: 'th' | 'en'
) {
  const localized =
    locale === 'en' ? category.descriptionEn : category.descriptionTh;
  return extractLocalizedSegment(localized || category.description, locale);
}

function getLocalizedPostExcerpt(post: PostItem, locale: 'th' | 'en') {
  const localized = locale === 'en' ? post.excerptEn : post.excerpt;
  if (localized) return cleanDisplayText(localized);
  return extractLocalizedSegment(localized || post.excerpt, locale);
}

function getLocalizedPostTitle(post: PostItem, locale: 'th' | 'en') {
  const localized = locale === 'en' ? post.titleEn : post.title;
  if (localized) return cleanDisplayText(localized);
  return extractLocalizedSegment(localized || post.title, locale);
}

function getCategorySubtitle(category: CategoryItem, locale: 'th' | 'en') {
  return locale === 'en'
    ? cleanDisplayText(category.subtitleEn)
    : cleanDisplayText(category.subtitleTh);
}

function toTitleFromSlug(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getDefaultReasonHeading(category: CategoryItem, locale: 'th' | 'en') {
  const baseTitle =
    cleanDisplayText(category.title) || toTitleFromSlug(category.slug);
  if (locale === 'en') return `Key Benefits of ${baseTitle}`;
  return `จุดเด่นของ${baseTitle}`;
}

function getSubFallback(
  parentSlug: string,
  childSlug: string,
  locale: 'th' | 'en'
) {
  const fallback =
    locale === 'en'
      ? 'Focused treatment content for this topic.'
      : 'เนื้อหาเฉพาะทางสำหรับหัวข้อนี้';

  const thMap: Record<string, Record<string, string>> = {
    filler: {
      restylane: 'ฟิลเลอร์ที่เด่นด้านความยืดหยุ่นและความเป็นธรรมชาติ',
      belotero: 'ฟิลเลอร์เนื้อเนียนละเอียด เหมาะกับงานผิว',
      biohyalux: 'ฟิลเลอร์เพื่อการปรับรูปหน้าอย่างสมดุล',
      revanesse: 'ฟิลเลอร์ที่ให้ผลลัพธ์ละมุนและคงรูปสวย',
    },
    'skin-booster': {
      juvelook: 'ฟื้นฟูผิวและความเรียบเนียนจากภายใน',
      profhilo: 'เพิ่มความชุ่มชื้นและความยืดหยุ่นของผิว',
      karisma: 'กระตุ้นคอลลาเจนเพื่อผิวแน่นฟู',
      radiesse: 'เสริมโครงสร้างผิวและกระตุ้นคอลลาเจน',
      sculptra: 'กระตุ้นคอลลาเจนระยะยาวอย่างเป็นธรรมชาติ',
    },
    'laser-energy-devices': {
      pico: 'เลเซอร์ความเร็วสูงสำหรับเม็ดสีและการปรับโทนผิว',
      sylfirm: 'RF Microneedling สำหรับรอยแดงและหลุมสิว',
      endolift: 'เลเซอร์ยกกระชับเฉพาะจุด',
      emface: 'ยกกระชับพร้อมกระตุ้นกล้ามเนื้อบนใบหน้า',
      'ulthera-prime': 'เทคโนโลยีอัลตราซาวด์เพื่อยกกระชับ',
    },
    botox: {},
  };

  const enMap: Record<string, Record<string, string>> = {
    filler: {
      restylane: 'Flexible filler profile with natural movement.',
      belotero: 'Soft integration for delicate correction.',
      biohyalux: 'Balanced volume and contour support.',
      revanesse: 'Smooth finish for refined shaping.',
    },
    'skin-booster': {
      juvelook: 'Improves skin quality and texture.',
      profhilo: 'Hydration and elasticity support.',
      karisma: 'Collagen-focused skin renewal.',
      radiesse: 'Structural support with stimulation.',
      sculptra: 'Long-term collagen support.',
    },
    'laser-energy-devices': {
      pico: 'High-speed laser for pigment and tone correction.',
      sylfirm: 'RF microneedling for redness and scars.',
      endolift: 'Laser-assisted contour and tightening.',
      emface: 'Lifting with facial muscle stimulation.',
      'ulthera-prime': 'Focused ultrasound lifting technology.',
    },
    botox: {},
  };

  if (locale === 'en') return enMap[parentSlug]?.[childSlug] || fallback;
  return thMap[parentSlug]?.[childSlug] || fallback;
}

function getCompareRowsFromCategory(
  category: CategoryItem,
  locale: 'th' | 'en'
): CompareRow[] {
  return (category.compareRows || [])
    .map((row) => ({
      tech: cleanDisplayText(locale === 'en' ? row.topicEn : row.topicTh),
      bestFor: cleanDisplayText(
        locale === 'en' ? row.bestForEn : row.bestForTh
      ),
      type: cleanDisplayText(locale === 'en' ? row.typeEn : row.typeTh),
    }))
    .filter((row) => row.tech && row.bestFor && row.type);
}

function getFaqsFromCategory(
  category: CategoryItem,
  locale: 'th' | 'en'
): FaqItem[] {
  return (category.faqItems || [])
    .map((item) => ({
      q: cleanDisplayText(locale === 'en' ? item.questionEn : item.questionTh),
      a: cleanDisplayText(locale === 'en' ? item.answerEn : item.answerTh),
    }))
    .filter((item) => item.q && item.a);
}

async function buildCategoryMetadata(
  props: Props,
  locale: SiteLocale
): Promise<Metadata> {
  const { category } = (await loadData(props)) || {};
  if (!category) return notFound();
  const description =
    getLocalizedCategoryDescription(category, locale) ||
    `Articles in ${category.title}`;
  return {
    title: `${category.title} | Drema Clinic`,
    description,
    alternates: buildLocalizedAlternates(
      locale,
      `/category/${category.slug}`,
      getBaseUrl()
    ),
  };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  return buildCategoryMetadata(props, await getRouteLocale(props.params));
}

export async function generateStaticParams() {
  const slugs = await client.fetch(categorySlugs, {
    limit: serverEnv.MAX_STATIC_PARAMS,
  });
  const staticParams = slugs
    ? slugs
        .filter((slug) => slug !== null)
        .map((slug) => ({ categorySlug: slug }))
    : [];
  return withStaticLocales(staticParams);
}

async function CategoryPageImplementation(props: Props, locale: SiteLocale) {
  const { categorySlug } = await props.params;
  const alias = resolveCategorySlugAlias(categorySlug);
  if (alias) redirect(buildLocalizedPath(locale, `/category/${alias}`));

  const { posts, category, childCategories } = (await loadData(props)) || {};
  if (!category) notFound();

  const postsList = (posts?.results || []) as PostItem[];
  const isThreadLiftCategory = category.slug === 'thread-lift';

  const sortedChildCategories = isThreadLiftCategory
    ? [...childCategories].sort((a, b) => {
        const aPriority = a.slug === 'thread-lift-overview' ? 0 : 1;
        const bPriority = b.slug === 'thread-lift-overview' ? 0 : 1;
        if (aPriority !== bPriority) return aPriority - bPriority;
        return (a.title || '').localeCompare(b.title || '');
      })
    : childCategories;

  const sortedPostsList = isThreadLiftCategory
    ? [...postsList].sort((a, b) => {
        const aIsOverview = (a.categories || []).some(
          (c) => c?.slug === 'thread-lift-overview'
        );
        const bIsOverview = (b.categories || []).some(
          (c) => c?.slug === 'thread-lift-overview'
        );
        if (aIsOverview === bIsOverview) return 0;
        return aIsOverview ? -1 : 1;
      })
    : postsList;

  const manualFeaturedItems = (category.featuredItems || []).filter(
    (item) => item?._type === 'category' || item?._type === 'post'
  );
  const featuredTopicItems =
    manualFeaturedItems.length > 0
      ? manualFeaturedItems
      : sortedChildCategories.length > 0
        ? sortedChildCategories
        : sortedPostsList;
  const shouldShowFeaturedTopicsSection =
    manualFeaturedItems.length > 0 || sortedChildCategories.length > 0;

  const articleCards: ArticleCardItem[] = sortedPostsList.map((post) => {
    const safeExcerpt = getLocalizedPostExcerpt(post, locale as 'th' | 'en');
    const imageUrl = post.image
      ? urlForImage(post.image)
          ?.fit('max')
          .width(1200)
          .height(1200)
          .auto('format')
          .url()
      : undefined;

    return {
      id: post._id,
      title: getLocalizedPostTitle(post, locale as 'th' | 'en'),
      excerpt: safeExcerpt,
      href: getLocalizedDocumentLink(
        { _type: 'post', slug: post.slug },
        locale
      ),
      imageUrl,
      imageAlt:
        post.image?.alt || getLocalizedPostTitle(post, locale as 'th' | 'en'),
      categoryLabel: post.categories?.[0]?.title || category.title,
      date: post.date || null,
    };
  });

  const fallbackHeroPost = sortedPostsList[0];
  const heroImageSource =
    category.coverImage || fallbackHeroPost?.image || null;
  const shouldContainHeroImage = category.slug === 'aestox';
  const heroImage = heroImageSource
    ? shouldContainHeroImage
      ? urlForImage(heroImageSource)
          ?.fit('max')
          .width(1200)
          .height(1200)
          .auto('format')
          .url()
      : urlForImage(heroImageSource)
          ?.ignoreImageParams()
          .width(1800)
          .height(900)
          .url()
    : undefined;
  const categorySubtitle = getCategorySubtitle(category, locale);
  const reasonHeading = cleanDisplayText(
    locale === 'en' ? category.reasonHeadingEn : category.reasonHeadingTh
  );
  const normalizedReasonHeading =
    !reasonHeading ||
    /^ทำไมต้องหมวด/.test(reasonHeading) ||
    /^Why This Category\??$/i.test(reasonHeading)
      ? getDefaultReasonHeading(category, locale)
      : reasonHeading;
  const reasonPoints = (category.reasonPoints || [])
    .map((point) =>
      cleanDisplayText(locale === 'en' ? point.textEn : point.textTh)
    )
    .filter(Boolean);
  const compareHeading = cleanDisplayText(
    locale === 'en' ? category.compareHeadingEn : category.compareHeadingTh
  );
  const compareRows = getCompareRowsFromCategory(category, locale);
  const faqHeading = cleanDisplayText(
    locale === 'en' ? category.faqHeadingEn : category.faqHeadingTh
  );
  const faqItems = getFaqsFromCategory(category, locale);

  const baseUrl = getBaseUrl();
  const categoryUrl = getLocalizedDocumentLink(category, locale, true);
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Blog',
        item: buildLocalizedUrl(locale, '/blog', baseUrl),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: category.title,
        item: categoryUrl,
      },
    ],
  };

  return (
    <>
      <Script
        id={`category-breadcrumb-jsonld-${category._id}`}
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires dangerouslySetInnerHTML
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id={`category-webpage-jsonld-${category._id}`}
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires dangerouslySetInnerHTML
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildWebPageJsonLd({
              canonicalUrl: categoryUrl,
              locale: locale as SiteLocale,
              origin: baseUrl,
              title: category.title,
              description:
                getLocalizedCategoryDescription(category, locale) || undefined,
            })
          ),
        }}
      />
      <Page>
        <>
          <Breadcrumbs
            items={[
              homeBreadcrumb(locale as 'th' | 'en'),
              {
                label: getBreadcrumbLabel(locale as 'th' | 'en', 'blog'),
                href: buildLocalizedPath(locale, '/blog'),
              },
              ...(category.parentCategory?.title &&
              category.parentCategory?.slug
                ? [
                    {
                      label: category.parentCategory.title,
                      href: getLocalizedDocumentLink(
                        {
                          _type: 'category',
                          slug: category.parentCategory.slug,
                        },
                        locale
                      ),
                    },
                  ]
                : []),
              {
                label:
                  category.title ||
                  getBreadcrumbLabel(locale as 'th' | 'en', 'category'),
              },
            ]}
            locale={locale as 'th' | 'en'}
            className="mb-5"
          />
          <section className="relative mb-10 overflow-hidden rounded-[2rem] border border-border/60">
            {heroImage ? (
              <>
                {shouldContainHeroImage ? (
                  <Image
                    src={heroImage}
                    alt=""
                    fill
                    sizes="100vw"
                    className="scale-105 object-cover opacity-55 blur-xl"
                    aria-hidden="true"
                    priority
                    unoptimized
                  />
                ) : null}
                <Image
                  src={heroImage}
                  alt={
                    heroImageSource?.alt ||
                    fallbackHeroPost?.title ||
                    category.title ||
                    'Category'
                  }
                  fill
                  sizes="100vw"
                  unoptimized
                  className={
                    shouldContainHeroImage
                      ? 'object-contain blur-[1px]'
                      : 'object-cover blur-[1px]'
                  }
                  priority
                />
              </>
            ) : (
              <div className="absolute inset-0 bg-[image:linear-gradient(120deg,var(--marketing-brand-strong)_0%,var(--marketing-brand)_35%,var(--secondary)_100%)]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/55" />
            <div className="relative z-10 mx-auto flex min-h-[280px] max-w-4xl flex-col items-center justify-center px-6 py-12 text-center text-white md:min-h-[340px]">
              <h1 className="mb-3 text-4xl leading-tight font-serif md:text-6xl">
                {category.title}
              </h1>
              {categorySubtitle ? (
                <p className="mb-5 text-lg text-white/90 md:text-2xl">
                  {categorySubtitle}
                </p>
              ) : null}
            </div>
          </section>

          {sortedChildCategories.length ? (
            <section className="mb-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--marketing-brand)]">
                {locale === 'en' ? 'Explore topics' : 'เลือกหัวข้อที่สนใจ'}
              </p>
              <nav
                aria-label={locale === 'en' ? 'Category topics' : 'หัวข้อในหมวดนี้'}
                className="flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible"
              >
                {sortedChildCategories.map((child) => (
                  <Link
                    key={child._id}
                    href={getLocalizedDocumentLink(
                      { _type: 'category', slug: child.slug },
                      locale
                    )}
                    className="shrink-0 rounded-full border border-[var(--marketing-border-soft)] bg-[var(--marketing-surface-1)] px-4 py-2 text-sm font-medium text-[var(--marketing-copy)] transition-colors hover:border-[var(--marketing-brand)] hover:text-[var(--marketing-brand-deep)]"
                  >
                    {child.title}
                  </Link>
                ))}
              </nav>
            </section>
          ) : null}

          {shouldShowFeaturedTopicsSection ? (
            <section id="technology-showcase" className="mb-14">
              <h2 className="mb-5 text-3xl font-serif text-[var(--marketing-ink)] md:text-4xl">
                {locale === 'en'
                  ? category.featuredSectionTitleEn || 'Featured Topics'
                  : category.featuredSectionTitleTh || 'หัวข้อแนะนำ'}
              </h2>
              <div className="grid gap-5 md:grid-cols-12">
                {featuredTopicItems.map((item, index) => {
                  const largeCard = index === 0;
                  const isChild = item._type === 'category';
                  const title = isChild
                    ? item.title || ''
                    : getLocalizedPostTitle(
                        item as PostItem,
                        locale as 'th' | 'en'
                      );
                  const slug = isChild
                    ? item.slug || ''
                    : (item as PostItem).slug;
                  const descRaw = isChild
                    ? getLocalizedCategoryDescription(
                        item as CategoryItem,
                        locale as 'th' | 'en'
                      )
                    : getLocalizedPostExcerpt(
                        item as PostItem,
                        locale as 'th' | 'en'
                      );
                  const desc = isBrokenText(descRaw)
                    ? (isChild
                        ? getSubFallback(category.slug || '', slug, locale)
                        : undefined) ||
                      (locale === 'en'
                        ? 'Curated article for treatment planning.'
                        : 'บทความแนะนำเพื่อช่วยวางแผนการรักษา')
                    : descRaw;
                  const safeDesc = cleanDisplayText(desc);
                  const img = isChild
                    ? (() => {
                        const coverImage = (item as CategoryItem).coverImage;
                        if (coverImage) {
                          return urlForImage(coverImage)
                            ?.fit('max')
                            .width(1200)
                            .height(1200)
                            .auto('format')
                            .url();
                        }
                        const p = sortedPostsList.find((post) =>
                          (post.categories || []).some((c) => c?.slug === slug)
                        );
                        return p?.image
                          ? urlForImage(p.image)
                              ?.fit('max')
                              .width(1200)
                              .height(1200)
                              .auto('format')
                              .url()
                          : undefined;
                      })()
                    : (item as PostItem).image
                      ? urlForImage((item as PostItem).image)
                          ?.fit('max')
                          .width(1200)
                          .height(1200)
                          .auto('format')
                          .url()
                      : undefined;
                  const href = getLocalizedDocumentLink(
                    { _type: isChild ? 'category' : 'post', slug },
                    locale
                  );

                  return (
                    <Link
                      key={isChild ? item._id : (item as PostItem)._id}
                      href={href}
                      className={`group overflow-hidden rounded-[2rem] border border-[var(--marketing-border)] bg-[image:var(--marketing-gradient-soft)] shadow-[var(--marketing-card-shadow)] transition-all duration-500 hover:-translate-y-[2px] hover:shadow-[var(--marketing-card-shadow-hover)] ${
                        largeCard ? 'md:col-span-7' : 'md:col-span-5'
                      }`}
                    >
                      <div className="relative overflow-hidden aspect-[3/2] bg-[var(--marketing-media)]">
                        {img ? (
                          <Image
                            src={img}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                            unoptimized
                          />
                        ) : (
                          <div className="h-full w-full bg-[var(--marketing-media)]" />
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="mb-1 text-2xl font-serif text-[var(--marketing-ink)]">
                          {title}
                        </h3>
                        <div className="my-3 h-px bg-[var(--marketing-divider)]" />
                        <p className="mb-3 text-sm text-[var(--marketing-copy)]">
                          {safeDesc || '-'}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ) : null}

          <section className="mb-12">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-3xl font-serif text-[var(--marketing-ink)]">
                  {locale === 'en' ? 'All Articles' : 'บทความทั้งหมด'}
                </h2>
                <p className="mt-1 text-sm text-[var(--marketing-muted)]">
                  {locale === 'en'
                    ? `${articleCards.length} articles in this category`
                    : `บทความในหมวดนี้ ${articleCards.length} เรื่อง`}
                </p>
              </div>
            </div>
            <CategoryLoadMoreGrid
              items={articleCards}
              perPage={10}
              loadMoreLabel={locale === 'en' ? 'Load more' : 'ดูเพิ่มเติม'}
              locale={locale as 'th' | 'en'}
            />
          </section>

          {reasonHeading || reasonPoints.length || compareRows.length ? (
            <section className="mb-14 grid gap-8 rounded-[2rem] border border-[var(--marketing-border)] bg-[image:var(--marketing-gradient-soft)] px-6 py-8 shadow-[var(--marketing-card-shadow)] md:grid-cols-[1.2fr_1fr] md:px-10 md:py-12">
              <div>
                {normalizedReasonHeading ? (
                  <h2 className="mb-3 text-3xl font-serif text-[var(--marketing-ink)] md:text-4xl">
                    {normalizedReasonHeading}
                  </h2>
                ) : null}
                {reasonPoints.length ? (
                  <ul className="space-y-3">
                    {reasonPoints.map((point) => (
                      <li
                        key={point}
                        className="flex items-start text-base text-[var(--marketing-copy)]"
                      >
                        <span className="mt-2 mr-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--marketing-brand)]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              {compareRows.length ? (
                <div className="rounded-[1.5rem] border border-[var(--marketing-border-soft)] bg-[var(--marketing-surface-2)] p-5">
                  <h3 className="mb-3 text-xl font-serif text-[var(--marketing-ink)]">
                    {compareHeading ||
                      (locale === 'en' ? 'Comparison' : 'ตารางเปรียบเทียบ')}
                  </h3>
                  <div className="overflow-hidden rounded-xl border border-[var(--marketing-border-soft)] bg-[var(--marketing-surface-1)]">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-[var(--marketing-table-head)] text-[var(--marketing-table-head-text)]">
                        <tr>
                          <th className="px-3 py-2 font-semibold">
                            {locale === 'en' ? 'Item' : 'หัวข้อ'}
                          </th>
                          <th className="px-3 py-2 font-semibold">
                            {locale === 'en' ? 'Best for' : 'เหมาะกับ'}
                          </th>
                          <th className="px-3 py-2 font-semibold">
                            {locale === 'en' ? 'Type' : 'ประเภท'}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {compareRows.map((row) => (
                          <tr
                            key={row.tech}
                            className="border-t border-[var(--marketing-table-border)]"
                          >
                            <td className="px-3 py-2 font-medium text-[var(--marketing-table-ink)]">
                              {row.tech}
                            </td>
                            <td className="px-3 py-2 text-[var(--marketing-copy)]">
                              {row.bestFor}
                            </td>
                            <td className="px-3 py-2 text-[var(--marketing-copy)]">
                              {row.type}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
            </section>
          ) : null}

          {faqItems.length ? (
            <section className="mb-12 rounded-[2rem] border border-[var(--marketing-border)] bg-[image:var(--marketing-gradient-soft)] px-6 py-8 shadow-[var(--marketing-card-shadow)] md:px-10 md:py-10">
              <h2 className="mb-5 text-3xl font-serif text-[var(--marketing-ink)]">
                {faqHeading ||
                  (locale === 'en'
                    ? 'Frequently Asked Questions'
                    : 'คำถามที่พบบ่อย')}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {faqItems.map((item) => (
                  <article
                    key={item.q}
                    className="rounded-[1.5rem] border border-[var(--marketing-border-soft)] bg-[var(--marketing-surface-2)] p-4"
                  >
                    <h3 className="mb-2 text-lg font-semibold text-[var(--marketing-ink)]">
                      {item.q}
                    </h3>
                    <p className="text-sm text-[var(--marketing-copy)]">
                      {item.a}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          <section className="mb-6 rounded-[2rem] border border-[var(--marketing-border)] bg-[image:var(--marketing-gradient-soft-warm)] px-6 py-10 text-center shadow-[var(--marketing-card-shadow)] md:px-10">
            <h2 className="mb-3 text-3xl font-serif text-[var(--marketing-ink)] md:text-4xl">
              {locale === 'en'
                ? 'Need a personalized recommendation?'
                : 'ต้องการคำแนะนำเฉพาะบุคคล?'}
            </h2>
            <Link
              href={buildLocalizedPath(locale, '/contact')}
              className="inline-flex rounded-full border border-[var(--marketing-cta-primary-bg)] bg-[var(--marketing-cta-primary-bg)] px-6 py-2.5 text-sm font-semibold text-[var(--marketing-cta-primary-text)] transition-all duration-500 hover:-translate-y-[2px] hover:bg-[var(--marketing-cta-primary-bg-hover)]"
            >
              {locale === 'en' ? 'Book Consultation' : 'ปรึกษาแพทย์'}
            </Link>
          </section>
        </>
      </Page>
    </>
  );
}

export default async function CategoryPage(props: Props) {
  return CategoryPageImplementation(props, await getRouteLocale(props.params));
}
