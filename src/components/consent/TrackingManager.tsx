'use client';

import { useEffect } from 'react';
import { clientEnv } from '@/env/clientEnv';
import type { ConsentPreferences } from './types';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown> | unknown[]>;
    gtag?: (...args: unknown[]) => void;
  }
}

function ensureGoogleTagApi() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
}

function toConsentState(enabled: boolean) {
  return enabled ? 'granted' : 'denied';
}

export default function TrackingManager({
  preferences,
  hasInteracted,
}: {
  preferences: ConsentPreferences;
  hasInteracted: boolean;
}) {
  useEffect(() => {
    document.documentElement.dataset.consentAnalytics = String(
      preferences.analytics
    );
    document.documentElement.dataset.consentFunctionality = String(
      preferences.functionality
    );
    document.documentElement.dataset.consentAdvertising = String(
      preferences.advertising
    );
    document.documentElement.dataset.consentReady = String(hasInteracted);
  }, [
    hasInteracted,
    preferences.advertising,
    preferences.analytics,
    preferences.functionality,
  ]);

  useEffect(() => {
    const hasGoogleConfig =
      clientEnv.NEXT_PUBLIC_GTM_ID || clientEnv.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    if (!hasGoogleConfig || typeof window === 'undefined') {
      return;
    }

    ensureGoogleTagApi();

    const consentPayload = {
      functionality_storage: toConsentState(preferences.functionality),
      analytics_storage: toConsentState(preferences.analytics),
      ad_storage: toConsentState(preferences.advertising),
      ad_user_data: toConsentState(preferences.advertising),
      ad_personalization: toConsentState(preferences.advertising),
      wait_for_update: 500,
    };

    if (!hasInteracted) {
      window.gtag?.('consent', 'default', consentPayload);
      return;
    }

    window.gtag?.('consent', 'update', consentPayload);
    window.dataLayer?.push({
      event: 'consent_preferences_updated',
      consent_preferences: {
        ...preferences,
      },
    });
  }, [hasInteracted, preferences]);

  return null;
}
