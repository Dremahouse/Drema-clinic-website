import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';
import ReviewCard from '@/components/modules/ReviewCard';
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
} from '@/lib/locale';
import { getRouteLocale } from '@/lib/routeLocale';
import { client } from '@/lib/sanity/client/client';
import { buildWebPageJsonLd, formatMetaData } from '@/lib/sanity/client/seo';
import { urlForImage } from '@/lib/sanity/client/utils';
import {
  reviewsLandingQuery,
  settingsQuery,
} from '@/lib/sanity/queries/queries';
import { getBaseUrl } from '@/utils/getBaseUrl';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

type SanityImageLike = {
  asset?: {
    _ref?: string | null;
    _id?: string | null;
  } | null;
  alt?: string | null;
} | null;

type ReviewCategoryItem = {
  _id: string;
  slug: string;
  title?: string | null;
  titleTh?: string | null;
  titleEn?: string | null;
  descriptionTh?: string | null;
  descriptionEn?: string | null;
  coverImage?: SanityImageLike;
};

type ReviewItem = {
  _id: string;
  title?: string | null;
  slug?: string | null;
  coverImage?: SanityImageLike;
  category?: {
    title?: string | null;
    slug?: string | null;
  } | null;
};

type ReviewsPageSectionBackground = {
  categoriesSectionBackgroundImage?: SanityImageLike;
  referenceSectionBackgroundImage?: SanityImageLike;
  featuredSectionBackgroundImage?: SanityImageLike;
};

const privilegedClient = client.withConfig({
  useCdn: false,
  perspective: 'published',
  token: serverEnv.SANITY_API_READ_TOKEN,
  stega: false,
});

async function loadReviewsLandingData() {
  return privilegedClient.fetch(reviewsLandingQuery);
}

