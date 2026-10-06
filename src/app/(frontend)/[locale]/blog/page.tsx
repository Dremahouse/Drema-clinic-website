import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  ListChecks,
  ShieldCheck,
} from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import ArticleCard, {
  type ArticleCardItem,
} from '@/components/modules/ArticleCard';
import {
  Breadcrumbs,
  getBreadcrumbLabel,
  homeBreadcrumb,
} from '@/components/shared/Breadcrumbs';
import GlobalCtaSection from '@/components/shared/GlobalCtaSection';
import Page from '@/components/templates/Page';
import { serverEnv } from '@/env/serverEnv';
import { getLinkByLinkObject, getLocalizedDocumentLink } from '@/lib/links';
import {
  buildLocalizedPath,
  buildLocalizedUrl,
  type SiteLocale,
} from '@/lib/locale';
import { getRouteLocale } from '@/lib/routeLocale';
import { client } from '@/lib/sanity/client/client';
import { sanityFetch } from '@/lib/sanity/client/live';
import { buildWebPageJsonLd, formatMetaData } from '@/lib/sanity/client/seo';
import { urlForImage } from '@/lib/sanity/client/utils';
import {
  blogMegaMenuSectionsQuery,
  blogPageQuery,
  categoriesForMenuQuery,
  postsArchiveQuery,
  settingsQuery,
} from '@/lib/sanity/queries/queries';
import { getBaseUrl } from '@/utils/getBaseUrl';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const privilegedClient = client.withConfig({
  useCdn: false,
  perspective: 'published',
  token: serverEnv.SANITY_API_READ_TOKEN,
  stega: false,
});

type SanityImageLike = {
  asset?: {
    _ref?: string | null;
    _id?: string | null;
  } | null;
  alt?: string | null;
} | null;

type PostItem = {
  _id: string;
  title: string;
  titleEn?: string | null;
  slug: string;
  excerpt?: string | null;
  excerptEn?: string | null;
  date?: string | null;
  image?: SanityImageLike;
  categories?: Array<{
    _id: string;
    title?: string | null;
    slug?: string | null;
  } | null> | null;
};
type CategoryNode = {
  _id: string;
  title: string;
  slug: string;
  description?: string | null;
  coverImage?: SanityImageLike;
  children: Array<{ _id: string; title: string; slug: string }>;
};

type BasicLink = {
  type?: 'internal' | 'external' | null;
  external?: string | null;
  href?: string | null;
  internal?: { _type?: string | null; slug?: string | null } | null;
};

type MegaMenuLinkItem = {
  _key?: string | null;
  labelTh?: string | null;
  labelEn?: string | null;
  link?: BasicLink | null;
};

type MegaMenuGroup = {
  _key?: string | null;
  titleTh?: string | null;
  titleEn?: string | null;
  items?: MegaMenuLinkItem[] | null;
};

type MegaMenuSection = {
  _key?: string | null;
  titleTh?: string | null;
  titleEn?: string | null;
  link?: BasicLink | null;
  groups?: MegaMenuGroup[] | null;
  items?: MegaMenuLinkItem[] | null;
};

type BlogPageCopyOverrides = {
  featuredPost?: PostItem | null;
  featuredArticleTagTh?: string | null;
  featuredArticleTagEn?: string | null;
  latestStoriesTitleTh?: string | null;
  latestStoriesTitleEn?: string | null;
  latestStoriesSubtitleTh?: string | null;
  latestStoriesSubtitleEn?: string | null;
  readMoreTextTh?: string | null;
  readMoreTextEn?: string | null;
  doctorTipsTagTh?: string | null;
  doctorTipsTagEn?: string | null;
  doctorTipsTitleTh?: string | null;
  doctorTipsTitleEn?: string | null;
  doctorTipsIntroTh?: string | null;
  doctorTipsIntroEn?: string | null;
  doctorTipsIntroFollowupTh?: string | null;
  doctorTipsIntroFollowupEn?: string | null;
  doctorTipsSubheadingTh?: string | null;
  doctorTipsSubheadingEn?: string | null;
  doctorTip1TitleTh?: string | null;
  doctorTip1TitleEn?: string | null;
  doctorTip1Th?: string | null;
  doctorTip1En?: string | null;
  doctorTip2TitleTh?: string | null;
  doctorTip2TitleEn?: string | null;
  doctorTip2Th?: string | null;
  doctorTip2En?: string | null;
  doctorTip3TitleTh?: string | null;
  doctorTip3TitleEn?: string | null;
  doctorTip3Th?: string | null;
  doctorTip3En?: string | null;
  doctorTipsCtaTextTh?: string | null;
  doctorTipsCtaTextEn?: string | null;
  doctorTipsCtaLink?: {
    type?: 'internal' | 'external' | null;
    external?: string | null;
    openInNewTab?: boolean | null;
    internal?: {
      _type?: string | null;
      slug?: string | null;
    } | null;
  } | null;
  quickCategoriesLabelTh?: string | null;
  quickCategoriesLabelEn?: string | null;
  featuredCategoriesHeadingTh?: string | null;
  featuredCategoriesHeadingEn?: string | null;
  featuredCategoriesSubtitleTh?: string | null;
  featuredCategoriesSubtitleEn?: string | null;
  featuredCategoriesCtaTh?: string | null;
  featuredCategoriesCtaEn?: string | null;
  featuredCategories?: Array<{
    _key?: string;
    titleTh?: string | null;
    titleEn?: string | null;
    descriptionTh?: string | null;
    descriptionEn?: string | null;
    category?: { slug?: string | null } | null;
  }> | null;
};

