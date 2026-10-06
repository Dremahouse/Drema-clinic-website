import { DocumentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { defaultFieldGroups } from '../config/fieldGroups';

export default defineType({
  name: 'blogPage',
  title: 'Blog Page',
  type: 'document',
  groups: defaultFieldGroups,
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'featuredPost',
      title: 'Featured Post (Pin on Blog Landing)',
      description:
        'Select a specific post to pin as the featured article on /blog.',
      type: 'reference',
      to: [{ type: 'post' }],
      options: {
        disableNew: true,
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'name',
      hidden: true,
      readOnly: true,
      type: 'string',
      initialValue: 'Blog Page',
      group: 'content',
    }),
    defineField({
      name: 'featuredCategoriesHeadingTh',
      title: 'Featured Categories Heading (TH)',
      type: 'string',
      initialValue: 'หมวดเด่น',
      group: 'content',
    }),
    defineField({
      name: 'featuredCategoriesHeadingEn',
      title: 'Featured Categories Heading (EN)',
      type: 'string',
      initialValue: 'Featured Categories',
      group: 'content',
    }),
    defineField({
      name: 'featuredCategoriesSubtitleTh',
      title: 'Featured Categories Subtitle (TH)',
      type: 'string',
      initialValue: 'เริ่มอ่านตามหมวดหัตถการที่ต้องการ',
      group: 'content',
    }),
    defineField({
      name: 'featuredCategoriesSubtitleEn',
      title: 'Featured Categories Subtitle (EN)',
      type: 'string',
      initialValue: 'Start browsing by treatment category',
      group: 'content',
    }),
    defineField({
      name: 'featuredCategoriesCtaTh',
      title: 'Featured Categories CTA (TH)',
      type: 'string',
      initialValue: 'ดูหมวด',
      group: 'content',
    }),
    defineField({
      name: 'featuredCategoriesCtaEn',
      title: 'Featured Categories CTA (EN)',
      type: 'string',
      initialValue: 'View category',
      group: 'content',
    }),
    defineField({
      name: 'featuredCategories',
      title: 'Featured Categories',
      description: 'Shown at the top of /blog landing page.',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'category',
              title: 'Category',
              type: 'reference',
              to: [{ type: 'category' }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'titleTh',
              title: 'Card Title Override (TH)',
              type: 'string',
            }),
            defineField({
              name: 'titleEn',
              title: 'Card Title Override (EN)',
              type: 'string',
            }),
            defineField({
              name: 'descriptionTh',
              title: 'Card Description Override (TH)',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'descriptionEn',
              title: 'Card Description Override (EN)',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: 'category.title',
              slug: 'category.slug.current',
              titleTh: 'titleTh',
              titleEn: 'titleEn',
            },
            prepare: ({ title, slug, titleTh, titleEn }) => ({
              title: titleTh || titleEn || title || 'Untitled category card',
              subtitle: slug ? `category/${slug}` : 'No category selected',
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'featuredArticleTagTh',
      title: 'Featured Article Tag (TH)',
      type: 'string',
      initialValue: 'บทความแนะนำ',
      group: 'content',
    }),
    defineField({
      name: 'featuredArticleTagEn',
      title: 'Featured Article Tag (EN)',
      type: 'string',
      initialValue: 'Featured Article',
      group: 'content',
    }),
    defineField({
      name: 'latestStoriesTitleTh',
      title: 'Latest Stories Title (TH)',
      type: 'string',
      initialValue: 'บทความล่าสุด',
      group: 'content',
    }),
    defineField({
      name: 'latestStoriesTitleEn',
      title: 'Latest Stories Title (EN)',
      type: 'string',
      initialValue: 'Latest Stories',
      group: 'content',
    }),
    defineField({
      name: 'latestStoriesSubtitleTh',
      title: 'Latest Stories Subtitle (TH)',
      type: 'text',
      rows: 3,
      initialValue:
        'คัดบทความแบบแมกกาซีน อ่านง่าย เน้นข้อมูลที่ช่วยตัดสินใจก่อนทำหัตถการ',
      group: 'content',
    }),
    defineField({
      name: 'latestStoriesSubtitleEn',
      title: 'Latest Stories Subtitle (EN)',
      type: 'text',
      rows: 3,
      initialValue:
        'Magazine picks from treatments, reviews, and practical guidance.',
      group: 'content',
    }),
    defineField({
      name: 'readMoreTextTh',
      title: 'Read More Text (TH)',
      type: 'string',
      initialValue: 'อ่านต่อ ->',
      group: 'content',
    }),
    defineField({
      name: 'readMoreTextEn',
      title: 'Read More Text (EN)',
      type: 'string',
      initialValue: 'Continue reading ->',
      group: 'content',
    }),
    defineField({
      name: 'doctorTipsTagTh',
      title: 'Doctor Tips Tag (TH)',
      type: 'string',
      initialValue: 'Doctor Tips',
      group: 'content',
    }),
    defineField({
      name: 'doctorTipsTagEn',
      title: 'Doctor Tips Tag (EN)',
      type: 'string',
      initialValue: 'Doctor Tips',
      group: 'content',
    }),
    defineField({
      name: 'doctorTipsTitleTh',
      title: 'Doctor Tips Title (TH)',
      type: 'string',
      initialValue:
        'เช็กก่อนเลือกหัตถการความงาม | แนวทางจากแพทย์ Drema Clinic',
      group: 'content',
    }),
    defineField({
      name: 'doctorTipsTitleEn',
      title: 'Doctor Tips Title (EN)',
      type: 'string',
      initialValue:
        'How to Choose the Right Aesthetic Treatment | Doctor’s Guide',
      group: 'content',
    }),
    defineField({
      name: 'doctorTipsIntroTh',
      title: 'Doctor Tips Intro (TH)',
      type: 'text',
      rows: 3,
      initialValue:
        'ก่อนตัดสินใจทำหัตถการความงาม ไม่ว่าจะเป็นฟิลเลอร์ โบท็อกซ์ หรือโปรแกรมยกกระชับ การเลือกให้เหมาะกับ “ปัญหาผิว” และ “เป้าหมายของคุณ” เป็นสิ่งสำคัญที่สุด',
      group: 'content',
    }),
    defineField({
      name: 'doctorTipsIntroEn',
      title: 'Doctor Tips Intro (EN)',
      type: 'text',
      rows: 3,
      initialValue:
        'Before undergoing any aesthetic treatment—whether fillers, botox, or lifting procedures—choosing the right option based on your skin concerns and personal goals is essential.',
      group: 'content',
    }),
    defineField({
      name: 'doctorTipsIntroFollowupTh',
      title: 'Doctor Tips Intro Follow-up (TH)',
      type: 'text',
      rows: 3,
      initialValue:
        'Drema Clinic แนะนำแนวทางจากแพทย์ เพื่อช่วยให้คุณเลือกโปรแกรมได้อย่างปลอดภัย เห็นผล และคุ้มค่าที่สุด',
      group: 'content',
    }),
    defineField({
      name: 'doctorTipsIntroFollowupEn',
      title: 'Doctor Tips Intro Follow-up (EN)',
      type: 'text',
      rows: 3,
      initialValue:
        'At Drema Clinic, our doctors provide expert guidance to help you achieve safe, natural-looking, and effective results.',
      group: 'content',
    }),
    defineField({
      name: 'doctorTipsSubheadingTh',
      title: 'Doctor Tips Subheading (TH)',
      type: 'string',
      initialValue: '3 วิธีเลือกหัตถการให้เหมาะกับคุณ',
      group: 'content',
    }),
    defineField({
      name: 'doctorTipsSubheadingEn',
      title: 'Doctor Tips Subheading (EN)',
      type: 'string',
      initialValue: '3 Key Factors Before Choosing an Aesthetic Treatment',
      group: 'content',
    }),
    defineField({
      name: 'doctorTip1TitleTh',
      title: 'Doctor Tip #1 Title (TH)',
      type: 'string',
      initialValue: 'เลือกจากปัญหาผิวและเป้าหมายของตัวเอง',
      group: 'content',
    }),
    defineField({
      name: 'doctorTip1TitleEn',
      title: 'Doctor Tip #1 Title (EN)',
      type: 'string',
      initialValue: 'Identify Your Skin Concerns and Goals',
      group: 'content',
    }),
    defineField({
      name: 'doctorTip1Th',
      title: 'Doctor Tip #1 (TH)',
      type: 'string',
      initialValue:
        'วิเคราะห์ปัญหาผิว เช่น ริ้วรอย ผิวหย่อนคล้อย หรือรูปหน้า พร้อมกำหนดเป้าหมายที่ต้องการ เพื่อเลือกหัตถการที่ตอบโจทย์ที่สุด',
      group: 'content',
    }),
    defineField({
      name: 'doctorTip1En',
      title: 'Doctor Tip #1 (EN)',
      type: 'string',
      initialValue:
        'Understand your skin condition, such as wrinkles, sagging, or facial structure concerns, and define your desired outcome to select the most suitable treatment.',
      group: 'content',
    }),
    defineField({
      name: 'doctorTip2TitleTh',
      title: 'Doctor Tip #2 Title (TH)',
      type: 'string',
      initialValue: 'ตรวจสอบแพทย์และมาตรฐานเครื่องมือ',
      group: 'content',
    }),
    defineField({
      name: 'doctorTip2TitleEn',
      title: 'Doctor Tip #2 Title (EN)',
      type: 'string',
      initialValue: 'Check Doctor Credentials and Technology Standards',
      group: 'content',
    }),
    defineField({
      name: 'doctorTip2Th',
      title: 'Doctor Tip #2 (TH)',
      type: 'string',
      initialValue:
        'ควรเลือกคลินิกที่มีแพทย์ผู้เชี่ยวชาญ และใช้เครื่องมือหรือผลิตภัณฑ์ที่ผ่านการรับรอง เพื่อความปลอดภัยและผลลัพธ์ที่มั่นใจได้',
      group: 'content',
    }),
    defineField({
      name: 'doctorTip2En',
      title: 'Doctor Tip #2 (EN)',
      type: 'string',
      initialValue:
        'Choose a clinic with experienced doctors and certified medical technologies to ensure safety and reliable results.',
      group: 'content',
    }),
    defineField({
      name: 'doctorTip3TitleTh',
      title: 'Doctor Tip #3 Title (TH)',
      type: 'string',
      initialValue: 'เข้าใจการพักฟื้น ความเสี่ยง และการติดตามผล',
      group: 'content',
    }),
    defineField({
      name: 'doctorTip3TitleEn',
      title: 'Doctor Tip #3 Title (EN)',
      type: 'string',
      initialValue: 'Understand Downtime, Risks, and Follow-up Plan',
      group: 'content',
    }),
    defineField({
      name: 'doctorTip3Th',
      title: 'Doctor Tip #3 (TH)',
      type: 'string',
      initialValue:
        'สอบถามรายละเอียดเกี่ยวกับระยะเวลาพักฟื้น ความเสี่ยงที่อาจเกิดขึ้น รวมถึงแผนการติดตามผล เพื่อให้ได้ผลลัพธ์ที่ดีที่สุดในระยะยาว',
      group: 'content',
    }),
    defineField({
      name: 'doctorTip3En',
      title: 'Doctor Tip #3 (EN)',
      type: 'string',
      initialValue:
        'Ask about recovery time, potential risks, and post-treatment care to maintain and monitor your results effectively.',
      group: 'content',
    }),
    defineField({
      name: 'doctorTipsCtaTextTh',
      title: 'Doctor Tips CTA Text (TH)',
      type: 'string',
      initialValue:
        'ปรึกษาแพทย์ Drema Clinic เพื่อออกแบบการรักษาที่เหมาะกับคุณ',
      group: 'content',
    }),
    defineField({
      name: 'doctorTipsCtaTextEn',
      title: 'Doctor Tips CTA Text (EN)',
      type: 'string',
      initialValue:
        'Consult with our doctors for a personalized treatment plan',
      group: 'content',
    }),
    defineField({
      name: 'doctorTipsCtaLink',
      title: 'Doctor Tips CTA Link',
      type: 'link',
      group: 'content',
    }),
    defineField({
      name: 'quickCategoriesLabelTh',
      title: 'Quick Categories Label (TH)',
      type: 'string',
      initialValue: 'หมวดแนะนำ',
      group: 'content',
    }),
    defineField({
      name: 'quickCategoriesLabelEn',
      title: 'Quick Categories Label (EN)',
      type: 'string',
      initialValue: 'Quick categories',
      group: 'content',
    }),
    defineField({
      title: 'SEO & Metadata',
      name: 'seo',
      type: 'seoMetaFields',
      group: 'seo',
    }),
  ],
});
