import { CircleCheck } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FeaturedImageGallery from '@/components/modules/FeaturedImageGallery';
import {
  getBreadcrumbLabel,
  homeBreadcrumb,
} from '@/components/shared/Breadcrumbs';
import GlobalCtaSection from '@/components/shared/GlobalCtaSection';
import MarketingPageHero from '@/components/shared/MarketingPageHero';
import { serverEnv } from '@/env/serverEnv';
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
  reviewCategoryBySlugQuery,
  reviewCategorySlugs,
  reviewsByCategorySlugQuery,
  settingsQuery,
} from '@/lib/sanity/queries/queries';
import { getBaseUrl } from '@/utils/getBaseUrl';

type Props = { params: Promise<{ locale: string; categorySlug: string }> };

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const privilegedClient = client.withConfig({
  useCdn: false,
  perspective: 'published',
  token: serverEnv.SANITY_API_READ_TOKEN,
  stega: false,
});

function getLocalizedCategoryTitle(
  category: {
    title?: string | null;
    titleTh?: string | null;
    titleEn?: string | null;
  },
  locale: string
) {
  return (
    (locale === 'en'
      ? category.titleEn || category.title
      : category.titleTh || category.title) ||
    (locale === 'en' ? 'Review Category' : 'หมวดรีวิว')
  );
}

function getLocalizedCategoryDescription(
  category: {
    descriptionTh?: string | null;
    descriptionEn?: string | null;
  },
  locale: string
) {
  return locale === 'en'
    ? category.descriptionEn || category.descriptionTh
    : category.descriptionTh || category.descriptionEn;
}

function getLocalizedCitationIntro(
  category: {
    citationIntroTh?: string | null;
    citationIntroEn?: string | null;
    descriptionTh?: string | null;
    descriptionEn?: string | null;
  },
  locale: string
) {
  const localizedDescription = getLocalizedCategoryDescription(
    category,
    locale
  );

  return locale === 'en'
    ? category.citationIntroEn || localizedDescription
    : category.citationIntroTh || localizedDescription;
}

function truncateMetaDescription(text: string | null | undefined) {
  if (!text) return undefined;
  return text.length > 158 ? `${text.slice(0, 155).trim()}...` : text;
}

