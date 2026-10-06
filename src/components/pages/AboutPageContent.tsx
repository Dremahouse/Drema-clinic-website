import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import {
  Breadcrumbs,
  getBreadcrumbLabel,
  homeBreadcrumb,
} from '@/components/shared/Breadcrumbs';
import GlobalCtaSection, {
  type GlobalCtaData,
  type GlobalSocialLink,
} from '@/components/shared/GlobalCtaSection';
import ResponsiveHeroImage from '@/components/shared/ResponsiveHeroImage';
import { getLinkByLinkObject, getLocalizedDocumentLink } from '@/lib/links';
import { buildLocalizedPath } from '@/lib/locale';

type BasicLink = {
  type?: 'internal' | 'external' | null;
  external?: string | null;
  href?: string | null;
  internal?: { _type?: string | null; slug?: string | null } | null;
} | null;

type PersonCard = {
  _id?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  firstNameEn?: string | null;
  lastNameEn?: string | null;
  role?: string | null;
  roleEn?: string | null;
  heroIntroTh?: string | null;
  heroIntroEn?: string | null;
  citationSummaryTh?: string | null;
  citationSummaryEn?: string | null;
  keyHighlightsTh?: string[] | null;
  keyHighlightsEn?: string[] | null;
  heroCredentialCards?: Array<{
    _key?: string | null;
    titleTh?: string | null;
    titleEn?: string | null;
    descriptionTh?: string | null;
    descriptionEn?: string | null;
  }> | null;
  certifications?: Array<{
    _key?: string | null;
    titleTh?: string | null;
    titleEn?: string | null;
    issuerTh?: string | null;
    issuerEn?: string | null;
    year?: string | null;
  }> | null;
  slug?: string | null;
  image?: {
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
} | null;

type AboutPageData = {
  heroEyebrowTh?: string | null;
  heroEyebrowEn?: string | null;
  heroHeadingTh?: string | null;
  heroHeadingEn?: string | null;
  heroDescriptionTh?: string | null;
  heroDescriptionEn?: string | null;
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
  heroPrimaryTextTh?: string | null;
  heroPrimaryTextEn?: string | null;
  heroPrimaryLink?: BasicLink;
  heroSecondaryTextTh?: string | null;
  heroSecondaryTextEn?: string | null;
  heroSecondaryLink?: BasicLink;
  summaryLabelTh?: string | null;
  summaryLabelEn?: string | null;
  summaryHeadingTh?: string | null;
  summaryHeadingEn?: string | null;
  summaryTh?: string | null;
  summaryEn?: string | null;
  doctorSectionLabelTh?: string | null;
  doctorSectionLabelEn?: string | null;
  doctorSectionHeadingTh?: string | null;
  doctorSectionHeadingEn?: string | null;
  doctorSectionIntroTh?: string | null;
  doctorSectionIntroEn?: string | null;
  featuredDoctor?: PersonCard;
  doctors?: PersonCard[] | null;
  trustSectionLabelTh?: string | null;
  trustSectionLabelEn?: string | null;
  trustSectionHeadingTh?: string | null;
  trustSectionHeadingEn?: string | null;
  trustSectionIntroTh?: string | null;
  trustSectionIntroEn?: string | null;
  trustPoints?: Array<{
    _key?: string | null;
    titleTh?: string | null;
    titleEn?: string | null;
    descriptionTh?: string | null;
    descriptionEn?: string | null;
  }> | null;
  faqHeadingTh?: string | null;
  faqHeadingEn?: string | null;
  faqIntroTh?: string | null;
  faqIntroEn?: string | null;
  faqItems?: Array<{
    _key?: string | null;
    questionTh?: string | null;
    questionEn?: string | null;
    answerTh?: string | null;
    answerEn?: string | null;
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
  citationSummaryLabelTh?: string | null;
  citationSummaryLabelEn?: string | null;
  citationSummaryTh?: string | null;
  citationSummaryEn?: string | null;
};

const localizeHref = (href: string, locale: 'th' | 'en') => {
  if (!href || href === '#' || href.startsWith('http')) return href || '#';
  if (href.startsWith('/th') || href.startsWith('/en')) return href;
  return buildLocalizedPath(locale, href);
};

const toHref = (link: BasicLink, locale: 'th' | 'en') =>
  localizeHref(getLinkByLinkObject(link as never) || '#', locale);

const getLocalized = (
  locale: 'th' | 'en',
  th?: string | null,
  en?: string | null
) => (locale === 'en' ? en || th || '' : th || en || '');

const getDoctorSummary = (doctor: PersonCard, locale: 'th' | 'en') =>
  getLocalized(
    locale,
    doctor?.citationSummaryTh || doctor?.heroIntroTh,
    doctor?.citationSummaryEn || doctor?.heroIntroEn
  );

const getDoctorHighlights = (doctor: PersonCard, locale: 'th' | 'en') => {
  const isEn = locale === 'en';
  const directHighlights =
    (isEn
      ? doctor?.keyHighlightsEn || doctor?.keyHighlightsTh
      : doctor?.keyHighlightsTh || doctor?.keyHighlightsEn) || [];

  if (directHighlights.length > 0) return directHighlights;

  const credentialHighlights = (doctor?.heroCredentialCards || [])
    .map((item) => getLocalized(locale, item?.titleTh, item?.titleEn))
    .filter(Boolean);

  if (credentialHighlights.length > 0) return credentialHighlights;

  return (doctor?.certifications || [])
    .map((item) => getLocalized(locale, item?.titleTh, item?.titleEn))
    .filter(Boolean);
};

const getDoctorName = (doctor: PersonCard, locale: 'th' | 'en') =>
  `${getLocalized(locale, doctor?.firstName, doctor?.firstNameEn)} ${getLocalized(
    locale,
    doctor?.lastName,
    doctor?.lastNameEn
  )}`.trim();

const premiumGradientBorder =
  'linear-gradient(135deg, #8c6a2e 0%, #c8a96a 42%, #f4e7cc 72%, #fffaf0 100%)';

const premiumPanelBorderStyle = {
  border: '1px solid transparent',
  backgroundImage: `linear-gradient(var(--marketing-surface-1), var(--marketing-surface-1)), ${premiumGradientBorder}`,
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
} as const;

function SummaryStat({
  icon: Icon,
  value,
  label,
  description,
}: {
  icon: typeof Stethoscope;
  value: string | number;
  label: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center px-4 text-center">
      <Icon
        className="mb-5 size-9 text-[var(--marketing-brand)]"
        strokeWidth={1.35}
      />
      <p className="font-serif text-5xl leading-none text-[var(--marketing-brand)] md:text-6xl">
        {value}
      </p>
      <p className="mt-4 text-sm font-medium text-[var(--marketing-ink)]">
        {label}
      </p>
      <p className="mt-1 text-xs leading-5 text-[var(--marketing-muted)]">
        {description}
      </p>
    </div>
  );
}

function TeamDoctorCard({
  doctor,
  locale,
}: {
  doctor: PersonCard;
  locale: 'th' | 'en';
}) {
  const isEn = locale === 'en';
  const name = getDoctorName(doctor, locale);
  const role = getLocalized(locale, doctor?.role, doctor?.roleEn);
  const highlights = getDoctorHighlights(doctor, locale);
  const href = doctor?.slug?.trim()
    ? getLocalizedDocumentLink(
        { _type: 'person', slug: doctor.slug.trim() },
        locale
      )
    : buildLocalizedPath(locale, '/blog');
  const primaryHighlight = highlights[0] || role;

  return (
    <article className="grid min-h-[230px] grid-cols-[0.92fr_1fr] overflow-hidden rounded-lg border border-[var(--marketing-border)] bg-[var(--marketing-surface-2)] shadow-[var(--marketing-card-shadow)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--marketing-card-shadow-hover)]">
      <div className="relative min-h-[230px] overflow-hidden bg-[var(--marketing-surface-3)]">
        <ResponsiveHeroImage
          desktopImage={doctor?.heroImageDesktop || null}
          mobileImage={doctor?.heroImageMobile || null}
          fallbackImage={doctor?.image || null}
          alt={
            doctor?.heroImageMobile?.alt ||
            doctor?.heroImageDesktop?.alt ||
            doctor?.image?.alt ||
            name ||
            'Doctor profile'
          }
          desktopTransform={{
            width: 1200,
            height: 1500,
            fit: 'crop',
          }}
          mobileTransform={{
            width: 1200,
            height: 1500,
            fit: 'crop',
          }}
          className="absolute inset-0 h-full w-full object-cover"
          placeholder={isEn ? 'Upload doctor image' : 'อัปโหลดรูปแพทย์'}
        />
      </div>
      <div className="flex min-w-0 flex-col justify-center p-5">
        <div>
          <h3 className="text-lg font-semibold leading-snug text-[var(--marketing-ink)]">
            {name}
          </h3>
          {role ? (
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-[var(--marketing-brand-deep)]">
              {role}
            </p>
          ) : null}
        </div>

        {primaryHighlight ? (
          <p className="mt-4 line-clamp-2 text-xs leading-5 text-[var(--marketing-copy)]">
            {primaryHighlight}
          </p>
        ) : null}

        <Link
          href={href}
          aria-label={`${isEn ? 'View doctor profile' : 'ดูประวัติแพทย์'} ${name}`}
          className="mt-5 flex size-8 items-center justify-center rounded-full border border-[var(--marketing-border-strong)] text-[var(--marketing-brand-deep)] transition-all duration-300 hover:bg-[var(--marketing-brand)] hover:text-white"
        >
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}

function FeaturedDoctorPanel({
  doctor,
  locale,
}: {
  doctor: PersonCard;
  locale: 'th' | 'en';
}) {
  const isEn = locale === 'en';
  const name = getDoctorName(doctor, locale);
  const role = getLocalized(locale, doctor?.role, doctor?.roleEn);
  const summary = getDoctorSummary(doctor, locale);
  const highlights = getDoctorHighlights(doctor, locale).slice(0, 3);
  const href = doctor?.slug?.trim()
    ? getLocalizedDocumentLink(
        { _type: 'person', slug: doctor.slug.trim() },
        locale
      )
    : buildLocalizedPath(locale, '/blog');

  return (
    <article
      className="grid overflow-hidden rounded-[28px] shadow-[0_18px_40px_rgba(31,23,10,0.08)] md:grid-cols-[0.92fr_1fr]"
      style={premiumPanelBorderStyle}
    >
      <div className="relative min-h-[420px] overflow-hidden bg-[var(--marketing-surface-3)]">
        <ResponsiveHeroImage
          desktopImage={doctor?.heroImageDesktop || null}
          mobileImage={doctor?.heroImageMobile || null}
          fallbackImage={doctor?.image || null}
          alt={
            doctor?.heroImageMobile?.alt ||
            doctor?.heroImageDesktop?.alt ||
            doctor?.image?.alt ||
            name ||
            'Doctor profile'
          }
          desktopTransform={{
            width: 1400,
            height: 1750,
            fit: 'crop',
          }}
          mobileTransform={{
            width: 1200,
            height: 1500,
            fit: 'crop',
          }}
          className="absolute inset-0 h-full w-full object-cover object-top"
          placeholder={isEn ? 'Upload doctor image' : 'อัปโหลดรูปแพทย์'}
        />
      </div>

      <div className="flex flex-col justify-center bg-[var(--marketing-surface-1)] p-8 md:p-10">
        {role ? (
          <p className="text-xs font-medium text-[var(--marketing-brand-deep)]">
            {role}
          </p>
        ) : null}
        <h3 className="mt-4 max-w-sm text-3xl font-semibold leading-tight text-[var(--marketing-brand-deep)] md:text-4xl">
          {name}
        </h3>
        <div className="mt-4 h-px w-16 bg-[var(--marketing-brand)]" />
        {summary ? (
          <p className="mt-5 max-w-md text-sm leading-7 text-[var(--marketing-copy)]">
            {summary}
          </p>
        ) : null}

        <div className="relative mt-6 pl-5 md:pl-6">
          <span
            className="absolute inset-y-0 left-0 w-[2px] rounded-full"
            style={{ backgroundImage: premiumGradientBorder }}
          />
          {highlights.length > 0 ? (
            <div className="space-y-3">
              {highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-center gap-3 text-sm text-[var(--marketing-copy)]"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-[var(--marketing-border-strong)] text-[var(--marketing-brand-deep)]">
                    +
                  </span>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <Link
          href={href}
          className="mt-7 inline-flex w-fit items-center gap-3 rounded-full border border-[var(--marketing-border-strong)] bg-white/70 px-6 py-3 text-sm font-medium text-[var(--marketing-brand-deep)] transition-all duration-500 hover:-translate-y-[2px] hover:bg-white"
        >
          {isEn ? 'View doctor profile' : 'ดูประวัติแพทย์'}
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: about page composes CMS-driven hero, team, trust, FAQ, and CTA sections in one route-level component.
export default function AboutPageContent({
  page,
  locale,
  globalCta,
  socialLinks = [],
}: {
  page: AboutPageData;
  locale: 'th' | 'en';
  globalCta?: GlobalCtaData;
  socialLinks?: GlobalSocialLink[];
}) {
  const isEn = locale === 'en';
  const heroPrimaryHref = page.heroPrimaryLink
    ? toHref(page.heroPrimaryLink, locale)
    : buildLocalizedPath(locale, '/contact');
  const heroSecondaryHref = page.heroSecondaryLink
    ? toHref(page.heroSecondaryLink, locale)
    : buildLocalizedPath(locale, '/blog');
  const doctor = page.featuredDoctor || null;
  const doctors =
    page.doctors && page.doctors.length > 0
      ? page.doctors.filter(Boolean)
      : doctor
        ? [doctor]
        : [];
  const featuredDoctor = doctor || doctors[0] || null;
  const faqJsonLd =
    (page.faqItems || []).length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: (page.faqItems || [])
            .filter(
              (item) =>
                getLocalized(locale, item.questionTh, item.questionEn) &&
                getLocalized(locale, item.answerTh, item.answerEn)
            )
            .map((item) => ({
              '@type': 'Question',
              name: getLocalized(locale, item.questionTh, item.questionEn),
              acceptedAnswer: {
                '@type': 'Answer',
                text: getLocalized(locale, item.answerTh, item.answerEn),
              },
            })),
        }
      : null;

  return (
    <main className="pb-24">
      {faqJsonLd ? (
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      ) : null}

      <section className="relative overflow-hidden bg-[var(--marketing-surface-1)]">
        <div
          className="absolute inset-0"
          style={{
            maskImage:
              'linear-gradient(180deg,#000 0%,#000 70%,rgba(0,0,0,0.42) 88%,transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(180deg,#000 0%,#000 70%,rgba(0,0,0,0.42) 88%,transparent 100%)',
          }}
        >
          <ResponsiveHeroImage
            desktopImage={
              page.heroBackgroundDesktop || page.heroImageDesktop || null
            }
            mobileImage={
              page.heroBackgroundMobile || page.heroImageMobile || null
            }
            alt={
              page.heroBackgroundMobile?.alt ||
              page.heroBackgroundDesktop?.alt ||
              page.heroImageMobile?.alt ||
              page.heroImageDesktop?.alt ||
              (isEn ? 'About Drema Clinic hero' : 'ภาพหน้าเกี่ยวกับ Drema Clinic')
            }
            desktopTransform={{ width: 2400, height: 1400, fit: 'crop' }}
            mobileTransform={{ width: 1440, height: 1800, fit: 'crop' }}
            className="absolute inset-0 h-full w-full object-cover object-center"
            placeholder={
              isEn ? 'Upload about hero image' : 'อัปโหลดภาพ Hero ของ About'
            }
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(212,170,103,0.08),rgba(251,247,238,0)_22%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,170,103,0.18),transparent_34%)]" />
        <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,rgba(251,247,238,0.9)_0%,rgba(251,247,238,0.82)_26%,rgba(251,247,238,0.58)_48%,rgba(251,247,238,0.25)_68%,rgba(251,247,238,0)_100%)] lg:w-[66%]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[rgba(251,247,238,0.72)] to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <div className="max-w-3xl space-y-6">
            <Breadcrumbs
              items={[
                homeBreadcrumb(locale),
                { label: getBreadcrumbLabel(locale, 'about') },
              ]}
              locale={locale}
            />
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--marketing-muted)]">
              {getLocalized(locale, page.heroEyebrowTh, page.heroEyebrowEn)}
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-[var(--marketing-ink)] md:text-6xl">
              {getLocalized(locale, page.heroHeadingTh, page.heroHeadingEn)}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-[var(--marketing-copy)] md:text-lg">
              {getLocalized(
                locale,
                page.heroDescriptionTh,
                page.heroDescriptionEn
              )}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={heroPrimaryHref}
                className="rounded-xl bg-[var(--marketing-cta-primary-bg)] px-6 py-3 text-sm font-medium text-[var(--marketing-cta-primary-text)] transition-all duration-500 ease-out hover:-translate-y-[2px] hover:bg-[var(--marketing-cta-primary-bg-hover)]"
              >
                {getLocalized(
                  locale,
                  page.heroPrimaryTextTh,
                  page.heroPrimaryTextEn
                )}
              </Link>
              <Link
                href={heroSecondaryHref}
                className="rounded-xl border border-[var(--marketing-cta-secondary-border)] bg-[color:rgba(255,255,255,0.8)] px-6 py-3 text-sm font-medium text-[var(--marketing-cta-secondary-text)] transition-all duration-500 ease-out hover:-translate-y-[2px]"
              >
                {getLocalized(
                  locale,
                  page.heroSecondaryTextTh,
                  page.heroSecondaryTextEn
                )}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-[var(--marketing-border)] bg-[linear-gradient(135deg,#fffdf8_0%,#fbf5eb_44%,#f4eadb_100%)] py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.92),transparent_32%),radial-gradient(circle_at_78%_18%,rgba(212,170,103,0.13),transparent_30%),radial-gradient(ellipse_at_50%_110%,rgba(178,130,73,0.18),transparent_58%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),transparent)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(12deg,transparent_0%,rgba(218,185,126,0.28)_48%,transparent_52%)]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.38))]" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-5">
            <div>
              <p className="text-xs tracking-[0.18em] text-[var(--marketing-brand)]">
                {getLocalized(locale, page.summaryLabelTh, page.summaryLabelEn)}
              </p>
              <div className="mt-4 h-px w-16 bg-[var(--marketing-brand)]" />
            </div>
            <h2 className="max-w-2xl text-4xl font-semibold leading-tight text-[var(--marketing-ink)] md:text-6xl">
              {getLocalized(
                locale,
                page.summaryHeadingTh,
                page.summaryHeadingEn
              )}
            </h2>
            <div className="h-px w-20 bg-[var(--marketing-brand)]" />
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--marketing-brand)]">
              {isEn
                ? 'Beauty • Safety • Personalized'
                : 'Beauty • Safety • Personalized'}
            </p>
          </div>

          <div className="space-y-8 lg:pt-[66px]">
            <p className="max-w-3xl text-base leading-8 text-[var(--marketing-copy)] md:text-lg">
              {getLocalized(locale, page.summaryTh, page.summaryEn)}
            </p>

            <div>
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-[linear-gradient(90deg,transparent,var(--marketing-brand))]" />
                <Sparkles
                  className="size-6 text-[var(--marketing-brand)]"
                  strokeWidth={1.3}
                />
                <div className="h-px flex-1 bg-[linear-gradient(90deg,var(--marketing-brand),transparent)]" />
              </div>

              <div className="mt-8 grid grid-cols-1 divide-y divide-[var(--marketing-border-soft)] md:grid-cols-3 md:divide-x md:divide-y-0">
                <SummaryStat
                  icon={Stethoscope}
                  value={doctors.length || 1}
                  label={isEn ? 'Regular doctors' : 'แพทย์ประจำ'}
                  description={isEn ? 'Close ongoing care' : 'ดูแลอย่างใกล้ชิด'}
                />
                <SummaryStat
                  icon={Users}
                  value="1:1"
                  label={isEn ? 'Personalized planning' : 'วางแผนเฉพาะบุคคล'}
                  description={
                    isEn
                      ? 'Designed around your concerns'
                      : 'ออกแบบการรักษาให้เหมาะสม'
                  }
                />
                <SummaryStat
                  icon={ShieldCheck}
                  value="MD"
                  label={isEn ? 'Doctor assessment' : 'ประเมินโดยแพทย์'}
                  description={
                    isEn
                      ? 'Medical standard and safety'
                      : 'มาตรฐานและความปลอดภัย'
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {doctors.length > 0 ? (
        <section className="relative overflow-hidden bg-[var(--marketing-surface-1)] py-24">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,rgba(151,111,75,0.08),transparent)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-[radial-gradient(ellipse_at_left_bottom,rgba(151,111,75,0.12),transparent_58%)]" />

          <div className="relative mx-auto max-w-7xl px-6 md:px-10">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.78fr_1.35fr] lg:items-center">
              <div className="max-w-md">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--marketing-muted)]">
                  About our doctors
                </p>
                <h2 className="mt-5 text-4xl font-semibold leading-tight text-[var(--marketing-ink)] md:text-5xl">
                  {isEn
                    ? 'Doctors who guide your treatment'
                    : 'ทีมแพทย์ผู้ดูแลการรักษา'}
                </h2>
                <div className="mt-6 h-px w-16 bg-[var(--marketing-brand)]" />
                <p className="mt-7 text-base leading-8 text-[var(--marketing-copy)]">
                  {getLocalized(
                    locale,
                    page.doctorSectionIntroTh,
                    page.doctorSectionIntroEn
                  )}
                </p>
              </div>

              {featuredDoctor ? (
                <FeaturedDoctorPanel doctor={featuredDoctor} locale={locale} />
              ) : null}
            </div>

            <div className="mt-20 text-center">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--marketing-muted)]">
                Our doctors
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-[var(--marketing-ink)] md:text-4xl">
                {isEn ? 'Our Medical Team' : 'ทีมแพทย์ของเรา'}
              </h2>
              <div className="mx-auto mt-4 h-px w-14 bg-[var(--marketing-brand)]" />
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {doctors.map((teamDoctor) => (
                <TeamDoctorCard
                  key={teamDoctor?._id || teamDoctor?.slug}
                  doctor={teamDoctor}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {(page.trustPoints || []).length > 0 ? (
        <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--marketing-muted)]">
              {getLocalized(
                locale,
                page.trustSectionLabelTh,
                page.trustSectionLabelEn
              )}
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-[var(--marketing-ink)] md:text-4xl">
              {getLocalized(
                locale,
                page.trustSectionHeadingTh,
                page.trustSectionHeadingEn
              )}
            </h2>
            <p className="mt-4 text-base leading-8 text-[var(--marketing-copy)]">
              {getLocalized(
                locale,
                page.trustSectionIntroTh,
                page.trustSectionIntroEn
              )}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {(page.trustPoints || []).map((point) => (
              <article
                key={point?._key}
                className="rounded-[1.75rem] border border-[var(--marketing-border)] bg-[image:var(--marketing-gradient-soft)] p-6 shadow-[var(--marketing-card-shadow)]"
              >
                <h3 className="text-2xl font-semibold leading-tight text-[var(--marketing-ink)]">
                  {getLocalized(locale, point?.titleTh, point?.titleEn)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--marketing-copy)]">
                  {getLocalized(
                    locale,
                    point?.descriptionTh,
                    point?.descriptionEn
                  )}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {(page.faqItems || []).length > 0 ? (
        <section className="mx-auto max-w-7xl px-6 py-4 md:px-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.9fr_1.1fr]">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--marketing-muted)]">
                FAQ
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-[var(--marketing-ink)] md:text-4xl">
                {getLocalized(locale, page.faqHeadingTh, page.faqHeadingEn)}
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--marketing-copy)]">
                {getLocalized(locale, page.faqIntroTh, page.faqIntroEn)}
              </p>
            </div>
            <div className="space-y-4">
              {(page.faqItems || []).map((item) => (
                <details
                  key={item?._key}
                  className="group rounded-[1.5rem] border border-[var(--marketing-border)] bg-[var(--marketing-surface-1)] p-5 shadow-[var(--marketing-card-shadow)]"
                >
                  <summary className="cursor-pointer list-none pr-8 text-lg font-medium leading-8 text-[var(--marketing-table-ink)] marker:hidden">
                    {getLocalized(locale, item?.questionTh, item?.questionEn)}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-[var(--marketing-copy)]">
                    {getLocalized(locale, item?.answerTh, item?.answerEn)}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <GlobalCtaSection
        cta={globalCta}
        locale={locale}
        socialLinks={socialLinks}
      />

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24">
        <article className="rounded-[2rem] border border-[var(--marketing-border)] bg-[var(--marketing-surface-2)] p-8 shadow-[var(--marketing-card-shadow)]">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--marketing-muted)]">
            {getLocalized(
              locale,
              page.citationSummaryLabelTh,
              page.citationSummaryLabelEn
            )}
          </p>
          <p className="mt-4 text-sm leading-8 text-[var(--marketing-copy)] md:text-base">
            {getLocalized(
              locale,
              page.citationSummaryTh,
              page.citationSummaryEn
            )}
          </p>
        </article>
      </section>
    </main>
  );
}
