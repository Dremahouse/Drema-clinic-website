import { DocumentIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { defaultFieldGroups } from '../config/fieldGroups';

const serviceSeoSlugs = new Set([
  'filler',
  'botox',
  'thread-lift',
  'technology-devices',
  'skin-booster-biostimulator',
  'facial-concerns',
]);

const isServiceSeoDocument = (document: unknown) => {
  const slug = (document as { slug?: string | { current?: string } })?.slug;
  return serviceSeoSlugs.has(
    typeof slug === 'string' ? slug : slug?.current || ''
  );
};

const hideForServiceSeo = ({ document }: { document?: unknown }) =>
  isServiceSeoDocument(document);

const bilingualTextItem = (
  name: string,
  title: string,
  hidden?: ({ document }: { document?: unknown }) => boolean
) =>
  defineField({
    name,
    title,
    hidden,
    type: 'array',
    of: [
      defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'textTh', title: 'Text (TH)', type: 'string' }),
          defineField({ name: 'textEn', title: 'Text (EN)', type: 'string' }),
        ],
        preview: {
          select: { title: 'textTh', subtitle: 'textEn' },
        },
      }),
    ],
    group: 'content',
  });

const bilingualTextImageItem = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [
      defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'textTh', title: 'Text (TH)', type: 'string' }),
          defineField({ name: 'textEn', title: 'Text (EN)', type: 'string' }),
          defineField({
            name: 'descriptionTh',
            title: 'Description (TH)',
            type: 'text',
            rows: 2,
          }),
          defineField({
            name: 'descriptionEn',
            title: 'Description (EN)',
            type: 'text',
            rows: 2,
          }),
          defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            fields: [
              defineField({
                name: 'alt',
                title: 'Alternative text',
                type: 'string',
              }),
            ],
          }),
        ],
        preview: {
          select: { title: 'textTh', subtitle: 'textEn', media: 'image' },
        },
      }),
    ],
    group: 'content',
  });

const bilingualFaqItem = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [
      defineArrayMember({
        type: 'object',
        fields: [
          defineField({
            name: 'questionTh',
            title: 'Question (TH)',
            type: 'string',
          }),
          defineField({
            name: 'questionEn',
            title: 'Question (EN)',
            type: 'string',
          }),
          defineField({
            name: 'answerTh',
            title: 'Answer (TH)',
            type: 'text',
            rows: 3,
          }),
          defineField({
            name: 'answerEn',
            title: 'Answer (EN)',
            type: 'text',
            rows: 3,
          }),
        ],
        preview: {
          select: { title: 'questionTh', subtitle: 'questionEn' },
        },
      }),
    ],
    group: 'content',
  });

const heroBackgroundFields = [
  defineField({
    name: 'alt',
    title: 'Alternative text',
    type: 'string',
    description: 'Important for SEO and accessibility.',
  }),
];

const sectionBackgroundImage = (
  name: string,
  title: string,
  description?: string,
  hidden?: ({ document }: { document?: unknown }) => boolean
) =>
  defineField({
    name,
    title,
    hidden,
    type: 'image',
    description:
      description ||
      'Optional full-width background image for this section. Use a subtle image with enough contrast for text and cards.',
    options: { hotspot: true },
    fields: heroBackgroundFields,
    group: 'content',
  });

