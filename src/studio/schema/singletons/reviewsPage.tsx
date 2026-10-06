import { DocumentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { defaultFieldGroups } from '../config/fieldGroups';

const backgroundImageFields = [
  defineField({
    name: 'alt',
    type: 'string',
    title: 'Alternative text',
    description: 'Important for SEO and accessibility.',
  }),
];

const sectionBackgroundImageField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'image',
    description:
      'Optional background image for this section. Use a subtle image with enough empty space so text and cards remain readable.',
    fields: backgroundImageFields,
    options: {
      hotspot: true,
      aiAssist: { imageDescriptionField: 'alt' },
    },
    group: 'content',
  });

export default defineType({
  name: 'reviewsPage',
  title: 'Reviews Page',
  type: 'document',
  icon: DocumentIcon,
  groups: defaultFieldGroups,
  fields: [
    defineField({
      name: 'name',
      hidden: true,
      readOnly: true,
      type: 'string',
      initialValue: 'Reviews',
      group: 'content',
    }),
    defineField({
      name: 'heroEyebrowTh',
      title: 'Hero Eyebrow (TH)',
      type: 'string',
      initialValue: 'เรื่องราวจากผู้รับบริการ',
      group: 'content',
    }),
    defineField({
      name: 'heroEyebrowEn',
      title: 'Hero Eyebrow (EN)',
      type: 'string',
      initialValue: 'Patient Stories',
      group: 'content',
    }),
    defineField({
      name: 'heroHeadingTh',
      title: 'Hero Heading (TH)',
      type: 'string',
      initialValue: 'รีวิวผลลัพธ์การรักษาระดับพรีเมียม',
      group: 'content',
    }),
    defineField({
      name: 'heroHeadingEn',
      title: 'Hero Heading (EN)',
      type: 'string',
      initialValue: 'Premium Treatment Reviews',
      group: 'content',
    }),
    defineField({
      name: 'heroDescriptionTh',
      title: 'Hero Description (TH)',
      type: 'text',
      rows: 4,
      initialValue:
        'รวมหมวดรีวิวเคสจริงและผลลัพธ์หลังการรักษา จากผู้รับบริการของ Drema Clinic',
      group: 'content',
    }),
    defineField({
      name: 'heroDescriptionEn',
      title: 'Hero Description (EN)',
      type: 'text',
      rows: 4,
      initialValue:
        'Explore real-case categories and treatment outcomes from Drema Clinic.',
      group: 'content',
    }),
    defineField({
      name: 'heroBackgroundDesktop',
      title: 'Hero Background Desktop',
      type: 'image',
      description:
        'Optional full-width desktop background for the reviews hero. Recommended 2400 x 1400 px, minimum 1920 x 1120 px. Keep the main text-safe area on the left 45% of the image and place the visual focus toward the center-right.',
      fields: backgroundImageFields,
      options: {
        hotspot: true,
        aiAssist: { imageDescriptionField: 'alt' },
      },
      group: 'content',
    }),
    defineField({
      name: 'heroBackgroundMobile',
      title: 'Hero Background Mobile',
      type: 'image',
      description:
        'Optional mobile background for the reviews hero. Recommended 1440 x 1800 px, minimum 1080 x 1350 px. Keep the top half clean for heading and intro text.',
      fields: backgroundImageFields,
      options: {
        hotspot: true,
        aiAssist: { imageDescriptionField: 'alt' },
      },
      group: 'content',
    }),
    defineField({
      name: 'heroPrimaryCtaTextTh',
      title: 'Hero Primary CTA Text (TH)',
      type: 'string',
      initialValue: 'ดูหมวดรีวิวแรก',
      group: 'content',
    }),
    defineField({
      name: 'heroPrimaryCtaTextEn',
      title: 'Hero Primary CTA Text (EN)',
      type: 'string',
      initialValue: 'Browse First Category',
      group: 'content',
    }),
    sectionBackgroundImageField(
      'categoriesSectionBackgroundImage',
      'Review Categories Section Background Image'
    ),
    sectionBackgroundImageField(
      'referenceSectionBackgroundImage',
      'Review Reference Section Background Image'
    ),
    sectionBackgroundImageField(
      'featuredSectionBackgroundImage',
      'Featured Reviews Section Background Image'
    ),
    defineField({
      title: 'SEO & Metadata',
      name: 'seo',
      type: 'seoMetaFields',
      group: 'seo',
    }),
  ],
});
