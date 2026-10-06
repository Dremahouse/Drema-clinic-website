'use client';

import { Bell } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { getDocumentLink } from '@/lib/links';
import { buildLocalizedPath } from '@/lib/locale';

type MenuItem = {
  _type?: 'menuItem' | string;
  _key: string;
  text?: string | null;
  textTh?: string | null;
  textEn?: string | null;
  type?: 'link' | 'child-menu' | null;
  link?: BasicLink | null;
  childMenu?: MenuItem[] | null;
};
type MenuItems = MenuItem[];
type CategoryMenu = Array<{
  _id: string;
  title: string | null;
  slug: string | null;
  coverImageUrl?: string | null;
  coverImageAlt?: string | null;
  children?: Array<{
    _id: string;
    title: string | null;
    slug: string | null;
  }> | null;
}>;
type ReviewCategoryMenu = Array<{
  _id: string;
  title: string | null;
  titleTh?: string | null;
  titleEn?: string | null;
  slug: string | null;
}>;

type BasicLink = {
  type?: 'internal' | 'external' | null;
  external?: string | null;
  href?: string | null;
  internal?: { _type?: string | null; slug?: string | null } | null;
  openInNewTab?: boolean | null;
};

type BlogMegaMenu = Array<{
  _key?: string;
  titleTh?: string | null;
  titleEn?: string | null;
  link?: BasicLink | null;
  groups?: Array<{
    _key?: string;
    titleTh?: string | null;
    titleEn?: string | null;
    items?: Array<{
      _key?: string;
      labelTh?: string | null;
      labelEn?: string | null;
      link?: BasicLink | null;
    }> | null;
  }> | null;
  items?: Array<{
    _key?: string;
    labelTh?: string | null;
    labelEn?: string | null;
    link?: BasicLink | null;
  }> | null;
}>;

function toHref(item: MenuItems[number]) {
  const link = item.link;
  if (!link) return '#';
  if (link.type === 'external') return link.external || '#';
  if (link.type === 'internal' && link.internal?._type && link.internal?.slug) {
    return getDocumentLink(
      { _type: link.internal._type, slug: link.internal.slug },
      false
    );
  }
  return link.href || '#';
}

function toBlogMegaHref(link?: BasicLink | null) {
  if (!link) return '#';
  if (link.type === 'external') {
    return link.external || '#';
  }
  if (link.type === 'internal' && link.internal?._type && link.internal?.slug) {
    return getDocumentLink(
      { _type: link.internal._type, slug: link.internal.slug },
      false
    );
  }
  return '#';
}

