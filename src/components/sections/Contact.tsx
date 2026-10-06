'use client';

import {
  CarFront,
  Clock3,
  Facebook,
  Instagram,
  MapPin,
  MessageCircle,
  Music2,
  Navigation,
  Phone,
  Youtube,
} from 'lucide-react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Image } from 'next-sanity/image';
import { useMemo, useState } from 'react';
import type { BreadcrumbItem } from '@/components/shared/Breadcrumbs';
import MarketingPageHero from '@/components/shared/MarketingPageHero';
import { getLinkByLinkObject } from '@/lib/links';
import { buildLocalizedPath } from '@/lib/locale';
import { urlForImage } from '@/lib/sanity/client/utils';
import type {
  ContactSectionFragmentType,
  TestimonialsSectionFragmentType,
} from '@/lib/sanity/queries/fragments/fragment.types';
import { Button } from '../ui/Button';
import TestimonialsSection from './Testimonials';

type ButtonLike = {
  _key?: string | null;
  text?: string | null;
  textEn?: string | null;
  variant?: 'default' | 'secondary' | 'outline' | 'link' | null;
  link?: unknown;
};

type HoursLike = {
  _key?: string;
  label?: string;
  labelEn?: string;
  hours?: string;
};

type FaqLike = {
  _key?: string;
  question?: string;
  questionEn?: string;
  answer?: string;
  answerEn?: string;
};

type MapBranchLike = {
  _key?: string;
  name?: string | null;
  nameEn?: string | null;
  embedUrl?: string | null;
  address?: string | null;
  addressEn?: string | null;
  phone?: string | null;
  lineId?: string | null;
  lineUrl?: string | null;
  transitInfo?: string | null;
  transitInfoEn?: string | null;
  parkingInfo?: string | null;
  parkingInfoEn?: string | null;
  ctaHeading?: string | null;
  ctaHeadingEn?: string | null;
  ctaDescription?: string | null;
  ctaDescriptionEn?: string | null;
  ctaButtons?: ButtonLike[] | null;
};

type SocialLogoLike = {
  alt?: string | null;
  asset?: { _id?: string | null; _ref?: string | null } | null;
} | null;

