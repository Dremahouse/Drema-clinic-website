import Image from 'next/image';
import Link from 'next/link';

export type ArticleCardItem = {
  id: string;
  title: string;
  excerpt?: string | null;
  href: string;
  imageUrl?: string;
  imageAlt?: string;
  categoryLabel?: string | null;
  date?: string | null;
};

function formatArticleDate(date: string, locale: 'th' | 'en') {
  return new Intl.DateTimeFormat(locale === 'th' ? 'th-TH' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export default function ArticleCard({
  article,
  locale,
}: {
  article: ArticleCardItem;
  locale: 'th' | 'en';
}) {
  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-[var(--marketing-border)] bg-[var(--marketing-surface-1)] transition-all duration-500 hover:-translate-y-[2px] hover:shadow-[var(--marketing-card-shadow-hover)]">
      <Link
        href={article.href}
        className="relative block aspect-[16/10] overflow-hidden bg-[var(--marketing-media)] md:aspect-[3/2]"
      >
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.imageAlt || article.title}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            unoptimized
          />
        ) : (
          <div className="h-full w-full bg-[var(--marketing-media)]" />
        )}
      </Link>
      <div className="p-4 md:p-5">
        {(article.categoryLabel || article.date) && (
          <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-[var(--marketing-muted)]">
            {article.categoryLabel ? (
              <span className="text-[var(--marketing-brand-deep)]">
                {article.categoryLabel}
              </span>
            ) : null}
            {article.categoryLabel && article.date ? (
              <span aria-hidden="true">•</span>
            ) : null}
            {article.date ? (
              <time dateTime={article.date}>
                {formatArticleDate(article.date, locale)}
              </time>
            ) : null}
          </div>
        )}
        <h3 className="line-clamp-2 text-[1.3rem] leading-snug font-semibold text-[var(--marketing-ink)] md:text-[1.375rem]">
          <Link
            href={article.href}
            className="transition-colors hover:text-[var(--marketing-brand-deep)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--marketing-brand)]"
          >
            {article.title}
          </Link>
        </h3>
        {article.excerpt ? (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--marketing-copy)]">
            {article.excerpt}
          </p>
        ) : null}
      </div>
    </article>
  );
}
