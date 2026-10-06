'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Image } from 'next-sanity/image';
import { useEffect, useRef, useState } from 'react';
import HoverScale from '@/components/effects/HoverScale';
import { urlForImage } from '@/lib/sanity/client/utils';
import type { TestimonialsSectionFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import {
  isEffectEnabled,
  type SectionEffects,
  staggerDelay,
} from '@/utils/effects';

function GoogleMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <path
        d="M21.6 12.23c0-.73-.06-1.27-.2-1.84H12v3.48h5.52c-.11.86-.72 2.16-2.07 3.03l-.02.12 3.01 2.28.21.02c1.91-1.72 2.95-4.25 2.95-7.09Z"
        fill="#4285F4"
      />
      <path
        d="M12 21.75c2.7 0 4.97-.87 6.63-2.38l-3.2-2.42c-.86.58-2.01.99-3.43.99-2.64 0-4.87-1.72-5.66-4.09l-.12.01-3.13 2.37-.04.11A10.01 10.01 0 0 0 12 21.75Z"
        fill="#34A853"
      />
      <path
        d="M6.34 13.85A5.96 5.96 0 0 1 6 12c0-.64.12-1.25.33-1.85l-.01-.12-3.17-2.4-.1.05A9.73 9.73 0 0 0 2 12c0 1.56.38 3.03 1.05 4.32l3.29-2.47Z"
        fill="#FBBC05"
      />
      <path
        d="M12 6.06c1.79 0 3 .76 3.69 1.4l2.69-2.57C16.96 3.58 14.7 2.25 12 2.25A10.01 10.01 0 0 0 3.05 7.68l3.28 2.47C7.13 7.78 9.36 6.06 12 6.06Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function renderStars(rating?: number | null) {
  const roundedRating =
    typeof rating === 'number' && rating > 0
      ? Math.min(5, Math.round(rating))
      : 0;
  if (!roundedRating) return null;

  return (
    <div
      role="img"
      className="flex items-center gap-1 text-[13px] text-[var(--marketing-brand)]"
      aria-label={`${roundedRating} out of 5 stars`}
    >
      {Array.from({ length: roundedRating }, (_, index) => index + 1).map(
        (star) => (
          <span key={`star-${star}`}>★</span>
        )
      )}
    </div>
  );
}

function getLocalizedQuote(
  item: TestimonialsSectionFragmentType['items'][number],
  isThai: boolean
) {
  return (
    (isThai ? item?.quoteTh : item?.quoteEn) ||
    item?.quoteTh ||
    item?.quoteEn ||
    item?.quote ||
    ''
  );
}

