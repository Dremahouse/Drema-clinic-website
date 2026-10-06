import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { DEFAULT_LOCALE, isSiteLocale } from '@/lib/locale';
import { DREMA_LOCALE_HEADER } from '@/lib/typography';

const PUBLIC_FILE = /\.[^/]+$/;

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (
    pathname.startsWith('/studio') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const firstSegment = pathname.split('/')[1];

  if (isSiteLocale(firstSegment)) {
    request.headers.set(DREMA_LOCALE_HEADER, firstSegment);
    const requestHeaders = new Headers(request.headers);
    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });
    response.cookies.set('site_lang', firstSegment);
    return response;
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname =
    pathname === '/' ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${pathname}`;
  redirectUrl.search = search;
  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set('site_lang', 'th');
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
