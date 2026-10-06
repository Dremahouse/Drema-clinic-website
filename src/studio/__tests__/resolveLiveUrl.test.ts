import { describe, expect, it, vi } from 'vitest';

// resolveLiveUrl reads the site URL from clientEnv at module-evaluation time,
// so the env must be stubbed before the module under test is imported.
// The test origin is a NEUTRAL placeholder: the implementation must never
// hardcode (or default to) the production domain.
vi.hoisted(() => {
  process.env.NEXT_PUBLIC_SITE_URL = 'https://ui-preview.example.com';
});

import {
  DEFAULT_VIEW_LIVE_LOCALE,
  resolveLiveUrl,
} from '../lib/resolveLiveUrl';

describe('resolveLiveUrl', () => {
  it('exposes the configured locale as the default live locale', () => {
    expect(DEFAULT_VIEW_LIVE_LOCALE).toBe('th');
  });

  it('uses the configured site URL origin, never a hardcoded production domain', () => {
    expect(resolveLiveUrl('promotionsPage', {})).toBe(
      'https://ui-preview.example.com/th/promotions'
    );
    expect(resolveLiveUrl('homePage', {})).toBe(
      'https://ui-preview.example.com/th'
    );
  });

  it('returns the about page URL for aboutPage', () => {
    expect(resolveLiveUrl('aboutPage', {})).toBe(
      'https://ui-preview.example.com/th/about'
    );
  });

  it('returns the services page URL for aestheticTreatmentsPage', () => {
    expect(resolveLiveUrl('aestheticTreatmentsPage', {})).toBe(
      'https://ui-preview.example.com/th/services'
    );
  });

  it('returns the blog page URL for blogPage', () => {
    expect(resolveLiveUrl('blogPage', {})).toBe(
      'https://ui-preview.example.com/th/blog'
    );
  });

  it('returns the pricing page URL for pricingPage', () => {
    expect(resolveLiveUrl('pricingPage', {})).toBe(
      'https://ui-preview.example.com/th/pricing'
    );
  });

  it('returns the reviews page URL for reviewsPage', () => {
    expect(resolveLiveUrl('reviewsPage', {})).toBe(
      'https://ui-preview.example.com/th/reviews'
    );
  });

  it('resolves a dynamic post URL from a slug object', () => {
    expect(
      resolveLiveUrl('post', { slug: { current: 'under-eye-filler' } })
    ).toBe('https://ui-preview.example.com/th/blog/under-eye-filler');
  });

  it('resolves a dynamic servicePage URL from a slug string', () => {
    expect(resolveLiveUrl('servicePage', { slug: 'thread-lift' })).toBe(
      'https://ui-preview.example.com/th/services/thread-lift'
    );
  });

  it('resolves a dynamic category URL', () => {
    expect(resolveLiveUrl('category', { slug: { current: 'filler' } })).toBe(
      'https://ui-preview.example.com/th/category/filler'
    );
  });

  it('resolves a dynamic reviewCategory URL', () => {
    expect(
      resolveLiveUrl('reviewCategory', { slug: { current: 'review-filler-chin' } })
    ).toBe('https://ui-preview.example.com/th/reviews/review-filler-chin');
  });

  it('resolves a dynamic person URL', () => {
    expect(resolveLiveUrl('person', { slug: { current: 'dr-ritthichai' } })).toBe(
      'https://ui-preview.example.com/th/author/dr-ritthichai'
    );
  });

  it('resolves a generic page URL when slug is present', () => {
    expect(resolveLiveUrl('page', { slug: { current: 'contact' } })).toBe(
      'https://ui-preview.example.com/th/contact'
    );
  });

  it('returns null for a dynamic document with no slug', () => {
    expect(resolveLiveUrl('post', {})).toBeNull();
    expect(resolveLiveUrl('servicePage', { slug: '' })).toBeNull();
    expect(resolveLiveUrl('category', { slug: null })).toBeNull();
  });

  it('returns null for unsupported document types', () => {
    expect(resolveLiveUrl('settings', {})).toBeNull();
    expect(resolveLiveUrl('promotionItem', { slug: { current: 'test' } })).toBeNull();
    expect(resolveLiveUrl('review', { slug: { current: 'test' } })).toBeNull();
  });

  it('returns null when schemaType is empty', () => {
    expect(resolveLiveUrl('', {})).toBeNull();
    expect(resolveLiveUrl(undefined as unknown as string, {})).toBeNull();
  });

  it('always resolves paths under the default locale', () => {
    expect(resolveLiveUrl('homePage', {})).toContain('/th');
  });
});
