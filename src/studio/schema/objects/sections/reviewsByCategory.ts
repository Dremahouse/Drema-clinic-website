import { StarFilledIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'reviewsByCategory',
  type: 'object',
  icon: StarFilledIcon,
  title: 'Reviews by Category',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'category',
      title: 'Review Category',
      type: 'reference',
      to: [{ type: 'reviewCategory' }],
      options: { disableNew: false },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'numberOfReviews',
      title: 'Number of Reviews',
      type: 'number',
      initialValue: 6,
      validation: (rule) => rule.required().min(1).max(24),
    }),
    defineField({
      name: 'showViewAll',
      title: 'Show "View all" button',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});

