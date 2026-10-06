import { BulbOutlineIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
    }),
    defineField({
      name: 'buttons',
      type: 'array',
      of: [{ type: 'button' }],
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
    },
    prepare(selection) {
      const { title } = selection;

      return {
        title: title,
        subtitle: 'Call to Action',
      };
    },
  },
});
