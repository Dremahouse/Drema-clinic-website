import { DocumentTextIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

const defaultFaqItems = [
  {
    question: 'ต้องนัดหมายก่อนเข้ารับบริการไหม?',
    questionEn: 'Do I need an appointment before visiting?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'แนะนำให้นัดหมายล่วงหน้าเพื่อให้ทีมแพทย์สามารถจัดคิวและประเมินเบื้องต้นได้เหมาะสมที่สุด',
          },
        ],
      },
    ],
    answerEn: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We recommend booking in advance so our medical team can arrange your slot and prepare an initial assessment.',
          },
        ],
      },
    ],
  },
  {
    question: 'มีบริการปรึกษาแพทย์ก่อนตัดสินใจทำหัตถการหรือไม่?',
    questionEn: 'Do you provide a medical consultation before treatment?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'มีบริการปรึกษาแพทย์เพื่อประเมินสภาพผิว โครงหน้า และเป้าหมายการรักษา ก่อนแนะนำแผนที่เหมาะกับแต่ละบุคคล',
          },
        ],
      },
    ],
    answerEn: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Yes. We provide doctor consultation to assess your skin, facial structure, and goals before recommending a personalized plan.',
          },
        ],
      },
    ],
  },
  {
    question: 'คลินิกใช้ผลิตภัณฑ์แท้และเครื่องมือมาตรฐานหรือไม่?',
    questionEn: 'Do you use authentic products and certified devices?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'เราเลือกใช้ผลิตภัณฑ์แท้และเครื่องมือที่ได้มาตรฐาน พร้อมตรวจสอบแหล่งที่มาเพื่อความปลอดภัยและผลลัพธ์ที่เชื่อถือได้',
          },
        ],
      },
    ],
    answerEn: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Yes. We use authentic products and certified devices with verified sourcing for safety and reliable outcomes.',
          },
        ],
      },
    ],
  },
  {
    question: 'เหมาะกับใครที่เพิ่งเริ่มทำหัตถการครั้งแรก?',
    questionEn: 'Is Drema Clinic suitable for first-time aesthetic clients?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'เหมาะมาก โดยแพทย์จะอธิบายขั้นตอน ข้อดี ข้อควรระวัง และทางเลือกต่างๆ อย่างชัดเจนก่อนตัดสินใจ',
          },
        ],
      },
    ],
    answerEn: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Absolutely. Our doctors clearly explain procedures, benefits, precautions, and alternatives before you decide.',
          },
        ],
      },
    ],
  },
  {
    question: 'สามารถทำหลายหัตถการในวันเดียวกันได้ไหม?',
    questionEn: 'Can I combine multiple treatments in one visit?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'ขึ้นอยู่กับการประเมินของแพทย์ หากสามารถทำร่วมกันได้อย่างปลอดภัย แพทย์จะจัดลำดับหัตถการให้เหมาะสม',
          },
        ],
      },
    ],
    answerEn: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'It depends on doctor assessment. If safe to combine, we will plan the treatment sequence appropriately.',
          },
        ],
      },
    ],
  },
  {
    question: 'หลังทำหัตถการต้องดูแลตัวเองอย่างไร?',
    questionEn: 'How should I do aftercare after treatment?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'หลังทำแพทย์จะให้คำแนะนำเฉพาะราย เช่น การหลีกเลี่ยงความร้อน แสงแดด การออกกำลังกายหนัก และการใช้สกินแคร์บางชนิด',
          },
        ],
      },
    ],
    answerEn: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Our doctor provides personalized aftercare, such as avoiding heat, sun exposure, intense exercise, and certain skincare products.',
          },
        ],
      },
    ],
  },
  {
    question: 'มีบริการติดตามผลหลังทำหรือไม่?',
    questionEn: 'Do you provide follow-up after treatment?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'มีบริการติดตามผลเพื่อประเมินความคืบหน้าและปรับแผนการดูแลให้เหมาะสม เพื่อผลลัพธ์ที่ต่อเนื่องและปลอดภัย',
          },
        ],
      },
    ],
    answerEn: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Yes. We provide follow-up to monitor progress and adjust your care plan for safe, consistent results.',
          },
        ],
      },
    ],
  },
  {
    question: 'คลินิกรับชำระเงินแบบใดบ้าง?',
    questionEn: 'What payment methods are accepted?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'รองรับการชำระเงินตามช่องทางที่สาขาให้บริการ กรุณาติดต่อทีมงานล่วงหน้าเพื่อเช็กช่องทางที่สะดวกที่สุด',
          },
        ],
      },
    ],
    answerEn: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We support payment methods available at each branch. Please contact our team in advance for the most convenient option.',
          },
        ],
      },
    ],
  },
  {
    question: 'สามารถขอดูรีวิวหรือเคสตัวอย่างก่อนตัดสินใจได้ไหม?',
    questionEn: 'Can I review case examples before deciding?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'ได้ ทีมงานสามารถแนะนำรีวิวหรือเคสตัวอย่างที่ใกล้เคียงกับปัญหาและเป้าหมายของคุณเพื่อใช้ประกอบการตัดสินใจ',
          },
        ],
      },
    ],
    answerEn: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Yes. Our team can share relevant reviews or sample cases similar to your concerns and goals.',
          },
        ],
      },
    ],
  },
  {
    question: 'ผู้ที่มีโรคประจำตัวสามารถเข้ารับบริการได้หรือไม่?',
    questionEn: 'Can clients with medical conditions receive treatment?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'สามารถเข้ารับคำปรึกษาได้ โดยควรแจ้งประวัติสุขภาพ ยาที่ใช้ และประวัติแพ้ยาอย่างละเอียด เพื่อความปลอดภัยสูงสุด',
          },
        ],
      },
    ],
    answerEn: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Yes, but please share your medical history, current medications, and allergy history in detail for maximum safety.',
          },
        ],
      },
    ],
  },
  {
    question: 'ตั้งครรภ์หรือให้นมบุตรทำหัตถการได้ไหม?',
    questionEn: 'Can I undergo treatment while pregnant or breastfeeding?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'บางหัตถการอาจไม่เหมาะสมในช่วงตั้งครรภ์หรือให้นมบุตร ควรปรึกษาแพทย์ก่อนทุกครั้งเพื่อเลือกแนวทางที่ปลอดภัย',
          },
        ],
      },
    ],
    answerEn: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Some procedures may not be suitable during pregnancy or breastfeeding. Please consult our doctor first for safe options.',
          },
        ],
      },
    ],
  },
  {
    question: 'ถ้าไม่แน่ใจว่าจะเริ่มจากหัตถการไหน ควรทำอย่างไร?',
    questionEn:
      'What should I do if I am not sure which treatment to start with?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'เริ่มจากการปรึกษาแพทย์เพื่อประเมินปัญหาหลักและกำหนดลำดับการรักษาแบบค่อยเป็นค่อยไปให้เหมาะกับงบและเป้าหมาย',
          },
        ],
      },
    ],
    answerEn: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Start with a doctor consultation. We will prioritize your concerns and create a step-by-step plan matching your budget and goals.',
          },
        ],
      },
    ],
  },
  {
    question: 'Drema Clinic มีทั้งหมดกี่สาขา และอยู่ที่ไหน?',
    questionEn: 'How many branches does Drema Clinic have and where are they?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'ปัจจุบันมี 2 สาขา ได้แก่ Town in Town และพร้อมพงษ์ (Emporium) สามารถดูที่อยู่และแผนที่ได้ในส่วน Footer ของเว็บไซต์',
          },
        ],
      },
    ],
    answerEn: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We currently have 2 branches: Town in Town and Phrom Phong (Emporium). Please check full address and map links in the website footer.',
          },
        ],
      },
    ],
  },
  {
    question: 'ติดต่อทีมงานได้เร็วที่สุดทางไหน?',
    questionEn: 'What is the fastest way to contact your team?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'ช่องทางที่รวดเร็วคือ LINE Official: @drema.emporium และโทรศัพท์ของแต่ละสาขาในเวลาทำการ',
          },
        ],
      },
    ],
    answerEn: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'The fastest channels are LINE Official: @drema.emporium and branch phone numbers during business hours.',
          },
        ],
      },
    ],
  },
  {
    question: 'หัตถการใช้เวลาพักฟื้นนานไหม?',
    questionEn: 'How long is the recovery time?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'ระยะเวลาพักฟื้นขึ้นอยู่กับประเภทหัตถการ โดยส่วนใหญ่สามารถใช้ชีวิตประจำวันได้ตามปกติภายใน 1-3 วัน',
          },
        ],
      },
    ],
    answerEn: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Recovery depends on the procedure, but most clients can resume daily activities within 1-3 days.',
          },
        ],
      },
    ],
  },
  {
    question: 'ผลลัพธ์จะเห็นเมื่อไหร่?',
    questionEn: 'When will I see results?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'บางหัตถการเห็นผลทันทีหลังทำ ขณะที่บางประเภทจะค่อยๆ ชัดเจนภายใน 2-8 สัปดาห์ ตามการตอบสนองของแต่ละบุคคล',
          },
        ],
      },
    ],
    answerEn: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Some treatments show immediate improvements, while others become more visible within 2-8 weeks depending on individual response.',
          },
        ],
      },
    ],
  },
  {
    question: 'ติดต่อจองคิวผ่านช่องทางไหนได้บ้าง?',
    questionEn: 'How can I book an appointment?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'สามารถจองคิวผ่านโทรศัพท์ของแต่ละสาขา หรือ LINE Official: @drema.emporium',
          },
        ],
      },
    ],
    answerEn: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'You can book via each branch phone number or LINE Official: @drema.emporium.',
          },
        ],
      },
    ],
  },
];

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'object',
  icon: DocumentTextIcon,
  initialValue: {
    heading: 'คำถามที่พบบ่อย',
    headingEn: 'Frequently Asked Questions',
    items: defaultFaqItems,
  },
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading (Thai / Default)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headingEn',
      title: 'Heading (English)',
      type: 'string',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Section Background Image',
      type: 'image',
      description:
        'Optional full-section background image. The website displays this image without an overlay.',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alternative text' }),
      ],
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({
              name: 'question',
              title: 'Question (Thai / Default)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'questionEn',
              title: 'Question (English)',
              type: 'string',
            }),
            defineField({
              name: 'answer',
              title: 'Answer (Thai / Default)',
              type: 'blockContent',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answerEn',
              title: 'Answer (English)',
              type: 'blockContent',
            }),
            defineField({
              name: 'effects',
              title: 'Motion Effects',
              type: 'sectionEffects',
            }),
          ],
          preview: {
            select: { title: 'question', subtitle: 'questionEn' },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Untitled',
                subtitle: subtitle || 'No English question',
              };
            },
          },
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
    select: { title: 'heading', subtitle: 'headingEn' },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled',
        subtitle: subtitle || 'FAQ',
      };
    },
  },
});
