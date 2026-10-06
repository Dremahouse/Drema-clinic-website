import Link from 'next/link';
import { Image } from 'next-sanity/image';
import { Badge } from '@/components/ui/Badge';
import { DateComponent } from '@/components/ui/Date';
import { ReadTime } from '@/components/ui/ReadTime';
import { getLocalizedDocumentLink } from '@/lib/links';
import { urlForImage } from '@/lib/sanity/client/utils';
import type { PostCardFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';

type AuthorImage = {
  alt?: string | null;
  asset?: { _id?: string | null; _ref?: string | null } | null;
};

type PostAuthor = NonNullable<PostCardFragmentType['author']> & {
  firstNameEn?: string | null;
  lastNameEn?: string | null;
  heroImageDesktop?: AuthorImage | null;
  heroImageMobile?: AuthorImage | null;
};

const hasImageAsset = (image?: AuthorImage | null) =>
  Boolean(image?.asset?._ref || image?.asset?._id);

const getAuthorImage = (author?: PostCardFragmentType['author'] | null) => {
  const typedAuthor = author as PostAuthor | null | undefined;
  if (hasImageAsset(typedAuthor?.image)) return typedAuthor?.image;
  if (hasImageAsset(typedAuthor?.heroImageDesktop)) {
    return typedAuthor?.heroImageDesktop;
  }
  if (hasImageAsset(typedAuthor?.heroImageMobile)) {
    return typedAuthor?.heroImageMobile;
  }
  return null;
};

const getAuthorName = (
  author: PostCardFragmentType['author'] | null | undefined,
  locale: 'th' | 'en'
) => {
  const typedAuthor = author as PostAuthor | null | undefined;
  const firstName =
    locale === 'en'
      ? typedAuthor?.firstNameEn || typedAuthor?.firstName
      : typedAuthor?.firstName;
  const lastName =
    locale === 'en'
      ? typedAuthor?.lastNameEn || typedAuthor?.lastName
      : typedAuthor?.lastName;

  return { firstName, lastName };
};

const getBylineClassNames = (centered: boolean) => ({
  root: centered
    ? 'flex flex-col items-center justify-center gap-4 text-center sm:gap-5 lg:flex-row lg:items-start lg:justify-between lg:text-left'
    : 'flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-start lg:justify-between',
  author: centered
    ? 'min-w-0 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:items-center lg:justify-start lg:text-left'
    : 'min-w-0 flex items-center gap-3',
  meta: centered
    ? 'flex flex-col items-center gap-2 lg:items-start'
    : 'min-w-0 flex-1',
  side: centered
    ? 'flex flex-col items-center justify-center gap-2 lg:items-end lg:justify-start'
    : 'flex flex-col gap-2 lg:items-end',
  badges: centered
    ? 'flex flex-wrap items-center justify-center gap-2 lg:justify-end'
    : 'flex flex-wrap items-center gap-2 lg:justify-end',
  readTime: centered ? 'text-center lg:text-right' : 'text-left lg:text-right',
});

export default function Byline({
  post,
  locale = 'th',
  centered = false,
}: {
  post: PostCardFragmentType;
  locale?: 'th' | 'en';
  centered?: boolean;
}) {
  const authorImage = getAuthorImage(post.author);
  const { firstName, lastName } = getAuthorName(post.author, locale);
  const classNames = getBylineClassNames(centered);
  const authorImageSrc = authorImage
    ? (urlForImage(authorImage)
        ?.height(96)
        .width(96)
        // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit('crop').
        .fit('crop')
        .url() as string)
    : null;

  return (
    <div className={classNames.root}>
      <div className={classNames.author}>
        {authorImage && authorImageSrc ? (
          <div className="h-10 w-10 shrink-0">
            <Image
              alt={authorImage?.alt || ''}
              className="h-full w-full rounded-full object-cover"
              height={48}
              width={48}
              src={authorImageSrc}
            />
          </div>
        ) : (
          <div className="shrink-0 text-sm text-gray-600">
            {locale === 'en' ? 'By' : 'โดย'}
          </div>
        )}

        <div className={classNames.meta}>
          {firstName && lastName && post.author?.slug ? (
            <Link
              className="block max-w-full text-base font-semibold leading-tight text-[#3f3124] underline decoration-[#b59673] underline-offset-4 transition-colors hover:text-[#8b6b4a]"
              href={getLocalizedDocumentLink(
                { _type: 'person', slug: post.author.slug },
                locale
              )}
            >
              {firstName} {lastName}
            </Link>
          ) : null}

          <div className="mt-1 text-sm text-gray-500">
            <DateComponent dateString={post.date} />
          </div>
        </div>
      </div>

      <div className={classNames.side}>
        {post.categories && post.categories.length > 0 && (
          <div className={classNames.badges}>
            {post.categories.filter(Boolean).map((category) => (
              <Badge variant="default" asChild key={category._id}>
                <Link
                  href={getLocalizedDocumentLink(
                    { _type: 'category', slug: category.slug },
                    locale
                  )}
                >
                  {category.title}
                </Link>
              </Badge>
            ))}
          </div>
        )}

        <div className={classNames.readTime}>
          <ReadTime wordCount={post.wordCount} />
        </div>
      </div>
    </div>
  );
}