export default function NavBar({
  menuItems,
  categoryMenu = [],
  reviewCategoryMenu = [],
  blogMegaMenu = [],
}: {
  menuItems: MenuItems;
  categoryMenu?: CategoryMenu;
  reviewCategoryMenu?: ReviewCategoryMenu;
  blogMegaMenu?: BlogMegaMenu;
}) {
  const [open, setOpen] = useState(false);
  const [blogMenuOpen, setBlogMenuOpen] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const navWrapRef = useRef<HTMLDivElement | null>(null);
  const touchLikeRef = useRef(false);
  const pathname = usePathname() || '/';
  const locale: 'th' | 'en' = pathname.startsWith('/en') ? 'en' : 'th';

  const openBlogMenu = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setBlogMenuOpen(true);
  };

  const scheduleCloseBlogMenu = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => {
      setBlogMenuOpen(false);
      closeTimerRef.current = null;
    }, 140);
  };

  useEffect(() => {
    touchLikeRef.current =
      window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(pointer: coarse)').matches;

    const onPointerDown = (event: PointerEvent) => {
      if (!blogMenuOpen) return;
      const target = event.target as Node | null;
      if (!target) return;
      if (navWrapRef.current?.contains(target)) return;
      setBlogMenuOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, [blogMenuOpen]);

  useEffect(() => {
    void pathname;
    setBlogMenuOpen(false);
  }, [pathname]);

  const toggleBlogMenuByTap = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!touchLikeRef.current) return;
    event.preventDefault();
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setBlogMenuOpen((prev) => !prev);
  };

  const localizeHref = (href: string) => {
    if (!href || href === '#' || href.startsWith('http')) return href;
    if (href.startsWith('/th') || href.startsWith('/en')) return href;
    return buildLocalizedPath(locale, href);
  };

  const categoryGroups = categoryMenu
    .filter((parent) => parent?.slug && parent?.title)
    .map((parent) => ({
      _id: parent._id,
      title: parent.title as string,
      slug: parent.slug as string,
      coverImageUrl: parent.coverImageUrl || null,
      coverImageAlt: parent.coverImageAlt || parent.title || null,
      children: (parent.children || [])
        .filter((child) => child?.slug && child?.title)
        .map((child) => ({
          _id: child._id,
          title: child.title as string,
          slug: child.slug as string,
        })),
    }));

  const reviewGroups = reviewCategoryMenu
    .filter(
      (item) => item?.slug && (item?.title || item?.titleTh || item?.titleEn)
    )
    .map((item) => ({
      _id: item._id,
      title:
        locale === 'en'
          ? item.titleEn || item.title || item.titleTh || 'Untitled'
          : item.titleTh || item.title || item.titleEn || 'Untitled',
      slug: item.slug as string,
    }));

  const megaMenuSections = (blogMegaMenu || [])
    .filter((section) => section?.titleTh || section?.titleEn)
    .map((section, sectionIndex) => ({
      key: section._key || `section-${sectionIndex}`,
      title:
        locale === 'en'
          ? section.titleEn || section.titleTh || 'Untitled'
          : section.titleTh || section.titleEn || 'Untitled',
      href: toBlogMegaHref(section.link),
      groups: (section.groups || [])
        .filter((group) => group?.titleTh || group?.titleEn)
        .map((group, groupIndex) => ({
          key:
            group._key || `${section._key || sectionIndex}-group-${groupIndex}`,
          title:
            locale === 'en'
              ? group.titleEn || group.titleTh || 'Untitled'
              : group.titleTh || group.titleEn || 'Untitled',
          items: (group.items || [])
            .filter((item) => item?.labelTh || item?.labelEn)
            .map((item, itemIndex) => ({
              key: item._key || `${group._key || groupIndex}-item-${itemIndex}`,
              title:
                locale === 'en'
                  ? item.labelEn || item.labelTh || 'Untitled'
                  : item.labelTh || item.labelEn || 'Untitled',
              href: toBlogMegaHref(item.link),
              openInNewTab: Boolean(item.link?.openInNewTab),
            })),
        })),
      items: (section.items || [])
        .filter((item) => item?.labelTh || item?.labelEn)
        .map((item, itemIndex) => ({
          key: item._key || `${section._key || sectionIndex}-item-${itemIndex}`,
          title:
            locale === 'en'
              ? item.labelEn || item.labelTh || 'Untitled'
              : item.labelTh || item.labelEn || 'Untitled',
          href: toBlogMegaHref(item.link),
          openInNewTab: Boolean(item.link?.openInNewTab),
        })),
    }));

  const toLocalePath = (targetLocale: 'th' | 'en') => {
    if (pathname === '/th' || pathname === '/en' || pathname === '/') {
      return buildLocalizedPath(targetLocale);
    }
    if (pathname.startsWith('/th/')) {
      return buildLocalizedPath(targetLocale, pathname.slice(3));
    }
    if (pathname.startsWith('/en/')) {
      return buildLocalizedPath(targetLocale, pathname.slice(3));
    }
    return buildLocalizedPath(targetLocale, pathname);
  };

  const setLocaleCookie = (targetLocale: 'th' | 'en') => {
    document.cookie = `site_lang=${targetLocale}; path=/; max-age=31536000; samesite=lax`;
  };

  const getLabel = (item: {
    text?: string | null;
    textTh?: string | null;
    textEn?: string | null;
  }) => {
    if (locale === 'en') {
      return item.textEn || item.text || item.textTh || 'Untitled';
    }
    return item.textTh || item.text || item.textEn || 'Untitled';
  };

  const isActive = (href: string) => {
    if (!href || href === '#') return false;
    const localizedHref = localizeHref(href);
    if (localizedHref === '/th' || localizedHref === '/en') {
      return pathname === localizedHref || pathname === '/';
    }
    return (
      pathname === localizedHref || pathname.startsWith(`${localizedHref}/`)
    );
  };

  const isBlogMenuItem = (item: MenuItems[number]) => {
    const label = `${item.textTh || ''} ${item.textEn || ''} ${item.text || ''}`
      .toLowerCase()
      .trim();
    if (label.includes('บทความ') || label.includes('blog')) {
      return true;
    }

    const href = toHref(item);
    if (!href || href === '#') return false;
    const normalized = href.replace(/^\/(th|en)(?=\/)/, '');
    return normalized === '/blog';
  };

  const isReviewMenuItem = (item: MenuItems[number]) => {
    const label = `${item.textTh || ''} ${item.textEn || ''} ${item.text || ''}`
      .toLowerCase()
      .trim();
    if (label.includes('รีวิว') || label.includes('review')) {
      return true;
    }

    const href = toHref(item);
    if (!href || href === '#') return false;
    const normalized = href.replace(/^\/(th|en)(?=\/)/, '');
    return normalized === '/reviews';
  };

  const getChildMenu = (
    item: MenuItems[number]
  ): NonNullable<MenuItems[number]['childMenu']> => {
    return item.childMenu || [];
  };

  return (
    <div className="site-nav-wrap" ref={navWrapRef}>
      <div className="site-nav-mobile-controls">
        <nav className="site-lang-switch" aria-label="Language switcher">
          <Link
            href={toLocalePath('th')}
            className={`site-lang-link ${locale === 'th' ? 'is-active' : ''}`}
            prefetch={false}
            scroll={false}
            onClick={() => setLocaleCookie('th')}
          >
            ไทย
          </Link>
          <Link
            href={toLocalePath('en')}
            className={`site-lang-link ${locale === 'en' ? 'is-active' : ''}`}
            prefetch={false}
            scroll={false}
            onClick={() => setLocaleCookie('en')}
          >
            EN
          </Link>
        </nav>
        <button
          type="button"
          className="site-nav-mobile-button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          Menu
        </button>
      </div>

      <div className="site-nav-desktop">
        <nav className="site-nav-links" aria-label="Main menu">
          {menuItems.map((item) => {
            const href = toHref(item);
            const localizedHref = localizeHref(href);
            const childMenu = getChildMenu(item);
            const hasBlogDropdown =
              isBlogMenuItem(item) &&
              (megaMenuSections.length > 0 || categoryGroups.length > 0);
            const hasReviewDropdown =
              isReviewMenuItem(item) && reviewGroups.length > 0;

            if (childMenu.length > 0 || hasBlogDropdown || hasReviewDropdown) {
              return (
                <div
                  className="site-nav-item has-children"
                  key={item._key}
                  onMouseEnter={isBlogMenuItem(item) ? openBlogMenu : undefined}
                  onMouseLeave={
                    isBlogMenuItem(item) ? scheduleCloseBlogMenu : undefined
                  }
                >
                  {localizedHref !== '#' ? (
                    <Link
                      href={localizedHref}
                      className={`site-nav-link ${isActive(href) ? 'is-active' : ''}`}
                      onMouseEnter={
                        isBlogMenuItem(item) ? openBlogMenu : undefined
                      }
                      onClick={
                        isBlogMenuItem(item) ? toggleBlogMenuByTap : undefined
                      }
                      {...(item.link?.openInNewTab
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {getLabel(item)}
                    </Link>
                  ) : (
                    <span className="site-nav-link">{getLabel(item)}</span>
                  )}
                  {hasBlogDropdown ? (
                    <div
                      className={`site-submenu site-submenu-blog ${blogMenuOpen ? 'is-open' : ''}`}
                      onMouseEnter={openBlogMenu}
                      onMouseLeave={scheduleCloseBlogMenu}
                    >
                      {categoryGroups.length === 0 &&
                      megaMenuSections.length > 0 ? (
                        <>
                          <div className="site-submenu-blog-head">
                            <p className="site-submenu-blog-kicker">
                              {locale === 'en'
                                ? 'Treatment Categories'
                                : 'หมวดหมู่การรักษา'}
                            </p>
                          </div>
                          <div className="site-submenu-grid">
                            {megaMenuSections.map((section) => (
                              <div
                                key={section.key}
                                className="site-submenu-group"
                              >
                                {section.href !== '#' ? (
                                  <Link
                                    href={localizeHref(section.href)}
                                    className="site-submenu-parent"
                                  >
                                    {section.title}
                                  </Link>
                                ) : (
                                  <p className="site-submenu-parent">
                                    {section.title}
                                  </p>
                                )}
                                {section.groups.map((group) => (
                                  <div
                                    key={group.key}
                                    className="site-submenu-children"
                                  >
                                    <p className="site-submenu-child font-semibold">
                                      {group.title}
                                    </p>
                                    {group.items.map((child) => (
                                      <Link
                                        key={child.key}
                                        href={localizeHref(child.href)}
                                        className="site-submenu-child"
                                        {...(child.openInNewTab
                                          ? {
                                              target: '_blank',
                                              rel: 'noopener noreferrer',
                                            }
                                          : {})}
                                      >
                                        {child.title}
                                      </Link>
                                    ))}
                                  </div>
                                ))}
                                {section.items.length > 0 ? (
                                  <div className="site-submenu-children">
                                    {section.items.map((child) => (
                                      <Link
                                        key={child.key}
                                        href={localizeHref(child.href)}
                                        className="site-submenu-child"
                                        {...(child.openInNewTab
                                          ? {
                                              target: '_blank',
                                              rel: 'noopener noreferrer',
                                            }
                                          : {})}
                                      >
                                        {child.title}
                                      </Link>
                                    ))}
                                  </div>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="site-submenu-blog-head">
                            <p className="site-submenu-blog-kicker">
                              {locale === 'en'
                                ? 'Article Index'
                                : 'สารบัญบทความ'}
                            </p>
                          </div>
                          <div className="site-submenu-grid site-submenu-grid-auto">
                            {categoryGroups.map((group) => (
                              <div
                                key={group._id}
                                className="site-submenu-group"
                              >
                                <Link
                                  href={localizeHref(`/category/${group.slug}`)}
                                  className="site-submenu-thumb group"
                                >
                                  {group.coverImageUrl ? (
                                    <Image
                                      src={group.coverImageUrl}
                                      alt={group.coverImageAlt || group.title}
                                      fill
                                      sizes="(max-width: 1024px) 100vw, 18vw"
                                      className="site-submenu-thumb-image"
                                      unoptimized
                                    />
                                  ) : null}
                                  <span className="site-submenu-thumb-overlay" />
                                </Link>
                                <Link
                                  href={localizeHref(`/category/${group.slug}`)}
                                  className="site-submenu-parent"
                                >
                                  {group.title}
                                </Link>
                                {group.children.length > 0 ? (
                                  <div className="site-submenu-children">
                                    {group.children.map((child) => (
                                      <Link
                                        key={child._id}
                                        href={localizeHref(
                                          `/category/${child.slug}`
                                        )}
                                        className="site-submenu-child"
                                      >
                                        {child.title}
                                      </Link>
                                    ))}
                                  </div>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ) : hasReviewDropdown ? (
                    <div className="site-submenu">
                      {reviewGroups.map((group) => (
                        <Link
                          key={group._id}
                          href={localizeHref(`/reviews/${group.slug}`)}
                          className="site-submenu-link"
                        >
                          {group.title}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="site-submenu">
                      {childMenu.map((child) => (
                        <Link
                          key={child._key}
                          href={localizeHref(toBlogMegaHref(child.link))}
                          className="site-submenu-link"
                          {...(child.link?.openInNewTab
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                        >
                          {getLabel(child)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div className="site-nav-item" key={item._key}>
                <Link
                  href={localizedHref}
                  className={`site-nav-link ${isActive(href) ? 'is-active' : ''}`}
                  {...(item.link?.openInNewTab
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {getLabel(item)}
                </Link>
              </div>
            );
          })}
        </nav>

        <div className="site-nav-actions">
          <button
            type="button"
            className="site-nav-icon-button"
            aria-label="Alerts"
          >
            <Bell size={18} />
          </button>
          <nav className="site-lang-switch" aria-label="Language switcher">
            <Link
              href={toLocalePath('th')}
              className={`site-lang-link ${locale === 'th' ? 'is-active' : ''}`}
              prefetch={false}
              scroll={false}
              onClick={() => setLocaleCookie('th')}
            >
              ไทย
            </Link>
            <Link
              href={toLocalePath('en')}
              className={`site-lang-link ${locale === 'en' ? 'is-active' : ''}`}
              prefetch={false}
              scroll={false}
              onClick={() => setLocaleCookie('en')}
            >
              EN
            </Link>
          </nav>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-menu"
          className="site-nav-mobile"
          aria-label="Mobile menu"
        >
          {menuItems.map((item) => {
            const href = toHref(item);
            const localizedHref = localizeHref(href);
            const childMenu = getChildMenu(item);
            const hasBlogDropdown =
              isBlogMenuItem(item) &&
              (megaMenuSections.length > 0 || categoryGroups.length > 0);
            const hasReviewDropdown =
              isReviewMenuItem(item) && reviewGroups.length > 0;

            if (childMenu.length > 0 || hasBlogDropdown || hasReviewDropdown) {
              return (
                <div key={item._key} className="site-mobile-group">
                  {localizedHref !== '#' ? (
                    <Link
                      href={localizedHref}
                      className="site-mobile-parent block rounded hover:bg-muted"
                      onClick={() => setOpen(false)}
                    >
                      {getLabel(item)}
                    </Link>
                  ) : (
                    <p className="site-mobile-parent">{getLabel(item)}</p>
                  )}
                  {hasBlogDropdown ? (
                    <>
                      {categoryGroups.length === 0 &&
                      megaMenuSections.length > 0
                        ? megaMenuSections.map((section) => (
                            <div
                              key={section.key}
                              className="site-mobile-group"
                            >
                              {section.href !== '#' ? (
                                <Link
                                  href={localizeHref(section.href)}
                                  className="site-mobile-link font-semibold"
                                  onClick={() => setOpen(false)}
                                >
                                  {section.title}
                                </Link>
                              ) : (
                                <p className="site-mobile-parent">
                                  {section.title}
                                </p>
                              )}
                              {section.groups.map((group) => (
                                <div
                                  key={group.key}
                                  className="site-mobile-group"
                                >
                                  <p className="site-mobile-parent pl-5 text-sm font-semibold">
                                    {group.title}
                                  </p>
                                  {group.items.map((child) => (
                                    <Link
                                      key={child.key}
                                      href={localizeHref(child.href)}
                                      className="site-mobile-link pl-8 text-sm"
                                      onClick={() => setOpen(false)}
                                      {...(child.openInNewTab
                                        ? {
                                            target: '_blank',
                                            rel: 'noopener noreferrer',
                                          }
                                        : {})}
                                    >
                                      {child.title}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                              {section.items.map((child) => (
                                <Link
                                  key={child.key}
                                  href={localizeHref(child.href)}
                                  className="site-mobile-link pl-5 text-sm"
                                  onClick={() => setOpen(false)}
                                  {...(child.openInNewTab
                                    ? {
                                        target: '_blank',
                                        rel: 'noopener noreferrer',
                                      }
                                    : {})}
                                >
                                  {child.title}
                                </Link>
                              ))}
                            </div>
                          ))
                        : categoryGroups.map((group) => (
                            <div key={group._id} className="site-mobile-group">
                              <Link
                                href={localizeHref(`/category/${group.slug}`)}
                                className="site-mobile-link font-semibold"
                                onClick={() => setOpen(false)}
                              >
                                {group.title}
                              </Link>
                              {group.children.map((child) => (
                                <Link
                                  key={child._id}
                                  href={localizeHref(`/category/${child.slug}`)}
                                  className="site-mobile-link pl-5 text-sm"
                                  onClick={() => setOpen(false)}
                                >
                                  {child.title}
                                </Link>
                              ))}
                            </div>
                          ))}
                    </>
                  ) : hasReviewDropdown ? (
                    <>
                      {reviewGroups.map((group) => (
                        <Link
                          key={group._id}
                          href={localizeHref(`/reviews/${group.slug}`)}
                          className="site-mobile-link pl-5 text-sm"
                          onClick={() => setOpen(false)}
                        >
                          {group.title}
                        </Link>
                      ))}
                    </>
                  ) : (
                    <>
                      {childMenu.map((child) => (
                        <Link
                          key={child._key}
                          href={localizeHref(toBlogMegaHref(child.link))}
                          className="site-mobile-link"
                          onClick={() => setOpen(false)}
                        >
                          {getLabel(child)}
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item._key}
                href={localizedHref}
                className="site-mobile-link"
                onClick={() => setOpen(false)}
              >
                {getLabel(item)}
              </Link>
            );
          })}
        </nav>
      ) : null}
    </div>
  );
}
