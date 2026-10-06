import { MenuIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'megaMenuSection',
  title: 'Mega Menu Section',
  type: 'object',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'titleTh',
      title: 'Section Title (TH)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Section Title (EN)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Section Link (Optional)',
      description: 'Optional: if set, section title becomes clickable in menu.',
      type: 'link',
    }),
    defineField({
      name: 'groups',
      title: 'Grouped Links',
      description:
        'Use this when section has subgroup headings (e.g. By Area, By Brand).',
      type: 'array',
      of: [{ type: 'megaMenuGroup' }],
    }),
    defineField({
      name: 'items',
      title: 'Direct Links',
      description: 'Use this when section has direct links without subgroup.',
      type: 'array',
      of: [{ type: 'megaMenuLinkItem' }],
    }),
  ],
  preview: {
    select: {
      titleTh: 'titleTh',
      titleEn: 'titleEn',
      groups: 'groups',
      items: 'items',
    },
    prepare({ titleTh, titleEn, groups, items }) {
      const groupCount = Array.isArray(groups) ? groups.length : 0;
      const itemCount = Array.isArray(items) ? items.length : 0;
      return {
        title: titleTh || titleEn || 'Untitled section',
        subtitle: `EN: ${titleEn || '-'} | groups ${groupCount}, links ${itemCount}`,
      };
    },
  },
});
