import { StarIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { defaultFieldGroups } from '../config/fieldGroups';

export default defineType({
  name: 'review',
  title: 'Reviews',
  type: 'document',
  icon: StarIcon,
  groups: defaultFieldGroups,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Review Category',
      type: 'reference',
      to: [{ type: 'reviewCategory' }],
      options: { disableNew: false },
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      description:
        'ใช้เป็นภาพ cover ของ card รีวิวและภาพนำในหน้ารายละเอียดรีวิว. ทำภาพสัดส่วน 16:10 แนะนำ 1920 x 1200 px หรือ 1600 x 1000 px ขั้นต่ำ 1200 x 750 px. วางผลลัพธ์/ใบหน้า/ข้อความสำคัญไว้กลางภาพและเผื่อขอบ เพราะหน้าเว็บจะแสดงแบบ cover และอาจ crop เล็กน้อยตามขนาดหน้าจอ.',
      type: 'image',
      options: { hotspot: true },
      group: 'content',
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      description: 'Upload multiple images for this review.',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'image',
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
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'content',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      group: 'content',
      initialValue: 100,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'content',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      title: 'SEO & Metadata',
      name: 'seo',
      type: 'seoMetaFields',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category.title',
      media: 'coverImage',
    },
    prepare({ title, category, media }) {
      return {
        title,
        subtitle: category ? `Category: ${category}` : 'No category',
        media,
      };
    },
  },
});
