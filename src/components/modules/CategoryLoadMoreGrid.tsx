'use client';

import { useMemo, useState } from 'react';
import ArticleCard, { type ArticleCardItem } from './ArticleCard';

type Props = {
  items: ArticleCardItem[];
  perPage?: number;
  loadMoreLabel?: string;
  locale: 'th' | 'en';
};

export default function CategoryLoadMoreGrid({
  items,
  perPage = 10,
  loadMoreLabel = 'Load more',
  locale,
}: Props) {
  const [visibleCount, setVisibleCount] = useState(perPage);

  const visibleItems = useMemo(
    () => items.slice(0, visibleCount),
    [items, visibleCount]
  );

  const hasMore = visibleCount < items.length;

  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3 xl:gap-7">
        {visibleItems.map((item) => (
          <ArticleCard key={item.id} article={item} locale={locale} />
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
