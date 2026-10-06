import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Droplet,
  HeartHandshake,
  ShieldCheck,
  Smile,
  UserRound,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  getBreadcrumbLabel,
  homeBreadcrumb,
} from '@/components/shared/Breadcrumbs';
import GlobalCtaSection, {
  type GlobalCtaData,
  type GlobalSocialLink,
} from '@/components/shared/GlobalCtaSection';
import MarketingPageHero from '@/components/shared/MarketingPageHero';
import { getBaseURL, getLinkByLinkObject } from '@/lib/links';
import { buildLocalizedPath, buildLocalizedUrl } from '@/lib/locale';
import { urlForImage } from '@/lib/sanity/client/utils';

type BasicLink = {
  type?: 'internal' | 'external' | null;
  external?: string | null;
  href?: string | null;
  internal?: { _type?: string | null; slug?: string | null } | null;
} | null;

type TextItem = {
  _key?: string;
  textTh?: string | null;
  textEn?: string | null;
  descriptionTh?: string | null;
  descriptionEn?: string | null;
  image?: {
    alt?: string | null;
    asset?: { _id?: string | null; _ref?: string | null } | null;
  } | null;
  iconImage?: {
    alt?: string | null;
    asset?: { _id?: string | null; _ref?: string | null } | null;
  } | null;
  logoImage?: {
    alt?: string | null;
    asset?: { _id?: string | null; _ref?: string | null } | null;
  } | null;
  startingPriceTh?: string | null;
  startingPriceEn?: string | null;
  startingPriceTextColor?: string | null;
};

type LinkedTextItem = TextItem & { link?: BasicLink };

type FaqItem = {
  _key?: string;
  questionTh?: string | null;
  questionEn?: string | null;
  answerTh?: string | null;
  answerEn?: string | null;
};

type SanityImage = {
  alt?: string | null;
  asset?: { _id?: string | null; _ref?: string | null } | null;
} | null;

type ServicePageData = {
  _id?: string | null;
  slug?: { current?: string | null } | string | null;
  name?: string | null;
  heroHeadingTh?: string | null;
  heroHeadingEn?: string | null;
  heroDescriptionTh?: string | null;
  heroDescriptionEn?: string | null;
  heroImage?: {
    alt?: string | null;
    asset?: { _id?: string | null; _ref?: string | null } | null;
  } | null;
  heroImageDesktop?: {
    alt?: string | null;
    asset?: { _id?: string | null; _ref?: string | null } | null;
  } | null;
  heroImageMobile?: {
    alt?: string | null;
    asset?: { _id?: string | null; _ref?: string | null } | null;
  } | null;
  heroBackgroundDesktop?: {
    alt?: string | null;
    asset?: { _id?: string | null; _ref?: string | null } | null;
  } | null;
  heroBackgroundMobile?: {
    alt?: string | null;
    asset?: { _id?: string | null; _ref?: string | null } | null;
  } | null;
  heroPrimaryCtaTextTh?: string | null;
  heroPrimaryCtaTextEn?: string | null;
  heroPrimaryCtaLink?: BasicLink;
  heroSecondaryCtaTextTh?: string | null;
  heroSecondaryCtaTextEn?: string | null;
  heroSecondaryCtaLink?: BasicLink;
  quickAnswerTitleTh?: string | null;
  quickAnswerTitleEn?: string | null;
  keyFactsItems?: TextItem[] | null;
  whatIsHeadingTh?: string | null;
  whatIsHeadingEn?: string | null;
  whatIsEyebrowTh?: string | null;
  whatIsEyebrowEn?: string | null;
  whatIsSubtitleTh?: string | null;
  whatIsSubtitleEn?: string | null;
  whatIsBodyTh?: string | null;
  whatIsBodyEn?: string | null;
  whatIsBackgroundImage?: SanityImage;
  whatIsBackgroundPositionX?: number | null;
  whatIsBackgroundPositionY?: number | null;
  whatIsSectionBackgroundImage?: SanityImage;
  whatIsSectionBackgroundPositionX?: number | null;
  whatIsSectionBackgroundPositionY?: number | null;
  whatIsSuitableHeadingTh?: string | null;
  whatIsSuitableHeadingEn?: string | null;
  whatIsSuitableItems?: TextItem[] | null;
  concernsHeadingTh?: string | null;
  concernsHeadingEn?: string | null;
  concernsEyebrowTh?: string | null;
  concernsEyebrowEn?: string | null;
  concernsSubtitleTh?: string | null;
  concernsSubtitleEn?: string | null;
  concernsItems?: TextItem[] | null;
  injectionAreasHeadingTh?: string | null;
  injectionAreasHeadingEn?: string | null;
  injectionAreasEyebrowTh?: string | null;
  injectionAreasEyebrowEn?: string | null;
  injectionAreasSubtitleTh?: string | null;
  injectionAreasSubtitleEn?: string | null;
  injectionAreasItems?: LinkedTextItem[] | null;
  highlightsHeadingTh?: string | null;
  highlightsHeadingEn?: string | null;
  highlightsItems?: TextItem[] | null;
  brandsHeadingTh?: string | null;
  brandsHeadingEn?: string | null;
  brandsIntroTh?: string | null;
  brandsIntroEn?: string | null;
  brandsItems?: TextItem[] | null;
  stepsHeadingTh?: string | null;
  stepsHeadingEn?: string | null;
  stepsItems?: TextItem[] | null;
  aftercareHeadingTh?: string | null;
  aftercareHeadingEn?: string | null;
  aftercareItems?: TextItem[] | null;
  whyDremaHeadingTh?: string | null;
  whyDremaHeadingEn?: string | null;
  whyDremaItems?: TextItem[] | null;
  faqItems?: FaqItem[] | null;
  keyFactsBackgroundImage?: SanityImage;
  definitionProblemsBackgroundImage?: SanityImage;
  injectionAreasBackgroundImage?: SanityImage;
  highlightsBrandsBackgroundImage?: SanityImage;
  processAftercareBackgroundImage?: SanityImage;
  suitableWhyBackgroundImage?: SanityImage;
  faqBackgroundImage?: SanityImage;
  relatedLinksBackgroundImage?: SanityImage;
  keyFactsBackgroundPositionX?: number | null;
  keyFactsBackgroundPositionY?: number | null;
  definitionProblemsBackgroundPositionX?: number | null;
  definitionProblemsBackgroundPositionY?: number | null;
  injectionAreasBackgroundPositionX?: number | null;
  injectionAreasBackgroundPositionY?: number | null;
  highlightsBrandsBackgroundPositionX?: number | null;
  highlightsBrandsBackgroundPositionY?: number | null;
  processAftercareBackgroundPositionX?: number | null;
  processAftercareBackgroundPositionY?: number | null;
  suitableWhyBackgroundPositionX?: number | null;
  suitableWhyBackgroundPositionY?: number | null;
  faqBackgroundPositionX?: number | null;
  faqBackgroundPositionY?: number | null;
  relatedLinksBackgroundPositionX?: number | null;
  relatedLinksBackgroundPositionY?: number | null;
  citationSummaryTh?: string | null;
  citationSummaryEn?: string | null;
  ctaHeadingTh?: string | null;
  ctaHeadingEn?: string | null;
  ctaTextTh?: string | null;
  ctaTextEn?: string | null;
  ctaPrimaryTextTh?: string | null;
  ctaPrimaryTextEn?: string | null;
  ctaPrimaryLink?: BasicLink;
  ctaSecondaryTextTh?: string | null;
  ctaSecondaryTextEn?: string | null;
  ctaSecondaryLink?: BasicLink;
};

const localizeHref = (href: string, locale: 'th' | 'en') => {
  if (!href || href === '#' || href.startsWith('http')) return href || '#';
  if (href.startsWith('/th') || href.startsWith('/en')) return href;
  return buildLocalizedPath(locale, href);
};

const toHref = (link: BasicLink, locale: 'th' | 'en') =>
  link ? localizeHref(getLinkByLinkObject(link as never) || '#', locale) : '#';

const pickText = (item: TextItem | undefined, isEn: boolean) =>
  (isEn ? item?.textEn : item?.textTh) || '';

const pickDescription = (item: TextItem | undefined, isEn: boolean) =>
  (isEn ? item?.descriptionEn : item?.descriptionTh) || '';

const pickOptionalString = (source: unknown, key: string) =>
  (source as Record<string, string | undefined>)[key];

const getSlugValue = (slug: ServicePageData['slug']) =>
  typeof slug === 'string' ? slug : slug?.current || '';