const sectionBackgroundPositionFields = (
  xName: string,
  yName: string,
  titlePrefix: string,
  hidden?: ({ document }: { document?: unknown }) => boolean,
  imageFieldName?: string
) => [
  defineField({
    name: xName,
    title: `${titlePrefix} Background X Position`,
    hidden: imageFieldName
      ? ({ parent }: { parent?: Record<string, unknown> }) =>
          !(
            (parent as Record<string, unknown>)?.[imageFieldName] as
              | { asset?: string }
              | undefined
          )?.asset || (hidden ? hidden({ document: parent as unknown }) : false)
      : hidden,
    type: 'number',
    description: '0 = left, 50 = center, 100 = right.',
    initialValue: 50,
    validation: (Rule) => Rule.min(0).max(100),
    group: 'content',
  }),
  defineField({
    name: yName,
    title: `${titlePrefix} Background Y Position`,
    hidden: imageFieldName
      ? ({ parent }: { parent?: Record<string, unknown> }) =>
          !(
            (parent as Record<string, unknown>)?.[imageFieldName] as
              | { asset?: string }
              | undefined
          )?.asset || (hidden ? hidden({ document: parent as unknown }) : false)
      : hidden,
    type: 'number',
    description: '0 = top, 50 = center, 100 = bottom.',
    initialValue: 50,
    validation: (Rule) => Rule.min(0).max(100),
    group: 'content',
  }),
];

