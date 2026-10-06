'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import type { PortableTextBlock } from 'next-sanity';
import { Image } from 'next-sanity/image';
import { useEffect, useMemo, useState } from 'react';
import ButtonsGroup from '@/components/modules/ButtonsGroup';
import PortableText from '@/components/modules/PortableText';
import { getLinkByLinkObject } from '@/lib/links';
import { urlForImage } from '@/lib/sanity/client/utils';
import type {
  HeroSectionFragmentType,
  LinkFragmentType,
} from '@/lib/sanity/queries/fragments/fragment.types';

type HeroImageItem = {
  alt?: string | null;
  asset?: {
    _id?: string | null;
    _ref?: string | null;
  } | null;
} | null;

type LocalizedHeroFields = HeroSectionFragmentType & {
  kickerTh?: string | null;
  kickerEn?: string | null;
  headingTh?: string | null;
  headingEn?: string | null;
  textTh?: string | null;
  textEn?: string | null;
  primaryCtaTextTh?: string | null;
  primaryCtaTextEn?: string | null;
  primaryCtaLink?: LinkFragmentType | null;
  secondaryCtaTextTh?: string | null;
  secondaryCtaTextEn?: string | null;
  secondaryCtaLink?: LinkFragmentType | null;
  images?: unknown;
  image?: HeroImageItem;
};

const localizeHref = (href: string | undefined, locale: 'th' | 'en') => {
  if (!href || href === '#') return '#';
  if (
    href.startsWith('http') ||
    href.startsWith('/th') ||
    href.startsWith('/en')
  ) {
    return href;
  }
  const normalized = href.startsWith('/') ? href : `/${href}`;
  return `/${locale}${normalized}`;
};

const getLocalized = (
  locale: 'th' | 'en',
  th?: string | null,
  en?: string | null,
  fallback = ''
) => (locale === 'en' ? en || th || fallback : th || en || fallback);

