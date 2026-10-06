'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  getBreadcrumbLabel,
  homeBreadcrumb,
} from '@/components/shared/Breadcrumbs';
import GlobalCtaSection, {
  type GlobalCtaData,
  type GlobalSocialLink,
} from '@/components/shared/GlobalCtaSection';
import MarketingPageHero from '@/components/shared/MarketingPageHero';
import { getLinkByLinkObject } from '@/lib/links';
import { buildLocalizedPath } from '@/lib/locale';

type BasicLink = {
  type?: 'internal' | 'external' | null;
  external?: string | null;
  href?: string | null;
  internal?: { _type?: string | null; slug?: string | null } | null;
} | null;

type PricingRow = {
  _key?: string;
  menuTh?: string | null;
  menuEn?: string | null;
  packageTh?: string | null;
  packageEn?: string | null;
  promoPrice?: string | null;
  quantityTh?: string | null;
  quantityEn?: string | null;
  regularPrice?: string | null;
  noteTh?: string | null;
  noteEn?: string | null;
};

type PricingSection = {
  _key?: string;
  anchorId?: string | null;
  titleTh?: string | null;
  titleEn?: string | null;
  descriptionTh?: string | null;
  descriptionEn?: string | null;
  columnsTh?: string[] | null;
  columnsEn?: string[] | null;
  rows?: PricingRow[] | null;
};

type PricingPageData = {
  heroEyebrowTh?: string | null;
  heroEyebrowEn?: string | null;
  heroHeadingTh?: string | null;
  heroHeadingEn?: string | null;
  heroDescriptionTh?: string | null;
  heroDescriptionEn?: string | null;
  heroImage?: {
    alt?: string | null;
    asset?: { _id?: string | null; _ref?: string | null } | null;
  } | null;
  heroImageDesktop?: {
    alt?: string | null;
    asset?: { _id?: string | null; _ref?: string | null } | null;
  } | null;
  heroImageMobile?: {
    alt?: string | null;
    asset?: { _id?: string | null; _ref?: string | null } | null;
  } | null;
  heroBackgroundDesktop?: {
    alt?: string | null;
    asset?: { _id?: string | null; _ref?: string | null } | null;
  } | null;
  heroBackgroundMobile?: {
    alt?: string | null;
    asset?: { _id?: string | null; _ref?: string | null } | null;
  } | null;
  heroPrimaryCtaTextTh?: string | null;
  heroPrimaryCtaTextEn?: string | null;
  heroPrimaryCtaLink?: BasicLink;
  heroSecondaryCtaTextTh?: string | null;
  heroSecondaryCtaTextEn?: string | null;
  heroSecondaryCtaLink?: BasicLink;
  anchorNavHeadingTh?: string | null;
  anchorNavHeadingEn?: string | null;
  pricingSections?: PricingSection[] | null;
  pricingNotesHeadingTh?: string | null;
  pricingNotesHeadingEn?: string | null;
  pricingNotesItems?: Array<{
    _key?: string;
    textTh?: string | null;
    textEn?: string | null;
  }> | null;
  ctaHeadingTh?: string | null;
  ctaHeadingEn?: string | null;
  ctaTextTh?: string | null;
  ctaTextEn?: string | null;
  ctaPrimaryTextTh?: string | null;
  ctaPrimaryTextEn?: string | null;
  ctaPrimaryLink?: BasicLink;
  ctaSecondaryTextTh?: string | null;
  ctaSecondaryTextEn?: string | null;
  ctaSecondaryLink?: BasicLink;
  citationSummaryTh?: string | null;
  citationSummaryEn?: string | null;
};

const localizeHref = (href: string, locale: 'th' | 'en') => {
  if (!href || href === '#' || href.startsWith('http')) return href || '#';
  if (href.startsWith('/th') || href.startsWith('/en')) return href;
  return buildLocalizedPath(locale, href);
};

