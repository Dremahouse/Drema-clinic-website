import { describe, expect, it } from 'vitest';
import {
  getDocumentLink,
  getLinkByLinkObject,
  getLocalizedDocumentLink,
} from '../links';
import {
  buildDraftPreviewPath,
  buildLocalizedPath,
  buildLocalizedUrl,
  normalizeAuthoredPublicUrl,
} from '../locale';
import {
  getAuthorPaginationRedirectPath,
  getBlogPaginationRedirectPath,
  getCategoryPaginationRedirectPath,
} from '../paginationRedirects';

describe('buildLocalizedPath', () => {
  it.each([
    ['th', '/', '/th'],
    ['en', '/blog', '/en/blog'],
    ['th', 'blog/foo', '/th/blog/foo'],
    ['en', '/category/botox', '/en/category/botox'],
    ['th', '/services/foo?source=test', '/th/services/foo?source=test'],
  ] as const)('builds %s%s as %s', (locale, path, expected) => {
    expect(buildLocalizedPath(locale, path)).toBe(expected);
  });

  it.each([
    ['th', '/about', '/th/about'],
    ['th', '/aesthetic-treatments', '/th/aesthetic-treatments'],
    ['th', '/services', '/th/services'],
    ['th', '/blog', '/th/blog'],
    ['th', '/pricing', '/th/pricing'],
    ['th', '/promotions', '/th/promotions'],
    ['th', '/reviews', '/th/reviews'],
    ['th', '/faq', '/th/faq'],
    ['en', '/', '/en'],
    ['en', '/about', '/en/about'],
    ['en', '/aesthetic-treatments', '/en/aesthetic-treatments'],
    ['en', '/services', '/en/services'],
    ['en', '/blog', '/en/blog'],
    ['en', '/pricing', '/en/pricing'],
    ['en', '/promotions', '/en/promotions'],
    ['en', '/reviews', '/en/reviews'],
    ['th', '/reviews/review-botox', '/th/reviews/review-botox'],
    ['en', '/reviews/review-botox', '/en/reviews/review-botox'],
    ['en', '/faq', '/en/faq'],
    ['th', '/services/botox', '/th/services/botox'],
    ['en', '/services/botox', '/en/services/botox'],
    ['th', '/author/doctor-slug', '/th/author/doctor-slug'],
    ['en', '/author/doctor-slug', '/en/author/doctor-slug'],
    ['th', '/cookies', '/th/cookies'],
    ['en', '/privacy-policy', '/en/privacy-policy'],
    ['th', '/terms', '/th/terms'],
    ['en', '/medical-disclaimer', '/en/medical-disclaimer'],
    ['th', '//category/botox', '/th/category/botox'],
    ['en', '/blog?topic=skin', '/en/blog?topic=skin'],
  ] as const)('preserves navigation path %s%s as %s', (locale, path, expected) => {
    expect(buildLocalizedPath(locale, path)).toBe(expected);
  });
});

describe('buildLocalizedUrl', () => {
  it.each([
    [
      'th',
      '/blog/article',
      'https://drema.example',
      'https://drema.example/th/blog/article',
    ],
    [
      'en',
      '/category/botox',
      'https://drema.example/',
      'https://drema.example/en/category/botox',
    ],
    [
      'en',
      '/reviews/review-botox?ref=preview',
      'http://localhost:3000',
      'http://localhost:3000/en/reviews/review-botox?ref=preview',
    ],
  ] as const)('builds a localized absolute URL without duplicate slashes', (locale, path, origin, expected) => {
    expect(buildLocalizedUrl(locale, path, origin)).toBe(expected);
  });
});

describe('buildDraftPreviewPath', () => {
  it.each([
    ['th', '/blog/article', '/th/blog/article'],
    ['en', '/category/botox', '/en/category/botox'],
  ] as const)('builds the %s preview destination', (locale, path, expected) => {
    expect(buildDraftPreviewPath(locale, path)).toBe(expected);
  });
});