export async function generateStaticParams() {
  const slugs = await client.fetch(reviewCategorySlugs, {
    limit: serverEnv.MAX_STATIC_PARAMS,
  });

  const staticParams = slugs
    ? slugs
        .filter((slug) => slug !== null)
        .map((slug) => ({ categorySlug: slug }))
    : [];
  return withStaticLocales(staticParams);
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { categorySlug } = await props.params;
  const [category, locale] = await Promise.all([
    privilegedClient.fetch(reviewCategoryBySlugQuery, { slug: categorySlug }),
    getRouteLocale(props.params),
  ]);

  if (!category) return {};

  const title = getLocalizedCategoryTitle(category, locale);
  const description =
    truncateMetaDescription(getLocalizedCitationIntro(category, locale)) ||
    (locale === 'en'
      ? `Browse ${title} before-and-after review examples from Drema Clinic. Review images are reference cases and results vary by individual assessment.`
      : `ดูตัวอย่างรีวิวก่อน-หลังหมวด ${title} จาก Drema Clinic ภาพรีวิวเป็นเคสอ้างอิงและผลลัพธ์ขึ้นอยู่กับการประเมินรายบุคคล`);
  const url = buildLocalizedUrl(
    locale,
    `/reviews/${category.slug}`,
    getBaseUrl()
  );
  const imageUrl = category.coverImage
    ? urlForImage(category.coverImage as never)
        ?.width(1200)
        .height(630)
        // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
        .fit('crop')
        .auto('format')
        .url()
    : undefined;

  return {
    title:
      locale === 'en'
        ? `${title} | Drema Clinic Reviews`
        : `${title} | รีวิว Drema Clinic`,
    description,
    alternates: buildLocalizedAlternates(
      locale,
      `/reviews/${category.slug}`,
      getBaseUrl()
    ),
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: category.coverImage?.alt || title,
            },
          ]
        : undefined,
    },
  };
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Review category page composes CMS content, gallery data, CTA, and JSON-LD in one route.
export default async function ReviewCategoryPage(props: Props) {
  const { categorySlug } = await props.params;
  const [category, reviews, settings] = await Promise.all([
    privilegedClient.fetch(reviewCategoryBySlugQuery, { slug: categorySlug }),
    privilegedClient.fetch(reviewsByCategorySlugQuery, { categorySlug }),
    privilegedClient.fetch(settingsQuery),
  ]);
  const locale = await getRouteLocale(props.params);
  const isEn = locale === 'en';

  if (!category) notFound();

  const localizedTitle = getLocalizedCategoryTitle(category, locale);
  const localizedDescription = getLocalizedCategoryDescription(
    category,
    locale
  );
  const heroBackgroundDesktop =
    category.heroBackgroundDesktop || category.coverImage || null;
  const heroBackgroundMobile =
    category.heroBackgroundMobile ||
    category.heroBackgroundDesktop ||
    category.coverImage ||
    null;
  const citationIntro = getLocalizedCitationIntro(category, locale);

  const citationDisclaimer =
    locale === 'en'
      ? category.citationDisclaimerEn
      : category.citationDisclaimerTh;

  const citationPoints = (
    locale === 'en'
      ? category.citationKeyPointsEn || []
      : category.citationKeyPointsTh || category.citationKeyPoints || []
  ).filter(Boolean);

  const galleryItems = (reviews || [])
    .map((review) => {
      const src = review.coverImage
        ? urlForImage(review.coverImage as never)
            ?.width(1400)
            .height(1400)
            // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
            .fit('crop')
            .auto('format')
            .url()
        : undefined;

      if (!src) return null;

      return {
        id: review._id,
        src,
        alt: review.coverImage?.alt || review.title || 'Review image',
      };
    })
    .filter((item): item is { id: string; src: string; alt: string } =>
      Boolean(item)
    );

  const baseUrl = getBaseUrl();
  const categoryUrl = buildLocalizedUrl(
    locale,
    `/reviews/${category.slug}`,
    baseUrl
  );
  const reviewsUrl = buildLocalizedUrl(locale, '/reviews', baseUrl);
  const webpageJsonLd = buildWebPageJsonLd({
    canonicalUrl: categoryUrl,
    locale: locale as SiteLocale,
    origin: baseUrl,
    title: localizedTitle,
    description: citationIntro || localizedDescription || undefined,
  });
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: localizedTitle,
    url: categoryUrl,
    numberOfItems: galleryItems.length,
    itemListElement: galleryItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.alt,
      url: categoryUrl,
      image: item.src,
    })),
  };
  const collectionPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: localizedTitle,
    description: citationIntro || localizedDescription,
    url: categoryUrl,
    inLanguage: isEn ? 'en-US' : 'th-TH',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Drema Clinic',
      url: baseUrl,
    },
    publisher: {
      '@type': 'MedicalOrganization',
      name: 'Drema Clinic',
      url: baseUrl,
    },
    about: citationPoints.length ? citationPoints : localizedTitle,
    mainEntity: itemListJsonLd,
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isEn ? 'Home' : 'หน้าแรก',
        item: buildLocalizedUrl(locale, '/', baseUrl),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isEn ? 'Reviews' : 'รีวิว',
        item: reviewsUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: localizedTitle,
        item: categoryUrl,
      },
    ],
  };

  return (
    <div className="space-y-0">
      <MarketingPageHero
        breadcrumbs={{
          locale: locale as 'th' | 'en',
          items: [
            homeBreadcrumb(locale as 'th' | 'en'),
            {
              label: getBreadcrumbLabel(locale as 'th' | 'en', 'reviews'),
              href: '/reviews',
            },
            { label: localizedTitle },
          ],
        }}
        eyebrow={locale === 'en' ? 'Review Category' : 'หมวดรีวิว'}
        heading={localizedTitle}
        description={localizedDescription}
        desktopImage={heroBackgroundDesktop}
        mobileImage={heroBackgroundMobile}
        fallbackImage={category.coverImage || null}
        imageAlt={
          heroBackgroundMobile?.alt ||
          heroBackgroundDesktop?.alt ||
          category.coverImage?.alt ||
          localizedTitle ||
          'Review category cover'
        }
        imagePlaceholder={
          locale === 'en'
            ? 'Upload review category cover image in Studio'
            : 'อัปโหลดภาพ Cover Image ของหมวดรีวิวใน Studio'
        }
        textClassName="md:max-w-[50%]"
        actions={
          <Link
            href={buildLocalizedPath(locale, '/reviews')}
            className="rounded-xl border border-[var(--marketing-cta-secondary-border)] bg-[var(--marketing-cta-secondary-bg)] px-6 py-3 text-sm font-medium text-[var(--marketing-cta-secondary-text)] transition-all duration-500 ease-out hover:-translate-y-[2px] hover:bg-[var(--marketing-cta-secondary-bg-hover)]"
          >
            {locale === 'en' ? 'Back to all categories' : 'กลับไปหน้าหมวดรีวิว'}
          </Link>
        }
      />

      {(citationIntro || citationPoints.length || citationDisclaimer) && (
        <section className="bg-white py-16">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="space-y-7">
              <div className="space-y-4">
                <p className="text-xs tracking-[0.26em] text-[#9a805f] uppercase">
                  {locale === 'en'
                    ? 'Review Collection - Drema Clinic'
                    : 'คลังรีวิว - Drema Clinic'}
                </p>
                <h2 className="text-4xl font-serif text-[#3f3124] md:text-5xl">
                  {locale === 'en' ? 'Category Information' : 'ข้อมูลหมวดรีวิว'}
                </h2>
                <div className="h-px w-full bg-[linear-gradient(90deg,#ccb28b_0%,rgba(204,178,139,0)_100%)]" />
              </div>

              {citationIntro ? (
                <p className="max-w-5xl text-lg leading-relaxed text-[#594935]">
                  {citationIntro}
                </p>
              ) : null}

              {citationPoints.length ? (
                <ul className="grid gap-3 md:grid-cols-2">
                  {citationPoints.map((point: string) => (
                    <li
                      key={point}
                      className="flex items-center gap-3 rounded-xl border border-[#deceb5] bg-[#f8f1e6] px-4 py-4 text-[15px] text-[#61503b]"
                    >
                      <CircleCheck className="size-5 shrink-0 text-[#9a805f]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {citationDisclaimer ? (
                <p className="text-sm text-[#7a6852]">{citationDisclaimer}</p>
              ) : null}
            </div>
          </div>
        </section>
      )}

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f8f2e9_0%,#efe6d7_55%,#f4ebdd_100%)] py-24">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_20%_18%,rgba(160,124,85,0.14),transparent_42%),radial-gradient(circle_at_82%_72%,rgba(127,95,74,0.12),transparent_38%)]" />

        <div className="container relative mx-auto px-4">
          {galleryItems.length ? (
            <FeaturedImageGallery items={galleryItems} />
          ) : (
            <div className="mx-auto max-w-4xl rounded-2xl border border-[#d8cab1] bg-[#f8f1e6] p-8 text-[#7b6953]">
              {locale === 'en'
                ? 'No reviews in this category yet. Add review items from Sanity Studio.'
                : 'ยังไม่มีรีวิวในหมวดนี้ สามารถเพิ่มได้จาก Sanity Studio'}
            </div>
          )}
        </div>
      </section>
      <GlobalCtaSection
        cta={settings}
        locale={locale as 'th' | 'en'}
        socialLinks={settings?.socialLinks || []}
      />
      <script type="application/ld+json">
        {JSON.stringify(collectionPageJsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(webpageJsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </script>
    </div>
  );
}
