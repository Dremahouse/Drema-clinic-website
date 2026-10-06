import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  CalendarDays,
  Clock3,
  Gem,
  Grid2X2,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Syringe,
  UserRound,
  Waves,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { Image } from 'next-sanity/image';
import {
  getBreadcrumbLabel,
  homeBreadcrumb,
} from '@/components/shared/Breadcrumbs';
import MarketingPageHero from '@/components/shared/MarketingPageHero';
import { buildLocalizedPath, buildLocalizedUrl } from '@/lib/locale';
import { urlForImage } from '@/lib/sanity/client/utils';

type BasicLink = {
  type?: 'internal' | 'external' | null;
  external?: string | null;
  href?: string | null;
  internal?: { _type?: string | null; slug?: string | null } | null;
} | null;

type ServiceHubPageData = {
  heroImage?: ImageLike;
  heroImageDesktop?: ImageLike;
  heroImageMobile?: ImageLike;
  heroBackgroundDesktop?: ImageLike;
  heroBackgroundMobile?: ImageLike;
  servicesHubHeroHeadingTh?: string | null;
  servicesHubHeroHeadingEn?: string | null;
  servicesHubHeroSubtitleTh?: string | null;
  servicesHubHeroSubtitleEn?: string | null;
  servicesHubPrimaryCtaTextTh?: string | null;
  servicesHubPrimaryCtaTextEn?: string | null;
  servicesHubPrimaryCtaLink?: BasicLink;
  servicesHubSecondaryCtaTextTh?: string | null;
  servicesHubSecondaryCtaTextEn?: string | null;
  servicesHubSecondaryCtaLink?: BasicLink;
  servicesHubFeaturedHeadingTh?: string | null;
  servicesHubFeaturedHeadingEn?: string | null;
  servicesHubFeaturedDescriptionTh?: string | null;
  servicesHubFeaturedDescriptionEn?: string | null;
  servicesHubConcernsBackgroundImage?: ImageLike;
  servicesHubWhyHeadingTh?: string | null;
  servicesHubWhyHeadingEn?: string | null;
  servicesHubWhyBodyTh?: string | null;
  servicesHubWhyBodyEn?: string | null;
  servicesHubWhyImage?: ImageLike;
  servicesHubSummaryHeadingTh?: string | null;
  servicesHubSummaryHeadingEn?: string | null;
  servicesHubSummaryTextTh?: string | null;
  servicesHubSummaryTextEn?: string | null;
  servicesHubServices?: Array<{
    _key?: string | null;
    name?: string | null;
    slug?: string | null;
    summaryTh?: string | null;
    summaryEn?: string | null;
    image?: ImageLike;
  }> | null;
  servicesHubConcerns?: Array<{
    _key?: string | null;
    concernTh?: string | null;
    concernEn?: string | null;
    services?: string[] | null;
    image?: ImageLike;
  }> | null;
  servicesHubComparisonRows?: Array<{
    _key?: string | null;
    service?: string | null;
    image?: ImageLike;
    suitableForTh?: string | null;
    suitableForEn?: string | null;
    highlightTh?: string | null;
    highlightEn?: string | null;
    timelineTh?: string | null;
    timelineEn?: string | null;
  }> | null;
  servicesHubWhyPoints?: Array<{
    _key?: string | null;
    textTh?: string | null;
    textEn?: string | null;
  }> | null;
  servicesHubProcessSteps?: Array<{
    _key?: string | null;
    textTh?: string | null;
    textEn?: string | null;
    imageTh?: ImageLike;
    imageEn?: ImageLike;
  }> | null;
  servicesHubFaqItems?: Array<{
    _key?: string | null;
    questionTh?: string | null;
    questionEn?: string | null;
    answerTh?: string | null;
    answerEn?: string | null;
  }> | null;
};

type ImageLike = {
  alt?: string | null;
  asset?: { _id?: string | null; _ref?: string | null } | null;
} | null;

type LocalizedText = {
  th: string;
  en: string;
};

type ServiceItem = {
  name: string;
  slug: string;
  summary: LocalizedText;
  image?: ImageLike;
};

type ConcernItem = {
  concern: LocalizedText;
  services: string[];
  image?: ImageLike;
};

type ComparisonItem = {
  service: string;
  image?: ImageLike;
  suitableFor: LocalizedText;
  highlight: LocalizedText;
  timeline: LocalizedText;
};

type FaqItem = {
  question: LocalizedText;
  answer: LocalizedText;
};

type ProcessStep = LocalizedText & {
  imageTh?: ImageLike;
  imageEn?: ImageLike;
};

const SERVICE_ITEMS: ServiceItem[] = [
  {
    name: 'Botox',
    slug: 'botox',
    summary: {
      th: 'ช่วยลดริ้วรอยจากการแสดงสีหน้าและปรับสมดุลกล้ามเนื้อเฉพาะจุด',
      en: 'Helps soften expression lines and balance selected facial muscles.',
    },
  },
  {
    name: 'Filler',
    slug: 'filler',
    summary: {
      th: 'เติมเต็มร่องลึก เพิ่มวอลลุ่ม และปรับสมดุลรูปหน้าให้ดูเป็นธรรมชาติ',
      en: 'Adds volume, fills deeper folds, and supports natural facial balance.',
    },
  },
  {
    name: 'Ulthera Prime',
    slug: 'ulthera-prime',
    summary: {
      th: 'ยกกระชับผิวและกรอบหน้าด้วยพลังงานอัลตราซาวด์ลงชั้นผิวลึก',
      en: 'Uses focused ultrasound energy to lift and tighten deeper skin layers.',
    },
  },
  {
    name: 'Endolift',
    slug: 'endolift',
    summary: {
      th: 'เลเซอร์ยกกระชับเฉพาะจุด เหมาะกับเหนียง กรอบหน้า และความหย่อนคล้อย',
      en: 'Targeted laser lifting for localized laxity, jawline, and submental concerns.',
    },
  },
  {
    name: 'Sylfirm X',
    slug: 'sylfirm-x',
    summary: {
      th: 'RF Microneedling เพื่อฟื้นฟูคุณภาพผิว รอยแดง รูขุมขน และผิวไม่เรียบ',
      en: 'RF microneedling for skin quality, redness, pores, and uneven texture.',
    },
  },
  {
    name: 'Skin Booster',
    slug: 'skin-booster',
    summary: {
      th: 'เพิ่มความชุ่มชื้นและช่วยฟื้นฟูคุณภาพผิวที่แห้ง โทรม หรือไม่ฉ่ำ',
      en: 'Supports hydration and skin quality for dry, tired, or dull-looking skin.',
    },
  },
  {
    name: 'Pico Laser',
    slug: 'pico-laser',
    summary: {
      th: 'ดูแลฝ้า กระ จุดด่างดำ รอยสิว และความหมองคล้ำด้วยพลังงานเลเซอร์',
      en: 'Laser option for pigmentation, spots, acne marks, and dullness.',
    },
  },
  {
    name: 'Biostimulator',
    slug: 'biostimulator',
    summary: {
      th: 'ช่วยกระตุ้นคุณภาพผิวและคอลลาเจน เหมาะกับผิวโทรมและวอลลุ่มที่ลดลง',
      en: 'Supports collagen and skin quality for tired skin and volume-related concerns.',
    },
  },
];