export default defineType({
  name: 'servicePage',
  title: 'Service Pages',
  type: 'document',
  icon: DocumentIcon,
  groups: defaultFieldGroups,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 200 },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'heroHeadingTh',
      title: 'Hero Heading (TH)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'heroHeadingEn',
      title: 'Hero Heading (EN)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'heroDescriptionTh',
      title: 'Hero Description (TH)',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'heroDescriptionEn',
      title: 'Hero Description (EN)',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description:
        'Default hero artwork fallback. If desktop/mobile hero images are uploaded below, the website will switch by screen size. Recommended landscape or roomy portrait composition with a centered subject.',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alternative text', type: 'string' }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'heroImageDesktop',
      title: 'Hero Image Desktop',
      type: 'image',
      description:
        'Optional desktop-only hero artwork. Recommended wide 16:10 or 3:2 composition. Minimum 1800 x 1200 px, recommended 2400 x 1600 px or larger. Leave safe space around the main subject because desktop crop is wider.',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alternative text', type: 'string' }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'heroImageMobile',
      title: 'Hero Image Mobile',
      type: 'image',
      description:
        'Optional mobile-only hero artwork. Recommended portrait 4:5 or 6:7. Minimum 1200 x 1500 px, recommended 1600 x 2000 px or larger. Keep the subject centered and avoid text near the edges.',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alternative text', type: 'string' }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'heroBackgroundDesktop',
      title: 'Hero Background Desktop',
      type: 'image',
      description:
        'Optional full-width desktop background for the service page hero. Recommended 2400 x 1400 px, minimum 1920 x 1120 px. Keep the main text-safe area on the left 45% of the image and place the visual focus toward the center-right.',
      options: {
        hotspot: true,
        aiAssist: { imageDescriptionField: 'alt' },
      },
      fields: heroBackgroundFields,
      group: 'content',
    }),
    defineField({
      name: 'heroBackgroundMobile',
      title: 'Hero Background Mobile',
      type: 'image',
      description:
        'Optional mobile background for the service page hero. Recommended 1440 x 1800 px, minimum 1080 x 1350 px. Keep the top half clean for heading and intro text.',
      options: {
        hotspot: true,
        aiAssist: { imageDescriptionField: 'alt' },
      },
      fields: heroBackgroundFields,
      group: 'content',
    }),
    defineField({
      name: 'heroPrimaryCtaTextTh',
      title: 'Hero Primary CTA Text (TH)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'heroPrimaryCtaTextEn',
      title: 'Hero Primary CTA Text (EN)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'heroPrimaryCtaLink',
      title: 'Hero Primary CTA Link',
      type: 'link',
      group: 'content',
    }),
    defineField({
      name: 'heroSecondaryCtaTextTh',
      title: 'Hero Secondary CTA Text (TH)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'heroSecondaryCtaTextEn',
      title: 'Hero Secondary CTA Text (EN)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'heroSecondaryCtaLink',
      title: 'Hero Secondary CTA Link',
      type: 'link',
      group: 'content',
    }),
    defineField({
      name: 'quickAnswerTitleTh',
      title: 'Quick Answer Title (TH)',
      type: 'string',
      group: 'content',
      description:
        'Heading shown in the Key Facts / quick answer panel on Thai service pages.',
    }),
    defineField({
      name: 'quickAnswerTitleEn',
      title: 'Quick Answer Title (EN)',
      type: 'string',
      group: 'content',
      description:
        'Heading shown in the Key Facts / quick answer panel on English service pages.',
    }),
    bilingualTextItem('keyFactsItems', 'Key Facts Items'),
    defineField({
      name: 'whatIsHeadingTh',
      title: 'What Is Heading (TH)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'whatIsHeadingEn',
      title: 'What Is Heading (EN)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'whatIsEyebrowTh',
      title: 'What Is Eyebrow (TH)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'whatIsEyebrowEn',
      title: 'What Is Eyebrow (EN)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'whatIsSubtitleTh',
      title: 'What Is Subtitle (TH)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'whatIsSubtitleEn',
      title: 'What Is Subtitle (EN)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'whatIsBodyTh',
      title: 'What Is Body (TH)',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'whatIsBodyEn',
      title: 'What Is Body (EN)',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'whatIsBackgroundImage',
      title: 'What Is Background Image',
      type: 'image',
      options: { hotspot: true },
      fields: heroBackgroundFields,
      group: 'content',
    }),
    ...sectionBackgroundPositionFields(
      'whatIsBackgroundPositionX',
      'whatIsBackgroundPositionY',
      'What Is',
      undefined,
      'whatIsBackgroundImage'
    ),
    sectionBackgroundImage(
      'whatIsSectionBackgroundImage',
      'What Is Section Background',
      'Optional full-width background image behind the What Is card. This controls the section background outside the card itself.'
    ),
    ...sectionBackgroundPositionFields(
      'whatIsSectionBackgroundPositionX',
      'whatIsSectionBackgroundPositionY',
      'What Is Section',
      undefined,
      'whatIsSectionBackgroundImage'
    ),
    defineField({
      name: 'whatIsSuitableHeadingTh',
      title: 'Suitable For Heading (TH)',
      hidden: hideForServiceSeo,
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'whatIsSuitableHeadingEn',
      title: 'Suitable For Heading (EN)',
      hidden: hideForServiceSeo,
      type: 'string',
      group: 'content',
    }),
    bilingualTextItem(
      'whatIsSuitableItems',
      'Suitable For Items',
      hideForServiceSeo
    ),
    defineField({
      name: 'concernsHeadingTh',
      title: 'Concerns Heading (TH)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'concernsHeadingEn',
      title: 'Concerns Heading (EN)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'concernsEyebrowTh',
      title: 'Concerns Eyebrow (TH)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'concernsEyebrowEn',
      title: 'Concerns Eyebrow (EN)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'concernsSubtitleTh',
      title: 'Concerns Subtitle (TH)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'concernsSubtitleEn',
      title: 'Concerns Subtitle (EN)',
      type: 'string',
      group: 'content',
    }),
    bilingualTextImageItem('concernsItems', 'Concerns Items'),
    sectionBackgroundImage(
      'definitionProblemsBackgroundImage',
      'Concerns Section Background'
    ),
    ...sectionBackgroundPositionFields(
      'definitionProblemsBackgroundPositionX',
      'definitionProblemsBackgroundPositionY',
      'Concerns',
      undefined,
      'definitionProblemsBackgroundImage'
    ),
    defineField({
      name: 'injectionAreasHeadingTh',
      title: 'Injection Areas Heading (TH)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'injectionAreasHeadingEn',
      title: 'Injection Areas Heading (EN)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'injectionAreasEyebrowTh',
      title: 'Injection Areas Eyebrow (TH)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'injectionAreasEyebrowEn',
      title: 'Injection Areas Eyebrow (EN)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'injectionAreasSubtitleTh',
      title: 'Injection Areas Subtitle (TH)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'injectionAreasSubtitleEn',
      title: 'Injection Areas Subtitle (EN)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'injectionAreasItems',
      title: 'Injection Areas Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'textTh', title: 'Text (TH)', type: 'string' }),
            defineField({ name: 'textEn', title: 'Text (EN)', type: 'string' }),
            defineField({
              name: 'image',
              title: 'Card Image',
              type: 'image',
              description: 'Optional image shown at the top of this card.',
              options: { hotspot: true },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alternative text',
                  type: 'string',
                }),
              ],
            }),
            defineField({
              name: 'iconImage',
              title: 'Card Icon',
              type: 'image',
              description:
                'Optional custom icon for this card. Recommended square transparent PNG/SVG-like artwork.',
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alternative text',
                  type: 'string',
                }),
              ],
            }),
            defineField({
              name: 'startingPriceTh',
              title: 'Starting Price (TH)',
              type: 'string',
              description:
                'Price text shown under the card title for Thai pages. Example: 9,990.-',
            }),
            defineField({
              name: 'startingPriceEn',
              title: 'Starting Price (EN)',
              type: 'string',
              description:
                'Price text shown under the card title for English pages. Example: 9,990 THB',
            }),
            defineField({
              name: 'startingPriceTextColor',
              title: 'Starting Price Text Color',
              type: 'string',
              description:
                'Optional CSS color for this price text. Example: #b8874f, rgb(184,135,79), or var(--marketing-brand).',
            }),
            defineField({
              name: 'link',
              title: 'Link (Optional)',
              type: 'link',
            }),
          ],
          preview: {
            select: { title: 'textTh', subtitle: 'textEn', media: 'iconImage' },
          },
        }),
      ],
      group: 'content',
    }),
    sectionBackgroundImage(
      'injectionAreasBackgroundImage',
      'Injection Areas Section Background'
    ),
    ...sectionBackgroundPositionFields(
      'injectionAreasBackgroundPositionX',
      'injectionAreasBackgroundPositionY',
      'Injection Areas',
      undefined,
      'injectionAreasBackgroundImage'
    ),
    defineField({
      name: 'highlightsHeadingTh',
      title: 'Highlights Heading (TH)',
      hidden: hideForServiceSeo,
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'highlightsHeadingEn',
      title: 'Highlights Heading (EN)',
      hidden: hideForServiceSeo,
      type: 'string',
      group: 'content',
    }),
    bilingualTextItem('highlightsItems', 'Highlights Items', hideForServiceSeo),
    defineField({
      name: 'brandsHeadingTh',
      title: 'Brands Heading (TH)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'brandsHeadingEn',
      title: 'Brands Heading (EN)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'brandsIntroTh',
      title: 'Brands Intro (TH)',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'brandsIntroEn',
      title: 'Brands Intro (EN)',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'brandsItems',
      title: 'Brands Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'textTh', title: 'Text (TH)', type: 'string' }),
            defineField({ name: 'textEn', title: 'Text (EN)', type: 'string' }),
            defineField({
              name: 'logoImage',
              title: 'Brand Logo',
              type: 'image',
              description:
                'Optional brand logo shown in the filler brand section.',
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alternative text',
                  type: 'string',
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'textTh',
              subtitle: 'textEn',
              media: 'logoImage',
            },
          },
        }),
      ],
      group: 'content',
    }),
    sectionBackgroundImage(
      'highlightsBrandsBackgroundImage',
      'Brands Section Background'
    ),
    ...sectionBackgroundPositionFields(
      'highlightsBrandsBackgroundPositionX',
      'highlightsBrandsBackgroundPositionY',
      'Brands',
      undefined,
      'highlightsBrandsBackgroundImage'
    ),
    defineField({
      name: 'stepsHeadingTh',
      title: 'Steps Heading (TH)',
      hidden: hideForServiceSeo,
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'stepsHeadingEn',
      title: 'Steps Heading (EN)',
      hidden: hideForServiceSeo,
      type: 'string',
      group: 'content',
    }),
    bilingualTextItem('stepsItems', 'Steps Items', hideForServiceSeo),
    defineField({
      name: 'aftercareHeadingTh',
      title: 'Aftercare Heading (TH)',
      hidden: hideForServiceSeo,
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'aftercareHeadingEn',
      title: 'Aftercare Heading (EN)',
      hidden: hideForServiceSeo,
      type: 'string',
      group: 'content',
    }),
    bilingualTextItem('aftercareItems', 'Aftercare Items', hideForServiceSeo),
    defineField({
      name: 'whyDremaHeadingTh',
      title: 'Why Drema Heading (TH)',
      hidden: hideForServiceSeo,
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'whyDremaHeadingEn',
      title: 'Why Drema Heading (EN)',
      hidden: hideForServiceSeo,
      type: 'string',
      group: 'content',
    }),
    bilingualTextItem('whyDremaItems', 'Why Drema Items', hideForServiceSeo),
    bilingualFaqItem('faqItems', 'FAQ Items'),
    sectionBackgroundImage('faqBackgroundImage', 'FAQ Section Background'),
    ...sectionBackgroundPositionFields(
      'faqBackgroundPositionX',
      'faqBackgroundPositionY',
      'FAQ',
      undefined,
      'faqBackgroundImage'
    ),
    sectionBackgroundImage(
      'relatedLinksBackgroundImage',
      'Related Links Section Background'
    ),
    ...sectionBackgroundPositionFields(
      'relatedLinksBackgroundPositionX',
      'relatedLinksBackgroundPositionY',
      'Related Links',
      undefined,
      'relatedLinksBackgroundImage'
    ),
    sectionBackgroundImage(
      'keyFactsBackgroundImage',
      'Key Facts Section Background',
      undefined,
      hideForServiceSeo
    ),
    ...sectionBackgroundPositionFields(
      'keyFactsBackgroundPositionX',
      'keyFactsBackgroundPositionY',
      'Key Facts',
      hideForServiceSeo,
      'keyFactsBackgroundImage'
    ),
    sectionBackgroundImage(
      'processAftercareBackgroundImage',
      'Process and Aftercare Section Background',
      undefined,
      () => true
    ),
    ...sectionBackgroundPositionFields(
      'processAftercareBackgroundPositionX',
      'processAftercareBackgroundPositionY',
      'Process and Aftercare',
      () => true
    ),
    sectionBackgroundImage(
      'suitableWhyBackgroundImage',
      'Suitable and Why Drema Section Background',
      undefined,
      () => true
    ),
    ...sectionBackgroundPositionFields(
      'suitableWhyBackgroundPositionX',
      'suitableWhyBackgroundPositionY',
      'Suitable and Why Drema',
      () => true
    ),
    defineField({
      name: 'citationSummaryTh',
      title: 'Citation Summary (TH)',
      hidden: hideForServiceSeo,
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'citationSummaryEn',
      title: 'Citation Summary (EN)',
      hidden: hideForServiceSeo,
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'ctaHeadingTh',
      title: 'CTA Heading (TH)',
      hidden: true,
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'ctaHeadingEn',
      title: 'CTA Heading (EN)',
      hidden: true,
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'ctaTextTh',
      title: 'CTA Text (TH)',
      hidden: true,
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'ctaTextEn',
      title: 'CTA Text (EN)',
      hidden: true,
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'ctaPrimaryTextTh',
      title: 'CTA Primary Text (TH)',
      hidden: true,
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'ctaPrimaryTextEn',
      title: 'CTA Primary Text (EN)',
      hidden: true,
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'ctaPrimaryLink',
      title: 'CTA Primary Link',
      hidden: true,
      type: 'link',
      group: 'content',
    }),
    defineField({
      name: 'ctaSecondaryTextTh',
      title: 'CTA Secondary Text (TH)',
      hidden: true,
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'ctaSecondaryTextEn',
      title: 'CTA Secondary Text (EN)',
      hidden: true,
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'ctaSecondaryLink',
      title: 'CTA Secondary Link',
      hidden: true,
      type: 'link',
      group: 'content',
    }),
    defineField({
      title: 'SEO & Metadata',
      name: 'seo',
      type: 'seoMetaFields',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
      media: 'heroImage',
    },
  },
});
