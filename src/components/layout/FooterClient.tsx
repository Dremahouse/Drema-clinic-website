'use client';

import { Clock3, MapPin, MapPinned, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { getBaseURL } from '@/lib/links';
import { buildLocalizedPath } from '@/lib/locale';
import { urlForImage } from '@/lib/sanity/client/utils';
import CookieSettingsButton from '../consent/CookieSettingsButton';
import Logo from '../icons/Logo';

type FooterLogo = {
  logo?: {
    alt?: string | null;
    asset?: {
      _ref?: string | null;
      _id?: string | null;
    } | null;
  } | null;
};

type Branch = {
  nameTh: string;
  nameEn: string;
  addressTh: string;
  addressEn: string;
  hoursTh: string;
  hoursEn: string;
  phone: string;
  mapLabelTh: string;
  mapLabelEn: string;
  mapUrl: string;
};

type FooterSettings = {
  title?: string | null;
  description?: string | null;
  logo?: FooterLogo['logo'];
  ogImage?: {
    alt?: string | null;
    asset?: {
      _ref?: string | null;
      _id?: string | null;
    } | null;
  } | null;
  footerLocationsHeadingTh?: string | null;
  footerLocationsHeadingEn?: string | null;
  footerLocations?: Array<{
    _key?: string;
    nameTh?: string | null;
    nameEn?: string | null;
    addressTh?: string | null;
    addressEn?: string | null;
    hoursTh?: string | null;
    hoursEn?: string | null;
    phone?: string | null;
    mapLabelTh?: string | null;
    mapLabelEn?: string | null;
    mapUrl?: string | null;
  }> | null;
  socialLinks?: Array<{
    url?: string | null;
  }> | null;
} | null;

function normalizeBranch(
  item: FooterSettings extends infer T ? T : never
): Branch[] {
  const settings = item as FooterSettings;
  const rows = (settings?.footerLocations || [])
    .map((row) => ({
      nameTh: row?.nameTh?.trim() || '',
      nameEn: row?.nameEn?.trim() || '',
      addressTh: row?.addressTh?.trim() || '',
      addressEn: row?.addressEn?.trim() || '',
      hoursTh: row?.hoursTh?.trim() || '',
      hoursEn: row?.hoursEn?.trim() || '',
      phone: row?.phone?.trim() || '',
      mapLabelTh: row?.mapLabelTh?.trim() || 'Google Maps',
      mapLabelEn: row?.mapLabelEn?.trim() || 'Google Maps',
      mapUrl: row?.mapUrl?.trim() || '#',
    }))
    .filter(
      (row) =>
        row.nameTh &&
        row.nameEn &&
        row.addressTh &&
        row.addressEn &&
        row.hoursTh &&
        row.hoursEn &&
        row.phone &&
        row.mapUrl
    );

  if (rows.length > 0) return rows;

  return [
    {
      nameTh: 'สาขา Town in Town',
      nameEn: 'Town in Town Branch',
      addressTh: 'Tree Square, ลาดพร้าว 94',
      addressEn: 'Tree Square, Ladprao 94',
      hoursTh: 'เปิดทุกวัน 10:00-20:00',
      hoursEn: 'Open daily 10:00-20:00',
      phone: '080-992-6964',
      mapLabelTh: 'Google Maps',
      mapLabelEn: 'Google Maps',
      mapUrl: 'http://goo.gl/maps/dDZBqDUqmQAawrRt7',
    },
    {
      nameTh: 'สาขา พร้อมพงษ์',
      nameEn: 'Phrom Phong Branch',
      addressTh: 'สุขุมวิท 24',
      addressEn: 'Sukhumvit 24',
      hoursTh: 'เปิดทุกวัน 11:00-20:00',
      hoursEn: 'Open daily 11:00-20:00',
      phone: '065-992-4162',
      mapLabelTh: 'Google Maps',
      mapLabelEn: 'Google Maps',
      mapUrl: 'https://maps.app.goo.gl/EHMQnFXv2fwvTGAM6',
    },
  ];
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Footer copy, navigation, branches, and JSON-LD stay colocated so the footer is easy to update from one settings object.
export default function FooterClient({
  settings,
}: {
  settings: FooterSettings;
}) {
  const pathname = usePathname() || '/';
  const locale: 'th' | 'en' = pathname.startsWith('/en') ? 'en' : 'th';
  const isEn = locale === 'en';
  const localizedPath = (pathname: string) =>
    buildLocalizedPath(locale, pathname);

  if (!settings) return null;

  const businessName = settings.title || 'Drema Clinic';
  const businessDescription =
    settings.description ||
    (isEn
      ? 'Aesthetic & Laser Clinic in Bangkok'
      : 'คลินิกความงามและเลเซอร์ในกรุงเทพฯ');

  const brandLine1 = isEn
    ? 'Aesthetic & laser clinic focused on natural, safe results.'
    : 'คลินิกความงามและเลเซอร์ ที่เน้นผลลัพธ์ดูเป็นธรรมชาติและปลอดภัย';
  const brandLine2 = isEn
    ? 'Personalized treatment plans by specialist doctors.'
    : 'วางแผนการรักษาเฉพาะบุคคล โดยแพทย์ผู้มีประสบการณ์';

  const branches = normalizeBranch(settings);
  const businessImage = urlForImage(settings.ogImage)
    ?.width(1200)
    .height(627)
    .url();
  const sameAs = (settings.socialLinks || [])
    .map((link) => link?.url?.trim())
    .filter((url): url is string => Boolean(url?.startsWith('http')));

  const t = {
    info: isEn ? 'Clinic Information' : 'ข้อมูลคลินิก',
    quickLinks: isEn ? 'Quick Links' : 'ลิงก์ด่วน',
    home: isEn ? 'Home' : 'หน้าแรก',
    about: isEn ? 'About Us' : 'เกี่ยวกับเรา',
    services: isEn ? 'Services' : 'บริการ',
    pricing: isEn ? 'Pricing' : 'ค่าบริการ',
    promotions: isEn ? 'Promotions' : 'โปรโมชัน',
    reviews: isEn ? 'Reviews' : 'รีวิว',
    blog: isEn ? 'Blog' : 'บทความ',
    contact: isEn ? 'Contact' : 'ติดต่อ',
    branches:
      (isEn
        ? settings.footerLocationsHeadingEn?.trim()
        : settings.footerLocationsHeadingTh?.trim()) ||
      (isEn ? 'Our Locations' : 'สาขาของเรา'),
    legal: isEn ? 'Legal' : 'ข้อกฎหมาย',
    privacy: isEn ? 'Privacy Policy' : 'นโยบายความเป็นส่วนตัว',
    terms: isEn ? 'Terms of Service' : 'เงื่อนไขการให้บริการ',
    cookies: isEn ? 'Cookie Policy' : 'นโยบายคุกกี้',
    disclaimer: isEn ? 'Medical Disclaimer' : 'ข้อจำกัดความรับผิดชอบทางการแพทย์',
    faq: 'FAQ',
    rights: isEn ? 'All rights reserved.' : 'สงวนลิขสิทธิ์',
  } as const;

  const origin = getBaseURL();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': `${origin}/#medical-clinic`,
    name: businessName,
    description: businessDescription,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bangkok',
      addressCountry: 'TH',
    },
    url: `${origin}${buildLocalizedPath(locale)}`,
    ...(businessImage ? { image: businessImage } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    department: branches.map((branch) => ({
      '@type': 'MedicalClinic',
      '@id': `${origin}/#medical-clinic-${branch.nameEn
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')}`,
      name: `${businessName} - ${isEn ? branch.nameEn : branch.nameTh}`,
      telephone: branch.phone,
      hasMap: branch.mapUrl,
      ...(businessImage ? { image: businessImage } : {}),
      address: {
        '@type': 'PostalAddress',
        streetAddress: isEn ? branch.addressEn : branch.addressTh,
        addressLocality: 'Bangkok',
        addressCountry: 'TH',
      },
    })),
  };

  return (
    <footer className="relative bg-gray-100 py-12 text-gray-700 md:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <section aria-label={t.info}>
            <div className="mb-4 flex items-center gap-2">
              <Logo
                image={(settings as FooterLogo).logo}
                alt={settings.title || 'Site logo'}
              />
            </div>
            <p className="text-sm">{brandLine1}</p>
            <p className="mt-2 text-sm">{brandLine2}</p>
          </section>

          <nav aria-label={t.quickLinks}>
            <h3 className="mb-4 text-lg font-semibold">{t.quickLinks}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={localizedPath('/')}
                  className="transition-colors hover:text-gray-900"
                >
                  {t.home}
                </a>
              </li>
              <li>
                <a
                  href={localizedPath('/about')}
                  className="transition-colors hover:text-gray-900"
                >
                  {t.about}
                </a>
              </li>
              <li>
                <a
                  href={localizedPath('/services')}
                  className="transition-colors hover:text-gray-900"
                >
                  {t.services}
                </a>
              </li>
              <li>
                <a
                  href={localizedPath('/pricing')}
                  className="transition-colors hover:text-gray-900"
                >
                  {t.pricing}
                </a>
              </li>
              <li>
                <a
                  href={localizedPath('/promotions')}
                  className="transition-colors hover:text-gray-900"
                >
                  {t.promotions}
                </a>
              </li>
              <li>
                <a
                  href={localizedPath('/reviews')}
                  className="transition-colors hover:text-gray-900"
                >
                  {t.reviews}
                </a>
              </li>
              <li>
                <a
                  href={localizedPath('/blog')}
                  className="transition-colors hover:text-gray-900"
                >
                  {t.blog}
                </a>
              </li>
              <li>
                <a
                  href={localizedPath('/contact')}
                  className="transition-colors hover:text-gray-900"
                >
                  {t.contact}
                </a>
              </li>
            </ul>
          </nav>

          <section aria-label={t.branches}>
            <h3 className="mb-4 text-lg font-semibold">{t.branches}</h3>
            <div className="space-y-6 text-sm">
              {branches.map((branch) => (
                <article key={branch.nameEn} className="py-1">
                  <h4 className="font-semibold text-[#1f1b16]">
                    {isEn ? branch.nameEn : branch.nameTh}
                  </h4>
                  <div className="my-2 h-px w-16 bg-gradient-to-r from-[#b9935a] via-[#ceb07e] to-transparent" />
                  <p className="flex items-start gap-2">
                    <MapPinned
                      size={15}
                      className="mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{isEn ? branch.addressEn : branch.addressTh}</span>
                  </p>
                  <p className="mt-1.5 flex items-center gap-2">
                    <Clock3 size={15} aria-hidden="true" />
                    <span>{isEn ? branch.hoursEn : branch.hoursTh}</span>
                  </p>
                  <p className="mt-1.5 flex items-center gap-2">
                    <Phone size={15} aria-hidden="true" />
                    <a
                      href={`tel:${branch.phone.replace(/[^+\d]/g, '')}`}
                      className="underline transition-colors hover:text-gray-900"
                    >
                      {branch.phone}
                    </a>
                  </p>
                  <p className="mt-1.5 flex items-center gap-2">
                    <MapPin size={15} aria-hidden="true" />
                    <a
                      href={branch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline transition-colors hover:text-gray-900"
                    >
                      {isEn ? branch.mapLabelEn : branch.mapLabelTh}
                    </a>
                  </p>
                </article>
              ))}
            </div>
          </section>

          <nav aria-label={t.legal}>
            <h3 className="mb-4 text-lg font-semibold">{t.legal}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={localizedPath('/privacy-policy')}
                  className="transition-colors hover:text-gray-900"
                >
                  {t.privacy}
                </a>
              </li>
              <li>
                <a
                  href={localizedPath('/terms')}
                  className="transition-colors hover:text-gray-900"
                >
                  {t.terms}
                </a>
              </li>
              <li>
                <a
                  href={localizedPath('/cookies')}
                  className="transition-colors hover:text-gray-900"
                >
                  {t.cookies}
                </a>
              </li>
              <li>
                <a
                  href={localizedPath('/medical-disclaimer')}
                  className="transition-colors hover:text-gray-900"
                >
                  {t.disclaimer}
                </a>
              </li>
              <li>
                <a
                  href={localizedPath('/faq')}
                  className="transition-colors hover:text-gray-900"
                >
                  {t.faq}
                </a>
              </li>
              <li>
                <CookieSettingsButton />
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} {businessName} by{' '}
            <a
              href={origin || 'https://www.dremawellnessth.com'}
              className="underline transition-colors hover:text-gray-900"
            >
              Drema Clinic
            </a>
            . {t.rights}
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-500 to-blue-500" />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is generated from structured settings and serialized with JSON.stringify.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </footer>
  );
}
