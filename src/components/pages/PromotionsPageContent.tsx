import Link from 'next/link';
import {
  getBreadcrumbLabel,
  homeBreadcrumb,
} from '@/components/shared/Breadcrumbs';
import GlobalCtaSection, {
  type GlobalCtaData,
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

type PromotionItem = {
  _id: string;
  title?: string | null;
  titleEn?: string | null;
  slug?: string | null;
  badge?: string | null;
  badgeEn?: string | null;
  summary?: string | null;
  summaryEn?: string | null;
  details?: string | null;
  detailsEn?: string | null;
  image?: {
    alt?: string | null;
    asset?: { _id?: string | null; _ref?: string | null } | null;
  } | null;
  priceLabel?: string | null;
  priceLabelEn?: string | null;
  originalPrice?: string | null;
  originalPriceEn?: string | null;
  promoPrice?: string | null;
  promoPriceEn?: string | null;
  priceOptions?: Array<{
    _key?: string | null;
    label?: string | null;
    labelEn?: string | null;
    promoPrice?: string | null;
    promoPriceEn?: string | null;
    originalPrice?: string | null;
    originalPriceEn?: string | null;
  }> | null;
  lineDestination?: 'default' | 'town_in_town' | 'emporium' | string | null;
  ctaText?: string | null;
  ctaTextEn?: string | null;
  ctaLink?: BasicLink;
  terms?: string[] | null;
  termsEn?: string[] | null;
  doctorNote?: string | null;
  doctorNoteEn?: string | null;
  isFeatured?: boolean | null;
  startAt?: string | null;
  endAt?: string | null;
};

type SocialLinkItem = {
  _key?: string | null;
  platform?: string | null;
  label?: string | null;
  url?: string | null;
};

type PromotionsPageData = {
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
  featuredLabelTh?: string | null;
  featuredLabelEn?: string | null;
  allPromotionsHeadingTh?: string | null;
  allPromotionsHeadingEn?: string | null;
  allPromotionsDescriptionTh?: string | null;
  allPromotionsDescriptionEn?: string | null;
  trustHeadingTh?: string | null;
  trustHeadingEn?: string | null;
  trustPoints?: Array<{
    _key?: string | null;
    titleTh?: string | null;
    titleEn?: string | null;
    descriptionTh?: string | null;
    descriptionEn?: string | null;
  }> | null;
  faqHeadingTh?: string | null;
  faqHeadingEn?: string | null;
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
  citationSummaryTh?: string | null;
  citationSummaryEn?: string | null;
  citationSummaryLabelTh?: string | null;
  citationSummaryLabelEn?: string | null;
};

const DEFAULT_LINE_OA_ID = '@drema.emporium';

const buildLineOaMessageUrl = (lineOaId: string, message: string) => {
  const encodedId = encodeURIComponent(lineOaId);
  const encodedMessage = encodeURIComponent(message);
  return `https://line.me/R/oaMessage/${encodedId}/?${encodedMessage}`;
};

const buildPromotionConsultMessage = (
  promotion: PromotionItem,
  locale: 'th' | 'en'
) => {
  const isEn = locale === 'en';
  const title =
    (isEn ? promotion.titleEn : promotion.title) ||
    promotion.title ||
    promotion.titleEn ||
    (isEn ? 'this promotion' : 'โปรโมชันนี้');

  return isEn
    ? `Hello, I am interested in the promotion "${title}". Could you please share more details and help me book a consultation?`
    : `สวัสดีค่ะ สนใจโปร "${title}" รบกวนขอรายละเอียดเพิ่มเติมและนัดปรึกษาได้ไหมคะ`;
};

const buildGeneralConsultMessage = (locale: 'th' | 'en') =>
  locale === 'en'
    ? 'Hello, I would like to ask about current promotions and get a consultation.'
    : 'สวัสดีค่ะ สนใจสอบถามรายละเอียดโปรโมชันและขอปรึกษาเพิ่มเติมค่ะ';

const localizeHref = (href: string, locale: 'th' | 'en') => {
  if (!href || href === '#' || href.startsWith('http')) return href || '#';
  if (href.startsWith('/th') || href.startsWith('/en')) return href;
  return buildLocalizedPath(locale, href);
};

const normalizeSocialLinks = (links?: SocialLinkItem[] | null) =>
  (links || []).filter((item): item is SocialLinkItem => Boolean(item?.url));

const resolveLineSocialLink = (
  links: SocialLinkItem[],
  destination: PromotionItem['lineDestination'] = 'default'
) => {
  const lineLinks = links.filter((item) => {
    const platform = (item.platform || '').toLowerCase();
    const label = (item.label || '').toLowerCase();
    const url = (item.url || '').toLowerCase();
    return (
      platform.includes('line') ||
      label.includes('line') ||
      url.includes('line.me')
    );
  });

  if (lineLinks.length === 0) return null;

  const isTownInTownLink = (item: SocialLinkItem) => {
    const haystack = `${item.label || ''} ${item.url || ''}`.toLowerCase();
    return haystack.includes('town') || haystack.includes('895pbant');
  };

  const isEmporiumLink = (item: SocialLinkItem) => {
    const haystack = `${item.label || ''} ${item.url || ''}`.toLowerCase();
    return (
      haystack.includes('emporium') ||
      haystack.includes('phrom') ||
      haystack.includes('drema.emporium')
    );
  };

  if (destination === 'town_in_town') {
    return lineLinks.find(isTownInTownLink)?.url || null;
  }

  if (destination === 'emporium') {
    return lineLinks.find(isEmporiumLink)?.url || null;
  }

  return (
    lineLinks.find((item) =>
      (item.label || '').toLowerCase().includes('official')
    )?.url ||
    lineLinks.find(isEmporiumLink)?.url ||
    lineLinks[0]?.url ||
    null
  );
};

const toHref = (link: BasicLink, locale: 'th' | 'en') =>
  link ? localizeHref(getLinkByLinkObject(link as never) || '#', locale) : '#';

const isPlaceholderConsultHref = (href: string | null | undefined) => {
  const normalized = (href || '').trim().toLowerCase();
  if (!normalized || normalized === '#') return true;
  return (
    normalized.includes('your-clinic') ||
    normalized === 'https://lin.ee/your-clinic' ||
    normalized === 'https://line.me/ti/p/your-clinic'
  );
};

const formatDateRange = (
  startAt: string | null | undefined,
  endAt: string | null | undefined,
  locale: 'th' | 'en'
) => {
  if (!startAt && !endAt) return null;

  const formatter = new Intl.DateTimeFormat(
    locale === 'en' ? 'en-US' : 'th-TH',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }
  );

  if (startAt && endAt) {
    return `${formatter.format(new Date(startAt))} - ${formatter.format(new Date(endAt))}`;
  }

  if (endAt) {
    return locale === 'en'
      ? `Available until ${formatter.format(new Date(endAt))}`
      : `ใช้ได้ถึง ${formatter.format(new Date(endAt))}`;
  }

  return locale === 'en'
    ? `Available from ${formatter.format(new Date(startAt as string))}`
    : `เริ่ม ${formatter.format(new Date(startAt as string))}`;
};

