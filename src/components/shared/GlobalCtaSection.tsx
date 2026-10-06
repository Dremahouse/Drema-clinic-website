'use client';

import { CalendarDays, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { Image } from 'next-sanity/image';
import { getLinkByLinkObject } from '@/lib/links';
import { buildLocalizedPath } from '@/lib/locale';
import { urlForImage } from '@/lib/sanity/client/utils';

type BasicLink = {
  type?: 'internal' | 'external' | null;
  external?: string | null;
  href?: string | null;
  internal?: { _type?: string | null; slug?: string | null } | null;
} | null;

type ImageLike = {
  alt?: string | null;
  asset?: { _id?: string | null; _ref?: string | null } | null;
} | null;

export type GlobalCtaData = {
  globalCtaHeadingTh?: string | null;
  globalCtaHeadingEn?: string | null;
  globalCtaTextTh?: string | null;
  globalCtaTextEn?: string | null;
  globalCtaButtonTextTh?: string | null;
  globalCtaButtonTextEn?: string | null;
  globalCtaButtonLink?: BasicLink;
  globalCtaBackgroundImage?: ImageLike;
} | null;

export type GlobalSocialLink = {
  _key?: string | null;
  platform?: string | null;
  label?: string | null;
  url?: string | null;
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
  return buildLocalizedPath(locale, href);
};

const getLocalized = (
  locale: 'th' | 'en',
  th?: string | null,
  en?: string | null,
  fallback = ''
) => (locale === 'en' ? en || th || fallback : th || en || fallback);

export default function GlobalCtaSection({
  cta,
  locale,
  socialLinks = [],
  fullBleed = false,
  flushToFooter = false,
}: {
  cta?: GlobalCtaData;
  locale: 'th' | 'en';
  socialLinks?: GlobalSocialLink[] | null;
  fullBleed?: boolean;
  flushToFooter?: boolean;
}) {
  const backgroundUrl = cta?.globalCtaBackgroundImage?.asset?._id
    ? (urlForImage(cta.globalCtaBackgroundImage)
        ?.width(2200)
        .height(720)
        // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
        .fit('crop')
        .auto('format')
        .url() as string)
    : undefined;
  const heading = getLocalized(
    locale,
    cta?.globalCtaHeadingTh,
    cta?.globalCtaHeadingEn,
    locale === 'en'
      ? 'Ready for safe aesthetic care\nwith experienced doctors'
      : 'พร้อมดูแลความงามของคุณ\nอย่างปลอดภัยโดยแพทย์ผู้เชี่ยวชาญ'
  );
  const text = getLocalized(locale, cta?.globalCtaTextTh, cta?.globalCtaTextEn);
  const buttonText = getLocalized(
    locale,
    cta?.globalCtaButtonTextTh,
    cta?.globalCtaButtonTextEn,
    locale === 'en' ? 'Book Consultation' : 'นัดหมายปรึกษา'
  );
  const rawButtonHref = getLinkByLinkObject(cta?.globalCtaButtonLink as never);
  const buttonHref = rawButtonHref
    ? localizeHref(rawButtonHref, locale)
    : buildLocalizedPath(locale, '/contact');
  const lineUrl = socialLinks?.find(
    (item) => item?.platform?.toLowerCase() === 'line' && item?.url
  )?.url;
  const lineButtonText = locale === 'en' ? 'Chat on LINE' : 'แชท LINE';
  const sectionSpacing = flushToFooter
    ? 'px-6 pt-10 pb-12 md:px-10 md:pt-12 md:pb-16'
    : 'px-6 py-16 md:px-10 md:py-20';
  const sectionClassName = fullBleed
    ? `relative left-1/2 w-screen -translate-x-1/2 bg-[var(--marketing-surface-1)] ${sectionSpacing}`
    : `bg-[var(--marketing-surface-1)] ${sectionSpacing}`;

  return (
    <section className={sectionClassName}>
      <div className="relative mx-auto min-h-[300px] max-w-7xl overflow-hidden rounded-[2rem] border border-[var(--marketing-border)] bg-[var(--marketing-surface-2)] shadow-[0_28px_70px_rgba(82,56,34,0.1)]">
        {backgroundUrl ? (
          <Image
            src={backgroundUrl}
            alt={
              cta?.globalCtaBackgroundImage?.alt ||
              'Drema Clinic consultation background'
            }
            width={2200}
            height={720}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(100deg,#fffaf2_0%,#f1e1c8_100%)]" />
        )}
        <div className="relative z-10 flex min-h-[300px] max-w-xl flex-col justify-center px-7 py-10 md:px-12">
          <h2 className="whitespace-pre-line font-serif text-3xl leading-tight text-[var(--marketing-ink)] md:text-4xl">
            {heading}
          </h2>
          {text ? (
            <p className="mt-4 text-sm leading-7 text-[var(--marketing-copy)] md:text-base">
              {text}
            </p>
          ) : null}
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={buttonHref}
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-[var(--marketing-cta-primary-bg)] px-6 py-3.5 text-sm font-semibold text-[var(--marketing-cta-primary-text)] shadow-[0_16px_34px_rgba(139,107,74,0.22)] transition-all duration-500 hover:-translate-y-[2px] hover:bg-[var(--marketing-cta-primary-bg-hover)]"
            >
              {buttonText}
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
            </Link>
            {lineUrl ? (
              <Link
                href={lineUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-xl bg-[var(--marketing-cta-primary-bg)] px-6 py-3.5 text-sm font-semibold text-[var(--marketing-cta-primary-text)] shadow-[0_16px_34px_rgba(139,107,74,0.22)] transition-all duration-500 hover:-translate-y-[2px] hover:bg-[var(--marketing-cta-primary-bg-hover)]"
              >
                {lineButtonText}
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