const baseFillerFallback = {
  schemaNameTh: 'ฟิลเลอร์ (Filler)',
  schemaNameEn: 'Filler',
  schemaAlternateName: 'Dermal filler',
  schemaProcedureType: 'Non-surgical aesthetic injectable treatment',
  schemaBodyLocationTh: 'ใบหน้า',
  schemaBodyLocationEn: 'Face',
  schemaHowPerformedTh:
    'แพทย์ประเมินใบหน้า วางแผนตำแหน่งและปริมาณ เตรียมผิว ฉีดฟิลเลอร์ด้วยเทคนิคที่เหมาะสม และให้คำแนะนำหลังทำ',
  schemaHowPerformedEn:
    'A doctor assesses the face, plans injection areas and amount, prepares the skin, injects filler with a suitable technique, and provides aftercare guidance.',
  heroImageAltTh: 'ฟิลเลอร์ปรับรูปหน้าโดยแพทย์ Drema Clinic',
  heroImageAltEn: 'Facial filler treatment by a Drema Clinic doctor',
  primaryCtaAriaTh: 'ปรึกษาแพทย์เรื่องฟิลเลอร์',
  primaryCtaAriaEn: 'Consult a doctor about filler',
  secondaryCtaAriaTh: 'นัดหมายฉีดฟิลเลอร์',
  secondaryCtaAriaEn: 'Book a filler appointment',
  quickAnswerTitleTh: 'ข้อมูลฟิลเลอร์แบบสรุปสำหรับการตัดสินใจ',
  quickAnswerTitleEn: 'Filler quick answer',
  faqTitleTh: 'คำถามที่พบบ่อยเกี่ยวกับฟิลเลอร์',
  faqTitleEn: 'Filler FAQ',
  heroHeadingTh: 'ฟิลเลอร์ (Filler)',
  heroHeadingEn: 'Filler',
  heroDescriptionTh:
    'ปรับรูปหน้า เติมเต็ม และฟื้นฟูผิวด้วยฟิลเลอร์มาตรฐาน โดยแพทย์ผู้มีประสบการณ์',
  heroDescriptionEn:
    'Facial balancing, volume restoration, and skin support with authentic dermal fillers planned by experienced doctors.',
  primaryCtaTh: 'ปรึกษาแพทย์',
  primaryCtaEn: 'Consult a Doctor',
  secondaryCtaTh: 'นัดหมาย',
  secondaryCtaEn: 'Book Appointment',
  keyFacts: [
    {
      textTh: 'ฟิลเลอร์ส่วนใหญ่เป็นสาร Hyaluronic Acid (HA)',
      textEn:
        'Most dermal fillers used in aesthetic clinics are Hyaluronic Acid (HA).',
    },
    {
      textTh: 'ใช้เพื่อเติมเต็มร่องลึก เพิ่มวอลลุ่ม และปรับสมดุลใบหน้า',
      textEn:
        'Fillers are used to soften deep folds, restore volume, and improve facial balance.',
    },
    {
      textTh: 'เห็นผลหลังทำ',
      textEn: 'Visible changes can usually be seen after treatment.',
    },
    {
      textTh:
        'ระยะเวลาอยู่ได้โดยทั่วไปประมาณ 6-18 เดือน ขึ้นอยู่กับชนิดฟิลเลอร์ ตำแหน่งที่ฉีด และร่างกายแต่ละบุคคล',
      textEn:
        'Results commonly last around 6-18 months, depending on filler type, injection area, aftercare, and individual metabolism.',
    },
    {
      textTh: 'ควรฉีดโดยแพทย์และใช้ฟิลเลอร์แท้ที่ตรวจสอบได้',
      textEn:
        'Filler injections should be performed by a doctor using authentic, verifiable products.',
    },
  ],
  definition: {
    headingTh: 'Filler คืออะไร',
    headingEn: 'What is filler?',
    eyebrowTh: 'FILLER BASICS',
    eyebrowEn: 'FILLER BASICS',
    subtitleTh: 'ทำความเข้าใจสารเติมเต็มและการวางแผนก่อนฉีดโดยแพทย์',
    subtitleEn:
      'Understand dermal fillers and doctor-led planning before treatment',
    bodyTh:
      'ฟิลเลอร์ (Filler) คือสารเติมเต็มที่ใช้ฉีดเข้าสู่ชั้นผิวหรือชั้นเนื้อเยื่อเพื่อเติมเต็มร่องลึก เพิ่มวอลลุ่ม และปรับสมดุลของใบหน้า โดยฟิลเลอร์ที่นิยมใช้ในคลินิกความงามมักเป็น Hyaluronic Acid (HA) ซึ่งเป็นสารที่มีอยู่ในร่างกายตามธรรมชาติและสามารถสลายได้',
    bodyEn:
      'Filler is an injectable substance placed into the skin or soft tissue to soften deep folds, restore volume, and improve facial balance. In aesthetic clinics, commonly used fillers are often Hyaluronic Acid (HA), a substance naturally found in the body that can gradually break down.',
  },
  problemsHeadingTh: 'ปัญหาที่ Filler ช่วยได้',
  problemsHeadingEn: 'Concerns filler can help with',
  problemsEyebrowTh: 'COMMON CONCERNS',
  problemsEyebrowEn: 'COMMON CONCERNS',
  problemsSubtitleTh: 'เติมเต็มและปรับสมดุลใบหน้าอย่างเป็นธรรมชาติ',
  problemsSubtitleEn: 'Restore volume and improve facial balance naturally',
  problems: [
    { textTh: 'ร่องแก้มลึก', textEn: 'Deep nasolabial folds' },
    { textTh: 'ใต้ตาลึกหรือดูโทรม', textEn: 'Hollow or tired-looking under eyes' },
    { textTh: 'คางสั้นหรือรูปหน้าไม่สมดุล', textEn: 'Short chin or facial imbalance' },
    { textTh: 'ขมับตอบ', textEn: 'Hollow temples' },
    { textTh: 'แก้มตอบ', textEn: 'Sunken cheeks' },
    {
      textTh: 'ปากบางหรือต้องการเพิ่มมิติ',
      textEn: 'Thin lips or lips needing more definition',
    },
    {
      textTh: 'ผิวขาดวอลลุ่มหรือความชุ่มชื้น',
      textEn: 'Skin lacking volume or hydration',
    },
  ],
  areasHeadingTh: 'ตำแหน่งฉีดฟิลเลอร์ที่พบบ่อย',
  areasHeadingEn: 'Common filler treatment areas',
  areasEyebrowTh: 'TREATMENT AREAS',
  areasEyebrowEn: 'TREATMENT AREAS',
  areasSubtitleTh: 'เลือกตำแหน่งฉีดตามโครงหน้า ปัญหา และเป้าหมายผลลัพธ์ของแต่ละบุคคล',
  areasSubtitleEn:
    'Choose treatment areas based on facial structure, concerns, and individual goals',
  areas: [
    {
      textTh: 'ฟิลเลอร์ใต้ตา',
      textEn: 'Under-eye filler',
      href: '/category/under-eye-filler',
    },
    {
      textTh: 'ฟิลเลอร์คาง',
      textEn: 'Chin filler',
      href: '/category/chin-filler',
    },
    { textTh: 'ฟิลเลอร์ปาก', textEn: 'Lip filler', href: '/category/lip-filler' },
    {
      textTh: 'ฟิลเลอร์แก้ม',
      textEn: 'Cheek filler',
      href: '/category/cheek-filler',
    },
    {
      textTh: 'ฟิลเลอร์ขมับ',
      textEn: 'Temple filler',
      href: '/category/temple-filler',
    },
    {
      textTh: 'ฟิลเลอร์ร่องแก้ม',
      textEn: 'Nasolabial fold filler',
      href: '/category/nasolabial-filler',
    },
  ],
  brandsHeadingTh: 'แบรนด์ฟิลเลอร์ที่ใช้ในคลินิก',
  brandsHeadingEn: 'Filler brands used at the clinic',
  brandsIntroTh:
    'Drema Clinic เลือกใช้ฟิลเลอร์แท้จากแบรนด์ที่ผ่านการรับรองและสามารถตรวจสอบได้ โดยแพทย์จะเลือกชนิดและรุ่นของฟิลเลอร์ให้เหมาะกับตำแหน่งที่ฉีด ปัญหาใบหน้า และเป้าหมายของแต่ละบุคคล',
  brandsIntroEn:
    "Drema Clinic uses authentic fillers from approved and verifiable brands. The doctor selects the filler type and model based on the treatment area, facial concern, and each person's goal.",
  brands: ['Restylane', 'Juvederm', 'Belotero', 'Neuramis', 'Revanesse'].map(
    (text) => ({ textTh: text, textEn: text })
  ),
  faqs: [
    {
      questionTh: 'ฟิลเลอร์คืออะไร?',
      questionEn: 'What is filler?',
      answerTh:
        'ฟิลเลอร์คือสารเติมเต็มที่ใช้ฉีดเพื่อเติมเต็มร่องลึก เพิ่มวอลลุ่ม และปรับสมดุลใบหน้า โดยฟิลเลอร์ที่นิยมใช้มักเป็น Hyaluronic Acid หรือ HA',
      answerEn:
        'Filler is an injectable substance used to soften deep folds, restore volume, and improve facial balance. Commonly used fillers are often Hyaluronic Acid or HA.',
    },
    {
      questionTh: 'ฟิลเลอร์อยู่ได้นานแค่ไหน?',
      questionEn: 'How long does filler last?',
      answerTh:
        'โดยทั่วไปฟิลเลอร์อยู่ได้ประมาณ 6-18 เดือน ขึ้นอยู่กับชนิดของฟิลเลอร์ ตำแหน่งที่ฉีด การดูแลหลังทำ และร่างกายของแต่ละบุคคล',
      answerEn:
        "Filler commonly lasts around 6-18 months, depending on filler type, injection area, aftercare, and each person's body.",
    },
    {
      questionTh: 'ฉีดฟิลเลอร์เห็นผลทันทีไหม?',
      questionEn: 'Can filler results be seen immediately?',
      answerTh:
        'โดยทั่วไปสามารถเห็นความเปลี่ยนแปลงหลังฉีดได้ แต่ผลลัพธ์อาจเข้าที่มากขึ้นหลังอาการบวมลดลง',
      answerEn:
        'Changes are usually visible after injection, but the result may settle further after swelling reduces.',
    },
    {
      questionTh: 'ฟิลเลอร์อันตรายไหม?',
      questionEn: 'Is filler dangerous?',
      answerTh:
        'การฉีดฟิลเลอร์ควรทำโดยแพทย์และใช้ฟิลเลอร์แท้ที่ตรวจสอบได้ เพื่อลดความเสี่ยงและเพิ่มความปลอดภัย',
      answerEn:
        'Filler injections should be performed by a doctor using authentic, verifiable filler products to reduce risk and support safety.',
    },
    {
      questionTh: 'ฟิลเลอร์สลายได้ไหม?',
      questionEn: 'Can filler dissolve?',
      answerTh:
        'ฟิลเลอร์ชนิด Hyaluronic Acid สามารถสลายได้เองตามธรรมชาติ และสามารถใช้เอนไซม์ช่วยสลายได้ในบางกรณีตามดุลยพินิจของแพทย์',
      answerEn:
        "Hyaluronic Acid fillers can gradually break down naturally, and an enzyme may be used to dissolve them in selected cases at the doctor's discretion.",
    },
    {
      questionTh: 'หลังฉีดฟิลเลอร์ต้องพักฟื้นไหม?',
      questionEn: 'Is downtime needed after filler?',
      answerTh:
        'โดยทั่วไปไม่จำเป็นต้องพักฟื้นนาน สามารถใช้ชีวิตประจำวันได้ แต่ควรหลีกเลี่ยงการกดนวด ความร้อน และแอลกอฮอล์ในช่วงแรก',
      answerEn:
        'Long downtime is usually not required. Daily activities can often continue, but pressure, massage, heat, and alcohol should be avoided during the early period.',
    },
    {
      questionTh: 'ฟิลเลอร์เหมาะกับใคร?',
      questionEn: 'Who is filler suitable for?',
      answerTh:
        'เหมาะกับผู้ที่ต้องการเติมเต็มร่องลึก เพิ่มวอลลุ่ม หรือปรับสัดส่วนใบหน้าโดยไม่ผ่าตัด ทั้งนี้ควรได้รับการประเมินโดยแพทย์ก่อนทำ',
      answerEn:
        'Filler may suit people who want to soften folds, restore volume, or improve facial proportions without surgery. A doctor should assess suitability before treatment.',
    },
    {
      questionTh: 'ควรเลือกฟิลเลอร์แบรนด์ไหน?',
      questionEn: 'Which filler brand should I choose?',
      answerTh:
        'ควรเลือกจากปัญหา ตำแหน่งที่ฉีด และเป้าหมายของแต่ละบุคคล โดยแพทย์จะช่วยประเมินและเลือกฟิลเลอร์ที่เหมาะสม',
      answerEn:
        'The brand should be selected based on the concern, treatment area, and individual goal. The doctor will assess and choose a suitable filler.',
    },
  ],
  relatedLinks: [
    ['/services/botox', 'โบท็อกซ์', 'Botox'],
    ['/services/skin-booster', 'Skin Booster', 'Skin Booster'],
    ['/services/technology-devices', 'เครื่องมือเทคโนโลยี', 'Technology Devices'],
    ['/reviews', 'รีวิว', 'Reviews'],
    ['/doctors', 'แพทย์', 'Doctors'],
    ['/contact', 'ติดต่อเรา', 'Contact'],
  ],
};

