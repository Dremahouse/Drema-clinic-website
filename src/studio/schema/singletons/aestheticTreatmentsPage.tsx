import { DocumentIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { defaultFieldGroups } from '../config/fieldGroups';

const heroBackgroundFields = [
  defineField({
    name: 'alt',
    title: 'Alternative text',
    type: 'string',
    description: 'Important for SEO and accessibility.',
  }),
];

export default defineType({
  name: 'aestheticTreatmentsPage',
  title: 'Aesthetic Treatments Page',
  type: 'document',
  icon: DocumentIcon,
  groups: defaultFieldGroups,
  fields: [
    defineField({
      name: 'name',
      hidden: true,
      readOnly: true,
      type: 'string',
      initialValue: 'Aesthetic Treatments',
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
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'heroDescriptionEn',
      title: 'Hero Description (EN)',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description:
        'Default hero artwork fallback. If desktop/mobile hero images are uploaded below, the website will switch by screen size. Recommended landscape or roomy portrait composition with the subject centered.',
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
      hidden: true,
      description:
        'Optional desktop-only hero artwork. Recommended wide 3:2 or 16:10 composition. Minimum 1800 x 1200 px, recommended 2400 x 1600 px or larger. Leave safe margins around the subject for desktop crop.',
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
      hidden: true,
      description:
        'Optional mobile-only hero artwork. Recommended portrait 4:5 or 6:7. Minimum 1200 x 1500 px, recommended 1600 x 2000 px or larger. Keep important visual content away from the edges.',
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
        'Optional full-width desktop background for the services hero. Recommended 2400 x 1400 px, minimum 1920 x 1120 px. Keep the main text-safe area on the left 45% of the image and place the visual focus toward the center-right.',
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
        'Optional mobile background for the services hero. Recommended 1440 x 1800 px, minimum 1080 x 1350 px. Keep the top half clean for heading and intro text.',
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
      name: 'servicesHubComparisonRows',
      title: 'Comparison Rows',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'service', type: 'string' }),
            defineField({
              name: 'imageTh',
              title: 'Service Image (TH)',
              type: 'image',
              description:
                'Thai thumbnail shown in the popular services comparison table.',
              options: {
                hotspot: true,
                aiAssist: { imageDescriptionField: 'alt' },
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alternative text',
                  type: 'string',
                }),
              ],
            }),
            defineField({
              name: 'imageEn',
              title: 'Service Image (EN)',
              type: 'image',
              description:
                'English thumbnail shown in the comparison table. If empty, the website falls back to the Thai image.',
              options: {
                hotspot: true,
                aiAssist: { imageDescriptionField: 'alt' },
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alternative text',
                  type: 'string',
                }),
              ],
            }),
            defineField({ name: 'suitableForTh', type: 'text', rows: 2 }),
            defineField({ name: 'suitableForEn', type: 'text', rows: 2 }),
            defineField({ name: 'highlightTh', type: 'text', rows: 2 }),
            defineField({ name: 'highlightEn', type: 'text', rows: 2 }),
            defineField({ name: 'timelineTh', type: 'string' }),
            defineField({ name: 'timelineEn', type: 'string' }),
          ],
          preview: {
            select: {
              title: 'service',
              subtitle: 'suitableForTh',
              media: 'imageTh',
            },
          },
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'comparisonBackgroundImage',
      title: 'Comparison Background Image',
      type: 'image',
      description:
        'Optional full-section background image for the Compare Popular Services section on /services. The site displays this image without an overlay.',
      options: {
        hotspot: true,
        aiAssist: { imageDescriptionField: 'alt' },
      },
      fields: heroBackgroundFields,
      group: 'content',
    }),
    defineField({
      name: 'servicesHubProcessSteps',
      title: 'Process Steps',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'textTh', type: 'string' }),
            defineField({ name: 'textEn', type: 'string' }),
            defineField({
              name: 'imageTh',
              title: 'Process Step Image (TH)',
              type: 'image',
              description:
                'Thai image shown in this process card on the Services page. Recommended landscape 4:3 crop, 1200 x 900 px or larger.',
              options: { hotspot: true },
              fields: heroBackgroundFields,
            }),
            defineField({
              name: 'imageEn',
              title: 'Process Step Image (EN)',
              type: 'image',
              description:
                'English image shown in this process card. If empty, the website falls back to the Thai image.',
              options: { hotspot: true },
              fields: heroBackgroundFields,
            }),
          ],
          preview: {
            select: { title: 'textTh', subtitle: 'textEn', media: 'imageTh' },
          },
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'processBackgroundImage',
      title: 'Process Background Image',
      type: 'image',
      description:
        'Optional full-section background image for the Our Process section on /services. The site displays this image without an overlay.',
      options: {
        hotspot: true,
        aiAssist: { imageDescriptionField: 'alt' },
      },
      fields: heroBackgroundFields,
      group: 'content',
    }),
    defineField({
      name: 'featuredTreatmentsHeadingTh',
      title: 'Featured Treatments Heading (TH)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'featuredTreatmentsHeadingEn',
      title: 'Featured Treatments Heading (EN)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'featuredTreatmentsBackgroundImage',
      title: 'Featured Treatments Background Image',
      type: 'image',
      description:
        'Optional full-section background image for the Our Services section on /services. The site displays this image without an overlay. Recommended 2200 x 1400 px or larger with clean negative space.',
      options: {
        hotspot: true,
        aiAssist: { imageDescriptionField: 'alt' },
      },
      fields: heroBackgroundFields,
      group: 'content',
    }),
    defineField({
      name: 'featuredTreatmentsItems',
      title: 'Featured Treatments Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'titleTh', type: 'string' }),
            defineField({ name: 'titleEn', type: 'string' }),
            defineField({ name: 'summaryTh', type: 'text', rows: 2 }),
            defineField({ name: 'summaryEn', type: 'text', rows: 2 }),
            defineField({
              name: 'imageTh',
              title: 'Card Image (TH)',
              type: 'image',
              description:
                'Thai image shown on the right side of the featured service card. Recommended 900 x 900 px or larger.',
              options: { hotspot: true },
              fields: heroBackgroundFields,
            }),
            defineField({
              name: 'imageEn',
              title: 'Card Image (EN)',
              type: 'image',
              description:
                'English image shown on the right side of the featured service card. If empty, the website falls back to the Thai image.',
              options: { hotspot: true },
              fields: heroBackgroundFields,
            }),
            defineField({ name: 'link', type: 'link' }),
          ],
          preview: {
            select: { title: 'titleTh', subtitle: 'titleEn', media: 'imageTh' },
          },
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'whyChooseHeadingTh',
      title: 'Why Choose Heading (TH)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'whyChooseHeadingEn',
      title: 'Why Choose Heading (EN)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'whyChooseIntroTh',
      title: 'Why Choose Intro (TH)',
      type: 'text',
      rows: 4,
      description:
        'Intro paragraph shown in the Why Choose Drema Clinic section on /services.',
      group: 'content',
    }),
    defineField({
      name: 'whyChooseIntroEn',
      title: 'Why Choose Intro (EN)',
      type: 'text',
      rows: 4,
      description:
        'English intro paragraph shown in the Why Choose Drema Clinic section on /services.',
      group: 'content',
    }),
    defineField({
      name: 'whyChooseImage',
      title: 'Why Choose Image',
      type: 'image',
      description:
        'Image shown in the Why Choose Drema Clinic section. Recommended landscape 4:3 or 3:2 crop, minimum 1400 x 1000 px, with clean clinic/doctor/patient context.',
      options: {
        hotspot: true,
        aiAssist: { imageDescriptionField: 'alt' },
      },
      fields: [
        defineField({ name: 'alt', title: 'Alternative text', type: 'string' }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'whyChooseBackgroundImage',
      title: 'Why Choose Background Image',
      type: 'image',
      description:
        'Optional full-section background image for the Why Choose section on /services. The site displays this image without an overlay. Recommended 2200 x 1400 px or larger.',
      options: {
        hotspot: true,
        aiAssist: { imageDescriptionField: 'alt' },
      },
      fields: heroBackgroundFields,
      group: 'content',
    }),
    defineField({
      name: 'whyChoosePoints',
      title: 'Why Choose Points',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'textTh', type: 'string' }),
            defineField({ name: 'textEn', type: 'string' }),
          ],
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'byConcernHeadingTh',
      title: 'Treatment By Concern Heading (TH)',
      type: 'string',
      initialValue: 'เลือกบริการตามปัญหาที่ต้องการดูแล',
      group: 'content',
    }),
    defineField({
      name: 'byConcernHeadingEn',
      title: 'Treatment By Concern Heading (EN)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'byConcernIntroTh',
      title: 'Treatment By Concern Intro (TH)',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'byConcernIntroEn',
      title: 'Treatment By Concern Intro (EN)',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'byConcernBackgroundImage',
      title: 'Treatment By Concern Background Image',
      type: 'image',
      description:
        'Optional decorative background image for the "Choose by concern" section on /services. Recommended wide 16:9 or 3:2 image, 2200 x 1400 px or larger, with soft negative space so cards remain readable.',
      options: {
        hotspot: true,
        aiAssist: { imageDescriptionField: 'alt' },
      },
      fields: heroBackgroundFields,
      group: 'content',
    }),
    defineField({
      name: 'byConcernItems',
      title: 'Treatment By Concern Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'concernTh', type: 'string' }),
            defineField({ name: 'concernEn', type: 'string' }),
            defineField({
              name: 'image',
              title: 'Concern Card Image',
              type: 'image',
              description:
                'Image shown on the right side of this concern card. Recommended clean portrait or treatment visual, 900 x 620 px or larger.',
              options: {
                hotspot: true,
                aiAssist: { imageDescriptionField: 'alt' },
              },
              fields: heroBackgroundFields,
            }),
            defineField({
              name: 'treatmentsTh',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
            }),
            defineField({
              name: 'treatmentsEn',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
            }),
          ],
          preview: {
            select: {
              title: 'concernTh',
              subtitle: 'concernEn',
              media: 'image',
            },
          },
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'ctaHeadingTh',
      title: 'CTA Heading (TH)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'ctaHeadingEn',
      title: 'CTA Heading (EN)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'ctaTextTh',
      title: 'CTA Text (TH)',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'ctaTextEn',
      title: 'CTA Text (EN)',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'ctaBackgroundImage',
      title: 'CTA Background Image',
      type: 'image',
      description:
        'Optional background image for the consultation CTA block below Treatment By Concern. The site displays this image without an overlay.',
      options: {
        hotspot: true,
        aiAssist: { imageDescriptionField: 'alt' },
      },
      fields: heroBackgroundFields,
      group: 'content',
    }),
    defineField({
      name: 'ctaPrimaryTextTh',
      title: 'CTA Primary Button (TH)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'ctaPrimaryTextEn',
      title: 'CTA Primary Button (EN)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'ctaPrimaryLink',
      title: 'CTA Primary Link',
      type: 'link',
      group: 'content',
    }),
    defineField({
      name: 'citationSummaryTh',
      title: 'Summary (TH)',
      type: 'text',
      rows: 5,
      description:
        'Citation-ready Thai summary for the page. Use 2-3 factual sentences that explain the page clearly without hard-sell wording.',
      group: 'content',
    }),
    defineField({
      name: 'citationSummaryEn',
      title: 'Summary (EN)',
      type: 'text',
      rows: 5,
      description:
        'Citation-ready English summary for the page. Use 2-3 factual sentences for search and answer extraction.',
      group: 'content',
    }),
    defineField({
      title: 'SEO & Metadata',
      name: 'seo',
      type: 'seoMetaFields',
      group: 'seo',
    }),
  ],
});