export default function ContactSection({
  section,
  settingsSocialLinks = [],
  sharedTestimonialsSection = null,
  breadcrumbs,
  pageUrl,
}: {
  section: ContactSectionFragmentType;
  settingsSocialLinks?: Array<{
    _key?: string | null;
    platform?: string | null;
    label?: string | null;
    logo?: SocialLogoLike;
    url?: string | null;
  }>;
  sharedTestimonialsSection?: TestimonialsSectionFragmentType | null;
  breadcrumbs?: {
    items: BreadcrumbItem[];
    locale: 'th' | 'en';
  };
  pageUrl?: string;
}) {
  const pathname = usePathname() || '/th';
  const isEn = pathname.startsWith('/en');
  const localized = <T,>(thValue?: T | null, enValue?: T | null) =>
    (isEn ? enValue || thValue : thValue || enValue) || undefined;
  const localizedButtonText = (button: ButtonLike, fallback: string) =>
    localized(button.text, button.textEn) || fallback;

  const toTelHref = (phone?: string | null) => {
    if (!phone) return '';
    const cleaned = phone.replace(/[^\d+]/g, '');
    return cleaned ? `tel:${cleaned}` : '';
  };

  const sectionAny = section as ContactSectionFragmentType & {
    heroImage?: { alt?: string | null };
    heroImageDesktop?: { alt?: string | null };
    heroImageMobile?: { alt?: string | null };
    heroBackgroundDesktop?: { alt?: string | null };
    heroBackgroundMobile?: { alt?: string | null };
    heroKicker?: string;
    heroKickerEn?: string;
    headingEn?: string;
    descriptionEn?: string;
    heroButton?: ButtonLike | null;
    mapBranches?: MapBranchLike[];
    mapSectionHeading?: string;
    mapSectionHeadingEn?: string;
    clinicName?: string;
    openingHoursHeading?: string;
    openingHoursHeadingEn?: string;
    openingHours?: HoursLike[];
    bookingHeading?: string;
    bookingHeadingEn?: string;
    bookingDescription?: string;
    bookingDescriptionEn?: string;
    bookingButtons?: ButtonLike[];
    citationSummaryTh?: string;
    citationSummaryEn?: string;
    faqHeading?: string;
    faqHeadingEn?: string;
    faqItems?: FaqLike[];
    galleryHeading?: string;
    galleryHeadingEn?: string;
    galleryImages?: Array<{ _key?: string; alt?: string | null }>;
  };

  const heroImageUrl = sectionAny.heroImage
    ? (urlForImage(sectionAny.heroImage)
        ?.width(1800)
        .height(900)
        .fit('crop')
        .url() as string | undefined)
    : undefined;
  const heroImageAlt =
    sectionAny.heroBackgroundMobile?.alt ||
    sectionAny.heroBackgroundDesktop?.alt ||
    sectionAny.heroImageMobile?.alt ||
    sectionAny.heroImageDesktop?.alt ||
    sectionAny.heroImage?.alt ||
    section.heading ||
    'Drema clinic contact';

  const openingHours =
    sectionAny.openingHours?.filter((item) => item.label || item.hours) || [];
  const mapBranches = useMemo(
    () =>
      (sectionAny.mapBranches || []).filter(
        (branch) => branch?.name && branch?.embedUrl
      ) as MapBranchLike[],
    [sectionAny.mapBranches]
  );
  const [activeBranchIndex, setActiveBranchIndex] = useState(0);
  const safeBranchIndex =
    activeBranchIndex >= 0 && activeBranchIndex < mapBranches.length
      ? activeBranchIndex
      : 0;
  const activeBranch = mapBranches[safeBranchIndex];
  const activeMapUrl = activeBranch?.embedUrl;
  const bookingButtons: ButtonLike[] = (sectionAny.bookingButtons ||
    []) as ButtonLike[];
  const activeBranchBookingButtons: ButtonLike[] = (
    activeBranch?.ctaButtons?.length ? activeBranch.ctaButtons : bookingButtons
  ) as ButtonLike[];
  const activeBranchBookingHeading =
    localized(activeBranch?.ctaHeading, activeBranch?.ctaHeadingEn) ||
    localized(sectionAny.bookingHeading, sectionAny.bookingHeadingEn);
  const activeBranchBookingDescription =
    localized(activeBranch?.ctaDescription, activeBranch?.ctaDescriptionEn) ||
    localized(sectionAny.bookingDescription, sectionAny.bookingDescriptionEn);

  const socialLinks = settingsSocialLinks.filter(
    (item) => item?.url && item?.label
  );
  const citationSummary = localized(
    sectionAny.citationSummaryTh,
    sectionAny.citationSummaryEn
  );

  const getSocialIcon = (platform?: string | null) => {
    switch (platform) {
      case 'facebook':
        return Facebook;
      case 'instagram':
        return Instagram;
      case 'youtube':
        return Youtube;
      case 'tiktok':
        return Music2;
      default:
        return MessageCircle;
    }
  };

  const socialShineButtonClass =
    'group relative flex h-auto min-h-[84px] w-full overflow-hidden rounded-[1.35rem] border border-[var(--marketing-border)] bg-[color:rgba(255,255,255,0.82)] px-4 py-4 text-left text-[var(--marketing-copy)] shadow-[var(--marketing-card-shadow)] transition-all duration-500 ease-out hover:-translate-y-[2px] hover:border-[var(--marketing-border-strong)] hover:bg-[var(--marketing-surface-1)] hover:shadow-[var(--marketing-card-shadow-hover)]';

  const getSocialEyebrow = (platform?: string | null) => {
    switch ((platform || '').toLowerCase()) {
      case 'line':
        return 'Chat Channel';
      case 'facebook':
        return 'Community';
      case 'instagram':
        return 'Updates';
      case 'youtube':
        return 'Video Library';
      case 'tiktok':
        return 'Short Videos';
      default:
        return 'Official Channel';
    }
  };

  const normalizeText = (value?: string | null) =>
    (value || '').toLowerCase().replace(/[^a-z0-9]+/g, '');

  const getBookingButtonLogo = (button: ButtonLike, href: string) => {
    const buttonLabel = localizedButtonText(button, '');
    const normalizedButtonLabel = normalizeText(buttonLabel);

    const matchedSocialLink = socialLinks.find((item) => {
      if (!item.logo) return false;
      if (item.url === href) return true;

      const isLine =
        item.platform?.toLowerCase() === 'line' ||
        item.url?.toLowerCase().includes('line.me');
      if (!isLine || !normalizedButtonLabel.includes('line')) return false;

      const normalizedSocialLabel = normalizeText(item.label);
      return (
        Boolean(normalizedSocialLabel) &&
        (normalizedButtonLabel.includes(normalizedSocialLabel) ||
          normalizedSocialLabel.includes(
            normalizedButtonLabel.replace('line', '')
          ))
      );
    });

    if (!matchedSocialLink?.logo) return null;

    const url = urlForImage(matchedSocialLink.logo)?.width(64).height(64).url();
    if (!url) return null;

    return {
      alt:
        matchedSocialLink.logo.alt ||
        matchedSocialLink.label ||
        'Official channel logo',
      url,
    };
  };

  const pageAbsoluteUrl =
    pageUrl || buildLocalizedPath(isEn ? 'en' : 'th', '/contact');
  const pageOrigin = pageAbsoluteUrl.startsWith('http')
    ? new URL(pageAbsoluteUrl).origin
    : '';
  const toAbsoluteUrl = (href?: string) => {
    if (!href) return pageAbsoluteUrl;
    if (href.startsWith('http')) return href;
    return pageOrigin ? `${pageOrigin}${href}` : href;
  };
  const normalizeId = (value?: string | null) =>
    normalizeText(value || 'branch') || 'branch';
  const parseHours = (hours?: string | null) => {
    const match = hours?.match(/(\d{1,2}):(\d{2})\s*[-–]\s*(\d{1,2}):(\d{2})/);
    if (!match) return null;
    const [, openHour, openMinute, closeHour, closeMinute] = match;
    return {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: `${openHour.padStart(2, '0')}:${openMinute}`,
      closes: `${closeHour.padStart(2, '0')}:${closeMinute}`,
    };
  };
  const openingHoursSpecification = openingHours
    .map((item) => parseHours(item.hours))
    .filter(Boolean);
  const branchJsonLd = mapBranches.map((branch, index) => ({
    '@type': 'MedicalBusiness',
    '@id': `${pageAbsoluteUrl}#${normalizeId(branch.name || branch.nameEn)}`,
    name: `${sectionAny.clinicName || 'Drema Aesthetic Laser Clinic'} - ${
      localized(branch.name, branch.nameEn) || `Branch ${index + 1}`
    }`,
    url: pageAbsoluteUrl,
    telephone: branch.phone || undefined,
    address: localized(branch.address, branch.addressEn),
    hasMap: branch.embedUrl || undefined,
    areaServed: 'Bangkok, Thailand',
    openingHoursSpecification: openingHoursSpecification[index] || undefined,
  }));
  const breadcrumbJsonLd = breadcrumbs?.items?.length
    ? {
        '@type': 'BreadcrumbList',
        '@id': `${pageAbsoluteUrl}#breadcrumb`,
        itemListElement: breadcrumbs.items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.label,
          item:
            index === breadcrumbs.items.length - 1
              ? pageAbsoluteUrl
              : toAbsoluteUrl(item.href),
        })),
      }
    : null;
  const faqJsonLd = sectionAny.faqItems?.length
    ? {
        '@type': 'FAQPage',
        '@id': `${pageAbsoluteUrl}#faq`,
        mainEntity: sectionAny.faqItems
          .map((item) => {
            const question = localized(item.question, item.questionEn);
            const answer = localized(item.answer, item.answerEn);
            if (!question || !answer) return null;
            return {
              '@type': 'Question',
              name: question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: answer,
              },
            };
          })
          .filter(Boolean),
      }
    : null;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalBusiness',
        '@id': `${pageAbsoluteUrl}#medical-business`,
        name: sectionAny.clinicName || 'Drema Aesthetic Laser Clinic',
        url: pageAbsoluteUrl,
        description:
          citationSummary ||
          localized(section.description, sectionAny.descriptionEn),
        telephone: mapBranches[0]?.phone || undefined,
        address: localized(mapBranches[0]?.address, mapBranches[0]?.addressEn),
        image: heroImageUrl || undefined,
        areaServed: 'Bangkok, Thailand',
        sameAs: socialLinks.map((item) => item.url).filter(Boolean),
        hasMap: mapBranches[0]?.embedUrl || undefined,
        openingHoursSpecification,
        department: branchJsonLd,
      },
      ...branchJsonLd,
      ...(breadcrumbJsonLd ? [breadcrumbJsonLd] : []),
      ...(faqJsonLd ? [faqJsonLd] : []),
    ],
  };

  return (
    <section className="pb-16 md:pb-24">
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      <MarketingPageHero
        eyebrow={localized(sectionAny.heroKicker, sectionAny.heroKickerEn)}
        heading={
          localized(section.heading, sectionAny.headingEn) || section.heading
        }
        description={localized(section.description, sectionAny.descriptionEn)}
        desktopImage={
          sectionAny.heroBackgroundDesktop ||
          sectionAny.heroImageDesktop ||
          null
        }
        mobileImage={
          sectionAny.heroBackgroundMobile || sectionAny.heroImageMobile || null
        }
        fallbackImage={sectionAny.heroImage || null}
        imageAlt={heroImageAlt}
        imagePlaceholder="Upload contact hero image in Studio"
        breadcrumbs={breadcrumbs}
        actions={
          sectionAny.heroButton?.link ? (
            <Button
              asChild
              variant={sectionAny.heroButton.variant || 'default'}
              size="lg"
            >
              <NextLink
                href={
                  getLinkByLinkObject(sectionAny.heroButton.link as never) ||
                  '#'
                }
                target={
                  (sectionAny.heroButton.link as { openInNewTab?: boolean })
                    ?.openInNewTab
                    ? '_blank'
                    : '_self'
                }
              >
                {localizedButtonText(
                  sectionAny.heroButton,
                  'Book Consultation'
                )}
              </NextLink>
            </Button>
          ) : null
        }
      />

      <div className="container mx-auto space-y-10 px-4 pt-0 md:space-y-14 md:pt-0">
        {citationSummary ? (
          <section className="mx-auto max-w-5xl rounded-[1.25rem] border border-[var(--marketing-border)] bg-[var(--marketing-surface-1)] p-6 shadow-[var(--marketing-card-shadow)] md:p-8">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--marketing-muted)]">
              {isEn ? 'Contact Summary' : 'สรุปข้อมูลติดต่อ'}
            </p>
            <h2 className="text-2xl font-semibold text-[var(--marketing-ink)]">
              {isEn ? 'How to Contact Drema Clinic' : 'ช่องทางติดต่อ Drema Clinic'}
            </h2>
            <p className="mt-3 whitespace-pre-line text-base leading-8 text-[var(--marketing-copy)]">
              {citationSummary}
            </p>
          </section>
        ) : null}

        <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
          <div className="relative overflow-hidden bg-[var(--marketing-surface-2)] py-8 md:py-10">
            <div className="pointer-events-none absolute inset-0 opacity-[0.2] [background-image:linear-gradient(rgba(148,117,82,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(148,117,82,0.08)_1px,transparent_1px)] [background-size:34px_34px]" />

            <div className="container relative mx-auto px-4">
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.45fr_1fr]">
                <div className="rounded-[1.5rem] border border-[var(--marketing-border)] bg-[color:rgba(255,255,255,0.8)] p-4 shadow-[var(--marketing-card-shadow)] md:p-5">
                  <h3 className="px-1 pb-4 text-2xl font-semibold text-[var(--marketing-ink)]">
                    {localized(
                      sectionAny.mapSectionHeading,
                      sectionAny.mapSectionHeadingEn
                    ) || 'Clinic Locations'}
                  </h3>
                  {mapBranches.length > 0 ? (
                    <div className="mb-4 flex flex-wrap gap-2 px-1">
                      {mapBranches.map((branch, index) => (
                        <button
                          type="button"
                          key={branch._key || `${branch.name}-${index}`}
                          onClick={() => setActiveBranchIndex(index)}
                          className={`rounded-[999px] border px-4 py-2 text-sm transition-all duration-300 ${
                            safeBranchIndex === index
                              ? 'border-[var(--marketing-cta-primary-bg)] bg-[var(--marketing-cta-primary-bg)] text-[var(--marketing-cta-primary-text)] shadow-[var(--marketing-card-shadow)]'
                              : 'border-[var(--marketing-border)] bg-[var(--marketing-surface-1)] text-[var(--marketing-copy)] hover:border-[var(--marketing-border-strong)] hover:bg-[var(--marketing-surface-soft)]'
                          }`}
                        >
                          {localized(branch.name, branch.nameEn)}
                        </button>
                      ))}
                    </div>
                  ) : null}
                  {activeMapUrl ? (
                    <iframe
                      title="clinic-map"
                      src={activeMapUrl}
                      loading="lazy"
                      className="h-[420px] w-full rounded-2xl border border-[var(--marketing-border)] md:h-[520px]"
                    />
                  ) : (
                    <div className="flex h-[420px] items-center justify-center rounded-2xl border border-dashed border-[var(--marketing-border)] text-sm text-[var(--marketing-muted)] md:h-[520px]">
                      Add map embed URL in Studio to show Google Map
                    </div>
                  )}
                </div>

                <aside className="space-y-5">
                  <div className="rounded-[1.5rem] border border-[var(--marketing-border)] bg-[var(--marketing-surface-1)] p-6 shadow-[var(--marketing-card-shadow)]">
                    <h3 className="text-2xl font-semibold text-[var(--marketing-ink)]">
                      {sectionAny.clinicName || 'Drema Aesthetic Laser Clinic'}
                    </h3>
                    {activeBranch?.name ? (
                      <p className="mt-2 text-base font-medium text-[var(--marketing-brand-deep)]">
                        {localized(activeBranch.name, activeBranch.nameEn)}
                      </p>
                    ) : null}

                    {activeBranch ? (
                      <div className="mt-5 divide-y divide-[var(--marketing-divider)]">
                        {[
                          {
                            key: 'address',
                            label: 'ADDRESS',
                            value: localized(
                              activeBranch.address,
                              activeBranch.addressEn
                            ),
                            icon: MapPin,
                            href: undefined,
                          },
                          {
                            key: 'phone',
                            label: 'PHONE',
                            value: activeBranch.phone,
                            icon: Phone,
                            href: toTelHref(activeBranch.phone),
                          },
                          {
                            key: 'line',
                            label: 'LINE',
                            value: activeBranch.lineId,
                            icon: MessageCircle,
                            href: activeBranch.lineUrl || undefined,
                          },
                          {
                            key: 'transit',
                            label: 'TRANSIT',
                            value: localized(
                              activeBranch.transitInfo,
                              activeBranch.transitInfoEn
                            ),
                            icon: Navigation,
                            href: undefined,
                          },
                          {
                            key: 'parking',
                            label: 'PARKING',
                            value: localized(
                              activeBranch.parkingInfo,
                              activeBranch.parkingInfoEn
                            ),
                            icon: CarFront,
                            href: undefined,
                          },
                        ]
                          .filter((row) => row.value)
                          .map((row) => {
                            const Icon = row.icon;
                            return (
                              <div key={row.key} className="flex gap-3 py-3">
                                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--marketing-border-soft)] bg-[var(--marketing-surface-soft)] text-[var(--marketing-brand)]">
                                  <Icon size={12} />
                                </span>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--marketing-muted)]">
                                    {row.label}
                                  </p>
                                  {row.href ? (
                                    <NextLink
                                      href={row.href}
                                      target={
                                        row.key === 'line' ? '_blank' : '_self'
                                      }
                                      rel={
                                        row.key === 'line'
                                          ? 'noopener noreferrer'
                                          : undefined
                                      }
                                      className="text-sm leading-relaxed text-[var(--marketing-copy)] hover:text-[var(--marketing-ink)] hover:underline"
                                    >
                                      {row.value}
                                    </NextLink>
                                  ) : (
                                    <p className="text-sm leading-relaxed text-[var(--marketing-copy)]">
                                      {row.value}
                                    </p>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    ) : (
                      <p className="mt-4 text-sm text-[var(--marketing-copy)]">
                        Add branch information in Studio.
                      </p>
                    )}
                  </div>

                  <div className="rounded-[1.5rem] border border-[var(--marketing-border)] bg-[image:var(--marketing-gradient-soft)] p-6 shadow-[var(--marketing-card-shadow)]">
                    <div className="mb-3 inline-flex rounded-full bg-[var(--marketing-surface-1)] p-2 text-[var(--marketing-brand)]">
                      <Clock3 size={16} />
                    </div>
                    <h4 className="text-xl font-semibold text-[var(--marketing-ink)]">
                      {localized(
                        sectionAny.openingHoursHeading,
                        sectionAny.openingHoursHeadingEn
                      ) || 'Opening Hours'}
                    </h4>
                    {openingHours.length ? (
                      <ul className="mt-4 space-y-3">
                        {openingHours.map((item) => (
                          <li
                            key={item._key || `${item.label}-${item.hours}`}
                            className="flex items-center justify-between gap-3 border-b border-[var(--marketing-divider)] pb-2 text-sm text-[var(--marketing-copy)] last:border-b-0 last:pb-0"
                          >
                            <span>{localized(item.label, item.labelEn)}</span>
                            <span className="font-medium text-[var(--marketing-ink)]">
                              {item.hours}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-3 text-sm text-[var(--marketing-copy)]">
                        Add opening hours in Studio.
                      </p>
                    )}
                  </div>

                  {activeBranchBookingButtons.length ? (
                    <div className="rounded-[1.5rem] border border-[var(--marketing-cta-banner-secondary-border)] bg-[image:var(--marketing-cta-banner-bg)] p-6 text-[var(--marketing-cta-banner-text)] shadow-[var(--marketing-card-shadow-hover)]">
                      <h4 className="text-xl font-semibold">
                        {activeBranchBookingHeading || 'Book Your Consultation'}
                      </h4>
                      {activeBranchBookingDescription ? (
                        <p className="mt-2 text-sm text-white/88">
                          {activeBranchBookingDescription}
                        </p>
                      ) : null}
                      <div className="mt-4 flex flex-wrap justify-center gap-2">
                        {activeBranchBookingButtons
                          .slice(0, 2)
                          .map((button) => {
                            const href = button.link
                              ? getLinkByLinkObject(button.link as never)
                              : '';
                            if (!href) return null;
                            const buttonLabel = localizedButtonText(
                              button,
                              'Contact'
                            );
                            const buttonLogo = getBookingButtonLogo(
                              button,
                              href
                            );
                            return (
                              <Button
                                key={button._key || `${button.text}-${href}`}
                                asChild
                                variant="outline"
                                className="rounded-full border-[var(--marketing-cta-banner-secondary-border)] bg-[var(--marketing-cta-banner-secondary-bg)] text-[var(--marketing-cta-banner-secondary-text)] hover:border-white/70 hover:bg-white/18"
                              >
                                <NextLink
                                  href={href}
                                  target={
                                    (button.link as { openInNewTab?: boolean })
                                      ?.openInNewTab
                                      ? '_blank'
                                      : '_self'
                                  }
                                >
                                  {buttonLogo ? (
                                    <Image
                                      src={buttonLogo.url}
                                      alt={buttonLogo.alt}
                                      width={20}
                                      height={20}
                                      className="h-5 w-5 object-contain"
                                    />
                                  ) : null}
                                  <span>{buttonLabel}</span>
                                </NextLink>
                              </Button>
                            );
                          })}
                      </div>
                    </div>
                  ) : null}
                </aside>
              </div>
            </div>
          </div>
        </div>
        <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
          <div className="relative overflow-hidden bg-[image:var(--marketing-gradient-soft-warm)] py-14 md:py-16 lg:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_120%_at_15%_45%,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0)_58%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_110%_at_88%_52%,rgba(173,128,72,0.16)_0%,rgba(173,128,72,0)_62%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.26] [background-image:linear-gradient(rgba(137,103,67,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(137,103,67,0.08)_1px,transparent_1px)] [background-size:38px_38px]" />

            <div className="container relative mx-auto px-4">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="h-px w-14 bg-[var(--marketing-brand)]" />
                    <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-[var(--marketing-muted)]">
                      Premium Skincare Experience
                    </p>
                  </div>
                  <h3 className="max-w-4xl font-serif text-4xl font-medium leading-[1.15] tracking-[0.02em] text-[var(--marketing-ink)] md:text-5xl">
                    {localized(
                      sectionAny.bookingHeading,
                      sectionAny.bookingHeadingEn
                    ) || 'Ready to start your skin journey?'}
                  </h3>
                  {localized(
                    sectionAny.bookingDescription,
                    sectionAny.bookingDescriptionEn
                  ) ? (
                    <p className="max-w-3xl text-base leading-relaxed text-[var(--marketing-copy)]">
                      {localized(
                        sectionAny.bookingDescription,
                        sectionAny.bookingDescriptionEn
                      )}
                    </p>
                  ) : null}
                </div>

                {socialLinks.length ? (
                  <div className="self-center rounded-[1.8rem] border border-[var(--marketing-border)] bg-[color:rgba(255,255,255,0.56)] p-4 shadow-[var(--marketing-card-shadow)] backdrop-blur-[6px] md:justify-self-end md:p-5">
                    <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--marketing-muted)]">
                      Official Channels
                    </p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:min-w-[520px]">
                      {socialLinks.map((item) => {
                        const Icon = getSocialIcon(item.platform);
                        const logoUrl = item.logo
                          ? urlForImage(item.logo)?.width(96).height(96).url()
                          : null;
                        return (
                          <Button
                            key={item._key || `${item.platform}-${item.url}`}
                            asChild
                            size="default"
                            variant="outline"
                            className={socialShineButtonClass}
                          >
                            <NextLink
                              href={item.url as string}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="grid min-h-[52px] w-full grid-cols-[40px_minmax(0,1fr)] items-center gap-3"
                            >
                              {logoUrl ? (
                                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center">
                                  <Image
                                    src={logoUrl}
                                    alt={
                                      item.logo?.alt ||
                                      item.label ||
                                      'Official channel logo'
                                    }
                                    width={40}
                                    height={40}
                                    className="h-7 w-7 object-contain"
                                  />
                                </span>
                              ) : (
                                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--marketing-border-soft)] bg-[var(--marketing-surface-1)] text-[var(--marketing-brand)] transition-colors duration-500 group-hover:border-[var(--marketing-border-strong)] group-hover:bg-[var(--marketing-surface-2)]">
                                  <Icon size={18} />
                                </span>
                              )}
                              <span className="flex min-w-0 flex-col justify-center gap-1 self-center">
                                <span className="text-[10px] uppercase leading-none tracking-[0.2em] text-[var(--marketing-muted)]">
                                  {getSocialEyebrow(item.platform)}
                                </span>
                                <span className="text-sm font-medium leading-none text-[var(--marketing-ink)]">
                                  {item.label}
                                </span>
                              </span>
                            </NextLink>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {sectionAny.faqItems?.length ? (
          <div className="rounded-3xl border border-[var(--marketing-border)] bg-[var(--marketing-surface-1)] p-6 shadow-[var(--marketing-card-shadow)] md:p-8">
            <h3 className="text-2xl font-semibold text-[var(--marketing-ink)]">
              {localized(sectionAny.faqHeading, sectionAny.faqHeadingEn) ||
                'Contact FAQ'}
            </h3>
            <div className="mt-5 space-y-3">
              {sectionAny.faqItems.map((item) => (
                <details
                  key={item._key || item.question}
                  className="group rounded-2xl border border-[var(--marketing-border)] bg-[var(--marketing-surface-soft)] p-4 open:bg-[var(--marketing-surface-1)]"
                >
                  <summary className="cursor-pointer list-none font-medium text-[var(--marketing-ink)]">
                    {localized(item.question, item.questionEn)}
                  </summary>
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-[var(--marketing-copy)]">
                    {localized(item.answer, item.answerEn)}
                  </p>
                </details>
              ))}
            </div>
          </div>
        ) : null}

        {sectionAny.galleryImages?.length ? (
          <div className="rounded-3xl border border-[var(--marketing-border)] bg-[var(--marketing-surface-1)] p-6 shadow-[var(--marketing-card-shadow)] md:p-8">
            <h3 className="text-2xl font-semibold text-[var(--marketing-ink)]">
              {localized(
                sectionAny.galleryHeading,
                sectionAny.galleryHeadingEn
              ) || 'Clinic Gallery'}
            </h3>
            <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
              {sectionAny.galleryImages.map((image, index) => {
                const imageUrl = urlForImage(image)
                  ?.width(900)
                  .height(900)
                  .fit('crop')
                  .url();
                if (!imageUrl) return null;
                return (
                  <div
                    key={imageUrl}
                    className="overflow-hidden rounded-2xl border border-[var(--marketing-border)]"
                  >
                    <Image
                      src={imageUrl}
                      alt={image.alt || `Clinic image ${index + 1}`}
                      width={900}
                      height={900}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>

      {sharedTestimonialsSection ? (
        <div className="pt-6 md:pt-10">
          <TestimonialsSection section={sharedTestimonialsSection} />
        </div>
      ) : null}
    </section>
  );
}