const botoxFallback = {
  schemaNameTh: 'โบท็อกซ์ (Botox)',
  schemaNameEn: 'Botox',
  schemaAlternateName: 'Botulinum toxin injection',
  schemaProcedureType: 'Non-surgical aesthetic injectable treatment',
  schemaBodyLocationTh: 'ใบหน้าและกล้ามเนื้อเฉพาะจุด',
  schemaBodyLocationEn: 'Face and selected muscles',
  schemaHowPerformedTh:
    'แพทย์ประเมินกล้ามเนื้อและรูปหน้า วางแผนตำแหน่งและปริมาณ ทำความสะอาดผิว ฉีดโบท็อกซ์ในจุดที่เหมาะสม และให้คำแนะนำหลังทำ',
  schemaHowPerformedEn:
    'A doctor assesses muscle movement and facial structure, plans injection points and dosage, cleanses the skin, injects Botox in suitable areas, and provides aftercare guidance.',
  heroImageAltTh: 'โบท็อกซ์ลดริ้วรอยและปรับรูปหน้าโดยแพทย์ Drema Clinic',
  heroImageAltEn:
    'Botox wrinkle and facial contour treatment by a Drema Clinic doctor',
  primaryCtaAriaTh: 'ปรึกษาแพทย์เรื่องโบท็อกซ์',
  primaryCtaAriaEn: 'Consult a doctor about Botox',
  secondaryCtaAriaTh: 'นัดหมายฉีดโบท็อกซ์',
  secondaryCtaAriaEn: 'Book a Botox appointment',
  quickAnswerTitleTh: 'ข้อมูลโบท็อกซ์แบบสรุปสำหรับการตัดสินใจ',
  quickAnswerTitleEn: 'Botox quick answer',
  faqTitleTh: 'คำถามที่พบบ่อยเกี่ยวกับโบท็อกซ์',
  faqTitleEn: 'Botox FAQ',
  heroHeadingTh: 'โบท็อกซ์ (Botox)',
  heroHeadingEn: 'Botox',
  heroDescriptionTh:
    'ลดริ้วรอย ปรับรูปหน้า และช่วยให้ใบหน้าดูผ่อนคลายเป็นธรรมชาติ ด้วยโบท็อกซ์แท้ที่วางแผนโดยแพทย์',
  heroDescriptionEn:
    'Reduce expression lines, refine facial contour, and support a natural relaxed look with authentic Botox planned by doctors.',
  primaryCtaTh: 'ปรึกษาแพทย์',
  primaryCtaEn: 'Consult a Doctor',
  secondaryCtaTh: 'นัดหมาย',
  secondaryCtaEn: 'Book Appointment',
  keyFacts: [
    {
      textTh:
        'โบท็อกซ์คือสาร Botulinum toxin type A ที่ใช้เพื่อลดการทำงานของกล้ามเนื้อเฉพาะจุดชั่วคราว',
      textEn:
        'Botox is a Botulinum toxin type A injectable used to temporarily reduce selected muscle activity.',
    },
    {
      textTh:
        'ใช้เพื่อลดริ้วรอยจากการแสดงสีหน้า ปรับกรอบหน้า และดูแลปัญหากล้ามเนื้อบางตำแหน่ง',
      textEn:
        'It can help soften expression lines, refine facial contour, and address selected muscle-related concerns.',
    },
    {
      textTh: 'โดยทั่วไปเริ่มเห็นผลภายในไม่กี่วัน และผลลัพธ์ชัดขึ้นประมาณ 1-2 สัปดาห์',
      textEn:
        'Results usually begin within a few days and become clearer around 1-2 weeks after treatment.',
    },
    {
      textTh:
        'ผลลัพธ์โดยทั่วไปอยู่ได้ประมาณ 3-6 เดือน ขึ้นอยู่กับตำแหน่งที่ฉีด ปริมาณ และร่างกายแต่ละบุคคล',
      textEn:
        'Results commonly last around 3-6 months, depending on the injection area, dosage, and individual response.',
    },
    {
      textTh:
        'ควรฉีดโดยแพทย์และใช้โบท็อกซ์แท้ที่ตรวจสอบได้ เพื่อลดความเสี่ยงและให้ผลลัพธ์ดูเป็นธรรมชาติ',
      textEn:
        'Botox should be injected by a doctor using authentic, verifiable products to reduce risk and support natural-looking outcomes.',
    },
  ],
  definition: {
    headingTh: 'Botox คืออะไร',
    headingEn: 'What is Botox?',
    bodyTh:
      'โบท็อกซ์ (Botox) คือชื่อที่ใช้เรียกสารกลุ่ม Botulinum toxin type A ซึ่งใช้ฉีดเพื่อลดการทำงานของกล้ามเนื้อเฉพาะจุดชั่วคราว ช่วยให้ริ้วรอยจากการแสดงสีหน้าดูจางลง และสามารถใช้ปรับรูปหน้าในบางตำแหน่ง เช่น กราม หรือกรอบหน้า โดยแพทย์จะประเมินตำแหน่งและปริมาณให้เหมาะกับแต่ละบุคคล',
    bodyEn:
      'Botox commonly refers to Botulinum toxin type A, an injectable used to temporarily reduce selected muscle activity. It can soften expression lines and refine facial contour in suitable areas such as the jawline or masseter area, with injection points and dosage planned by a doctor.',
  },
  problemsHeadingTh: 'ปัญหาที่ Botox ช่วยได้',
  problemsHeadingEn: 'Concerns Botox can help with',
  problems: [
    { textTh: 'ริ้วรอยหน้าผาก', textEn: 'Forehead lines' },
    { textTh: 'รอยขมวดคิ้ว', textEn: 'Frown lines' },
    { textTh: 'ริ้วรอยหางตา', textEn: 'Crow’s feet' },
    { textTh: 'กรามเด่นจากกล้ามเนื้อ', textEn: 'Prominent masseter muscles' },
    {
      textTh: 'กรอบหน้าไม่ชัดในบางกรณี',
      textEn: 'Mild facial contour imbalance in selected cases',
    },
    { textTh: 'มุมปากตกบางลักษณะ', textEn: 'Selected downturned mouth concerns' },
    { textTh: 'เหงื่อออกมากเฉพาะจุด', textEn: 'Localized excessive sweating' },
  ],
  areasHeadingTh: 'ตำแหน่งฉีดโบท็อกซ์ที่พบบ่อย',
  areasHeadingEn: 'Common Botox treatment areas',
  areas: [
    {
      textTh: 'โบท็อกซ์หน้าผาก',
      textEn: 'Forehead Botox',
      href: '/category/forehead-botox',
    },
    {
      textTh: 'โบท็อกซ์ลดกราม',
      textEn: 'Jaw Botox / Slim Face',
      href: '/category/jaw-botox-slim-face',
    },
    {
      textTh: 'โบท็อกซ์ลดริ้วรอย',
      textEn: 'Botox for wrinkles',
      href: '/category/botox-for-wrinkles',
    },
    {
      textTh: 'โบท็อกซ์หางตา',
      textEn: 'Crow’s feet Botox',
      href: '/category/botox',
    },
    {
      textTh: 'โบท็อกซ์ลิฟต์กรอบหน้า',
      textEn: 'Facial contour Botox',
      href: '/category/botox',
    },
    {
      textTh: 'โบท็อกซ์ลดเหงื่อ',
      textEn: 'Sweat reduction Botox',
      href: '/category/botox',
    },
  ],
  brandsHeadingTh: 'แบรนด์โบท็อกซ์ที่ใช้ในคลินิก',
  brandsHeadingEn: 'Botox brands used at the clinic',
  brandsIntroTh:
    'Drema Clinic เลือกใช้โบท็อกซ์แท้จากแบรนด์ที่ผ่านการรับรองและสามารถตรวจสอบได้ โดยแพทย์จะเลือกแบรนด์ ปริมาณ และตำแหน่งฉีดให้เหมาะกับกล้ามเนื้อ ปัญหาใบหน้า และเป้าหมายของแต่ละบุคคล',
  brandsIntroEn:
    'Drema Clinic uses authentic, approved, and verifiable botulinum toxin products. The doctor selects the brand, dosage, and injection points based on muscle activity, facial concerns, and each person’s goals.',
  brands: ['Allergan', 'Dysport', 'Xeomin', 'Nabota', 'Aestox'].map((text) => ({
    textTh: text,
    textEn: text,
  })),
  faqs: [
    {
      questionTh: 'โบท็อกซ์คืออะไร?',
      questionEn: 'What is Botox?',
      answerTh:
        'โบท็อกซ์คือสารกลุ่ม Botulinum toxin type A ที่ใช้ฉีดเพื่อลดการทำงานของกล้ามเนื้อเฉพาะจุดชั่วคราว ช่วยลดริ้วรอยจากการแสดงสีหน้าและปรับรูปหน้าในบางตำแหน่ง',
      answerEn:
        'Botox is a Botulinum toxin type A injectable used to temporarily reduce selected muscle activity. It can soften expression lines and refine facial contour in suitable areas.',
    },
    {
      questionTh: 'โบท็อกซ์อยู่ได้นานแค่ไหน?',
      questionEn: 'How long does Botox last?',
      answerTh:
        'โดยทั่วไปผลลัพธ์ของโบท็อกซ์อยู่ได้ประมาณ 3-6 เดือน ขึ้นอยู่กับตำแหน่งที่ฉีด ปริมาณ การดูแลหลังทำ และการตอบสนองของแต่ละบุคคล',
      answerEn:
        'Botox results commonly last around 3-6 months, depending on the injection area, dosage, aftercare, and individual response.',
    },
    {
      questionTh: 'ฉีดโบท็อกซ์เห็นผลเมื่อไร?',
      questionEn: 'When will Botox results appear?',
      answerTh:
        'โดยทั่วไปเริ่มเห็นการเปลี่ยนแปลงภายในไม่กี่วัน และผลลัพธ์มักชัดขึ้นประมาณ 1-2 สัปดาห์หลังฉีด',
      answerEn:
        'Changes usually begin within a few days, and results often become clearer around 1-2 weeks after injection.',
    },
    {
      questionTh: 'โบท็อกซ์อันตรายไหม?',
      questionEn: 'Is Botox dangerous?',
      answerTh:
        'การฉีดโบท็อกซ์ควรทำโดยแพทย์และใช้ผลิตภัณฑ์แท้ที่ตรวจสอบได้ เพื่อลดความเสี่ยงและวางตำแหน่งฉีดให้เหมาะสม',
      answerEn:
        'Botox should be injected by a doctor using authentic, verifiable products to reduce risk and ensure appropriate injection placement.',
    },
    {
      questionTh: 'หลังฉีดโบท็อกซ์ต้องพักฟื้นไหม?',
      questionEn: 'Is downtime needed after Botox?',
      answerTh:
        'โดยทั่วไปไม่จำเป็นต้องพักฟื้นนาน สามารถใช้ชีวิตประจำวันได้ แต่ควรหลีกเลี่ยงการนอนราบ กดนวด ความร้อน และออกกำลังกายหนักในช่วงแรก',
      answerEn:
        'Long downtime is usually not required. Daily activities can often continue, but lying flat, massage, heat, and heavy exercise should be avoided during the early period.',
    },
    {
      questionTh: 'โบท็อกซ์เหมาะกับใคร?',
      questionEn: 'Who is Botox suitable for?',
      answerTh:
        'เหมาะกับผู้ที่ต้องการลดริ้วรอยจากการแสดงสีหน้า ปรับกรามหรือรูปหน้าในบางตำแหน่งโดยไม่ผ่าตัด ทั้งนี้ควรได้รับการประเมินโดยแพทย์ก่อนทำ',
      answerEn:
        'Botox may suit people who want to soften expression lines or refine selected facial areas without surgery. A doctor should assess suitability before treatment.',
    },
    {
      questionTh: 'ฉีดโบท็อกซ์แล้วหน้าจะแข็งไหม?',
      questionEn: 'Will Botox make the face look frozen?',
      answerTh:
        'ผลลัพธ์ขึ้นอยู่กับตำแหน่ง ปริมาณ และเทคนิคการฉีด หากวางแผนอย่างเหมาะสมสามารถช่วยให้ผลลัพธ์ดูเป็นธรรมชาติได้',
      answerEn:
        'The result depends on injection points, dosage, and technique. With appropriate planning, Botox can support a natural-looking result.',
    },
    {
      questionTh: 'ควรเลือกโบท็อกซ์แบรนด์ไหน?',
      questionEn: 'Which Botox brand should I choose?',
      answerTh:
        'ควรเลือกจากปัญหา ตำแหน่งที่ฉีด งบประมาณ และการประเมินของแพทย์ โดยต้องเป็นผลิตภัณฑ์แท้ที่ตรวจสอบได้',
      answerEn:
        'The brand should be selected based on the concern, injection area, budget, and doctor assessment. The product should be authentic and verifiable.',
    },
  ],
  relatedLinks: [
    ['/services/filler', 'ฟิลเลอร์', 'Filler'],
    ['/services/skin-booster', 'Skin Booster', 'Skin Booster'],
    ['/services/technology-devices', 'เครื่องมือเทคโนโลยี', 'Technology Devices'],
    ['/reviews', 'รีวิว', 'Reviews'],
    ['/doctors', 'แพทย์', 'Doctors'],
    ['/contact', 'ติดต่อเรา', 'Contact'],
  ],
};

const threadLiftFallback = {
  ...botoxFallback,
  schemaNameTh: 'ร้อยไหม (Thread Lift)',
  schemaNameEn: 'Thread Lift',
  schemaAlternateName: 'Thread lift treatment',
  schemaBodyLocationTh: 'ใบหน้าและกรอบหน้า',
  schemaBodyLocationEn: 'Face and jawline',
  schemaHowPerformedTh:
    'แพทย์ประเมินใบหน้า วางแผนแนวดึง ทำความสะอาดผิว ใส่ไหมในชั้นผิวที่เหมาะสม และให้คำแนะนำหลังทำ',
  schemaHowPerformedEn:
    'A doctor assesses facial structure, plans lifting vectors, cleanses the skin, places threads in suitable tissue layers, and provides aftercare guidance.',
  heroImageAltTh: 'ร้อยไหมยกกระชับใบหน้าโดยแพทย์ Drema Clinic',
  heroImageAltEn:
    'Thread lift facial contour treatment by a Drema Clinic doctor',
  primaryCtaAriaTh: 'ปรึกษาแพทย์เรื่องร้อยไหม',
  primaryCtaAriaEn: 'Consult a doctor about thread lift',
  secondaryCtaAriaTh: 'นัดหมายร้อยไหม',
  secondaryCtaAriaEn: 'Book a thread lift appointment',
  quickAnswerTitleTh: 'ข้อมูลร้อยไหมแบบสรุปสำหรับการตัดสินใจ',
  quickAnswerTitleEn: 'Thread lift quick answer',
  faqTitleTh: 'คำถามที่พบบ่อยเกี่ยวกับร้อยไหม',
  faqTitleEn: 'Thread Lift FAQ',
  heroHeadingTh: 'ร้อยไหม (Thread Lift)',
  heroHeadingEn: 'Thread Lift',
  heroDescriptionTh: 'ยกกระชับและปรับกรอบหน้าโดยไม่ผ่าตัด ด้วยการวางแผนแนวดึงโดยแพทย์',
  heroDescriptionEn:
    'Non-surgical facial lifting and contour support with doctor-led thread placement planning.',
  keyFacts: [
    {
      textTh: 'ร้อยไหมเป็นหัตถการยกกระชับใบหน้าโดยไม่ผ่าตัด',
      textEn: 'Thread lift is a non-surgical facial lifting procedure.',
    },
  ],
  definition: {
    headingTh: 'Thread Lift คืออะไร',
    headingEn: 'What is thread lift?',
    bodyTh:
      'ร้อยไหมคือหัตถการที่ใช้ไหมละลายสอดเข้าสู่ชั้นผิวหรือชั้นเนื้อเยื่อเพื่อช่วยพยุงและยกกระชับใบหน้า โดยแพทย์จะประเมินแนวดึงและตำแหน่งที่เหมาะกับแต่ละบุคคล',
    bodyEn:
      'Thread lift uses dissolvable threads placed in selected tissue layers to support and lift facial contours. A doctor plans the lifting vectors and placement for each person.',
  },
  faqs: [
    {
      questionTh: 'ร้อยไหมคืออะไร?',
      questionEn: 'What is thread lift?',
      answerTh:
        'ร้อยไหมคือหัตถการยกกระชับใบหน้าโดยใช้ไหมละลายเพื่อช่วยพยุงผิวและปรับกรอบหน้าโดยไม่ผ่าตัด',
      answerEn:
        'Thread lift is a non-surgical lifting procedure using dissolvable threads to support skin and refine facial contours.',
    },
  ],
  relatedLinks: [
    ['/services/filler', 'ฟิลเลอร์', 'Filler'],
    ['/services/botox', 'โบท็อกซ์', 'Botox'],
    ['/services/technology-devices', 'เครื่องมือเทคโนโลยี', 'Technology Devices'],
    ['/reviews', 'รีวิว', 'Reviews'],
    ['/doctors', 'แพทย์', 'Doctors'],
    ['/contact', 'ติดต่อเรา', 'Contact'],
  ],
};