describe('normalizeAuthoredPublicUrl', () => {
  const origin = 'https://drema.example';
  it.each([
    ['/blog/foo', 'th', 'https://drema.example/th/blog/foo'],
    [
      'https://drema.example/category/botox',
      'en',
      'https://drema.example/en/category/botox',
    ],
    ['/en/blog/foo', 'en', 'https://drema.example/en/blog/foo'],
    [
      'https://drema.example/th/blog/foo',
      'th',
      'https://drema.example/th/blog/foo',
    ],
    [
      'https://drema.example/en/blog/foo',
      'en',
      'https://drema.example/en/blog/foo',
    ],
    [
      'https://drema.example/th/blog/foo',
      'en',
      'https://drema.example/en/blog/foo',
    ],
    [
      '/blog/foo?source=test#section',
      'th',
      'https://drema.example/th/blog/foo?source=test#section',
    ],
    [
      'https://external.example/blog/foo',
      'th',
      'https://external.example/blog/foo',
    ],
  ] as const)('normalizes %s for %s', (value, locale, expected) => {
    expect(normalizeAuthoredPublicUrl(value, locale, origin)).toBe(expected);
  });
});

describe('getDocumentLink', () => {
  it('should return the correct link', () => {
    expect(getDocumentLink({ _type: 'page', slug: 'about' })).toBe('/about');
    expect(getDocumentLink({ _type: 'post', slug: 'post-slug' })).toBe(
      '/blog/post-slug'
    );
    expect(
      getDocumentLink({ _type: 'person', slug: 'dr-punyanan-boonchaya' })
    ).toBe('/author/dr-punyanan-boonchaya');
    expect(getDocumentLink({ _type: 'category', slug: 'category-slug' })).toBe(
      '/category/category-slug'
    );
    expect(getDocumentLink({ _type: 'homePage', slug: 'homepage-slug' })).toBe(
      '/'
    );
  });

  it('should return the correct absolute link', () => {
    expect(getDocumentLink({ _type: 'page', slug: 'about' }, true)).toBe(
      'http://localhost:3000/about'
    );
  });
});

describe('getLocalizedDocumentLink', () => {
  it.each([
    [{ _type: 'post', slug: 'article-slug' }, 'th', '/th/blog/article-slug'],
    [{ _type: 'post', slug: 'article-slug' }, 'en', '/en/blog/article-slug'],
    [{ _type: 'category', slug: 'botox' }, 'th', '/th/category/botox'],
    [{ _type: 'category', slug: 'botox' }, 'en', '/en/category/botox'],
    [
      { _type: 'category', slug: 'thread-lift-overview' },
      'th',
      '/th/category/thread-lift-overview',
    ],
    [
      { _type: 'category', slug: 'technology-devices' },
      'en',
      '/en/category/technology-devices',
    ],
    [{ _type: 'person', slug: 'doctor-slug' }, 'th', '/th/author/doctor-slug'],
    [{ _type: 'person', slug: 'doctor-slug' }, 'en', '/en/author/doctor-slug'],
  ] as const)('localizes %o for %s', (document, locale, expected) => {
    expect(getLocalizedDocumentLink(document, locale)).toBe(expected);
  });

  it('preserves absolute document link behavior', () => {
    expect(
      getLocalizedDocumentLink(
        { _type: 'post', slug: 'article-slug' },
        'en',
        true
      )
    ).toBe('http://localhost:3000/en/blog/article-slug');
  });
});

describe('pagination redirect destinations', () => {
  it.each([
    ['th', '/th/blog'],
    ['en', '/en/blog'],
  ] as const)('redirects %s blog pagination to %s', (locale, expected) => {
    expect(getBlogPaginationRedirectPath(locale)).toBe(expected);
  });

  it.each([
    ['th', 'botox', '/th/category/botox'],
    ['en', 'technology-devices', '/en/category/technology-devices'],
    ['th', 'thread-lift', '/th/category/thread-lift'],
  ] as const)('redirects %s category pagination for %s to %s', (locale, categorySlug, expected) => {
    expect(getCategoryPaginationRedirectPath(locale, categorySlug)).toBe(
      expected
    );
  });

  it.each([
    ['th', 'doctor-slug', '/th/author/doctor-slug'],
    ['en', 'doctor-slug', '/en/author/doctor-slug'],
  ] as const)('redirects %s author pagination for %s to %s', (locale, personSlug, expected) => {
    expect(getAuthorPaginationRedirectPath(locale, personSlug)).toBe(expected);
  });
});

describe('getLinkByLinkObject', () => {
  it('should return external link', () => {
    expect(
      getLinkByLinkObject({
        type: 'external',
        external: 'https://google.com',
        internal: null,
      })
    ).toBe('https://google.com');
  });

  it('should return internal link', () => {
    expect(
      getLinkByLinkObject({
        type: 'internal',
        external: null,
        internal: { _id: '1', _type: 'page', slug: 'about' },
      })
    ).toBe('/about');
  });
});
