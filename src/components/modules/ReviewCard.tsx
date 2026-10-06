import Image from 'next/image';
import Link from 'next/link';
import { buildLocalizedPath } from '@/lib/locale';
import { urlForImage } from '@/lib/sanity/client/utils';

type ReviewCardItem = {
  _id: string;
  title?: string | null;
  slug?: string | null;
  coverImage?: {
    alt?: string | null;
  } | null;
  category?: {
    title?: string | null;
    titleTh?: string | null;
    titleEn?: string | null;
    descriptionTh?: string | null;
    descriptionEn?: string | null;
    slug?: string | null;
  } | null;
};

function getReviewCategoryTitle(
  category: ReviewCardItem['category'],
  locale: 'th' | 'en'
) {
  return locale === 'en'
    ? category?.titleEn || category?.titleTh || category?.title
    : category?.titleTh || category?.title || category?.titleEn;
}

function getReviewCategoryDescription(
  category: ReviewCardItem['category'],
  locale: 'th' | 'en'
) {
  return locale === 'en'
    ? category?.descriptionEn || category?.descriptionTh
    : category?.descriptionTh || category?.descriptionEn;
}

export default function ReviewCard({
  review,
  locale = 'th',
}: {
  review: ReviewCardItem;
  locale?: 'th' | 'en';
}) {
  const imageUrl = review.coverImage
    ? urlForImage(review.coverImage as never)
        ?.width(1200)
        .height(900)
        // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
        .fit('crop')
        .auto('format')
        .url()
    : undefined;

  const href = buildLocalizedPath(
    locale,
    `/reviews/${review.category?.slug || ''}`
  );
  const categoryTitle = getReviewCategoryTitle(review.category, locale);
  const categoryDescription = getReviewCategoryDescription(
    review.category,
    locale
  );
  const displayTitle = categoryTitle || review.title || 'Untitled review';

  return (
    <article className="group overflow-hidden rounded-2xl border border-[var(--marketing-border)] bg-[var(--marketing-surface-2)] shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:shadow-xl">
      <Link href={href} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--marketing-media)]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={review.coverImage?.alt || displayTitle || 'Review image'}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              unoptimized
            />
          ) : null}
        </div>
      </Link>

      <div className="space-y-3 p-5">
        {categoryTitle ? (
          <p className="text-xs tracking-[0.14em] text-[#9a805f] uppercase">
            {locale === 'en' ? 'Review Category' : 'หมวดรีวิว'}
          </p>
        ) : null}

        <h3 className="line-clamp-2 text-xl font-semibold text-[#3f3124]">
          <Link href={href} className="hover:text-[#775733]">
            {displayTitle}
          </Link>
        </h3>

        {categoryDescription ? (
          <p className="line-clamp-2 text-sm leading-6 text-[var(--marketing-copy)]">
            {categoryDescription}
          </p>
        ) : null}

        <Link
          href={href}
          className="inline-flex items-center rounded-xl border border-[var(--marketing-cta-secondary-border)] bg-[var(--marketing-cta-secondary-bg)] px-4 py-2 text-sm font-medium text-[var(--marketing-cta-secondary-text)] transition-all duration-500 hover:-translate-y-[2px] hover:bg-[var(--marketing-cta-secondary-bg-hover)]"
        >
          {locale === 'en' ? 'View Category Reviews' : 'ดูรีวิวในหมวดนี้'}
        </Link>
      </div>
    </article>
  );
}
