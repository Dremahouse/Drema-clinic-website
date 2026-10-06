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
  name: 'pricingPage',
  title: 'Pricing Page',
  type: 'document',
  icon: DocumentIcon,
  groups: defaultFieldGroups,
  fields: [
    defineField({
      name: 'name',
      hidden: true,
      readOnly: true,
      type: 'string',
      initialValue: 'Pricing',
      group: 'content',
    }),
    defineField({
      name: 'heroEyebrowTh',
      title: 'Hero Eyebrow (TH)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'heroEyebrowEn',
      title: 'Hero Eyebrow (EN)',
      type: 'string',
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
      title: 'Hero Image Fallback',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
      group: 'content',
    }),
    defineField({
      name: 'heroImageDesktop',
      title: 'Hero Image Desktop',
      type: 'image',
      hidden: true,
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
      group: 'content',
    }),
    defineField({
      name: 'heroImageMobile',
      title: 'Hero Image Mobile / Tablet',
      type: 'image',
      hidden: true,
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
      group: 'content',
    }),
    defineField({
      name: 'heroBackgroundDesktop',
      title: 'Hero Background Desktop',
      type: 'image',
      description:
        'Optional full-width desktop background for the pricing hero. Recommended 2400 x 1400 px, minimum 1920 x 1120 px. Keep the main text-safe area on the left 45% of the image and place supporting visuals toward the center-right.',
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
        'Optional mobile background for the pricing hero. Recommended 1440 x 1800 px, minimum 1080 x 1350 px. Keep the top half clean for heading and intro text.',
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
      name: 'anchorNavHeadingTh',
      title: 'Anchor Navigation Heading (TH)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'anchorNavHeadingEn',
      title: 'Anchor Navigation Heading (EN)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'pricingSections',
      title: 'Pricing Sections',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'anchorId',
              title: 'Anchor ID',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'titleTh',
              title: 'Title (TH)',
              type: 'string',
            }),
            defineField({
              name: 'titleEn',
              title: 'Title (EN)',
              type: 'string',
            }),
            defineField({
              name: 'descriptionTh',
              title: 'Description (TH)',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'descriptionEn',
              title: 'Description (EN)',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'columnsTh',
              title: 'Table Columns (TH)',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
              initialValue: [
                'เมนู',
                'แพ็กเกจ/รายละเอียด',
                'ราคาโปรโมชัน',
                'จำนวน',
                'ราคาปกติ',
              ],
            }),
            defineField({
              name: 'columnsEn',
              title: 'Table Columns (EN)',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
              initialValue: [
                'Menu',
                'Package / Details',
                'Promo Price',
                'Quantity',
                'Regular Price',
              ],
            }),
            defineField({
              name: 'rows',
              title: 'Rows',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'menuTh',
                      title: 'Menu (TH)',
                      type: 'string',
                    }),
                    defineField({
                      name: 'menuEn',
                      title: 'Menu (EN)',
                      type: 'string',
                    }),
                    defineField({
                      name: 'packageTh',
                      title: 'Package/Detail (TH)',
                      type: 'string',
                    }),
                    defineField({
                      name: 'packageEn',
                      title: 'Package/Detail (EN)',
                      type: 'string',
                    }),
                    defineField({
                      name: 'promoPrice',
                      title: 'Promo Price',
                      type: 'string',
                    }),
                    defineField({
                      name: 'quantityTh',
                      title: 'Quantity (TH)',
                      type: 'string',
                    }),
                    defineField({
                      name: 'quantityEn',
                      title: 'Quantity (EN)',
                      type: 'string',
                    }),
                    defineField({
                      name: 'regularPrice',
                      title: 'Regular Price',
                      type: 'string',
                    }),
                    defineField({
                      name: 'noteTh',
                      title: 'Row Note (TH)',
                      type: 'string',
                    }),
                    defineField({
                      name: 'noteEn',
                      title: 'Row Note (EN)',
                      type: 'string',
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'menuTh',
                      subtitle: 'promoPrice',
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'titleTh',
              subtitle: 'titleEn',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'pricingNotesHeadingTh',
      title: 'Pricing Notes Heading (TH)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'pricingNotesHeadingEn',
      title: 'Pricing Notes Heading (EN)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'pricingNotesItems',
      title: 'Pricing Notes Items',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'textTh', title: 'Text (TH)', type: 'string' }),
            defineField({ name: 'textEn', title: 'Text (EN)', type: 'string' }),
          ],
          preview: {
            select: {
              title: 'textTh',
              subtitle: 'textEn',
            },
          },
        }),
      ],
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
      name: 'citationSummaryTh',
      title: 'Citation Summary (TH)',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'citationSummaryEn',
      title: 'Citation Summary (EN)',
      type: 'text',
      rows: 4,
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
