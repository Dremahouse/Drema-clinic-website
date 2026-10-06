'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Image } from 'next-sanity/image';
import { Badge } from '@/components/ui/Badge';
import { ReadTime } from '@/components/ui/ReadTime';
import { getLocalizedDocumentLink } from '@/lib/links';
import { buildLocalizedPath } from '@/lib/locale';
import { urlForImage } from '@/lib/sanity/client/utils';
import type { PostCardFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';

const postDateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  timeZone: 'UTC',
});

export default function PostCard({ post }: { post: PostCardFragmentType }) {
  const { title, excerpt, date, author, image, categories } = post;
  const pathname = usePathname() || '/';
  const locale = pathname.startsWith('/en') ? 'en' : 'th';

  const featuredCategory = categories?.[0];

  return (
    <article className="relative overflow-hidden rounded-[2rem] border border-[var(--marketing-border)] bg-[image:var(--marketing-gradient-soft)] shadow-[var(--marketing-card-shadow)]">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative h-64 bg-[var(--marketing-media)] md:h-full">
          {image ? (
            <Image
              src={urlForImage(image)?.width(1000).height(667).url() as string}
              alt={image?.alt || 'Blog Post Image'}
              style={{
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              width={1000}
              height={667}
              className="object-cover"
            />
          ) : null}
        </div>
        <div className="flex flex-col justify-center p-6 md:p-8">
          <div className="flex items-center space-x-4 mb-2">
            {featuredCategory && (
              <Badge variant="default" asChild>
                <Link href={getLocalizedDocumentLink(featuredCategory, locale)}>
                  {featuredCategory.title}
                </Link>
              </Badge>
            )}
            <ReadTime wordCount={post.wordCount} />
          </div>
          {date ? (
            <time
              dateTime={date}
              className="mb-4 text-sm text-[var(--marketing-muted)]"
            >
              {postDateFormatter.format(new Date(date))}
            </time>
          ) : null}
          <h3 className="mb-2 text-2xl font-bold text-[var(--marketing-ink)]">
            <Link
              href={buildLocalizedPath(locale, `/blog/${post.slug}`)}
              className="transition-colors hover:text-[var(--marketing-brand-deep)]"
            >
              {title}
            </Link>
          </h3>
          {excerpt ? (
            <p className="mb-4 text-[var(--marketing-copy)]">{excerpt}</p>
          ) : null}
          <div className="mb-4">
            {author ? (
              <span className="text-sm font-medium text-[var(--marketing-subtle)]">
                By {author?.firstName} {author?.lastName}
              </span>
            ) : null}
          </div>
          <Link
            href={buildLocalizedPath(locale, `/blog/${post.slug}`)}
            className="flex items-center font-medium text-[var(--marketing-price)] transition-colors hover:text-[var(--marketing-brand-strong)]"
          >
            Read More
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </article>
  );
}
