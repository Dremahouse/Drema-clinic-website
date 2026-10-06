import { TagIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { defaultFieldGroups } from '../config/fieldGroups';

export default defineType({
  name: 'promotionItem',
  title: 'Promotion Items',
  type: 'document',
  icon: TagIcon,
  groups: defaultFieldGroups,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'titleEn',
      title: 'Title (EN)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      initialValue: 'Promotion',
      group: 'content',
    }),
    defineField({
      name: 'badgeEn',
      title: 'Badge (EN)',
      type: 'string',
      initialValue: 'Promotion',
      group: 'content',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'summaryEn',
      title: 'Summary (EN)',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'text',
      rows: 5,
      group: 'content',
    }),
    defineField({
      name: 'detailsEn',
      title: 'Details (EN)',
      type: 'text',
      rows: 5,
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      description:
        'Recommended: vertical 6:7 image, at least 1200 x 1400 px. Best results around 1500 x 1750 px or larger. Keep the main subject centered because the frontend uses fixed 6:7 crop.',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'priceLabel',
      title: 'Price Label',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'priceLabelEn',
      title: 'Price Label (EN)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'originalPrice',
      title: 'Original Price',
      type: 'string',
      hidden: ({ document }) =>
        Array.isArray((document as { priceOptions?: unknown[] } | undefined)?.priceOptions) &&
        ((document as { priceOptions?: unknown[] } | undefined)?.priceOptions?.length || 0) > 0,
      group: 'content',
    }),
    defineField({
      name: 'originalPriceEn',
      title: 'Original Price (EN)',
      type: 'string',
      hidden: ({ document }) =>
        Array.isArray((document as { priceOptions?: unknown[] } | undefined)?.priceOptions) &&
        ((document as { priceOptions?: unknown[] } | undefined)?.priceOptions?.length || 0) > 0,
      group: 'content',
    }),
    defineField({
      name: 'promoPrice',
      title: 'Promo Price',
      type: 'string',
      hidden: ({ document }) =>
        Array.isArray((document as { priceOptions?: unknown[] } | undefined)?.priceOptions) &&
        ((document as { priceOptions?: unknown[] } | undefined)?.priceOptions?.length || 0) > 0,
      group: 'content',
    }),
    defineField({
      name: 'promoPriceEn',
      title: 'Promo Price (EN)',
      type: 'string',
      hidden: ({ document }) =>
        Array.isArray((document as { priceOptions?: unknown[] } | undefined)?.priceOptions) &&
        ((document as { priceOptions?: unknown[] } | undefined)?.priceOptions?.length || 0) > 0,
      group: 'content',
    }),
    defineField({
      name: 'priceOptions',
      title: 'Price Options',
      type: 'array',
      description:
        'Use this when one promotion has multiple package sizes or pricing options. If empty, the single price fields above will be used.',
      of: [
        defineField({
          name: 'priceOption',
          title: 'Price Option',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Option Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'labelEn',
              title: 'Option Label (EN)',
              type: 'string',
            }),
            defineField({
              name: 'promoPrice',
              title: 'Promo Price',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'promoPriceEn',
              title: 'Promo Price (EN)',
              type: 'string',
            }),
            defineField({
              name: 'originalPrice',
              title: 'Original Price',
              type: 'string',
            }),
            defineField({
              name: 'originalPriceEn',
              title: 'Original Price (EN)',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'label',
              titleEn: 'labelEn',
              promoPrice: 'promoPrice',
              promoPriceEn: 'promoPriceEn',
            },
            prepare({ title, titleEn, promoPrice, promoPriceEn }) {
              return {
                title: title || titleEn || 'Price option',
                subtitle: promoPrice || promoPriceEn || '',
              };
            },
          },
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      initialValue: 'ปรึกษาโปรแกรมนี้',
      group: 'content',
    }),
    defineField({
      name: 'ctaTextEn',
      title: 'CTA Text (EN)',
      type: 'string',
      initialValue: 'Ask About This Program',
      group: 'content',
    }),
    defineField({
      name: 'lineDestination',
      title: 'Preferred LINE Destination',
      type: 'string',
      description:
        'Used when CTA Link is empty. The button will use the selected branch LINE from Settings > Social Links.',
      initialValue: 'default',
      options: {
        list: [
          { title: 'Default / Global LINE', value: 'default' },
          { title: 'Town in Town', value: 'town_in_town' },
          { title: 'Emporium / Phrom Phong', value: 'emporium' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      group: 'content',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'link',
      description:
        'Optional override. Leave empty to automatically use the selected LINE destination.',
      group: 'content',
    }),
    defineField({
      name: 'terms',
      title: 'Terms',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'content',
    }),
    defineField({
      name: 'termsEn',
      title: 'Terms (EN)',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'content',
    }),
    defineField({
      name: 'doctorNote',
      title: 'Doctor Note',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'doctorNoteEn',
      title: 'Doctor Note (EN)',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 100,
      group: 'content',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Promotion',
      type: 'boolean',
      initialValue: false,
      group: 'content',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      group: 'content',
    }),
    defineField({
      name: 'startAt',
      title: 'Start Date',
      type: 'datetime',
      group: 'content',
    }),
    defineField({
      name: 'endAt',
      title: 'End Date',
      type: 'datetime',
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      active: 'isActive',
      featured: 'isFeatured',
      lineDestination: 'lineDestination',
      endAt: 'endAt',
    },
    prepare({ title, media, active, featured, lineDestination, endAt }) {
      const destinationLabel =
        lineDestination === 'town_in_town'
          ? 'Town in Town LINE'
          : lineDestination === 'emporium'
            ? 'Emporium LINE'
            : 'Default LINE';
      const status = [
        active ? 'Active' : 'Inactive',
        featured ? 'Featured' : null,
        destinationLabel,
        endAt || null,
      ]
        .filter(Boolean)
        .join(' • ');

      return {
        title: title || 'Untitled promotion',
        subtitle: status,
        media,
      };
    },
  },
});
