import { DocumentTextIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'technologyShowcase',
  title: 'Hero Technology Showcase',
  type: 'object',
  icon: DocumentTextIcon,
  initialValue: {
    heading: 'Technology Showcase',
    intro:
      'Discover our premium treatment technologies designed for precision, comfort, and natural-looking results.',
    featured: {
      label: 'Featured Technology',
      title: 'Ulthera Prime',
      subtitle: 'Advanced lifting & tightening technology',
    },
    sideItems: [
      {
        title: 'Sylfirm X',
        subtitle: 'Advanced Skin Regeneration',
      },
      {
        title: 'Emface Lift',
        subtitle: 'Non-invasive contouring innovation',
      },
    ],
    ctaText: 'View All Treatments',
    ctaLink: {
      type: 'external',
      external: '/treatments',
      href: '#',
      openInNewTab: false,
    },
  },
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      description:
        'Keep this short, ideally 3-6 words. This section works best with a concise editorial headline.',
      initialValue: 'Technology Showcase',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      type: 'text',
      description:
        'Recommended length: 1-2 short sentences. Avoid long paragraphs so the section stays minimal and image-led.',
      rows: 3,
      initialValue:
        'Discover our premium treatment technologies designed for precision, comfort, and natural-looking results.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Technology',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          type: 'string',
          description:
            'Optional short label above the featured technology name. Keep it to 1-3 words.',
          initialValue: 'Featured Technology',
        }),
        defineField({
          name: 'title',
          type: 'string',
          description:
            'Recommended: 1-3 words. This appears on top of the image and should stay compact.',
          initialValue: 'Ulthera Prime',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          type: 'string',
          description:
            'Recommended: short supporting line, around 4-8 words, so the overlay remains clean.',
          initialValue: 'Advanced lifting & tightening technology',
        }),
        defineField({
          name: 'image',
          type: 'image',
          description:
            'Recommended: landscape 4:3. Minimum 1600 x 1200 px, recommended 2000 x 1500 px or larger. Keep the device or subject centered with safe space around the edges for responsive crop. If possible, keep the lower-left area slightly darker or cleaner so the overlay text remains readable.',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative text',
              type: 'string',
            }),
          ],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'mobileImage',
          title: 'Mobile Image',
          type: 'image',
          description:
            'Optional mobile-specific image. Recommended: square 1:1 or portrait 4:5. Minimum 1200 x 1200 px, recommended 1600 x 1600 px or 1600 x 2000 px. Keep the device centered and leave safe space around the edges for mobile crop.',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sideItems',
      title: 'Side Technologies',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'sideTechnology',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              description:
                'Recommended: 1-3 words. Keep side card titles compact for a minimal overlay.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              type: 'string',
              description:
                'Optional short supporting line, ideally under 8 words.',
            }),
            defineField({
              name: 'image',
              type: 'image',
              description:
                'Recommended: landscape 4:3. Minimum 1200 x 900 px, recommended 1600 x 1200 px or larger. Keep the device or key visual centered because the card may crop slightly on different screen sizes. If possible, leave one lower corner slightly calmer or darker for text readability.',
              options: { hotspot: true },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alternative text',
                  type: 'string',
                }),
              ],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'mobileImage',
              title: 'Mobile Image',
              type: 'image',
              description:
                'Optional mobile-specific image. Recommended: square 1:1. Minimum 1200 x 1200 px, recommended 1600 x 1600 px or larger. Keep the device centered because the card becomes more compact on small screens.',
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
            select: {
              title: 'title',
              subtitle: 'subtitle',
              media: 'image',
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(2).max(2),
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      description:
        'Recommended: 2-4 words. Keep the CTA understated to match the minimal section style.',
      initialValue: 'View All Treatments',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'link',
    }),
    defineField({
      name: 'effects',
      title: 'Motion Effects',
      type: 'sectionEffects',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'featured.image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Hero Technology Showcase',
        media,
      };
    },
  },
});