const technologyDevicesFallback = {
  ...botoxFallback,
  schemaNameTh: 'เครื่องมือเทคโนโลยีด้านผิวและยกกระชับ',
  schemaNameEn: 'Aesthetic Technology Devices',
  schemaAlternateName: 'Energy-based aesthetic treatment',
  schemaBodyLocationTh: 'ใบหน้า ผิว และลำตัวบางตำแหน่ง',
  schemaBodyLocationEn: 'Face, skin, and selected body areas',
  schemaHowPerformedTh:
    'แพทย์หรือผู้เชี่ยวชาญประเมินปัญหา เลือกเครื่องมือและพลังงานที่เหมาะสม ทำความสะอาดผิว และให้คำแนะนำหลังทำ',
  schemaHowPerformedEn:
    'A clinician assesses concerns, selects suitable technology settings, prepares the skin, performs treatment, and provides aftercare guidance.',
  heroImageAltTh: 'เครื่องมือเทคโนโลยียกกระชับและดูแลผิว Drema Clinic',
  heroImageAltEn: 'Aesthetic technology treatment at Drema Clinic',
  primaryCtaAriaTh: 'ปรึกษาแพทย์เรื่องเครื่องมือเทคโนโลยี',
  primaryCtaAriaEn: 'Consult about aesthetic technology devices',
  secondaryCtaAriaTh: 'นัดหมายทำหัตถการด้วยเครื่องมือเทคโนโลยี',
  secondaryCtaAriaEn: 'Book an aesthetic technology appointment',
  quickAnswerTitleTh: 'ข้อมูลเครื่องมือเทคโนโลยีแบบสรุปสำหรับการตัดสินใจ',
  quickAnswerTitleEn: 'Technology devices quick answer',
  faqTitleTh: 'คำถามที่พบบ่อยเกี่ยวกับเครื่องมือเทคโนโลยี',
  faqTitleEn: 'Technology Devices FAQ',
  heroHeadingTh: 'เครื่องมือเทคโนโลยี (Technology Devices)',
  heroHeadingEn: 'Technology Devices',
  heroDescriptionTh:
    'ดูแลผิว ยกกระชับ และปรับคุณภาพผิวด้วยเทคโนโลยีที่เลือกตามปัญหาเฉพาะบุคคล',
  heroDescriptionEn:
    'Skin quality, lifting, and contour treatments using technologies selected for individual concerns.',
  definition: {
    headingTh: 'Technology Devices คืออะไร',
    headingEn: 'What are aesthetic technology devices?',
    bodyTh:
      'เครื่องมือเทคโนโลยีด้านความงามคือกลุ่มหัตถการที่ใช้พลังงานหรือระบบเฉพาะ เช่น คลื่นเสียง คลื่นวิทยุ เลเซอร์ หรือแสง เพื่อช่วยดูแลผิว ยกกระชับ หรือปรับคุณภาพผิวตามปัญหา',
    bodyEn:
      'Aesthetic technology devices use energy or targeted systems such as ultrasound, radiofrequency, laser, or light to support skin quality, lifting, and selected skin concerns.',
  },
  relatedLinks: [
    [
      '/services/skin-booster-biostimulator',
      'Skin Booster / Biostimulator',
      'Skin Booster / Biostimulator',
    ],
    ['/services/filler', 'ฟิลเลอร์', 'Filler'],
    ['/services/botox', 'โบท็อกซ์', 'Botox'],
    ['/reviews', 'รีวิว', 'Reviews'],
    ['/doctors', 'แพทย์', 'Doctors'],
    ['/contact', 'ติดต่อเรา', 'Contact'],
  ],
};

const skinBoosterFallback = {
  ...botoxFallback,
  schemaNameTh: 'Skin Booster และ Biostimulator',
  schemaNameEn: 'Skin Booster and Biostimulator',
  schemaAlternateName: 'Injectable skin quality treatment',
  schemaBodyLocationTh: 'ผิวหน้าและผิวบริเวณที่ต้องการฟื้นฟู',
  schemaBodyLocationEn: 'Face and selected skin areas',
  schemaHowPerformedTh:
    'แพทย์ประเมินคุณภาพผิว เลือกสารและตำแหน่งฉีด ทำความสะอาดผิว ฉีดหรือทำหัตถการตามแผน และให้คำแนะนำหลังทำ',
  schemaHowPerformedEn:
    'A doctor assesses skin quality, selects suitable injectables and areas, prepares the skin, performs treatment, and provides aftercare guidance.',
  heroImageAltTh: 'Skin Booster และ Biostimulator ฟื้นฟูคุณภาพผิว Drema Clinic',
  heroImageAltEn: 'Skin booster and biostimulator treatment at Drema Clinic',
  primaryCtaAriaTh: 'ปรึกษาแพทย์เรื่อง Skin Booster และ Biostimulator',
  primaryCtaAriaEn: 'Consult about skin booster and biostimulator',
  secondaryCtaAriaTh: 'นัดหมายทำ Skin Booster และ Biostimulator',
  secondaryCtaAriaEn: 'Book a skin booster and biostimulator appointment',
  quickAnswerTitleTh: 'ข้อมูล Skin Booster และ Biostimulator แบบสรุป',
  quickAnswerTitleEn: 'Skin booster quick answer',
  faqTitleTh: 'คำถามที่พบบ่อยเกี่ยวกับ Skin Booster และ Biostimulator',
  faqTitleEn: 'Skin Booster FAQ',
  heroHeadingTh: 'Skin Booster และ Biostimulator',
  heroHeadingEn: 'Skin Booster and Biostimulator',
  heroDescriptionTh:
    'ฟื้นฟูคุณภาพผิว ความชุ่มชื้น และความยืดหยุ่น ด้วยแผนการดูแลที่เหมาะกับสภาพผิว',
  heroDescriptionEn:
    'Improve skin hydration, elasticity, and quality with treatment plans selected for your skin condition.',
  definition: {
    headingTh: 'Skin Booster และ Biostimulator คืออะไร',
    headingEn: 'What are skin boosters and biostimulators?',
    bodyTh:
      'Skin Booster และ Biostimulator คือกลุ่มหัตถการฉีดเพื่อช่วยฟื้นฟูคุณภาพผิว เพิ่มความชุ่มชื้น หรือกระตุ้นกระบวนการสร้างคอลลาเจนตามชนิดของสารที่ใช้',
    bodyEn:
      'Skin boosters and biostimulators are injectable treatments used to improve skin quality, hydration, and collagen support depending on the selected product.',
  },
  relatedLinks: [
    ['/services/filler', 'ฟิลเลอร์', 'Filler'],
    ['/services/technology-devices', 'เครื่องมือเทคโนโลยี', 'Technology Devices'],
    ['/services/botox', 'โบท็อกซ์', 'Botox'],
    ['/reviews', 'รีวิว', 'Reviews'],
    ['/doctors', 'แพทย์', 'Doctors'],
    ['/contact', 'ติดต่อเรา', 'Contact'],
  ],
};

const facialConcernsFallback = {
  ...botoxFallback,
  schemaNameTh: 'การดูแลปัญหาใบหน้าเฉพาะบุคคล',
  schemaNameEn: 'Facial Concerns Consultation',
  schemaAlternateName: 'Personalized facial concern treatment planning',
  schemaBodyLocationTh: 'ใบหน้า',
  schemaBodyLocationEn: 'Face',
  schemaHowPerformedTh:
    'แพทย์ประเมินปัญหาใบหน้า วิเคราะห์สาเหตุ เลือกบริการที่เหมาะสม และวางแผนการดูแลเฉพาะบุคคล',
  schemaHowPerformedEn:
    'A doctor assesses facial concerns, identifies contributing factors, selects suitable treatments, and creates an individualized plan.',
  heroImageAltTh: 'ประเมินปัญหาใบหน้าเฉพาะบุคคลโดยแพทย์ Drema Clinic',
  heroImageAltEn:
    'Personalized facial concern assessment by a Drema Clinic doctor',
  primaryCtaAriaTh: 'ปรึกษาแพทย์เรื่องปัญหาใบหน้า',
  primaryCtaAriaEn: 'Consult a doctor about facial concerns',
  secondaryCtaAriaTh: 'นัดหมายประเมินปัญหาใบหน้า',
  secondaryCtaAriaEn: 'Book a facial concern consultation',
  quickAnswerTitleTh: 'ข้อมูลปัญหาใบหน้าแบบสรุปสำหรับการตัดสินใจ',
  quickAnswerTitleEn: 'Facial concerns quick answer',
  faqTitleTh: 'คำถามที่พบบ่อยเกี่ยวกับการดูแลปัญหาใบหน้า',
  faqTitleEn: 'Facial Concerns FAQ',
  heroHeadingTh: 'ปัญหาใบหน้า (Facial Concerns)',
  heroHeadingEn: 'Facial Concerns',
  heroDescriptionTh: 'ประเมินปัญหาใบหน้าและออกแบบแผนการดูแลเฉพาะบุคคลโดยแพทย์',
  heroDescriptionEn:
    'Doctor-led facial assessment and personalized treatment planning for individual concerns.',
  definition: {
    headingTh: 'Facial Concerns คืออะไร',
    headingEn: 'What are facial concerns?',
    bodyTh:
      'Facial Concerns คือการประเมินปัญหาใบหน้าแบบองค์รวม เช่น ริ้วรอย ผิวหย่อนคล้อย รูปหน้าไม่สมดุล ร่องลึก หรือคุณภาพผิว เพื่อเลือกแนวทางดูแลที่เหมาะกับสาเหตุและเป้าหมายของแต่ละบุคคล',
    bodyEn:
      'Facial concerns refer to a holistic assessment of issues such as lines, sagging, facial imbalance, deep folds, or skin quality to choose suitable treatments for each person.',
  },
  relatedLinks: [
    ['/services/filler', 'ฟิลเลอร์', 'Filler'],
    ['/services/botox', 'โบท็อกซ์', 'Botox'],
    [
      '/services/skin-booster-biostimulator',
      'Skin Booster / Biostimulator',
      'Skin Booster / Biostimulator',
    ],
    ['/reviews', 'รีวิว', 'Reviews'],
    ['/doctors', 'แพทย์', 'Doctors'],
    ['/contact', 'ติดต่อเรา', 'Contact'],
  ],
};

const serviceSeoFallbacks = {
  filler: baseFillerFallback,
  botox: botoxFallback,
  'thread-lift': threadLiftFallback,
  'technology-devices': technologyDevicesFallback,
  'skin-booster-biostimulator': skinBoosterFallback,
  'facial-concerns': facialConcernsFallback,
} as const;

type ServiceSeoSlug = keyof typeof serviceSeoFallbacks;

const serviceReviewCtas: Partial<
  Record<
    ServiceSeoSlug,
    {
      href: string;
      labelTh: string;
      labelEn: string;
    }
  >
> = {
  botox: {
    href: '/reviews/review-botox',
    labelTh: 'ดูรีวิวโบท็อกซ์จากเคสจริง',
    labelEn: 'See real Botox reviews',
  },
  'thread-lift': {
    href: '/reviews/review-thread-lift',
    labelTh: 'ดูรีวิวร้อยไหมจากเคสจริง',
    labelEn: 'See real thread lift reviews',
  },
  'technology-devices': {
    href: '/reviews/review-endolift',
    labelTh: 'ดูรีวิว Endolift จากเคสจริง',
    labelEn: 'See real Endolift reviews',
  },
  'skin-booster-biostimulator': {
    href: '/reviews/review-skin-booster',
    labelTh: 'ดูรีวิว Skin Booster จากเคสจริง',
    labelEn: 'See real Skin Booster reviews',
  },
  'facial-concerns': {
    href: '/reviews/review-facial-contouring',
    labelTh: 'ดูรีวิวปรับรูปหน้าจากเคสจริง',
    labelEn: 'See real facial contouring reviews',
  },
};

