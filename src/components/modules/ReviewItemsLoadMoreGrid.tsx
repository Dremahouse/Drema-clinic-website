'use client';

import { useMemo, useState } from 'react';
import ReviewCard from './ReviewCard';

type ReviewCardItem = {
  _id: string;
  title?: string | null;
  slug?: string | null;
  coverImage?: {
    alt?: string | null;
  } | null;
  category?: {
    title?: string | null;
    slug?: string | null;
  } | null;
};

type Props = {
  items: ReviewCardItem[];
  locale: 'th' | 'en';
  perPage?: number;
  loadMoreLabel?: string;
};

export default function ReviewItemsLoadMoreGrid({
  items,
  locale,
  perPage = 6,
  loadMoreLabel = 'Load more',
}: Props) {
  const [visibleCount, setVisibleCount] = useState(perPage);
  const visibleItems = useMemo(
    () => items.slice(0, visibleCount),
    [items, visibleCount]
  );
  const hasMore = visibleCount < items.length;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {visibleItems.map((review) => (
          <ReviewCard key={review._id} review={review} locale={locale} />
        ))}
      </div>
      {hasMore ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + perPage)}
            className="rounded-xl bg-[#8B6B4A] px-6 py-3 text-white transition-all duration-500 hover:-translate-y-[2px]"
          >
            {loadMoreLabel}
          </button>
        </div>
      ) : null}
    </div>
  );
}
