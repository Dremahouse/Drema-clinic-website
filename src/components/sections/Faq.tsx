'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { PortableTextBlock } from 'next-sanity';
import { Image } from 'next-sanity/image';
import { useEffect, useMemo, useState } from 'react';
import { buildLocalizedPath } from '@/lib/locale';
import { urlForImage } from '@/lib/sanity/client/utils';
import type { FaqSectionFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import {
  isEffectEnabled,
  type SectionEffects,
  staggerDelay,
} from '@/utils/effects';
import PortableText from '../modules/PortableText';

type FaqItem = NonNullable<FaqSectionFragmentType['items']>[number];
type PortableTextChild = { text?: string | null };
type PortableTextPlainBlock = { children?: PortableTextChild[] | null };

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Existing FAQ section handles localization, JSON-LD, accordion state, and optional homepage/page behavior together.
export default function FaqSection({
  section,
}: {
  section: FaqSectionFragmentType;
}) {
  const pathname = usePathname() || '/th';
  const isEn = pathname.startsWith('/en');
  const isFaqPage = pathname.endsWith('/faq');
  const sectionData = section as FaqSectionFragmentType & {
    backgroundImage?: {
      alt?: string | null;
      asset?: { _id?: string | null; _ref?: string | null } | null;
    } | null;
  };
  const backgroundImage = sectionData.backgroundImage as
    | {
        alt?: string | null;
        asset?: { _id?: string | null; _ref?: string | null } | null;
      }
    | null
    | undefined;
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

  const getLocalizedQuestion = (item: FaqItem) =>
    (isEn ? item?.questionEn : item?.question) ||
    item?.question ||
    item?.questionEn ||
    'Question';

  const getLocalizedAnswer = (item: FaqItem) =>
    ((isEn ? item?.answerEn : item?.answer) ||
      item?.answer ||
      item?.answerEn) as PortableTextBlock[];

  const localizedHeading =
    (isEn ? sectionData?.headingEn : sectionData?.heading) ||
    sectionData?.heading ||
    sectionData?.headingEn ||
    'FAQ';

  const getPortableTextPlainText = (value?: PortableTextBlock[]) => {
    if (!value?.length) return '';
    return value
      .map((block) =>
        ((block as PortableTextPlainBlock)?.children || [])
          .map((child) => ('text' in child ? child.text || '' : ''))
          .join('')
          .trim()
      )
      .filter(Boolean)
      .join(' ');
  };

  const allItems = section.items ?? [];
  const visibleItems = useMemo(
    () => (isFaqPage ? allItems : allItems.slice(0, 6)),
    [isFaqPage, allItems]
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: Local helper functions intentionally derive from visibleItems and locale within this render.
  const faqJsonLd = useMemo(() => {
    if (!visibleItems.length) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: visibleItems
        .filter(
          (item) => getLocalizedQuestion(item) && getLocalizedAnswer(item)
        )
        .map((item) => ({
          '@type': 'Question',
          name: getLocalizedQuestion(item),
          acceptedAnswer: {
            '@type': 'Answer',
            text: getPortableTextPlainText(getLocalizedAnswer(item)),
          },
        })),
    };
  }, [visibleItems, isEn]);

  const [openKey, setOpenKey] = useState<string | null>(
    visibleItems[0]?._key ?? null
  );

  useEffect(() => {
    if (!visibleItems.length) {
      if (openKey !== null) {
        setOpenKey(null);
      }
      return;
    }

    const hasCurrentOpen = openKey
      ? visibleItems.some((item) => item._key === openKey)
      : false;

    if (!hasCurrentOpen) {
      setOpenKey(visibleItems[0]?._key ?? null);
    }
  }, [visibleItems, openKey]);

  const useStagger = isEffectEnabled(
    (section as { effects?: SectionEffects }).effects,
    'stagger',
    true
  );

  return (
    <section className="faq-section relative overflow-hidden py-16 md:py-24">
      {backgroundUrl ? (
        <Image
          src={backgroundUrl}
          alt={backgroundImage?.alt || 'Drema Clinic FAQ background'}
          fill
          sizes="100vw"
          className="object-cover"
        />
      ) : null}
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD script is generated from structured FAQ data and serialized with JSON.stringify.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
      <div className="container relative mx-auto grid grid-cols-1 gap-10 px-4 md:grid-cols-[0.95fr_1.05fr] md:items-start">
        <div className="md:sticky md:top-28">
          <p className="mb-4 inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">
            FAQ
          </p>
          <h2 className="mb-4 text-5xl font-semibold leading-tight md:text-6xl">
            {localizedHeading || 'Got Questions?'}
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-muted-foreground md:text-xl">
            {isEn
              ? 'Find answers to the most common questions about services, booking, and aftercare.'
              : 'ค้นหาคำตอบสำหรับคำถามที่พบบ่อยเกี่ยวกับบริการ การนัดหมาย และการดูแลหลังทำ'}
          </p>
        </div>

        <div className="space-y-3">
          {visibleItems.map((item, index) => {
            const isOpen = openKey === item._key;

            const accordionItem = (
              <article
                className={`overflow-hidden rounded-2xl border bg-white/58 backdrop-blur-[10px] transition-all duration-300 ${
                  isOpen
                    ? 'border-primary/50 shadow-md'
                    : 'border-border/80 hover:border-primary/35'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenKey(isOpen ? null : item._key)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-medium text-foreground">
                    {getLocalizedQuestion(item)}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.22 }}
                    className="shrink-0 text-muted-foreground"
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
                    >
                      <div className="border-t border-border/70 px-6 pb-6 pt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                        <PortableText value={getLocalizedAnswer(item)} />
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </article>
            );

            if (!useStagger) {
              return <div key={item._key}>{accordionItem}</div>;
            }

            return (
              <motion.div
                key={item._key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.4,
                  delay: staggerDelay(index, 0.045, 0.2),
                }}
              >
                {accordionItem}
              </motion.div>
            );
          })}

          {!isFaqPage && allItems.length > visibleItems.length ? (
            <div className="pt-2">
              <Link
                href={buildLocalizedPath(isEn ? 'en' : 'th', '/faq')}
                data-ui="button"
                className="inline-flex items-center rounded-full border border-foreground/30 px-5 py-2 text-sm font-medium"
              >
                {isEn ? 'View All FAQs' : 'ดูคำถามทั้งหมด'}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
