import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  Clock3,
  Gem,
  Grid2X2,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Syringe,
  UserRound,
  Waves,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { Image } from 'next-sanity/image';
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

type AestheticTreatmentsPageData = {
  name?: string | null;
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
  featuredTreatmentsHeadingTh?: string | null;
  featuredTreatmentsHeadingEn?: string | null;
  featuredTreatmentsBackgroundImage?: ImageLike;
  featuredTreatmentsItems?: Array<{
    _key?: string;
    titleTh?: string | null;
    titleEn?: string | null;
    summaryTh?: string | null;
    summaryEn?: string | null;
    imageTh?: ImageLike;
    imageEn?: ImageLike;
    link?: BasicLink;
  }> | null;
  whyChooseHeadingTh?: string | null;
  whyChooseHeadingEn?: string | null;
  whyChooseIntroTh?: string | null;
  whyChooseIntroEn?: string | null;
  whyChooseImage?: ImageLike;
  whyChooseBackgroundImage?: ImageLike;
  whyChoosePoints?: Array<{
    _key?: string;
    textTh?: string | null;
    textEn?: string | null;
  }> | null;
  byConcernHeadingTh?: string | null;
  byConcernHeadingEn?: string | null;
  byConcernIntroTh?: string | null;
  byConcernIntroEn?: string | null;
  byConcernBackgroundImage?: ImageLike;
  byConcernItems?: Array<{
    _key?: string;
    concernTh?: string | null;
    concernEn?: string | null;
    image?: ImageLike;
    treatmentsTh?: string[] | null;
    treatmentsEn?: string[] | null;
  }> | null;
  servicesHubProcessSteps?: Array<{
    _key?: string | null;
    textTh?: string | null;
    textEn?: string | null;
    imageTh?: ImageLike;
    imageEn?: ImageLike;
  }> | null;
  processBackgroundImage?: ImageLike;
  servicesHubComparisonRows?: Array<{
    _key?: string | null;
    service?: string | null;
    imageTh?: ImageLike;
    imageEn?: ImageLike;
    suitableForTh?: string | null;
    suitableForEn?: string | null;
    highlightTh?: string | null;
    highlightEn?: string | null;
    timelineTh?: string | null;
    timelineEn?: string | null;
  }> | null;
  comparisonBackgroundImage?: ImageLike;
  ctaHeadingTh?: string | null;
  ctaHeadingEn?: string | null;
  ctaTextTh?: string | null;
  ctaTextEn?: string | null;
  ctaBackgroundImage?: ImageLike;
  ctaPrimaryTextTh?: string | null;
  ctaPrimaryTextEn?: string | null;
  ctaPrimaryLink?: BasicLink;
  citationSummaryTh?: string | null;
  citationSummaryEn?: string | null;
};

type ProcessStep = {
  th: string;
  en: string;
  imageTh?: ImageLike;
  imageEn?: ImageLike;
};

type ComparisonRow = {
  service: string;
  imageTh?: ImageLike;
  imageEn?: ImageLike;
  suitableFor: { th: string; en: string };
  highlight: { th: string; en: string };
  timeline: { th: string; en: string };
};

const localizeHref = (href: string, locale: 'th' | 'en') => {
  if (!href || href === '#' || href.startsWith('http')) return href || '#';
  if (href.startsWith('/th') || href.startsWith('/en')) return href;
  return buildLocalizedPath(locale, href);
};

const toHref = (link: BasicLink, locale: 'th' | 'en') =>
  link ? localizeHref(getLinkByLinkObject(link as never) || '#', locale) : '#';

const WHY_POINT_ICONS = [
  UserRound,
  Grid2X2,
  Sparkles,
  Gem,
  CalendarCheck,
] as const;

const PROCESS_STEP_ICONS = [
  UserRound,
  Sparkles,
  Grid2X2,
  ShieldCheck,
  CalendarCheck,
] as const;

