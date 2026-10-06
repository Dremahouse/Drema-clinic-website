'use client';

import type { PortableTextBlock } from 'next-sanity';
import { Image } from 'next-sanity/image';
import { useEffect, useRef, useState } from 'react';
import { urlForImage } from '@/lib/sanity/client/utils';
import type { CardGridSectionFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import Card from '../modules/Card';
import PortableText from '../modules/PortableText';

type SectionImage = {
  alt?: string | null;
  asset?: { _id?: string | null; _ref?: string | null } | null;
} | null;

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Existing card grid handles localized content, optional images, reveal state, and optional section background in one component.
export default function CardGrid({
  section,
  locale = 'th',
}: {
  section: CardGridSectionFragmentType;
  locale?: 'th' | 'en';
}) {
  const localizedSection = section as CardGridSectionFragmentType & {
    headingTh?: string | null;
    headingEn?: string | null;
    contentTh?: PortableTextBlock[] | null;
    contentEn?: PortableTextBlock[] | null;
    image?: SectionImage;
    backgroundImage?: SectionImage;
  };
  const heading =
    locale === 'en'
      ? localizedSection.headingEn ||
        localizedSection.headingTh ||
        section.heading
      : localizedSection.headingTh ||
        localizedSection.headingEn ||
        section.heading;
  const content =
    locale === 'en'
      ? localizedSection.contentEn ||
        localizedSection.contentTh ||
        section.content
      : localizedSection.contentTh ||
        localizedSection.contentEn ||
        section.content;
  const cards = section.cards;
  const sectionImageUrl = localizedSection.image?.asset?._id
    ? (urlForImage(localizedSection.image)
        ?.width(1400)
        .height(900)
        // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
        .fit('crop')
        .auto('format')
        .url() as string)
    : undefined;
  const backgroundUrl =
    localizedSection.backgroundImage?.asset?._id ||
    localizedSection.backgroundImage?.asset?._ref
      ? (urlForImage(localizedSection.backgroundImage)
          ?.width(2400)
          .height(1400)
          // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
          .fit('crop')
          .auto('format')
          .url() as string)
      : undefined;
  const headingRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [headingInView, setHeadingInView] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          if (entry.target === headingRef.current) {
            setHeadingInView(true);
            return;
          }

          const index = Number((entry.target as HTMLElement).dataset.cardIndex);
          if (Number.isNaN(index)) return;
          setVisibleCards((prev) => ({ ...prev, [index]: true }));
        });
      },
      { threshold: 0.25, rootMargin: '0px 0px -8% 0px' }
    );

    if (headingRef.current) observer.observe(headingRef.current);
    cardRefs.current.forEach((cardEl) => {
      if (cardEl) observer.observe(cardEl);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#fbf8f2] py-16 md:py-20 lg:py-24">
      {backgroundUrl ? (
        <Image
          src={backgroundUrl}
          alt={
            localizedSection.backgroundImage?.alt ||
            heading ||
            'Drema Clinic section background'
          }
          fill
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(214,184,133,0.16),transparent_32%),linear-gradient(180deg,#fffdf9_0%,#f6efe4_100%)]" />
      )}
      {!backgroundUrl ? (
        <div className="pointer-events-none absolute right-[4%] top-0 hidden h-[360px] w-[520px] overflow-hidden rounded-b-full border border-[#c8a96a]/55 border-t-0 md:block lg:h-[430px] lg:w-[650px]">
          {sectionImageUrl ? (
            <Image
              src={sectionImageUrl}
              alt={localizedSection.image?.alt || heading || 'Drema Clinic'}
              fill
              sizes="(max-width: 1280px) 48vw, 650px"
              className="object-cover object-center opacity-95"
            />
          ) : (
            <div className="h-full w-full bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0.8),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.24),rgba(205,177,132,0.18))]" />
          )}
        </div>
      ) : null}
      <div className="container relative mx-auto px-4">
        <div
          ref={headingRef}
          className="relative z-10 mb-11 max-w-[430px] md:mb-12 lg:mb-14"
        >
          <h2 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-[#1e1b17] md:text-5xl">
            {heading}
          </h2>
          <span
            className={`mt-5 block h-[2px] w-24 origin-left rounded-full bg-[#b78b4f] transition-transform duration-700 ease-out ${
              headingInView ? 'scale-x-100' : 'scale-x-0'
            }`}
          />
          <div className="mt-6 text-base leading-8 text-[#6d665d]">
            <PortableText value={content as PortableTextBlock[]} />
          </div>
        </div>
        <div className="relative z-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {cards?.map((card, index) => (
            <div
              key={card.heading || card._key}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              data-card-index={index}
              className={`transition-all duration-700 ease-out ${
                visibleCards[index]
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Card card={card} locale={locale} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