function getSectionBackground({
  image,
  className,
}: {
  image?: SanityImageLike;
  className: string;
}): { className: string; style?: CSSProperties } {
  const imageUrl = image
    ? urlForImage(image)
        ?.width(2400)
        .height(1200)
        // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
        .fit('crop')
        .auto('format')
        .url()
    : undefined;

  return {
    className,
    style: imageUrl
      ? {
          backgroundImage: `url("${imageUrl}")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }
      : undefined,
  };
}

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [data, locale] = await Promise.all([
    loadReviewsLandingData(),
    getRouteLocale(params),
  ]);
  const page = data?.page;

  if (page?.seo) {
    return formatMetaData(page.seo as never, page?.name || 'Reviews', {
      locale,
      pathname: '/reviews',
    });
  }

  return {
    title:
      locale === 'en'
        ? 'Treatment Reviews | Drema Clinic'
        : 'รีวิวผลลัพธ์การรักษา | Drema Clinic',
    description:
      locale === 'en'
        ? 'Browse real treatment review categories from Drema Clinic, including Botox, fillers, lifting devices, skin quality treatments, and thread lift outcomes.'
        : 'รวมหมวดรีวิวเคสจริงจาก Drema Clinic ทั้ง Botox, Filler, เครื่องยกกระชับ, Skin Booster, Pico, Ulthera, Endolift และร้อยไหม',
    alternates: buildLocalizedAlternates(locale, '/reviews', getBaseUrl()),
    openGraph: {
      title:
        locale === 'en'
          ? 'Treatment Reviews | Drema Clinic'
          : 'รีวิวผลลัพธ์การรักษา | Drema Clinic',
      description:
        locale === 'en'
          ? 'Explore real treatment review categories and before-after outcome collections from Drema Clinic.'
          : 'สำรวจหมวดรีวิวเคสจริงและผลลัพธ์ก่อน-หลังการรักษาจาก Drema Clinic',
      url: buildLocalizedUrl(locale, '/reviews', getBaseUrl()),
      type: 'website',
    },
  };
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Reviews landing page composes CMS-driven hero, categories, featured reviews, and shared CTA in one route.
export default async function ReviewsLandingPage({ params }: Props) {
  const [data, settings] = await Promise.all([
    loadReviewsLandingData(),
    privilegedClient.fetch(settingsQuery),
  ]);
  const locale = await getRouteLocale(params);
  const isEn = locale === 'en';

  const categories = (data?.categories || []) as ReviewCategoryItem[];
  const featuredReviews = (data?.featuredReviews || []) as ReviewItem[];
  const page = data?.page as
    | (typeof data.page & ReviewsPageSectionBackground)
    | undefined;
  const firstCategory = categories[0];

  if (categories.length === 0) notFound();

  const getCategoryTitle = (category: ReviewCategoryItem) =>
    locale === 'en'
      ? category?.titleEn || category?.titleTh || category?.title
      : category?.titleTh || category?.title || category?.titleEn;

  const getCategoryDescription = (category: ReviewCategoryItem) =>
    locale === 'en'
      ? category?.descriptionEn || category?.descriptionTh
      : category?.descriptionTh || category?.descriptionEn;

  const firstCategoryTitle = getCategoryTitle(firstCategory);
  const heroImageAlt =
    page?.heroBackgroundMobile?.alt ||
    page?.heroBackgroundDesktop?.alt ||
    firstCategory?.coverImage?.alt ||
    firstCategoryTitle ||
    'Review category cover';
  const baseUrl = getBaseUrl();
  const reviewsUrl = buildLocalizedUrl(locale, '/reviews', baseUrl);
  const webpageJsonLd = buildWebPageJsonLd({
    canonicalUrl: reviewsUrl,
    locale: locale as SiteLocale,
    origin: baseUrl,
    title:
      page?.name ||
      (isEn
        ? 'Treatment Reviews | Drema Clinic'
        : 'รีวิวผลลัพธ์การรักษา | Drema Clinic'),
    description: page?.seo?.metaDescription || undefined,
  });
  const categoryList = categories
    .map((category, index) => {
      const categoryTitle = getCategoryTitle(category);
      if (!categoryTitle) return null;
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: categoryTitle,
        url: buildLocalizedUrl(locale, `/reviews/${category.slug}`, baseUrl),
      };
    })
    .filter(Boolean);
  const faqItems = isEn
    ? [
        {
          question: 'What is included on the Drema Clinic reviews page?',
          answer:
            'The reviews page groups real treatment outcome collections by category, including injectables, lifting procedures, laser treatments, skin quality treatments, and thread lift reviews.',
        },
        {
          question: 'Are the results on review pages guaranteed?',
          answer:
            'No. Review images are examples from real cases, and outcomes vary by baseline anatomy, skin condition, treatment plan, dosage or settings, and aftercare.',
        },
        {
          question: 'How should I use before-and-after review images?',
          answer:
            'Use review images as reference examples for treatment direction, then consult a physician for assessment because the right plan depends on each individual concern and facial structure.',
        },
      ]
    : [
        {
          question: 'หน้ารีวิว Drema Clinic รวมอะไรบ้าง?',
          answer:
            'หน้ารีวิวนี้รวมหมวดรีวิวเคสจริงตามประเภทหัตถการ เช่น กลุ่มฉีด กลุ่มยกกระชับ เลเซอร์ ฟื้นฟูคุณภาพผิว และร้อยไหม เพื่อให้ดูผลลัพธ์ตัวอย่างได้เป็นหมวดหมู่',
        },
        {
          question: 'ผลลัพธ์จากภาพรีวิวรับประกันเหมือนกันทุกคนหรือไม่?',
          answer:
            'ไม่รับประกันเหมือนกันทุกคน ภาพรีวิวเป็นตัวอย่างเคสจริง ผลลัพธ์ขึ้นอยู่กับโครงหน้า สภาพผิว แผนการรักษา ปริมาณหรือพลังงานที่ใช้ และการดูแลหลังทำ',
        },
        {
          question: 'ควรใช้ภาพก่อน-หลังในหน้ารีวิวอย่างไร?',
          answer:
            'ควรใช้ภาพรีวิวเป็นข้อมูลประกอบการตัดสินใจเบื้องต้น แล้วเข้ารับการประเมินโดยแพทย์ เพราะแผนที่เหมาะสมขึ้นอยู่กับปัญหาและโครงสร้างของแต่ละบุคคล',
        },
      ];
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isEn ? 'Drema Clinic review categories' : 'หมวดรีวิว Drema Clinic',
    url: reviewsUrl,
    itemListElement: categoryList,
  };
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
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
    ],
  };
  const categoriesSectionBackground = getSectionBackground({
    image: page?.categoriesSectionBackgroundImage,
    className: 'bg-[#f8f2e9]',
  });
  const referenceSectionBackground = getSectionBackground({
    image: page?.referenceSectionBackgroundImage,
    className: 'bg-white',
  });
  const featuredSectionBackground = getSectionBackground({
    image: page?.featuredSectionBackgroundImage,
    className: 'bg-white',
  });

  return (
    <div className="space-y-0">
      <MarketingPageHero
        breadcrumbs={{
          locale: locale as 'th' | 'en',
          items: [
            homeBreadcrumb(locale as 'th' | 'en'),
            { label: getBreadcrumbLabel(locale as 'th' | 'en', 'reviews') },
          ],
        }}
        eyebrow={
          locale === 'en'
            ? page?.heroEyebrowEn || 'Patient Stories'
            : page?.heroEyebrowTh || 'เรื่องราวจากผู้รับบริการ'
        }
        heading={
          locale === 'en'
            ? page?.heroHeadingEn || 'Premium Treatment Reviews'
            : page?.heroHeadingTh || 'รีวิวผลลัพธ์การรักษาระดับพรีเมียม'
        }
        description={
          locale === 'en'
            ? page?.heroDescriptionEn ||
              'Explore real-case categories and treatment outcomes from Drema Clinic.'
            : page?.heroDescriptionTh ||
              'รวมหมวดรีวิวเคสจริงและผลลัพธ์หลังการรักษา จากผู้รับบริการของ Drema Clinic'
        }
        desktopImage={page?.heroBackgroundDesktop || null}
        mobileImage={page?.heroBackgroundMobile || null}
        fallbackImage={firstCategory?.coverImage || null}
        imageAlt={heroImageAlt}
        imagePlaceholder={
          locale === 'en'
            ? 'Upload review category cover image'
            : 'อัปโหลดภาพปกหมวดรีวิว'
        }
        actions={
          <Link
            href={buildLocalizedPath(locale, `/reviews/${firstCategory.slug}`)}
            className="rounded-xl bg-[var(--marketing-cta-primary-bg)] px-6 py-3 text-sm font-medium text-[var(--marketing-cta-primary-text)] transition-all duration-500 ease-out hover:-translate-y-[2px] hover:bg-[var(--marketing-cta-primary-bg-hover)]"
          >
            {locale === 'en'
              ? page?.heroPrimaryCtaTextEn || 'Browse First Category'
              : page?.heroPrimaryCtaTextTh || `ดูหมวด ${firstCategoryTitle}`}
          </Link>
        }
      />

      <section
        className={`${categoriesSectionBackground.className} py-24`}
        style={categoriesSectionBackground.style}
      >
        <div className="container mx-auto px-4">
          <div className="mb-8 space-y-4">
            <h2 className="text-4xl font-serif text-[#3f3124] md:text-5xl">
              {locale === 'en' ? 'Review Categories' : 'หมวดรีวิว'}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {categories.map((category) => {
              const imageUrl = category.coverImage
                ? urlForImage(category.coverImage)
                    ?.width(1200)
                    .height(900)
                    // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
                    .fit('crop')
                    .auto('format')
                    .url()
                : undefined;

              const categoryTitle = getCategoryTitle(category);
              const categoryDescription = getCategoryDescription(category);

              return (
                <article
                  key={category._id}
                  className="overflow-hidden rounded-2xl border border-[var(--marketing-border)] bg-[var(--marketing-surface-2)] shadow-sm transition-all duration-500 hover:shadow-xl"
                >
                  <Link
                    href={buildLocalizedPath(
                      locale,
                      `/reviews/${category.slug}`
                    )}
                    className="block"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[var(--marketing-media)]">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={
                            category.coverImage?.alt ||
                            categoryTitle ||
                            'Review category'
                          }
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                          unoptimized
                        />
                      ) : null}
                    </div>
                  </Link>
                  <div className="space-y-3 p-6">
                    <h3 className="text-2xl font-serif text-[#3f3124]">
                      {categoryTitle}
                    </h3>
                    {categoryDescription ? (
                      <p className="line-clamp-2 text-base text-[var(--marketing-copy)]">
                        {categoryDescription}
                      </p>
                    ) : null}
                    <Link
                      href={buildLocalizedPath(
                        locale,
                        `/reviews/${category.slug}`
                      )}
                      className="inline-flex rounded-xl border border-[var(--marketing-cta-secondary-border)] bg-[var(--marketing-cta-secondary-bg)] px-6 py-3 text-[var(--marketing-cta-secondary-text)] transition-all duration-500 hover:-translate-y-[2px] hover:bg-[var(--marketing-cta-secondary-bg-hover)]"
                    >
                      {locale === 'en' ? 'View More Reviews' : 'ดูรีวิวเพิ่ม'}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className={`${referenceSectionBackground.className} py-20`}
        style={referenceSectionBackground.style}
      >
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-4">
              <p className="text-xs tracking-[0.26em] text-[#9a805f] uppercase">
                {isEn ? 'Review Reference' : 'ข้อมูลอ้างอิงรีวิว'}
              </p>
              <h2 className="text-4xl font-serif text-[#3f3124] md:text-5xl">
                {isEn
                  ? 'Real Treatment Review Categories'
                  : 'หมวดรีวิวเคสจริงตามหัตถการ'}
              </h2>
              <p className="text-lg leading-relaxed text-[#594935]">
                {isEn
                  ? 'Drema Clinic organizes treatment reviews by procedure so patients can compare relevant before-and-after examples before consultation. Reviews are reference cases, not guaranteed results.'
                  : 'Drema Clinic จัดรีวิวตามประเภทหัตถการ เพื่อให้ผู้สนใจดูตัวอย่างก่อน-หลังที่เกี่ยวข้องกับปัญหาของตนเองก่อนเข้ารับคำปรึกษา ภาพรีวิวเป็นเคสอ้างอิง ไม่ใช่การรับประกันผลลัพธ์'}
              </p>
            </div>

            <div className="space-y-5">
              {faqItems.map((item) => (
                <div
                  key={item.question}
                  className="rounded-2xl border border-[var(--marketing-border)] bg-[var(--marketing-surface-2)] p-5"
                >
                  <h3 className="text-xl font-semibold text-[#3f3124]">
                    {item.question}
                  </h3>
                  <p className="mt-2 leading-relaxed text-[#665640]">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className={`${featuredSectionBackground.className} py-24`}
        style={featuredSectionBackground.style}
      >
        <div className="container mx-auto px-4">
          <div className="mb-8 space-y-4">
            <h2 className="text-4xl font-serif text-[#3f3124] md:text-5xl">
              {locale === 'en' ? 'Featured Reviews' : 'รีวิวแนะนำ'}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredReviews.slice(0, 6).map((review) => (
              <ReviewCard key={review._id} review={review} locale={locale} />
            ))}
          </div>
        </div>
      </section>
      <GlobalCtaSection
        cta={settings}
        locale={locale as 'th' | 'en'}
        socialLinks={settings?.socialLinks || []}
      />
      <script type="application/ld+json">
        {JSON.stringify(itemListJsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(webpageJsonLd)}
      </script>
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </script>
    </div>
  );
}
