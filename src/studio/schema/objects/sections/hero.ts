import { DocumentTextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'hero',
  type: 'object',
  icon: DocumentTextIcon,
  title: 'Hero',
  fields: [
    defineField({
      name: 'kickerTh',
      title: 'Hero Kicker (TH)',
      type: 'string',
      initialValue: 'DREMA CLINIC',
    }),
    defineField({
      name: 'kickerEn',
      title: 'Hero Kicker (EN)',
      type: 'string',
      initialValue: 'DREMA CLINIC',
    }),
    defineField({
      name: 'headingTh',
      title: 'Hero Heading (TH)',
      type: 'text',
      rows: 4,
      description:
        'Main hero headline for Thai page. Line breaks are kept on the website.',
    }),
    defineField({
      name: 'headingEn',
      title: 'Hero Heading (EN)',
      type: 'text',
      rows: 4,
      description:
        'Main hero headline for English page. Line breaks are kept on the website.',
    }),
    defineField({
      name: 'textTh',
      title: 'Hero Description (TH)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'textEn',
      title: 'Hero Description (EN)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'primaryCtaTextTh',
      title: 'Primary CTA (TH)',
      type: 'string',
      initialValue: 'ปรึกษาแพทย์',
    }),
    defineField({
      name: 'primaryCtaTextEn',
      title: 'Primary CTA (EN)',
      type: 'string',
      initialValue: 'Consult a Doctor',
    }),
    defineField({
      name: 'primaryCtaLink',
      title: 'Primary CTA Link',
      type: 'link',
    }),
    defineField({
      name: 'secondaryCtaTextTh',
      title: 'Secondary CTA (TH)',
      type: 'string',
      initialValue: 'ดูบริการทั้งหมด',
    }),
    defineField({
      name: 'secondaryCtaTextEn',
      title: 'Secondary CTA (EN)',
      type: 'string',
      initialValue: 'View Services',
    }),
    defineField({
      name: 'secondaryCtaLink',
      title: 'Secondary CTA Link',
      type: 'link',
    }),
    defineField({
      name: 'heading',
      title: 'Legacy Heading',
      type: 'string',
      description:
        'Legacy fallback. Prefer Hero Heading (TH/EN) for the current homepage hero.',
    }),
    defineField({
      name: 'text',
      title: 'Legacy Text',
      type: 'blockContent',
      description:
        'Legacy fallback. Prefer Hero Description (TH/EN) for the current homepage hero.',
    }),
    defineField({
      name: 'image',
      title: 'Single image (fallback)',
      type: 'image',
      description:
        'Use a full hero background image similar to the author page. Recommended 2400 x 1400 px; keep text-safe space on the left and key visual on the right.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
    defineField({
      name: 'images',
      title: 'Hero slider images',
      type: 'array',
      description:
        'Optional full-background hero slides. Recommended 2400 x 1400 px. If one image is used, it behaves like the author-style background hero.',
      of: [
        defineField({
          name: 'item',
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: 'buttons',
      type: 'array',
      of: [{ type: 'button' }],
      validation: (Rule) => Rule.min(2).max(4),
    }),
    defineField({
      name: 'effects',
      title: 'Motion Effects',
      type: 'sectionEffects',
    }),
  ],
  preview: {
    select: {
      title: 'headingTh',
      fallbackTitle: 'heading',
      image: 'image',
      firstSliderImage: 'images.0',
    },
    prepare({ title, fallbackTitle, image, firstSliderImage }) {
      return {
        title: title || fallbackTitle || 'Untitled',
        content: 'Hero text',
        media: firstSliderImage || image || DocumentTextIcon,
      };
    },
  },
});
