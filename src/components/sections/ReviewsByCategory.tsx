'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buildLocalizedPath } from '@/lib/locale';
import type { ReviewsByCategorySectionFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import ReviewCard from '../modules/ReviewCard';

export default function ReviewsByCategorySection({
  section,
}: {
  section: ReviewsByCategorySectionFragmentType;
}) {
  const pathname = usePathname() || '/';
  const locale: 'th' | 'en' = pathname.startsWith('/en') ? 'en' : 'th';
  const reviews = (section.reviews || []).slice(
    0,
    section.numberOfReviews || 6
  );
  const categoryTitle =
    locale === 'en'
      ? section.category?.titleEn ||
        section.category?.title ||
        section.category?.titleTh
      : section.category?.titleTh ||
        section.category?.title ||
        section.category?.titleEn;

  if (!section.category || reviews.length === 0) {
    return null;
  }

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 max-w-3xl space-y-4">
          <h2 className="text-4xl font-serif text-[#3f3124] md:text-5xl">
            {section.heading || categoryTitle}
          </h2>
          {section.description ? (
            <p className="text-base text-[#6a5a49]">{section.description}</p>
          ) : null}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} locale={locale} />
          ))}
        </div>

        {section.showViewAll !== false ? (
          <div className="mt-10">
            <Link
              href={buildLocalizedPath(
                locale,
                `/reviews/${section.category.slug}`
              )}
              className="inline-flex rounded-xl bg-[#8B6B4A] px-6 py-3 text-white transition-all duration-500 hover:-translate-y-[2px]"
            >
              {locale === 'en' ? 'View All Reviews' : 'ดูรีวิวทั้งหมด'}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
