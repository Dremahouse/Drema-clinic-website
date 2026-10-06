import { ImageIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
import socialEmbed from './socialEmbed';

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 *
 * Learn more: https://www.sanity.io/docs/block-content
 */
export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      marks: {
        decorators: [
          { title: 'Code', value: 'code' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Strike', value: 'strike-through' },
          { title: 'Strong', value: 'strong' },
          { title: 'Underline', value: 'underline' },
          {
            title: 'Sup',
            value: 'sup',
            icon: () => (
              <div>
                x<sup>2</sup>
              </div>
            ),
            component: ({ children }) => <sup>{children}</sup>,
          },
          {
            title: 'Sub',
            value: 'sub',
            icon: () => (
              <div>
                x<sub>2</sub>
              </div>
            ),
            component: ({ children }) => <sub>{children}</sub>,
          },
        ],
        annotations: [
          {
            name: 'customLink',
            type: 'object',
            title: 'Link',
            fields: [
              defineField({
                name: 'customLink',
                type: 'link',
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      title: 'Image',
      description:
        'Inline content image. The website currently renders these images at a 3:2 ratio. Recommended size: 1800 x 1200 px or larger. Minimum 1500 x 1000 px. Keep the main subject centered because non-3:2 images will be cropped.',
      icon: ImageIcon,
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        },
      ],
    }),
    defineArrayMember({
      type: 'object',
      name: 'comparisonTable',
      title: 'Comparison Table',
      description:
        'Add as many columns and rows as needed. Use this block instead of pasting Markdown table syntax.',
      fields: [
        defineField({
          name: 'title',
          title: 'Table title (optional)',
          type: 'string',
        }),
        defineField({
          name: 'columns',
          title: 'Columns',
          description:
            'Add one item per column. Keep the number of cells in each row the same as the number of columns.',
          type: 'array',
          validation: (rule) => rule.min(1).required(),
          of: [
            defineArrayMember({
              type: 'object',
              name: 'comparisonTableColumn',
              title: 'Column',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Column header',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: {
                select: { title: 'title' },
              },
            }),
          ],
        }),
        defineField({
          name: 'rows',
          title: 'Rows',
          type: 'array',
          validation: (rule) => rule.min(1).required(),
          of: [
            defineArrayMember({
              type: 'object',
              name: 'comparisonTableRow',
              title: 'Comparison row',
              fields: [
                defineField({
                  name: 'cells',
                  title: 'Cells',
                  description:
                    'Add one cell per column, in the same order as the column headers.',
                  type: 'array',
                  validation: (rule) => rule.min(1).required(),
                  of: [defineArrayMember({ type: 'string' })],
                }),
              ],
              preview: {
                select: {
                  title: 'cells.0',
                  subtitle: 'cells.1',
                },
              },
            }),
          ],
        }),
      ],
      preview: {
        select: {
          title: 'title',
          firstColumn: 'columns.0.title',
          secondColumn: 'columns.1.title',
        },
        prepare({ title, firstColumn, secondColumn }) {
          return {
            title: title || 'Comparison Table',
            subtitle: [firstColumn, secondColumn].filter(Boolean).join(' | '),
          };
        },
      },
    }),
    defineArrayMember(socialEmbed),
  ],
});
