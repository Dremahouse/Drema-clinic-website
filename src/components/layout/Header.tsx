import Link from 'next/link';
import { buildLocalizedPath, type SiteLocale } from '@/lib/locale';
import { client } from '@/lib/sanity/client/client';
import { serverClient } from '@/lib/sanity/client/serverClient';
import { urlForImage } from '@/lib/sanity/client/utils';
import {
  categoriesForMenuQuery,
  reviewsMenuCategoriesQuery,
  settingsQuery,
} from '@/lib/sanity/queries/queries';
import { decodeEntitiesDeep } from '@/utils/decodeHtmlEntities';
import Logo from '../icons/Logo';
import NavBar from './NavBar';
import ScrollProgressBar from './ScrollProgressBar';

type HeaderLogo = {
  linkShape?: {
    type?: 'internal' | 'external' | null;
    external?: string | null;
    internal?: { _type: string; slug: string | null } | null;
    openInNewTab?: boolean | null;
  };
  logo?: {
    alt?: string | null;
    asset?: {
      _ref?: string | null;
      _id?: string | null;
    } | null;
  } | null;
  headerBackgroundImage?: {
    alt?: string | null;
    asset?: {
      _ref?: string | null;
      _id?: string | null;
    } | null;
  } | null;
  enableOverlay?: boolean | null;
  overlayColor?: string | null;
  overlayOpacity?: number | null;
  blogMegaMenuSections?: Array<{
    _key?: string;
    titleTh?: string | null;
    titleEn?: string | null;
    link?: HeaderLogo['linkShape'] | null;
    groups?: Array<{
      _key?: string;
      titleTh?: string | null;
      titleEn?: string | null;
      items?: Array<{
        _key?: string;
        labelTh?: string | null;
        labelEn?: string | null;
        link?: HeaderLogo['linkShape'] | null;
      }> | null;
    }> | null;
    items?: Array<{
      _key?: string;
      labelTh?: string | null;
      labelEn?: string | null;
      link?: HeaderLogo['linkShape'] | null;
    }> | null;
  }> | null;
};