const CONCERNS: ConcernItem[] = [
  {
    concern: { th: 'ริ้วรอย / หน้าไม่กระชับ', en: 'Wrinkles / skin laxity' },
    services: ['Botox', 'Ulthera Prime', 'Endolift', 'Sylfirm X'],
  },
  {
    concern: {
      th: 'ร่องลึก / ใบหน้าดูโทรม',
      en: 'Deep folds / tired-looking face',
    },
    services: ['Filler', 'Skin Booster', 'Biostimulator'],
  },
  {
    concern: {
      th: 'หลุมสิว / รูขุมขน / ผิวไม่เรียบ',
      en: 'Acne scars / pores / uneven texture',
    },
    services: ['Sylfirm X', 'Pico Laser', 'Skin Booster'],
  },
  {
    concern: { th: 'ฝ้า กระ จุดด่างดำ', en: 'Melasma / freckles / dark spots' },
    services: ['Pico Laser', 'Sylfirm X', 'Skin Booster'],
  },
  {
    concern: {
      th: 'กรอบหน้า / เหนียง / คาง',
      en: 'Jawline / double chin / chin',
    },
    services: ['Ulthera Prime', 'Endolift', 'Botox', 'Filler'],
  },
  {
    concern: {
      th: 'ผิวแห้ง / ผิวไม่ฉ่ำ / ผิวดูเหนื่อยล้า',
      en: 'Dry / dehydrated / tired-looking skin',
    },
    services: ['Skin Booster', 'Biostimulator'],
  },
];

const COMPARISON_ITEMS: ComparisonItem[] = [
  {
    service: 'Botox',
    suitableFor: {
      th: 'ริ้วรอยจากการแสดงสีหน้า กล้ามเนื้อกราม',
      en: 'Expression lines and masseter muscle concerns',
    },
    highlight: {
      th: 'ลดการทำงานของกล้ามเนื้อเฉพาะจุด',
      en: 'Reduces selected muscle activity',
    },
    timeline: { th: 'ประมาณ 3-14 วัน', en: 'About 3-14 days' },
  },
  {
    service: 'Filler',
    suitableFor: {
      th: 'ร่องลึก เติมเต็มใบหน้า ปรับสมดุลรูปหน้า',
      en: 'Deep folds, facial volume, and facial balance',
    },
    highlight: {
      th: 'เพิ่มวอลลุ่มและเติมเต็มจุดที่ยุบตัว',
      en: 'Adds volume and fills areas with volume loss',
    },
    timeline: {
      th: 'เห็นผลทันทีหลังทำ',
      en: 'Visible immediately after treatment',
    },
  },
  {
    service: 'Ulthera Prime',
    suitableFor: {
      th: 'ความหย่อนคล้อย กรอบหน้าไม่ชัด',
      en: 'Skin laxity and less-defined jawline',
    },
    highlight: {
      th: 'ยกกระชับด้วยพลังงานอัลตราซาวด์ลงชั้นผิวลึก',
      en: 'Deep-layer lifting with focused ultrasound energy',
    },
    timeline: { th: 'ประมาณ 1-3 เดือน', en: 'About 1-3 months' },
  },
  {
    service: 'Endolift',
    suitableFor: {
      th: 'เหนียง กรอบหน้า ความหย่อนคล้อยเฉพาะจุด',
      en: 'Double chin, jawline, and localized laxity',
    },
    highlight: {
      th: 'เลเซอร์ยกกระชับเฉพาะจุด',
      en: 'Targeted laser lifting for selected areas',
    },
    timeline: { th: 'ขึ้นอยู่กับการประเมิน', en: 'Depends on doctor assessment' },
  },
  {
    service: 'Sylfirm X',
    suitableFor: {
      th: 'หลุมสิว รูขุมขน ผิวไม่เรียบ รอยแดง',
      en: 'Acne scars, pores, uneven texture, and redness',
    },
    highlight: {
      th: 'RF Microneedling ฟื้นฟูคุณภาพผิว',
      en: 'RF microneedling for skin quality',
    },
    timeline: { th: 'มักทำเป็นคอร์ส', en: 'Often planned as a course' },
  },
  {
    service: 'Skin Booster',
    suitableFor: {
      th: 'ผิวแห้ง ผิวโทรม คุณภาพผิวลดลง',
      en: 'Dry, tired skin and reduced skin quality',
    },
    highlight: {
      th: 'เพิ่มความชุ่มชื้นและฟื้นฟูคุณภาพผิว',
      en: 'Improves hydration and skin quality',
    },
    timeline: { th: 'ประมาณ 1-4 สัปดาห์', en: 'About 1-4 weeks' },
  },
];

const WHY_POINTS: LocalizedText[] = [
  {
    th: 'ประเมินโดยแพทย์ก่อนวางแผนการรักษา',
    en: 'Doctor assessment before treatment planning',
  },
  {
    th: 'เลือกเทคโนโลยีและหัตถการให้เหมาะกับแต่ละบุคคล',
    en: 'Treatment and technology selection tailored to each individual',
  },
  { th: 'เน้นผลลัพธ์ที่ดูเป็นธรรมชาติ', en: 'Focus on natural-looking outcomes' },
  {
    th: 'ใช้ผลิตภัณฑ์และเครื่องมือที่ได้มาตรฐาน',
    en: 'Use of standardized products and medical devices',
  },
  {
    th: 'ให้คำแนะนำการดูแลหลังทำอย่างเหมาะสม',
    en: 'Appropriate aftercare guidance after treatment',
  },
];

const WHY_POINT_ICONS = [
  UserRound,
  Grid2X2,
  Sparkles,
  Gem,
  CalendarCheck,
] as const;

const PROCESS_STEPS: ProcessStep[] = [
  { th: 'ปรึกษาและประเมินโดยแพทย์', en: 'Consultation and doctor assessment' },
  {
    th: 'วิเคราะห์ปัญหาผิวหรือโครงสร้างใบหน้า',
    en: 'Skin or facial structure analysis',
  },
  {
    th: 'วางแผนการรักษาเฉพาะบุคคล',
    en: 'Personalized treatment planning',
  },
  {
    th: 'ทำหัตถการตามมาตรฐานคลินิก',
    en: 'Treatment performed under clinic standards',
  },
  {
    th: 'แนะนำการดูแลหลังทำและติดตามผล',
    en: 'Aftercare guidance and follow-up',
  },
];

const _PROCESS_STEP_ICONS = [
  UserRound,
  BarChart3,
  CalendarCheck,
  ShieldCheck,
  CalendarDays,
] as const;

const SERVICE_CHIP_ICONS = [
  { match: 'botox', Icon: UserRound },
  { match: 'filler', Icon: Syringe },
  { match: 'ulthera', Icon: Waves },
  { match: 'endolift', Icon: Zap },
  { match: 'sylfirm', Icon: SunMedium },
  { match: 'pico', Icon: Sparkles },
  { match: 'skin booster', Icon: Sparkles },
  { match: 'biostimulator', Icon: Grid2X2 },
] as const;