const toPostItem = (value: unknown): PostItem | null => {
  if (!value || typeof value !== 'object') return null;
  const raw = value as {
    _id?: unknown;
    title?: unknown;
    titleEn?: unknown;
    slug?: unknown;
    excerpt?: unknown;
    excerptEn?: unknown;
    date?: unknown;
    image?: unknown;
    categories?: unknown;
  };
  if (
    typeof raw._id !== 'string' ||
    typeof raw.title !== 'string' ||
    typeof raw.slug !== 'string' ||
    !raw.slug.trim()
  ) {
    return null;
  }

  return {
    _id: raw._id,
    title: raw.title,
    titleEn: typeof raw.titleEn === 'string' ? raw.titleEn : null,
    slug: raw.slug,
    excerpt: typeof raw.excerpt === 'string' ? raw.excerpt : null,
    excerptEn: typeof raw.excerptEn === 'string' ? raw.excerptEn : null,
    date: typeof raw.date === 'string' ? raw.date : null,
    image: (raw.image as SanityImageLike) || null,
    categories:
      (raw.categories as Array<{
        _id: string;
        title?: string | null;
        slug?: string | null;
      } | null>) || null,
  };
};

const getLinkPath = (link?: BasicLink | null) => {
  if (!link) return '#';
  if (link.type === 'external') return link.external || '#';
  if (link.type === 'internal' && link.internal?.slug) {
    const type = link.internal._type || '';
    if (type === 'category') return `/category/${link.internal.slug}`;
    if (type === 'post') return `/blog/${link.internal.slug}`;
    if (type === 'reviewCategory') return `/reviews/${link.internal.slug}`;
    return `/${link.internal.slug}`;
  }
  return link.href || '#';
};

