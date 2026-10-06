'use client';

import { BadgeCheck, Globe2, Leaf, Stethoscope, UserRound } from 'lucide-react';
import Link from 'next/link';
import type { PortableTextBlock } from 'next-sanity';
import { Image } from 'next-sanity/image';
import { useEffect, useRef, useState } from 'react';
import ButtonsGroup from '@/components/modules/ButtonsGroup';
import { buildLocalizedPath } from '@/lib/locale';
import { urlForImage } from '@/lib/sanity/client/utils';
import type { AboutDoctorSectionFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import PortableText from '../modules/PortableText';

type TeamDoctor = {
  _key?: string;
  name?: string;
  nameTh?: string;
  nameEn?: string;
  role?: string;
  roleTh?: string;
  roleEn?: string;
  bio?: PortableTextBlock[];
  bioTh?: PortableTextBlock[];
  bioEn?: PortableTextBlock[];
  profileSummaryTh?: string | null;
  profileSummaryEn?: string | null;
  profilePanelHeadingTh?: string | null;
  profilePanelHeadingEn?: string | null;
  profileHighlights?: Array<{
    _key?: string | null;
    labelTh?: string | null;
    labelEn?: string | null;
    textTh?: string | null;
    textEn?: string | null;
  }> | null;
  photo?: {
    asset?: {
      _id?: string | null;
      _ref?: string | null;
    } | null;
  } | null;
};

type SectionImage = {
  alt?: string | null;
  asset?: { _id?: string | null; _ref?: string | null } | null;
} | null;

type PortableTextChild = {
  text?: string | null;
};

type PortableTextPlainBlock = {
  children?: PortableTextChild[] | null;
};

const getSectionBackgroundUrl = (image?: SectionImage) =>
  image?.asset?._id || image?.asset?._ref
    ? (urlForImage(image)
        ?.width(2400)
        .height(1400)
        // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
        .fit('crop')
        .auto('format')
        .url() as string)
    : undefined;

function SectionBackgroundImage({
  image,
  fallbackAlt,
}: {
  image?: SectionImage;
  fallbackAlt: string;
}) {
  const backgroundUrl = getSectionBackgroundUrl(image);
  if (!backgroundUrl) return null;

  return (
    <Image
      src={backgroundUrl}
      alt={image?.alt || fallbackAlt}
      fill
      sizes="100vw"
      className="object-cover"
    />
  );
}

function getPhotoRef(photo: TeamDoctor['photo']) {
  if (!photo?.asset?._id) {
    return undefined;
  }

  return {
    ...photo,
    asset: { _ref: photo.asset._id },
  };
}

function extractBioLines(bio?: PortableTextBlock[]) {
  if (!bio?.length) return [];
  return bio
    .map((block) =>
      ((block as PortableTextPlainBlock)?.children || [])
        .map((child) => ('text' in child ? child.text || '' : ''))
        .join('')
        .trim()
    )
    .filter(Boolean);
}

const getLocalizedText = (
  locale: 'th' | 'en',
  th?: string | null,
  en?: string | null,
  fallback?: string | null
) => (locale === 'en' ? en || th || fallback : th || en || fallback) || '';

const getLocalizedBlocks = (
  locale: 'th' | 'en',
  th?: PortableTextBlock[] | null,
  en?: PortableTextBlock[] | null,
  fallback?: PortableTextBlock[] | null
) => (locale === 'en' ? en || th || fallback : th || en || fallback) || [];

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Existing home medical team section handles desktop/mobile doctor selection, localization, and fallbacks in one UI component.
export default function AboutDoctorSection({
  section,
  locale = 'th',
}: {
  section: AboutDoctorSectionFragmentType;
  locale?: 'th' | 'en';
}) {
  const sectionWithTeam = section as AboutDoctorSectionFragmentType & {
    backgroundImage?: SectionImage;
    doctors?: TeamDoctor[] | null;
  };
  const backgroundImage = sectionWithTeam.backgroundImage as SectionImage;
  const doctors = (sectionWithTeam.doctors || []) as TeamDoctor[];
  const [activeIndex, setActiveIndex] = useState(0);
  const [bioVisible, setBioVisible] = useState(true);
  const mobileScrollerRef = useRef<HTMLDivElement | null>(null);
  const safeIndex = Math.min(activeIndex, Math.max(doctors.length - 1, 0));
  const activeDoctor = doctors[safeIndex];
  const heading = getLocalizedText(
    locale,
    sectionWithTeam.headingTh,
    sectionWithTeam.headingEn,
    section.heading
  );
  const intro = getLocalizedBlocks(
    locale,
    sectionWithTeam.introTh,
    sectionWithTeam.introEn,
    sectionWithTeam.intro
  );
  const activeDoctorName = getLocalizedText(
    locale,
    activeDoctor?.nameTh,
    activeDoctor?.nameEn,
    activeDoctor?.name
  );
  const activeDoctorRole = getLocalizedText(
    locale,
    activeDoctor?.roleTh,
    activeDoctor?.roleEn,
    activeDoctor?.role
  );
  const activeDoctorBio = getLocalizedBlocks(
    locale,
    activeDoctor?.bioTh,
    activeDoctor?.bioEn,
    activeDoctor?.bio
  );
  const activeDoctorSearchText = [
    activeDoctor?.name,
    activeDoctor?.nameTh,
    activeDoctor?.nameEn,
    activeDoctorName,
  ]
    .filter(Boolean)
    .join(' ');
  const activeDoctorProfile = [
    {
      match: /pun|punyanan|ปุนญนันท์|ปุน/i,
      slug: 'dr-punyanan-boonchaya',
      textTh: 'พญ.ปุนญนันท์ บุญชญา',
      textEn: 'Dr.Punyanan Boonchaya',
    },
    {
      match: /smart|ritthichai|ฤทธิชัย/i,
      slug: 'dr-ritthichai-decha',
      textTh: 'นพ.ฤทธิชัย เดชา',
      textEn: 'Dr.Ritthichai Decha',
    },
    {
      match: /toey|thanaporn|puaratana|ธนพร/i,
      slug: 'dr-thanaporn-puaratana-arunkon',
      textTh: 'พญ.ธนพร พัวรัตนอรุณกร',
      textEn: 'Dr.Thanaporn puaratana-arunkon',
    },
    {
      match: /fook|nachanok|tupkwa|ณชนก/i,
      slug: 'dr-nachanok-tupkwa',
      textTh: 'นพ.ณชนก ทัพขวา',
      textEn: 'Dr.Nachanok tupkwa',
    },
  ].find((profile) => profile.match.test(activeDoctorSearchText));
  const activeDoctorProfileHref = activeDoctorProfile
    ? buildLocalizedPath(locale, `/author/${activeDoctorProfile.slug}`)
    : undefined;
  const activeDoctorProfileText = activeDoctorProfile
    ? locale === 'en'
      ? activeDoctorProfile.textEn
      : activeDoctorProfile.textTh
    : undefined;
  const bioLines = extractBioLines(activeDoctorBio);
  const activeDoctorSummary = getLocalizedText(
    locale,
    activeDoctor?.profileSummaryTh,
    activeDoctor?.profileSummaryEn
  );
  const activeDoctorPanelHeading = getLocalizedText(
    locale,
    activeDoctor?.profilePanelHeadingTh,
    activeDoctor?.profilePanelHeadingEn
  );
  const editableDetailRows = (activeDoctor?.profileHighlights || [])
    .map((item) => ({
      label: getLocalizedText(locale, item?.labelTh, item?.labelEn),
      text: getLocalizedText(locale, item?.textTh, item?.textEn),
    }))
    .filter((item) => item.label || item.text)
    .slice(0, 3);
  const activeDoctorDetailRows = [
    {
      icon: Stethoscope,
      label: 'Aesthetic & Thread Lift',
      text:
        bioLines[1] ||
        'Natural facial refinement with attention to balance and structure',
    },
    {
      icon: Leaf,
      label: 'Holistic Approach',
      text: bioLines[2] || 'Mind, skin, and confidence in harmony',
    },
    {
      icon: Globe2,
      label: 'International Standard',
      text: bioLines[3] || 'Modern techniques with globally aligned protocols',
    },
  ].map((fallback, index) => ({
    ...fallback,
    label: editableDetailRows[index]?.label || fallback.label,
    text: editableDetailRows[index]?.text || fallback.text,
  }));
  const premiumGradientBorder =
    'linear-gradient(135deg, #8c6a2e 0%, #c8a96a 42%, #f4e7cc 72%, #fffaf0 100%)';
  const premiumBorderStyle = {
    border: '1px solid transparent',
    backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.7)), ${premiumGradientBorder}`,
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
  } as const;

  // biome-ignore lint/correctness/useExhaustiveDependencies: The animation intentionally resets whenever the active doctor index changes.
  useEffect(() => {
    setBioVisible(false);
    const timer = setTimeout(() => setBioVisible(true), 60);
    return () => clearTimeout(timer);
  }, [safeIndex]);

  const scrollToDoctor = (index: number) => {
    setActiveIndex(index);
    const container = mobileScrollerRef.current;
    if (!container) return;
    const target = container.querySelector(
      `[data-doctor-index="${index}"]`
    ) as HTMLElement | null;
    target?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  const handleMobileScroll = () => {
    const container = mobileScrollerRef.current;
    if (!container) return;
    const cards = Array.from(
      container.querySelectorAll('[data-doctor-card="true"]')
    ) as HTMLElement[];
    if (!cards.length) return;

    const viewportCenter = container.scrollLeft + container.clientWidth / 2;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const center = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(center - viewportCenter);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    if (nearestIndex !== safeIndex) {
      setActiveIndex(nearestIndex);
    }
  };

  if (doctors.length > 0) {
    return (
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#fffdf9_0%,#fbf4ea_45%,#f5eadb_100%)] py-16 md:py-20">
        {backgroundImage ? (
          <SectionBackgroundImage
            image={backgroundImage}
            fallbackAlt="Drema Clinic medical team background"
          />
        ) : (
          <>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(255,255,255,0.95),transparent_30%),radial-gradient(circle_at_78%_12%,rgba(216,184,133,0.24),transparent_32%),radial-gradient(circle_at_48%_108%,rgba(139,107,74,0.12),transparent_36%)]" />
            <div className="pointer-events-none absolute -left-28 top-20 h-72 w-72 rounded-full bg-[rgba(232,199,151,0.34)] blur-3xl md:h-96 md:w-96" />
            <div className="pointer-events-none absolute -right-24 top-8 h-64 w-64 rounded-full bg-[rgba(255,255,255,0.82)] blur-3xl md:h-80 md:w-80" />
            <div className="pointer-events-none absolute bottom-4 left-1/2 h-56 w-[46rem] -translate-x-1/2 rounded-full bg-[rgba(139,107,74,0.09)] blur-3xl" />
          </>
        )}
        <div className="container relative mx-auto px-4">
          <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14 md:max-w-6xl">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight md:text-[3.25rem] md:whitespace-nowrap">
              {heading || 'Our Medical Experts'}
            </h2>
            {intro.length ? (
              <PortableText
                className="[&_p]:mb-0 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-muted-foreground md:[&_p]:text-lg"
                value={intro}
              />
            ) : null}
          </div>

          <div className="mt-4 md:hidden">
            <div
              ref={mobileScrollerRef}
              onScroll={handleMobileScroll}
              className="overflow-x-auto snap-x snap-mandatory px-4 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="flex w-max gap-4 pr-4">
                {doctors.map((doctor, index) => {
                  const photoRef = getPhotoRef(doctor.photo);
                  const isActive = index === safeIndex;
                  const doctorName = getLocalizedText(
                    locale,
                    doctor.nameTh,
                    doctor.nameEn,
                    doctor.name
                  );

                  return (
                    <button
                      key={doctor._key || `${doctor.name}-${index}`}
                      type="button"
                      data-doctor-card="true"
                      data-doctor-index={index}
                      onClick={() => scrollToDoctor(index)}
                      className={`snap-center flex-[0_0_88vw] max-w-[420px] overflow-hidden rounded-3xl border bg-white/70 backdrop-blur-[10px] transition-all duration-300 ease-out ${
                        isActive
                          ? 'scale-100 shadow-lg ring-2 ring-[#d6bb84]/65 ring-offset-2 ring-offset-white'
                          : 'scale-[0.985] shadow-sm hover:shadow-md'
                      }`}
                      style={premiumBorderStyle}
                    >
                      <div className="relative aspect-[620/877] w-full bg-[#f7f5f1]">
                        {photoRef ? (
                          <Image
                            src={
                              (urlForImage(photoRef)
                                ?.width(620)
                                .height(877)
                                .url() as string) || '/placeholder.jpg'
                            }
                            alt={doctorName || 'Doctor photo'}
                            fill
                            sizes="(max-width: 768px) 88vw, 420px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-muted" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-2 flex items-center justify-center gap-2">
              {doctors.map((doctor, index) => (
                <button
                  type="button"
                  key={doctor._key || `dot-${index}`}
                  aria-label={`Show doctor ${index + 1}`}
                  onClick={() => scrollToDoctor(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    index === safeIndex
                      ? 'bg-[#1e1b17] scale-110'
                      : 'bg-[#cfc8bc]'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 hidden items-end justify-center md:flex">
            {
              // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Each doctor card resolves active state, localized labels, image refs, and layered transform styles inline for this interactive stack.
              doctors.map((doctor, index) => {
                const photoRef = getPhotoRef(doctor.photo);
                const isActive = index === safeIndex;
                const rotate = index % 2 === 0 ? -6 : 6;
                const doctorName = getLocalizedText(
                  locale,
                  doctor.nameTh,
                  doctor.nameEn,
                  doctor.name
                );

                return (
                  <button
                    key={doctor._key || `${doctor.name}-${index}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`${index === 0 ? 'ml-0' : '-ml-12 lg:-ml-14'} relative overflow-hidden rounded-3xl border bg-white/70 backdrop-blur-[10px] transition-all duration-300 ease-out ${
                      isActive
                        ? 'shadow-xl ring-2 ring-[#d6bb84]/70 ring-offset-2 ring-offset-white'
                        : 'shadow-md hover:shadow-lg'
                    }`}
                    style={{
                      transform: `rotate(${rotate}deg) translateY(${isActive ? '-10px' : '0px'})`,
                      zIndex: isActive ? 12 : 8 - index,
                      ...premiumBorderStyle,
                    }}
                  >
                    <div className="relative h-[300px] w-[220px]">
                      {photoRef ? (
                        <Image
                          src={
                            (urlForImage(photoRef)
                              ?.width(640)
                              .height(920)
                              .url() as string) || '/placeholder.jpg'
                          }
                          alt={doctorName || 'Doctor photo'}
                          fill
                          sizes="220px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-[300px] w-[220px] bg-muted" />
                      )}
                    </div>
                  </button>
                );
              })
            }
          </div>

          {activeDoctor ? (
            <div
              className={`mx-auto mt-5 max-w-6xl overflow-hidden rounded-[28px] border border-white/55 bg-white/62 shadow-[0_18px_46px_rgba(62,44,24,0.08)] backdrop-blur-[10px] transition-all duration-300 ease-out md:mt-6 ${
                bioVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-2 opacity-0'
              }`}
              style={premiumBorderStyle}
            >
              <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[330px_1fr]">
                <aside className="relative overflow-hidden bg-[#f5efe6] px-7 py-8 md:px-9 md:py-10">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_10%,rgba(255,255,255,0.9),transparent_34%),radial-gradient(circle_at_86%_90%,rgba(207,174,119,0.2),transparent_42%)]" />
                  <div className="pointer-events-none absolute -bottom-10 -left-8 h-36 w-56 rounded-full border border-[#d7ba86]/45" />
                  <div className="relative">
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#d7ba86] bg-white text-[#a77a42] shadow-[0_10px_24px_rgba(76,52,24,0.12)]">
                      <UserRound size={27} strokeWidth={1.6} />
                    </div>
                    <h3 className="font-serif text-3xl font-semibold uppercase leading-none tracking-tight text-[#241f1a] md:text-[2.25rem]">
                      {activeDoctorName || `Doctor ${safeIndex + 1}`}
                    </h3>
                    {activeDoctorProfileHref && activeDoctorProfileText ? (
                      <Link
                        href={activeDoctorProfileHref}
                        className="mt-4 inline-flex rounded-full border border-[#d7ba86] bg-white/80 px-4 py-2 text-sm font-semibold leading-none text-[#9b703e] shadow-[0_10px_24px_rgba(76,52,24,0.1)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-white hover:text-[#6f4b27]"
                      >
                        {activeDoctorProfileText}
                      </Link>
                    ) : null}
                    <p className="mt-5 text-sm leading-6 text-[#6a5f52] md:text-[0.95rem]">
                      {activeDoctorSummary ||
                        bioLines[0] ||
                        activeDoctorRole ||
                        'Specialized care designed around natural-looking facial balance.'}
                    </p>
                    <span
                      className="mt-6 block h-px w-14"
                      style={{ backgroundImage: premiumGradientBorder }}
                    />
                  </div>
                </aside>

                <div className="px-6 py-7 md:px-10 md:py-9 lg:px-12">
                  <p className="mx-auto max-w-2xl text-center text-lg font-semibold leading-8 text-[#9b703e] md:text-xl">
                    {activeDoctorPanelHeading ||
                      activeDoctorRole ||
                      'Aesthetic care focused on natural refinement, balance, and facial harmony'}
                  </p>

                  <div className="mt-7 overflow-hidden rounded-2xl border border-[#eadfce]">
                    {activeDoctorDetailRows.map((item, rowIndex) => {
                      const RowIcon = item.icon;

                      return (
                        <div
                          key={item.label}
                          className={`grid gap-4 px-5 py-5 md:grid-cols-[210px_1fr] md:items-center md:px-6 ${
                            rowIndex > 0 ? 'border-t border-[#eee4d5]' : ''
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d7ba86] bg-[#fbf5eb] text-[#a77a42]">
                              <RowIcon size={24} strokeWidth={1.55} />
                            </span>
                            <span className="text-base font-semibold leading-6 text-[#312a22]">
                              {item.label}
                            </span>
                          </div>
                          <p className="border-[#eee4d5] text-sm leading-6 text-[#6a645b] md:border-l md:pl-8">
                            {item.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="hidden">
                <aside className="relative overflow-hidden bg-[#f5efe6] px-7 py-8 md:px-9 md:py-10">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_10%,rgba(255,255,255,0.9),transparent_34%),radial-gradient(circle_at_86%_90%,rgba(207,174,119,0.2),transparent_42%)]" />
                  <div className="pointer-events-none absolute -bottom-10 -left-8 h-36 w-56 rounded-full border border-[#d7ba86]/45" />
                  <div className="relative">
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#d7ba86] bg-white text-[#a77a42] shadow-[0_10px_24px_rgba(76,52,24,0.12)]">
                      <UserRound size={27} strokeWidth={1.6} />
                    </div>
                    <h3 className="font-serif text-3xl font-semibold uppercase leading-none tracking-tight text-[#241f1a] md:text-[2.25rem]">
                      {activeDoctorName || `Doctor ${safeIndex + 1}`}
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-[#6a5f52] md:text-[0.95rem]">
                      {bioLines[0] ||
                        activeDoctorRole ||
                        'Specialized care designed around natural-looking facial balance.'}
                    </p>
                    <span
                      className="mt-6 block h-px w-14"
                      style={{ backgroundImage: premiumGradientBorder }}
                    />
                  </div>
                </aside>

                <div className="px-6 py-7 md:px-10 md:py-9 lg:px-12">
                  <p className="mx-auto max-w-2xl text-center text-lg font-semibold leading-8 text-[#9b703e] md:text-xl">
                    {activeDoctorRole ||
                      (locale === 'en'
                        ? 'Aesthetic care focused on natural refinement, balance, and facial harmony'
                        : 'แพทย์ผู้เชี่ยวชาญที่มุ่งเน้นการปรับรูปหน้าอย่างเป็นธรรมชาติ เน้นความสมดุลและความละมุนของโครงหน้า')}
                  </p>

                  <div className="mt-7 overflow-hidden rounded-2xl border border-[#eadfce] bg-white shadow-[0_14px_34px_rgba(62,44,24,0.08)]">
                    {[
                      {
                        icon: Stethoscope,
                        label:
                          locale === 'en'
                            ? 'Aesthetic & thread lift care'
                            : 'ด้านความงามและการร้อยไหม',
                        text:
                          bioLines[1] ||
                          (locale === 'en'
                            ? 'Natural facial refinement with attention to balance and structure'
                            : 'เชี่ยวชาญการปรับรูปหน้าอย่างเป็นธรรมชาติ เน้นความสมดุลและความละมุนของโครงหน้า'),
                      },
                      {
                        icon: Leaf,
                        label: 'Holistic Approach',
                        text:
                          bioLines[2] ||
                          (locale === 'en'
                            ? 'Mind, skin, and confidence in harmony'
                            : 'ดูแลภาพรวมของผิว โครงหน้า และความมั่นใจให้สอดคล้องกัน'),
                      },
                      {
                        icon: Globe2,
                        label:
                          locale === 'en'
                            ? 'International Standard'
                            : 'มาตรฐานระดับสากล',
                        text:
                          bioLines[3] ||
                          (locale === 'en'
                            ? 'Modern techniques with globally aligned protocols'
                            : 'เลือกใช้เทคนิคที่ทันสมัยและแนวทางการดูแลตามมาตรฐานสากล'),
                      },
                    ].map((item, rowIndex) => {
                      const RowIcon = item.icon;

                      return (
                        <div
                          key={item.label}
                          className={`grid gap-4 px-5 py-5 md:grid-cols-[210px_1fr] md:items-center md:px-6 ${
                            rowIndex > 0 ? 'border-t border-[#eee4d5]' : ''
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d7ba86] bg-[#fbf5eb] text-[#a77a42]">
                              <RowIcon size={24} strokeWidth={1.55} />
                            </span>
                            <span className="text-base font-semibold leading-6 text-[#312a22]">
                              {item.label}
                            </span>
                          </div>
                          <p className="border-[#eee4d5] text-sm leading-6 text-[#6a645b] md:border-l md:pl-8">
                            {item.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {section.buttons?.length ? (
                    <div className="mt-7 flex justify-center">
                      <ButtonsGroup
                        buttons={section.buttons}
                        size="lg"
                        className="!flex-row"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="hidden">
                <span
                  className="absolute inset-y-0 left-0 w-[2px] rounded-full"
                  style={{ backgroundImage: premiumGradientBorder }}
                />
                <h3 className="mb-3 text-3xl font-semibold tracking-tight md:text-4xl">
                  {locale === 'en'
                    ? `Hi, I'm ${activeDoctorName || `Doctor ${safeIndex + 1}`}, your aesthetic guide.`
                    : activeDoctorName || `Doctor ${safeIndex + 1}`}
                </h3>
                <p className="mb-6 text-lg leading-relaxed text-[#6a645b]">
                  {bioLines[0] ||
                    'Specialized care designed around your goals, lifestyle, and natural beauty.'}
                </p>

                <div className="space-y-3 text-[#2f2922]">
                  <div className="flex items-start gap-3 text-base md:text-lg">
                    <div className="flex w-[128px] shrink-0 items-center gap-2 md:w-[150px]">
                      <BadgeCheck size={20} className="text-[#1f1b16]" />
                      <span className="font-semibold">
                        {activeDoctorRole || 'Certified Specialist'}
                      </span>
                    </div>
                    <p className="text-[#6a645b]">
                      {bioLines[1] ||
                        'Board-certified expertise and trusted care'}
                    </p>
                  </div>
                  <div className="flex items-start gap-3 text-base md:text-lg">
                    <div className="flex w-[128px] shrink-0 items-center gap-2 md:w-[150px]">
                      <Leaf size={20} className="text-[#1f1b16]" />
                      <span className="font-semibold">Holistic Approach</span>
                    </div>
                    <p className="text-[#6a645b]">
                      {bioLines[2] || 'Mind, skin, and confidence in harmony'}
                    </p>
                  </div>
                  <div className="flex items-start gap-3 text-base md:text-lg">
                    <div className="flex w-[128px] shrink-0 items-center gap-2 md:w-[150px]">
                      <Globe2 size={20} className="text-[#1f1b16]" />
                      <span className="font-semibold">
                        {locale === 'en'
                          ? 'International Standard'
                          : 'มาตรฐานระดับสากล'}
                      </span>
                    </div>
                    <p className="text-[#6a645b]">
                      {bioLines[3] ||
                        'Modern techniques with globally aligned protocols'}
                    </p>
                  </div>
                </div>

                {section.buttons?.length ? (
                  <div className="mt-8">
                    <ButtonsGroup
                      buttons={section.buttons}
                      size="lg"
                      className="!flex-row"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  const photoRef = section.photo?.asset?._id
    ? {
        ...section.photo,
        asset: { _ref: section.photo.asset._id },
      }
    : undefined;

  const fallbackName = getLocalizedText(
    locale,
    sectionWithTeam.nameTh,
    sectionWithTeam.nameEn,
    section.name
  );
  const fallbackRole = getLocalizedText(
    locale,
    sectionWithTeam.roleTh,
    sectionWithTeam.roleEn,
    section.role
  );
  const fallbackBio = getLocalizedBlocks(
    locale,
    sectionWithTeam.bioTh,
    sectionWithTeam.bioEn,
    section.bio as PortableTextBlock[]
  );

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#fffdf9_0%,#fbf4ea_45%,#f5eadb_100%)] py-12 md:py-16">
      {backgroundImage ? (
        <SectionBackgroundImage
          image={backgroundImage}
          fallbackAlt="Drema Clinic medical team background"
        />
      ) : (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(255,255,255,0.95),transparent_30%),radial-gradient(circle_at_78%_12%,rgba(216,184,133,0.22),transparent_32%),radial-gradient(circle_at_48%_108%,rgba(139,107,74,0.1),transparent_36%)]" />
          <div className="pointer-events-none absolute -left-24 top-12 h-64 w-64 rounded-full bg-[rgba(232,199,151,0.32)] blur-3xl md:h-80 md:w-80" />
          <div className="pointer-events-none absolute -right-20 top-8 h-56 w-56 rounded-full bg-[rgba(255,255,255,0.82)] blur-3xl md:h-72 md:w-72" />
        </>
      )}
      <div className="container relative mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-[320px_1fr] md:items-start">
        {photoRef ? (
          <Image
            src={
              (urlForImage(photoRef)
                ?.width(800)
                .height(1000)
                .url() as string) || '/placeholder.jpg'
            }
            alt={section.name || section.heading || 'Doctor photo'}
            width={500}
            height={640}
            className="w-full rounded-2xl border border-border object-cover"
          />
        ) : null}
        <div>
          <h2 className="mb-3 text-3xl font-semibold md:text-4xl">{heading}</h2>
          {fallbackName ? (
            <p className="text-xl font-semibold">{fallbackName}</p>
          ) : null}
          {fallbackRole ? (
            <p className="mb-4 text-sm text-muted-foreground">{fallbackRole}</p>
          ) : null}
          <PortableText value={fallbackBio} />
          {section.buttons?.length ? (
            <div className="mt-6">
              <ButtonsGroup buttons={section.buttons} size="lg" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