const FAQ_ITEMS: FaqItem[] = [
  {
    question: {
      th: 'ถ้ายังไม่รู้ว่าควรทำบริการไหนดี ควรเริ่มอย่างไร?',
      en: 'If I do not know which service to choose, where should I start?',
    },
    answer: {
      th: 'แนะนำให้เริ่มจากการประเมินโดยแพทย์ เพื่อดูสภาพผิว โครงสร้างใบหน้า และเป้าหมายการรักษา ก่อนเลือกบริการที่เหมาะสม',
      en: 'Start with a doctor assessment to review your skin condition, facial structure, and treatment goals before choosing a suitable service.',
    },
  },
  {
    question: {
      th: 'Botox กับ Filler ต่างกันอย่างไร?',
      en: 'How are Botox and Filler different?',
    },
    answer: {
      th: 'Botox ช่วยลดการทำงานของกล้ามเนื้อ เหมาะกับริ้วรอยจากการขยับหรือกล้ามเนื้อกราม ส่วน Filler ใช้เติมเต็มร่องลึก เพิ่มวอลลุ่ม และปรับสมดุลรูปหน้า',
      en: 'Botox reduces muscle activity and is commonly used for expression lines or masseter concerns. Filler adds volume, fills deeper folds, and supports facial balance.',
    },
  },
  {
    question: {
      th: 'Ulthera Prime, Endolift และ Sylfirm X ต่างกันอย่างไร?',
      en: 'How are Ulthera Prime, Endolift, and Sylfirm X different?',
    },
    answer: {
      th: 'ทั้งสามเป็นกลุ่มเทคโนโลยีที่ช่วยเรื่องผิวและความกระชับ แต่ใช้พลังงานและระดับชั้นผิวต่างกัน แพทย์จะประเมินตามปัญหาและเป้าหมายของแต่ละบุคคล',
      en: 'All three are technology-based treatments for skin quality or firmness, but they use different energy types and target different skin layers. A doctor assesses suitability case by case.',
    },
  },
  {
    question: {
      th: 'ต้องทำกี่ครั้งถึงเห็นผล?',
      en: 'How many sessions are needed to see results?',
    },
    answer: {
      th: 'ขึ้นอยู่กับบริการและสภาพปัญหาของแต่ละคน บางบริการเห็นผลทันที เช่น Filler ขณะที่บางบริการต้องอาศัยเวลาในการฟื้นฟูผิวหรือกระตุ้นคอลลาเจน',
      en: 'It depends on the service and individual condition. Some services, such as Filler, may show immediate change, while others need time for skin recovery or collagen stimulation.',
    },
  },
  {
    question: {
      th: 'หลังทำต้องพักฟื้นไหม?',
      en: 'Is downtime required after treatment?',
    },
    answer: {
      th: 'ระยะเวลาพักฟื้นแตกต่างกันตามบริการ บางหัตถการสามารถกลับไปใช้ชีวิตประจำวันได้ค่อนข้างเร็ว แต่ควรปฏิบัติตามคำแนะนำหลังทำของแพทย์',
      en: 'Downtime varies by service. Some treatments allow a quick return to daily activities, but aftercare instructions from the doctor should be followed.',
    },
  },
  {
    question: {
      th: 'สามารถทำหลายบริการร่วมกันได้ไหม?',
      en: 'Can multiple services be combined?',
    },
    answer: {
      th: 'สามารถทำร่วมกันได้ในบางกรณี โดยแพทย์จะวางแผนลำดับการรักษาให้เหมาะสมและปลอดภัยกับแต่ละบุคคล',
      en: 'Combination treatment may be possible in some cases. The doctor plans treatment sequence based on suitability and safety for each individual.',
    },
  },
];

const getServiceHref = (
  serviceName: string,
  locale: 'th' | 'en',
  serviceItems: ServiceItem[] = SERVICE_ITEMS
) => {
  const service = serviceItems.find((item) => item.name === serviceName);
  return buildLocalizedPath(
    locale,
    `/services/${service?.slug || serviceName.toLowerCase().replaceAll(' ', '-')}`
  );
};

const getServiceChipIcon = (serviceName: string) => {
  const normalized = serviceName.toLowerCase();
  return (
    SERVICE_CHIP_ICONS.find(({ match }) => normalized.includes(match))?.Icon ||
    Sparkles
  );
};

const getLinkHref = (
  link: BasicLink,
  locale: 'th' | 'en',
  fallback: string
) => {
  if (!link) return fallback;
  const raw = link.external || link.href || '';
  if (!raw || raw === '#') return fallback;
  if (
    raw.startsWith('http') ||
    raw.startsWith('/th') ||
    raw.startsWith('/en')
  ) {
    return raw;
  }
  return buildLocalizedPath(locale, raw);
};

const pick = (locale: 'th' | 'en', value: LocalizedText) =>
  locale === 'en' ? value.en : value.th;

const hasItems = <T,>(items?: T[] | null): items is T[] =>
  Boolean(items?.length);

