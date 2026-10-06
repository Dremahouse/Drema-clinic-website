import { MenuIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'megaMenuGroup',
  title: 'Mega Menu Group',
  type: 'object',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'titleTh',
      title: 'Group Title (TH)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Group Title (EN)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Links',
      type: 'array',
      of: [{ type: 'megaMenuLinkItem' }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      titleTh: 'titleTh',
      titleEn: 'titleEn',
      count: 'items',
    },
    prepare({ titleTh, titleEn, count }) {
      const size = Array.isArray(count) ? count.length : 0;
      return {
        title: titleTh || titleEn || 'Untitled group',
        subtitle: `EN: ${titleEn || '-'} | ${size} links`,
      };
    },
  },
});
