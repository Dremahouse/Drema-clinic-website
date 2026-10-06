'use client';

import type { ReactNode } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import ConsentBanner from './ConsentBanner';
import ConsentPreferencesModal from './ConsentPreferencesModal';
import TrackingManager from './TrackingManager';
import {
  CONSENT_COOKIE_KEY,
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  type ConsentPreferences,
  defaultConsentPreferences,
  type StoredConsentPayload,
} from './types';

type ConsentContextValue = {
  preferences: ConsentPreferences;
  draftPreferences: ConsentPreferences;
  hasInteracted: boolean;
  isModalOpen: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  openPreferences: () => void;
  closePreferences: () => void;
  savePreferences: () => void;
  setDraftPreference: (
    key: 'functionality' | 'analytics' | 'advertising',
    value: boolean
  ) => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

function parseStoredConsent(raw: string | null): StoredConsentPayload | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<StoredConsentPayload>;
    if (!parsed || typeof parsed !== 'object' || !parsed.preferences)
      return null;

    return {
      version: Number(parsed.version) || CONSENT_VERSION,
      updatedAt: String(parsed.updatedAt || new Date(0).toISOString()),
      preferences: {
        necessary: true,
        functionality: Boolean(parsed.preferences.functionality),
        analytics: Boolean(parsed.preferences.analytics),
        advertising: Boolean(parsed.preferences.advertising),
      },
    };
  } catch {
    return null;
  }
}

function readCookieValue(name: string) {
  if (typeof document === 'undefined') return null;
  const prefix = `${name}=`;
  const match = document.cookie
    .split(';')
    .map((value) => value.trim())
    .find((value) => value.startsWith(prefix));

  return match ? decodeURIComponent(match.slice(prefix.length)) : null;
}

function persistConsent(preferences: ConsentPreferences) {
  const payload: StoredConsentPayload = {
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
    preferences,
  };

  const serialized = JSON.stringify(payload);

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, serialized);
  } catch {}

  // biome-ignore lint/suspicious/noDocumentCookie: consent state needs a first-party cookie fallback for SSR locale-aware pages.
  document.cookie = `${CONSENT_COOKIE_KEY}=${encodeURIComponent(serialized)}; path=/; max-age=31536000; samesite=lax`;
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<ConsentPreferences>(
    defaultConsentPreferences
  );
  const [draftPreferences, setDraftPreferences] = useState<ConsentPreferences>(
    defaultConsentPreferences
  );
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let stored: StoredConsentPayload | null = null;

    try {
      stored = parseStoredConsent(
        window.localStorage.getItem(CONSENT_STORAGE_KEY)
      );
    } catch {}

    if (!stored) {
      stored = parseStoredConsent(readCookieValue(CONSENT_COOKIE_KEY));
    }

    if (stored) {
      setPreferences(stored.preferences);
      setDraftPreferences(stored.preferences);
      setHasInteracted(true);
    }

    setIsReady(true);
  }, []);

  const applyPreferences = useCallback(
    (nextPreferences: ConsentPreferences) => {
      setPreferences(nextPreferences);
      setDraftPreferences(nextPreferences);
      setHasInteracted(true);
      persistConsent(nextPreferences);
      setIsModalOpen(false);
    },
    []
  );

  const acceptAll = useCallback(() => {
    applyPreferences({
      necessary: true,
      functionality: true,
      analytics: true,
      advertising: true,
    });
  }, [applyPreferences]);

  const rejectNonEssential = useCallback(() => {
    applyPreferences(defaultConsentPreferences);
  }, [applyPreferences]);

  const openPreferences = useCallback(() => {
    setDraftPreferences(preferences);
    setIsModalOpen(true);
  }, [preferences]);

  const closePreferences = useCallback(() => {
    setDraftPreferences(preferences);
    setIsModalOpen(false);
  }, [preferences]);

  const savePreferences = useCallback(() => {
    applyPreferences({
      necessary: true,
      functionality: draftPreferences.functionality,
      analytics: draftPreferences.analytics,
      advertising: draftPreferences.advertising,
    });
  }, [applyPreferences, draftPreferences]);

  const setDraftPreference = useCallback(
    (key: 'functionality' | 'analytics' | 'advertising', value: boolean) => {
      setDraftPreferences((current) => ({ ...current, [key]: value }));
    },
    []
  );

  const value = useMemo(
    () => ({
      preferences,
      draftPreferences,
      hasInteracted,
      isModalOpen,
      acceptAll,
      rejectNonEssential,
      openPreferences,
      closePreferences,
      savePreferences,
      setDraftPreference,
    }),
    [
      preferences,
      draftPreferences,
      hasInteracted,
      isModalOpen,
      acceptAll,
      rejectNonEssential,
      openPreferences,
      closePreferences,
      savePreferences,
      setDraftPreference,
    ]
  );

  return (
    <ConsentContext.Provider value={value}>
      <TrackingManager
        preferences={preferences}
        hasInteracted={hasInteracted}
      />
      {children}
      {isReady ? <ConsentBanner /> : null}
      <ConsentPreferencesModal />
    </ConsentContext.Provider>
  );
}

export function useConsentManager() {
  const context = useContext(ConsentContext);

  if (!context) {
    throw new Error('useConsentManager must be used within ConsentProvider');
  }

  return context;
}
