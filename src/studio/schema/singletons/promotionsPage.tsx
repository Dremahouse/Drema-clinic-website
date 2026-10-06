import { TagIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { defaultFieldGroups } from '../config/fieldGroups';

const defaultPromotionsLink = {
  _type: 'link',
  type: 'external',
  external: '/promotions',
  openInNewTab: false,
  href: '#',
};

const defaultConsultLink = {
  _type: 'link',
  type: 'external',
  external: 'https://line.me/R/ti/p/@drema.emporium',
  openInNewTab: true,
  href: '#',
};

const heroBackgroundFields = [
  defineField({
    name: 'alt',
    title: 'Alternative text',
    type: 'string',
    description: 'Important for SEO and accessibility.',
  }),
];

export default defineType({
  name: 'promotionsPage',
  title: 'Promotions Page',
  type: 'document',
  icon: TagIcon,
  groups: defaultFieldGroups,
  fields: [
    defineField({
      name: 'name',
      hidden: true,
      readOnly: true,
      type: 'string',
      initialValue: 'Promotions Page',
      group: 'content',
    }),
    defineField({
      name: 'heroEyebrowTh',
      title: 'Hero Eyebrow (TH)',
      type: 'string',
      initialValue: 'Promotion Programs',
      group: 'content',
    }),
    defineField({
      name: 'heroEyebrowEn',
      title: 'Hero Eyebrow (EN)',
      type: 'string',
      initialValue: 'Promotion Programs',
      group: 'content',
    }),
    defineField({
      name: 'heroHeadingTh',
      title: 'Hero Heading (TH)',
      type: 'string',
      initialValue: 'โปรโมชันที่ออกแบบให้เหมาะกับปัญหาผิวและเป้าหมายของคุณ',
      group: 'content',
    }),
    defineField({
      name: 'heroHeadingEn',
      title: 'Hero Heading (EN)',
      type: 'string',
      initialValue:
        'Promotions tailored to your skin concerns and treatment goals',
      group: 'content',
    }),
    defineField({
      name: 'heroDescriptionTh',
      title: 'Hero Description (TH)',
      type: 'text',
      rows: 4,
      initialValue:
        'รวมโปรแกรมดูแลผิวและความงามที่ช่วยให้คุณเริ่มต้นได้ง่ายขึ้น โดยยังคงประเมินตามปัญหาจริง วางแผนโดยแพทย์ และเลือกแนวทางที่เหมาะกับแต่ละบุคคล',
      group: 'content',
    }),
    defineField({
      name: 'heroDescriptionEn',
      title: 'Hero Description (EN)',
      type: 'text',
      rows: 4,
      initialValue:
        'A curated selection of skin and aesthetic programs designed to make your first step clearer, while still being assessed by a doctor and tailored to your individual concerns.',
      group: 'content',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description:
        'Default hero artwork fallback. If desktop/mobile hero images are uploaded below, the website will use those by screen size. Recommended portrait 6:7 with the main subject centered.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'heroImageDesktop',
      title: 'Hero Image Desktop',
      type: 'image',
      hidden: true,
      description:
        'Optional desktop-only hero artwork. Recommended portrait 5:6 or 4:5 with extra safe space above and below the subject. Minimum 1800 x 2160 px, recommended 2200 x 2640 px or larger.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'heroImageMobile',
      title: 'Hero Image Mobile',
      type: 'image',
      hidden: true,
      description:
        'Optional mobile-only hero artwork. Recommended portrait 6:7. Minimum 1200 x 1400 px, recommended 1600 x 1867 px or larger. Keep the key offer visual centered.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'heroBackgroundDesktop',
      title: 'Hero Background Desktop',
      type: 'image',
      description:
        'Optional full-width desktop background for the promotions hero. Recommended 2400 x 1400 px, minimum 1920 x 1120 px. Keep the main text-safe area on the left 45% of the image and place the promotion visual focus toward the center-right.',
      options: {
        hotspot: true,
        aiAssist: { imageDescriptionField: 'alt' },
      },
      fields: heroBackgroundFields,
      group: 'content',
    }),
    defineField({
      name: 'heroBackgroundMobile',
      title: 'Hero Background Mobile',
      type: 'image',
      description:
        'Optional mobile background for the promotions hero. Recommended 1440 x 1800 px, minimum 1080 x 1350 px. Keep the top half clean for heading and intro text.',
      options: {
        hotspot: true,
        aiAssist: { imageDescriptionField: 'alt' },
      },
      fields: heroBackgroundFields,
      group: 'content',
    }),
    defineField({
      name: 'heroPrimaryCtaTextTh',
      title: 'Hero Primary CTA Text (TH)',
      type: 'string',
      initialValue: 'ดูโปรโมชันทั้งหมด',
      group: 'content',
    }),
    defineField({
      name: 'heroPrimaryCtaTextEn',
      title: 'Hero Primary CTA Text (EN)',
      type: 'string',
      initialValue: 'Browse Promotions',
      group: 'content',
    }),
    defineField({
      name: 'heroPrimaryCtaLink',
      title: 'Hero Primary CTA Link',
      type: 'link',
      initialValue: defaultPromotionsLink,
      group: 'content',
    }),
    defineField({
      name: 'heroSecondaryCtaTextTh',
      title: 'Hero Secondary CTA Text (TH)',
      type: 'string',
      initialValue: 'ปรึกษาแพทย์ก่อนตัดสินใจ',
      group: 'content',
    }),
    defineField({
      name: 'heroSecondaryCtaTextEn',
      title: 'Hero Secondary CTA Text (EN)',
      type: 'string',
      initialValue: 'Consult Before Choosing',
      group: 'content',
    }),
    defineField({
      name: 'heroSecondaryCtaLink',
      title: 'Hero Secondary CTA Link',
      type: 'link',
      initialValue: defaultConsultLink,
      group: 'content',
    }),
    defineField({
      name: 'featuredLabelTh',
      title: 'Featured Label (TH)',
      type: 'string',
      initialValue: 'Highlight Promotion',
      group: 'content',
    }),
    defineField({
      name: 'featuredLabelEn',
      title: 'Featured Label (EN)',
      type: 'string',
      initialValue: 'Featured Promotion',
      group: 'content',
    }),
    defineField({
      name: 'allPromotionsHeadingTh',
      title: 'All Promotions Heading (TH)',
      type: 'string',
      initialValue: 'โปรโมชันแนะนำจากคลินิก',
      group: 'content',
    }),
    defineField({
      name: 'allPromotionsHeadingEn',
      title: 'All Promotions Heading (EN)',
      type: 'string',
      initialValue: 'Recommended Promotions',
      group: 'content',
    }),
    defineField({
      name: 'allPromotionsDescriptionTh',
      title: 'All Promotions Description (TH)',
      type: 'text',
      rows: 3,
      initialValue:
        'เลือกดูโปรแกรมที่กำลังเปิดอยู่พร้อมรายละเอียดเบื้องต้น ราคาโปรโมชัน และเงื่อนไขสำคัญ เพื่อช่วยให้เปรียบเทียบได้ง่ายขึ้นก่อนนัดประเมินกับแพทย์',
      group: 'content',
    }),
    defineField({
      name: 'allPromotionsDescriptionEn',
      title: 'All Promotions Description (EN)',
      type: 'text',
      rows: 3,
      initialValue:
        'Explore current clinic offers with key details, promotional pricing, and essential conditions so you can compare options more clearly before your consultation.',
      group: 'content',
    }),
    defineField({
      name: 'trustHeadingTh',
      title: 'Trust Heading (TH)',
      type: 'string',
      initialValue: 'เหตุผลที่ควรเริ่มจากการประเมินอย่างเหมาะสม',
      group: 'content',
    }),
    defineField({
      name: 'trustHeadingEn',
      title: 'Trust Heading (EN)',
      type: 'string',
      initialValue: 'Why professional assessment should come first',
      group: 'content',
    }),
    defineField({
      name: 'trustPoints',
      title: 'Trust Points',
      type: 'array',
      group: 'content',
      initialValue: [
        {
          titleTh: 'ประเมินโดยแพทย์ก่อนเลือกโปรแกรม',
          titleEn: 'Doctor-led assessment first',
          descriptionTh:
            'ทุกโปรโมชันควรเริ่มจากการประเมินปัญหาผิวหรือรูปหน้า เพื่อช่วยให้เลือกแนวทางที่เหมาะกับคุณจริง',
          descriptionEn:
            'Every promotion should start with a proper assessment so the selected approach truly fits your skin or facial concerns.',
        },
        {
          titleTh: 'ออกแบบตามเป้าหมายและงบประมาณ',
          titleEn: 'Planned around goals and budget',
          descriptionTh:
            'ช่วยจัดลำดับการดูแลให้เหมาะกับเป้าหมาย ระยะเวลา และงบประมาณ โดยไม่จำเป็นต้องทำเกินความจำเป็น',
          descriptionEn:
            'Programs can be prioritized around your goals, timeline, and budget without pushing unnecessary treatment.',
        },
        {
          titleTh: 'เน้นผลลัพธ์ที่ดูเป็นธรรมชาติ',
          titleEn: 'Focused on natural-looking results',
          descriptionTh:
            'แนวทางการรักษาควรให้ผลลัพธ์ที่สมดุล ปลอดภัย และเหมาะกับลักษณะเฉพาะของแต่ละบุคคล',
          descriptionEn:
            'The goal is balanced, safe, and natural-looking outcomes suited to each individual.',
        },
      ],
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
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'descriptionEn',
              title: 'Description (EN)',
              type: 'text',
              rows: 3,
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
      name: 'faqHeadingTh',
      title: 'FAQ Heading (TH)',
      type: 'string',
      initialValue: 'คำถามที่พบบ่อยเกี่ยวกับโปรโมชัน',
      group: 'content',
    }),
    defineField({
      name: 'faqHeadingEn',
      title: 'FAQ Heading (EN)',
      type: 'string',
      initialValue: 'Frequently Asked Questions',
      group: 'content',
    }),
    defineField({
      name: 'faqItems',
      title: 'FAQ Items',
      type: 'array',
      group: 'content',
      initialValue: [
        {
          questionTh: 'โปรโมชันสามารถใช้ได้ทันทีเลยหรือไม่',
          questionEn: 'Can I use a promotion immediately?',
          answerTh:
            'โดยทั่วไปควรให้แพทย์หรือทีมคลินิกประเมินก่อน เพื่อดูว่าปัญหาผิว สภาพผิว และข้อจำกัดของคุณเหมาะกับโปรแกรมนั้นหรือไม่',
          answerEn:
            'In most cases, you should be assessed first to confirm that the program is appropriate for your concerns, skin condition, and any treatment limitations.',
        },
        {
          questionTh: 'ถ้าสนใจหลายโปรโมชัน ควรเลือกอย่างไร',
          questionEn:
            'How should I choose if I am interested in several promotions?',
          answerTh:
            'ควรเริ่มจากเป้าหมายหลักของคุณก่อน เช่น ยกกระชับ ลดริ้วรอย หรือปรับคุณภาพผิว แล้วให้คลินิกช่วยเรียงลำดับความสำคัญที่เหมาะสม',
          answerEn:
            'Start with your main goal, such as lifting, wrinkle reduction, or skin quality improvement, then let the clinic help prioritize the most suitable plan.',
        },
        {
          questionTh: 'โปรโมชันมีช่วงเวลาจำกัดหรือไม่',
          questionEn: 'Do promotions have limited validity periods?',
          answerTh:
            'แต่ละโปรโมชันอาจมีช่วงเวลาและเงื่อนไขต่างกัน ควรตรวจสอบรายละเอียดในรายการโปรโมชันหรือสอบถามทีมคลินิกก่อนนัดหมาย',
          answerEn:
            'Each promotion may have its own validity period and terms. Please review the listed details or confirm with the clinic before booking.',
        },
        {
          questionTh: 'ราคาโปรโมชันรวมทุกอย่างแล้วหรือยัง',
          questionEn: 'Does the promotional price include everything?',
          answerTh:
            'ขึ้นอยู่กับรายละเอียดของแต่ละโปรแกรม บางรายการอาจครอบคลุมครบแล้ว บางรายการอาจมีข้อกำหนดเพิ่มเติมที่ควรตรวจสอบก่อนตัดสินใจ',
          answerEn:
            'It depends on the specific program. Some promotions are fully inclusive, while others may have additional conditions that should be reviewed first.',
        },
      ],
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'questionTh',
              title: 'Question (TH)',
              type: 'string',
            }),
            defineField({
              name: 'questionEn',
              title: 'Question (EN)',
              type: 'string',
            }),
            defineField({
              name: 'answerTh',
              title: 'Answer (TH)',
              type: 'text',
              rows: 4,
            }),
            defineField({
              name: 'answerEn',
              title: 'Answer (EN)',
              type: 'text',
              rows: 4,
            }),
          ],
          preview: {
            select: {
              title: 'questionTh',
              subtitle: 'questionEn',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'ctaHeadingTh',
      title: 'CTA Heading (TH)',
      hidden: true,
      type: 'string',
      initialValue: 'หากยังไม่แน่ใจว่าโปรแกรมไหนเหมาะกับคุณ',
      group: 'content',
    }),
    defineField({
      name: 'ctaHeadingEn',
      title: 'CTA Heading (EN)',
      hidden: true,
      type: 'string',
      initialValue: 'If you are not sure which promotion fits you best',
      group: 'content',
    }),
    defineField({
      name: 'ctaTextTh',
      title: 'CTA Text (TH)',
      hidden: true,
      type: 'text',
      rows: 3,
      initialValue:
        'สามารถส่งรูปหรือแจ้งปัญหาที่กังวลเข้ามาเพื่อให้ทีมช่วยแนะนำแนวทางเบื้องต้น และนัดหมายเพื่อประเมินกับแพทย์ได้อย่างเหมาะสม',
      group: 'content',
    }),
    defineField({
      name: 'ctaTextEn',
      title: 'CTA Text (EN)',
      hidden: true,
      type: 'text',
      rows: 3,
      initialValue:
        'You can share your concerns or photos with the clinic first so the team can suggest a suitable starting direction before your consultation.',
      group: 'content',
    }),
    defineField({
      name: 'ctaPrimaryTextTh',
      title: 'CTA Primary Text (TH)',
      hidden: true,
      type: 'string',
      initialValue: 'แอด LINE เพื่อปรึกษา',
      group: 'content',
    }),
    defineField({
      name: 'ctaPrimaryTextEn',
      title: 'CTA Primary Text (EN)',
      hidden: true,
      type: 'string',
      initialValue: 'Add LINE for Consultation',
      group: 'content',
    }),
    defineField({
      name: 'ctaPrimaryLink',
      title: 'CTA Primary Link',
      hidden: true,
      type: 'link',
      initialValue: defaultConsultLink,
      group: 'content',
    }),
    defineField({
      name: 'ctaSecondaryTextTh',
      title: 'CTA Secondary Text (TH)',
      hidden: true,
      type: 'string',
      initialValue: 'ดูโปรโมชันทั้งหมด',
      group: 'content',
    }),
    defineField({
      name: 'ctaSecondaryTextEn',
      title: 'CTA Secondary Text (EN)',
      hidden: true,
      type: 'string',
      initialValue: 'View All Promotions',
      group: 'content',
    }),
    defineField({
      name: 'ctaSecondaryLink',
      title: 'CTA Secondary Link',
      hidden: true,
      type: 'link',
      initialValue: defaultPromotionsLink,
      group: 'content',
    }),
    defineField({
      name: 'citationSummaryTh',
      title: 'Citation Summary (TH)',
      type: 'text',
      rows: 4,
      initialValue:
        'หน้าโปรโมชันนี้รวบรวมรายการส่งเสริมการขายที่กำลังเปิดอยู่ของคลินิก พร้อมข้อมูลสรุป ราคาโปรโมชัน เงื่อนไขเบื้องต้น และคำแนะนำให้ประเมินกับแพทย์ก่อนเลือกโปรแกรมที่เหมาะสม',
      group: 'content',
    }),
    defineField({
      name: 'citationSummaryEn',
      title: 'Citation Summary (EN)',
      type: 'text',
      rows: 4,
      initialValue:
        'This promotions page presents the clinic’s currently active offers with summaries, promotional pricing, key conditions, and guidance to consult a doctor before selecting the most suitable program.',
      group: 'content',
    }),
    defineField({
      name: 'citationSummaryLabelTh',
      title: 'Summary Label (TH)',
      type: 'string',
      initialValue: 'ข้อมูลโดยสรุป',
      description: 'Label shown above the summary card on the promotions page.',
      group: 'content',
    }),
    defineField({
      name: 'citationSummaryLabelEn',
      title: 'Summary Label (EN)',
      type: 'string',
      initialValue: 'Summary',
      description: 'Label shown above the summary card on the promotions page.',
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
