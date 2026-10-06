import {
  ArrowRight,
  Award,
  BadgeCheck,
  Briefcase,
  ClipboardList,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import {
  Breadcrumbs,
  getBreadcrumbLabel,
  homeBreadcrumb,
} from '@/components/shared/Breadcrumbs';
import ResponsiveHeroImage from '@/components/shared/ResponsiveHeroImage';
import { getLinkByLinkObject } from '@/lib/links';
import { buildLocalizedPath, type SiteLocale } from '@/lib/locale';
import { urlForImage } from '@/lib/sanity/client/utils';

const ICON_CARD_SET = [ShieldCheck, Users, ClipboardList, BadgeCheck] as const;
const PROFILE_SECTION_ICONS = [GraduationCap, Award, Briefcase] as const;

function localizeHref(href: string, locale: string): string {
  if (!href.startsWith('/')) {
    return href;
  }

  if (
    href === '/th' ||
    href === '/en' ||
    href.startsWith('/th/') ||
    href.startsWith('/en/')
  ) {
    return href;
  }

  return buildLocalizedPath(locale === 'en' ? 'en' : 'th', href);
}

function toHref(link: unknown, locale: string): string | undefined {
  if (!link || typeof link !== 'object') {
    return undefined;
  }

  const href = getLinkByLinkObject(link as never);
  if (!href) {
    return undefined;
  }

  return localizeHref(href, locale);
}

function getLocalePair(
  thValue: unknown,
  enValue: unknown,
  locale: string,
  fallback = ''
): string {
  const primary = locale === 'th' ? thValue : enValue;
  const secondary = locale === 'th' ? enValue : thValue;

  if (typeof primary === 'string' && primary.trim().length > 0) {
    return primary;
  }

  if (typeof secondary === 'string' && secondary.trim().length > 0) {
    return secondary;
  }

  return fallback;
}

function hasSanityImageAsset(value: unknown): boolean {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const asset =
    (value as { asset?: { _ref?: string; _id?: string } }).asset ?? null;

  return Boolean(asset?._ref || asset?._id);
}

type PersonLike = Record<string, unknown>;
type ImageLike = { asset?: { _ref?: string; _id?: string }; alt?: string };

interface PersonArchiveBylineProps {
  person: PersonLike;
  locale: string;
  lineEmporiumHref?: string;
}

export function PersonArchiveByline({
  person,
  locale,
  lineEmporiumHref,
}: PersonArchiveBylineProps) {
  const firstName = getLocalePair(
    person.firstName,
    person.firstNameEn,
    locale,
    ''
  );
  const lastName = getLocalePair(
    person.lastName,
    person.lastNameEn,
    locale,
    ''
  );
  const fullName = `${firstName} ${lastName}`.trim();
  const personSlug = typeof person.slug === 'string' ? person.slug : '';
  const isNachanokProfile = personSlug === 'dr-nachanok-tupkwa';

  const role = getLocalePair(
    person.role,
    person.roleEn,
    locale,
    locale === 'th'
      ? 'แพทย์ผู้เชี่ยวชาญด้านผิวหนังและเลเซอร์'
      : 'Dermatology and Laser Specialist'
  );

  const biographyText = getLocalePair(
    person.citationSummaryTh,
    person.citationSummaryEn,
    locale,
    locale === 'th'
      ? 'แพทย์ผู้เชี่ยวชาญด้านความงามและการประเมินแบบรายบุคคล โดยให้ความสำคัญกับความปลอดภัย มาตรฐานเครื่องมือ และผลลัพธ์ที่เหมาะกับแต่ละคนไข้'
      : 'A doctor-led profile focused on personalized aesthetic assessment, safety standards, and treatment planning tailored to each patient.'
  );

  const profileImage = person.image as ImageLike | undefined;
  const heroImageDesktop = person.heroImageDesktop as ImageLike | undefined;
  const heroImageMobile = person.heroImageMobile as ImageLike | undefined;
  const heroBackgroundDesktop = person.heroBackgroundDesktop as
    | ImageLike
    | undefined;
  const heroBackgroundMobile = person.heroBackgroundMobile as
    | ImageLike
    | undefined;

  const profileImageAlt =
    profileImage?.alt ??
    (locale === 'th'
      ? `${fullName} Drema Clinic`
      : `${fullName} at Drema Clinic`);

  const heroProfileLabel = getLocalePair(
    person.heroProfileLabelTh,
    person.heroProfileLabelEn,
    locale,
    'DOCTOR PROFILE'
  );
  const heroKicker = getLocalePair(
    person.heroKickerTh,
    person.heroKickerEn,
    locale,
    locale === 'th' ? 'แพทย์ผู้ดูแลการรักษา' : 'Treating doctor'
  );
  const heroIntro = getLocalePair(
    person.heroIntroTh,
    person.heroIntroEn,
    locale,
    biographyText
  );

  const primaryCtaLabel = getLocalePair(
    person.heroPrimaryCtaTextTh,
    person.heroPrimaryCtaTextEn,
    locale,
    locale === 'th' ? 'ปรึกษาแพทย์' : 'Consult a doctor'
  );
  const secondaryCtaLabel = getLocalePair(
    person.heroSecondaryCtaTextTh,
    person.heroSecondaryCtaTextEn,
    locale,
    locale === 'th' ? 'หรือสอบถามข้อมูลเพิ่มเติม' : 'Or ask for more details'
  );

  const siteLocale: SiteLocale = locale === 'en' ? 'en' : 'th';
  const primaryCtaHref =
    lineEmporiumHref ??
    toHref(person.heroPrimaryCtaLink, locale) ??
    buildLocalizedPath(siteLocale, '/contact');
  const secondaryCtaHref =
    toHref(person.heroSecondaryCtaLink, locale) ??
    buildLocalizedPath(siteLocale, '/blog');

  const heroInfoCards = Array.isArray(person.heroInfoCards)
    ? (person.heroInfoCards as Array<Record<string, unknown>>)
    : [];

  const fallbackInfoCards =
    locale === 'th'
      ? [
          {
            title: 'แพทย์ผู้เชี่ยวชาญด้านผิวหนังและเลเซอร์',
            body: 'ดูแลการประเมินและออกแบบแนวทางการรักษาให้เหมาะกับแต่ละบุคคล',
          },
          {
            title: 'ประสบการณ์ดูแลเคสความงามมากกว่า 20,000 เคส',
            body: 'มีประสบการณ์ดูแลเคสความงามหลากหลายรูปแบบอย่างต่อเนื่อง',
          },
          {
            title: 'แนวทางการรักษาเฉพาะบุคคลแบบ Case by Case',
            body: 'วางแผนตามปัญหาผิว รูปหน้า เป้าหมาย และงบประมาณของแต่ละคน',
          },
          {
            title: 'เน้นความปลอดภัยด้วยเครื่องมือและผลิตภัณฑ์มาตรฐาน',
            body: 'ให้ความสำคัญกับความเหมาะสม ความปลอดภัย และการติดตามผลหลังทำ',
          },
        ]
      : [
          {
            title: 'Dermatology and laser specialist',
            body: 'Focused on assessment and treatment direction tailored to each patient.',
          },
          {
            title: '20,000+ aesthetic cases treated',
            body: 'Extensive experience across a wide range of aesthetic concerns and treatment plans.',
          },
          {
            title: 'Case-by-case treatment planning',
            body: 'Treatment planning is built around concern, facial structure, goals, and budget.',
          },
          {
            title: 'Safety-first with certified medical standards',
            body: 'Prioritizes suitability, safety, and follow-up care after treatment.',
          },
        ];

  const resolvedInfoCards =
    heroInfoCards.length > 0
      ? heroInfoCards
          .map((item) => ({
            title: getLocalePair(item.titleTh, item.titleEn, locale),
            body: getLocalePair(item.descriptionTh, item.descriptionEn, locale),
          }))
          .filter((item) => item.title || item.body)
      : fallbackInfoCards;

  const certifications = Array.isArray(person.certifications)
    ? (person.certifications as Array<Record<string, unknown>>)
    : [];
  const professionalProfileSections = Array.isArray(
    person.professionalProfileSections
  )
    ? (person.professionalProfileSections as Array<Record<string, unknown>>)
        .map((item) => ({
          key:
            (typeof item._key === 'string' ? item._key : undefined) ??
            getLocalePair(item.titleTh, item.titleEn, locale),
          title: getLocalePair(item.titleTh, item.titleEn, locale),
          items:
            locale === 'th'
              ? Array.isArray(item.itemsTh) && item.itemsTh.length > 0
                ? item.itemsTh
                : item.itemsEn
              : Array.isArray(item.itemsEn) && item.itemsEn.length > 0
                ? item.itemsEn
                : item.itemsTh,
        }))
        .map((item) => ({
          ...item,
          items: Array.isArray(item.items)
            ? item.items.filter(
                (profileItem): profileItem is string =>
                  typeof profileItem === 'string' &&
                  profileItem.trim().length > 0
              )
            : [],
        }))
        .filter((item) => item.title || item.items.length > 0)
    : [];

  const hasHeroBackground =
    hasSanityImageAsset(heroBackgroundDesktop) ||
    hasSanityImageAsset(heroBackgroundMobile);
  const hasHeroFigure =
    hasSanityImageAsset(heroImageDesktop) ||
    hasSanityImageAsset(heroImageMobile) ||
    hasSanityImageAsset(profileImage);

  const blogHref = buildLocalizedPath(siteLocale, '/blog');
  const contactHref = buildLocalizedPath(siteLocale, '/contact');
  const consultDoctorHref = lineEmporiumHref || contactHref;

  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--marketing-border)] bg-[var(--marketing-surface-1)]">
        {hasHeroBackground ? (
          <div className="absolute inset-0">
            <ResponsiveHeroImage
              desktopImage={heroBackgroundDesktop}
              mobileImage={heroBackgroundMobile}
              desktopTransform={{ width: 2400, height: 1400, fit: 'crop' }}
              mobileTransform={{ width: 1440, height: 1800, fit: 'crop' }}
              alt={
                heroBackgroundDesktop?.alt ??
                heroBackgroundMobile?.alt ??
                profileImageAlt
              }
              className="h-full w-full object-cover object-center"
              placeholder={
                locale === 'th'
                  ? 'อัปโหลดภาพพื้นหลัง Hero ใน Studio'
                  : 'Upload a hero background image in Studio'
              }
            />
          </div>
        ) : null}

        {hasHeroFigure ? (
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 z-[2] hidden items-end justify-end lg:flex ${
              isNachanokProfile ? 'w-[44%] pr-0' : 'w-[44%] pr-8'
            }`}
          >
            <ResponsiveHeroImage
              desktopImage={heroImageDesktop}
              mobileImage={heroImageMobile}
              fallbackImage={profileImage}
              desktopTransform={{ width: 1600, height: 2000, fit: 'crop' }}
              mobileTransform={{ width: 1200, height: 1500, fit: 'crop' }}
              alt={profileImageAlt}
              className={`author-hero-figure h-full w-full object-contain opacity-100 ${
                isNachanokProfile
                  ? 'object-right-bottom'
                  : 'object-bottom-right'
              }`}
              placeholder={
                locale === 'th'
                  ? 'อัปโหลดภาพแพทย์ใน Studio'
                  : 'Upload a doctor image in Studio'
              }
            />
          </div>
        ) : null}

        <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(212,170,103,0.08),rgba(251,247,238,0)_22%)]" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top_right,rgba(212,170,103,0.18),transparent_34%)]" />
        <div className="absolute inset-y-0 left-0 z-[3] w-full bg-[linear-gradient(90deg,rgba(251,247,238,0.985)_0%,rgba(251,247,238,0.965)_18%,rgba(251,247,238,0.93)_34%,rgba(251,247,238,0.82)_48%,rgba(251,247,238,0.56)_60%,rgba(251,247,238,0.22)_72%,rgba(251,247,238,0)_100%)] md:w-[60%]" />
        <div className="absolute inset-x-0 bottom-0 z-[3] h-32 bg-gradient-to-t from-[rgba(251,247,238,0.9)] to-transparent" />

        <div className="relative z-[4] mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-14">
          <div className="max-w-3xl space-y-8">
            <Breadcrumbs
              items={[
                homeBreadcrumb(locale as 'th' | 'en'),
                {
                  label: getBreadcrumbLabel(locale as 'th' | 'en', 'author'),
                },
                { label: fullName },
              ]}
              locale={locale as 'th' | 'en'}
            />
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3">
                <span className="font-ui text-xs uppercase tracking-[0.34em] text-[var(--marketing-cta-primary)]">
                  {heroProfileLabel}
                </span>
                <span className="h-px w-14 bg-[var(--marketing-cta-primary)]/40" />
                <Sparkles className="h-3.5 w-3.5 text-[var(--marketing-cta-primary)]/70" />
              </div>

              <p className="font-ui text-sm tracking-[0.18em] text-[var(--marketing-text-muted)]">
                {heroKicker}
              </p>

              <div className="space-y-3">
                <h1 className="max-w-none font-heading text-5xl leading-[1.08] text-[var(--foreground)] md:text-7xl md:leading-[1.04]">
                  {fullName}
                </h1>
                {role ? (
                  <div className="space-y-4">
                    <p className="text-[1.12rem] font-medium text-[var(--marketing-cta-primary)] md:text-[1.45rem]">
                      {role}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="h-px w-12 bg-[var(--marketing-cta-primary)]/45" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--marketing-cta-primary)]/70" />
                      <span className="h-px w-24 bg-gradient-to-r from-[var(--marketing-cta-primary)]/30 to-transparent" />
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="h-px w-20 bg-[var(--marketing-cta-primary)]/40" />

              <p className="max-w-3xl text-base leading-8 text-[var(--marketing-text-muted)] md:text-[1.15rem] md:leading-9">
                {heroIntro}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {resolvedInfoCards.slice(0, 4).map((item, index) => {
                const Icon = ICON_CARD_SET[index % ICON_CARD_SET.length];

                return (
                  <div
                    key={`${item.title}-${index}`}
                    className="rounded-[28px] border border-[rgba(212,170,103,0.24)] bg-[rgba(255,252,247,0.92)] p-6 shadow-[0_18px_44px_rgba(113,83,41,0.08)] backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[rgba(245,235,219,0.92)] text-[var(--marketing-cta-primary)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="space-y-2">
                        <p className="text-lg font-semibold leading-7 text-[var(--foreground)]">
                          {item.title}
                        </p>
                        {item.body ? (
                          <p className="text-[0.98rem] leading-7 text-[var(--marketing-text-muted)]">
                            {item.body}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col items-start gap-4 md:flex-row md:flex-wrap md:items-center">
              <Link
                href={primaryCtaHref}
                className="inline-flex items-center gap-3 rounded-xl bg-[var(--marketing-cta-primary-bg)] px-6 py-3 text-sm font-medium text-[var(--marketing-cta-primary-text)] shadow-[var(--marketing-card-shadow)] transition-all duration-500 hover:-translate-y-[2px] hover:bg-[var(--marketing-cta-primary-bg-hover)]"
              >
                <span>{primaryCtaLabel}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={secondaryCtaHref}
                className="inline-flex items-center gap-2 text-sm text-[var(--marketing-text-muted)] transition hover:text-[var(--marketing-cta-primary)]"
              >
                <Sparkles className="h-4 w-4 text-[var(--marketing-cta-primary)]" />
                <span>{secondaryCtaLabel}</span>
              </Link>
            </div>

            {hasHeroFigure ? (
              <div className="lg:hidden">
                <div className="overflow-hidden rounded-[30px] border border-[rgba(212,170,103,0.22)] bg-[rgba(255,252,247,0.9)]">
                  <ResponsiveHeroImage
                    desktopImage={heroImageDesktop}
                    mobileImage={heroImageMobile}
                    fallbackImage={profileImage}
                    desktopTransform={{
                      width: 1600,
                      height: 2000,
                      fit: 'crop',
                    }}
                    mobileTransform={{ width: 1200, height: 1500, fit: 'crop' }}
                    alt={profileImageAlt}
                    className="h-auto w-full object-contain object-center"
                    placeholder={
                      locale === 'th'
                        ? 'อัปโหลดภาพแพทย์ใน Studio'
                        : 'Upload a doctor image in Studio'
                    }
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <section className="grid grid-cols-1 gap-8 md:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-[34px] border border-[var(--marketing-border)] bg-[var(--marketing-surface-1)] p-8 shadow-[0_20px_48px_rgba(113,83,41,0.08)] md:p-10">
            <div className="space-y-5">
              <span className="font-ui text-xs uppercase tracking-[0.3em] text-[var(--marketing-cta-primary)]">
                {locale === 'th' ? 'ประวัติแพทย์' : 'Doctor biography'}
              </span>
              <h2 className="font-heading text-4xl leading-tight text-[var(--foreground)]">
                {locale === 'th'
                  ? 'ประวัติและแนวทางการดูแลของแพทย์'
                  : 'Background and treatment philosophy'}
              </h2>
              <p className="text-base leading-8 text-[var(--marketing-text-muted)] md:text-lg md:leading-9">
                {biographyText}
              </p>
            </div>
          </article>

          <aside className="rounded-[34px] border border-[var(--marketing-border)] bg-[var(--marketing-surface-1)] p-8 shadow-[0_20px_48px_rgba(113,83,41,0.08)] md:p-10">
            <div className="flex h-full flex-col justify-between gap-6">
              <div className="space-y-4">
                <span className="font-ui text-xs uppercase tracking-[0.3em] text-[var(--marketing-cta-primary)]">
                  {locale === 'th' ? 'บทความโดยแพทย์' : 'Doctor articles'}
                </span>
                <h2 className="font-heading text-3xl leading-tight text-[var(--foreground)]">
                  {locale === 'th'
                    ? 'ติดตามบทความและคำแนะนำจากแพทย์'
                    : 'Read articles and guidance by this doctor'}
                </h2>
                <p className="text-base leading-8 text-[var(--marketing-text-muted)]">
                  {locale === 'th'
                    ? 'รวมบทความให้ความรู้ แนวทางการดูแล และคำอธิบายเชิงการแพทย์ที่เกี่ยวข้องกับการรักษา เพื่อช่วยให้เข้าใจแนวทางที่เหมาะกับปัญหาและเป้าหมายของแต่ละคนมากขึ้น'
                    : 'A curated archive of doctor-led articles, treatment guidance, and medical explanations related to common skin concerns and aesthetic planning.'}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={blogHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(166,125,78,0.3)] bg-[var(--marketing-surface-2)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--marketing-cta-primary)] hover:text-[var(--marketing-cta-primary)]"
                >
                  <span>
                    {locale === 'th'
                      ? 'ดูบทความของแพทย์'
                      : 'View doctor articles'}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={consultDoctorHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--marketing-cta-primary-bg)] px-6 py-3 text-sm font-medium text-[var(--marketing-cta-primary-text)] transition-all duration-500 hover:-translate-y-[2px] hover:bg-[var(--marketing-cta-primary-bg-hover)]"
                >
                  <span>
                    {locale === 'th' ? 'ปรึกษาแพทย์' : 'Consult a doctor'}
                  </span>
                </Link>
              </div>
            </div>
          </aside>
        </section>

        {professionalProfileSections.length > 0 ? (
          <section className="mt-8 rounded-[34px] border border-[var(--marketing-border)] bg-[linear-gradient(135deg,rgba(255,252,247,0.98),rgba(247,238,224,0.92))] p-8 shadow-[0_20px_48px_rgba(113,83,41,0.08)] md:p-10">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="space-y-3">
                <span className="font-ui text-xs uppercase tracking-[0.3em] text-[var(--marketing-cta-primary)]">
                  {locale === 'th'
                    ? 'คุณวุฒิและประสบการณ์'
                    : 'Credentials and Experience'}
                </span>
                <h2 className="font-heading text-3xl leading-tight text-[var(--foreground)] md:text-4xl">
                  {locale === 'th'
                    ? 'คุณวุฒิและประสบการณ์ทางวิชาชีพ'
                    : 'Professional background'}
                </h2>
              </div>
              <div className="hidden h-px w-40 bg-gradient-to-r from-[var(--marketing-cta-primary)]/50 to-transparent md:block" />
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {professionalProfileSections.map((section, index) => {
                const Icon =
                  PROFILE_SECTION_ICONS[index % PROFILE_SECTION_ICONS.length];

                return (
                  <article
                    key={section.key || `${section.title}-${index}`}
                    className="rounded-[26px] border border-[rgba(212,170,103,0.28)] bg-white/86 p-6 shadow-[0_16px_36px_rgba(113,83,41,0.07)]"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[rgba(212,170,103,0.38)] bg-[rgba(245,235,219,0.86)] text-[var(--marketing-cta-primary)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="font-heading text-2xl leading-tight text-[var(--foreground)]">
                        {section.title}
                      </h3>
                    </div>

                    {section.items.length > 0 ? (
                      <ul className="mt-5 list-outside list-disc space-y-1.5 pl-5 marker:text-[var(--marketing-cta-primary)]">
                        {section.items.map((item) => (
                          <li
                            key={item}
                            className="pl-1 text-sm leading-5 text-[var(--marketing-text-muted)]"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}

        {certifications.length > 0 ? (
          <section className="mt-8 rounded-[34px] border border-[var(--marketing-border)] bg-[var(--marketing-surface-1)] p-8 shadow-[0_20px_48px_rgba(113,83,41,0.08)] md:p-10">
            <div className="space-y-4">
              <span className="font-ui text-xs uppercase tracking-[0.3em] text-[var(--marketing-cta-primary)]">
                {locale === 'th'
                  ? 'คุณวุฒิและการรับรอง'
                  : 'Credentials and certifications'}
              </span>
              <h2 className="font-heading text-3xl leading-tight text-[var(--foreground)] md:text-4xl">
                {locale === 'th'
                  ? 'ใบรับรองและการอบรมที่เกี่ยวข้อง'
                  : 'Selected certifications and professional training'}
              </h2>
              <p className="max-w-3xl text-base leading-8 text-[var(--marketing-text-muted)]">
                {locale === 'th'
                  ? 'สรุปใบรับรองและการอบรมที่เกี่ยวข้องกับการดูแลและแนวทางการรักษาของแพทย์ท่านนี้'
                  : 'A concise overview of certifications and training relevant to this doctor profile.'}
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {certifications.map((item, index) => {
                const image = item.image as ImageLike | undefined;
                const title =
                  getLocalePair(item.titleTh, item.titleEn, locale) ||
                  `${locale === 'th' ? 'ใบรับรองวิชาชีพ' : 'Professional Certification'} ${index + 1}`;
                const issuer = getLocalePair(
                  item.issuerTh,
                  item.issuerEn,
                  locale
                );
                const year = item.year;

                return (
                  <article
                    key={
                      (typeof item._key === 'string' ? item._key : undefined) ??
                      `${title}-${index}`
                    }
                    className="overflow-hidden rounded-[26px] border border-[rgba(212,170,103,0.24)] bg-white shadow-[0_16px_36px_rgba(113,83,41,0.06)]"
                  >
                    <div className="bg-[var(--marketing-surface-2)]">
                      {image && hasSanityImageAsset(image) ? (
                        <img
                          src={urlForImage(image)
                            ?.width(1200)
                            .fit('max')
                            .auto('format')
                            .url()}
                          alt={image.alt ?? title}
                          className="h-auto w-full"
                        />
                      ) : (
                        <div className="flex min-h-[220px] items-center justify-center text-sm text-[var(--marketing-text-muted)]">
                          {locale === 'th'
                            ? 'อัปโหลดใบรับรองใน Studio'
                            : 'Upload a certification image in Studio'}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 p-5">
                      <h3 className="font-heading text-xl leading-snug text-[var(--foreground)]">
                        {title}
                      </h3>
                      {issuer || year ? (
                        <p className="text-sm text-[var(--marketing-text-muted)]">
                          {[issuer, year].filter(Boolean).join(' · ')}
                        </p>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}
