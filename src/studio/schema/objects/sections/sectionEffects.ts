import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'sectionEffects',
  title: 'Section Effects',
  type: 'object',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enable Effects',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'reveal',
      title: 'Fade-up Reveal',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'stagger',
      title: 'Stagger Items',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'hoverScale',
      title: 'Hover Scale',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'parallax',
      title: 'Parallax (for media)',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Effects' };
    },
  },
});
