import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description (Legacy)',
      hidden: true,
      type: 'text',
    }),
    defineField({
      name: 'descriptionTh',
      title: 'Description (TH)',
      type: 'text',
      rows: 3,
      description: 'Thai description shown on /th/category/[slug] cards.',
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description (EN)',
      type: 'text',
      rows: 3,
      description: 'English description shown on /en/category/[slug] cards.',
    }),
    defineField({
      name: 'subtitleTh',
      title: 'Subtitle (TH)',
      type: 'text',
      rows: 2,
      description: 'Hero subtitle for /th/category/[slug]',
    }),
    defineField({
      name: 'subtitleEn',
      title: 'Subtitle (EN)',
      type: 'text',
      rows: 2,
      description: 'Hero subtitle for /en/category/[slug]',
    }),
    defineField({
      name: 'featuredSectionTitleTh',
      title: 'Featured Section Title (TH)',
      description: 'หัวข้อส่วน "หัวข้อแนะนำ" สำหรับหน้า category ภาษาไทย',
      type: 'string',
    }),
    defineField({
      name: 'featuredSectionTitleEn',
      title: 'Featured Section Title (EN)',
      description: 'Section heading for featured topics on category page (EN)',
      type: 'string',
    }),
    defineField({
      name: 'featuredItems',
      title: 'Featured Items (Manual)',
      description:
        'เลือกหัวข้อแนะนำเอง (เรียงลำดับได้) หากไม่เลือก ระบบจะ fallback อัตโนมัติ',
      type: 'array',
      of: [
        defineField({
          name: 'item',
          type: 'reference',
          to: [{ type: 'category' }, { type: 'post' }],
          options: { disableNew: true },
        }),
      ],
    }),
    defineField({
      name: 'reasonHeadingTh',
      title: 'Why Section Heading (TH)',
      type: 'string',
      initialValue: 'ทำไมต้องหมวดนี้?',
    }),
    defineField({
      name: 'reasonHeadingEn',
      title: 'Why Section Heading (EN)',
      type: 'string',
      initialValue: 'Why This Category?',
    }),
    defineField({
      name: 'reasonPoints',
      title: 'Why Section Points (TH/EN)',
      type: 'array',
      of: [
        defineField({
          name: 'reasonPoint',
          title: 'Point',
          type: 'object',
          fields: [
            defineField({
              name: 'textTh',
              title: 'Text (TH)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'textEn',
              title: 'Text (EN)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'textTh', subtitle: 'textEn' },
          },
        }),
      ],
    }),
    defineField({
      name: 'compareHeadingTh',
      title: 'Comparison Heading (TH)',
      type: 'string',
      initialValue: 'ตารางเปรียบเทียบ',
    }),
    defineField({
      name: 'compareHeadingEn',
      title: 'Comparison Heading (EN)',
      type: 'string',
      initialValue: 'Comparison',
    }),
    defineField({
      name: 'compareRows',
      title: 'Comparison Rows (TH/EN)',
      type: 'array',
      of: [
        defineField({
          name: 'compareRow',
          title: 'Row',
          type: 'object',
          fields: [
            defineField({
              name: 'topicTh',
              title: 'Topic (TH)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'topicEn',
              title: 'Topic (EN)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'bestForTh',
              title: 'Best For (TH)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'bestForEn',
              title: 'Best For (EN)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'typeTh',
              title: 'Type (TH)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'typeEn',
              title: 'Type (EN)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'topicTh', subtitle: 'topicEn' },
          },
        }),
      ],
    }),
    defineField({
      name: 'faqHeadingTh',
      title: 'FAQ Heading (TH)',
      type: 'string',
      initialValue: 'คำถามที่พบบ่อย',
    }),
    defineField({
      name: 'faqHeadingEn',
      title: 'FAQ Heading (EN)',
      type: 'string',
      initialValue: 'Frequently Asked Questions',
    }),
    defineField({
      name: 'faqItems',
      title: 'FAQ Items (TH/EN)',
      type: 'array',
      of: [
        defineField({
          name: 'faqItem',
          title: 'FAQ Item',
          type: 'object',
          fields: [
            defineField({
              name: 'questionTh',
              title: 'Question (TH)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'questionEn',
              title: 'Question (EN)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answerTh',
              title: 'Answer (TH)',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answerEn',
              title: 'Answer (EN)',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'questionTh', subtitle: 'questionEn' },
          },
        }),
      ],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      description: 'Image shown on the category card in /blog.',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'parentCategory',
      title: 'Parent Category',
      description:
        'Optional. Use this to create subcategories (e.g. Restylane under Filler).',
      type: 'reference',
      to: [{ type: 'category' }],
      options: {
        disableNew: true,
      },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (!value?._ref) return true;
          if (value._ref === context.document?._id) {
            return 'Category cannot be its own parent.';
          }
          return true;
        }),
    }),
  ],
});