const PROCESS_STEPS: ProcessStep[] = [
  {
    th: 'ปรึกษาและประเมินโดยแพทย์',
    en: 'Consultation and doctor assessment',
  },
  {
    th: 'วิเคราะห์ปัญหาผิวหรือโครงสร้างใบหน้า',
    en: 'Skin or facial structure analysis',
  },
  {
    th: 'วางแผนการรักษาเฉพาะบุคคล',
    en: 'Personalized treatment planning',
  },
  {
    th: 'ทำหัตถการตามมาตรฐานคลินิก',
    en: 'Treatment performed under clinic standards',
  },
  {
    th: 'แนะนำการดูแลหลังทำและติดตามผล',
    en: 'Aftercare guidance and follow-up',
  },
];

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    service: 'Botox',
    suitableFor: {
      th: 'ริ้วรอยจากการแสดงสีหน้า กล้ามเนื้อกราม',
      en: 'Expression lines and masseter muscle concerns',
    },
    highlight: {
      th: 'ลดการทำงานของกล้ามเนื้อเฉพาะจุด ช่วยให้ริ้วรอยดูจางลง',
      en: 'Reduces selected muscle activity and softens visible lines',
    },
    timeline: { th: 'ประมาณ 3-14 วัน', en: 'About 3-14 days' },
  },
  {
    service: 'Filler',
    suitableFor: {
      th: 'ร่องลึก เติมเต็มใบหน้า ปรับสมดุลรูปหน้า',
      en: 'Deep folds, facial volume, and facial balance',
    },
    highlight: {
      th: 'เพิ่มวอลลุ่มและเติมเต็มจุดที่ยุบตัว ช่วยให้ใบหน้าดูอิ่มฟูขึ้น',
      en: 'Adds volume and fills areas with volume loss',
    },
    timeline: {
      th: 'เห็นผลทันทีหลังทำ',
      en: 'Visible immediately after treatment',
    },
  },
  {
    service: 'Ulthera Prime',
    suitableFor: {
      th: 'ความหย่อนคล้อย กรอบหน้าไม่ชัด',
      en: 'Skin laxity and less-defined jawline',
    },
    highlight: {
      th: 'ยกกระชับด้วยพลังงานอัลตราซาวด์ ลงลึกถึงชั้น SMAS',
      en: 'Deep-layer lifting with focused ultrasound energy',
    },
    timeline: { th: 'ประมาณ 1-3 เดือน', en: 'About 1-3 months' },
  },
  {
    service: 'Endolift',
    suitableFor: {
      th: 'เหนียง กรอบหน้า ความหย่อนคล้อยเฉพาะจุด',
      en: 'Double chin, jawline, and localized laxity',
    },
    highlight: {
      th: 'เลเซอร์ยกกระชับเฉพาะจุด ช่วยสลายไขมันและกระชับผิว',
      en: 'Targeted laser lifting for selected areas',
    },
    timeline: {
      th: 'ขึ้นอยู่กับการประเมิน',
      en: 'Depends on doctor assessment',
    },
  },
  {
    service: 'Sylfirm X',
    suitableFor: {
      th: 'หลุมสิว รูขุมขน ผิวไม่เรียบ รอยแดง',
      en: 'Acne scars, pores, uneven texture, and redness',
    },
    highlight: {
      th: 'RF Microneedling ฟื้นฟูคุณภาพผิว กระตุ้นคอลลาเจนและอีลาสติน',
      en: 'RF microneedling for skin quality and collagen support',
    },
    timeline: { th: 'มักทำเป็นคอร์ส', en: 'Often planned as a course' },
  },
  {
    service: 'Skin Booster',
    suitableFor: {
      th: 'ผิวแห้ง ผิวโทรม คุณภาพผิวลดลง',
      en: 'Dry, tired skin and reduced skin quality',
    },
    highlight: {
      th: 'เพิ่มความชุ่มชื้นและฟื้นฟูคุณภาพผิว ให้ผิวดูสุขภาพดีอย่างเป็นธรรมชาติ',
      en: 'Improves hydration and skin quality',
    },
    timeline: { th: 'ประมาณ 1-4 สัปดาห์', en: 'About 1-4 weeks' },
  },
];

const TREATMENT_CHIP_ICONS = [
  { match: 'botox', Icon: UserRound },
  { match: 'filler', Icon: Syringe },
  { match: 'ulthera', Icon: Waves },
  { match: 'endolift', Icon: Zap },
  { match: 'sylfirm', Icon: SunMedium },
  { match: 'pico', Icon: Sparkles },
  { match: 'laser', Icon: Sparkles },
  { match: 'skin booster', Icon: Sparkles },
  { match: 'thread', Icon: Grid2X2 },
] as const;

const getTreatmentChipIcon = (treatment: string) => {
  const normalized = treatment.toLowerCase();

  return (
    TREATMENT_CHIP_ICONS.find(({ match }) => normalized.includes(match))
      ?.Icon || Sparkles
  );
};

const timelineIconFor = (timeline: string) => {
  const normalized = timeline.toLowerCase();

  if (normalized.includes('ทันที') || normalized.includes('immediate')) {
    return Zap;
  }

  if (normalized.includes('ขึ้นอยู่') || normalized.includes('depend')) {
    return BarChart3;
  }

  return CalendarCheck;
};

const getSectionBackgroundUrl = (image?: ImageLike) =>
  image?.asset?._id || image?.asset?._ref
    ? (urlForImage(image)
        ?.width(2400)
        .height(1400)
        // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
        .fit('crop')
        .auto('format')
        .url() as string)
    : undefined;

