import { InlineIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import card from './card';

export default defineType({
  name: 'cardGrid',
  type: 'object',
  icon: InlineIcon,
  title: 'Card Grid',
  fields: [
    ...card.fields,
    defineField({
      name: 'backgroundImage',
      title: 'Section Background Image',
      type: 'image',
      description:
        'Optional full-section background image. The website displays this image without an overlay.',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alternative text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'cards',
      type: 'array',
      of: [card],
    }),
  ],
});
