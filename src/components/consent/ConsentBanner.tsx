'use client';

import { usePathname } from 'next/navigation';
import { useConsentManager } from './ConsentProvider';

const TH = {
  heading:
    '\u0e01\u0e32\u0e23\u0e15\u0e31\u0e49\u0e07\u0e04\u0e48\u0e32\u0e04\u0e27\u0e32\u0e21\u0e40\u0e1b\u0e47\u0e19\u0e2a\u0e48\u0e27\u0e19\u0e15\u0e31\u0e27',
  title:
    '\u0e23\u0e30\u0e1a\u0e1a\u0e04\u0e38\u0e01\u0e01\u0e35\u0e49\u0e41\u0e1a\u0e1a\u0e42\u0e04\u0e23\u0e07\u0e2a\u0e23\u0e49\u0e32\u0e07\u0e1e\u0e23\u0e49\u0e2d\u0e21\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e40\u0e0a\u0e37\u0e48\u0e2d\u0e21\u0e02\u0e2d\u0e07\u0e08\u0e23\u0e34\u0e07\u0e41\u0e25\u0e49\u0e27',
  description:
    '\u0e41\u0e1a\u0e19\u0e40\u0e19\u0e2d\u0e23\u0e4c\u0e15\u0e31\u0e27\u0e19\u0e35\u0e49\u0e40\u0e1b\u0e47\u0e19\u0e42\u0e04\u0e23\u0e07\u0e2a\u0e23\u0e49\u0e32\u0e07\u0e40\u0e23\u0e34\u0e48\u0e21\u0e15\u0e49\u0e19\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e40\u0e01\u0e47\u0e1a\u0e01\u0e32\u0e23\u0e22\u0e34\u0e19\u0e22\u0e2d\u0e21\u0e2b\u0e21\u0e27\u0e14\u0e04\u0e38\u0e01\u0e01\u0e35\u0e49\u0e17\u0e35\u0e48\u0e08\u0e33\u0e40\u0e1b\u0e47\u0e19 \u0e1f\u0e35\u0e40\u0e08\u0e2d\u0e23\u0e4c\u0e40\u0e2a\u0e23\u0e34\u0e21 \u0e01\u0e32\u0e23\u0e27\u0e34\u0e40\u0e04\u0e23\u0e32\u0e30\u0e2b\u0e4c \u0e41\u0e25\u0e30\u0e42\u0e06\u0e29\u0e13\u0e32 \u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e40\u0e0a\u0e37\u0e48\u0e2d\u0e21 Google, Meta \u0e41\u0e25\u0e30 TikTok \u0e43\u0e19\u0e20\u0e32\u0e22\u0e2b\u0e25\u0e31\u0e07',
  acceptAll:
    '\u0e22\u0e2d\u0e21\u0e23\u0e31\u0e1a\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14',
  reject:
    '\u0e1b\u0e0f\u0e34\u0e40\u0e2a\u0e18\u0e04\u0e38\u0e01\u0e01\u0e35\u0e49\u0e17\u0e35\u0e48\u0e44\u0e21\u0e48\u0e08\u0e33\u0e40\u0e1b\u0e47\u0e19',
  manage:
    '\u0e15\u0e31\u0e49\u0e07\u0e04\u0e48\u0e32\u0e04\u0e38\u0e01\u0e01\u0e35\u0e49',
} as const;

export default function ConsentBanner() {
  const pathname = usePathname() || '/';
  const locale: 'th' | 'en' = pathname.startsWith('/en') ? 'en' : 'th';
  const isEn = locale === 'en';
  const { hasInteracted, acceptAll, rejectNonEssential, openPreferences } =
    useConsentManager();

  if (hasInteracted) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] px-4 pb-4 pt-6">
      <div className="mx-auto max-w-5xl rounded-[1.75rem] border border-[#d7c5ad] bg-[rgba(252,248,242,0.97)] p-5 text-[#4d4738] shadow-[0_20px_60px_-30px_rgba(77,71,56,0.55)] backdrop-blur md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8d6f50]">
              {isEn ? 'Privacy Preferences' : TH.heading}
            </p>
            <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
              {isEn
                ? 'Cookie consent skeleton is ready for real integrations.'
                : TH.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#6b6458] md:text-base">
              {isEn
                ? 'This placeholder banner stores consent choices for necessary, functionality, analytics, and advertising categories. Google, Meta, and TikTok integrations can be connected to this state later.'
                : TH.description}
            </p>
          </div>

          <div className="flex flex-col gap-2 md:min-w-[280px]">
            <button
              type="button"
              className="rounded-full border border-[#8f745d] bg-[#7f5f4a] px-5 py-3 text-sm font-semibold text-[#f8f2ea]"
              onClick={acceptAll}
            >
              {isEn ? 'Accept all' : TH.acceptAll}
            </button>
            <button
              type="button"
              className="rounded-full border border-[#c9b79f] bg-transparent px-5 py-3 text-sm font-semibold text-[#5e5345]"
              onClick={rejectNonEssential}
            >
              {isEn ? 'Reject non-essential' : TH.reject}
            </button>
            <button
              type="button"
              className="rounded-full border border-transparent px-5 py-2 text-sm font-semibold text-[#7f5f4a] underline-offset-4 hover:underline"
              onClick={openPreferences}
            >
              {isEn ? 'Manage preferences' : TH.manage}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
