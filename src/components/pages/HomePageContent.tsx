'use client';

import {
  ArrowRight,
  CheckCircle2,
  Flower2,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import Link from 'next/link';
import type { SanityDocument } from 'next-sanity';
import { useOptimistic } from 'next-sanity/hooks';
import { Image } from 'next-sanity/image';
import type { ElementType } from 'react';
import Reveal from '@/components/effects/Reveal';
import GlobalCtaSection, {
  type GlobalCtaData,
} from '@/components/shared/GlobalCtaSection';
import { getLinkByLinkObject } from '@/lib/links';
import { buildLocalizedPath } from '@/lib/locale';
import { dataAttr, urlForImage } from '@/lib/sanity/client/utils';
import type { SectionsType } from '@/lib/sanity/queries/fragments/fragment.types';
import { staggerDelay } from '@/utils/effects';
import AboutDoctor from '../sections/AboutDoctor';
import Benefits from '../sections/Benefits';
import CardGrid from '../sections/CardGrid';
import Contact from '../sections/Contact';
import CTA from '../sections/CTA';
import Divider from '../sections/Divider';
import Faq from '../sections/Faq';
import Gallery from '../sections/Gallery';
import Hero from '../sections/Hero';
import Introduction from '../sections/Introduction';
import MediaText from '../sections/MediaText';
import PostList from '../sections/PostList';
import Pricing from '../sections/Pricing';
import ReviewsByCategory from '../sections/ReviewsByCategory';
import Services from '../sections/Services';
import Subscribe from '../sections/Subscribe';
import Testimonials from '../sections/Testimonials';

const SECTION_COMPONENTS: Record<string, ElementType> = {
  hero: Hero,
  introduction: Introduction,
  services: Services,
  gallery: Gallery,
  benefits: Benefits,
  aboutDoctor: AboutDoctor,
  testimonials: Testimonials,
  pricing: Pricing,
  faq: Faq,
  contact: Contact,
  mediaText: MediaText,
  cta: CTA,
  subscribe: Subscribe,
  postList: PostList,
  reviewsByCategory: ReviewsByCategory,
  cardGrid: CardGrid,
  divider: Divider,
} as const;

type HomePageContentProps = {
  documentId: string;
  documentType: string;
  locale: 'th' | 'en';
  sections?: SectionsType;
  homePage?: {
    philosophyLabelTh?: string | null;
    philosophyLabelEn?: string | null;
    philosophyHeadingTh?: string | null;
    philosophyHeadingEn?: string | null;
    philosophyTextTh?: string | null;
    philosophyTextEn?: string | null;
    philosophyImage?: {
      alt?: string | null;
      asset?: { _id?: string | null; _ref?: string | null } | null;
    } | null;
    philosophyBackgroundImage?: ServiceImage | null;
    philosophyItems?: Array<{
      _key?: string | null;
      titleTh?: string | null;
      titleEn?: string | null;
      descriptionTh?: string | null;
      descriptionEn?: string | null;
    }> | null;
    treatmentsLabelTh?: string | null;
    treatmentsLabelEn?: string | null;
    treatmentsHeadingTh?: string | null;
    treatmentsHeadingEn?: string | null;
    treatmentsTextTh?: string | null;
    treatmentsTextEn?: string | null;
    treatmentsButtonTextTh?: string | null;
    treatmentsButtonTextEn?: string | null;
    treatmentsBackgroundImage?: ServiceImage | null;
    technologyLabelTh?: string | null;
    technologyLabelEn?: string | null;
    technologyHeadingTh?: string | null;
    technologyHeadingEn?: string | null;
    technologyTextTh?: string | null;
    technologyTextEn?: string | null;
    technologyBackgroundImage?: ServiceImage | null;
    technologyItems?: Array<{
      _key?: string | null;
      textTh?: string | null;
      textEn?: string | null;
    }> | null;
    technologyButtonTextTh?: string | null;
    technologyButtonTextEn?: string | null;
    technologyButtonLink?: {
      type?: 'internal' | 'external' | null;
      external?: string | null;
      internal?: { _type?: string | null; slug?: string | null } | null;
    } | null;
    featuredServices?: Array<{
      _id?: string | null;
      name?: string | null;
      slug?: string | null;
      heroHeadingTh?: string | null;
      heroHeadingEn?: string | null;
      heroDescriptionTh?: string | null;
      heroDescriptionEn?: string | null;
      heroImage?: ServiceImage | null;
      heroImageDesktop?: ServiceImage | null;
      heroImageMobile?: ServiceImage | null;
      heroBackgroundDesktop?: ServiceImage | null;
    }> | null;
  };
  settingsSocialLinks?: Array<{
    _key?: string | null;
    platform?: string | null;
    label?: string | null;
    url?: string | null;
  }>;
  globalCta?: GlobalCtaData;
};

type PageData = SanityDocument<{
  pageSections?: SectionsType;
}>;

type SectionLike = NonNullable<SectionsType>[number];

type ServiceImage = {
  alt?: string | null;
  asset?: { _id?: string | null; _ref?: string | null } | null;
};

const ORDER_PRIORITY: Record<string, number> = {
  hero: 0,
  introduction: 10,
  mediaText: 11,
  services: 20,
  cardGrid: 21,
  benefits: 22,
  aboutDoctor: 30,
  pricing: 50,
  reviewsByCategory: 60,
  testimonials: 61,
  gallery: 62,
  faq: 70,
  contact: 80,
  cta: 90,
  subscribe: 91,
  postList: 92,
  divider: 100,
};

const PHILOSOPHY_ICONS = [Stethoscope, Flower2, ShieldCheck, Sparkles];

const getLocalized = (
  locale: 'th' | 'en',
  th?: string | null,
  en?: string | null,
  fallback = ''
) => (locale === 'en' ? en || th || fallback : th || en || fallback);

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

const buildSectionId = (section: SectionLike, index: number) =>
  `${section._type}-${section._key || index}`;

const getSectionBackgroundUrl = (image?: ServiceImage | null) =>
  image?.asset?._id || image?.asset?._ref
    ? (urlForImage(image)
        ?.width(2400)
        .height(1400)
        // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
        .fit('crop')
        .auto('format')
        .url() as string)
    : undefined;

function SectionBackgroundImage({ src, alt }: { src?: string; alt: string }) {
  if (!src) return null;

  return (
    <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
  );
}

function PhilosophySection({
  homePage,
  locale,
}: {
  homePage?: HomePageContentProps['homePage'];
  locale: 'th' | 'en';
}) {
  const imageUrl = homePage?.philosophyImage?.asset?._id
    ? (urlForImage(homePage.philosophyImage)
        ?.width(980)
        .height(980)
        // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
        .fit('crop')
        .auto('format')
        .url() as string)
    : undefined;
  const backgroundUrl = getSectionBackgroundUrl(
    homePage?.philosophyBackgroundImage
  );
  const label = getLocalized(
    locale,
    homePage?.philosophyLabelTh,
    homePage?.philosophyLabelEn,
    'OUR PHILOSOPHY'
  );
  const heading = getLocalized(
    locale,
    homePage?.philosophyHeadingTh,
    homePage?.philosophyHeadingEn,
    locale === 'en'
      ? 'Thoughtful details for your best possible result'
      : 'ใส่ใจในทุกรายละเอียด\nเพื่อผลลัพธ์ที่ดีที่สุดสำหรับคุณ'
  );
  const text = getLocalized(
    locale,
    homePage?.philosophyTextTh,
    homePage?.philosophyTextEn
  );
  const items = (homePage?.philosophyItems || []).map((item, index) => ({
    key: item?._key || `${index}`,
    title: getLocalized(locale, item?.titleTh, item?.titleEn),
    description: getLocalized(locale, item?.descriptionTh, item?.descriptionEn),
    Icon: PHILOSOPHY_ICONS[index % PHILOSOPHY_ICONS.length],
  }));

  return (
    <section className="relative overflow-hidden border-b border-[var(--marketing-border)] bg-[var(--marketing-surface-1)] py-20 md:py-24">
      {backgroundUrl ? (
        <SectionBackgroundImage
          src={backgroundUrl}
          alt={
            homePage?.philosophyBackgroundImage?.alt ||
            'Drema Clinic philosophy background'
          }
        />
      ) : (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(210,174,114,0.12),transparent_32%),radial-gradient(circle_at_88%_12%,rgba(255,255,255,0.9),transparent_34%)]" />
      )}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16">
        <div className="relative overflow-hidden rounded-[2rem] border border-[var(--marketing-border)] bg-[var(--marketing-surface-2)] shadow-[0_28px_70px_rgba(82,56,34,0.12)]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={
                homePage?.philosophyImage?.alt ||
                'Drema Clinic philosophy image'
              }
              width={980}
              height={980}
              className="aspect-[1.05/1] h-full w-full object-cover"
            />
          ) : (
            <div className="aspect-[1.05/1] bg-[linear-gradient(135deg,#f8efe2,#d8b987)]" />
          )}
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--marketing-muted)]">
            {label}
          </p>
          <h2 className="mt-5 whitespace-pre-line font-serif text-4xl leading-tight text-[var(--marketing-ink)] md:text-5xl">
            {heading}
          </h2>
          {text ? (
            <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--marketing-copy)] md:text-lg">
              {text}
            </p>
          ) : null}
          <div className="mt-8 h-px w-20 bg-[var(--marketing-border-strong)]" />

          {items.length > 0 ? (
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
              {items.map(({ key, title, description, Icon }) => (
                <div key={key} className="text-center md:text-left">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center text-[var(--marketing-brand)] md:mx-0">
                    <Icon
                      className="h-11 w-11 stroke-[1.35]"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold leading-6 text-[var(--marketing-ink)]">
                    {title}
                  </h3>
                  {description ? (
                    <p className="mt-1 text-xs leading-5 text-[var(--marketing-copy)]">
                      {description}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function TreatmentsSection({
  homePage,
  locale,
}: {
  homePage?: HomePageContentProps['homePage'];
  locale: 'th' | 'en';
}) {
  const services = homePage?.featuredServices || [];
  if (services.length === 0) return null;

  const label = getLocalized(
    locale,
    homePage?.treatmentsLabelTh,
    homePage?.treatmentsLabelEn,
    'OUR TREATMENTS'
  );
  const heading = getLocalized(
    locale,
    homePage?.treatmentsHeadingTh,
    homePage?.treatmentsHeadingEn,
    locale === 'en' ? 'Our Treatments' : 'บริการของเรา'
  );
  const text = getLocalized(
    locale,
    homePage?.treatmentsTextTh,
    homePage?.treatmentsTextEn
  );
  const buttonText = getLocalized(
    locale,
    homePage?.treatmentsButtonTextTh,
    homePage?.treatmentsButtonTextEn,
    locale === 'en' ? 'View All Services' : 'ดูบริการทั้งหมด'
  );

  const backgroundUrl = getSectionBackgroundUrl(
    homePage?.treatmentsBackgroundImage
  );

  return (
    <section className="relative overflow-hidden border-b border-[var(--marketing-border)] bg-[linear-gradient(135deg,#fffdf9_0%,#fbf4ea_42%,#f5eadb_100%)] py-20 md:py-24">
      {backgroundUrl ? (
        <SectionBackgroundImage
          src={backgroundUrl}
          alt={
            homePage?.treatmentsBackgroundImage?.alt ||
            'Drema Clinic treatments background'
          }
        />
      ) : (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_8%,rgba(255,255,255,0.95),transparent_28%),radial-gradient(circle_at_82%_4%,rgba(218,184,126,0.22),transparent_30%),radial-gradient(circle_at_52%_112%,rgba(183,137,91,0.14),transparent_34%)]" />
          <div className="pointer-events-none absolute -left-28 top-24 h-72 w-72 rounded-full bg-[rgba(232,199,151,0.36)] blur-3xl md:h-96 md:w-96" />
          <div className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-[rgba(255,255,255,0.82)] blur-3xl md:h-80 md:w-80" />
          <div className="pointer-events-none absolute bottom-8 left-1/2 h-56 w-[44rem] -translate-x-1/2 rounded-full bg-[rgba(139,107,74,0.1)] blur-3xl" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--marketing-muted)]">
              {label}
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-[var(--marketing-ink)] md:text-5xl">
              {heading}
            </h2>
            {text ? (
              <p className="mt-5 max-w-md text-base leading-8 text-[var(--marketing-copy)]">
                {text}
              </p>
            ) : null}
          </div>
          <Link
            href={buildLocalizedPath(locale, '/services')}
            className="inline-flex w-fit items-center gap-3 rounded-xl border border-[var(--marketing-border-strong)] bg-[color:rgba(255,255,255,0.72)] px-6 py-3.5 text-sm font-semibold text-[var(--marketing-brand)] shadow-[0_16px_34px_rgba(82,56,34,0.08)] backdrop-blur transition-all duration-500 hover:-translate-y-[2px] hover:bg-white"
          >
            {buttonText}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const image =
              service.heroImageMobile ||
              service.heroImage ||
              service.heroImageDesktop ||
              service.heroBackgroundDesktop;
            const imageUrl = image?.asset?._id
              ? (urlForImage(image)
                  ?.width(640)
                  .height(800)
                  // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
                  .fit('crop')
                  .auto('format')
                  .url() as string)
              : undefined;
            const title = getLocalized(
              locale,
              service.heroHeadingTh,
              service.heroHeadingEn,
              service.name || ''
            );
            const description = getLocalized(
              locale,
              service.heroDescriptionTh,
              service.heroDescriptionEn
            );

            return (
              <Link
                key={service._id || service.slug || title}
                href={buildLocalizedPath(locale, `/services/${service.slug}`)}
                className="group block overflow-hidden rounded-[1.45rem] border border-white/55 bg-white/58 p-3 shadow-[0_18px_46px_rgba(82,56,34,0.07)] backdrop-blur-[10px] transition-all duration-500 hover:-translate-y-[4px] hover:bg-white/70 hover:shadow-[0_26px_62px_rgba(82,56,34,0.12)]"
              >
                <div className="overflow-hidden rounded-[1rem] bg-[linear-gradient(135deg,#f5ecdf,#dfc197)]">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={image?.alt || title}
                      width={640}
                      height={800}
                      className="aspect-[4/5] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="aspect-[4/5] bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.72),transparent_35%),linear-gradient(135deg,#f6ede1,#d8ba8c)]" />
                  )}
                </div>
                <div className="px-3 pb-5 pt-5 text-center">
                  <h3 className="text-lg font-semibold leading-snug text-[var(--marketing-brand)]">
                    {title}
                  </h3>
                  {description ? (
                    <p className="mt-3 line-clamp-2 text-sm leading-7 text-[var(--marketing-copy)]">
                      {description}
                    </p>
                  ) : null}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TechnologySection({
  homePage,
  locale,
}: {
  homePage?: HomePageContentProps['homePage'];
  locale: 'th' | 'en';
}) {
  const backgroundUrl = homePage?.technologyBackgroundImage?.asset?._id
    ? (urlForImage(homePage.technologyBackgroundImage)
        ?.width(2400)
        // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() to preserve the full image.
        .fit('max')
        .auto('format')
        .url() as string)
    : undefined;
  const label = getLocalized(
    locale,
    homePage?.technologyLabelTh,
    homePage?.technologyLabelEn,
    'OUR TECHNOLOGY'
  );
  const heading = getLocalized(
    locale,
    homePage?.technologyHeadingTh,
    homePage?.technologyHeadingEn,
    locale === 'en'
      ? 'Modern technology for elevated results'
      : 'เทคโนโลยีที่ทันสมัย\nเพื่อผลลัพธ์ที่เหนือกว่า'
  );
  const text = getLocalized(
    locale,
    homePage?.technologyTextTh,
    homePage?.technologyTextEn
  );
  const items = (homePage?.technologyItems || [])
    .map((item) => ({
      key: item?._key || item?.textTh || item?.textEn || '',
      text: getLocalized(locale, item?.textTh, item?.textEn),
    }))
    .filter((item) => item.text);
  const buttonText = getLocalized(
    locale,
    homePage?.technologyButtonTextTh,
    homePage?.technologyButtonTextEn,
    locale === 'en' ? 'View Our Technology' : 'ดูเทคโนโลยีของเรา'
  );
  const rawButtonHref = getLinkByLinkObject(
    homePage?.technologyButtonLink as never
  );
  const buttonHref = rawButtonHref
    ? localizeHref(rawButtonHref, locale)
    : buildLocalizedPath(locale, '/services/technology-devices');

  return (
    <section className="relative min-h-[560px] overflow-hidden border-b border-[var(--marketing-border)] bg-[linear-gradient(100deg,#fffaf2_0%,#f4e6cf_48%,#fbf6ee_100%)] lg:aspect-[12/7]">
      {backgroundUrl ? (
        <Image
          src={backgroundUrl}
          alt={
            homePage?.technologyBackgroundImage?.alt ||
            'Drema Clinic technology background'
          }
          width={2400}
          height={1000}
          className="absolute inset-0 hidden h-full w-full object-cover object-center lg:block"
        />
      ) : null}

      <div className="relative mx-auto grid h-full max-w-7xl grid-cols-1 items-center px-6 py-20 md:px-10 lg:grid-cols-[0.42fr_0.58fr] lg:py-0">
        <div className="max-w-lg">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--marketing-muted)]">
            {label}
          </p>
          <h2 className="mt-5 whitespace-pre-line font-serif text-4xl leading-tight text-[var(--marketing-ink)] md:text-5xl">
            {heading}
          </h2>
          {text ? (
            <p className="mt-5 text-base leading-8 text-[var(--marketing-copy)] md:text-lg">
              {text}
            </p>
          ) : null}
          {items.length > 0 ? (
            <div className="mt-8 space-y-3">
              {items.map((item) => (
                <div key={item.key} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-1 h-5 w-5 shrink-0 text-[var(--marketing-brand)]"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-6 text-[var(--marketing-copy)]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
          <Link
            href={buttonHref}
            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[var(--marketing-cta-primary-bg)] px-7 py-3.5 text-sm font-semibold text-[var(--marketing-cta-primary-text)] shadow-[0_16px_34px_rgba(139,107,74,0.22)] transition-all duration-500 hover:-translate-y-[2px] hover:bg-[var(--marketing-cta-primary-bg-hover)]"
          >
            {buttonText}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function renderHomeSectionElement({
  SectionComponent,
  sectionProps,
  sectionType,
  locale,
  settingsSocialLinks,
}: {
  SectionComponent: ElementType;
  sectionProps: Record<string, unknown>;
  sectionType: string;
  locale: 'th' | 'en';
  settingsSocialLinks: HomePageContentProps['settingsSocialLinks'];
}) {
  if (
    sectionType === 'hero' ||
    sectionType === 'cardGrid' ||
    sectionType === 'aboutDoctor'
  ) {
    return <SectionComponent section={sectionProps} locale={locale} />;
  }

  if (sectionType === 'contact') {
    return (
      <SectionComponent
        section={sectionProps}
        settingsSocialLinks={settingsSocialLinks}
      />
    );
  }

  return <SectionComponent section={sectionProps} />;
}

export default function HomePageContent({
  documentId,
  documentType,
  locale,
  sections: initialSections = [],
  homePage,
  settingsSocialLinks = [],
  globalCta,
}: HomePageContentProps) {
  const sections = useOptimistic<SectionsType, PageData>(
    initialSections ?? [],
    (currentSections, action) => {
      if (action.id !== documentId || !action?.document?.pageSections) {
        return currentSections;
      }

      return action.document.pageSections.map(
        (section) =>
          currentSections?.find(
            (currentSection) => currentSection._key === section?._key
          ) || section
      );
    }
  );

  if (!sections?.length) return null;

  const orderedSections = [...sections].sort((a, b) => {
    const aPriority = ORDER_PRIORITY[a._type] ?? 999;
    const bPriority = ORDER_PRIORITY[b._type] ?? 999;
    return aPriority - bPriority;
  });

  return (
    <div
      data-sanity={dataAttr({
        id: documentId,
        type: documentType,
        path: 'pageSections',
      })}
    >
      {orderedSections.map((section, index) => {
        const { _key, _type, ...sectionProps } = section;
        const SectionComponent = SECTION_COMPONENTS[_type];

        if (!SectionComponent) return null;

        const sectionId = buildSectionId(section, index);
        const sectionElement = renderHomeSectionElement({
          SectionComponent,
          sectionProps,
          sectionType: _type,
          locale,
          settingsSocialLinks,
        });

        return (
          <div
            key={_key}
            id={sectionId}
            data-sanity={dataAttr({
              id: documentId,
              type: documentType,
              path: `pageSections[_key=="${_key}"]`,
            })}
          >
            {_type === 'hero' ? (
              <>
                {sectionElement}
                <PhilosophySection homePage={homePage} locale={locale} />
                <TreatmentsSection homePage={homePage} locale={locale} />
                <TechnologySection homePage={homePage} locale={locale} />
              </>
            ) : _type === 'faq' ? (
              <>
                <GlobalCtaSection
                  cta={globalCta}
                  locale={locale}
                  socialLinks={settingsSocialLinks}
                />
                <Reveal delay={staggerDelay(index, 0.04, 0.2)}>
                  {sectionElement}
                </Reveal>
              </>
            ) : (
              <Reveal delay={staggerDelay(index, 0.04, 0.2)}>
                {sectionElement}
              </Reveal>
            )}
          </div>
        );
      })}
    </div>
  );
}
