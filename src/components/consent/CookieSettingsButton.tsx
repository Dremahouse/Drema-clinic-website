'use client';

import { usePathname } from 'next/navigation';
import { useConsentManager } from './ConsentProvider';

export default function CookieSettingsButton() {
  const pathname = usePathname() || '/';
  const locale: 'th' | 'en' = pathname.startsWith('/en') ? 'en' : 'th';
  const { openPreferences } = useConsentManager();

  return (
    <button
      type="button"
      className="text-left transition-colors hover:text-gray-900"
      onClick={openPreferences}
    >
      {locale === 'en'
        ? 'Cookie Settings'
        : '\u0e15\u0e31\u0e49\u0e07\u0e04\u0e48\u0e32\u0e04\u0e38\u0e01\u0e01\u0e35\u0e49'}
    </button>
  );
}