function ReviewAvatar({
  item,
  size = 72,
  className = '',
}: {
  item: TestimonialsSectionFragmentType['items'][number];
  size?: number;
  className?: string;
}) {
  if (item.avatar?.asset) {
    return (
      <Image
        src={
          (urlForImage(item.avatar)
            ?.width(size * 3)
            .height(size * 3)
            // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
            .fit('crop')
            .url() as string) || '/placeholder.jpg'
        }
        alt={item.name || 'Customer'}
        width={size}
        height={size}
        className={`rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-[var(--marketing-surface-3)] text-[var(--marketing-brand)] ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span className="text-xl font-semibold">
        {String(item.name || 'C')
          .slice(0, 1)
          .toUpperCase()}
      </span>
    </div>
  );
}

type SectionImage = {
  alt?: string | null;
  asset?: { _id?: string | null; _ref?: string | null } | null;
} | null;

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Existing testimonials section handles featured review, carousel marquee, animation, localization, and optional background support.
export default function TestimonialsSection({
  section,
}: {
  section: TestimonialsSectionFragmentType;
}) {
  const pathname = usePathname() || '/th';
  const isThai = !pathname.startsWith('/en');
  const items = section.items || [];
  const backgroundImage = (section as { backgroundImage?: SectionImage })
    .backgroundImage;
  const backgroundUrl =
    backgroundImage?.asset?._id || backgroundImage?.asset?._ref
      ? (urlForImage(backgroundImage)
          ?.width(2400)
          .height(1400)
          // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
          .fit('crop')
          .auto('format')
          .url() as string)
      : undefined;
  const featured = items[0];
  const restItems = items.slice(1);
  const marqueeItems =
    restItems.length > 1 ? [...restItems, ...restItems] : restItems;
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  const useHover = isEffectEnabled(
    (section as { effects?: SectionEffects }).effects,
    'hoverScale',
    true
  );
  const useStagger = isEffectEnabled(
    (section as { effects?: SectionEffects }).effects,
    'stagger',
    true
  );

  useEffect(() => {
    const node = carouselRef.current;
    if (!node || restItems.length <= 1) return;

    let frameId = 0;
    let previousTs = 0;
    const pixelsPerMs = 0.04;

    const animate = (ts: number) => {
      const rail = carouselRef.current;
      if (!rail) return;

      if (!previousTs) previousTs = ts;
      const elapsed = ts - previousTs;
      previousTs = ts;

      if (!isCarouselPaused) {
        const loopWidth = rail.scrollWidth / 2;
        rail.scrollLeft += elapsed * pixelsPerMs;

        if (rail.scrollLeft >= loopWidth) {
          rail.scrollLeft -= loopWidth;
        }
      }

      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [isCarouselPaused, restItems.length]);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,var(--marketing-surface-1)_0%,var(--marketing-surface-2)_100%)] py-16 md:py-24">
      {backgroundUrl ? (
        <Image
          src={backgroundUrl}
          alt={
            backgroundImage?.alt || 'Drema Clinic customer reviews background'
          }
          fill
          sizes="100vw"
          className="object-cover"
        />
      ) : null}
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 md:px-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-14 bg-[var(--marketing-brand)]/45" />
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--marketing-muted)]">
                {section.sourceBadgeLabel || 'Customer Reviews'}
              </p>
            </div>
            {section.intro ? (
              <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--marketing-copy)]">
                {section.intro}
              </p>
            ) : null}
          </div>

          {section.viewAllUrl ? (
            <Link
              href={section.viewAllUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex self-start rounded-xl border border-[var(--marketing-border-strong)] bg-[color:rgba(255,255,255,0.84)] px-5 py-3 text-sm font-medium text-[var(--marketing-brand)] transition-all duration-500 hover:-translate-y-[2px] md:self-auto"
            >
              {section.viewAllLabel || 'View all reviews on Google'}
            </Link>
          ) : null}
        </div>

        {featured ? (
          <motion.article
            initial={useStagger ? { opacity: 0, y: 22 } : undefined}
            whileInView={useStagger ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.2, 0.85, 0.2, 1] }}
            className="overflow-hidden rounded-[2.2rem] border border-white/55 bg-white/62 shadow-[0_18px_46px_rgba(45,34,18,0.08)] backdrop-blur-[10px]"
          >
            <div className="grid gap-8 px-6 py-8 md:grid-cols-[auto_1fr] md:px-10 md:py-10">
              <div className="flex justify-center md:justify-start">
                <ReviewAvatar
                  item={featured}
                  size={132}
                  className="h-[132px] w-[132px] border border-[var(--marketing-border)] shadow-[0_18px_36px_-26px_rgba(45,34,18,0.42)]"
                />
              </div>

              <div className="flex flex-col justify-center">
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[var(--marketing-border)] bg-[var(--marketing-surface-1)] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--marketing-muted)]">
                    <GoogleMark className="h-3.5 w-3.5 shrink-0" />
                    {featured.sourceLabel ||
                      section.sourceBadgeLabel ||
                      'Google Review'}
                  </span>
                  {renderStars(featured.rating)}
                  {featured.reviewDate ? (
                    <span className="text-sm text-[var(--marketing-muted)]">
                      {featured.reviewDate}
                    </span>
                  ) : null}
                </div>

                <blockquote className="text-[1.75rem] leading-tight tracking-tight text-[var(--marketing-ink)] md:text-[2.2rem]">
                  "{getLocalizedQuote(featured, isThai)}"
                </blockquote>

                <div className="mt-7 border-l-2 border-[var(--marketing-brand)]/55 pl-4">
                  <p className="text-lg font-semibold text-[var(--marketing-ink)]">
                    {featured.name}
                  </p>
                  {featured.tag ? (
                    <p className="text-sm text-[var(--marketing-copy)]">
                      {featured.tag}
                    </p>
                  ) : null}
                </div>

                {featured.sourceUrl ? (
                  <div className="mt-6">
                    <Link
                      href={featured.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex rounded-xl border border-[var(--marketing-border-strong)] bg-[color:rgba(255,255,255,0.84)] px-4 py-2 text-sm font-medium text-[var(--marketing-brand)] transition-all duration-500 hover:-translate-y-[1px]"
                    >
                      Read on source
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.article>
        ) : null}

        {restItems.length > 0 ? (
          <div className="-mx-6 flex flex-col gap-4 md:-mx-10">
            <div className="px-6 md:px-10">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--marketing-muted)]">
                {isThai ? 'รีวิวเพิ่มเติม' : 'More reviews'}
              </p>
            </div>

            <div className="relative">
              <div
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 md:w-20"
                style={{
                  background: backgroundUrl
                    ? 'linear-gradient(90deg,rgba(244,232,219,0.96) 0%,rgba(244,232,219,0.78) 38%,rgba(244,232,219,0) 100%)'
                    : 'linear-gradient(90deg,var(--marketing-surface-2) 10%,rgba(248,242,233,0) 100%)',
                }}
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 md:w-20"
                style={{
                  background: backgroundUrl
                    ? 'linear-gradient(270deg,rgba(244,232,219,0.96) 0%,rgba(244,232,219,0.78) 38%,rgba(244,232,219,0) 100%)'
                    : 'linear-gradient(270deg,var(--marketing-surface-2) 10%,rgba(248,242,233,0) 100%)',
                }}
              />

              <section
                ref={carouselRef}
                onMouseEnter={() => setIsCarouselPaused(true)}
                onMouseLeave={() => setIsCarouselPaused(false)}
                aria-label="Customer reviews carousel"
                className="flex gap-5 overflow-x-auto overflow-y-hidden px-10 pb-5 pt-3 [-ms-overflow-style:none] [overscroll-behavior-x:contain] [overscroll-behavior-y:none] [scrollbar-width:none] touch-pan-x [touch-action:pan-x] md:px-16 [&::-webkit-scrollbar]:hidden"
              >
                {marqueeItems.map((item, index) => {
                  const key = `${item._key || item.name || 'review'}-${index}`;
                  const card = (
                    <article
                      key={`${key}-card`}
                      className="flex h-full min-h-[250px] w-[320px] flex-none flex-col rounded-[1.75rem] border border-white/55 bg-white/58 p-5 shadow-[0_12px_30px_rgba(45,34,18,0.07)] backdrop-blur-[10px] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/70 hover:shadow-[0_18px_40px_rgba(45,34,18,0.11)] md:w-[360px]"
                    >
                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--marketing-border)] bg-[var(--marketing-surface-1)] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[var(--marketing-muted)]">
                          <GoogleMark className="h-3.5 w-3.5 shrink-0" />
                          {item.sourceLabel ||
                            section.sourceBadgeLabel ||
                            'Review'}
                        </span>
                        {renderStars(item.rating)}
                      </div>

                      <p className="mb-5 line-clamp-4 flex-1 text-sm leading-relaxed text-[var(--marketing-copy)]">
                        "{getLocalizedQuote(item, isThai)}"
                      </p>

                      <div className="flex items-center gap-3">
                        <ReviewAvatar
                          item={item}
                          size={44}
                          className="h-11 w-11"
                        />
                        <div>
                          <p className="font-semibold text-[var(--marketing-ink)]">
                            {item.name}
                          </p>
                          {item.tag ? (
                            <p className="text-xs text-[var(--marketing-muted)]">
                              {item.tag}
                            </p>
                          ) : null}
                          {item.reviewDate ? (
                            <p className="text-xs text-[var(--marketing-muted)]">
                              {item.reviewDate}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </article>
                  );

                  const animated = useStagger ? (
                    <motion.div
                      key={`${key}-motion`}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{
                        duration: 0.42,
                        delay: staggerDelay(
                          index % Math.max(restItems.length, 1),
                          0.06,
                          0.16
                        ),
                      }}
                      className="h-full"
                    >
                      {card}
                    </motion.div>
                  ) : (
                    card
                  );

                  return useHover ? (
                    <HoverScale key={key} className="h-full" scale={1.012}>
                      {animated}
                    </HoverScale>
                  ) : (
                    <div key={key} className="h-full">
                      {animated}
                    </div>
                  );
                })}
              </section>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