const timelineIconFor = (timeline: string) => {
  const normalized = timeline.toLowerCase();

  if (
    normalized.includes('immediate') ||
    normalized.includes('ทันที') ||
    normalized.includes('à¸—à¸±à¸™à¸—à¸µ')
  ) {
    return Zap;
  }

  if (
    normalized.includes('depend') ||
    normalized.includes('ขึ้นอยู่') ||
    normalized.includes('à¸‚à¸¶à¹‰à¸™à¸­à¸¢à¸¹à¹ˆ')
  ) {
    return BarChart3;
  }

  return CalendarDays;
};

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Service hub renders several fixed SEO sections from one content model.
export default function ServicesHubPageContent({
  page,
  locale,
  baseUrl,
}: {
  page?: ServiceHubPageData | null;
  locale: 'th' | 'en';
  baseUrl: string;
}) {
  const isEn = locale === 'en';
  const heroHeading =
    (isEn ? page?.servicesHubHeroHeadingEn : page?.servicesHubHeroHeadingTh) ||
    (isEn
      ? 'Aesthetic and Laser Services by Experienced Doctors'
      : 'บริการความงามและเลเซอร์โดยแพทย์ผู้มีประสบการณ์');
  const heroSubtitle =
    (isEn
      ? page?.servicesHubHeroSubtitleEn
      : page?.servicesHubHeroSubtitleTh) ||
    (isEn
      ? 'A complete service hub for facial contouring, skin restoration, lifting, wrinkle reduction, and laser skin care, with doctor-led assessment and personalized treatment planning.'
      : 'รวมบริการด้านการปรับรูปหน้า ฟื้นฟูผิว ยกกระชับ ลดริ้วรอย และเลเซอร์ผิวพรรณ โดยแพทย์เป็นผู้ประเมินและวางแผนการรักษาเฉพาะบุคคล');
  const featuredHeading =
    (isEn
      ? page?.servicesHubFeaturedHeadingEn
      : page?.servicesHubFeaturedHeadingTh) ||
    (isEn
      ? 'Aesthetic services available at Drema Clinic'
      : 'บริการความงามที่ Drema Clinic ให้บริการ');
  const featuredDescription =
    (isEn
      ? page?.servicesHubFeaturedDescriptionEn
      : page?.servicesHubFeaturedDescriptionTh) ||
    (isEn
      ? 'Choose services by your skin, facial contouring, and treatment goals.'
      : 'เลือกบริการตามเป้าหมายการดูแลผิว รูปหน้า และปัญหาที่ต้องการแก้ไข');
  const whyHeading =
    (isEn ? page?.servicesHubWhyHeadingEn : page?.servicesHubWhyHeadingTh) ||
    (isEn ? 'Why Choose Drema Clinic' : 'ทำไมควรเลือก Drema Clinic');
  const whyBody =
    (isEn ? page?.servicesHubWhyBodyEn : page?.servicesHubWhyBodyTh) ||
    (isEn
      ? 'Drema Clinic prioritizes doctor-led assessment of facial structure and skin condition before treatment. This helps match each procedure with the patient’s concern, facial structure, budget, and personal goals.'
      : 'Drema Clinic ให้ความสำคัญกับการประเมินใบหน้าและสภาพผิวโดยแพทย์ก่อนเริ่มการรักษา เพื่อเลือกหัตถการที่เหมาะกับปัญหา โครงสร้างใบหน้า งบประมาณ และเป้าหมายของแต่ละบุคคล');
  const summaryHeading =
    (isEn
      ? page?.servicesHubSummaryHeadingEn
      : page?.servicesHubSummaryHeadingTh) ||
    (isEn
      ? 'Aesthetic and laser services at Drema Clinic'
      : 'บริการความงามและเลเซอร์ที่ Drema Clinic');
  const summaryText =
    (isEn ? page?.servicesHubSummaryTextEn : page?.servicesHubSummaryTextTh) ||
    (isEn
      ? 'Drema Clinic provides aesthetic and laser services covering wrinkle reduction, facial contouring, lifting, skin quality restoration, acne scar care, pores, melasma, freckles, dark spots, and other skin concerns. Doctors assess each patient and design a suitable treatment plan for individual needs.'
      : 'Drema Clinic ให้บริการด้านความงามและเลเซอร์ ครอบคลุมการลดริ้วรอย การปรับรูปหน้า การยกกระชับ การฟื้นฟูคุณภาพผิว การดูแลหลุมสิว รูขุมขน ฝ้า กระ จุดด่างดำ และปัญหาผิวอื่น ๆ โดยแพทย์เป็นผู้ประเมินและวางแผนการรักษาให้เหมาะกับแต่ละบุคคล');
  const serviceItems = hasItems(page?.servicesHubServices)
    ? page.servicesHubServices.map((item) => ({
        name: item.name || '',
        slug: item.slug || '',
        summary: {
          th: item.summaryTh || '',
          en: item.summaryEn || item.summaryTh || '',
        },
        image: item.image || null,
      }))
    : SERVICE_ITEMS;
  const concernItems = hasItems(page?.servicesHubConcerns)
    ? page.servicesHubConcerns.map((item) => ({
        concern: {
          th: item.concernTh || '',
          en: item.concernEn || item.concernTh || '',
        },
        services: item.services || [],
        image: item.image || null,
      }))
    : CONCERNS;
  const concernsBackgroundUrl = page?.servicesHubConcernsBackgroundImage?.asset
    ?._id
    ? (urlForImage(page.servicesHubConcernsBackgroundImage)
        ?.width(2200)
        .height(1400)
        // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
        .fit('crop')
        .auto('format')
        .url() as string)
    : undefined;
  const comparisonItems = hasItems(page?.servicesHubComparisonRows)
    ? page.servicesHubComparisonRows.map((item) => ({
        service: item.service || '',
        image: item.image || null,
        suitableFor: {
          th: item.suitableForTh || '',
          en: item.suitableForEn || item.suitableForTh || '',
        },
        highlight: {
          th: item.highlightTh || '',
          en: item.highlightEn || item.highlightTh || '',
        },
        timeline: {
          th: item.timelineTh || '',
          en: item.timelineEn || item.timelineTh || '',
        },
      }))
    : COMPARISON_ITEMS;
  const whyPoints = hasItems(page?.servicesHubWhyPoints)
    ? page.servicesHubWhyPoints.map((item) => ({
        th: item.textTh || '',
        en: item.textEn || item.textTh || '',
      }))
    : WHY_POINTS;
  const whyImageUrl = page?.servicesHubWhyImage?.asset?._id
    ? (urlForImage(page.servicesHubWhyImage)
        ?.width(1100)
        .height(760)
        // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
        .fit('crop')
        .auto('format')
        .url() as string)
    : undefined;
  const processSteps = hasItems(page?.servicesHubProcessSteps)
    ? page.servicesHubProcessSteps.map((item) => ({
        th: item.textTh || '',
        en: item.textEn || item.textTh || '',
        imageTh: item.imageTh || null,
        imageEn: item.imageEn || item.imageTh || null,
      }))
    : PROCESS_STEPS;
  const faqItems = hasItems(page?.servicesHubFaqItems)
    ? page.servicesHubFaqItems.map((item) => ({
        question: {
          th: item.questionTh || '',
          en: item.questionEn || item.questionTh || '',
        },
        answer: {
          th: item.answerTh || '',
          en: item.answerEn || item.answerTh || '',
        },
      }))
    : FAQ_ITEMS;
  const pageUrl = buildLocalizedUrl(locale, '/services', baseUrl);
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: pick(locale, item.question),
      acceptedAnswer: {
        '@type': 'Answer',
        text: pick(locale, item.answer),
      },
    })),
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isEn ? 'Home' : 'หน้าแรก',
        item: buildLocalizedUrl(locale, '/', baseUrl),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isEn ? 'Services' : 'บริการ',
        item: pageUrl,
      },
    ],
  };

  return (
    <main className="bg-[var(--marketing-surface-1)]">
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </script>

      <MarketingPageHero
        breadcrumbs={{
          locale,
          items: [
            homeBreadcrumb(locale),
            { label: getBreadcrumbLabel(locale, 'services') },
          ],
        }}
        eyebrow={isEn ? 'Service Hub' : 'บริการของคลินิก'}
        heading={heroHeading}
        description={heroSubtitle}
        desktopImage={
          page?.heroBackgroundDesktop || page?.heroImageDesktop || null
        }
        mobileImage={
          page?.heroBackgroundMobile || page?.heroImageMobile || null
        }
        fallbackImage={page?.heroImage || null}
        imageAlt={isEn ? 'Drema Clinic services' : 'บริการของ Drema Clinic'}
        imagePlaceholder={
          isEn ? 'Upload services hero image' : 'อัปโหลดภาพ Hero หน้า Services'
        }
        actions={
          <>
            <Link
              href={getLinkHref(
                page?.servicesHubPrimaryCtaLink || null,
                locale,
                buildLocalizedPath(locale, '/contact')
              )}
              className="rounded-xl bg-[var(--marketing-cta-primary-bg)] px-6 py-3 text-sm font-medium text-[var(--marketing-cta-primary-text)] transition-all duration-500 ease-out hover:-translate-y-[2px] hover:bg-[var(--marketing-cta-primary-bg-hover)] hover:shadow-lg"
            >
              {(isEn
                ? page?.servicesHubPrimaryCtaTextEn
                : page?.servicesHubPrimaryCtaTextTh) ||
                (isEn ? 'Consult a Doctor' : 'ปรึกษาแพทย์')}
            </Link>
            <Link
              href={getLinkHref(
                page?.servicesHubSecondaryCtaLink || null,
                locale,
                '#services-list'
              )}
              className="rounded-xl border border-[var(--marketing-cta-secondary-border)] bg-[var(--marketing-cta-secondary-bg)] px-6 py-3 text-sm font-medium text-[var(--marketing-cta-secondary-text)] transition-all duration-500 ease-out hover:-translate-y-[2px] hover:bg-[var(--marketing-cta-secondary-bg-hover)]"
            >
              {(isEn
                ? page?.servicesHubSecondaryCtaTextEn
                : page?.servicesHubSecondaryCtaTextTh) ||
                (isEn ? 'View All Services' : 'ดูบริการทั้งหมด')}
            </Link>
          </>
        }
      />

      <section
        id="services-list"
        className="relative overflow-hidden bg-[linear-gradient(180deg,#fffdf9_0%,#fbf5ec_100%)] py-20 md:py-24"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.95),transparent_28%),radial-gradient(circle_at_86%_18%,rgba(216,184,133,0.18),transparent_34%),radial-gradient(circle_at_50%_110%,rgba(139,107,74,0.08),transparent_34%)]" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-5 flex items-center justify-center gap-5">
              <span className="h-px w-16 bg-[var(--marketing-border-strong)]" />
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--marketing-brand)]">
                Our Services
              </p>
              <span className="h-px w-16 bg-[var(--marketing-border-strong)]" />
            </div>
            <h2 className="font-serif text-4xl font-semibold leading-tight text-[var(--marketing-ink)] md:text-6xl">
              {featuredHeading}
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[var(--marketing-copy)] md:text-lg">
              {featuredDescription}
            </p>
            <div className="mx-auto mt-7 flex w-36 items-center justify-center gap-3">
              <span className="h-px flex-1 bg-[var(--marketing-border-strong)]" />
              <span className="h-2 w-2 rotate-45 bg-[var(--marketing-brand)]" />
              <span className="h-px flex-1 bg-[var(--marketing-border-strong)]" />
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {serviceItems.map((service, index) => {
              const imageUrl = service.image?.asset?._id
                ? (urlForImage(service.image)
                    ?.width(720)
                    .height(720)
                    // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
                    .fit('crop')
                    .auto('format')
                    .url() as string)
                : undefined;

              return (
                <article
                  key={service.slug}
                  className="group flex min-h-[220px] overflow-hidden rounded-[0.9rem] border border-[var(--marketing-border)] bg-white shadow-[0_18px_46px_rgba(66,45,28,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_58px_rgba(66,45,28,0.14)] sm:flex-row xl:min-h-[255px]"
                >
                  <div className="flex min-w-0 flex-1 flex-col p-6">
                    <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--marketing-border-strong)] bg-[var(--marketing-surface-1)] text-xs font-semibold text-[var(--marketing-brand)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-serif text-2xl font-semibold leading-tight text-[var(--marketing-ink)]">
                      {service.name}
                    </h3>
                    <span className="my-4 block h-px w-10 bg-[var(--marketing-brand)]" />
                    <p className="text-sm leading-7 text-[var(--marketing-copy)]">
                      {pick(locale, service.summary)}
                    </p>
                    <Link
                      href={getServiceHref(service.name, locale, serviceItems)}
                      className="mt-auto inline-flex items-center gap-3 pt-6 text-sm font-semibold text-[var(--marketing-brand)] hover:underline"
                    >
                      {isEn ? 'Read service details' : 'อ่านรายละเอียดบริการ'}
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--marketing-brand)] text-white transition-transform duration-500 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                  <div className="relative min-h-[220px] bg-[linear-gradient(135deg,#f6ede2,#dfc6a5)] sm:w-[44%] xl:w-[45%]">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={service.image?.alt || service.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 44vw, 180px"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_25%,rgba(255,255,255,0.76),transparent_32%),linear-gradient(135deg,#f8efe4,#d9bd98)]" />
                    )}
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mx-auto mt-8 flex max-w-3xl items-center justify-center rounded-full border border-[var(--marketing-border)] bg-white/70 px-5 py-3 text-center text-sm leading-6 text-[var(--marketing-copy)] shadow-[0_12px_32px_rgba(66,45,28,0.06)] backdrop-blur">
            {isEn
              ? 'Every service starts with doctor assessment and a personalized treatment plan.'
              : 'ทุกบริการประเมินและวางแผนโดยแพทย์ เพื่อเลือกหัตถการที่เหมาะกับแต่ละบุคคล'}
          </div>
        </div>
      </section>

      <section
        id="concerns"
        className="relative overflow-hidden bg-[linear-gradient(135deg,#fffdf9_0%,#f7eddf_48%,#ead7bd_100%)] py-20 md:py-24"
      >
        {concernsBackgroundUrl ? (
          <Image
            src={concernsBackgroundUrl}
            alt={
              page?.servicesHubConcernsBackgroundImage?.alt ||
              (isEn
                ? 'Choose services by concern background'
                : 'ภาพพื้นหลังเลือกบริการตามปัญหา')
            }
            fill
            sizes="100vw"
            className="object-cover opacity-55"
          />
        ) : (
          <div className="pointer-events-none absolute right-[-18vw] top-[-18rem] h-[36rem] w-[72vw] rotate-[-16deg] rounded-[100%] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.7),rgba(214,174,119,0.18)_52%,rgba(255,255,255,0.28))] shadow-[inset_0_1px_18px_rgba(255,255,255,0.55)]" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,253,249,0.92)_0%,rgba(255,250,243,0.74)_42%,rgba(255,255,255,0.62)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.56))]" />
        <div className="relative mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="max-w-5xl">
            <div className="mb-5 flex items-center justify-center gap-4">
              <span className="h-px w-16 bg-[var(--marketing-border-strong)]" />
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--marketing-brand)]">
                Choose by concern
              </p>
              <span className="h-px w-16 bg-[var(--marketing-border-strong)]" />
            </div>
            <h2 className="font-serif text-4xl font-semibold leading-tight text-[var(--marketing-ink)] md:text-6xl">
              {isEn
                ? 'Choose services by concern'
                : 'เลือกบริการตามปัญหาที่ต้องการดูแล'}
            </h2>
            <p className="mt-5 max-w-4xl text-base leading-8 text-[var(--marketing-copy)] md:text-lg">
              {isEn
                ? 'If you are unsure where to start, choose from the main concern you want to address.'
                : 'หากยังไม่แน่ใจว่าควรเริ่มจากบริการใด สามารถเลือกดูจากปัญหาหลักที่ต้องการแก้ไขได้'}
            </p>
          </div>
          <div className="mt-11 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {concernItems.map((item, index) => {
              const concernName = pick(locale, item.concern);
              const imageUrl = item.image?.asset?._id
                ? (urlForImage(item.image)
                    ?.width(900)
                    .height(620)
                    // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
                    .fit('crop')
                    .auto('format')
                    .url() as string)
                : undefined;

              return (
                <article
                  key={concernName}
                  className="group relative min-h-[302px] overflow-hidden rounded-[1.05rem] border border-white/80 bg-white/78 p-6 shadow-[0_20px_54px_rgba(66,45,28,0.12)] ring-1 ring-[rgba(255,255,255,0.72)] backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(66,45,28,0.16)]"
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={item.image?.alt || concernName}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover object-right-bottom opacity-95 transition-transform duration-700 group-hover:scale-[1.035]"
                    />
                  ) : (
                    <div className="absolute inset-y-0 right-0 w-[55%] bg-[radial-gradient(circle_at_72%_36%,rgba(255,255,255,0.9),transparent_32%),linear-gradient(135deg,#f8efe4,#d9bd98)]" />
                  )}
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.99)_0%,rgba(255,255,255,0.94)_42%,rgba(255,255,255,0.58)_66%,rgba(255,255,255,0.08)_100%)]" />
                  <div className="absolute inset-0 rounded-[1.05rem] border border-white/55" />
                  <div className="relative z-10 flex min-h-[254px] max-w-[68%] flex-col">
                    <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#f1e4d1] font-serif text-base font-semibold text-[#7d5c37] shadow-[0_8px_18px_rgba(66,45,28,0.08)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-2xl font-semibold leading-tight text-[var(--marketing-ink)] md:text-[1.7rem]">
                      {concernName}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--marketing-copy)]">
                      {isEn
                        ? 'View treatments commonly selected for this concern.'
                        : 'เลือกดูบริการที่มักใช้ดูแลปัญหานี้โดยแพทย์เป็นผู้ประเมิน'}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-5">
                      {item.services.map((serviceName) => {
                        const ChipIcon = getServiceChipIcon(serviceName);

                        return (
                          <Link
                            key={`${concernName}-${serviceName}`}
                            href={getServiceHref(
                              serviceName,
                              locale,
                              serviceItems
                            )}
                            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#d8b98e]/70 bg-white/90 px-3.5 py-2 text-sm font-medium text-[#6a4b2e] shadow-[0_8px_22px_rgba(66,45,28,0.08)] transition hover:border-[var(--marketing-brand)] hover:bg-white hover:text-[var(--marketing-brand)]"
                          >
                            <ChipIcon
                              className="h-4 w-4 text-[#b67635]"
                              aria-hidden="true"
                            />
                            {serviceName}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mt-8 overflow-hidden rounded-[1.05rem] border border-white/70 bg-white/78 shadow-[0_18px_54px_rgba(66,45,28,0.1)] backdrop-blur">
            <div className="grid gap-5 p-5 md:grid-cols-[auto_1fr_auto] md:items-center md:p-7">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d8b98e] bg-white text-[var(--marketing-brand)]">
                <CalendarCheck className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-[var(--marketing-ink)]">
                  {isEn
                    ? 'Not sure which service fits your concern?'
                    : 'ยังไม่แน่ใจว่าปัญหาของคุณเหมาะกับบริการไหน?'}
                </h3>
                <p className="mt-1 text-sm leading-7 text-[var(--marketing-copy)]">
                  {isEn
                    ? 'Book a doctor consultation for a personalized skin and facial assessment.'
                    : 'ปรึกษาแพทย์เพื่อประเมินผิวและวางแผนการรักษาเฉพาะบุคคล'}
                </p>
              </div>
              <Link
                href={buildLocalizedPath(locale, '/contact')}
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[linear-gradient(135deg,#9a7446,#6f4b27)] px-7 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(111,75,39,0.25)] transition-all duration-500 hover:-translate-y-[2px]"
              >
                {isEn ? 'Book consultation' : 'นัดหมายปรึกษาแพทย์'}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="process"
        className="relative overflow-hidden bg-[radial-gradient(circle_at_12%_8%,rgba(255,255,255,0.98),transparent_26%),radial-gradient(circle_at_86%_18%,rgba(210,166,96,0.14),transparent_30%),linear-gradient(180deg,#fffdf9_0%,#f6eadb_52%,#fffaf4_100%)] py-20 md:py-24"
      >
        <div className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full border border-[#d5ad72]/35" />
        <div className="pointer-events-none absolute -left-24 bottom-[-9rem] h-80 w-80 rounded-full border border-[#d5ad72]/30" />
        <div className="relative mx-auto max-w-[94rem] px-6 md:px-10">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-5 flex items-center justify-center gap-5">
              <span className="h-px w-16 bg-[#d5ad72]" />
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b98a4f]">
                Our Process
              </p>
              <span className="h-px w-16 bg-[#d5ad72]" />
            </div>
            <h2 className="font-serif text-4xl font-semibold leading-tight text-[var(--marketing-ink)] md:text-6xl">
              {isEn ? 'Service Process' : 'ขั้นตอนการรับบริการ'}
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[var(--marketing-copy)] md:text-lg">
              {isEn
                ? 'We guide every step with doctor-led assessment, personalized planning, and careful aftercare.'
                : 'à¹€à¸£à¸²à¸”à¸¹à¹à¸¥à¸—à¸¸à¸à¸‚à¸±à¹‰à¸™à¸•à¸­à¸™ à¹€à¸žà¸·à¹ˆà¸­à¹ƒà¸«à¹‰à¹„à¸”à¹‰à¸œà¸¥à¸¥à¸±à¸žà¸˜à¹Œà¸—à¸µà¹ˆà¹€à¸«à¸¡à¸²à¸°à¸ªà¸¡à¹à¸¥à¸°à¸›à¸¥à¸­à¸”à¸ à¸±à¸¢à¸—à¸µà¹ˆà¸ªà¸¸à¸”'}
            </p>
            <div className="mx-auto mt-7 flex w-44 items-center justify-center gap-3">
              <span className="h-px flex-1 bg-[#d5ad72]" />
              <span className="h-2 w-2 rotate-45 bg-[#c89d62]" />
              <span className="h-px flex-1 bg-[#d5ad72]" />
            </div>
          </div>
          <div className="relative mt-14">
            <div className="pointer-events-none absolute left-0 right-0 top-9 hidden border-t border-dashed border-[#d0aa74] lg:block" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {processSteps.map((step, index) => {
                const Icon =
                  _PROCESS_STEP_ICONS[index % _PROCESS_STEP_ICONS.length];
                const stepTitle = pick(locale, step);
                const stepImage = isEn ? step.imageEn : step.imageTh;
                const imageUrl = stepImage?.asset?._id
                  ? (urlForImage(stepImage)
                      ?.width(720)
                      .height(520)
                      // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
                      .fit('crop')
                      .auto('format')
                      .url() as string)
                  : undefined;

                return (
                  <article
                    key={stepTitle}
                    className="group relative rounded-[1.25rem] border border-[#e7d6bf] bg-white/76 p-3 pt-10 shadow-[0_22px_58px_rgba(70,47,28,0.09)] backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_28px_72px_rgba(70,47,28,0.14)]"
                  >
                    <div className="absolute left-1/2 top-0 z-10 flex h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#e8d8c2] bg-[linear-gradient(180deg,#fffdf9,#f7ead8)] font-serif text-2xl font-semibold text-[#8b6337] shadow-[0_14px_32px_rgba(92,58,24,0.13)]">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="overflow-hidden rounded-[0.9rem] border border-[#eadbc8] bg-[linear-gradient(135deg,#f8efe4,#d9bd98)]">
                      <div className="relative aspect-[4/3]">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={stepImage?.alt || stepTitle}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_42%_22%,rgba(255,255,255,0.86),transparent_32%),linear-gradient(135deg,#fbf1e6,#d9bd98)] px-5 text-center text-xs font-medium leading-5 text-[#8b6b4a]">
                            {isEn
                              ? 'Upload process image in Studio'
                              : 'à¹€à¸žà¸´à¹ˆà¸¡à¸£à¸¹à¸›à¸‚à¸±à¹‰à¸™à¸•à¸­à¸™à¹ƒà¸™ Studio'}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="relative -mt-7 flex justify-center">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#e3cfb4] bg-white text-[#b98a4f] shadow-[0_12px_28px_rgba(70,47,28,0.12)]">
                        <Icon
                          className="h-8 w-8 stroke-[1.45]"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <div className="px-4 pb-6 pt-4 text-center">
                      <h3 className="text-base font-semibold leading-7 text-[var(--marketing-ink)] md:text-lg">
                        {stepTitle}
                      </h3>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="mx-auto mt-10 flex max-w-4xl items-center justify-center gap-4 rounded-full border border-[#ead8c0] bg-white/70 px-6 py-4 text-center text-sm font-medium leading-7 text-[#7a5a38] shadow-[0_14px_36px_rgba(70,47,28,0.08)] backdrop-blur">
            <Sparkles
              className="h-5 w-5 shrink-0 text-[#c89d62]"
              aria-hidden="true"
            />
            <span>
              {isEn
                ? 'Every step focuses on natural-looking, safe, and suitable results for each patient.'
                : 'à¸—à¸¸à¸à¸‚à¸±à¹‰à¸™à¸•à¸­à¸™à¸¡à¸¸à¹ˆà¸‡à¹€à¸™à¹‰à¸™à¸œà¸¥à¸¥à¸±à¸žà¸˜à¹Œà¸—à¸µà¹ˆà¹€à¸›à¹‡à¸™à¸˜à¸£à¸£à¸¡à¸Šà¸²à¸•à¸´ à¸›à¸¥à¸­à¸”à¸ à¸±à¸¢ à¹à¸¥à¸°à¹€à¸«à¸¡à¸²à¸°à¸ªà¸¡à¸à¸±à¸šà¸„à¸¸à¸“à¸¡à¸²à¸à¸—à¸µà¹ˆà¸ªà¸¸à¸”'}
            </span>
          </div>
        </div>
      </section>

      <section
        id="comparison"
        className="relative overflow-hidden bg-[linear-gradient(135deg,#fffaf2_0%,#fbf3e8_50%,#f7ead9_100%)] py-20 md:py-24"
      >
        <div className="pointer-events-none absolute inset-0 opacity-80">
          <div className="absolute -left-28 bottom-8 h-72 w-72 rounded-full border border-[#d6ad72]/40" />
          <div className="absolute -right-24 top-0 h-80 w-80 rounded-full border border-[#d6ad72]/35" />
          <div className="absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_22%_0%,rgba(255,255,255,0.96),transparent_32%)]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <div className="max-w-5xl">
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-12 bg-[var(--marketing-border-strong)]" />
              <Sparkles className="h-4 w-4 text-[var(--marketing-brand)]" />
            </div>
            <h2 className="font-serif text-4xl font-semibold leading-tight text-[var(--marketing-ink)] md:text-5xl">
              {isEn ? 'Compare popular services' : 'เปรียบเทียบบริการยอดนิยม'}
            </h2>
            <p className="mt-5 max-w-4xl text-base leading-8 text-[var(--marketing-copy)] md:text-lg">
              {isEn
                ? 'A summary of key service differences to help you understand initial treatment directions before doctor assessment.'
                : 'สรุปความแตกต่างของบริการหลัก เพื่อช่วยให้เข้าใจแนวทางการรักษาเบื้องต้นก่อนเข้ารับการประเมินโดยแพทย์'}
            </p>
          </div>
          <div className="mt-10 hidden overflow-hidden rounded-[1.35rem] border border-[#d8bf9b] bg-white/92 shadow-[0_28px_80px_rgba(66,45,28,0.14)] backdrop-blur md:block">
            <table className="w-full table-fixed border-collapse text-left">
              <colgroup>
                <col className="w-[24%]" />
                <col className="w-[25%]" />
                <col className="w-[26%]" />
                <col className="w-[25%]" />
              </colgroup>
              <thead className="bg-[linear-gradient(180deg,#b48955_0%,#9a6f3d_100%)] text-white">
                <tr>
                  {(isEn
                    ? [
                        'Service',
                        'Suitable for',
                        'Key benefit',
                        'Estimated timing',
                      ]
                    : ['บริการ', 'เหมาะกับ', 'จุดเด่น', 'ระยะเวลาเห็นผลโดยประมาณ']
                  ).map((label, index) => {
                    const HeaderIcon =
                      [Grid2X2, UserRound, Gem, Clock3][index] || Grid2X2;

                    return (
                      <th
                        key={label}
                        className="border-r border-white/35 px-6 py-5 text-base font-semibold last:border-r-0"
                      >
                        <span className="flex items-center gap-3">
                          <HeaderIcon className="h-6 w-6 stroke-[1.7]" />
                          {label}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {comparisonItems.map((item) => {
                  const timelineText = pick(locale, item.timeline);
                  const TimelineIcon = timelineIconFor(timelineText);
                  const fallbackImage = serviceItems.find(
                    (service) => service.name === item.service
                  )?.image;
                  const itemImage = item.image || fallbackImage || null;
                  const imageUrl = itemImage?.asset?._id
                    ? (urlForImage(itemImage)
                        ?.width(220)
                        .height(220)
                        // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
                        .fit('crop')
                        .auto('format')
                        .url() as string)
                    : undefined;

                  return (
                    <tr
                      key={item.service}
                      className="border-t border-[#eadcc8] bg-white/84 transition-colors duration-300 hover:bg-[#fffaf3]"
                    >
                      <td className="border-r border-[#eadcc8] px-6 py-5">
                        <Link
                          href={getServiceHref(
                            item.service,
                            locale,
                            serviceItems
                          )}
                          className="group flex items-center gap-4"
                        >
                          <span className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#f8efe3,#ead6ba)] shadow-[inset_0_0_0_1px_rgba(154,111,61,0.12),0_10px_24px_rgba(66,45,28,0.1)]">
                            {imageUrl ? (
                              <Image
                                src={imageUrl}
                                alt={itemImage?.alt || item.service}
                                fill
                                sizes="64px"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <span className="font-serif text-xl font-semibold text-[var(--marketing-brand)]">
                                {item.service.slice(0, 1)}
                              </span>
                            )}
                          </span>
                          <span className="font-serif text-xl font-semibold leading-tight text-[var(--marketing-ink)] group-hover:text-[var(--marketing-brand)]">
                            {item.service}
                          </span>
                        </Link>
                      </td>
                      <td className="border-r border-[#eadcc8] px-8 py-5 text-base leading-8 text-[var(--marketing-copy)]">
                        {pick(locale, item.suitableFor)}
                      </td>
                      <td className="border-r border-[#eadcc8] px-8 py-5 text-base leading-8 text-[var(--marketing-copy)]">
                        {pick(locale, item.highlight)}
                      </td>
                      <td className="px-8 py-5">
                        <span className="inline-flex items-center gap-3 rounded-full bg-[#f5eadb] px-5 py-3 text-base font-medium leading-6 text-[#7a552d]">
                          <TimelineIcon className="h-5 w-5 shrink-0 stroke-[1.8]" />
                          {timelineText}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 md:hidden">
            {comparisonItems.map((item) => {
              const timelineText = pick(locale, item.timeline);
              const TimelineIcon = timelineIconFor(timelineText);
              const fallbackImage = serviceItems.find(
                (service) => service.name === item.service
              )?.image;
              const itemImage = item.image || fallbackImage || null;
              const imageUrl = itemImage?.asset?._id
                ? (urlForImage(itemImage)
                    ?.width(220)
                    .height(220)
                    // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
                    .fit('crop')
                    .auto('format')
                    .url() as string)
                : undefined;

              return (
                <article
                  key={item.service}
                  className="overflow-hidden rounded-[1.15rem] border border-[#dfc8aa] bg-white shadow-[0_18px_44px_rgba(66,45,28,0.1)]"
                >
                  <Link
                    href={getServiceHref(item.service, locale, serviceItems)}
                    className="flex items-center gap-4 bg-[linear-gradient(180deg,#b48955_0%,#9a6f3d_100%)] px-5 py-4 text-white"
                  >
                    <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f8efe3] text-[var(--marketing-brand)]">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={itemImage?.alt || item.service}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="font-serif text-lg font-semibold">
                          {item.service.slice(0, 1)}
                        </span>
                      )}
                    </span>
                    <span className="font-serif text-xl font-semibold leading-tight">
                      {item.service}
                    </span>
                  </Link>
                  <dl className="space-y-4 p-5 text-sm leading-7">
                    <div>
                      <dt className="flex items-center gap-2 font-semibold text-[var(--marketing-brand)]">
                        <UserRound className="h-4 w-4" />
                        {isEn ? 'Suitable for' : 'เหมาะกับ'}
                      </dt>
                      <dd className="mt-1 text-[var(--marketing-copy)]">
                        {pick(locale, item.suitableFor)}
                      </dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-2 font-semibold text-[var(--marketing-brand)]">
                        <Gem className="h-4 w-4" />
                        {isEn ? 'Key benefit' : 'จุดเด่น'}
                      </dt>
                      <dd className="mt-1 text-[var(--marketing-copy)]">
                        {pick(locale, item.highlight)}
                      </dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-2 font-semibold text-[var(--marketing-brand)]">
                        <Clock3 className="h-4 w-4" />
                        {isEn ? 'Estimated timing' : 'ระยะเวลาเห็นผลโดยประมาณ'}
                      </dt>
                      <dd className="mt-2">
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#f5eadb] px-4 py-2 font-medium text-[#7a552d]">
                          <TimelineIcon className="h-4 w-4" />
                          {timelineText}
                        </span>
                      </dd>
                    </div>
                  </dl>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="why-choose"
        className="relative overflow-hidden bg-[radial-gradient(circle_at_8%_0%,rgba(255,255,255,0.98),transparent_30%),linear-gradient(135deg,#fffaf3_0%,#f4e7d7_54%,#fffdf9_100%)] py-20 md:py-24"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-8 h-56 w-56 rounded-full border border-[#d6af78]/45" />
          <div className="absolute -right-32 bottom-[-7rem] h-72 w-72 rounded-full border border-[#d6af78]/45" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,#d1a666,transparent)]" />
        </div>
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:px-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div className="space-y-8">
            <div>
              <div className="mb-6 flex items-center gap-4">
                <span className="h-px w-12 bg-[#b98a4f]" />
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b98a4f]">
                  Why Choose Us
                </p>
              </div>
              <h2 className="font-serif text-4xl font-semibold leading-tight text-[var(--marketing-ink)] md:text-6xl">
                {whyHeading}
              </h2>
              <div className="mt-6 flex w-44 items-center gap-3">
                <span className="h-px flex-1 bg-[#c89d62]" />
                <span className="h-2 w-2 rotate-45 bg-[#c89d62]" />
                <span className="h-px flex-1 bg-[#c89d62]" />
              </div>
              <p className="mt-7 text-base leading-8 text-[var(--marketing-copy)] md:text-lg">
                {whyBody}
              </p>
            </div>
            <div className="overflow-hidden rounded-[1.25rem] border border-[#e4cfb4] bg-white/72 shadow-[0_22px_60px_rgba(70,47,28,0.09)] backdrop-blur">
              <div className="relative aspect-[4/3] bg-[linear-gradient(135deg,#faf0e3,#dcc09d)]">
                {whyImageUrl ? (
                  <Image
                    src={whyImageUrl}
                    alt={page?.servicesHubWhyImage?.alt || whyHeading}
                    fill
                    sizes="(max-width: 1024px) 100vw, 36vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_42%_22%,rgba(255,255,255,0.9),transparent_32%),linear-gradient(135deg,#fbf1e6,#d9bd98)] px-8 text-center text-sm font-medium leading-6 text-[#8b6b4a]">
                    Upload why-choose section image in Studio
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 border-t border-[#ead8c0] bg-white/82 p-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#d5ad72,#9d7446)] text-white shadow-[0_12px_26px_rgba(139,107,74,0.24)]">
                  <ShieldCheck className="h-7 w-7" aria-hidden="true" />
                </span>
                <p className="text-sm font-medium leading-7 text-[var(--marketing-copy)]">
                  {isEn
                    ? 'Personalized treatment planning by experienced doctors.'
                    : 'à¸§à¸²à¸‡à¹à¸œà¸™à¸à¸²à¸£à¸£à¸±à¸à¸©à¸²à¹€à¸‰à¸žà¸²à¸°à¸šà¸¸à¸„à¸„à¸¥ à¹‚à¸”à¸¢à¹à¸žà¸—à¸¢à¹Œà¸œà¸¹à¹‰à¸¡à¸µà¸›à¸£à¸°à¸ªà¸šà¸à¸²à¸£à¸“à¹Œ'}
                </p>
              </div>
            </div>
          </div>
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {whyPoints.map((point, index) => {
              const Icon = WHY_POINT_ICONS[index % WHY_POINT_ICONS.length];

              return (
                <li
                  key={pick(locale, point)}
                  className="group flex min-h-[154px] items-center gap-5 rounded-[1.25rem] border border-[#e6d4bd] bg-white/82 p-5 shadow-[0_20px_52px_rgba(70,47,28,0.08)] backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_68px_rgba(70,47,28,0.14)]"
                >
                  <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-[#e7d2b7] bg-[linear-gradient(180deg,#fffaf4,#f5eadb)] text-[#b98a4f] transition-transform duration-500 group-hover:scale-105">
                    <Icon
                      className="h-10 w-10 stroke-[1.4]"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="h-16 w-px shrink-0 bg-[#ead8c0]" />
                  <span className="text-base font-semibold leading-8 text-[var(--marketing-ink)]">
                    {pick(locale, point)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section
        id="faq"
        className="bg-[var(--marketing-surface-2)] py-20 md:py-24"
      >
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <h2 className="font-serif text-4xl font-semibold leading-tight text-[var(--marketing-ink)] md:text-5xl">
            {isEn
              ? 'Frequently asked questions about Drema Clinic services'
              : 'คำถามที่พบบ่อยเกี่ยวกับบริการของ Drema Clinic'}
          </h2>
          <div className="mt-10 space-y-4">
            {faqItems.map((item) => (
              <article
                key={pick(locale, item.question)}
                className="rounded-[1.1rem] border border-[var(--marketing-border)] bg-white p-6 shadow-[var(--marketing-card-shadow)]"
              >
                <h3 className="text-lg font-semibold leading-7 text-[var(--marketing-ink)]">
                  {pick(locale, item.question)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--marketing-copy)]">
                  {pick(locale, item.answer)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-10 md:py-24">
        <article className="mx-auto max-w-5xl rounded-[1.35rem] border border-[var(--marketing-border)] bg-[linear-gradient(180deg,var(--marketing-surface)_0%,var(--marketing-surface-alt)_100%)] p-7 shadow-[var(--marketing-card-shadow)] md:p-10">
          <h2 className="font-serif text-3xl font-semibold leading-tight text-[var(--marketing-ink)] md:text-4xl">
            {summaryHeading}
          </h2>
          <p className="mt-5 text-base leading-8 text-[var(--marketing-copy)]">
            {summaryText}
          </p>
        </article>
      </section>
    </main>
  );
}