const getLocalizedPriceOptions = (
  promotion: PromotionItem,
  locale: 'th' | 'en'
) => {
  const isEn = locale === 'en';
  const options = (promotion.priceOptions || [])
    .map((option) => ({
      _key: option._key,
      label:
        (isEn ? option.labelEn : option.label) ||
        option.label ||
        option.labelEn,
      promoPrice:
        (isEn ? option.promoPriceEn : option.promoPrice) ||
        option.promoPrice ||
        option.promoPriceEn,
      originalPrice:
        (isEn ? option.originalPriceEn : option.originalPrice) ||
        option.originalPrice ||
        option.originalPriceEn,
    }))
    .filter(
      (option) => option.label || option.promoPrice || option.originalPrice
    );

  if (options.length > 0) return options;

  const fallbackPromoPrice =
    (isEn ? promotion.promoPriceEn : promotion.promoPrice) ||
    promotion.promoPrice ||
    promotion.promoPriceEn;
  const fallbackOriginalPrice =
    (isEn ? promotion.originalPriceEn : promotion.originalPrice) ||
    promotion.originalPrice ||
    promotion.originalPriceEn;

  if (!fallbackPromoPrice && !fallbackOriginalPrice) return [];

  return [
    {
      _key: 'default-price',
      label: null,
      promoPrice: fallbackPromoPrice,
      originalPrice: fallbackOriginalPrice,
    },
  ];
};

