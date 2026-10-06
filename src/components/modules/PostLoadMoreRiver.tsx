'use client';

import { useMemo, useState } from 'react';
import type { PostCardFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import PostCard from './PostCard';

type Props = {
  posts: PostCardFragmentType[];
  perPage?: number;
  loadMoreLabel?: string;
};

export default function PostLoadMoreRiver({
  posts,
  perPage = 10,
  loadMoreLabel = 'Load more',
}: Props) {
  const [visibleCount, setVisibleCount] = useState(perPage);
  const visiblePosts = useMemo(
    () => posts.slice(0, visibleCount),
    [posts, visibleCount]
  );
  const hasMore = visibleCount < posts.length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-10">
        {visiblePosts.map((post) => (
          <PostCard key={post._id} post={post} />
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
