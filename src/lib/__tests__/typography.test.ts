import { describe, expect, it } from 'vitest';
import {
  DREMA_LOCALE_HEADER,
  localeScopeAttributes,
  resolveHtmlLang,
} from '../typography';

describe('resolveHtmlLang', () => {
  it('maps en to en', () => {
    expect(resolveHtmlLang('en')).toBe('en');
  });

  it('maps th to th', () => {
    expect(resolveHtmlLang('th')).toBe('th');
  });

  it('falls back to th for missing or unknown locales', () => {
    expect(resolveHtmlLang(null)).toBe('th');
    expect(resolveHtmlLang(undefined)).toBe('th');
    expect(resolveHtmlLang('fr')).toBe('th');
  });
});

describe('localeScopeAttributes', () => {
  it('emits data-locale and lang for EN', () => {
    expect(localeScopeAttributes('en')).toEqual({ 'data-locale': 'en', lang: 'en' });
  });

  it('emits data-locale and lang for TH', () => {
    expect(localeScopeAttributes('th')).toEqual({ 'data-locale': 'th', lang: 'th' });
  });
});

describe('DREMA_LOCALE_HEADER', () => {
  it('is a stable request header name', () => {
    expect(DREMA_LOCALE_HEADER).toBe('x-drema-locale');
  });
});