const toHref = (link: BasicLink, locale: 'th' | 'en') =>
  link ? localizeHref(getLinkByLinkObject(link as never) || '#', locale) : '#';

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Pricing page renders CMS-driven pricing tables and anchor state in one route-level component.
export default function PricingPageContent({
  page,
  locale,
  globalCta,
  socialLinks = [],
}: {
  page: PricingPageData;
  locale: 'th' | 'en';
  globalCta?: GlobalCtaData;
  socialLinks?: GlobalSocialLink[];
}) {
  const isEn = locale === 'en';
  const heroImageAlt =
    page.heroBackgroundMobile?.alt ||
    page.heroBackgroundDesktop?.alt ||
    page.heroImageMobile?.alt ||
    page.heroImageDesktop?.alt ||
    page.heroImage?.alt ||
    (isEn ? 'Pricing page hero' : 'ภาพ Hero หน้าราคา');
  const sections = page.pricingSections || [];
  const resolvedSections = useMemo(
    () =>
      sections.filter((section) => Boolean(section.anchorId || section._key)),
    [sections]
  );
  const [activeAnchor, setActiveAnchor] = useState<string>(
    resolvedSections[0]?.anchorId || resolvedSections[0]?._key || ''
  );

  useEffect(() => {
    const first =
      resolvedSections[0]?.anchorId || resolvedSections[0]?._key || '';
    if (first) setActiveAnchor(first);
  }, [resolvedSections]);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) setActiveAnchor(hash);
    };

    onHashChange();
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <main className="pb-24">
      <div data-reveal-ignore="true">
        <MarketingPageHero
          breadcrumbs={{
            locale,
            items: [
              homeBreadcrumb(locale),
              { label: getBreadcrumbLabel(locale, 'pricing') },
            ],
          }}
          eyebrow={isEn ? page.heroEyebrowEn : page.heroEyebrowTh}
          heading={isEn ? page.heroHeadingEn : page.heroHeadingTh}
          description={isEn ? page.heroDescriptionEn : page.heroDescriptionTh}
          desktopImage={
            page.heroBackgroundDesktop || page.heroImageDesktop || null
          }
          mobileImage={
            page.heroBackgroundMobile || page.heroImageMobile || null
          }
          fallbackImage={page.heroImage || null}
          imageAlt={heroImageAlt}
          imagePlaceholder={
            isEn ? 'Upload hero image in Studio' : 'อัปโหลดภาพ Hero ใน Studio'
          }
          actions={
            <>
              <Link
                href={toHref(page.heroPrimaryCtaLink || null, locale)}
                className="rounded-xl bg-[var(--marketing-cta-primary-bg)] px-6 py-3 text-sm font-medium text-[var(--marketing-cta-primary-text)] transition-all duration-500 ease-out hover:-translate-y-[2px] hover:bg-[var(--marketing-cta-primary-bg-hover)] hover:shadow-lg"
              >
                {isEn ? page.heroPrimaryCtaTextEn : page.heroPrimaryCtaTextTh}
              </Link>
              <Link
                href={toHref(page.heroSecondaryCtaLink || null, locale)}
                className="rounded-xl border border-[var(--marketing-cta-secondary-border)] bg-[var(--marketing-cta-secondary-bg)] px-6 py-3 text-sm font-medium text-[var(--marketing-cta-secondary-text)] transition-all duration-500 ease-out hover:-translate-y-[2px] hover:bg-[var(--marketing-cta-secondary-bg-hover)]"
              >
                {isEn
                  ? page.heroSecondaryCtaTextEn
                  : page.heroSecondaryCtaTextTh}
              </Link>
              {resolvedSections[0] ? (
                <div className="flex items-center gap-3 text-sm text-[var(--marketing-muted)]">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--marketing-border-soft)] bg-[var(--marketing-cta-secondary-bg)] text-base">
                    ↓
                  </span>
                  <a
                    href={`#${resolvedSections[0].anchorId || resolvedSections[0]._key}`}
                    className="font-medium transition-colors hover:text-[var(--marketing-brand-strong)]"
                  >
                    {isEn
                      ? 'Jump to pricing categories'
                      : 'ดูหมวดราคาและตารางค่าบริการ'}
                  </a>
                </div>
              ) : null}
            </>
          }
        />
      </div>

      <section
        data-reveal-ignore="true"
        className="relative z-0 mx-auto max-w-7xl px-6 pt-3 pb-10 md:px-10 md:pt-4 md:pb-12"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr] md:gap-8">
          <aside className="md:sticky md:top-[88px] md:self-start">
            <div className="rounded-2xl border border-[var(--marketing-border)] bg-[var(--marketing-surface-2)] p-5 shadow-[var(--marketing-card-shadow)]">
              <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-[var(--marketing-muted)]">
                {isEn
                  ? page.anchorNavHeadingEn || 'Pricing Categories'
                  : page.anchorNavHeadingTh || 'เลือกประเภทบริการ'}
              </p>
              <div className="space-y-2 border-t border-[var(--marketing-divider)] pt-3">
                {resolvedSections.map((section) => {
                  const anchor = section.anchorId || section._key || '';
                  const isActive = activeAnchor === anchor;
                  return (
                    <a
                      key={anchor}
                      href={`#${anchor}`}
                      onClick={() => setActiveAnchor(anchor)}
                      className={`group flex items-center rounded-lg px-3 py-2 text-sm transition-all ${
                        isActive
                          ? 'bg-[var(--marketing-surface-tint)] font-medium text-[var(--marketing-brand-strong)]'
                          : 'text-[var(--marketing-copy)] hover:bg-[var(--marketing-surface-3)] hover:text-[var(--marketing-brand-strong)]'
                      }`}
                    >
                      <span>{isEn ? section.titleEn : section.titleTh}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </aside>
          <div className="space-y-8">
            {sections.map((section) => {
              const columns =
                (isEn ? section.columnsEn : section.columnsTh) || [];
              const rows = section.rows || [];
              return (
                <article
                  data-reveal-ignore="true"
                  id={section.anchorId || section._key}
                  key={section._key || section.anchorId}
                  className="scroll-mt-36 rounded-2xl border border-[var(--marketing-border)] bg-[image:var(--marketing-gradient-soft-warm)] p-6 shadow-[var(--marketing-card-shadow)] md:p-8"
                >
                  <h2 className="text-2xl font-semibold text-[var(--marketing-ink)] md:text-3xl">
                    {isEn ? section.titleEn : section.titleTh}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--marketing-copy)] md:text-base">
                    {isEn ? section.descriptionEn : section.descriptionTh}
                  </p>

                  <div className="mt-6 overflow-x-auto rounded-xl border border-[var(--marketing-border-soft)] bg-[var(--marketing-surface)]">
                    <table className="min-w-[920px] w-full text-left text-sm">
                      <thead className="bg-[var(--marketing-table-head)] text-[var(--marketing-table-head-text)]">
                        <tr>
                          {(columns.length
                            ? columns
                            : [
                                'Menu',
                                'Package / Detail',
                                'Promo Price',
                                'Quantity',
                                'Regular Price',
                              ]
                          ).map((column, index) => (
                            <th
                              key={`${section._key}-col-${index}`}
                              className="px-4 py-3 font-medium"
                            >
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {/* biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Table row rendering keeps localized pricing cells colocated with the table markup. */}
                        {rows.map((row) => (
                          <tr
                            key={row._key}
                            className="border-t border-[var(--marketing-table-border)] align-top"
                          >
                            <td className="px-4 py-3 font-medium text-[var(--marketing-table-ink)]">
                              {isEn ? row.menuEn : row.menuTh}
                              {(isEn ? row.noteEn : row.noteTh) ? (
                                <p className="mt-1 text-xs font-normal leading-5 text-[var(--marketing-muted)]">
                                  {isEn ? row.noteEn : row.noteTh}
                                </p>
                              ) : null}
                            </td>
                            <td className="px-4 py-3 text-[var(--marketing-copy)]">
                              {isEn ? row.packageEn : row.packageTh}
                            </td>
                            <td className="px-4 py-3 font-semibold text-[var(--marketing-price)]">
                              {row.promoPrice}
                            </td>
                            <td className="px-4 py-3 text-[var(--marketing-copy)]">
                              {isEn ? row.quantityEn : row.quantityTh}
                            </td>
                            <td className="px-4 py-3 text-[var(--marketing-copy)]">
                              {row.regularPrice}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        data-reveal-ignore="true"
        className="mx-auto max-w-7xl px-6 pb-12 md:px-10"
      >
        <article
          data-reveal-ignore="true"
          className="rounded-2xl border border-[var(--marketing-border)] bg-[var(--marketing-surface-2)] p-8"
        >
          <h2 className="text-2xl font-semibold text-[var(--marketing-ink)] md:text-3xl">
            {isEn ? page.pricingNotesHeadingEn : page.pricingNotesHeadingTh}
          </h2>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-[var(--marketing-copy)] md:text-base">
            {(page.pricingNotesItems || []).map((item) => (
              <li key={item._key}>• {isEn ? item.textEn : item.textTh}</li>
            ))}
          </ul>
        </article>
      </section>

      <GlobalCtaSection
        cta={globalCta}
        locale={locale}
        socialLinks={socialLinks}
      />

      <section
        data-reveal-ignore="true"
        className="mx-auto max-w-7xl px-6 pb-8 pt-10 md:px-10"
      >
        <article
          data-reveal-ignore="true"
          className="rounded-2xl border border-[var(--marketing-border-soft)] bg-[var(--marketing-surface-soft)] p-8"
        >
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--marketing-muted)]">
            {isEn ? 'Summary' : 'ข้อมูลโดยสรุป'}
          </p>
          <p className="mt-4 text-sm leading-8 text-[var(--marketing-copy)] md:text-base">
            {isEn ? page.citationSummaryEn : page.citationSummaryTh}
          </p>
        </article>
      </section>
    </main>
  );
}
