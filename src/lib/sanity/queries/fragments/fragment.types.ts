import type {
  GetPageQueryResult,
  PostQueryResult,
  PostsArchiveQueryResult,
} from '@/sanity.types';

export type PostCardFragmentType = NonNullable<
  PostsArchiveQueryResult['results'][number]
>;
export type PostFragmentType = NonNullable<PostQueryResult>;
export type PersonFragmentType = NonNullable<PostFragmentType['author']>;
export type CategoryFragmentType = NonNullable<
  PostFragmentType['categories']
>[number];

export type PageFragmentType = NonNullable<GetPageQueryResult>;
export type SeoFragmentType = NonNullable<PageFragmentType['seo']>;

export type SectionsType = PageFragmentType['pageSections'];
export type SectionType = NonNullable<SectionsType>[number];

export type HeroSectionFragmentType = Extract<SectionType, { _type: 'hero' }>;
export type IntroductionSectionFragmentType = Extract<
  SectionType,
  { _type: 'introduction' }
>;
export type ServicesSectionFragmentType = Extract<
  SectionType,
  { _type: 'services' }
>;
export type TechnologyShowcaseSectionFragmentType = Extract<
  SectionType,
  { _type: 'technologyShowcase' }
>;
export type GallerySectionFragmentType = Extract<
  SectionType,
  { _type: 'gallery' }
>;
export type BenefitsSectionFragmentType = Extract<
  SectionType,
  { _type: 'benefits' }
>;
export type AboutDoctorSectionFragmentType = Extract<
  SectionType,
  { _type: 'aboutDoctor' }
>;
export type TestimonialsSectionFragmentType = Extract<
  SectionType,
  { _type: 'testimonials' }
>;
export type PricingSectionFragmentType = Extract<
  SectionType,
  { _type: 'pricing' }
>;
export type FaqSectionFragmentType = Extract<SectionType, { _type: 'faq' }>;
export type ContactSectionFragmentType = Extract<
  SectionType,
  { _type: 'contact' }
>;
export type CardGridSectionFragmentType = Extract<
  SectionType,
  { _type: 'cardGrid' }
>;
export type CtaSectionFragmentType = Extract<SectionType, { _type: 'cta' }>;
export type DividerSectionFragmentType = Extract<
  SectionType,
  { _type: 'divider' }
>;
export type MediaTextSectionFragmentType = Extract<
  SectionType,
  { _type: 'mediaText' }
>;
export type PostListSectionFragmentType = Extract<
  SectionType,
  { _type: 'postList' }
>;
export type SubscribeSectionFragmentType = Extract<
  SectionType,
  { _type: 'subscribe' }
>;
export type ReviewsByCategorySectionFragmentType = Extract<
  SectionType,
  { _type: 'reviewsByCategory' }
>;

export type ButtonFragmentType = NonNullable<
  HeroSectionFragmentType['buttons']
>[number];
export type CardFragmentType = NonNullable<
  CardGridSectionFragmentType['cards']
>[number];
export type LinkFragmentType = NonNullable<ButtonFragmentType['link']>;
