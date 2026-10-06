import { DocumentTextIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'testimonials',
  title: 'Testimonials',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 3,
      description:
        'Short supporting copy under the section heading. Use this to explain that these are curated real customer reviews.',
    }),
    defineField({
      name: 'sourceBadgeLabel',
      title: 'Source Badge Label',
      type: 'string',
      description: 'Example: Google Reviews',
    }),
    defineField({
      name: 'viewAllLabel',
      title: 'View All Label',
      type: 'string',
      description: 'Example: View all reviews on Google',
    }),
    defineField({
      name: 'viewAllUrl',
      title: 'View All URL',
      type: 'url',
      description:
        'Link to the clinic Google Business reviews page or Maps listing.',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Section Background Image',
      type: 'image',
      description:
        'Optional full-section background image. The website displays this image without an overlay.',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alternative text' }),
      ],
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'testimonialItem',
          fields: [
            defineField({
              name: 'quote',
              type: 'text',
              title: 'Quote (Fallback)',
              rows: 4,
              description:
                'Fallback quote if localized fields are empty. You can keep this for backward compatibility.',
            }),
            defineField({
              name: 'quoteTh',
              title: 'Quote (TH)',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'quoteEn',
              title: 'Quote (EN)',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'sourceLabel',
              title: 'Source Label',
              type: 'string',
              description: 'Example: Google Review',
            }),
            defineField({
              name: 'rating',
              title: 'Rating',
              type: 'number',
              validation: (Rule) => Rule.min(1).max(5).precision(1),
              description:
                'Enter the review rating, usually 5 for a featured positive review.',
            }),
            defineField({
              name: 'reviewDate',
              title: 'Review Date',
              type: 'string',
              description: 'Example: Jan 2026 or 3 months ago',
            }),
            defineField({
              name: 'name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'tag', type: 'string' }),
            defineField({
              name: 'sourceUrl',
              title: 'Source URL',
              type: 'url',
              description:
                'Optional direct link to the original review source.',
            }),
            defineField({
              name: 'avatar',
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
            defineField({
              name: 'effects',
              title: 'Motion Effects',
              type: 'sectionEffects',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'sourceLabel',
              quoteTh: 'quoteTh',
              quoteEn: 'quoteEn',
              quote: 'quote',
              media: 'avatar',
              rating: 'rating',
            },
            prepare({
              title,
              subtitle,
              quoteTh,
              quoteEn,
              quote,
              media,
              rating,
            }) {
              const stars =
                typeof rating === 'number' && rating > 0
                  ? ` ${'★'.repeat(Math.round(rating))}`
                  : '';
              return {
                title: title || 'Untitled',
                subtitle: `${subtitle || quoteTh || quoteEn || quote || ''}${stars}`,
                media,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'effects',
      title: 'Motion Effects',
      type: 'sectionEffects',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Untitled', subtitle: 'Testimonials' };
    },
  },
});
