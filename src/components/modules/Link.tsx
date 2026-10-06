import NextLink from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import { getLinkByLinkObject } from '@/lib/links';
import { buildLocalizedPath } from '@/lib/locale';
import type { LinkFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';

type LinkProps = {
  link: LinkFragmentType;
  children: React.ReactNode;
  className?: string;
  locale?: 'th' | 'en';
} & Omit<
  ComponentPropsWithoutRef<typeof NextLink>,
  'href' | 'className' | 'children'
>;

export default function Link({
  link,
  children,
  className,
  locale,
  ...props
}: LinkProps) {
  const rawUrl = getLinkByLinkObject(link);
  const url =
    rawUrl?.startsWith('/') &&
    !rawUrl.startsWith('/en') &&
    !rawUrl.startsWith('/th') &&
    locale
      ? buildLocalizedPath(locale, rawUrl)
      : rawUrl;

  if (url) {
    return (
      <NextLink
        href={url}
        target={link.openInNewTab ? '_blank' : undefined}
        rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
        className={className}
        {...props}
      >
        {children}
      </NextLink>
    );
  }
  return <>{children}</>;
}
