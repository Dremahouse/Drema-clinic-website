import Link from 'next/link';
import { buildLocalizedPath } from '@/lib/locale';
import { cn } from '@/lib/utils';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export const breadcrumbLabels = {
  home: { th: 'หน้าแรก', en: 'Home' },
  about: { th: 'เกี่ยวกับเรา', en: 'About Us' },
  services: { th: 'บริการของเรา', en: 'Services' },
  reviews: { th: 'รีวิว', en: 'Reviews' },
  blog: { th: 'บทความ', en: 'Blog' },
  pricing: { th: 'อัตราค่าบริการ', en: 'Pricing' },
  promotions: { th: 'โปรโมชั่น', en: 'Promotions' },
  contact: { th: 'ติดต่อเรา', en: 'Contact Us' },
  aestheticTreatments: {
    th: 'หัตถการความงาม',
    en: 'Aesthetic Treatments',
  },
  faq: { th: 'คำถามที่พบบ่อย', en: 'FAQ' },
  privacyPolicy: { th: 'นโยบายความเป็นส่วนตัว', en: 'Privacy Policy' },
  terms: { th: 'เงื่อนไขการใช้บริการ', en: 'Terms of Service' },
  cookies: { th: 'นโยบายคุกกี้', en: 'Cookie Policy' },
  medicalDisclaimer: {
    th: 'ข้อสงวนสิทธิ์ทางการแพทย์',
    en: 'Medical Disclaimer',
  },
  author: { th: 'แพทย์และผู้เขียน', en: 'Authors' },
  category: { th: 'หมวดบทความ', en: 'Category' },
} as const;

export const getBreadcrumbLabel = (
  locale: 'th' | 'en',
  key: keyof typeof breadcrumbLabels
) => breadcrumbLabels[key][locale];

export const localizeBreadcrumbHref = (href: string, locale: 'th' | 'en') => {
  if (!href || href === '#') return '#';
  if (
    href.startsWith('http') ||
    href.startsWith('/th') ||
    href.startsWith('/en')
  ) {
    return href;
  }
  return buildLocalizedPath(locale, href);
};

export const homeBreadcrumb = (locale: 'th' | 'en'): BreadcrumbItem => ({
  label: getBreadcrumbLabel(locale, 'home'),
  href: buildLocalizedPath(locale),
});

export function Breadcrumbs({
  items,
  locale,
  className,
}: {
  items: BreadcrumbItem[];
  locale: 'th' | 'en';
  className?: string;
}) {
  const visibleItems = items.filter((item) => item.label);

  if (visibleItems.length <= 1) return null;

  return (
    <nav
      aria-label={locale === 'en' ? 'Breadcrumb' : 'เส้นทางหน้าเว็บ'}
      className={cn(
        'flex flex-wrap items-center gap-2 text-xs font-medium text-[var(--marketing-muted)]',
        className
      )}
    >
      {visibleItems.map((item, index) => {
        const isLast = index === visibleItems.length - 1;

        return (
          <span
            key={`${item.label}-${index}`}
            className="inline-flex items-center gap-2"
          >
            {index > 0 ? (
              <span
                aria-hidden="true"
                className="text-[color-mix(in_oklab,var(--marketing-muted)_55%,transparent)]"
              >
                /
              </span>
            ) : null}
            {item.href && !isLast ? (
              <Link
                href={localizeBreadcrumbHref(item.href, locale)}
                className="transition-colors hover:text-[var(--marketing-brand)]"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current={isLast ? 'page' : undefined}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
