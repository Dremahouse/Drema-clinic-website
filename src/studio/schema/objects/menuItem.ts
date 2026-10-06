import { LinkIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { createRadioListLayout } from '@/utils/schema';

export default defineType({
  name: 'menuItem',
  title: 'Menu Item',
  icon: LinkIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Menu Item Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'textTh',
      title: 'Menu Text (TH)',
      type: 'string',
      description: 'Label shown when URL starts with /th',
    }),
    defineField({
      name: 'textEn',
      title: 'Menu Text (EN)',
      type: 'string',
      description: 'Label shown when URL starts with /en',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: createRadioListLayout(['link', 'child-menu']),
      initialValue: () => 'link',
    }),

    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
      description:
        'Optional for child-menu. If set, parent label becomes clickable (e.g. /blog).',
    }),
    defineField({
      name: 'childMenu',
      title: 'Child Menu',
      description: 'Add a child menu to the menu item.',
      hidden: ({ parent }) => parent?.type !== 'child-menu',
      type: 'array',
      of: [{ type: 'menuItem' }],
    }),
  ],
  preview: {
    select: {
      text: 'text',
      textTh: 'textTh',
      textEn: 'textEn',
    },
    prepare: ({ text, textTh, textEn }) => {
      const title = textTh || textEn || text || 'Untitled Menu Item';
      const subtitle =
        textTh || textEn ? `TH: ${textTh || '-'} | EN: ${textEn || '-'}` : '';
      return {
        title,
        subtitle,
      };
    },
  },
});
