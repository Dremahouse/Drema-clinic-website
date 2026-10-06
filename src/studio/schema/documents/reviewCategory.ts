import { DocumentsIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'reviewCategory',
  title: 'Review Category',
  type: 'document',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleTh',
      title: 'Title (TH)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Title (EN)',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'descriptionTh',
      title: 'Description (TH)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description (EN)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'citationIntroTh',
      title: 'Citation Intro (TH)',
      type: 'text',
      rows: 4,
      description: 'ข้อความอธิบายหมวดรีวิวสำหรับ AI/SEO ภาษาไทย',
    }),
    defineField({
      name: 'citationIntroEn',
      title: 'Citation Intro (EN)',
      type: 'text',
      rows: 4,
      description: 'Category summary for AI/SEO in English',
    }),
    defineField({
      name: 'citationKeyPointsTh',
      title: 'Citation Key Points (TH)',
      type: 'array',
      description: 'หัวข้อสั้น ๆ สำหรับ AI/Search ภาษาไทย',
      of: [{ type: 'string' }],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: 'citationKeyPointsEn',
      title: 'Citation Key Points (EN)',
      type: 'array',
      description: 'Short reference points for AI/Search in English',
      of: [{ type: 'string' }],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: 'citationDisclaimerTh',
      title: 'Citation Disclaimer (TH)',
      type: 'text',
      rows: 3,
      initialValue: 'ผลลัพธ์ของการรักษาขึ้นอยู่กับสภาพผิวและโครงสร้างใบหน้าของแต่ละบุคคล',
    }),
    defineField({
      name: 'citationDisclaimerEn',
      title: 'Citation Disclaimer (EN)',
      type: 'text',
      rows: 3,
      initialValue:
        'Results vary by individual skin condition and facial structure.',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      description:
        'ใช้เป็นภาพบน card หมวดรีวิวในหน้า Reviews. ทำภาพสัดส่วน 16:10 แนะนำ 1920 x 1200 px หรือ 1600 x 1000 px ขั้นต่ำ 1200 x 750 px. วางใบหน้า/ข้อความสำคัญไว้กลางภาพและเผื่อขอบซ้ายขวา เพราะหน้าเว็บจะแสดงแบบ cover และอาจ crop เล็กน้อยตามขนาดหน้าจอ.',
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
    defineField({
      name: 'heroBackgroundDesktop',
      title: 'Hero Background Desktop',
      description:
        'ใช้เป็นภาพพื้นหลัง Hero ของหน้าหมวดรีวิวนี้บน desktop/tablet. แนะนำภาพแนวนอน 2400 x 1400 px หรือขั้นต่ำ 1920 x 1120 px. วางจุดสำคัญของภาพไว้ด้านขวา และเว้นพื้นที่ฝั่งซ้ายสำหรับข้อความ hero.',
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
    defineField({
      name: 'heroBackgroundMobile',
      title: 'Hero Background Mobile',
      description:
        'ใช้เป็นภาพพื้นหลัง Hero ของหน้าหมวดรีวิวนี้บน mobile. แนะนำภาพแนวตั้ง 1440 x 1800 px หรือขั้นต่ำ 1080 x 1350 px.',
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
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 100,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'coverImage',
    },
  },
});
