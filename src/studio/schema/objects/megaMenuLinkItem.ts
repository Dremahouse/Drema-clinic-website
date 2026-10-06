import { LinkIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'megaMenuLinkItem',
  title: 'Mega Menu Link Item',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'labelTh',
      title: 'Label (TH)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'labelEn',
      title: 'Label (EN)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      labelTh: 'labelTh',
      labelEn: 'labelEn',
      type: 'link.type',
      external: 'link.external',
      internal: 'link.internal.slug.current',
    },
    prepare({ labelTh, labelEn, type, external, internal }) {
      const href = type === 'internal' ? `/${internal || ''}` : external || '#';
      return {
        title: labelTh || labelEn || 'Untitled link',
        subtitle: `EN: ${labelEn || '-'} | ${href}`,
      };
    },
  },
});
