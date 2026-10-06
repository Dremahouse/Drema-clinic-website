import { InlineIcon } from '@sanity/icons';
import { defineField } from 'sanity';

export default defineField({
  name: 'card',
  type: 'object',
  icon: InlineIcon,
  title: 'Card',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      description: 'Legacy fallback. Prefer Heading TH / Heading EN below.',
    }),
    defineField({
      name: 'headingTh',
      title: 'Heading (TH)',
      type: 'string',
    }),
    defineField({
      name: 'headingEn',
      title: 'Heading (EN)',
      type: 'string',
    }),
    defineField({
      name: 'content',
      type: 'blockContent',
      description: 'Legacy fallback. Prefer Content TH / Content EN below.',
    }),
    defineField({
      name: 'contentTh',
      title: 'Content (TH)',
      type: 'blockContent',
    }),
    defineField({
      name: 'contentEn',
      title: 'Content (EN)',
      type: 'blockContent',
    }),
    defineField({
      name: 'image',
      title: 'Card Image',
      type: 'image',
      description:
        'Optional image for premium card layouts. Recommended 900 x 540 px or wider.',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alternative text', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      headingTh: 'headingTh',
      headingEn: 'headingEn',
      media: 'image',
      icon: 'icon',
    },
    prepare({ heading, headingTh, headingEn, media }) {
      return {
        title: headingTh || headingEn || heading || 'Untitled',
        media,
      };
    },
  },
});
