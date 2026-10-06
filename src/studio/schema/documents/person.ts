import { UserIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

/**
 * Person schema.  Define and edit the fields for the 'person' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export default defineType({
  name: 'person',
  title: 'People',
  icon: UserIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name (TH)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name (TH)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'firstNameEn',
      title: 'First Name (EN)',
      type: 'string',
    }),
    defineField({
      name: 'lastNameEn',
      title: 'Last Name (EN)',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: (doc) => `${doc?.firstName}-${doc?.lastName}`.toLowerCase(),
        maxLength: 96,
      },
    }),
    defineField({
      name: 'image',
      title: 'Picture',
      type: 'image',
      description:
        'Recommended doctor profile artwork: portrait 6:7 ratio. Minimum 1200 x 1400 px, recommended 1600 x 1867 px or larger. Keep the doctor centered with safe space around the edges for responsive cropping.',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        }),
      ],
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
    }),
    defineField({
      name: 'heroImageDesktop',
      title: 'Hero Image Desktop',
      type: 'image',
      description:
        'Optional desktop-only hero artwork. Use the same portrait 4:5 ratio as blog hero images. Minimum 1600 x 2000 px, recommended 2000 x 2500 px or larger. Keep the doctor centered with safe space above the head and below the waist for cropping.',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        }),
      ],
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
    }),
    defineField({
      name: 'heroImageMobile',
      title: 'Hero Image Mobile',
      type: 'image',
      description:
        'Optional mobile-only hero artwork. Use the same portrait 4:5 ratio as blog hero images so the team can reuse one artwork size across pages. Minimum 1200 x 1500 px, recommended 1600 x 2000 px or larger. Keep the doctor centered and avoid placing important text near the edges.',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        }),
      ],
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
    }),
    defineField({
      name: 'heroBackgroundDesktop',
      title: 'Hero Background Desktop',
      type: 'image',
      description:
        'Optional full-width desktop background for the author hero. Recommended 2400 x 1400 px, minimum 1920 x 1120 px. Keep the main text-safe area on the left 45% of the image and place the doctor or visual focus toward the center-right. Avoid placing logos or important details under the top navigation.',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        }),
      ],
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
    }),
    defineField({
      name: 'heroBackgroundMobile',
      title: 'Hero Background Mobile',
      type: 'image',
      description:
        'Optional mobile background for the author hero. Recommended 1440 x 1800 px, minimum 1080 x 1350 px. Keep the top half clean for heading and intro text, and move the doctor or supporting visual lower or to the bottom-right. Avoid placing important text into the artwork because the website overlays text separately.',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        }),
      ],
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
    }),
    defineField({
      name: 'role',
      title: 'Role (TH)',
      type: 'string',
    }),
    defineField({
      name: 'roleEn',
      title: 'Role (EN)',
      type: 'string',
    }),
    defineField({
      name: 'heroProfileLabelTh',
      title: 'Hero Profile Label (TH)',
      type: 'string',
      initialValue: 'DOCTOR PROFILE',
    }),
    defineField({
      name: 'heroProfileLabelEn',
      title: 'Hero Profile Label (EN)',
      type: 'string',
      initialValue: 'DOCTOR PROFILE',
    }),
    defineField({
      name: 'heroKickerTh',
      title: 'Hero Kicker (TH)',
      type: 'string',
      initialValue: 'แพทย์ผู้ดูแลการรักษา',
    }),
    defineField({
      name: 'heroKickerEn',
      title: 'Hero Kicker (EN)',
      type: 'string',
      initialValue: 'Treating doctor',
    }),
    defineField({
      name: 'heroIntroTh',
      title: 'Hero Intro (TH)',
      type: 'text',
      rows: 4,
      description:
        'Main introduction paragraph shown in the author hero. Keep it concise and trust-focused.',
    }),
    defineField({
      name: 'heroIntroEn',
      title: 'Hero Intro (EN)',
      type: 'text',
      rows: 4,
      description:
        'Main introduction paragraph shown in the author hero. Keep it concise and trust-focused.',
    }),
    defineField({
      name: 'heroPrimaryCtaTextTh',
      title: 'Hero Primary CTA (TH)',
      type: 'string',
      initialValue: 'ปรึกษาแพทย์',
    }),
    defineField({
      name: 'heroPrimaryCtaTextEn',
      title: 'Hero Primary CTA (EN)',
      type: 'string',
      initialValue: 'Consult a doctor',
    }),
    defineField({
      name: 'heroPrimaryCtaLink',
      title: 'Hero Primary CTA Link',
      type: 'link',
    }),
    defineField({
      name: 'heroSecondaryCtaTextTh',
      title: 'Hero Secondary Note (TH)',
      type: 'string',
      initialValue: 'หรือสอบถามข้อมูลเพิ่มเติม',
    }),
    defineField({
      name: 'heroSecondaryCtaTextEn',
      title: 'Hero Secondary Note (EN)',
      type: 'string',
      initialValue: 'Or ask for more details',
    }),
    defineField({
      name: 'heroSecondaryCtaLink',
      title: 'Hero Secondary Note Link',
      type: 'link',
    }),
    defineField({
      name: 'heroInfoCards',
      title: 'Hero Info Cards',
      description:
        'Recommended 4 cards. Text is bilingual; icons are assigned by card order on the website.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'titleTh',
              title: 'Title (TH)',
              type: 'string',
            }),
            defineField({
              name: 'titleEn',
              title: 'Title (EN)',
              type: 'string',
            }),
            defineField({
              name: 'descriptionTh',
              title: 'Description (TH)',
              type: 'string',
            }),
            defineField({
              name: 'descriptionEn',
              title: 'Description (EN)',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'titleTh',
              subtitle: 'titleEn',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'heroCredentialCards',
      title: 'Hero Credential Cards',
      description:
        'Recommended 2 cards shown under the hero image. Text is bilingual; icons are assigned by card order on the website.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'titleTh',
              title: 'Title (TH)',
              type: 'string',
            }),
            defineField({
              name: 'titleEn',
              title: 'Title (EN)',
              type: 'string',
            }),
            defineField({
              name: 'descriptionTh',
              title: 'Description (TH)',
              type: 'string',
            }),
            defineField({
              name: 'descriptionEn',
              title: 'Description (EN)',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'titleTh',
              subtitle: 'titleEn',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'heroTrustItems',
      title: 'Hero Trust Strip Items',
      hidden: true,
      description:
        'Hidden because the current author page template does not render this field.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'titleTh',
              title: 'Title (TH)',
              type: 'string',
            }),
            defineField({
              name: 'titleEn',
              title: 'Title (EN)',
              type: 'string',
            }),
            defineField({
              name: 'descriptionTh',
              title: 'Description (TH)',
              type: 'string',
            }),
            defineField({
              name: 'descriptionEn',
              title: 'Description (EN)',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'titleTh',
              subtitle: 'titleEn',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'citationSummaryTh',
      title: 'Citation Summary (TH)',
      type: 'text',
      rows: 4,
      description:
        'Short trust-focused doctor summary for Thai AI/SEO citation.',
    }),
    defineField({
      name: 'citationSummaryEn',
      title: 'Citation Summary (EN)',
      type: 'text',
      rows: 4,
      description:
        'Short trust-focused doctor summary for English AI/SEO citation.',
    }),
    defineField({
      name: 'keyHighlightsTh',
      title: 'Key Highlights (TH)',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'keyHighlightsEn',
      title: 'Key Highlights (EN)',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'biography',
      title: 'Biography (TH)',
      type: 'blockContent',
      hidden: true,
      description:
        'Hidden because the current author page uses Citation Summary for the biography panel.',
    }),
    defineField({
      name: 'biographyEn',
      title: 'Biography (EN)',
      type: 'blockContent',
      hidden: true,
      description:
        'Hidden because the current author page uses Citation Summary for the biography panel.',
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'doctorCertification',
          title: 'Certification',
          fields: [
            defineField({
              name: 'titleTh',
              title: 'Title (TH)',
              type: 'string',
            }),
            defineField({
              name: 'titleEn',
              title: 'Title (EN)',
              type: 'string',
            }),
            defineField({
              name: 'issuerTh',
              title: 'Issuer (TH)',
              type: 'string',
            }),
            defineField({
              name: 'issuerEn',
              title: 'Issuer (EN)',
              type: 'string',
            }),
            defineField({
              name: 'year',
              title: 'Year',
              type: 'string',
            }),
            defineField({
              name: 'image',
              title: 'Certificate Image',
              type: 'image',
              description:
                'Recommended certificate artwork: landscape 4:3 ratio. Minimum 1200 x 900 px, recommended 1600 x 1200 px or larger. Keep the full certificate inside safe margins because the website shows the entire image inside the card.',
              options: { hotspot: true },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alternative text',
                  type: 'string',
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'titleTh',
              subtitle: 'titleEn',
              media: 'image',
            },
          },
        }),
      ],
      description: 'Upload certificate images and bilingual metadata.',
    }),
    defineField({
      name: 'professionalProfileSections',
      title: 'Professional Profile Sections',
      description:
        'Editable Education, Certification & Professional Titles, and Professional Experience sections for the author profile page.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'professionalProfileSection',
          title: 'Professional Profile Section',
          fields: [
            defineField({
              name: 'titleTh',
              title: 'Section Title (TH)',
              type: 'string',
            }),
            defineField({
              name: 'titleEn',
              title: 'Section Title (EN)',
              type: 'string',
            }),
            defineField({
              name: 'itemsTh',
              title: 'Items (TH)',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
            }),
            defineField({
              name: 'itemsEn',
              title: 'Items (EN)',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
            }),
          ],
          preview: {
            select: {
              title: 'titleTh',
              subtitle: 'titleEn',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || subtitle || 'Professional profile section',
                subtitle,
              };
            },
          },
        }),
      ],
    }),
  ],

  // List preview configuration. https://www.sanity.io/docs/previews-list-views
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      role: 'role',
      image: 'image',
    },
    prepare(selection) {
      return {
        title: `${selection.firstName} ${selection.lastName}`,
        subtitle: selection.role || 'Person',
        media: selection.image,
      };
    },
  },
});
