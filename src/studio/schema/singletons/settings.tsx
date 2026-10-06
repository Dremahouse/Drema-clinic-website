import { CogIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import * as demo from '@/lib/sanity/client/demo';

/**
 * Settings schema Singleton.  Singletons are single documents that are displayed not in a collection, handy for things like site settings and other global configurations.
 * Learn more: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
 */

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your website.',
      title: 'Title',
      type: 'string',
      initialValue: demo.title,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'menu',
      type: 'array',
      of: [{ type: 'menuItem' }],
      description: 'Build a menu to display on the header of your site.',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Logo displayed in the site header.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'Used for accessibility and SEO.',
        }),
      ],
    }),
    defineField({
      name: 'headerBackgroundImage',
      title: 'Header Background Image',
      type: 'image',
      description: 'Optional background image for the navbar/header area.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'Used for accessibility and SEO.',
        }),
      ],
    }),
    defineField({
      name: 'enableOverlay',
      title: 'Enable Global Image Overlay',
      type: 'boolean',
      description:
        'Turn on/off the global image overlay used by shared site surfaces such as the header background.',
      initialValue: true,
    }),
    defineField({
      name: 'overlayColor',
      title: 'Overlay Color',
      type: 'string',
      description:
        'CSS color value for the overlay. Example: #140e08 or rgba(20,14,8,1).',
      initialValue: '#140e08',
      hidden: ({ document }) => document?.enableOverlay === false,
    }),
    defineField({
      name: 'overlayOpacity',
      title: 'Overlay Opacity (%)',
      type: 'number',
      description:
        'Choose overlay strength. 0% is transparent, 100% fully covers the image.',
      initialValue: 42,
      hidden: ({ document }) => document?.enableOverlay === false,
      options: {
        list: [
          { title: '0%', value: 0 },
          { title: '10%', value: 10 },
          { title: '20%', value: 20 },
          { title: '30%', value: 30 },
          { title: '40%', value: 40 },
          { title: '50%', value: 50 },
          { title: '60%', value: 60 },
          { title: '70%', value: 70 },
          { title: '80%', value: 80 },
          { title: '90%', value: 90 },
          { title: '100%', value: 100 },
        ],
      },
      validation: (rule) => rule.min(0).max(100),
    }),
    defineField({
      name: 'blogMegaMenuSections',
      title: 'Blog Mega Menu Sections',
      type: 'array',
      description:
        'Optional structured sections shown in the blog mega menu. This field is used by the header and blog navigation.',
      of: [{ type: 'megaMenuSection' }],
    }),
    defineField({
      name: 'blogArticleHeroBackgroundImage',
      title: 'Blog Article Hero Background Image',
      type: 'image',
      description:
        'Global background image shown behind the hero area on every blog article page.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description:
            'Used as editorial context in Studio. The website treats this background as decorative.',
        }),
      ],
    }),
    defineField({
      name: 'description',
      description:
        'Used both for the <meta> description tag for SEO, and the blog subheader.',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links (Global)',
      description:
        'Manage social/contact links in one place for reuse across sections.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'LINE', value: 'line' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'YouTube', value: 'youtube' },
                ],
                layout: 'dropdown',
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Button Label',
              type: 'string',
              description: 'Example: LINE Town in Town',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
              description:
                'Optional logo shown on contact Official Channels cards. If empty, the default platform icon is used.',
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alternative text',
                  type: 'string',
                  description: 'Used for accessibility.',
                }),
              ],
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'globalCtaHeadingTh',
      title: 'Global CTA Heading (TH)',
      type: 'string',
      description:
        'Main CTA heading reused across pages. Migrated from the Home consultation CTA.',
    }),
    defineField({
      name: 'globalCtaHeadingEn',
      title: 'Global CTA Heading (EN)',
      type: 'string',
      description:
        'English main CTA heading reused across pages. Migrated from the Home consultation CTA.',
    }),
    defineField({
      name: 'globalCtaTextTh',
      title: 'Global CTA Text (TH)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'globalCtaTextEn',
      title: 'Global CTA Text (EN)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'globalCtaButtonTextTh',
      title: 'Global CTA Primary Button (TH)',
      type: 'string',
      initialValue: 'นัดหมายปรึกษา',
    }),
    defineField({
      name: 'globalCtaButtonTextEn',
      title: 'Global CTA Primary Button (EN)',
      type: 'string',
      initialValue: 'Book Consultation',
    }),
    defineField({
      name: 'globalCtaButtonLink',
      title: 'Global CTA Primary Button Link',
      type: 'link',
    }),
    defineField({
      name: 'globalCtaBackgroundImage',
      title: 'Global CTA Background Image',
      type: 'image',
      description:
        'Background image reused by the central CTA across the website.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'Used for accessibility and SEO.',
        }),
      ],
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Displayed on social cards and search engine results.',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        defineField({
          name: 'alt',
          description: 'Important for accessibility and SEO.',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if (
                (context.document?.ogImage as { asset?: { _ref?: string } })
                  ?.asset?._ref &&
                !alt
              ) {
                return 'Required';
              }
              return true;
            });
          },
        }),
        defineField({
          name: 'metadataBase',
          type: 'url',
          description: (
            <a
              href="https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase"
              rel="noreferrer noopener"
            >
              More information
            </a>
          ),
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      };
    },
  },
});
