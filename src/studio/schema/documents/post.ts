import { DocumentTextIcon } from '@sanity/icons';
import { format, parseISO } from 'date-fns';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { defaultFieldGroups } from '../config/fieldGroups';

/**
 * Post schema.  Define and edit the fields for the 'post' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export default defineType({
  name: 'post',
  title: 'Blog Pages',
  icon: DocumentTextIcon,
  type: 'document',
  groups: defaultFieldGroups,
  fields: [
    defineField({
      name: 'title',
      title: 'Title (TH)',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'titleEn',
      title: 'Title (EN)',
      type: 'string',
      description: 'English version for /en route.',
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'A slug is required for the post to show up in the preview',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description:
        'Main article image. Used in the blog detail hero and may also appear in category featured cards. Recommended portrait ratio 4:5. Suggested size: at least 1600x2000 px, recommended 2000x2500 px or larger. Keep the main subject centered and leave safe space around edges because the article hero may crop slightly on desktop/mobile.',
      group: 'content',
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
          description:
            'Important for SEO and accessibility. Describe the image clearly, for example: before/after temple filler result.',
          validation: (rule) => {
            // Custom validation to ensure alt text is provided if the image is present. https://www.sanity.io/docs/validation
            return rule.custom((alt, context) => {
              if (
                (context.document?.coverImage as { asset?: { _ref?: string } })
                  ?.asset?._ref &&
                !alt
              ) {
                return 'Required';
              }
              return true;
            });
          },
        },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Content (TH)',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'contentEn',
      title: 'Content (EN)',
      type: 'blockContent',
      description: 'English version for /en route.',
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Summary (TH)',
      type: 'text',
      description:
        'Citation-ready summary in Thai. Use 2-3 factual sentences that answer the topic directly and help search engines or answer engines quote the article accurately.',
      group: 'content',
    }),
    defineField({
      name: 'excerptEn',
      title: 'Summary (EN)',
      type: 'text',
      description:
        'Citation-ready summary in English. Use 2-3 factual sentences that answer the topic directly and support clear search extraction.',
      group: 'content',
    }),
    defineField({
      name: 'highlightQuote',
      title: 'Key Takeaway (TH)',
      type: 'string',
      description:
        'One concise takeaway shown in the article hero. Keep it to a single sentence and avoid marketing language.',
      group: 'content',
    }),
    defineField({
      name: 'highlightQuoteEn',
      title: 'Key Takeaway (EN)',
      type: 'string',
      description:
        'English version of the key takeaway shown in the article hero. Keep it to one sentence.',
      group: 'content',
    }),
    defineField({
      name: 'quickFacts',
      title: 'Quick Facts (TH)',
      type: 'array',
      description:
        'Short Thai bullets for the article sidebar. Use 3-5 quick factual points that do not repeat the key takeaway word-for-word.',
      of: [defineArrayMember({ type: 'string' })],
      group: 'content',
    }),
    defineField({
      name: 'quickFactsEn',
      title: 'Quick Facts (EN)',
      type: 'array',
      description:
        'Short English bullets for the article sidebar. Use 3-5 quick factual points for fast reading and citation support.',
      of: [defineArrayMember({ type: 'string' })],
      group: 'content',
    }),
    defineField({
      name: 'sourceReferences',
      title: 'แหล่งข้อมูลอ้างอิง (TH)',
      type: 'text',
      rows: 6,
      description:
        'Optional Thai source note shown in a collapsed section before FAQ. Paste the reference text exactly as needed.',
      group: 'content',
    }),
    defineField({
      name: 'sourceReferencesEn',
      title: 'Sources & References (EN)',
      type: 'text',
      rows: 6,
      description:
        'Optional English source note shown in a collapsed section before FAQ. Paste the reference text exactly as needed.',
      group: 'content',
    }),
    defineField({
      name: 'references',
      title: 'Structured References',
      type: 'array',
      description:
        'Optional structured citations for future human-reviewed medical/scientific references. Use this for machine-readable references; keep legacy sourceReferences text as a fallback.',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'citationReference',
          title: 'Reference',
          fields: [
            defineField({
              name: 'titleTh',
              title: 'Title (TH)',
              type: 'string',
              description: 'Thai title or article name if available.',
            }),
            defineField({
              name: 'titleEn',
              title: 'Title (EN)',
              type: 'string',
              description: 'English title or article name if available.',
            }),
            defineField({
              name: 'authors',
              title: 'Authors',
              type: 'string',
              description: 'Comma-separated author list.',
            }),
            defineField({
              name: 'source',
              title: 'Source / Publication',
              type: 'string',
              description: 'Journal, publisher, or website name.',
            }),
            defineField({
              name: 'year',
              title: 'Year',
              type: 'string',
              description: 'Publication year.',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              description: 'Direct link to the referenced resource.',
            }),
            defineField({
              name: 'doi',
              title: 'DOI',
              type: 'string',
              description:
                'Digital Object Identifier without https://doi.org/ prefix.',
            }),
            defineField({
              name: 'pmid',
              title: 'PMID',
              type: 'string',
              description:
                'PubMed ID without https://pubmed.ncbi.nlm.nih.gov/ prefix.',
            }),
            defineField({
              name: 'volume',
              title: 'Volume',
              type: 'string',
            }),
            defineField({
              name: 'issue',
              title: 'Issue',
              type: 'string',
            }),
            defineField({
              name: 'pages',
              title: 'Pages',
              type: 'string',
            }),
          ],
          preview: {
            select: { title: 'titleTh', subtitle: 'authors' },
          },
        }),
      ],
    }),
    defineField({
      name: 'medicalReviewer',
      title: 'Medical Reviewer',
      type: 'reference',
      to: [{ type: 'person' }],
      description:
        'Optional reviewer who verified the medical accuracy of this article.',
      group: 'content',
    }),
    defineField({
      name: 'faqItems',
      title: 'FAQ Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'postFaqItem',
          title: 'FAQ Item',
          fields: [
            defineField({
              name: 'questionTh',
              title: 'Question (TH)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'questionEn',
              title: 'Question (EN)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'shortAnswerTh',
              title: 'Direct Answer (TH)',
              type: 'text',
              rows: 2,
              description: 'One-line AI citation style answer in Thai.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'shortAnswerEn',
              title: 'Direct Answer (EN)',
              type: 'text',
              rows: 2,
              description: 'One-line AI citation style answer in English.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'detailTh',
              title: 'Detail (TH)',
              type: 'text',
              rows: 4,
            }),
            defineField({
              name: 'detailEn',
              title: 'Detail (EN)',
              type: 'text',
              rows: 4,
            }),
          ],
          preview: {
            select: { title: 'questionTh', subtitle: 'shortAnswerTh' },
          },
        }),
      ],
      description: 'Structured bilingual FAQ for article page and AI citation.',
      group: 'content',
    }),
    defineField({
      name: 'restylaneTableRows',
      title: 'Restylane Table Rows (TH/EN)',
      type: 'array',
      description:
        'Editable rows for Restylane comparison table shown at [[RESTYLANE_TABLE]].',
      hidden: ({ document }) =>
        (document as { slug?: { current?: string } } | undefined)?.slug
          ?.current !== 'restylane-filler',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'restylaneTableRow',
          title: 'Restylane Row',
          fields: [
            defineField({
              name: 'model',
              title: 'Model',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'profileTh',
              title: 'Profile (TH)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'profileEn',
              title: 'Profile (EN)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'areasTh',
              title: 'Recommended Areas (TH)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'areasEn',
              title: 'Recommended Areas (EN)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'durationTh',
              title: 'Duration (TH)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'durationEn',
              title: 'Duration (EN)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'model', subtitle: 'durationTh' },
          },
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
      group: 'content',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      group: 'content',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'person' }],
      group: 'content',
    }),
    defineField({
      title: 'SEO & Metadata',
      name: 'seo',
      type: 'seoMetaFields',
      group: 'seo',
    }),
  ],
  // List preview configuration. https://www.sanity.io/docs/previews-list-views
  preview: {
    select: {
      title: 'title',
      authorFirstName: 'author.firstName',
      authorLastName: 'author.lastName',
      date: 'date',
      media: 'image',
    },
    prepare({ title, media, authorFirstName, authorLastName, date }) {
      const subtitles = [
        authorFirstName &&
          authorLastName &&
          `by ${authorFirstName} ${authorLastName}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean);

      return { title, media, subtitle: subtitles.join(' ') };
    },
  },
});
