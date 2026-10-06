import type { Metadata } from 'next';
import PromotionsPageContent from '@/components/pages/PromotionsPageContent';
import { getRouteLocale } from '@/lib/routeLocale';
import { sanityFetch } from '@/lib/sanity/client/live';
import { formatMetaData } from '@/lib/sanity/client/seo';
import { promotionsPageQuery } from '@/lib/sanity/queries/queries';

type PromotionsQueryData = {
  page?: { seo?: unknown; name?: string | null } | null;
  settings?: {
    globalCtaHeadingTh?: string | null;
    globalCtaHeadingEn?: string | null;
    globalCtaTextTh?: string | null;
    globalCtaTextEn?: string | null;
    globalCtaButtonTextTh?: string | null;
    globalCtaButtonTextEn?: string | null;
    globalCtaButtonLink?: unknown;
    globalCtaBackgroundImage?: unknown;
    socialLinks?: Array<{
      _key?: string | null;
      platform?: string | null;
      label?: string | null;
      url?: string | null;
    }> | null;
  } | null;
  promotions?: unknown[];
} | null;
type Props = { params: Promise<{ locale: string }> };

const fallbackPromotionsPage = {
  name: 'Promotions',
  heroEyebrowTh: 'Promotion Programs',
  heroEyebrowEn: 'Promotion Programs',
  heroHeadingTh: 'โปรโมชันที่ออกแบบให้เหมาะกับปัญหาผิวและเป้าหมายของคุณ',
  heroHeadingEn:
    'Promotions tailored to your skin concerns and treatment goals',
  heroDescriptionTh:
    'รวมโปรแกรมดูแลผิวและความงามที่ช่วยให้คุณเริ่มต้นได้ง่ายขึ้น โดยยังคงประเมินตามปัญหาจริง วางแผนโดยแพทย์ และเลือกแนวทางที่เหมาะกับแต่ละบุคคล',
  heroDescriptionEn:
    'A curated selection of skin and aesthetic programs designed to make your first step clearer, while still being assessed by a doctor and tailored to your individual concerns.',
  heroPrimaryCtaTextTh: 'ดูโปรโมชันทั้งหมด',
  heroPrimaryCtaTextEn: 'Browse Promotions',
  heroPrimaryCtaLink: {
    type: 'external',
    external: '/promotions',
    href: '#',
    openInNewTab: false,
  },
  heroSecondaryCtaTextTh: 'ปรึกษาแพทย์ก่อนตัดสินใจ',
  heroSecondaryCtaTextEn: 'Consult Before Choosing',
  heroSecondaryCtaLink: {
    type: 'external',
    external: 'https://line.me/R/ti/p/@drema.emporium',
    href: '#',
    openInNewTab: true,
  },
  featuredLabelTh: 'Highlight Promotion',
  featuredLabelEn: 'Featured Promotion',
  allPromotionsHeadingTh: 'โปรโมชันแนะนำจากคลินิก',
  allPromotionsHeadingEn: 'Recommended Promotions',
  allPromotionsDescriptionTh:
    'เลือกดูโปรแกรมที่กำลังเปิดอยู่พร้อมรายละเอียดเบื้องต้น ราคาโปรโมชัน และเงื่อนไขสำคัญ เพื่อช่วยให้เปรียบเทียบได้ง่ายขึ้นก่อนนัดประเมินกับแพทย์',
  allPromotionsDescriptionEn:
    'Explore current clinic offers with key details, promotional pricing, and essential conditions so you can compare options more clearly before your consultation.',
  trustHeadingTh: 'เหตุผลที่ควรเริ่มจากการประเมินอย่างเหมาะสม',
  trustHeadingEn: 'Why professional assessment should come first',
  trustPoints: [
    {
      _key: 'fallback-trust-1',
      titleTh: 'ประเมินโดยแพทย์ก่อนเลือกโปรแกรม',
      titleEn: 'Doctor-led assessment first',
      descriptionTh:
        'ทุกโปรโมชันควรเริ่มจากการประเมินปัญหาผิวหรือรูปหน้า เพื่อช่วยให้เลือกแนวทางที่เหมาะกับคุณจริง',
      descriptionEn:
        'Every promotion should start with a proper assessment so the selected approach truly fits your skin or facial concerns.',
    },
    {
      _key: 'fallback-trust-2',
      titleTh: 'ออกแบบตามเป้าหมายและงบประมาณ',
      titleEn: 'Planned around goals and budget',
      descriptionTh:
        'ช่วยจัดลำดับการดูแลให้เหมาะกับเป้าหมาย ระยะเวลา และงบประมาณ โดยไม่จำเป็นต้องทำเกินความจำเป็น',
      descriptionEn:
        'Programs can be prioritized around your goals, timeline, and budget without pushing unnecessary treatment.',
    },
    {
      _key: 'fallback-trust-3',
      titleTh: 'เน้นผลลัพธ์ที่ดูเป็นธรรมชาติ',
      titleEn: 'Focused on natural-looking results',
      descriptionTh:
        'แนวทางการรักษาควรให้ผลลัพธ์ที่สมดุล ปลอดภัย และเหมาะกับลักษณะเฉพาะของแต่ละบุคคล',
      descriptionEn:
        'The goal is balanced, safe, and natural-looking outcomes suited to each individual.',
    },
  ],
  faqHeadingTh: 'คำถามที่พบบ่อยเกี่ยวกับโปรโมชัน',
  faqHeadingEn: 'Frequently Asked Questions',
  faqItems: [
    {
      _key: 'fallback-faq-1',
      questionTh: 'โปรโมชันสามารถใช้ได้ทันทีเลยหรือไม่',
      questionEn: 'Can I use a promotion immediately?',
      answerTh:
        'โดยทั่วไปควรให้แพทย์หรือทีมคลินิกประเมินก่อน เพื่อดูว่าปัญหาผิว สภาพผิว และข้อจำกัดของคุณเหมาะกับโปรแกรมนั้นหรือไม่',
      answerEn:
        'In most cases, you should be assessed first to confirm that the program is appropriate for your concerns, skin condition, and any treatment limitations.',
    },
    {
      _key: 'fallback-faq-2',
      questionTh: 'โปรโมชันมีช่วงเวลาจำกัดหรือไม่',
      questionEn: 'Do promotions have limited validity periods?',
      answerTh:
        'แต่ละโปรโมชันอาจมีช่วงเวลาและเงื่อนไขต่างกัน ควรตรวจสอบรายละเอียดในรายการโปรโมชันหรือสอบถามทีมคลินิกก่อนนัดหมาย',
      answerEn:
        'Each promotion may have its own validity period and terms. Please review the listed details or confirm with the clinic before booking.',
    },
  ],
  ctaHeadingTh: 'หากยังไม่แน่ใจว่าโปรแกรมไหนเหมาะกับคุณ',
  ctaHeadingEn: 'If you are not sure which promotion fits you best',
  ctaTextTh:
    'สามารถส่งรูปหรือแจ้งปัญหาที่กังวลเข้ามาเพื่อให้ทีมช่วยแนะนำแนวทางเบื้องต้น และนัดหมายเพื่อประเมินกับแพทย์ได้อย่างเหมาะสม',
  ctaTextEn:
    'You can share your concerns or photos with the clinic first so the team can suggest a suitable starting direction before your consultation.',
  ctaPrimaryTextTh: 'แอด LINE เพื่อปรึกษา',
  ctaPrimaryTextEn: 'Add LINE for Consultation',
  ctaPrimaryLink: {
    type: 'external',
    external: 'https://line.me/R/ti/p/@drema.emporium',
    href: '#',
    openInNewTab: true,
  },
  ctaSecondaryTextTh: 'ดูโปรโมชันทั้งหมด',
  ctaSecondaryTextEn: 'View All Promotions',
  ctaSecondaryLink: {
    type: 'external',
    external: '/promotions',
    href: '#',
    openInNewTab: false,
  },
  citationSummaryTh:
    'หน้าโปรโมชันนี้รวบรวมรายการส่งเสริมการขายที่กำลังเปิดอยู่ของคลินิก พร้อมข้อมูลสรุป ราคาโปรโมชัน เงื่อนไขเบื้องต้น และคำแนะนำให้ประเมินกับแพทย์ก่อนเลือกโปรแกรมที่เหมาะสม',
  citationSummaryEn:
    'This promotions page presents the clinic’s currently active offers with summaries, promotional pricing, key conditions, and guidance to consult a doctor before selecting the most suitable program.',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  const { data } = await sanityFetch({ query: promotionsPageQuery });
  const result = data as PromotionsQueryData;

  if (!result?.page?.seo) return {};

  return formatMetaData(
    result.page.seo as never,
    result.page.name || 'Promotions',
    { locale, pathname: '/promotions' }
  );
}

export default async function PromotionsPage({ params }: Props) {
  const locale = await getRouteLocale(params);
  const { data } = await sanityFetch({ query: promotionsPageQuery });
  const result = data as PromotionsQueryData;

  return (
    <PromotionsPageContent
      page={(result?.page || fallbackPromotionsPage) as never}
      promotions={(result?.promotions || []) as never}
      locale={locale}
      socialLinks={(result?.settings?.socialLinks || []) as never}
      globalCta={result?.settings as never}
    />
  );
}
