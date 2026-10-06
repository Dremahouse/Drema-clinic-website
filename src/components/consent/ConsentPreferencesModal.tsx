'use client';

import { usePathname } from 'next/navigation';
import { useConsentManager } from './ConsentProvider';

const TH = {
  settings:
    '\u0e15\u0e31\u0e49\u0e07\u0e04\u0e48\u0e32\u0e04\u0e38\u0e01\u0e01\u0e35\u0e49',
  title:
    '\u0e42\u0e04\u0e23\u0e07\u0e2a\u0e23\u0e49\u0e32\u0e07\u0e01\u0e32\u0e23\u0e15\u0e31\u0e49\u0e07\u0e04\u0e48\u0e32\u0e04\u0e27\u0e32\u0e21\u0e22\u0e34\u0e19\u0e22\u0e2d\u0e21',
  description:
    '\u0e42\u0e21\u0e14\u0e31\u0e25\u0e19\u0e35\u0e49\u0e40\u0e15\u0e23\u0e35\u0e22\u0e21\u0e44\u0e27\u0e49\u0e40\u0e1b\u0e47\u0e19\u0e08\u0e38\u0e14\u0e01\u0e25\u0e32\u0e07\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e40\u0e0a\u0e37\u0e48\u0e2d\u0e21 GTM, Google Consent Mode v2, Meta Pixel \u0e41\u0e25\u0e30 TikTok Pixel \u0e43\u0e19\u0e20\u0e32\u0e22\u0e2b\u0e25\u0e31\u0e07 \u0e42\u0e14\u0e22\u0e04\u0e38\u0e01\u0e01\u0e35\u0e49\u0e17\u0e35\u0e48\u0e08\u0e33\u0e40\u0e1b\u0e47\u0e19\u0e08\u0e30\u0e40\u0e1b\u0e34\u0e14\u0e15\u0e25\u0e2d\u0e14',
  close: '\u0e1b\u0e34\u0e14',
  necessaryTitle:
    '\u0e04\u0e38\u0e01\u0e01\u0e35\u0e49\u0e17\u0e35\u0e48\u0e08\u0e33\u0e40\u0e1b\u0e47\u0e19',
  necessaryDescription:
    '\u0e08\u0e33\u0e40\u0e1b\u0e47\u0e19\u0e15\u0e48\u0e2d\u0e01\u0e32\u0e23\u0e17\u0e33\u0e07\u0e32\u0e19\u0e02\u0e2d\u0e07\u0e40\u0e27\u0e47\u0e1a\u0e44\u0e0b\u0e15\u0e4c \u0e40\u0e0a\u0e48\u0e19 \u0e01\u0e32\u0e23\u0e08\u0e14\u0e08\u0e33\u0e20\u0e32\u0e29\u0e32\u0e41\u0e25\u0e30\u0e1e\u0e24\u0e15\u0e34\u0e01\u0e23\u0e23\u0e21\u0e1e\u0e37\u0e49\u0e19\u0e10\u0e32\u0e19\u0e02\u0e2d\u0e07\u0e23\u0e30\u0e1a\u0e1a',
  functionalityTitle:
    '\u0e04\u0e38\u0e01\u0e01\u0e35\u0e49\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e1f\u0e35\u0e40\u0e08\u0e2d\u0e23\u0e4c\u0e40\u0e2a\u0e23\u0e34\u0e21',
  functionalityDescription:
    '\u0e43\u0e0a\u0e49\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e40\u0e19\u0e37\u0e49\u0e2d\u0e2b\u0e32\u0e20\u0e32\u0e22\u0e19\u0e2d\u0e01\u0e17\u0e35\u0e48\u0e1d\u0e31\u0e07\u0e43\u0e19\u0e40\u0e27\u0e47\u0e1a \u0e40\u0e0a\u0e48\u0e19\u0e41\u0e1c\u0e19\u0e17\u0e35\u0e48 Google Map \u0e2b\u0e23\u0e37\u0e2d widget \u0e17\u0e35\u0e48\u0e15\u0e49\u0e2d\u0e07\u0e42\u0e2b\u0e25\u0e14\u0e08\u0e32\u0e01 third party',
  analyticsTitle:
    '\u0e04\u0e38\u0e01\u0e01\u0e35\u0e49\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e01\u0e32\u0e23\u0e27\u0e34\u0e40\u0e04\u0e23\u0e32\u0e30\u0e2b\u0e4c',
  analyticsDescription:
    '\u0e43\u0e0a\u0e49\u0e40\u0e1b\u0e47\u0e19\u0e08\u0e38\u0e14\u0e40\u0e0a\u0e37\u0e48\u0e2d\u0e21\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a GA4 \u0e41\u0e25\u0e30\u0e40\u0e04\u0e23\u0e37\u0e48\u0e2d\u0e07\u0e21\u0e37\u0e2d\u0e27\u0e31\u0e14\u0e1c\u0e25 \u0e0b\u0e36\u0e48\u0e07\u0e15\u0e2d\u0e19\u0e19\u0e35\u0e49\u0e22\u0e31\u0e07\u0e40\u0e1b\u0e47\u0e19\u0e42\u0e04\u0e23\u0e07\u0e2a\u0e23\u0e49\u0e32\u0e07\u0e40\u0e23\u0e34\u0e48\u0e21\u0e15\u0e49\u0e19\u0e41\u0e25\u0e30\u0e22\u0e31\u0e07\u0e44\u0e21\u0e48\u0e1c\u0e39\u0e01 tracking \u0e08\u0e23\u0e34\u0e07',
  advertisingTitle:
    '\u0e04\u0e38\u0e01\u0e01\u0e35\u0e49\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e42\u0e06\u0e29\u0e13\u0e32',
  advertisingDescription:
    '\u0e43\u0e0a\u0e49\u0e40\u0e1b\u0e47\u0e19\u0e08\u0e38\u0e14\u0e40\u0e0a\u0e37\u0e48\u0e2d\u0e21\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a Google Ads, Meta Pixel \u0e41\u0e25\u0e30 TikTok Pixel \u0e40\u0e21\u0e37\u0e48\u0e2d\u0e1e\u0e23\u0e49\u0e2d\u0e21\u0e15\u0e34\u0e14\u0e15\u0e31\u0e49\u0e07\u0e08\u0e23\u0e34\u0e07',
  reject:
    '\u0e1b\u0e0f\u0e34\u0e40\u0e2a\u0e18\u0e04\u0e38\u0e01\u0e01\u0e35\u0e49\u0e17\u0e35\u0e48\u0e44\u0e21\u0e48\u0e08\u0e33\u0e40\u0e1b\u0e47\u0e19',
  save: '\u0e1a\u0e31\u0e19\u0e17\u0e36\u0e01\u0e01\u0e32\u0e23\u0e15\u0e31\u0e49\u0e07\u0e04\u0e48\u0e32',
  acceptAll:
    '\u0e22\u0e2d\u0e21\u0e23\u0e31\u0e1a\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14',
} as const;

function ToggleRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <div className="rounded-[1.25rem] border border-[#e2d4c1] bg-[#fcf8f2] p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-[#43392e]">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-[#6d665b]">{description}</p>
        </div>
        <label className="mt-1 inline-flex cursor-pointer items-center gap-3 text-sm font-medium text-[#5b5043]">
          <input
            type="checkbox"
            className="h-4 w-4 accent-[#7f5f4a]"
            checked={checked}
            disabled={disabled}
            onChange={(event) => onChange?.(event.target.checked)}
          />
          <span>{checked ? 'On' : 'Off'}</span>
        </label>
      </div>
    </div>
  );
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: scaffold keeps the initial modal copy and controls in one place.
export default function ConsentPreferencesModal() {
  const pathname = usePathname() || '/';
  const locale: 'th' | 'en' = pathname.startsWith('/en') ? 'en' : 'th';
  const isEn = locale === 'en';
  const {
    isModalOpen,
    draftPreferences,
    closePreferences,
    savePreferences,
    setDraftPreference,
    rejectNonEssential,
    acceptAll,
  } = useConsentManager();

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(44,39,32,0.56)] px-4 py-8">
      <button
        type="button"
        aria-label={isEn ? 'Close cookie settings' : TH.close}
        className="absolute inset-0"
        onClick={closePreferences}
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-preferences-title"
        className="relative z-[101] flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] border border-[#d8c7ae] bg-[#f7f2ea] shadow-[0_24px_80px_-28px_rgba(39,33,26,0.55)]"
      >
        <header className="border-b border-[#e3d7c7] px-6 py-5 md:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8d6f50]">
                {isEn ? 'Cookie Settings' : TH.settings}
              </p>
              <h2
                id="cookie-preferences-title"
                className="mt-2 text-2xl font-semibold text-[#43392e] md:text-3xl"
              >
                {isEn ? 'Consent preferences skeleton' : TH.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6d665b]">
                {isEn
                  ? 'This modal is ready to become the integration point for GTM, Google Consent Mode v2, Meta Pixel, and TikTok Pixel. Necessary cookies stay enabled.'
                  : TH.description}
              </p>
            </div>
            <button
              type="button"
              className="rounded-full border border-[#d6c7b4] px-4 py-2 text-sm font-semibold text-[#5e5345]"
              onClick={closePreferences}
            >
              {isEn ? 'Close' : TH.close}
            </button>
          </div>
        </header>

        <div className="space-y-4 overflow-y-auto px-6 py-5 md:px-8 md:py-6">
          <ToggleRow
            title={isEn ? 'Necessary' : TH.necessaryTitle}
            description={
              isEn
                ? 'Required for the website to work, including language preference and basic site behavior.'
                : TH.necessaryDescription
            }
            checked
            disabled
          />
          <ToggleRow
            title={isEn ? 'Functionality' : TH.functionalityTitle}
            description={
              isEn
                ? 'Used for embedded external features such as Google Maps or other third-party widgets that are optional for the core site.'
                : TH.functionalityDescription
            }
            checked={draftPreferences.functionality}
            onChange={(checked) => setDraftPreference('functionality', checked)}
          />
          <ToggleRow
            title={isEn ? 'Analytics' : TH.analyticsTitle}
            description={
              isEn
                ? 'Placeholder for GA4 and measurement tools. Keep disabled until the production tracking plan is finalized.'
                : TH.analyticsDescription
            }
            checked={draftPreferences.analytics}
            onChange={(checked) => setDraftPreference('analytics', checked)}
          />
          <ToggleRow
            title={isEn ? 'Advertising' : TH.advertisingTitle}
            description={
              isEn
                ? 'Placeholder for Google Ads, Meta Pixel, and TikTok Pixel consent-dependent tags.'
                : TH.advertisingDescription
            }
            checked={draftPreferences.advertising}
            onChange={(checked) => setDraftPreference('advertising', checked)}
          />
        </div>

        <footer className="border-t border-[#e3d7c7] px-6 py-5 md:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:justify-end">
            <button
              type="button"
              className="rounded-full border border-[#cfbea5] px-5 py-3 text-sm font-semibold text-[#5e5345]"
              onClick={rejectNonEssential}
            >
              {isEn ? 'Reject non-essential' : TH.reject}
            </button>
            <button
              type="button"
              className="rounded-full border border-[#d6c5af] bg-white px-5 py-3 text-sm font-semibold text-[#5e5345]"
              onClick={savePreferences}
            >
              {isEn ? 'Save preferences' : TH.save}
            </button>
            <button
              type="button"
              className="rounded-full border border-[#8f745d] bg-[#7f5f4a] px-5 py-3 text-sm font-semibold text-[#f8f2ea]"
              onClick={acceptAll}
            >
              {isEn ? 'Accept all' : TH.acceptAll}
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}
