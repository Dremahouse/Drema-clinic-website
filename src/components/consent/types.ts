export type ConsentPreferences = {
  necessary: true;
  functionality: boolean;
  analytics: boolean;
  advertising: boolean;
};

export const CONSENT_COOKIE_KEY = 'site_consent_v1';
export const CONSENT_STORAGE_KEY = 'site_consent_v1';
export const CONSENT_VERSION = 1;

export const defaultConsentPreferences: ConsentPreferences = {
  necessary: true,
  functionality: false,
  analytics: false,
  advertising: false,
};

export type StoredConsentPayload = {
  version: number;
  updatedAt: string;
  preferences: ConsentPreferences;
};
