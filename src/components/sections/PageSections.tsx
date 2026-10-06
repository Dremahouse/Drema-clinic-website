'use client';

import type { SanityDocument } from 'next-sanity';
import { useOptimistic } from 'next-sanity/hooks';
import type { ElementType } from 'react';
import Reveal from '@/components/effects/Reveal';
import {
  type BreadcrumbItem,
  Breadcrumbs,
} from '@/components/shared/Breadcrumbs';
import GlobalCtaSection, {
  type GlobalCtaData,
} from '@/components/shared/GlobalCtaSection';
import { dataAttr } from '@/lib/sanity/client/utils';
import type {
  SectionsType,
  TestimonialsSectionFragmentType,
} from '@/lib/sanity/queries/fragments/fragment.types';
import { staggerDelay } from '@/utils/effects';
import AboutDoctor from './AboutDoctor';
import Benefits from './Benefits';
import CardGrid from './CardGrid';
import Contact from './Contact';
import CTA from './CTA';
import Divider from './Divider';
import Faq from './Faq';
import Gallery from './Gallery';
import Hero from './Hero';
import Introduction from './Introduction';
import MediaText from './MediaText';
import PostList from './PostList';
import Pricing from './Pricing';
import ReviewsByCategory from './ReviewsByCategory';
import Services from './Services';
import Subscribe from './Subscribe';
import TechnologyShowcase from './TechnologyShowcase';
import Testimonials from './Testimonials';

const SECTION_COMPONENTS: Record<string, ElementType> = {
  hero: Hero,
  introduction: Introduction,
  services: Services,
  technologyShowcase: TechnologyShowcase,
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

type PageSectionsProps = {
  documentId: string;
  documentType: string;
  locale?: 'th' | 'en';
  sections?: SectionsType;
  settingsSocialLinks?: Array<{
    _key?: string | null;
    platform?: string | null;
    label?: string | null;
    logo?: {
      alt?: string | null;
      asset?: { _id?: string | null; _ref?: string | null } | null;
    } | null;
    url?: string | null;
  }>;
  globalCta?: GlobalCtaData;
  sharedTestimonialsSection?: TestimonialsSectionFragmentType | null;
  breadcrumbs?: BreadcrumbItem[];
  pageUrl?: string;
};

type PageData = SanityDocument<{
  pageSections?: SectionsType;
}>;

export default function PageSections({
  documentId,
  documentType,
  locale = 'th',
  sections: initialSections = [],
  settingsSocialLinks = [],
  globalCta,
  sharedTestimonialsSection = null,
  breadcrumbs,
  pageUrl,
}: PageSectionsProps) {
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

  if (!sections?.length) {
    return null;
  }

  const shouldRenderStandaloneBreadcrumbs =
    Boolean(breadcrumbs?.length) && sections[0]?._type !== 'contact';

  return (
    <div
      data-sanity={dataAttr({
        id: documentId,
        type: documentType,
        path: 'pageSections',
      })}
    >
      {shouldRenderStandaloneBreadcrumbs && breadcrumbs ? (
        <div className="mx-auto max-w-7xl px-6 pt-6 md:px-10">
          <Breadcrumbs items={breadcrumbs} locale={locale} />
        </div>
      ) : null}
      {sections?.map((section, index) => {
        const { _key, _type, ...sectionProps } = section;
        const SectionComponent = SECTION_COMPONENTS[_type];

        if (!SectionComponent) {
          return (
            <div
              key={_key}
              className="my-8 flex items-center justify-center rounded-lg bg-muted p-8 text-center text-muted-foreground"
            >
              Component not found for block type: <code>{_type}</code>
            </div>
          );
        }

        const shouldReveal = _type !== 'hero';
        const sectionElement =
          _type === 'cta' ? (
            <GlobalCtaSection
              cta={globalCta}
              locale={locale}
              socialLinks={settingsSocialLinks}
            />
          ) : _type === 'contact' ? (
            <SectionComponent
              section={sectionProps}
              settingsSocialLinks={settingsSocialLinks}
              sharedTestimonialsSection={sharedTestimonialsSection}
              breadcrumbs={
                index === 0 && breadcrumbs?.length
                  ? { items: breadcrumbs, locale }
                  : undefined
              }
              pageUrl={pageUrl}
            />
          ) : (
            <SectionComponent section={sectionProps} />
          );

        return (
          <div
            key={_key}
            data-sanity={dataAttr({
              id: documentId,
              type: documentType,
              path: `pageSections[_key=="${_key}"]`,
            })}
          >
            {shouldReveal ? (
              <Reveal delay={staggerDelay(index, 0.04, 0.2)}>
                {sectionElement}
              </Reveal>
            ) : (
              <SectionComponent section={sectionProps} />
            )}
          </div>
        );
      })}
    </div>
  );
}
