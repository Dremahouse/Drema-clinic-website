import { DocumentTextIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'services',
  title: 'Services',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'intro', type: 'text', rows: 3 }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'serviceItem',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'summary', type: 'text', rows: 3 }),
            defineField({
              name: 'image',
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
            defineField({ name: 'link', type: 'link' }),
            defineField({
              name: 'effects',
              title: 'Motion Effects',
              type: 'sectionEffects',
            }),
          ],
          preview: {
            select: { title: 'title', media: 'image' },
            prepare({ title, media }) {
              return { title: title || 'Untitled', media };
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
      return { title: title || 'Untitled', subtitle: 'Services' };
    },
  },
});
