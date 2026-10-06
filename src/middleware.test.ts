import { NextRequest } from 'next/server';
import { describe, expect, it } from 'vitest';
import { DREMA_LOCALE_HEADER } from '@/lib/typography';
import { config, middleware } from './middleware';

function request(pathname: string) {
  return new NextRequest(`https://drema.example${pathname}`);
}

describe('locale routing middleware', () => {
  it('uses the workflow-free matcher for the isolated repository', () => {
    expect(config.matcher).toEqual([
      '/((?!_next/static|_next/image|favicon.ico).*)',
    ]);
  });

  it.each([
    ['/', '/th'],
    ['/blog', '/th/blog'],
    ['/blog/foo?x=1', '/th/blog/foo?x=1'],
    ['/services', '/th/services'],
    ['/category/botox', '/th/category/botox'],
    ['/pricing', '/th/pricing'],
    ['/contact', '/th/contact'],
  ])('redirects unprefixed %s once to %s', (pathname, expected) => {
    const response = middleware(request(pathname));

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe(
      `https://drema.example${expected}`
    );
  });

  it.each([
    '/th',
    '/en',
    '/th/blog',
    '/en/blog',
    '/th/category/botox',
  ])('passes localized %s through without a redirect or rewrite', (pathname) => {
    const response = middleware(request(pathname));

    expect(response.status).toBe(200);
    expect(response.headers.get('location')).toBeNull();
    expect(response.headers.get('x-middleware-rewrite')).toBeNull();
    expect(response.headers.get('x-middleware-next')).toBe('1');
  });

  it.each([
    '/api/draft-mode/enable',
    '/studio',
    '/_next/static/chunk.js',
    '/sitemap.xml',
    '/robots.txt',
    '/image.png',
  ])('bypasses non-frontend %s', (pathname) => {
    expect(middleware(request(pathname)).headers.get('x-middleware-next')).toBe(
      '1'
    );
  });

  it.each([
    ['/th', 'th'],
    ['/en', 'en'],
    ['/th/blog', 'th'],
    ['/en/blog', 'en'],
    ['/th/category/botox', 'th'],
    ['/en/category/botox', 'en'],
  ])('forwards locale header for %s', (pathname, expected) => {
    const req = request(pathname);
    middleware(req);

    expect(req.headers.get(DREMA_LOCALE_HEADER)).toBe(expected);
  });
});