const buildHeaderBackgroundStyle = ({
  headerBgUrl,
  enableOverlay,
  overlayColor,
  overlayOpacity,
}: {
  headerBgUrl?: string;
  enableOverlay?: boolean | null;
  overlayColor?: string | null;
  overlayOpacity?: number | null;
}) => {
  if (!headerBgUrl) return undefined;

  const overlayEnabled = enableOverlay !== false;
  const color = overlayColor || '#140e08';
  const opacity = Math.min(100, Math.max(0, overlayOpacity ?? 42));
  const overlay = overlayEnabled
    ? `linear-gradient(color-mix(in srgb, ${color} ${opacity}%, transparent), color-mix(in srgb, ${color} ${opacity}%, transparent))`
    : null;

  return {
    backgroundImage: overlay
      ? `${overlay}, url("${headerBgUrl}")`
      : `url("${headerBgUrl}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
};

const promotionsFallbackMenuItem = {
  _type: 'menuItem',
  _key: 'fallback-promotions',
  text: 'Promotions',
  textTh: 'โปรโมชัน',
  textEn: 'Promotions',
  type: 'link' as const,
  link: {
    type: 'external' as const,
    external: '/promotions',
    href: '#',
    openInNewTab: false,
  },
};

const aboutFallbackMenuItem = {
  _type: 'menuItem',
  _key: 'fallback-about',
  text: 'About Us',
  textTh: 'เกี่ยวกับเรา',
  textEn: 'About Us',
  type: 'link' as const,
  link: {
    type: 'external' as const,
    external: '/about',
    href: '#',
    openInNewTab: false,
  },
};

export default async function Header({ locale }: { locale: SiteLocale }) {
  const [settingsRaw, categoriesForMenuRaw, reviewCategoriesRaw] =
    await Promise.all([
      client
        .withConfig({ useCdn: false, perspective: 'published' })
        .fetch(settingsQuery, {}, { next: { revalidate: 0 } }),
      serverClient
        .withConfig({ perspective: 'published' })
        .fetch(categoriesForMenuQuery, {}, { next: { revalidate: 0 } }),
      client
        .withConfig({ useCdn: false, perspective: 'published' })
        .fetch(reviewsMenuCategoriesQuery, {}, { next: { revalidate: 0 } }),
    ]);

  const settings = decodeEntitiesDeep(settingsRaw);
  const categoriesForMenu = decodeEntitiesDeep(categoriesForMenuRaw);
  const reviewCategoriesForMenu = decodeEntitiesDeep(reviewCategoriesRaw);

  if (!settings) {
    return null;
  }

  const categoryRows = (categoriesForMenu || []) as Array<{
    _id: string;
    title?: string | null;
    slug?: string | null;
    coverImage?: {
      alt?: string | null;
      asset?: {
        _ref?: string | null;
        _id?: string | null;
      } | null;
    } | null;
    children?: Array<{
      _id: string;
      title?: string | null;
      slug?: string | null;
    }> | null;
  }>;

  const normalizedCategoryMenu = categoryRows
    .filter(
      (category) =>
        category?.slug &&
        category?.title &&
        !['review', 'reviews'].includes(
          String(category.slug).toLowerCase().trim()
        ) &&
        !['review', 'reviews'].includes(
          String(category.title).toLowerCase().trim()
        )
    )
    .map((category) => ({
      _id: category._id,
      title: category.title as string,
      slug: category.slug as string,
      coverImageUrl:
        category.coverImage?.asset?._id || category.coverImage?.asset?._ref
          ? (urlForImage(category.coverImage)
              ?.width(560)
              .height(280)
              // biome-ignore lint/suspicious/noFocusedTests: Sanity image builder uses fit() transform API
              .fit('crop')
              .auto('format')
              .url() as string)
          : null,
      coverImageAlt: category.coverImage?.alt || category.title || '',
      children: (category.children || [])
        .filter((child) => child?.slug && child?.title)
        .map((child) => ({
          _id: child._id,
          title: child.title as string,
          slug: child.slug as string,
        })),
    }));

  const normalizedReviewCategoryMenu = (
    (reviewCategoriesForMenu || []) as Array<{
      _id: string;
      title?: string | null;
      titleTh?: string | null;
      titleEn?: string | null;
      slug?: string | null;
    }>
  )
    .filter(
      (category) =>
        category?.slug &&
        (category?.title || category?.titleTh || category?.titleEn)
    )
    .map((category) => ({
      _id: category._id,
      title: category.title || category.titleTh || category.titleEn || '',
      titleTh: category.titleTh || null,
      titleEn: category.titleEn || null,
      slug: category.slug as string,
    }));

  const headerBgImage = (settings as HeaderLogo).headerBackgroundImage;
  const blogMegaMenuSections =
    (settings as HeaderLogo).blogMegaMenuSections || [];
  const baseMenu = Array.isArray(settings.menu) ? settings.menu : [];
  const hasPromotionsMenu = baseMenu.some((item) => {
    const label =
      `${item?.text || ''} ${item?.textTh || ''} ${item?.textEn || ''}`
        .toLowerCase()
        .trim();
    const href = item?.link?.external || item?.link?.href || '';

    return (
      label.includes('promotion') ||
      label.includes('โปรโมชัน') ||
      href === '/promotions'
    );
  });
  const hasAboutMenu = baseMenu.some((item) => {
    const label =
      `${item?.text || ''} ${item?.textTh || ''} ${item?.textEn || ''}`
        .toLowerCase()
        .trim();
    const href = item?.link?.external || item?.link?.href || '';

    return (
      label.includes('about') || label.includes('เกี่ยวกับ') || href === '/about'
    );
  });
  const resolvedMenu = [
    ...baseMenu,
    ...(hasAboutMenu ? [] : [aboutFallbackMenuItem]),
    ...(hasPromotionsMenu ? [] : [promotionsFallbackMenuItem]),
  ];
  const headerBgUrl = headerBgImage?.asset?._id
    ? (urlForImage(headerBgImage)
        ?.width(2400)
        .height(240)
        // biome-ignore lint/suspicious/noFocusedTests: Sanity image builder uses fit() transform API
        .fit('crop')
        .auto('format')
        .url() as string)
    : undefined;
  const headerStyle = buildHeaderBackgroundStyle({
    headerBgUrl,
    enableOverlay: (settings as HeaderLogo).enableOverlay,
    overlayColor: (settings as HeaderLogo).overlayColor,
    overlayOpacity: (settings as HeaderLogo).overlayOpacity,
  });

  return (
    <header className="site-header">
      <div className="site-header-inner" style={headerStyle}>
        <Link className="site-brand" href={buildLocalizedPath(locale)}>
          <Logo
            image={(settings as HeaderLogo).logo}
            alt={settings.title || 'Site logo'}
          />
          {/* <span>{settings.title}</span>*/}
        </Link>
        <NavBar
          menuItems={resolvedMenu}
          categoryMenu={normalizedCategoryMenu}
          reviewCategoryMenu={normalizedReviewCategoryMenu}
          blogMegaMenu={blogMegaMenuSections || []}
        />
      </div>
      <ScrollProgressBar />
    </header>
  );
}