const extractCategorySlugFromPath = (href?: string | null) => {
  if (!href) return null;
  const normalized = href.trim();
  const match =
    normalized.match(/\/(?:th|en)\/category\/([^/?#]+)/i) ||
    normalized.match(/\/category\/([^/?#]+)/i);
  return match?.[1] || null;
};

function splitBilingualDescription(
  description: string | null | undefined,
  locale: 'th' | 'en'
) {
  if (!description) return null;

  const match = description.match(
    /TH:\s*(?<th>[\s\S]*?)(?:\s*EN:\s*(?<en>[\s\S]*))?$/i
  );

  if (!match?.groups) return description;

  const localized =
    locale === 'en' ? match.groups.en || match.groups.th : match.groups.th;

  return localized?.trim() || description;
}

function stripParenthesizedEnglish(title: string, locale: 'th' | 'en') {
  if (locale === 'en') return title;
  return title.replace(/\s*\([A-Za-z][^)]*\)\s*/g, '').trim();
}

const loadBlogLandingData = async (): Promise<{
  // biome-ignore lint/suspicious/noExplicitAny: Existing blog page query result is broad and consumed as CMS copy overrides.
  blogPage: any;
  featuredPost: PostItem | null;
  latestPosts: PostItem[];
  categoryTree: CategoryNode[];
  blogMegaMenuSections: MegaMenuSection[];
  // biome-ignore lint/suspicious/noExplicitAny: Settings query is passed through to the shared CTA component.
  settings: any;
}> => {
  const [
    { data: blogPage },
    { data: posts },
    categories,
    settingsData,
    settings,
  ] = await Promise.all([
    sanityFetch({ query: blogPageQuery }),
    sanityFetch({
      query: postsArchiveQuery,
      params: { from: 0, to: 8, filters: {} },
    }),
    privilegedClient.fetch(categoriesForMenuQuery),
    privilegedClient.fetch(blogMegaMenuSectionsQuery),
    privilegedClient.fetch(settingsQuery),
  ]);

  const allPosts = posts?.results || [];
  const cms = (blogPage || {}) as BlogPageCopyOverrides;
  const featuredPost =
    toPostItem(cms.featuredPost) || toPostItem(allPosts[0]) || null;

  const categoryRows = (categories || []) as Array<{
    _id: string;
    title?: string | null;
    slug?: string | null;
    description?: string | null;
    coverImage?: SanityImageLike;
    children?: Array<{
      _id: string;
      title?: string | null;
      slug?: string | null;
    }> | null;
  }>;

  const categoryTree = categoryRows
    .filter(
      (item) =>
        item?.slug &&
        item?.title &&
        !['review', 'reviews'].includes(
          String(item.slug).toLowerCase().trim()
        ) &&
        !['review', 'reviews'].includes(String(item.title).toLowerCase().trim())
    )
    .map((item) => ({
      _id: item._id,
      title: item.title as string,
      slug: item.slug as string,
      description: item.description || null,
      coverImage: item.coverImage || null,
      children: (item.children || [])
        .filter((child) => child?.slug && child?.title)
        .map((child) => ({
          _id: child._id,
          title: child.title as string,
          slug: child.slug as string,
        })),
    }))
    .sort((a, b) => a.title.localeCompare(b.title));

  const rawBlogMegaMenuSections = (
    settingsData as { blogMegaMenuSections?: MegaMenuSection[] | null } | null
  )?.blogMegaMenuSections;
  const blogMegaMenuSections = Array.isArray(rawBlogMegaMenuSections)
    ? rawBlogMegaMenuSections
    : [];

  return {
    blogPage,
    featuredPost,
    latestPosts: allPosts
      .map(toPostItem)
      .filter((post): post is PostItem => Boolean(post)),
    categoryTree,
    blogMegaMenuSections,
    settings,
  };
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  const routeData = await loadBlogLandingData();
  if (!routeData.blogPage?.seo) {
    return {
      title: 'Blog',
      description: 'Latest articles from Drema Clinic.',
    };
  }
  return formatMetaData(
    routeData.blogPage.seo,
    routeData.blogPage?.name || '',
    { locale, pathname: '/blog' }
  );
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Existing blog landing page composes several CMS-driven sections in one route.
async function BlogLandingPageImplementation({
  locale,
}: {
  locale: SiteLocale;
}) {
  const routeData = await loadBlogLandingData();
  const isEn = locale === 'en';
  const cms = (routeData.blogPage || {}) as BlogPageCopyOverrides;

  const localizePath = (href?: string | null) => {
    if (!href) return buildLocalizedPath(locale, '/contact');
    if (href.startsWith('http')) return href;
    if (href.startsWith('/th') || href.startsWith('/en')) return href;
    return buildLocalizedPath(locale, href);
  };

  const tipsCtaHref = localizePath(
    cms.doctorTipsCtaLink
      ? getLinkByLinkObject(cms.doctorTipsCtaLink as never)
      : null
  );

  const t =
    locale === 'en'
      ? {
          pageTitle: 'Blog',
          featuredTag: cms.featuredArticleTagEn || 'Featured Article',
          indexTitle: cms.latestStoriesTitleEn || 'Knowledge by Category',
          indexSub:
            cms.latestStoriesSubtitleEn ||
            'Explore all six core treatment categories and their related topics.',
          readMore: cms.readMoreTextEn || 'Continue reading ->',
          tipsTag: cms.doctorTipsTagEn || 'Doctor Tips',
          tipsTitle:
            cms.doctorTipsTitleEn ||
            'How to Choose the Right Aesthetic Treatment | Doctor’s Guide',
          tipsIntro:
            cms.doctorTipsIntroEn ||
            'Before undergoing any aesthetic treatment—whether fillers, botox, or lifting procedures—choosing the right option based on your skin concerns and personal goals is essential.',
          tipsIntroFollowup:
            cms.doctorTipsIntroFollowupEn ||
            'At Drema Clinic, our doctors provide expert guidance to help you achieve safe, natural-looking, and effective results.',
          tipsSubheading:
            cms.doctorTipsSubheadingEn ||
            'Key Factors Before Choosing an Aesthetic Treatment',
          tip1:
            cms.doctorTip1En ||
            'Understand your skin condition, such as wrinkles, sagging, or facial structure concerns, and define your desired outcome to select the most suitable treatment.',
          tip2:
            cms.doctorTip2En ||
            'Choose a clinic with experienced doctors and certified medical technologies to ensure safety and reliable results.',
          tip3:
            cms.doctorTip3En ||
            'Ask about recovery time, potential risks, and post-treatment care to maintain and monitor your results effectively.',
          tipsCta:
            cms.doctorTipsCtaTextEn ||
            'Consult with our doctors for a personalized treatment plan',
          categories: cms.quickCategoriesLabelEn || 'Categories',
          categorySubtitle: 'Read expert-curated articles in this category.',
          coreSectionTitle:
            cms.featuredCategoriesHeadingEn || '6 Core Treatment Categories',
          coreSectionSub:
            cms.featuredCategoriesSubtitleEn ||
            'This section is structured for easy reading and AI citation with clear category-topic mapping.',
          openCategory: cms.featuredCategoriesCtaEn || 'Open category',
        }
      : {
          pageTitle: 'บทความ',
          featuredTag: cms.featuredArticleTagTh || 'บทความแนะนำ',
          indexTitle: cms.latestStoriesTitleTh || 'บทความตามหมวดการรักษา',
          indexSub:
            cms.latestStoriesSubtitleTh ||
            'รวมลิสต์หัวข้อจาก 6 หมวดหลัก เพื่อค้นหาข้อมูลได้เร็วและแม่นยำ',
          readMore: cms.readMoreTextTh || 'อ่านต่อ ->',
          tipsTag: cms.doctorTipsTagTh || 'Doctor Tips',
          tipsTitle:
            cms.doctorTipsTitleTh ||
            'เช็กก่อนเลือกหัตถการความงาม | แนวทางจากแพทย์ Drema Clinic',
          tipsIntro:
            cms.doctorTipsIntroTh ||
            'ก่อนตัดสินใจทำหัตถการความงาม ไม่ว่าจะเป็นฟิลเลอร์ โบท็อกซ์ หรือโปรแกรมยกกระชับ การเลือกให้เหมาะกับ “ปัญหาผิว” และ “เป้าหมายของคุณ” เป็นสิ่งสำคัญที่สุด',
          tipsIntroFollowup:
            cms.doctorTipsIntroFollowupTh ||
            'Drema Clinic แนะนำแนวทางจากแพทย์ เพื่อช่วยให้คุณเลือกโปรแกรมได้อย่างปลอดภัย เห็นผล และคุ้มค่าที่สุด',
          tipsSubheading:
            cms.doctorTipsSubheadingTh || 'วิธีเลือกหัตถการให้เหมาะกับคุณ',
          tip1:
            cms.doctorTip1Th ||
            'วิเคราะห์ปัญหาผิว เช่น ริ้วรอย ผิวหย่อนคล้อย หรือรูปหน้า พร้อมกำหนดเป้าหมายที่ต้องการ เพื่อเลือกหัตถการที่ตอบโจทย์ที่สุด',
          tip2:
            cms.doctorTip2Th ||
            'ควรเลือกคลินิกที่มีแพทย์ผู้เชี่ยวชาญ และใช้เครื่องมือหรือผลิตภัณฑ์ที่ผ่านการรับรอง เพื่อความปลอดภัยและผลลัพธ์ที่มั่นใจได้',
          tip3:
            cms.doctorTip3Th ||
            'สอบถามรายละเอียดเกี่ยวกับระยะเวลาพักฟื้น ความเสี่ยงที่อาจเกิดขึ้น รวมถึงแผนการติดตามผล เพื่อให้ได้ผลลัพธ์ที่ดีที่สุดในระยะยาว',
          tipsCta:
            cms.doctorTipsCtaTextTh ||
            'ปรึกษาแพทย์ Drema Clinic เพื่อออกแบบการรักษาที่เหมาะกับคุณ',
          categories: cms.quickCategoriesLabelTh || 'หมวดแนะนำ',
          categorySubtitle: 'อ่านบทความแนะนำที่คัดโดยแพทย์และทีมคลินิก',
          coreSectionTitle:
            cms.featuredCategoriesHeadingTh || '6 หมวดหลักที่ควรอ่านก่อนตัดสินใจ',
          coreSectionSub:
            cms.featuredCategoriesSubtitleTh ||
            'จัดลิสต์ให้ชัดเจนตามโครงสร้างหมวดและหมวดย่อย เพื่ออ่านง่ายและรองรับ AI citation',
          openCategory: cms.featuredCategoriesCtaTh || 'ดูหมวดนี้',
        };
  const doctorTips = [
    {
      number: '01',
      title:
        (isEn ? cms.doctorTip1TitleEn : cms.doctorTip1TitleTh) ||
        (isEn
          ? 'Identify Your Skin Concerns and Goals'
          : 'เลือกจากปัญหาผิวและเป้าหมายของตัวเอง'),
      body: t.tip1,
      icon: ListChecks,
    },
    {
      number: '02',
      title:
        (isEn ? cms.doctorTip2TitleEn : cms.doctorTip2TitleTh) ||
        (isEn
          ? 'Check Doctor Credentials and Technology Standards'
          : 'ตรวจสอบแพทย์และมาตรฐานเครื่องมือ'),
      body: t.tip2,
      icon: ShieldCheck,
    },
    {
      number: '03',
      title:
        (isEn ? cms.doctorTip3TitleEn : cms.doctorTip3TitleTh) ||
        (isEn
          ? 'Understand Downtime, Risks, and Follow-up Plan'
          : 'เข้าใจการพักฟื้น ความเสี่ยง และการติดตามผล'),
      body: t.tip3,
      icon: Clock3,
    },
  ] as const;

  const categoryBySlug = new Map(
    routeData.categoryTree.map((category) => [category.slug, category] as const)
  );

  const navSections = (routeData.blogMegaMenuSections || [])
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Mega menu normalization keeps grouped blog navigation in one mapper.
    .map((section, index) => {
      const sectionHrefRaw = getLinkPath(section.link);
      const sectionSlug = extractCategorySlugFromPath(sectionHrefRaw);
      if (!sectionSlug) return null;

      const titleTh = section.titleTh?.trim() || '';
      const titleEn = section.titleEn?.trim() || '';
      const category = categoryBySlug.get(sectionSlug) || null;

      const children = [
        ...((section.groups || []).flatMap((group) =>
          (group.items || []).map((item) => ({
            key: item._key || `${index}-group-item`,
            title:
              locale === 'en'
                ? item.labelEn || item.labelTh || ''
                : item.labelTh || item.labelEn || '',
            href: localizePath(getLinkPath(item.link)),
          }))
        ) || []),
        ...((section.items || []).map((item) => ({
          key: item._key || `${index}-item`,
          title:
            locale === 'en'
              ? item.labelEn || item.labelTh || ''
              : item.labelTh || item.labelEn || '',
          href: localizePath(getLinkPath(item.link)),
        })) || []),
      ].filter((item) => item.title && item.href && item.href !== '#');

      const uniqueChildren = Array.from(
        new Map(children.map((item) => [item.href, item])).values()
      );

      return {
        key: section._key || `section-${index}`,
        slug: sectionSlug,
        title: locale === 'en' ? titleEn || titleTh : titleTh || titleEn,
        href: localizePath(sectionHrefRaw || `/category/${sectionSlug}`),
        children: uniqueChildren,
        coverImage: category?.coverImage || null,
        categoryTitle: category?.title || sectionSlug,
        categoryDescription: splitBilingualDescription(
          category?.description,
          locale
        ),
      };
    })
    .filter((section): section is NonNullable<typeof section> =>
      Boolean(section)
    );

  const featuredCategoryOverrides = (cms.featuredCategories || [])
    .filter((item) => item?.category?.slug)
    .map((item) => ({
      key: item._key || item.category?.slug || '',
      slug: item.category?.slug || '',
      titleOverride: locale === 'en' ? item.titleEn : item.titleTh,
      descriptionOverride:
        locale === 'en' ? item.descriptionEn : item.descriptionTh,
    }));

  const overrideSlugSet = new Set(
    featuredCategoryOverrides.map((item) => item.slug)
  );

  const coreCategorySlugs = [
    'botox',
    'facial-concerns',
    'filler',
    'technology-devices',
    'skin-booster-biostimulator',
    'thread-lift',
  ];

  const orderedCards = [
    ...featuredCategoryOverrides.map((override) => {
      const matched = navSections.find(
        (section) => section.slug === override.slug
      );
      const category = categoryBySlug.get(override.slug) || null;
      return {
        key: override.key || override.slug,
        slug: override.slug,
        title: stripParenthesizedEnglish(
          override.titleOverride || matched?.title || category?.title || '',
          locale
        ),
        summary:
          splitBilingualDescription(override.descriptionOverride, locale) ||
          matched?.categoryDescription ||
          splitBilingualDescription(category?.description, locale) ||
          t.categorySubtitle,
        href: matched?.href || localizePath(`/category/${override.slug}`),
        children:
          matched?.children ||
          (category?.children || []).map((child) => ({
            key: child._id,
            title: child.title,
            href: localizePath(`/category/${child.slug}`),
          })),
        image: matched?.coverImage || category?.coverImage || null,
        alt: matched?.categoryTitle || category?.title || override.slug,
      };
    }),
    ...navSections
      .filter((section) => !overrideSlugSet.has(section.slug))
      .map((section) => ({
        key: section.key,
        slug: section.slug,
        title: stripParenthesizedEnglish(
          section.title || section.categoryTitle,
          locale
        ),
        summary: section.categoryDescription || t.categorySubtitle,
        href: section.href,
        children: section.children,
        image: section.coverImage,
        alt: section.categoryTitle,
      })),
    ...coreCategorySlugs
      .filter(
        (slug) =>
          !overrideSlugSet.has(slug) &&
          !navSections.some((section) => section.slug === slug)
      )
      .flatMap((slug) => {
        const category = categoryBySlug.get(slug);
        if (!category) return [];
        return [
          {
            key: category._id,
            slug,
            title: stripParenthesizedEnglish(category.title, locale),
            summary:
              splitBilingualDescription(category.description, locale) ||
              t.categorySubtitle,
            href: localizePath(`/category/${slug}`),
            children: category.children.map((child) => ({
              key: child._id,
              title: child.title,
              href: localizePath(`/category/${child.slug}`),
            })),
            image: category.coverImage,
            alt: category.title,
          },
        ];
      }),
  ];

  const primaryCategoryCards = orderedCards.filter(
    (card) => card.title && card.href && coreCategorySlugs.includes(card.slug)
  );

  if (!routeData.featuredPost) {
    notFound();
  }

  const featuredPost = routeData.featuredPost;
  const featuredImage = featuredPost.image
    ? urlForImage(featuredPost.image)
        ?.ignoreImageParams()
        .width(1400)
        .height(1400)
        .url()
    : undefined;

  const latestArticleCards: ArticleCardItem[] = routeData.latestPosts
    .filter((post) => post._id !== featuredPost._id)
    .slice(0, 6)
    .map((post) => {
      const imageUrl = post.image
        ? urlForImage(post.image)
            // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
            ?.fit('crop')
            .width(900)
            .height(600)
            .auto('format')
            .url()
        : undefined;
      const localizedTitle =
        locale === 'en' ? post.titleEn || post.title : post.title;
      const localizedExcerpt =
        locale === 'en' ? post.excerptEn || post.excerpt : post.excerpt;

      return {
        id: post._id,
        title: localizedTitle,
        excerpt: localizedExcerpt,
        href: getLocalizedDocumentLink(
          { _type: 'post', slug: post.slug },
          locale
        ),
        imageUrl,
        imageAlt: post.image?.alt || localizedTitle,
        categoryLabel: post.categories?.[0]?.title || null,
        date: post.date || null,
      };
    });

  const baseUrl = getBaseUrl();
  const blogUrl = buildLocalizedUrl(locale, '/blog', baseUrl);
  const webpageJsonLd = buildWebPageJsonLd({
    canonicalUrl: blogUrl,
    locale: locale as SiteLocale,
    origin: baseUrl,
    title: routeData.blogPage?.name || t.pageTitle,
    description: routeData.blogPage?.seo?.metaDescription || undefined,
  });

  return (
    <>
      <Script
        id="blog-webpage-jsonld"
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires dangerouslySetInnerHTML
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageJsonLd) }}
      />
      <Page>
        <Breadcrumbs
          items={[
            homeBreadcrumb(locale as 'th' | 'en'),
            { label: getBreadcrumbLabel(locale as 'th' | 'en', 'blog') },
          ]}
          locale={locale as 'th' | 'en'}
          className="mb-5"
        />
        <header className="mb-6 max-w-3xl">
          <h1 className="text-4xl font-serif text-[var(--marketing-ink)] md:text-5xl">
            {routeData.blogPage?.name || t.pageTitle}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[var(--marketing-copy)] md:text-lg">
            {t.indexSub}
          </p>
        </header>

        <nav
          aria-label={
            locale === 'en' ? 'Core blog categories' : 'หมวดบทความหลัก'
          }
          className="mb-10 flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible"
        >
          {primaryCategoryCards.map((card) => (
            <Link
              key={card.key}
              href={card.href}
              className="shrink-0 rounded-full border border-[var(--marketing-border-soft)] bg-[var(--marketing-surface-1)] px-4 py-2 text-sm font-medium text-[var(--marketing-copy)] transition-colors hover:border-[var(--marketing-brand)] hover:text-[var(--marketing-brand-deep)]"
            >
              {card.title}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col">
          <section className="order-1 mb-10 overflow-hidden rounded-[2rem] border border-[var(--marketing-border)] bg-[image:var(--marketing-gradient-soft)] shadow-[var(--marketing-card-shadow)]">
            <article className="grid md:grid-cols-2">
              <Link
                href={getLocalizedDocumentLink(
                  { _type: 'post', slug: featuredPost.slug },
                  locale
                )}
                className="relative block min-h-[240px] bg-[var(--marketing-media)] md:min-h-[360px]"
              >
                {featuredImage ? (
                  <Image
                    src={featuredImage}
                    alt={featuredPost.image?.alt || featuredPost.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                    unoptimized
                  />
                ) : (
                  <div className="h-full w-full bg-[var(--marketing-media)]" />
                )}
              </Link>

              <div className="flex flex-col justify-center p-6 md:p-10">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--marketing-brand)]">
                  {t.featuredTag}
                </p>
                <h2 className="mb-4 text-3xl font-bold leading-tight text-[var(--marketing-ink)] md:text-5xl">
                  <Link
                    href={getLocalizedDocumentLink(
                      { _type: 'post', slug: featuredPost.slug },
                      locale
                    )}
                    className="transition-colors hover:text-[var(--marketing-brand-deep)]"
                  >
                    {featuredPost.title}
                  </Link>
                </h2>
                {featuredPost.excerpt ? (
                  <p className="mb-6 text-base leading-relaxed text-[var(--marketing-copy)]">
                    {featuredPost.excerpt}
                  </p>
                ) : null}
                <div className="mb-6 flex flex-wrap gap-2">
                  {(featuredPost.categories || [])
                    .slice(0, 2)
                    .map((category) =>
                      category?.slug ? (
                        <Link
                          key={category._id}
                          href={getLocalizedDocumentLink(
                            { _type: 'category', slug: category.slug },
                            locale
                          )}
                          className="rounded-full border border-[var(--marketing-border-soft)] bg-[var(--marketing-surface-2)] px-3 py-1 text-xs font-semibold text-[var(--marketing-subtle)] transition-colors hover:text-[var(--marketing-ink)]"
                        >
                          {category.title}
                        </Link>
                      ) : null
                    )}
                </div>
                <Link
                  href={getLocalizedDocumentLink(
                    { _type: 'post', slug: featuredPost.slug },
                    locale
                  )}
                  className="text-sm font-semibold text-[var(--marketing-price)] transition-colors hover:text-[var(--marketing-brand-strong)]"
                >
                  {t.readMore}
                </Link>
              </div>
            </article>
          </section>

          {latestArticleCards.length ? (
            <section className="order-2 mb-12">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-3xl font-serif text-[var(--marketing-ink)] md:text-4xl">
                    {t.indexTitle}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--marketing-copy)] md:text-base">
                    {t.indexSub}
                  </p>
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3 xl:gap-7">
                {latestArticleCards.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    locale={locale as 'th' | 'en'}
                  />
                ))}
              </div>
            </section>
          ) : null}

          <section className="order-4 mb-8 rounded-[2rem] border border-[var(--marketing-border)] bg-[image:linear-gradient(180deg,var(--marketing-surface-2)_0%,var(--marketing-surface-3)_100%)] p-6 shadow-[var(--marketing-card-shadow)]">
            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute top-0 right-0 hidden md:block">
                <div className="relative h-24 w-44 opacity-70">
                  <span className="absolute top-1 right-10 text-[var(--marketing-brand)]">
                    ✦
                  </span>
                  <span className="absolute top-7 right-0 text-xs text-[var(--marketing-brand)]">
                    ✦
                  </span>
                  <span className="absolute top-12 right-24 text-xs text-[var(--marketing-brand)]">
                    ✦
                  </span>
                  <div className="absolute top-3 right-0 h-20 w-36 rounded-full border-t border-[color:rgba(184,150,108,0.26)]" />
                </div>
              </div>

              <div className="mb-8 w-full">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--marketing-border-soft)] bg-[color:rgba(255,255,255,0.72)] shadow-[0_10px_22px_-22px_rgba(91,76,55,0.38)]">
                    <BadgeCheck
                      className="h-4 w-4 text-[var(--marketing-brand)]"
                      strokeWidth={1.8}
                    />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--marketing-brand)]">
                    {t.tipsTag}
                  </p>
                </div>
                <h3 className="mb-3 w-full text-2xl font-bold leading-tight text-[var(--marketing-ink)] md:text-4xl md:leading-[1.15]">
                  {t.tipsTitle}
                </h3>
                <div className="max-w-5xl space-y-2 text-sm leading-relaxed text-[var(--marketing-copy)] md:text-base">
                  <p>{t.tipsIntro}</p>
                  <p>{t.tipsIntroFollowup}</p>
                </div>
              </div>

              <div className="mb-5">
                <h4 className="text-lg font-semibold leading-snug text-[var(--marketing-ink)] md:text-xl">
                  {t.tipsSubheading}
                </h4>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {doctorTips.map((tip) => {
                  const Icon = tip.icon;

                  return (
                    <article
                      key={tip.number}
                      className="relative rounded-[1.7rem] border border-[var(--marketing-border-soft)] bg-[color:rgba(255,255,255,0.8)] px-5 py-6 shadow-[0_16px_30px_-28px_rgba(91,76,55,0.35)]"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[color:rgba(213,193,163,0.38)] bg-[color:rgba(250,246,239,0.86)]">
                          <Icon
                            className="h-6 w-6 text-[var(--marketing-brand)]"
                            strokeWidth={1.8}
                          />
                        </div>
                        <div>
                          <h5 className="mb-2 text-lg font-semibold leading-snug text-[var(--marketing-ink)] md:text-xl">
                            {tip.title}
                          </h5>
                          <p className="text-sm leading-relaxed text-[var(--marketing-copy)] md:text-[0.95rem]">
                            {tip.body}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="mt-6 flex justify-start md:justify-end">
                <Link
                  href={tipsCtaHref}
                  className="inline-flex items-center gap-2 rounded-full border border-[color:rgba(213,174,110,0.58)] bg-[linear-gradient(135deg,#dcb163_0%,#c99a4e_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_34px_-20px_rgba(156,114,50,0.52)] transition-all duration-500 ease-out hover:-translate-y-[2px] hover:shadow-[0_22px_40px_-20px_rgba(156,114,50,0.58)]"
                >
                  <span>✦</span>
                  {t.tipsCta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>

          <div className="order-3">
            <section className="mb-4">
              <h2 className="text-3xl leading-tight font-serif text-[var(--marketing-ink)]">
                {t.coreSectionTitle}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--marketing-copy)] md:text-base">
                {t.coreSectionSub}
              </p>
            </section>

            <section className="grid gap-5 md:grid-cols-2">
              {primaryCategoryCards.map((card) => {
                const cardImageUrl = card.image
                  ? urlForImage(card.image)
                      // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
                      ?.fit('max')
                      .width(1200)
                      .height(1200)
                      .auto('format')
                      .url()
                  : undefined;

                return (
                  <article
                    key={card.key}
                    className="overflow-hidden rounded-[2rem] border border-[var(--marketing-border)] bg-[image:var(--marketing-gradient-soft)] shadow-[var(--marketing-card-shadow)] transition-all duration-500 hover:-translate-y-[2px] hover:shadow-[var(--marketing-card-shadow-hover)]"
                  >
                    <Link
                      href={card.href}
                      className="group relative block aspect-[3/2] overflow-hidden rounded-t-[1.75rem] bg-[var(--marketing-media)]"
                    >
                      {cardImageUrl ? (
                        <Image
                          src={cardImageUrl}
                          alt={card.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          unoptimized
                        />
                      ) : null}
                      <span className="absolute bottom-4 left-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium tracking-[0.08em] text-[var(--marketing-subtle)] shadow-sm">
                        {t.categories}
                      </span>
                    </Link>

                    <div className="p-5 md:p-6">
                      <h3 className="text-3xl leading-tight font-serif text-[var(--marketing-ink)]">
                        <Link
                          href={card.href}
                          className="transition-colors hover:text-[var(--marketing-brand-deep)]"
                        >
                          {card.title}
                        </Link>
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--marketing-copy)]">
                        {card.summary || t.categorySubtitle}
                      </p>
                      <div className="my-5 h-px bg-[var(--marketing-divider)]" />
                      {card.children.length > 0 ? (
                        <ul className="space-y-3">
                          {card.children.map((child) => (
                            <li key={child.key}>
                              <Link
                                href={child.href}
                                className="group inline-flex items-center text-base text-[var(--marketing-copy)] transition-colors hover:text-[var(--marketing-brand-deep)]"
                              >
                                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[var(--marketing-brand)] opacity-70" />
                                {child.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <Link
                          href={card.href}
                          className="inline-flex items-center text-sm text-[var(--marketing-copy)] transition-colors hover:text-[var(--marketing-brand-deep)]"
                        >
                          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[var(--marketing-brand)] opacity-70" />
                          {t.openCategory}
                        </Link>
                      )}
                    </div>
                  </article>
                );
              })}
            </section>
          </div>
        </div>
        <div className="mt-16 md:mt-20">
          <GlobalCtaSection
            cta={routeData.settings}
            fullBleed
            locale={locale}
            socialLinks={routeData.settings?.socialLinks || []}
          />
        </div>
      </Page>
    </>
  );
}

export default async function BlogLandingPage({ params }: Props) {
  return BlogLandingPageImplementation({
    locale: await getRouteLocale(params),
  });
}
