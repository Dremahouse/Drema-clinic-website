import { DocumentTextIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'pricing',
  title: 'Pricing',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'note', type: 'text', rows: 3 }),
    defineField({
      name: 'plans',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'planItem',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'price',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'highlight',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'features',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
            }),
            defineField({ name: 'cta', type: 'button' }),
            defineField({
              name: 'effects',
              title: 'Motion Effects',
              type: 'sectionEffects',
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'price' },
            prepare({ title, subtitle }) {
              return { title: title || 'Untitled', subtitle };
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
      return { title: title || 'Untitled', subtitle: 'Pricing' };
    },
  },
});
