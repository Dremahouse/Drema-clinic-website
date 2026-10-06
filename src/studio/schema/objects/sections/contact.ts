import { DocumentTextIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

const imageAltField = defineField({
  name: 'alt',
  type: 'string',
  title: 'Alternative text',
  description: 'Important for SEO and accessibility.',
});

const imageFields = [imageAltField];

export default defineType({
  name: 'contact',
  title: 'Contact',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Image Fallback',
      type: 'image',
      description:
        'Fallback hero image used when desktop/mobile hero images are empty.',
      options: { hotspot: true },
      fields: imageFields,
    }),
    defineField({
      name: 'heroImageDesktop',
      title: 'Hero Image Desktop',
      type: 'image',
      hidden: true,
      description: 'Optional desktop hero image. Recommended 2400 x 1600 px.',
      options: { hotspot: true },
      fields: imageFields,
    }),
    defineField({
      name: 'heroImageMobile',
      title: 'Hero Image Mobile',
      type: 'image',
      hidden: true,
      description: 'Optional mobile hero image. Recommended 1440 x 1800 px.',
      options: { hotspot: true },
      fields: imageFields,
    }),
    defineField({
      name: 'heroBackgroundDesktop',
      title: 'Hero Background Desktop',
      type: 'image',
      description:
        'Optional full-width desktop background. Keep text-safe space on the left.',
      options: {
        hotspot: true,
        aiAssist: { imageDescriptionField: 'alt' },
      },
      fields: imageFields,
    }),
    defineField({
      name: 'heroBackgroundMobile',
      title: 'Hero Background Mobile',
      type: 'image',
      description: 'Optional mobile background image.',
      options: {
        hotspot: true,
        aiAssist: { imageDescriptionField: 'alt' },
      },
      fields: imageFields,
    }),
    defineField({
      name: 'heroKicker',
      title: 'Hero Kicker (Thai / Default)',
      type: 'string',
      initialValue: 'Contact',
    }),
    defineField({
      name: 'heroKickerEn',
      title: 'Hero Kicker (English)',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Hero Heading (Thai / Default)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headingEn',
      title: 'Hero Heading (English)',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Hero Description (Thai / Default)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Hero Description (English)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroButton',
      title: 'Hero CTA Button',
      type: 'button',
    }),
    defineField({
      name: 'mapBranches',
      title: 'Branch Map Tabs',
      description:
        'Branch-specific map tabs, branch details, and branch booking buttons.',
      type: 'array',
      validation: (rule) => rule.min(1),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Branch Name (Thai / Default)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'nameEn',
              title: 'Branch Name (English)',
              type: 'string',
            }),
            defineField({
              name: 'embedUrl',
              title: 'Google Map Embed URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'address',
              title: 'Address (Thai / Default)',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'addressEn',
              title: 'Address (English)',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'phone',
              title: 'Phone',
              type: 'string',
            }),
            defineField({
              name: 'lineId',
              title: 'LINE ID',
              type: 'string',
            }),
            defineField({
              name: 'lineUrl',
              title: 'LINE URL',
              type: 'url',
            }),
            defineField({
              name: 'transitInfo',
              title: 'Transit (Thai / Default)',
              type: 'string',
            }),
            defineField({
              name: 'transitInfoEn',
              title: 'Transit (English)',
              type: 'string',
            }),
            defineField({
              name: 'parkingInfo',
              title: 'Parking (Thai / Default)',
              type: 'string',
            }),
            defineField({
              name: 'parkingInfoEn',
              title: 'Parking (English)',
              type: 'string',
            }),
            defineField({
              name: 'ctaHeading',
              title: 'Booking CTA Heading (Thai / Default)',
              type: 'string',
              description:
                'Overrides the global booking heading for this branch.',
            }),
            defineField({
              name: 'ctaHeadingEn',
              title: 'Booking CTA Heading (English)',
              type: 'string',
            }),
            defineField({
              name: 'ctaDescription',
              title: 'Booking CTA Description (Thai / Default)',
              type: 'text',
              rows: 3,
              description:
                'Overrides the global booking description for this branch.',
            }),
            defineField({
              name: 'ctaDescriptionEn',
              title: 'Booking CTA Description (English)',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'ctaButtons',
              title: 'Booking CTA Buttons',
              type: 'array',
              of: [defineArrayMember({ type: 'button' })],
              description:
                'Overrides the global booking buttons for this branch.',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'phone',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'mapSectionHeading',
      title: 'Map Section Heading (Thai / Default)',
      type: 'string',
      initialValue: 'Clinic Locations',
    }),
    defineField({
      name: 'mapSectionHeadingEn',
      title: 'Map Section Heading (English)',
      type: 'string',
    }),
    defineField({
      name: 'clinicName',
      title: 'Clinic Name',
      type: 'string',
      initialValue: 'Drema Aesthetic Laser Clinic',
    }),
    defineField({
      name: 'openingHoursHeading',
      title: 'Opening Hours Heading (Thai / Default)',
      type: 'string',
      initialValue: 'Opening Hours',
    }),
    defineField({
      name: 'openingHoursHeadingEn',
      title: 'Opening Hours Heading (English)',
      type: 'string',
    }),
    defineField({
      name: 'openingHours',
      title: 'Opening Hours Rows',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Day label (Thai / Default)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'labelEn',
              title: 'Day label (English)',
              type: 'string',
            }),
            defineField({
              name: 'hours',
              title: 'Hours',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'hours',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'bookingHeading',
      title: 'Official Channels Heading (Thai / Default)',
      type: 'string',
      initialValue: 'Ready to start your skin journey?',
    }),
    defineField({
      name: 'bookingHeadingEn',
      title: 'Official Channels Heading (English)',
      type: 'string',
    }),
    defineField({
      name: 'bookingDescription',
      title: 'Official Channels Description (Thai / Default)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'bookingDescriptionEn',
      title: 'Official Channels Description (English)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'bookingButtons',
      title: 'Fallback Booking CTA Buttons',
      type: 'array',
      description:
        'Used only when a branch does not have its own Booking CTA Buttons.',
      of: [defineArrayMember({ type: 'button' })],
    }),
    defineField({
      name: 'citationSummaryTh',
      title: 'AI Citation Summary (TH)',
      type: 'text',
      rows: 4,
      description:
        'Short factual Thai summary for search engines and AI answers. Use 2-3 direct sentences about contact channels, branches, and consultation.',
    }),
    defineField({
      name: 'citationSummaryEn',
      title: 'AI Citation Summary (EN)',
      type: 'text',
      rows: 4,
      description:
        'Short factual English summary for search engines and AI answers. Use 2-3 direct sentences about contact channels, branches, and consultation.',
    }),
    defineField({
      name: 'faqHeading',
      title: 'FAQ Heading (Thai / Default)',
      type: 'string',
      initialValue: 'Contact FAQ',
    }),
    defineField({
      name: 'faqHeadingEn',
      title: 'FAQ Heading (English)',
      type: 'string',
    }),
    defineField({
      name: 'faqItems',
      title: 'FAQ Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question (Thai / Default)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'questionEn',
              title: 'Question (English)',
              type: 'string',
            }),
            defineField({
              name: 'answer',
              title: 'Answer (Thai / Default)',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'answerEn',
              title: 'Answer (English)',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'galleryHeading',
      title: 'Clinic Gallery Heading (Thai / Default)',
      type: 'string',
    }),
    defineField({
      name: 'galleryHeadingEn',
      title: 'Clinic Gallery Heading (English)',
      type: 'string',
    }),
    defineField({
      name: 'galleryImages',
      title: 'Clinic Gallery Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: imageFields,
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
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Untitled', subtitle: 'Contact' };
    },
  },
});
