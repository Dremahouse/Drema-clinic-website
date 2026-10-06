'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getLinkByLinkObject } from '@/lib/links';
import { buildLocalizedPath } from '@/lib/locale';
import type { ButtonFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';

export default function ButtonsGroup({
  buttons,
  size = 'xl',
  className,
}: {
  buttons: ButtonFragmentType[];
  size?: 'xl' | 'lg' | 'sm' | 'default' | 'icon';
  className?: string;
}) {
  const pathname = usePathname() || '/';
  const locale = pathname.startsWith('/en') ? 'en' : 'th';

  return (
    <div className={cn('flex flex-col md:flex-row gap-4', className)}>
      {buttons.map((button) => {
        const rawHref = button.link
          ? getLinkByLinkObject(button.link) || ''
          : '';
        const href =
          rawHref.startsWith('/') &&
          rawHref !== '/th' &&
          rawHref !== '/en' &&
          !rawHref.startsWith('/th/') &&
          !rawHref.startsWith('/en/')
            ? buildLocalizedPath(locale, rawHref)
            : rawHref;

        return (
          <Button
            asChild
            variant={button.variant}
            size={size}
            key={button._key}
          >
            <Link
              href={href}
              target={button.link?.openInNewTab ? '_blank' : '_self'}
            >
              {button.text}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