const SectionBackgroundImage = ({ src, alt }: { src?: string; alt: string }) =>
  src ? (
    <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
  ) : null;

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Marketing page renders several CMS-driven sections in one component.
export default function AestheticTreatmentsPageContent({
  page,
  locale,
  globalCta,
  socialLinks = [],
  breadcrumbKey = 'aestheticTreatments',
}: {
  page: AestheticTreatmentsPageData;
  locale: 'th' | 'en';
  globalCta?: GlobalCtaData;
  socialLinks?: GlobalSocialLink[];
  breadcrumbKey?: 'aestheticTreatments' | 'services';
}) {
  const isEn = locale === 'en';
  const heroImageAlt =
    page.heroBackgroundMobile?.alt ||
    page.heroBackgroundDesktop?.alt ||
    page.heroImageMobile?.alt ||
    page.heroImageDesktop?.alt ||
    page.heroImage?.alt ||
    (isEn ? 'Aesthetic treatments' : 'บริการความงาม');

  const whyHeading =
    (isEn ? page.whyChooseHeadingEn : page.whyChooseHeadingTh) ||
    (isEn ? 'Why Choose Drema Clinic' : 'ทำไมควรเลือก Drema Clinic');
  const whyIntro =
    (isEn ? page.whyChooseIntroEn : page.whyChooseIntroTh) ||
    (isEn
      ? 'Drema Clinic prioritizes doctor-led assessment of facial structure and skin condition before treatment planning, so each procedure fits the concern, budget, and personal goal.'
      : 'Drema Clinic ให้ความสำคัญกับการประเมินใบหน้าและสภาพผิวโดยแพทย์ก่อนเริ่มการรักษา เพื่อเลือกหัตถการที่เหมาะกับปัญหา โครงสร้างใบหน้า งบประมาณ และเป้าหมายของแต่ละบุคคล');
  const whyImageUrl = page.whyChooseImage?.asset?._id
    ? (urlForImage(page.whyChooseImage)
        ?.width(1100)
        .height(760)
        // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
        .fit('crop')
        .auto('format')
        .url() as string)
    : undefined;
  const featuredTreatmentsBackgroundUrl = getSectionBackgroundUrl(
    page.featuredTreatmentsBackgroundImage
  );
  const whyChooseBackgroundUrl = getSectionBackgroundUrl(
    page.whyChooseBackgroundImage
  );
  const byConcernBackgroundUrl = getSectionBackgroundUrl(
    page.byConcernBackgroundImage
  );
  const ctaBackgroundUrl = getSectionBackgroundUrl(page.ctaBackgroundImage);
  const processBackgroundUrl = getSectionBackgroundUrl(
    page.processBackgroundImage
  );
  const comparisonBackgroundUrl = getSectionBackgroundUrl(
    page.comparisonBackgroundImage
  );
  const cmsByConcernHeading = isEn
    ? page.byConcernHeadingEn
    : page.byConcernHeadingTh;
  const byConcernHeading =
    !isEn && cmsByConcernHeading === 'เลือกบริการตามปัญหาผิว'
      ? 'เลือกบริการตามปัญหาที่ต้องการดูแล'
      : cmsByConcernHeading;
  const processSteps = page.servicesHubProcessSteps?.length
    ? page.servicesHubProcessSteps.map((step) => ({
        th: step.textTh || '',
        en: step.textEn || step.textTh || '',
        imageTh: step.imageTh || null,
        imageEn: step.imageEn || step.imageTh || null,
      }))
    : PROCESS_STEPS;
  const comparisonRows = page.servicesHubComparisonRows?.length
    ? page.servicesHubComparisonRows.map((row) => ({
        service: row.service || '',
        imageTh: row.imageTh || null,
        imageEn: row.imageEn || row.imageTh || null,
        suitableFor: {
          th: row.suitableForTh || '',
          en: row.suitableForEn || row.suitableForTh || '',
        },
        highlight: {
          th: row.highlightTh || '',
          en: row.highlightEn || row.highlightTh || '',
        },
        timeline: {
          th: row.timelineTh || '',
          en: row.timelineEn || row.timelineTh || '',
        },
      }))
    : COMPARISON_ROWS;

  return (
    <main className="pb-20">
      <MarketingPageHero
        breadcrumbs={{
          locale,
          items: [
            homeBreadcrumb(locale),
            { label: getBreadcrumbLabel(locale, breadcrumbKey) },
          ],
        }}
        eyebrow={isEn ? 'Aesthetic Treatments' : 'บริการของคลินิก'}
        heading={isEn ? page.heroHeadingEn : page.heroHeadingTh}
        description={isEn ? page.heroDescriptionEn : page.heroDescriptionTh}
        desktopImage={
          page.heroBackgroundDesktop || page.heroImageDesktop || null
        }
        mobileImage={page.heroBackgroundMobile || page.heroImageMobile || null}
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
              {isEn ? page.heroSecondaryCtaTextEn : page.heroSecondaryCtaTextTh}
            </Link>
          </>
        }
      />

      <section
        id="services-list"
        className="relative overflow-hidden bg-[radial-gradient(circle_at_86%_4%,rgba(218,185,137,0.18),transparent_28%),linear-gradient(180deg,#fffdf9_0%,#f8efe3_100%)] px-6 py-20 md:px-10 md:py-24"
      >
        {featuredTreatmentsBackgroundUrl ? (
          <SectionBackgroundImage
            src={featuredTreatmentsBackgroundUrl}
            alt={
              page.featuredTreatmentsBackgroundImage?.alt ||
              (isEn ? 'Featured treatments background' : 'ภาพพื้นหลังบริการแนะนำ')
            }
          />
        ) : (
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.95),transparent_28%),radial-gradient(circle_at_50%_112%,rgba(139,107,74,0.08),transparent_34%)]" />
        )}
        <div className="relative mx-auto max-w-[94rem]">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-5 flex items-center justify-center gap-5">
              <span className="h-px w-16 bg-[#d5ad72]" />
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b98a4f]">
                Our Services
              </p>
              <span className="h-px w-16 bg-[#d5ad72]" />
            </div>
            <h2 className="font-serif text-4xl font-semibold leading-tight text-[var(--marketing-ink)] md:text-6xl">
              {isEn
                ? page.featuredTreatmentsHeadingEn
                : page.featuredTreatmentsHeadingTh}
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[var(--marketing-copy)] md:text-lg">
              {isEn
                ? 'Doctor-led aesthetic services selected to match skin, facial structure, and individual goals.'
                : 'เราคัดสรรเทคโนโลยีและหัตถการที่ได้มาตรฐาน เพื่อตอบโจทย์ปัญหาผิวและรูปหน้าอย่างเหมาะสม'}
            </p>
            <div className="mx-auto mt-7 flex w-44 items-center justify-center gap-3">
              <span className="h-px flex-1 bg-[#d5ad72]" />
              <span className="h-2 w-2 rotate-45 bg-[#c89d62]" />
              <span className="h-px flex-1 bg-[#d5ad72]" />
            </div>
          </div>
          <div className="mt-11 grid grid-cols-1 gap-5 md:grid-flow-col md:grid-cols-none md:grid-rows-2 md:auto-cols-fr">
            {/* biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Featured service cards resolve localized CMS text, image fallback, and link state inline. */}
            {(page.featuredTreatmentsItems || []).map((item) => {
              const title = (isEn ? item?.titleEn : item?.titleTh) || '';
              const summary = (isEn ? item?.summaryEn : item?.summaryTh) || '';
              const image = isEn
                ? item?.imageEn || item?.imageTh
                : item?.imageTh;
              const imageUrl = image?.asset?._id
                ? (urlForImage(image)
                    ?.width(760)
                    .height(760)
                    // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
                    .fit('crop')
                    .auto('format')
                    .url() as string)
                : undefined;
              const Icon = getTreatmentChipIcon(title);

              return (
                <article
                  key={item?._key || title}
                  className="group grid min-h-[250px] overflow-hidden rounded-[0.75rem] border border-white/55 bg-white/58 shadow-[0_18px_46px_rgba(66,45,28,0.07)] backdrop-blur-[10px] transition-all duration-500 hover:-translate-y-1 hover:bg-white/70 hover:shadow-[0_26px_62px_rgba(66,45,28,0.12)] sm:grid-cols-[1.18fr_0.82fr]"
                >
                  <div className="flex min-w-0 flex-col p-6">
                    <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#e7d2b7] bg-[linear-gradient(180deg,#fffaf4,#f5eadb)] text-[#b98a4f]">
                      <Icon
                        className="h-6 w-6 stroke-[1.5]"
                        aria-hidden="true"
                      />
                    </span>
                    <h3 className="font-serif text-2xl font-semibold leading-tight text-[var(--marketing-ink)]">
                      {title}
                    </h3>
                    <span className="my-4 block h-px w-10 bg-[#b98a4f]" />
                    <p className="text-sm leading-7 text-[var(--marketing-copy)]">
                      {summary}
                    </p>
                    {item?.link ? (
                      <Link
                        href={toHref(item.link, locale)}
                        className="mt-auto inline-flex items-center gap-3 pt-5 text-sm font-semibold text-[#9a7446] transition-colors hover:text-[#6f4b27]"
                      >
                        {isEn ? 'Read more articles' : 'อ่านบทความเพิ่มเติม'}
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#b98a4f] text-white transition-transform duration-500 group-hover:translate-x-1">
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </span>
                      </Link>
                    ) : null}
                  </div>
                  <div className="relative aspect-square border-t border-white/45 bg-[linear-gradient(135deg,rgba(246,237,226,0.58),rgba(223,198,165,0.5))] sm:aspect-auto sm:min-h-[220px] sm:border-l sm:border-t-0">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={image?.alt || title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 42vw, 180px"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_45%_25%,rgba(255,255,255,0.78),transparent_32%),linear-gradient(135deg,#f8efe4,#d9bd98)] px-5 text-center text-xs font-medium leading-5 text-[#8b6b4a]">
                        {isEn
                          ? 'Upload service image in Studio'
                          : 'เพิ่มรูปบริการใน Studio'}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mx-auto mt-8 flex max-w-5xl items-center justify-center gap-3 rounded-full border border-[#ead8c0] bg-white/72 px-6 py-4 text-center text-sm font-medium leading-7 text-[#7a5a38] shadow-[0_14px_36px_rgba(70,47,28,0.08)] backdrop-blur">
            <ShieldCheck
              className="h-5 w-5 shrink-0 text-[#c89d62]"
              aria-hidden="true"
            />
            <span>
              {isEn
                ? 'Every service is assessed and planned by experienced doctors using standardized products and devices.'
                : 'ทุกบริการประเมินและวางแผนโดยแพทย์ผู้มีประสบการณ์ ใช้ผลิตภัณฑ์และเครื่องมือที่ได้มาตรฐานปลอดภัย'}
            </span>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_8%_0%,rgba(255,255,255,0.98),transparent_30%),linear-gradient(135deg,#fffaf3_0%,#f4e7d7_54%,#fffdf9_100%)] py-20 md:py-24">
        {whyChooseBackgroundUrl ? (
          <SectionBackgroundImage
            src={whyChooseBackgroundUrl}
            alt={
              page.whyChooseBackgroundImage?.alt ||
              (isEn ? 'Why choose background' : 'ภาพพื้นหลังทำไมควรเลือกเรา')
            }
          />
        ) : (
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 top-8 h-56 w-56 rounded-full border border-[#d6af78]/45" />
            <div className="absolute -right-32 bottom-[-7rem] h-72 w-72 rounded-full border border-[#d6af78]/45" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,#d1a666,transparent)]" />
          </div>
        )}
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:px-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div className="space-y-8">
            <div>
              <div className="mb-6 flex items-center gap-4">
                <span className="h-px w-12 bg-[#b98a4f]" />
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b98a4f]">
                  Why Choose Us
                </p>
              </div>
              <h2 className="font-serif text-4xl font-semibold leading-tight text-[var(--marketing-ink)] md:text-6xl">
                {whyHeading}
              </h2>
              <div className="mt-6 flex w-44 items-center gap-3">
                <span className="h-px flex-1 bg-[#c89d62]" />
                <span className="h-2 w-2 rotate-45 bg-[#c89d62]" />
                <span className="h-px flex-1 bg-[#c89d62]" />
              </div>
              <p className="mt-7 text-base leading-8 text-[var(--marketing-copy)] md:text-lg">
                {whyIntro}
              </p>
            </div>
            <div className="overflow-hidden rounded-[1.25rem] border border-[#e4cfb4] bg-white/72 shadow-[0_22px_60px_rgba(70,47,28,0.09)] backdrop-blur">
              <div className="relative aspect-[4/3] bg-[linear-gradient(135deg,#faf0e3,#dcc09d)]">
                {whyImageUrl ? (
                  <Image
                    src={whyImageUrl}
                    alt={page.whyChooseImage?.alt || whyHeading}
                    fill
                    sizes="(max-width: 1024px) 100vw, 36vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_42%_22%,rgba(255,255,255,0.9),transparent_32%),linear-gradient(135deg,#fbf1e6,#d9bd98)] px-8 text-center text-sm font-medium leading-6 text-[#8b6b4a]">
                    Upload why-choose section image in Studio
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 border-t border-[#ead8c0] bg-white/82 p-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#d5ad72,#9d7446)] text-white shadow-[0_12px_26px_rgba(139,107,74,0.24)]">
                  <ShieldCheck className="h-7 w-7" aria-hidden="true" />
                </span>
                <p className="text-sm font-medium leading-7 text-[var(--marketing-copy)]">
                  {isEn
                    ? 'Personalized treatment planning by experienced doctors.'
                    : 'วางแผนการรักษาเฉพาะบุคคล โดยแพทย์ผู้มีประสบการณ์'}
                </p>
              </div>
            </div>
          </div>
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-26">
            {(page.whyChoosePoints || []).map((point, index) => {
              const Icon = WHY_POINT_ICONS[index % WHY_POINT_ICONS.length];
              const text = isEn ? point?.textEn : point?.textTh;

              return (
                <li
                  key={point?._key || text}
                  className="group flex min-h-[154px] items-center gap-5 rounded-[1.25rem] border border-white/55 bg-white/58 p-5 shadow-[0_18px_46px_rgba(70,47,28,0.07)] backdrop-blur-[10px] transition-all duration-500 hover:-translate-y-1 hover:bg-white/70 hover:shadow-[0_26px_62px_rgba(70,47,28,0.12)]"
                >
                  <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-[#e7d2b7] bg-[linear-gradient(180deg,#fffaf4,#f5eadb)] text-[#b98a4f] transition-transform duration-500 group-hover:scale-105">
                    <Icon
                      className="h-10 w-10 stroke-[1.4]"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="h-16 w-px shrink-0 bg-[#ead8c0]" />
                  <span className="text-base font-semibold leading-8 text-[var(--marketing-ink)]">
                    {text}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#fffdf9_0%,#f7eddf_48%,#ead7bd_100%)] px-6 py-20 md:px-10 md:py-24">
        {byConcernBackgroundUrl ? (
          <Image
            src={byConcernBackgroundUrl}
            alt={
              page.byConcernBackgroundImage?.alt ||
              (isEn
                ? 'Treatment by concern background'
                : 'ภาพพื้นหลังเลือกบริการตามปัญหา')
            }
            fill
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="pointer-events-none absolute right-[-18vw] top-[-18rem] h-[36rem] w-[72vw] rotate-[-16deg] rounded-[100%] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.7),rgba(214,174,119,0.18)_52%,rgba(255,255,255,0.28))] shadow-[inset_0_1px_18px_rgba(255,255,255,0.55)]" />
        )}
        <div className="relative mx-auto max-w-[90rem]">
          <div className="max-w-5xl">
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-16 bg-[#d8b98e]" />
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--marketing-brand)]">
                Choose by concern
              </p>
              <span className="h-px w-16 bg-[#d8b98e]" />
            </div>
            <h2 className="font-serif text-4xl font-semibold leading-tight text-[var(--marketing-ink)] md:text-6xl">
              {byConcernHeading}
            </h2>
            <p className="mt-5 max-w-4xl text-base leading-8 text-[var(--marketing-copy)] md:text-lg">
              {isEn ? page.byConcernIntroEn : page.byConcernIntroTh}
            </p>
          </div>
          <div className="mt-11 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {(page.byConcernItems || []).map((item, index) => {
              const title = (isEn ? item?.concernEn : item?.concernTh) || '';
              const treatments =
                (isEn ? item?.treatmentsEn : item?.treatmentsTh) || [];
              const imageUrl = item?.image?.asset?._id
                ? (urlForImage(item.image)
                    ?.width(900)
                    .height(620)
                    // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
                    .fit('crop')
                    .auto('format')
                    .url() as string)
                : undefined;

              return (
                <article
                  key={item?._key || title}
                  className="group relative min-h-[302px] overflow-hidden rounded-[1.05rem] border border-white/80 bg-white/78 p-6 shadow-[0_20px_54px_rgba(66,45,28,0.12)] ring-1 ring-[rgba(255,255,255,0.72)] backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(66,45,28,0.16)]"
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={item?.image?.alt || title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover object-right-bottom opacity-95 transition-transform duration-700 group-hover:scale-[1.035]"
                    />
                  ) : (
                    <div className="absolute inset-y-0 right-0 w-[55%] bg-[radial-gradient(circle_at_72%_36%,rgba(255,255,255,0.9),transparent_32%),linear-gradient(135deg,#f8efe4,#d9bd98)]" />
                  )}
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.99)_0%,rgba(255,255,255,0.94)_30%,rgba(255,255,255,0)_66%,rgba(255,255,255,0)_100%)]" />
                  <div className="absolute inset-0 rounded-[1.05rem] border border-white/55" />
                  <div className="relative z-10 flex min-h-[254px] max-w-[68%] flex-col">
                    <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#f1e4d1] font-serif text-base font-semibold text-[#7d5c37] shadow-[0_8px_18px_rgba(66,45,28,0.08)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-2xl font-semibold leading-tight text-[var(--marketing-ink)] md:text-[1.7rem]">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--marketing-copy)]">
                      {isEn
                        ? 'View treatments commonly selected for this concern.'
                        : 'เลือกดูบริการที่มักใช้ดูแลปัญหานี้ โดยแพทย์เป็นผู้ประเมิน'}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-5">
                      {treatments.map((treatment) => {
                        const ChipIcon = getTreatmentChipIcon(treatment);

                        return (
                          <span
                            key={`${item?._key}-${treatment}`}
                            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#d8b98e]/70 bg-white/90 px-3.5 py-2 text-sm font-medium text-[#6a4b2e] shadow-[0_8px_22px_rgba(66,45,28,0.08)]"
                          >
                            <ChipIcon
                              className="h-4 w-4 text-[#b67635]"
                              aria-hidden="true"
                            />
                            {treatment}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="relative mt-8 overflow-hidden rounded-[1.05rem] border border-white/70 bg-white/78 shadow-[0_18px_54px_rgba(66,45,28,0.1)] backdrop-blur">
            {ctaBackgroundUrl ? (
              <SectionBackgroundImage
                src={ctaBackgroundUrl}
                alt={
                  page.ctaBackgroundImage?.alt ||
                  (isEn ? 'Consultation CTA background' : 'ภาพพื้นหลัง CTA')
                }
              />
            ) : null}
            <div className="relative grid gap-5 p-5 md:grid-cols-[auto_1fr_auto] md:items-center md:p-7">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d8b98e] bg-white text-[var(--marketing-brand)]">
                <CalendarCheck className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-[var(--marketing-ink)]">
                  {(isEn ? page.ctaHeadingEn : page.ctaHeadingTh) ||
                    page.ctaHeadingTh ||
                    page.ctaHeadingEn ||
                    (isEn
                      ? 'Not sure which service fits your concern?'
                      : 'ยังไม่แน่ใจว่าปัญหาของคุณเหมาะกับบริการไหน?')}
                </h3>
                <p className="mt-1 text-sm leading-7 text-[var(--marketing-copy)]">
                  {(isEn ? page.ctaTextEn : page.ctaTextTh) ||
                    page.ctaTextTh ||
                    page.ctaTextEn ||
                    (isEn
                      ? 'Book a doctor consultation for a personalized skin and facial assessment.'
                      : 'ปรึกษาแพทย์เพื่อประเมินผิวและวางแผนการรักษาเฉพาะบุคคล')}
                </p>
              </div>
              <Link
                href={toHref(page.ctaPrimaryLink || null, locale)}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#9a7446,#6f4b27)] px-7 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(111,75,39,0.25)] transition-all duration-500 hover:-translate-y-[2px]"
              >
                {(isEn ? page.ctaPrimaryTextEn : page.ctaPrimaryTextTh) ||
                  page.ctaPrimaryTextTh ||
                  page.ctaPrimaryTextEn ||
                  (isEn ? 'Book consultation' : 'นัดหมายปรึกษาแพทย์')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="process"
        className="relative overflow-hidden bg-[radial-gradient(circle_at_12%_8%,rgba(255,255,255,0.98),transparent_26%),radial-gradient(circle_at_86%_18%,rgba(210,166,96,0.14),transparent_30%),linear-gradient(180deg,#fffdf9_0%,#f6eadb_52%,#fffaf4_100%)] px-6 py-20 md:px-10 md:py-24"
      >
        {processBackgroundUrl ? (
          <SectionBackgroundImage
            src={processBackgroundUrl}
            alt={
              page.processBackgroundImage?.alt ||
              (isEn ? 'Service process background' : 'ภาพพื้นหลังขั้นตอนบริการ')
            }
          />
        ) : (
          <>
            <div className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full border border-[#d5ad72]/35" />
            <div className="pointer-events-none absolute -left-24 bottom-[-9rem] h-80 w-80 rounded-full border border-[#d5ad72]/30" />
          </>
        )}
        <div className="relative mx-auto max-w-[94rem]">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-5 flex items-center justify-center gap-5">
              <span className="h-px w-16 bg-[#d5ad72]" />
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b98a4f]">
                Our Process
              </p>
              <span className="h-px w-16 bg-[#d5ad72]" />
            </div>
            <h2 className="font-serif text-4xl font-semibold leading-tight text-[var(--marketing-ink)] md:text-6xl">
              {isEn ? 'Service Process' : 'ขั้นตอนการรับบริการ'}
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[var(--marketing-copy)] md:text-lg">
              {isEn
                ? 'We guide every step with doctor-led assessment, personalized planning, and careful aftercare.'
                : 'เราดูแลคุณในทุกขั้นตอน เพื่อให้ได้ผลลัพธ์ที่เหมาะสมและปลอดภัยที่สุด'}
            </p>
            <div className="mx-auto mt-7 flex w-44 items-center justify-center gap-3">
              <span className="h-px flex-1 bg-[#d5ad72]" />
              <span className="h-2 w-2 rotate-45 bg-[#c89d62]" />
              <span className="h-px flex-1 bg-[#d5ad72]" />
            </div>
          </div>

          <div className="relative mt-14">
            <div className="pointer-events-none absolute left-0 right-0 top-9 hidden border-t border-dashed border-[#d0aa74] lg:block" />
            <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-5">
              {processSteps.map((step, index) => {
                const Icon =
                  PROCESS_STEP_ICONS[index % PROCESS_STEP_ICONS.length];
                const stepTitle = isEn ? step.en : step.th;
                const stepImage = isEn ? step.imageEn : step.imageTh;
                const imageUrl = stepImage?.asset?._id
                  ? (urlForImage(stepImage)
                      ?.width(720)
                      .height(520)
                      // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
                      .fit('crop')
                      .auto('format')
                      .url() as string)
                  : undefined;

                return (
                  <article
                    key={`${index}-${stepTitle}`}
                    className="group relative rounded-[1.25rem] border border-[#e7d6bf] bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,0.95),transparent_28%),radial-gradient(circle_at_82%_78%,rgba(211,171,112,0.18),transparent_34%),linear-gradient(135deg,rgba(255,253,249,0.9)_0%,rgba(248,238,225,0.76)_52%,rgba(255,255,255,0.84)_100%)] p-3 pt-10 shadow-[0_22px_58px_rgba(70,47,28,0.09)] backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,1),transparent_28%),radial-gradient(circle_at_82%_78%,rgba(211,171,112,0.24),transparent_34%),linear-gradient(135deg,rgba(255,253,249,0.98)_0%,rgba(248,238,225,0.86)_52%,rgba(255,255,255,0.94)_100%)] hover:shadow-[0_28px_72px_rgba(70,47,28,0.14)]"
                  >
                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.25rem]">
                      <div className="absolute inset-0 opacity-[0.28] [background-image:linear-gradient(90deg,rgba(157,116,70,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(157,116,70,0.06)_1px,transparent_1px)] [background-size:22px_22px]" />
                    </div>
                    <div className="absolute left-1/2 top-0 z-10 flex h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#e8d8c2] bg-[linear-gradient(180deg,#fffdf9,#f7ead8)] font-serif text-2xl font-semibold text-[#8b6337] shadow-[0_14px_32px_rgba(92,58,24,0.13)]">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="overflow-hidden rounded-[0.9rem] border border-[#eadbc8] bg-[linear-gradient(135deg,#f8efe4,#d9bd98)]">
                      <div className="relative aspect-[4/3]">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={stepImage?.alt || stepTitle}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_42%_22%,rgba(255,255,255,0.86),transparent_32%),linear-gradient(135deg,#fbf1e6,#d9bd98)] px-5 text-center text-xs font-medium leading-5 text-[#8b6b4a]">
                            {isEn
                              ? 'Upload process image in Studio'
                              : 'เพิ่มรูปขั้นตอนใน Studio'}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="relative -mt-7 flex justify-center">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#e3cfb4] bg-white text-[#b98a4f] shadow-[0_12px_28px_rgba(70,47,28,0.12)]">
                        <Icon
                          className="h-8 w-8 stroke-[1.45]"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <div className="relative mx-1 mt-3 rounded-[2rem] border border-[#ead8c0]/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(247,236,221,0.74))] px-4 pb-6 pt-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_10px_24px_rgba(70,47,28,0.06)]">
                      <h3 className="text-base font-semibold leading-7 text-[var(--marketing-ink)] md:text-lg">
                        {stepTitle}
                      </h3>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="mx-auto mt-10 flex max-w-4xl items-center justify-center gap-4 rounded-full border border-[#ead8c0] bg-white/70 px-6 py-4 text-center text-sm font-medium leading-7 text-[#7a5a38] shadow-[0_14px_36px_rgba(70,47,28,0.08)] backdrop-blur">
            <Sparkles
              className="h-5 w-5 shrink-0 text-[#c89d62]"
              aria-hidden="true"
            />
            <span>
              {isEn
                ? 'Every step focuses on natural-looking, safe, and suitable results for each patient.'
                : 'ทุกขั้นตอนมุ่งเน้นผลลัพธ์ที่เป็นธรรมชาติ ปลอดภัย และเหมาะสมกับคุณมากที่สุด'}
            </span>
          </div>
        </div>
      </section>

      <section
        id="comparison"
        className="relative overflow-hidden bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.96),transparent_28%),linear-gradient(135deg,#fffaf2_0%,#fbf3e8_50%,#f7ead9_100%)] px-6 py-20 md:px-10 md:py-24"
      >
        {comparisonBackgroundUrl ? (
          <SectionBackgroundImage
            src={comparisonBackgroundUrl}
            alt={
              page.comparisonBackgroundImage?.alt ||
              (isEn
                ? 'Service comparison background'
                : 'ภาพพื้นหลังเปรียบเทียบบริการ')
            }
          />
        ) : (
          <div className="pointer-events-none absolute inset-0 opacity-80">
            <div className="absolute -left-28 bottom-8 h-72 w-72 rounded-full border border-[#d6ad72]/40" />
            <div className="absolute -right-24 top-0 h-80 w-80 rounded-full border border-[#d6ad72]/35" />
            <div className="absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_22%_0%,rgba(255,255,255,0.96),transparent_32%)]" />
          </div>
        )}
        <div className="relative mx-auto max-w-[94rem]">
          <div className="max-w-5xl">
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-12 bg-[#d5ad72]" />
              <Sparkles className="h-4 w-4 text-[#b98a4f]" />
            </div>
            <h2 className="font-serif text-4xl font-semibold leading-tight text-[var(--marketing-ink)] md:text-6xl">
              {isEn ? 'Compare popular services' : 'เปรียบเทียบบริการยอดนิยม'}
            </h2>
            <p className="mt-5 max-w-4xl text-base leading-8 text-[var(--marketing-copy)] md:text-lg">
              {isEn
                ? 'A summary of key service differences to help you understand initial treatment directions before doctor assessment.'
                : 'สรุปความแตกต่างของบริการหลัก เพื่อช่วยให้เข้าใจแนวทางการรักษาเบื้องต้นก่อนเข้ารับการประเมินโดยแพทย์'}
            </p>
          </div>

          <div className="mt-10 hidden overflow-hidden rounded-[1.35rem] border border-[#d8bf9b] bg-white/92 shadow-[0_28px_80px_rgba(66,45,28,0.14)] backdrop-blur md:block">
            <table className="w-full table-fixed border-collapse text-left">
              <colgroup>
                <col className="w-[24%]" />
                <col className="w-[25%]" />
                <col className="w-[26%]" />
                <col className="w-[25%]" />
              </colgroup>
              <thead className="bg-[linear-gradient(180deg,#b48955_0%,#9a6f3d_100%)] text-white">
                <tr>
                  {(isEn
                    ? [
                        'Service',
                        'Suitable for',
                        'Key benefit',
                        'Estimated timing',
                      ]
                    : ['บริการ', 'เหมาะกับ', 'จุดเด่น', 'ระยะเวลาเห็นผลโดยประมาณ']
                  ).map((label, index) => {
                    const HeaderIcon =
                      [Grid2X2, UserRound, Gem, Clock3][index] || Grid2X2;

                    return (
                      <th
                        key={label}
                        className="border-r border-white/35 px-6 py-5 text-base font-semibold last:border-r-0"
                      >
                        <span className="flex items-center gap-3">
                          <HeaderIcon className="h-6 w-6 stroke-[1.7]" />
                          {label}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => {
                  const image = isEn ? row.imageEn : row.imageTh;
                  const imageUrl = image?.asset?._id
                    ? (urlForImage(image)
                        ?.width(220)
                        .height(220)
                        // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
                        .fit('crop')
                        .auto('format')
                        .url() as string)
                    : undefined;
                  const timelineText = isEn ? row.timeline.en : row.timeline.th;
                  const TimelineIcon = timelineIconFor(timelineText);

                  return (
                    <tr
                      key={row.service}
                      className="border-t border-[#eadcc8] bg-white/84 transition-colors duration-300 hover:bg-[#fffaf3]"
                    >
                      <td className="border-r border-[#eadcc8] px-6 py-5">
                        <div className="flex items-center gap-4">
                          <span className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#f8efe3,#ead6ba)] shadow-[inset_0_0_0_1px_rgba(154,111,61,0.12),0_10px_24px_rgba(66,45,28,0.1)]">
                            {imageUrl ? (
                              <Image
                                src={imageUrl}
                                alt={image?.alt || row.service}
                                fill
                                sizes="64px"
                                className="object-cover"
                              />
                            ) : (
                              <span className="font-serif text-xl font-semibold text-[var(--marketing-brand)]">
                                {row.service.slice(0, 1)}
                              </span>
                            )}
                          </span>
                          <span className="font-serif text-xl font-semibold leading-tight text-[var(--marketing-ink)]">
                            {row.service}
                          </span>
                        </div>
                      </td>
                      <td className="border-r border-[#eadcc8] px-8 py-5 text-base leading-8 text-[var(--marketing-copy)]">
                        {isEn ? row.suitableFor.en : row.suitableFor.th}
                      </td>
                      <td className="border-r border-[#eadcc8] px-8 py-5 text-base leading-8 text-[var(--marketing-copy)]">
                        {isEn ? row.highlight.en : row.highlight.th}
                      </td>
                      <td className="px-8 py-5">
                        <span className="inline-flex items-center gap-3 rounded-full bg-[#f5eadb] px-5 py-3 text-base font-medium leading-6 text-[#7a552d]">
                          <TimelineIcon className="h-5 w-5 shrink-0 stroke-[1.8]" />
                          {timelineText}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:hidden">
            {/* biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Mobile comparison cards render the same localized CMS row shape as the desktop table. */}
            {comparisonRows.map((row) => {
              const image = isEn ? row.imageEn : row.imageTh;
              const imageUrl = image?.asset?._id
                ? (urlForImage(image)
                    ?.width(220)
                    .height(220)
                    // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
                    .fit('crop')
                    .auto('format')
                    .url() as string)
                : undefined;
              const timelineText = isEn ? row.timeline.en : row.timeline.th;
              const TimelineIcon = timelineIconFor(timelineText);

              return (
                <article
                  key={row.service}
                  className="overflow-hidden rounded-[1.15rem] border border-[#dfc8aa] bg-white shadow-[0_18px_44px_rgba(66,45,28,0.1)]"
                >
                  <div className="flex items-center gap-4 bg-[linear-gradient(180deg,#b48955_0%,#9a6f3d_100%)] px-5 py-4 text-white">
                    <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f8efe3] text-[var(--marketing-brand)]">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={image?.alt || row.service}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="font-serif text-lg font-semibold">
                          {row.service.slice(0, 1)}
                        </span>
                      )}
                    </span>
                    <span className="font-serif text-xl font-semibold leading-tight">
                      {row.service}
                    </span>
                  </div>
                  <dl className="space-y-4 p-5 text-sm leading-7">
                    <div>
                      <dt className="flex items-center gap-2 font-semibold text-[var(--marketing-brand)]">
                        <UserRound className="h-4 w-4" />
                        {isEn ? 'Suitable for' : 'เหมาะกับ'}
                      </dt>
                      <dd className="mt-1 text-[var(--marketing-copy)]">
                        {isEn ? row.suitableFor.en : row.suitableFor.th}
                      </dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-2 font-semibold text-[var(--marketing-brand)]">
                        <Gem className="h-4 w-4" />
                        {isEn ? 'Key benefit' : 'จุดเด่น'}
                      </dt>
                      <dd className="mt-1 text-[var(--marketing-copy)]">
                        {isEn ? row.highlight.en : row.highlight.th}
                      </dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-2 font-semibold text-[var(--marketing-brand)]">
                        <Clock3 className="h-4 w-4" />
                        {isEn ? 'Estimated timing' : 'ระยะเวลาเห็นผล'}
                      </dt>
                      <dd className="mt-2">
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#f5eadb] px-4 py-2 font-medium text-[#7a552d]">
                          <TimelineIcon className="h-4 w-4" />
                          {timelineText}
                        </span>
                      </dd>
                    </div>
                  </dl>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <GlobalCtaSection
        cta={globalCta}
        locale={locale}
        socialLinks={socialLinks}
      />

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24">
        <article className="rounded-2xl border border-[var(--marketing-border)] bg-[var(--marketing-surface-soft)] p-8">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--marketing-muted)]">
            {isEn ? 'Summary' : 'ข้อมูลโดยสรุป'}
          </p>
          <p className="mt-4 text-base leading-8 text-[var(--marketing-copy)]">
            {isEn ? page.citationSummaryEn : page.citationSummaryTh}
          </p>
        </article>
      </section>
    </main>
  );
}