function PriceOptionsTable({
  options,
  priceLabel,
  featured = false,
}: {
  options: Array<{
    _key?: string | null;
    label?: string | null;
    promoPrice?: string | null;
    originalPrice?: string | null;
  }>;
  priceLabel?: string | null;
  featured?: boolean;
}) {
  if (options.length === 0) return null;

  const wrapperClass = featured
    ? 'rounded-[1.75rem] border border-[var(--marketing-border)] bg-[color:rgba(255,255,255,0.72)] p-5'
    : 'rounded-[1.5rem] border border-[var(--marketing-border)] bg-[var(--marketing-surface-1)] p-4';
  const tableClass = featured
    ? 'mt-3 overflow-hidden rounded-[1.25rem] border border-[var(--marketing-divider)] bg-[color:rgba(255,255,255,0.8)]'
    : 'mt-3 overflow-hidden rounded-xl border border-[var(--marketing-divider)] bg-[color:rgba(255,255,255,0.8)]';
  const rowClass = featured ? 'px-4 py-4' : 'px-4 py-3';
  const promoPriceClass = featured
    ? 'text-3xl font-semibold text-[var(--marketing-brand)] md:text-4xl'
    : 'text-xl font-semibold text-[var(--marketing-brand)] md:text-2xl';

  return (
    <div className={wrapperClass}>
      {priceLabel ? (
        <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--marketing-muted)]">
          {priceLabel}
        </p>
      ) : null}
      <div className={tableClass}>
        {options.map((option, index) => (
          <div
            key={option._key || `${option.label || option.promoPrice}-${index}`}
            className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 ${rowClass} ${
              index < options.length - 1
                ? 'border-b border-[var(--marketing-divider)]'
                : ''
            }`}
          >
            <div className="min-w-0">
              {option.label ? (
                <p className="text-sm font-medium text-[var(--marketing-copy)] md:text-[15px]">
                  {option.label}
                </p>
              ) : null}
              {option.originalPrice ? (
                <p className="mt-1 text-sm text-[var(--marketing-muted)] line-through">
                  {option.originalPrice}
                </p>
              ) : null}
            </div>
            {option.promoPrice ? (
              <p className={`${promoPriceClass} text-right leading-none`}>
                {option.promoPrice}
              </p>
            ) : (
              <div />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Promotion cards resolve localized copy, pricing, and LINE routing in one reusable card.
function PromotionCard({
  promotion,
  locale,
  socialLinks,
}: {
  promotion: PromotionItem;
  locale: 'th' | 'en';
  socialLinks: SocialLinkItem[];
}) {
  const isEn = locale === 'en';
  const title =
    (isEn ? promotion.titleEn : promotion.title) ||
    promotion.title ||
    promotion.titleEn;
  const badge =
    (isEn ? promotion.badgeEn : promotion.badge) ||
    promotion.badge ||
    promotion.badgeEn;
  const summary =
    (isEn ? promotion.summaryEn : promotion.summary) ||
    promotion.summary ||
    promotion.summaryEn;
  const details =
    (isEn ? promotion.detailsEn : promotion.details) ||
    promotion.details ||
    promotion.detailsEn;
  const priceLabel =
    (isEn ? promotion.priceLabelEn : promotion.priceLabel) ||
    promotion.priceLabel ||
    promotion.priceLabelEn;
  const priceOptions = getLocalizedPriceOptions(promotion, locale);
  const ctaText =
    (isEn ? promotion.ctaTextEn : promotion.ctaText) ||
    promotion.ctaText ||
    promotion.ctaTextEn;
  const doctorNote =
    (isEn ? promotion.doctorNoteEn : promotion.doctorNote) ||
    promotion.doctorNote ||
    promotion.doctorNoteEn;
  const terms = (
    (isEn ? promotion.termsEn : promotion.terms) ||
    promotion.terms ||
    promotion.termsEn ||
    []
  ).filter(Boolean);
  const imageUrl =
    promotion.image?.asset?._id || promotion.image?.asset?._ref
      ? urlForImage(promotion.image)
          ?.width(900)
          .height(1100)
          // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
          .fit('crop')
          .auto('format')
          .url()
      : null;
  const dateRange = formatDateRange(promotion.startAt, promotion.endAt, locale);
  const resolvedLineHref = resolveLineSocialLink(
    socialLinks,
    promotion.lineDestination
  );
  const consultHref =
    promotion.ctaLink && getLinkByLinkObject(promotion.ctaLink as never)
      ? toHref(promotion.ctaLink, locale)
      : resolvedLineHref ||
        buildLineOaMessageUrl(
          DEFAULT_LINE_OA_ID,
          buildPromotionConsultMessage(promotion, locale)
        );

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-[var(--marketing-border-soft)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(248,242,233,0.96))] shadow-[0_18px_60px_rgba(80,55,28,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(80,55,28,0.12)]">
      <div className="relative aspect-[6/7] overflow-hidden">
        {imageUrl ? (
          // biome-ignore lint/performance/noImgElement: marketing image
          <img
            src={imageUrl}
            alt={promotion.image?.alt || title || 'Promotion image'}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--marketing-media)] text-[var(--marketing-muted)]">
            {isEn ? 'Upload promotion image' : 'อัปโหลดรูปโปรโมชัน'}
          </div>
        )}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
          <span className="rounded-full border border-white/45 bg-[color:rgba(255,247,237,0.85)] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--marketing-brand)] backdrop-blur-sm">
            {badge}
          </span>
          {dateRange ? (
            <span className="rounded-full bg-black/25 px-3 py-1 text-[11px] text-white backdrop-blur-sm">
              {dateRange}
            </span>
          ) : null}
        </div>
      </div>

      <div className="space-y-5 p-6">
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold leading-tight text-[var(--marketing-ink)] md:text-[2rem]">
            {title}
          </h3>
          <p className="text-base leading-8 text-[var(--marketing-copy)]">
            {summary}
          </p>
        </div>

        <PriceOptionsTable options={priceOptions} priceLabel={priceLabel} />

        {details ? (
          <p className="text-sm leading-7 text-[var(--marketing-subtle)]">
            {details}
          </p>
        ) : null}

        {doctorNote ? (
          <div className="rounded-[1.5rem] border border-[var(--marketing-divider)] bg-[var(--marketing-surface-2)] p-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--marketing-muted)]">
              {isEn ? 'Doctor Note' : 'หมายเหตุจากแพทย์'}
            </p>
            <p className="mt-2 text-sm leading-7 text-[var(--marketing-copy)]">
              {doctorNote}
            </p>
          </div>
        ) : null}

        {terms.length > 0 ? (
          <ul className="space-y-2 text-sm leading-7 text-[var(--marketing-copy)]">
            {terms.map((term, index) => (
              <li key={`${promotion._id}-term-${index}`}>• {term}</li>
            ))}
          </ul>
        ) : null}

        <Link
          href={consultHref}
          className="inline-flex items-center rounded-xl bg-[var(--marketing-brand)] px-5 py-3 text-sm font-medium text-white transition-all duration-500 ease-out hover:-translate-y-[2px]"
          target="_blank"
          rel="noopener noreferrer"
        >
          {ctaText}
        </Link>
      </div>
    </article>
  );
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Promotions page composes hero, featured item, grids, FAQ, and shared CTA from CMS data.
export default function PromotionsPageContent({
  page,
  promotions,
  locale,
  socialLinks,
  globalCta,
}: {
  page: PromotionsPageData;
  promotions: PromotionItem[];
  locale: 'th' | 'en';
  socialLinks?: SocialLinkItem[] | null;
  globalCta?: GlobalCtaData;
}) {
  const isEn = locale === 'en';
  const normalizedSocialLinks = normalizeSocialLinks(socialLinks);
  const defaultLineHref = resolveLineSocialLink(
    normalizedSocialLinks,
    'default'
  );
  const heroImageAlt =
    page.heroBackgroundMobile?.alt ||
    page.heroBackgroundDesktop?.alt ||
    page.heroImageMobile?.alt ||
    page.heroImageDesktop?.alt ||
    page.heroImage?.alt ||
    (isEn ? 'Promotions page hero' : 'ภาพโปรโมชัน');
  const featuredPromotion =
    promotions.find((item) => item.isFeatured) || promotions[0] || null;
  const promotionGrid = featuredPromotion
    ? promotions.filter((item) => item._id !== featuredPromotion._id)
    : promotions;
  const heroSecondaryLinkHref =
    page.heroSecondaryCtaLink &&
    getLinkByLinkObject(page.heroSecondaryCtaLink as never)
      ? toHref(page.heroSecondaryCtaLink, locale)
      : null;
  const heroPrimaryHref =
    page.heroPrimaryCtaLink &&
    getLinkByLinkObject(page.heroPrimaryCtaLink as never)
      ? toHref(page.heroPrimaryCtaLink, locale)
      : localizeHref('/promotions', locale);
  const heroSecondaryHref =
    heroSecondaryLinkHref && !isPlaceholderConsultHref(heroSecondaryLinkHref)
      ? heroSecondaryLinkHref
      : defaultLineHref ||
        buildLineOaMessageUrl(
          DEFAULT_LINE_OA_ID,
          buildGeneralConsultMessage(locale)
        );
  const featuredPromotionHref =
    featuredPromotion?.ctaLink &&
    getLinkByLinkObject(featuredPromotion.ctaLink as never)
      ? toHref(featuredPromotion.ctaLink, locale)
      : featuredPromotion
        ? resolveLineSocialLink(
            normalizedSocialLinks,
            featuredPromotion.lineDestination
          ) ||
          buildLineOaMessageUrl(
            DEFAULT_LINE_OA_ID,
            buildPromotionConsultMessage(featuredPromotion, locale)
          )
        : '#';
  const featuredPriceOptions = featuredPromotion
    ? getLocalizedPriceOptions(featuredPromotion, locale)
    : [];

  const faqJsonLd =
    page.faqItems && page.faqItems.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: page.faqItems
            .filter(
              (item) =>
                (isEn ? item.questionEn : item.questionTh) &&
                (isEn ? item.answerEn : item.answerTh)
            )
            .map((item) => ({
              '@type': 'Question',
              name:
                (isEn ? item.questionEn : item.questionTh) ||
                item.questionTh ||
                item.questionEn,
              acceptedAnswer: {
                '@type': 'Answer',
                text:
                  (isEn ? item.answerEn : item.answerTh) ||
                  item.answerTh ||
                  item.answerEn,
              },
            })),
        }
      : null;

  return (
    <main className="pb-24">
      {faqJsonLd ? (
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      ) : null}

      <MarketingPageHero
        breadcrumbs={{
          locale,
          items: [
            homeBreadcrumb(locale),
            { label: getBreadcrumbLabel(locale, 'promotions') },
          ],
        }}
        eyebrow={isEn ? page.heroEyebrowEn : page.heroEyebrowTh}
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
              href={heroPrimaryHref}
              className="rounded-xl bg-[var(--marketing-cta-primary-bg)] px-6 py-3 text-sm font-medium text-[var(--marketing-cta-primary-text)] transition-all duration-500 ease-out hover:-translate-y-[2px] hover:bg-[var(--marketing-cta-primary-bg-hover)]"
            >
              {isEn ? page.heroPrimaryCtaTextEn : page.heroPrimaryCtaTextTh}
            </Link>
            <Link
              href={heroSecondaryHref}
              className="rounded-xl border border-[var(--marketing-cta-secondary-border)] bg-[color:rgba(255,255,255,0.75)] px-6 py-3 text-sm font-medium text-[var(--marketing-cta-secondary-text)] transition-all duration-500 ease-out hover:-translate-y-[2px]"
              target="_blank"
              rel="noopener noreferrer"
            >
              {isEn ? page.heroSecondaryCtaTextEn : page.heroSecondaryCtaTextTh}
            </Link>
          </>
        }
      />

      {featuredPromotion ? (
        <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 className="text-3xl font-semibold text-[var(--marketing-ink)] md:text-4xl">
              {isEn ? page.featuredLabelEn : page.featuredLabelTh}
            </h2>
          </div>
          <div className="grid grid-cols-1 items-stretch gap-8 overflow-hidden rounded-[2.5rem] border border-[var(--marketing-border)] bg-[image:var(--marketing-gradient-soft-warm)] p-6 shadow-[var(--marketing-card-shadow-hover)] md:grid-cols-2 md:p-8">
            <div className="relative min-w-0 w-full max-w-full aspect-[6/7] overflow-hidden rounded-[2rem]">
              {featuredPromotion.image?.asset?._id ||
              featuredPromotion.image?.asset?._ref ? (
                // biome-ignore lint/performance/noImgElement: marketing image
                <img
                  src={
                    urlForImage(featuredPromotion.image)
                      ?.width(1200)
                      .height(1400)
                      // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
                      .fit('crop')
                      .auto('format')
                      .url() as string
                  }
                  alt={
                    featuredPromotion.image?.alt ||
                    (isEn
                      ? featuredPromotion.titleEn
                      : featuredPromotion.title) ||
                    'Featured promotion'
                  }
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-[var(--marketing-media)] text-[var(--marketing-muted)]">
                  {isEn
                    ? 'Upload featured promotion image'
                    : 'อัปโหลดภาพโปรโมชันเด่น'}
                </div>
              )}
            </div>

            <div className="flex min-w-0 flex-col justify-center space-y-5 px-1 py-2">
              <span className="inline-flex w-fit rounded-full border border-[var(--marketing-border-soft)] bg-[color:rgba(255,255,255,0.7)] px-4 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--marketing-brand)]">
                {(isEn ? featuredPromotion.badgeEn : featuredPromotion.badge) ||
                  featuredPromotion.badge ||
                  featuredPromotion.badgeEn}
              </span>
              <h3 className="max-w-xl text-4xl font-semibold leading-tight text-[var(--marketing-ink)] md:text-5xl">
                {(isEn ? featuredPromotion.titleEn : featuredPromotion.title) ||
                  featuredPromotion.title ||
                  featuredPromotion.titleEn}
              </h3>
              <p className="max-w-2xl text-base leading-8 text-[var(--marketing-copy)] md:text-lg">
                {(isEn
                  ? featuredPromotion.summaryEn
                  : featuredPromotion.summary) ||
                  featuredPromotion.summary ||
                  featuredPromotion.summaryEn}
              </p>
              <PriceOptionsTable
                options={featuredPriceOptions}
                priceLabel={
                  (isEn
                    ? featuredPromotion.priceLabelEn
                    : featuredPromotion.priceLabel) ||
                  featuredPromotion.priceLabel ||
                  featuredPromotion.priceLabelEn
                }
                featured
              />
              <p className="text-sm leading-7 text-[var(--marketing-subtle)]">
                {(isEn
                  ? featuredPromotion.detailsEn
                  : featuredPromotion.details) ||
                  featuredPromotion.details ||
                  featuredPromotion.detailsEn}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={featuredPromotionHref}
                  className="rounded-xl bg-[var(--marketing-cta-primary-bg)] px-6 py-3 text-sm font-medium text-[var(--marketing-cta-primary-text)] transition-all duration-500 ease-out hover:-translate-y-[2px] hover:bg-[var(--marketing-cta-primary-bg-hover)]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {(isEn
                    ? featuredPromotion.ctaTextEn
                    : featuredPromotion.ctaText) ||
                    featuredPromotion.ctaText ||
                    featuredPromotion.ctaTextEn}
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[var(--marketing-surface-2)] py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-10 max-w-3xl space-y-3">
            <h2 className="text-3xl font-semibold text-[var(--marketing-ink)] md:text-4xl">
              {isEn ? page.allPromotionsHeadingEn : page.allPromotionsHeadingTh}
            </h2>
            <p className="text-base leading-8 text-[var(--marketing-copy)]">
              {isEn
                ? page.allPromotionsDescriptionEn
                : page.allPromotionsDescriptionTh}
            </p>
          </div>

          {promotions.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {(promotionGrid.length > 0 ? promotionGrid : promotions).map(
                (promotion) => (
                  <PromotionCard
                    key={promotion._id}
                    promotion={promotion}
                    locale={locale}
                    socialLinks={normalizedSocialLinks}
                  />
                )
              )}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-[var(--marketing-border-strong)] bg-[var(--marketing-surface-2)] px-8 py-14 text-center text-[var(--marketing-muted)]">
              {isEn
                ? 'No active promotions yet. Add a promotion item in Sanity Studio to show it here.'
                : 'ยังไม่มีโปรโมชันที่เปิดใช้งาน เพิ่ม Promotion Item ใน Sanity Studio เพื่อแสดงที่หน้านี้'}
            </div>
          )}
        </div>
      </section>

      {(page.trustPoints || []).length > 0 ? (
        <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-semibold text-[var(--marketing-ink)] md:text-4xl">
              {isEn ? page.trustHeadingEn : page.trustHeadingTh}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {(page.trustPoints || []).map((point) => (
              <article
                key={point?._key}
                className="rounded-[1.75rem] border border-[var(--marketing-border)] bg-[image:var(--marketing-gradient-soft)] p-6 shadow-[var(--marketing-card-shadow)]"
              >
                <h3 className="text-2xl font-semibold text-[var(--marketing-ink)]">
                  {(isEn ? point?.titleEn : point?.titleTh) ||
                    point?.titleTh ||
                    point?.titleEn}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--marketing-copy)]">
                  {(isEn ? point?.descriptionEn : point?.descriptionTh) ||
                    point?.descriptionTh ||
                    point?.descriptionEn}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {(page.faqItems || []).length > 0 ? (
        <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--marketing-muted)]">
                FAQ
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-[var(--marketing-ink)] md:text-4xl">
                {isEn ? page.faqHeadingEn : page.faqHeadingTh}
              </h2>
            </div>
            <div className="space-y-4">
              {(page.faqItems || []).map((item) => (
                <details
                  key={item?._key}
                  className="group rounded-[1.5rem] border border-[var(--marketing-border)] bg-[var(--marketing-surface-1)] p-5 shadow-[var(--marketing-card-shadow)]"
                >
                  <summary className="cursor-pointer list-none text-lg font-medium text-[var(--marketing-table-ink)] marker:hidden">
                    {(isEn ? item?.questionEn : item?.questionTh) ||
                      item?.questionTh ||
                      item?.questionEn}
                  </summary>
                  <p className="mt-3 pr-4 text-sm leading-7 text-[var(--marketing-copy)]">
                    {(isEn ? item?.answerEn : item?.answerTh) ||
                      item?.answerTh ||
                      item?.answerEn}
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
        socialLinks={normalizedSocialLinks}
      />

      <section className="mx-auto max-w-7xl px-6 pt-10 md:px-10">
        <article className="rounded-[2rem] border border-[var(--marketing-border)] bg-[var(--marketing-surface-2)] p-8">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--marketing-muted)]">
            {(isEn
              ? page.citationSummaryLabelEn
              : page.citationSummaryLabelTh) ||
              (isEn
                ? 'Summary'
                : '\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e42\u0e14\u0e22\u0e2a\u0e23\u0e38\u0e1b')}
          </p>
          <p className="mt-4 text-sm leading-8 text-[var(--marketing-copy)] md:text-base">
            {isEn ? page.citationSummaryEn : page.citationSummaryTh}
          </p>
        </article>
      </section>
    </main>
  );
}