function DotList({
  items,
  isEn,
  locale,
}: {
  items?: LinkedTextItem[] | null;
  isEn: boolean;
  locale: 'th' | 'en';
}) {
  return (
    <ul className="space-y-3">
      {(items || []).map((item) => {
        const text = pickText(item, isEn);
        if (!text) return null;
        const href = item.link ? toHref(item.link, locale) : null;
        return (
          <li key={item._key || text} className="text-[var(--marketing-copy)]">
            {href ? (
              <Link
                className="transition-colors hover:text-[var(--marketing-brand)]"
                href={href}
              >
                <span className="mr-2 text-[var(--marketing-brand)]">
                  &bull;
                </span>
                {text}
              </Link>
            ) : (
              <>
                <span className="mr-2 text-[var(--marketing-brand)]">
                  &bull;
                </span>
                {text}
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}

const withFallback = <T,>(items: T[] | null | undefined, fallback: T[]) =>
  items?.length ? items : fallback;

const withTextFallback = (value: string | null | undefined, fallback: string) =>
  value || fallback;

const fillerKeyFactCards = [
  {
    Icon: Droplet,
    titleTh: 'สาร Hyaluronic Acid (HA)',
    titleEn: 'Hyaluronic Acid (HA)',
    descriptionTh: 'ฟิลเลอร์ส่วนใหญ่มักเป็น HA ที่มีอยู่ในร่างกาย',
    descriptionEn:
      'Most fillers are HA, a substance found naturally in the body.',
  },
  {
    Icon: Smile,
    titleTh: 'เติมเต็ม ปรับรูปหน้า',
    titleEn: 'Volume and contour',
    descriptionTh: 'เติมร่องลึก เพิ่มวอลลุ่ม และปรับสมดุลใบหน้า',
    descriptionEn:
      'Softens folds, restores volume, and balances facial contours.',
  },
  {
    Icon: Clock3,
    titleTh: 'เห็นผลหลังทำ',
    titleEn: 'Visible after treatment',
    descriptionTh: 'สามารถเห็นความเปลี่ยนแปลงได้ทันทีหลังฉีด',
    descriptionEn: 'Visible changes can usually be seen after injection.',
  },
  {
    Icon: CalendarDays,
    titleTh: 'อยู่ได้นาน 6-18 เดือน',
    titleEn: 'Lasts 6-18 months',
    descriptionTh: 'ขึ้นอยู่กับชนิดฟิลเลอร์ ตำแหน่งที่ฉีด และร่างกายแต่ละบุคคล',
    descriptionEn:
      'Depends on filler type, treatment area, and individual response.',
  },
  {
    Icon: ShieldCheck,
    titleTh: 'ปลอดภัย มาตรฐาน',
    titleEn: 'Safety and standards',
    descriptionTh: 'ควรฉีดโดยแพทย์ และใช้ฟิลเลอร์แท้ที่ตรวจสอบได้',
    descriptionEn:
      'Should be doctor-injected with authentic, verifiable products.',
  },
];

function ServiceSeoKeyFactsPanel({
  isEn,
  items,
  heading,
}: {
  isEn: boolean;
  items?: TextItem[] | null;
  heading?: string;
}) {
  const visibleItems = items
    ?.filter((item) => pickText(item, isEn))
    .slice(0, 5);

  if (visibleItems?.length) {
    const icons = [Droplet, Smile, Clock3, CalendarDays, ShieldCheck];

    return (
      <div className="rounded-2xl border border-[var(--marketing-border)] bg-[rgba(255,255,255,0.4)] p-5 shadow-[0_18px_55px_rgba(72,48,28,0.09)] backdrop-blur-sm md:p-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[0.95fr_repeat(5,minmax(0,1fr))]">
          <div className="flex min-h-[172px] flex-col justify-center rounded-2xl px-2 py-3 md:px-4">
            <p className="text-base font-semibold uppercase tracking-[0.1em] text-[var(--marketing-ink)]">
              Key Facts
            </p>
            <h2 className="mt-4 max-w-52 text-3xl font-semibold leading-snug text-[var(--marketing-ink)] md:text-[2rem]">
              {heading || (isEn ? 'Key summary' : 'สรุปข้อมูลสำคัญ')}
            </h2>
          </div>
          {visibleItems.map((item, index) => {
            const Icon = icons[index % icons.length];
            const text = pickText(item, isEn);
            return (
              <article
                key={item._key || text}
                className="flex min-h-[172px] flex-col items-center justify-start rounded-2xl border border-[var(--marketing-border)] bg-[var(--marketing-surface-1)] px-5 py-7 text-center shadow-[var(--marketing-card-shadow)]"
              >
                <div className="flex h-12 shrink-0 items-center justify-center">
                  <Icon
                    aria-hidden="true"
                    className="h-11 w-11 text-[var(--marketing-brand)]"
                    strokeWidth={1.7}
                  />
                </div>
                <h3 className="mt-5 text-base font-semibold leading-7 text-[var(--marketing-ink)]">
                  {text}
                </h3>
              </article>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--marketing-border)] bg-[rgba(255,255,255,0.86)] p-5 shadow-[0_18px_55px_rgba(72,48,28,0.09)] backdrop-blur-sm md:p-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[0.95fr_repeat(5,minmax(0,1fr))]">
        <div className="flex min-h-[172px] flex-col justify-center rounded-2xl px-2 py-3 md:px-4">
          <p className="text-base font-semibold uppercase tracking-[0.12em] text-[var(--marketing-ink)]">
            Key Facts
          </p>
          <h2 className="mt-4 max-w-52 text-3xl font-semibold leading-snug text-[var(--marketing-ink)] md:text-[2rem]">
            {isEn ? 'Filler key summary' : 'สรุปข้อมูลสำคัญ ฟิลเลอร์'}
          </h2>
        </div>
        {fillerKeyFactCards.map(
          ({ Icon, titleTh, titleEn, descriptionTh, descriptionEn }) => (
            <article
              key={titleEn}
              className="flex min-h-[172px] flex-col items-center justify-start rounded-2xl border border-[var(--marketing-border)] bg-[var(--marketing-surface-1)] px-5 py-7 text-center shadow-[var(--marketing-card-shadow)]"
            >
              <div className="flex h-12 shrink-0 items-center justify-center">
                <Icon
                  aria-hidden="true"
                  className="h-11 w-11 text-[var(--marketing-brand)]"
                  strokeWidth={1.7}
                />
              </div>
              <h3 className="mt-5 text-base font-semibold leading-7 text-[var(--marketing-ink)]">
                {isEn ? titleEn : titleTh}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--marketing-copy)]">
                {isEn ? descriptionEn : descriptionTh}
              </p>
            </article>
          )
        )}
      </div>
    </div>
  );
}

function ServiceSeoSectionShell({
  children,
  backgroundImage,
  backgroundPositionX,
  backgroundPositionY,
  className = 'py-16 md:py-20',
  contentClassName = 'mx-auto max-w-6xl px-6 md:px-10',
}: {
  children: ReactNode;
  backgroundImage?: SanityImage;
  backgroundPositionX?: number | null;
  backgroundPositionY?: number | null;
  className?: string;
  contentClassName?: string;
}) {
  const backgroundUrl =
    backgroundImage?.asset?._id || backgroundImage?.asset?._ref
      ? urlForImage(backgroundImage)?.width(2400).auto('format').url()
      : null;
  const objectPosition = `${backgroundPositionX ?? 50}% ${
    backgroundPositionY ?? 50
  }%`;

  return (
    <section
      className={`relative overflow-hidden bg-[var(--marketing-surface-1)] ${className}`}
    >
      {backgroundUrl ? (
        <Image
          alt={backgroundImage?.alt || ''}
          className="object-cover object-center"
          fill
          sizes="100vw"
          src={backgroundUrl}
          style={{ objectPosition }}
          unoptimized
        />
      ) : null}
      <div className={`relative z-10 ${contentClassName}`}>{children}</div>
    </section>
  );
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: This section composes the framed definition card and the concerns grid with separate editable Sanity content.
function ServiceSeoDefinitionProblemsSection({
  page,
  isEn,
  concerns,
  backgroundImage,
  fallback,
  serviceSlug,
}: {
  page: ServicePageData;
  isEn: boolean;
  concerns: TextItem[];
  backgroundImage?: SanityImage;
  fallback: (typeof serviceSeoFallbacks)[ServiceSeoSlug];
  serviceSlug: ServiceSeoSlug;
}) {
  const visibleConcerns = concerns.slice(0, 5);
  const isBotox = serviceSlug === 'botox';
  const whatIsBackgroundUrl =
    page.whatIsBackgroundImage?.asset?._id ||
    page.whatIsBackgroundImage?.asset?._ref
      ? urlForImage(page.whatIsBackgroundImage)
          ?.width(1600)
          .auto('format')
          .url()
      : null;
  const whatIsObjectPosition = `${page.whatIsBackgroundPositionX ?? 50}% ${
    page.whatIsBackgroundPositionY ?? 50
  }%`;
  const whatIsRenderedObjectPosition = whatIsBackgroundUrl
    ? '100% 50%'
    : whatIsObjectPosition;
  return (
    <>
      <ServiceSeoSectionShell
        backgroundImage={page.whatIsSectionBackgroundImage}
        backgroundPositionX={page.whatIsSectionBackgroundPositionX}
        backgroundPositionY={page.whatIsSectionBackgroundPositionY}
        className="-mt-44 pt-44 pb-16 md:-mt-72 md:pt-72 md:pb-20 lg:-mt-80 lg:pt-80"
        contentClassName="mx-auto max-w-7xl px-5 md:px-8"
      >
        <article className="relative min-h-[360px] overflow-hidden rounded-2xl border border-[var(--marketing-border)] bg-[linear-gradient(135deg,var(--marketing-surface)_0%,var(--marketing-surface-alt)_100%)] shadow-[0_18px_55px_rgba(72,48,28,0.08)]">
          {whatIsBackgroundUrl ? (
            <Image
              alt={
                page.whatIsBackgroundImage?.alt ||
                (isEn
                  ? 'Filler definition background at Drema Clinic'
                  : 'พื้นหลังอธิบายฟิลเลอร์ Drema Clinic')
              }
              className="object-contain object-right"
              fill
              priority={false}
              sizes="(min-width: 1280px) 1180px, 92vw"
              src={whatIsBackgroundUrl}
              style={{ objectPosition: whatIsRenderedObjectPosition }}
              unoptimized
            />
          ) : null}
          {whatIsBackgroundUrl ? (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[1]"
              style={{
                background:
                  'linear-gradient(90deg,#fffdf9 0%,rgba(255,253,249,0.98) 34%,rgba(255,253,249,0.86) 46%,rgba(255,253,249,0.56) 58%,rgba(255,253,249,0.22) 69%,rgba(255,253,249,0) 82%)',
              }}
            />
          ) : null}
          <div className="relative z-10 flex min-h-[360px] flex-col justify-center px-6 py-12 md:px-12 md:py-16">
            <div className="max-w-2xl">
              <ServiceSeoSectionHeader
                align="left"
                eyebrow={withTextFallback(
                  isEn ? page.whatIsEyebrowEn : page.whatIsEyebrowTh,
                  isEn
                    ? pickOptionalString(fallback.definition, 'eyebrowEn') ||
                        baseFillerFallback.definition.eyebrowEn
                    : pickOptionalString(fallback.definition, 'eyebrowTh') ||
                        baseFillerFallback.definition.eyebrowTh
                )}
                heading={withTextFallback(
                  isEn ? page.whatIsHeadingEn : page.whatIsHeadingTh,
                  isEn
                    ? fallback.definition.headingEn
                    : fallback.definition.headingTh
                )}
                subtitle={withTextFallback(
                  isEn ? page.whatIsSubtitleEn : page.whatIsSubtitleTh,
                  isEn
                    ? pickOptionalString(fallback.definition, 'subtitleEn') ||
                        baseFillerFallback.definition.subtitleEn
                    : pickOptionalString(fallback.definition, 'subtitleTh') ||
                        baseFillerFallback.definition.subtitleTh
                )}
              />
              <p className="mt-5 text-base leading-8 text-[var(--marketing-copy)] md:text-[1.05rem]">
                {withTextFallback(
                  isEn ? page.whatIsBodyEn : page.whatIsBodyTh,
                  isEn ? fallback.definition.bodyEn : fallback.definition.bodyTh
                )}
              </p>
            </div>
          </div>

          {whatIsBackgroundUrl ? null : (
            <div
              aria-hidden="true"
              className="absolute inset-y-0 right-0 w-[48%]"
            >
              <div className="absolute right-12 top-10 h-8 w-8 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff8eb_0%,#d7ad68_52%,rgba(195,142,72,0.18)_72%,transparent_76%)] opacity-80 shadow-[0_18px_45px_rgba(151,105,48,0.16)]" />
              <div className="absolute right-5 top-7 h-4 w-4 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff9ee_0%,#d8ac65_58%,transparent_76%)] opacity-80" />
              <div className="absolute bottom-12 right-14 h-36 w-36 rounded-full bg-[radial-gradient(circle_at_35%_28%,#fff7e6_0%,#e9d0a4_32%,#b98235_62%,rgba(158,101,36,0.16)_74%,transparent_78%)] shadow-[0_28px_70px_rgba(151,105,48,0.18)]" />
              <div className="absolute bottom-24 right-40 h-16 w-16 rounded-full bg-[radial-gradient(circle_at_35%_28%,#fff9ed_0%,#e5c58d_42%,#b98235_66%,transparent_78%)] opacity-90 shadow-[0_18px_50px_rgba(151,105,48,0.14)]" />
              <div className="absolute bottom-8 right-36 h-7 w-7 rounded-full bg-[radial-gradient(circle_at_35%_28%,#fff9ed_0%,#d9ad68_58%,transparent_78%)] opacity-75" />
            </div>
          )}
        </article>
      </ServiceSeoSectionShell>

      <ServiceSeoSectionShell
        backgroundImage={backgroundImage}
        backgroundPositionX={
          isBotox ? 100 : page.definitionProblemsBackgroundPositionX
        }
        backgroundPositionY={page.definitionProblemsBackgroundPositionY}
        className="py-20 md:py-24"
        contentClassName="mx-auto max-w-[1340px] px-5 md:px-8"
      >
        <article>
          <ServiceSeoConcernsHeader
            fallback={fallback}
            isEn={isEn}
            page={page}
          />
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:mt-12 xl:grid-cols-3">
            {visibleConcerns.map((item, index) => (
              <ServiceSeoConcernImageCard
                index={index}
                isEn={isEn}
                item={item}
                key={item._key || pickText(item, isEn)}
              />
            ))}
          </div>
        </article>
      </ServiceSeoSectionShell>
    </>
  );
}

function ServiceSeoConcernsHeader({
  page,
  isEn,
  fallback,
}: {
  page: ServicePageData;
  isEn: boolean;
  fallback: (typeof serviceSeoFallbacks)[ServiceSeoSlug];
}) {
  const eyebrow = withTextFallback(
    isEn ? page.concernsEyebrowEn : page.concernsEyebrowTh,
    isEn
      ? pickOptionalString(fallback, 'problemsEyebrowEn') ||
          baseFillerFallback.problemsEyebrowEn
      : pickOptionalString(fallback, 'problemsEyebrowTh') ||
          baseFillerFallback.problemsEyebrowTh
  );
  const heading = withTextFallback(
    isEn ? page.concernsHeadingEn : page.concernsHeadingTh,
    isEn ? fallback.problemsHeadingEn : fallback.problemsHeadingTh
  );
  const subtitle = withTextFallback(
    isEn ? page.concernsSubtitleEn : page.concernsSubtitleTh,
    isEn
      ? pickOptionalString(fallback, 'problemsSubtitleEn') ||
          baseFillerFallback.problemsSubtitleEn
      : pickOptionalString(fallback, 'problemsSubtitleTh') ||
          baseFillerFallback.problemsSubtitleTh
  );

  return (
    <ServiceSeoSectionHeader
      eyebrow={eyebrow}
      heading={heading}
      subtitle={subtitle}
    />
  );
}

function ServiceSeoSectionHeader({
  eyebrow,
  heading,
  subtitle,
  align = 'center',
}: {
  eyebrow: string;
  heading: string;
  subtitle: string;
  align?: 'center' | 'left';
}) {
  const isCentered = align === 'center';

  return (
    <div className={isCentered ? 'mx-auto max-w-4xl text-center' : 'max-w-2xl'}>
      <div
        className={`flex items-center gap-3 ${
          isCentered ? 'justify-center' : 'justify-start'
        }`}
      >
        <span className="h-px w-16 bg-[linear-gradient(90deg,transparent,#d2a45f)]" />
        <p className="rounded-full border border-[#ead6b5] bg-[rgba(255,250,242,0.76)] px-8 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-[#a67b45]">
          {eyebrow}
        </p>
        <span className="h-px w-16 bg-[linear-gradient(90deg,#d2a45f,transparent)]" />
      </div>
      <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[var(--marketing-ink)] md:text-5xl">
        {heading}
      </h2>
      <p className="mt-3 text-base leading-7 text-[var(--marketing-copy)] md:text-lg">
        {subtitle}
      </p>
      <div
        className={`mt-5 flex max-w-sm items-center gap-3 ${
          isCentered ? 'mx-auto justify-center' : 'justify-start'
        }`}
      >
        <span className="h-px flex-1 bg-[linear-gradient(90deg,transparent,#d3aa72)]" />
        <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-[#c7924b] shadow-[0_0_0_5px_rgba(199,146,75,0.12)]" />
        <span className="h-px flex-1 bg-[linear-gradient(90deg,#d3aa72,transparent)]" />
      </div>
    </div>
  );
}

function ServiceSeoConcernImageCard({
  item,
  index,
  isEn,
}: {
  item: TextItem;
  index: number;
  isEn: boolean;
}) {
  const text = pickText(item, isEn);
  const description = pickDescription(item, isEn);
  const hasImage = Boolean(item.image?.asset?._id || item.image?.asset?._ref);
  const imageUrl = hasImage
    ? urlForImage(item.image)?.width(1200).auto('format').url()
    : null;

  if (!text) return null;

  return (
    <article
      className={`relative min-h-[360px] overflow-hidden rounded-2xl border border-[var(--marketing-border)] bg-[linear-gradient(135deg,var(--marketing-surface)_0%,var(--marketing-surface-alt)_100%)] shadow-[var(--marketing-card-shadow)] ${
        index > 2 ? 'xl:translate-x-1/2' : ''
      }`}
    >
      {imageUrl ? (
        <Image
          alt={
            item.image?.alt ||
            (isEn ? `${text} filler treatment area` : `${text} ฟิลเลอร์`)
          }
          className="object-cover object-center"
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 90vw"
          src={imageUrl}
          unoptimized
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_32%,rgba(214,170,103,0.26),transparent_34%),linear-gradient(135deg,var(--marketing-surface)_0%,var(--marketing-surface-alt)_100%)]" />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,250,242,0.7)_0%,rgba(255,250,242,0.1)_42%,rgba(255,250,242,0.1)_100%)]" />
      <div className="relative z-10 flex min-h-[360px] max-w-[64%] flex-col justify-center p-7">
        <div className="text-6xl font-light leading-none text-[var(--marketing-brand)]">
          {String(index + 1).padStart(2, '0')}
        </div>
        <h3 className="mt-6 text-3xl font-semibold leading-tight text-[var(--marketing-ink)]">
          {text}
        </h3>
        <div className="mt-5 h-px w-12 bg-[var(--marketing-brand)] opacity-60" />
        {description ? (
          <p className="mt-5 text-lg leading-8 text-[var(--marketing-copy)]">
            {description}
          </p>
        ) : null}
      </div>
    </article>
  );
}

function ServiceSeoTreatmentAreasGrid({
  items,
  isEn,
  locale,
}: {
  items: LinkedTextItem[];
  isEn: boolean;
  locale: 'th' | 'en';
}) {
  const visibleItems = items.filter((item) => pickText(item, isEn)).slice(0, 6);

  if (!visibleItems.length) return null;

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {visibleItems.map((item, index) => (
        <div
          className="w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] xl:w-[calc((100%-7.5rem)/6)]"
          key={item._key || pickText(item, isEn)}
        >
          <ServiceSeoTreatmentAreaCard
            index={index}
            isEn={isEn}
            item={item}
            locale={locale}
          />
        </div>
      ))}
    </div>
  );
}

function getLocalizedStartingPrice(item: LinkedTextItem, isEn: boolean) {
  return (
    (isEn ? item.startingPriceEn : item.startingPriceTh) ||
    item.startingPriceTh ||
    item.startingPriceEn
  );
}

function getStartingPriceStyle(color?: string | null) {
  return color ? { color } : undefined;
}

const fillerPremiumBorderStyle = {
  border: '1px solid transparent',
  backgroundImage:
    'linear-gradient(var(--marketing-surface-1), var(--marketing-surface-1)), linear-gradient(135deg, #8c6a2e 0%, #c8a96a 42%, #f4e7cc 72%, #fffaf0 100%)',
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
} as const;

function ServiceSeoTreatmentAreaCard({
  item,
  index,
  isEn,
  locale,
}: {
  item: LinkedTextItem;
  index: number;
  isEn: boolean;
  locale: 'th' | 'en';
}) {
  const title = pickText(item, isEn);
  const startingPrice = getLocalizedStartingPrice(item, isEn);
  const href = item.link ? toHref(item.link, locale) : '#';
  const imageUrl =
    item.image?.asset?._id || item.image?.asset?._ref
      ? urlForImage(item.image)?.width(720).auto('format').url()
      : null;
  const iconUrl =
    item.iconImage?.asset?._id || item.iconImage?.asset?._ref
      ? urlForImage(item.iconImage)?.width(96).height(96).auto('format').url()
      : null;
  const fallbackBackgrounds = [
    'bg-[radial-gradient(circle_at_74%_22%,rgba(162,114,73,0.2),transparent_26%),linear-gradient(135deg,#f7e7d4_0%,#fff8ed_46%,#e8c5aa_100%)]',
    'bg-[radial-gradient(circle_at_32%_22%,rgba(206,150,119,0.26),transparent_30%),linear-gradient(135deg,#fff6eb_0%,#efd8c3_54%,#f8e8db_100%)]',
    'bg-[radial-gradient(circle_at_50%_36%,rgba(188,119,103,0.3),transparent_28%),linear-gradient(135deg,#fff3e9_0%,#f2c8bc_50%,#fff8f1_100%)]',
    'bg-[radial-gradient(circle_at_25%_24%,rgba(144,91,59,0.22),transparent_26%),linear-gradient(135deg,#fbefe3_0%,#e9c6ab_55%,#fff7ee_100%)]',
    'bg-[radial-gradient(circle_at_78%_24%,rgba(164,121,82,0.24),transparent_28%),linear-gradient(135deg,#fff9ef_0%,#ead1b7_54%,#f8eadc_100%)]',
    'bg-[radial-gradient(circle_at_62%_30%,rgba(194,130,103,0.26),transparent_30%),linear-gradient(135deg,#fff4ea_0%,#eac3ae_56%,#fff8f1_100%)]',
  ];

  return (
    <article
      className="overflow-hidden rounded-[1.35rem] shadow-[0_20px_54px_rgba(92,62,31,0.13)]"
      style={fillerPremiumBorderStyle}
    >
      <div
        className={`relative aspect-[4/3] overflow-hidden ${
          fallbackBackgrounds[index % fallbackBackgrounds.length]
        }`}
      >
        {imageUrl ? (
          <Image
            alt={
              item.image?.alt ||
              (isEn ? `${title} treatment area` : `ตำแหน่ง${title}`)
            }
            className="object-cover object-center"
            fill
            sizes="(min-width: 1280px) 200px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            src={imageUrl}
            unoptimized
          />
        ) : null}
      </div>
      <div className="border-t border-[#eadfce] bg-[rgba(255,250,242,0.94)] px-4 py-5 text-center">
        <div className="flex items-center justify-center gap-2.5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d7ba86] bg-[var(--marketing-surface-1)] text-[#a77a42]">
            {iconUrl ? (
              <Image
                alt={item.iconImage?.alt || ''}
                className="h-9 w-9 object-contain"
                height={36}
                src={iconUrl}
                width={36}
                unoptimized
              />
            ) : (
              <UserRound className="h-6 w-6" aria-hidden="true" />
            )}
          </span>

          <h3 className="whitespace-nowrap text-sm font-semibold leading-6 text-[var(--marketing-ink)]">
            {title}
          </h3>
        </div>

        {startingPrice ? (
          <p className="mt-3 whitespace-nowrap text-center text-sm leading-6 text-[var(--marketing-copy)]">
            <span className="mr-1">{isEn ? 'Starts at' : 'เริ่มต้น'}</span>
            <span
              className="text-base font-semibold text-[var(--marketing-brand)]"
              style={getStartingPriceStyle(item.startingPriceTextColor)}
            >
              {startingPrice}
            </span>
          </p>
        ) : null}

        <div className="mt-4 flex justify-center">
          <Link
            href={href}
            className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[rgba(151,113,75,0.09)] px-3.5 py-2 text-xs font-semibold text-[var(--marketing-brand)] transition-colors hover:bg-[rgba(151,113,75,0.16)]"
          >
            {isEn ? 'Related Article' : 'บทความที่เกี่ยวข้อง'}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function ServiceReviewCtaButton({
  cta,
  isEn,
  locale,
}: {
  cta: {
    href: string;
    labelTh: string;
    labelEn: string;
  };
  isEn: boolean;
  locale: 'th' | 'en';
}) {
  return (
    <div className="mt-12 flex justify-center">
      <Link
        href={localizeHref(cta.href, locale)}
        className="inline-flex items-center gap-4 rounded-full border border-[#c49350] bg-[rgba(255,250,242,0.72)] px-8 py-4 text-lg font-semibold text-[#8f6738] shadow-[0_18px_45px_rgba(132,93,49,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fffaf2] hover:text-[#6f4d26] md:text-xl"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d9b071] bg-[#fffaf2] text-[#b27d3d]">
          <HeartHandshake className="h-5 w-5" aria-hidden="true" />
        </span>
        {isEn ? cta.labelEn : cta.labelTh}
        <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </Link>
    </div>
  );
}

function ServiceSeoBrandsShowcase({
  page,
  brands,
  isEn,
}: {
  page: ServicePageData;
  brands: TextItem[];
  isEn: boolean;
}) {
  const visibleBrands = brands.filter((brand) => pickText(brand, isEn));

  if (!visibleBrands.length) return null;

  return (
    <article className="mx-auto max-w-3xl rounded-2xl border border-[var(--marketing-border)] bg-[rgba(255,250,242,0.82)] px-6 py-8 text-center shadow-[0_18px_55px_rgba(72,48,28,0.08)] backdrop-blur-sm md:px-10 md:py-10">
      <h2 className="text-3xl font-semibold leading-tight text-[var(--marketing-ink)] md:text-4xl">
        {withTextFallback(
          isEn ? page.brandsHeadingEn : page.brandsHeadingTh,
          isEn
            ? baseFillerFallback.brandsHeadingEn
            : baseFillerFallback.brandsHeadingTh
        )}
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--marketing-copy)]">
        {withTextFallback(
          isEn ? page.brandsIntroEn : page.brandsIntroTh,
          isEn
            ? baseFillerFallback.brandsIntroEn
            : baseFillerFallback.brandsIntroTh
        )}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        {visibleBrands.map((brand) => {
          const label = pickText(brand, isEn);
          const logoUrl =
            brand.logoImage?.asset?._id || brand.logoImage?.asset?._ref
              ? urlForImage(brand.logoImage)?.width(320).auto('format').url()
              : null;

          return logoUrl ? (
            <Image
                alt={brand.logoImage?.alt || label}
                className="h-10 w-auto max-w-[150px] object-contain"
                height={40}
                key={brand._key || label}
                src={logoUrl}
                width={150}
                unoptimized
              />
          ) : (
            <span
              className="text-2xl font-semibold tracking-wide text-[color-mix(in_oklab,var(--marketing-ink)_72%,var(--marketing-brand))]"
              key={brand._key || label}
            >
              {label}
            </span>
          );
        })}
      </div>
    </article>
  );
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: SEO service pages assemble many optional Studio fields with safe page-specific fallbacks.
function ServiceSeoSections({
  page,
  locale,
  serviceSlug,
  globalCta,
  socialLinks,
}: {
  page: ServicePageData;
  locale: 'th' | 'en';
  serviceSlug: ServiceSeoSlug;
  globalCta?: GlobalCtaData;
  socialLinks?: GlobalSocialLink[];
}) {
  const isEn = locale === 'en';
  const serviceFallback = serviceSeoFallbacks[serviceSlug];
  const keyFacts = withFallback(page.keyFactsItems, serviceFallback.keyFacts);
  const concerns = withFallback(page.concernsItems, serviceFallback.problems);
  const areas = page.injectionAreasItems?.length
    ? page.injectionAreasItems
    : serviceFallback.areas.map(({ href, ...item }) => ({
        ...item,
        link: { type: 'external' as const, external: href },
      }));
  const brands = withFallback(page.brandsItems, serviceFallback.brands);
  const faqs = withFallback(page.faqItems, serviceFallback.faqs);
  const siteUrl = getBaseURL().replace(/\/$/, '');
  const absoluteUrl = siteUrl
    ? buildLocalizedUrl(locale, `/services/${serviceSlug}`, siteUrl)
    : undefined;
  const serviceReviewCta = serviceReviewCtas[serviceSlug];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: isEn ? item.questionEn : item.questionTh,
      acceptedAnswer: {
        '@type': 'Answer',
        text: isEn ? item.answerEn : item.answerTh,
      },
    })),
  };

  const medicalProcedureJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: isEn ? serviceFallback.schemaNameEn : serviceFallback.schemaNameTh,
    alternateName: serviceFallback.schemaAlternateName,
    description: isEn
      ? serviceFallback.definition.bodyEn
      : serviceFallback.definition.bodyTh,
    procedureType: serviceFallback.schemaProcedureType,
    bodyLocation: isEn
      ? serviceFallback.schemaBodyLocationEn
      : serviceFallback.schemaBodyLocationTh,
    howPerformed: isEn
      ? serviceFallback.schemaHowPerformedEn
      : serviceFallback.schemaHowPerformedTh,
    url: absoluteUrl,
    provider: {
      '@type': 'MedicalClinic',
      name: 'Drema Clinic',
      url: siteUrl || undefined,
    },
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(medicalProcedureJsonLd)}
      </script>
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>

      <ServiceSeoSectionShell
        backgroundImage={page.keyFactsBackgroundImage}
        backgroundPositionX={page.keyFactsBackgroundPositionX}
        backgroundPositionY={page.keyFactsBackgroundPositionY}
        className="bg-transparent py-16 md:relative md:z-20 md:overflow-visible md:pt-0 md:pb-20"
        contentClassName="mx-auto max-w-7xl px-5 md:px-8"
      >
        <div className="md:-mb-12 md:-translate-y-12 lg:-mb-48 lg:-translate-y-48 xl:-mb-56 xl:-translate-y-56">
          <ServiceSeoKeyFactsPanel
            heading={
              isEn
                ? page.quickAnswerTitleEn || serviceFallback.quickAnswerTitleEn
                : page.quickAnswerTitleTh || serviceFallback.quickAnswerTitleTh
            }
            isEn={isEn}
            items={keyFacts}
          />
        </div>
      </ServiceSeoSectionShell>

      <ServiceSeoDefinitionProblemsSection
        backgroundImage={page.definitionProblemsBackgroundImage}
        concerns={concerns}
        fallback={serviceFallback}
        isEn={isEn}
        page={page}
        serviceSlug={serviceSlug}
      />

      <ServiceSeoSectionShell
        backgroundImage={page.injectionAreasBackgroundImage}
        backgroundPositionX={page.injectionAreasBackgroundPositionX}
        backgroundPositionY={page.injectionAreasBackgroundPositionY}
        className="py-16 md:py-20"
        contentClassName="mx-auto max-w-[1500px] px-6 md:px-10 xl:px-6"
      >
        <article>
          <ServiceSeoSectionHeader
            eyebrow={withTextFallback(
              isEn
                ? page.injectionAreasEyebrowEn
                : page.injectionAreasEyebrowTh,
              isEn
                ? pickOptionalString(serviceFallback, 'areasEyebrowEn') ||
                    baseFillerFallback.areasEyebrowEn
                : pickOptionalString(serviceFallback, 'areasEyebrowTh') ||
                    baseFillerFallback.areasEyebrowTh
            )}
            heading={withTextFallback(
              isEn
                ? page.injectionAreasHeadingEn
                : page.injectionAreasHeadingTh,
              isEn
                ? serviceFallback.areasHeadingEn
                : serviceFallback.areasHeadingTh
            )}
            subtitle={withTextFallback(
              isEn
                ? page.injectionAreasSubtitleEn
                : page.injectionAreasSubtitleTh,
              isEn
                ? pickOptionalString(serviceFallback, 'areasSubtitleEn') ||
                    baseFillerFallback.areasSubtitleEn
                : pickOptionalString(serviceFallback, 'areasSubtitleTh') ||
                    baseFillerFallback.areasSubtitleTh
            )}
          />
          <div className="mt-12">
            <ServiceSeoTreatmentAreasGrid
              isEn={isEn}
              items={areas}
              locale={locale}
            />
            {serviceSlug === 'filler' ? (
              <ServiceReviewCtaButton
                cta={{
                  href: '/reviews/review-filler-lip',
                  labelTh: 'ดูรีวิวฟิลเลอร์จากเคสจริง',
                  labelEn: 'See real filler reviews',
                }}
                isEn={isEn}
                locale={locale}
              />
            ) : serviceReviewCta ? (
              <ServiceReviewCtaButton
                cta={serviceReviewCta}
                isEn={isEn}
                locale={locale}
              />
            ) : null}
          </div>
        </article>
      </ServiceSeoSectionShell>

      <ServiceSeoSectionShell
        backgroundImage={page.highlightsBrandsBackgroundImage}
        backgroundPositionX={page.highlightsBrandsBackgroundPositionX}
        backgroundPositionY={page.highlightsBrandsBackgroundPositionY}
        className="py-16 md:py-20"
      >
        <ServiceSeoBrandsShowcase brands={brands} isEn={isEn} page={page} />
      </ServiceSeoSectionShell>

      <ServiceSeoSectionShell
        backgroundImage={page.faqBackgroundImage}
        backgroundPositionX={page.faqBackgroundPositionX}
        backgroundPositionY={page.faqBackgroundPositionY}
        className="py-16 md:py-20"
      >
        <section className="mx-auto max-w-5xl">
          <div className="mb-8 border-t border-[#dcccb6] pt-6">
            <h2 className="font-serif text-4xl text-[#3f3124] md:text-5xl">
              {isEn ? 'FAQ' : serviceFallback.faqTitleTh}
            </h2>
          </div>
          <div className="space-y-1">
            {faqs.map((item) => {
              const question = isEn ? item.questionEn : item.questionTh;
              const answer = isEn ? item.answerEn : item.answerTh;
              if (!question || !answer) return null;
              return (
                <article
                  key={item._key || question}
                  className="border-b border-[#e2d5c2] py-7 last:border-b-0"
                >
                  <h3 className="font-serif text-2xl leading-tight text-[#4a3a2b] md:text-3xl">
                    {question}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-[#5f5041] md:text-lg">
                    {answer}
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      </ServiceSeoSectionShell>

      <ServiceSeoSectionShell
        backgroundImage={page.relatedLinksBackgroundImage}
        backgroundPositionX={page.relatedLinksBackgroundPositionX}
        backgroundPositionY={page.relatedLinksBackgroundPositionY}
        className="pt-10 pb-4 md:pt-12 md:pb-6"
      >
        <div className="rounded-2xl border border-[var(--marketing-border)] bg-[var(--marketing-surface-soft)] p-7">
          <h2 className="text-2xl font-semibold text-[var(--marketing-ink)]">
            {isEn ? 'Related pages' : 'อ่านต่อเกี่ยวกับบริการที่เกี่ยวข้อง'}
          </h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {serviceFallback.relatedLinks.map(([href, labelTh, labelEn]) => (
              <Link
                key={href}
                href={localizeHref(href, locale)}
                className="rounded-xl border border-[var(--marketing-border)] bg-[var(--marketing-surface-1)] px-4 py-2 text-sm text-[var(--marketing-copy)] transition-colors hover:text-[var(--marketing-brand)]"
              >
                {isEn ? labelEn : labelTh}
              </Link>
            ))}
          </div>
        </div>
      </ServiceSeoSectionShell>

      <GlobalCtaSection
        cta={globalCta}
        flushToFooter
        locale={locale}
        socialLinks={socialLinks || []}
      />
    </>
  );
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Existing service detail rendering is intentionally kept in one component; filler-specific branching avoids changing other service pages.
export default function ServicePageContent({
  page,
  locale,
  globalCta,
  socialLinks = [],
}: {
  page: ServicePageData;
  locale: 'th' | 'en';
  globalCta?: GlobalCtaData;
  socialLinks?: GlobalSocialLink[];
}) {
  const isEn = locale === 'en';
  const slug = getSlugValue(page.slug);
  const serviceSeoSlug = (
    slug in serviceSeoFallbacks ? slug : null
  ) as ServiceSeoSlug | null;
  const serviceSeoFallback = serviceSeoSlug
    ? serviceSeoFallbacks[serviceSeoSlug]
    : null;
  const hasServiceSeo = Boolean(serviceSeoFallback);
  const heroHeading = isEn ? page.heroHeadingEn : page.heroHeadingTh;
  const heroDescription = isEn
    ? page.heroDescriptionEn
    : page.heroDescriptionTh;
  const primaryCtaText = isEn
    ? page.heroPrimaryCtaTextEn
    : page.heroPrimaryCtaTextTh;
  const secondaryCtaText = isEn
    ? page.heroSecondaryCtaTextEn
    : page.heroSecondaryCtaTextTh;
  const currentPageLabel =
    (isEn ? page.heroHeadingEn : page.heroHeadingTh) ||
    page.name ||
    (serviceSeoFallback
      ? isEn
        ? serviceSeoFallback.heroHeadingEn
        : serviceSeoFallback.heroHeadingTh
      : heroHeading) ||
    (isEn ? 'Service' : 'บริการ');
  const heroImageAlt =
    page.heroImageMobile?.alt ||
    page.heroImageDesktop?.alt ||
    page.heroBackgroundMobile?.alt ||
    page.heroBackgroundDesktop?.alt ||
    page.heroImage?.alt ||
    (serviceSeoFallback
      ? isEn
        ? serviceSeoFallback.heroImageAltEn
        : serviceSeoFallback.heroImageAltTh
      : isEn
        ? 'Service hero image'
        : 'ภาพ Hero บริการ');

  return (
    <main className={hasServiceSeo ? 'pb-0' : 'pb-24'}>
      <MarketingPageHero
        breadcrumbs={{
          locale,
          items: [
            homeBreadcrumb(locale),
            {
              label: getBreadcrumbLabel(locale, 'services'),
              href: '/services',
            },
            { label: currentPageLabel },
          ],
        }}
        eyebrow={isEn ? 'Personalized Aesthetics' : 'ความงามเฉพาะบุคคล'}
        heading={
          serviceSeoFallback
            ? withTextFallback(
                heroHeading,
                isEn
                  ? serviceSeoFallback.heroHeadingEn
                  : serviceSeoFallback.heroHeadingTh
              )
            : heroHeading
        }
        description={
          serviceSeoFallback
            ? withTextFallback(
                heroDescription,
                isEn
                  ? serviceSeoFallback.heroDescriptionEn
                  : serviceSeoFallback.heroDescriptionTh
              )
            : heroDescription
        }
        desktopImage={
          page.heroImageDesktop || page.heroBackgroundDesktop || null
        }
        mobileImage={page.heroImageMobile || page.heroBackgroundMobile || null}
        fallbackImage={page.heroImage || null}
        imageAlt={heroImageAlt}
        imagePlaceholder={
          isEn ? 'Upload hero image in Studio' : 'อัปโหลดภาพ Hero ใน Studio'
        }
        desktopTransform={{
          width: 2400,
          height: 1600,
          fit: 'crop',
        }}
        mobileTransform={{ width: 1600, height: 2000, fit: 'crop' }}
        sectionClassName="lg:min-h-[min(66.667vw,900px)]"
        contentClassName="py-12 md:py-20 lg:min-h-[min(66.667vw,900px)]"
        textClassName="rounded-[22px] bg-[rgba(251,247,238,0.88)] px-5 py-6 shadow-[0_18px_55px_rgba(72,48,28,0.16)] backdrop-blur-[4px] md:max-w-[50%] md:bg-transparent md:px-0 md:py-0 md:shadow-none md:backdrop-blur-none"
        mobileImageBelow
        showOverlay={false}
        actions={
          <>
            <Link
              href={toHref(page.heroPrimaryCtaLink || null, locale)}
              aria-label={
                serviceSeoFallback
                  ? isEn
                    ? serviceSeoFallback.primaryCtaAriaEn
                    : serviceSeoFallback.primaryCtaAriaTh
                  : undefined
              }
              className="rounded-xl bg-[var(--marketing-cta-primary-bg)] px-6 py-3 text-sm font-medium text-[var(--marketing-cta-primary-text)] transition-all duration-500 ease-out hover:-translate-y-[2px] hover:bg-[var(--marketing-cta-primary-bg-hover)] hover:shadow-lg"
            >
              {serviceSeoFallback
                ? withTextFallback(
                    primaryCtaText,
                    isEn
                      ? serviceSeoFallback.primaryCtaEn
                      : serviceSeoFallback.primaryCtaTh
                  )
                : primaryCtaText}
            </Link>
            <Link
              href={toHref(page.heroSecondaryCtaLink || null, locale)}
              aria-label={
                serviceSeoFallback
                  ? isEn
                    ? serviceSeoFallback.secondaryCtaAriaEn
                    : serviceSeoFallback.secondaryCtaAriaTh
                  : undefined
              }
              className="rounded-xl border border-[var(--marketing-cta-secondary-border)] bg-[var(--marketing-cta-secondary-bg)] px-6 py-3 text-sm font-medium text-[var(--marketing-cta-secondary-text)] transition-all duration-500 ease-out hover:-translate-y-[2px] hover:bg-[var(--marketing-cta-secondary-bg-hover)]"
            >
              {serviceSeoFallback
                ? withTextFallback(
                    secondaryCtaText,
                    isEn
                      ? serviceSeoFallback.secondaryCtaEn
                      : serviceSeoFallback.secondaryCtaTh
                  )
                : secondaryCtaText}
            </Link>
          </>
        }
      />

      {hasServiceSeo ? (
        <ServiceSeoSections
          page={page}
          locale={locale}
          serviceSlug={serviceSeoSlug as ServiceSeoSlug}
          globalCta={globalCta}
          socialLinks={socialLinks}
        />
      ) : null}

      {!hasServiceSeo ? (
        <>
          <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <article className="rounded-2xl border border-[var(--marketing-border)] bg-[linear-gradient(180deg,var(--marketing-surface)_0%,var(--marketing-surface-alt)_100%)] p-8 shadow-[var(--marketing-card-shadow)]">
                <h2 className="text-3xl font-semibold text-[var(--marketing-ink)]">
                  {isEn ? page.whatIsHeadingEn : page.whatIsHeadingTh}
                </h2>
                <div className="mt-3 h-px w-full bg-[image:var(--marketing-divider-gradient)]" />
                <p className="mt-4 text-base leading-8 text-[var(--marketing-copy)]">
                  {isEn ? page.whatIsBodyEn : page.whatIsBodyTh}
                </p>
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-[var(--marketing-ink)]">
                    {isEn
                      ? page.whatIsSuitableHeadingEn
                      : page.whatIsSuitableHeadingTh}
                  </h3>
                  <div className="mt-3">
                    <DotList
                      items={page.whatIsSuitableItems || []}
                      isEn={isEn}
                      locale={locale}
                    />
                  </div>
                </div>
              </article>

              <article className="rounded-2xl border border-[var(--marketing-border)] bg-[linear-gradient(180deg,var(--marketing-surface-soft)_0%,var(--marketing-surface-alt)_100%)] p-8 shadow-[var(--marketing-card-shadow)]">
                <h2 className="text-3xl font-semibold text-[var(--marketing-ink)]">
                  {isEn ? page.concernsHeadingEn : page.concernsHeadingTh}
                </h2>
                <div className="mt-3 h-px w-full bg-[image:var(--marketing-divider-gradient)]" />
                <div className="mt-5">
                  <DotList
                    items={page.concernsItems || []}
                    isEn={isEn}
                    locale={locale}
                  />
                </div>
              </article>
            </div>
          </section>

          <section className="bg-[var(--marketing-surface-2)] py-20">
            <div className="mx-auto max-w-7xl px-6 md:px-10">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <article className="rounded-2xl border border-[var(--marketing-border)] bg-[linear-gradient(180deg,var(--marketing-surface)_0%,var(--marketing-surface-alt)_100%)] p-8 shadow-[var(--marketing-card-shadow)]">
                  <h2 className="text-3xl font-semibold text-[var(--marketing-ink)]">
                    {isEn
                      ? page.injectionAreasHeadingEn
                      : page.injectionAreasHeadingTh}
                  </h2>
                  <div className="mt-3 h-px w-full bg-[image:var(--marketing-divider-gradient)]" />
                  <div className="mt-5">
                    <DotList
                      items={page.injectionAreasItems || []}
                      isEn={isEn}
                      locale={locale}
                    />
                  </div>
                </article>

                <article className="rounded-2xl border border-[var(--marketing-border)] bg-[linear-gradient(180deg,var(--marketing-surface-soft)_0%,var(--marketing-surface-alt)_100%)] p-8 shadow-[var(--marketing-card-shadow)]">
                  <h2 className="text-3xl font-semibold text-[var(--marketing-ink)]">
                    {isEn ? page.highlightsHeadingEn : page.highlightsHeadingTh}
                  </h2>
                  <div className="mt-3 h-px w-full bg-[image:var(--marketing-divider-gradient)]" />
                  <div className="mt-5">
                    <DotList
                      items={page.highlightsItems || []}
                      isEn={isEn}
                      locale={locale}
                    />
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
            <article className="rounded-2xl border border-[var(--marketing-border)] bg-[linear-gradient(180deg,var(--marketing-surface)_0%,var(--marketing-surface-alt)_100%)] p-8 shadow-[var(--marketing-card-shadow)]">
              <h2 className="text-3xl font-semibold text-[var(--marketing-ink)]">
                {isEn ? page.brandsHeadingEn : page.brandsHeadingTh}
              </h2>
              <div className="mt-3 h-px w-full bg-[image:var(--marketing-divider-gradient)]" />
              <p className="mt-4 text-base leading-8 text-[var(--marketing-copy)]">
                {isEn ? page.brandsIntroEn : page.brandsIntroTh}
              </p>
              <div className="mt-5">
                <DotList
                  items={page.brandsItems || []}
                  isEn={isEn}
                  locale={locale}
                />
              </div>
            </article>
          </section>

          <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 pb-20 md:grid-cols-2 md:px-10">
            <article className="rounded-2xl border border-[var(--marketing-border)] bg-[linear-gradient(180deg,var(--marketing-surface)_0%,var(--marketing-surface-alt)_100%)] p-8 shadow-[var(--marketing-card-shadow)]">
              <h2 className="text-3xl font-semibold text-[var(--marketing-ink)]">
                {isEn ? page.stepsHeadingEn : page.stepsHeadingTh}
              </h2>
              <div className="mt-3 h-px w-full bg-[image:var(--marketing-divider-gradient)]" />
              <div className="mt-5">
                <DotList
                  items={page.stepsItems || []}
                  isEn={isEn}
                  locale={locale}
                />
              </div>
            </article>
            <article className="rounded-2xl border border-[var(--marketing-border)] bg-[linear-gradient(180deg,var(--marketing-surface-soft)_0%,var(--marketing-surface-alt)_100%)] p-8 shadow-[var(--marketing-card-shadow)]">
              <h2 className="text-3xl font-semibold text-[var(--marketing-ink)]">
                {isEn ? page.aftercareHeadingEn : page.aftercareHeadingTh}
              </h2>
              <div className="mt-3 h-px w-full bg-[image:var(--marketing-divider-gradient)]" />
              <div className="mt-5">
                <DotList
                  items={page.aftercareItems || []}
                  isEn={isEn}
                  locale={locale}
                />
              </div>
            </article>
          </section>

          <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
            <div className="rounded-2xl border border-[var(--marketing-border)] bg-[linear-gradient(180deg,var(--marketing-surface)_0%,var(--marketing-surface-alt)_100%)] p-8 shadow-[var(--marketing-card-shadow)]">
              <h2 className="text-3xl font-semibold text-[var(--marketing-ink)]">
                {isEn ? page.whyDremaHeadingEn : page.whyDremaHeadingTh}
              </h2>
              <div className="mt-3 h-px w-full bg-[image:var(--marketing-divider-gradient)]" />
              <div className="mt-5">
                <DotList
                  items={page.whyDremaItems || []}
                  isEn={isEn}
                  locale={locale}
                />
              </div>
            </div>
          </section>

          {(page.citationSummaryTh || page.citationSummaryEn) && (
            <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
              <div className="rounded-2xl border border-[var(--marketing-border)] bg-[var(--marketing-surface-soft)] p-7">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--marketing-muted)]">
                  {isEn ? 'Summary' : 'ข้อมูลโดยสรุป'}
                </p>
                <p className="mt-3 text-base leading-8 text-[var(--marketing-copy)]">
                  {isEn ? page.citationSummaryEn : page.citationSummaryTh}
                </p>
              </div>
            </section>
          )}

          <GlobalCtaSection
            cta={globalCta}
            locale={locale}
            socialLinks={socialLinks}
          />
        </>
      ) : null}
    </main>
  );
}