export default function HeroSection({
  section,
  locale = 'th',
}: {
  section: HeroSectionFragmentType;
  locale?: 'th' | 'en';
}) {
  const hero = section as LocalizedHeroFields;

  const slides = useMemo(() => {
    const sliderImagesRaw = (hero.images || []) as HeroImageItem[];
    const sliderImages = sliderImagesRaw.filter(
      (item): item is NonNullable<HeroImageItem> => Boolean(item?.asset?._id)
    );

    if (sliderImages.length > 0) return sliderImages;
    if (hero.image?.asset?._id) return [hero.image];
    return [];
  }, [hero.image, hero.images]);

  const [activeIndex, setActiveIndex] = useState(0);
  const safeIndex = Math.min(activeIndex, Math.max(slides.length - 1, 0));

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 6500);

    return () => clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[safeIndex];
  const activeImageUrl = activeSlide?.asset?._id
    ? (urlForImage(activeSlide)
        ?.width(2400)
        .height(1400)
        // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
        .fit('crop')
        .auto('format')
        .url() as string)
    : undefined;

  const kicker = getLocalized(
    locale,
    hero.kickerTh,
    hero.kickerEn,
    'DREMA CLINIC'
  );
  const heading = getLocalized(
    locale,
    hero.headingTh,
    hero.headingEn,
    hero.heading || 'BEAUTY • SAFETY\nPERSONALIZED'
  );
  const description = getLocalized(locale, hero.textTh, hero.textEn);
  const primaryLabel = getLocalized(
    locale,
    hero.primaryCtaTextTh,
    hero.primaryCtaTextEn,
    locale === 'en' ? 'Consult a Doctor' : 'ปรึกษาแพทย์'
  );
  const secondaryLabel = getLocalized(
    locale,
    hero.secondaryCtaTextTh,
    hero.secondaryCtaTextEn,
    locale === 'en' ? 'View Services' : 'ดูบริการทั้งหมด'
  );
  const primaryLinkHref = getLinkByLinkObject(hero.primaryCtaLink as never);
  const secondaryLinkHref = getLinkByLinkObject(hero.secondaryCtaLink as never);
  const primaryHref = primaryLinkHref
    ? localizeHref(primaryLinkHref, locale)
    : `/${locale}/contact`;
  const secondaryHref = secondaryLinkHref
    ? localizeHref(secondaryLinkHref, locale)
    : `/${locale}/services`;

  return (
    <section className="relative overflow-hidden border-b border-[var(--marketing-border)] bg-[#fbf6ee]">
      <div className="relative min-h-[560px] lg:min-h-[620px]">
        {activeImageUrl ? (
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              key={`home-hero-bg-${safeIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 0.85, 0.2, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={activeImageUrl}
                alt={
                  activeSlide?.alt || heading || 'Drema Clinic hero background'
                }
                width={2400}
                height={1400}
                priority
                className="h-full w-full object-cover object-[62%_center]"
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(115deg,#fffaf3_0%,#f4e6d0_58%,#d8bd92_100%)]" />
        )}

        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-center px-6 py-16 md:px-10 lg:min-h-[620px]">
          <motion.div
            key={`home-hero-copy-${safeIndex}`}
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { delayChildren: 0.12, staggerChildren: 0.1 },
              },
            }}
            className="max-w-[620px]"
          >
            <motion.p
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--marketing-muted)]"
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.55 }}
            >
              {kicker}
            </motion.p>
            <motion.h1
              className="mt-5 whitespace-pre-line font-serif text-4xl leading-[1.08] tracking-[-0.015em] text-[var(--marketing-ink)] md:text-5xl lg:text-[3.8rem]"
              style={{ fontWeight: 500 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.66, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {heading}
            </motion.h1>

            {description ? (
              <motion.p
                className="mt-7 max-w-[540px] text-base font-light leading-[1.75] text-[var(--marketing-copy)] md:text-lg"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
              >
                {description}
              </motion.p>
            ) : hero.text ? (
              <motion.div
                className="mt-7 max-w-[540px] text-base font-light leading-[1.75] text-[var(--marketing-copy)] md:text-lg"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
              >
                <PortableText value={hero.text as PortableTextBlock[]} />
              </motion.div>
            ) : null}

            <motion.div
              className="mt-9 flex flex-wrap items-center gap-4"
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.58 }}
            >
              <Link
                href={primaryHref}
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--marketing-cta-primary-bg)] px-6 py-3.5 text-sm font-semibold text-[var(--marketing-cta-primary-text)] shadow-[0_16px_34px_rgba(139,107,74,0.22)] transition-all duration-500 hover:-translate-y-[2px] hover:bg-[var(--marketing-cta-primary-bg-hover)]"
              >
                {primaryLabel}
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={secondaryHref}
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--marketing-border-strong)] bg-[color:rgba(255,255,255,0.78)] px-6 py-3.5 text-sm font-semibold text-[var(--marketing-brand)] shadow-[0_12px_24px_rgba(66,45,30,0.08)] backdrop-blur transition-all duration-500 hover:-translate-y-[2px] hover:bg-white"
              >
                {secondaryLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.div>

            {!description && hero.buttons && hero.buttons.length > 0 ? (
              <div className="mt-5">
                <ButtonsGroup buttons={hero.buttons} />
              </div>
            ) : null}
          </motion.div>
        </div>

        {slides.length > 1 ? (
          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/55 bg-white/45 px-3 py-2 shadow-[0_14px_34px_rgba(66,45,30,0.12)] backdrop-blur-md">
            {slides.map((slide, index) => (
              <button
                type="button"
                key={slide.asset?._id || `hero-dot-${index}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to hero slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === safeIndex
                    ? 'w-7 bg-[var(--marketing-brand)]'
                    : 'w-2.5 bg-[color:rgba(95,67,43,0.38)]'
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
