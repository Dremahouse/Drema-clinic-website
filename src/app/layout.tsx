/**
 * Do not import Sanity or front-end specific code into this
 * file, it will not be tree shaken effectively across routes
 */

import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Noto_Sans_Thai } from 'next/font/google';
import { DREMA_LOCALE_HEADER, resolveHtmlLang } from '@/lib/typography';

// TEMPORARY PRE-LAUNCH PROTECTION — REMOVE AT LAUNCH.
// Keeps the site crawlable (robots.txt Allow: /) but instructs
// search engines not to index until the official launch.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

const notoSansThai = Noto_Sans_Thai({
  variable: '--font-noto-sans-thai',
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerLocale = (await headers()).get(DREMA_LOCALE_HEADER);
  const htmlLang = resolveHtmlLang(headerLocale);

  return (
    <html
      lang={htmlLang}
      data-locale={htmlLang}
      className={notoSansThai.variable}
    >
      {children}
    </html>
  );
}
