import { UserIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'aboutDoctor',
  title: 'About Doctor / Medical Team',
  type: 'object',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      description: 'Legacy fallback. Prefer Heading TH / Heading EN below.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'headingTh', title: 'Heading (TH)', type: 'string' }),
    defineField({ name: 'headingEn', title: 'Heading (EN)', type: 'string' }),
    defineField({
      name: 'intro',
      title: 'Section Intro',
      type: 'blockContent',
      description: 'Legacy fallback. Prefer Section Intro TH / EN below.',
    }),
    defineField({
      name: 'introTh',
      title: 'Section Intro (TH)',
      type: 'blockContent',
      description: 'Optional Thai intro paragraph below the section title.',
    }),
    defineField({
      name: 'introEn',
      title: 'Section Intro (EN)',
      type: 'blockContent',
      description: 'Optional English intro paragraph below the section title.',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Section Background Image',
      type: 'image',
      description:
        'Optional full-section background image. The website displays this image without an overlay.',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alternative text' }),
      ],
    }),
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'nameTh', title: 'Name (TH)', type: 'string' }),
    defineField({ name: 'nameEn', title: 'Name (EN)', type: 'string' }),
    defineField({ name: 'role', type: 'string' }),
    defineField({ name: 'roleTh', title: 'Role (TH)', type: 'string' }),
    defineField({ name: 'roleEn', title: 'Role (EN)', type: 'string' }),
    defineField({ name: 'bio', type: 'blockContent' }),
    defineField({ name: 'bioTh', title: 'Bio (TH)', type: 'blockContent' }),
    defineField({ name: 'bioEn', title: 'Bio (EN)', type: 'blockContent' }),
    defineField({
      name: 'photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alternative text' }),
      ],
    }),
    defineField({
      name: 'buttons',
      type: 'array',
      of: [defineArrayMember({ type: 'button' })],
    }),
    defineField({
      name: 'doctors',
      title: 'Doctors',
      description:
        'Add 4 doctors for alternating magazine-style layout (left/right).',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'name', type: 'string' }),
            defineField({ name: 'nameTh', title: 'Name (TH)', type: 'string' }),
            defineField({ name: 'nameEn', title: 'Name (EN)', type: 'string' }),
            defineField({ name: 'role', type: 'string' }),
            defineField({ name: 'roleTh', title: 'Role (TH)', type: 'string' }),
            defineField({ name: 'roleEn', title: 'Role (EN)', type: 'string' }),
            defineField({ name: 'bio', type: 'blockContent' }),
            defineField({
              name: 'bioTh',
              title: 'Bio (TH)',
              type: 'blockContent',
            }),
            defineField({
              name: 'bioEn',
              title: 'Bio (EN)',
              type: 'blockContent',
            }),
            defineField({
              name: 'profileSummaryTh',
              title: 'Profile Panel Summary (TH)',
              type: 'text',
              rows: 3,
              description:
                'Text shown under the doctor name in the left profile panel.',
            }),
            defineField({
              name: 'profileSummaryEn',
              title: 'Profile Panel Summary (EN)',
              type: 'text',
              rows: 3,
              description:
                'English text shown under the doctor name in the left profile panel.',
            }),
            defineField({
              name: 'profilePanelHeadingTh',
              title: 'Profile Panel Heading (TH)',
              type: 'string',
              description:
                'Heading shown above the three detail rows in the right panel.',
            }),
            defineField({
              name: 'profilePanelHeadingEn',
              title: 'Profile Panel Heading (EN)',
              type: 'string',
              description:
                'English heading shown above the three detail rows in the right panel.',
            }),
            defineField({
              name: 'profileHighlights',
              title: 'Profile Detail Rows',
              description:
                'Optional editable rows for the doctor profile panel. Add up to 3 rows.',
              type: 'array',
              validation: (Rule) => Rule.max(3),
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'labelTh',
                      title: 'Label (TH)',
                      type: 'string',
                    }),
                    defineField({
                      name: 'labelEn',
                      title: 'Label (EN)',
                      type: 'string',
                    }),
                    defineField({
                      name: 'textTh',
                      title: 'Text (TH)',
                      type: 'text',
                      rows: 2,
                    }),
                    defineField({
                      name: 'textEn',
                      title: 'Text (EN)',
                      type: 'text',
                      rows: 2,
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'labelTh',
                      subtitle: 'textTh',
                    },
                    prepare({ title, subtitle }) {
                      return {
                        title: title || 'Profile detail row',
                        subtitle,
                      };
                    },
                  },
                }),
              ],
            }),
            defineField({
              name: 'photo',
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
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'photo',
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
    select: { title: 'heading', subtitle: 'name', media: 'photo' },
    prepare({ title, subtitle, media }) {
      return { title: title || 'Untitled', subtitle, media };
    },
  },
});
