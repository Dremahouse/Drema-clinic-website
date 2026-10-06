import type { ReactNode } from 'react';
import {
  type BreadcrumbItem,
  Breadcrumbs,
} from '@/components/shared/Breadcrumbs';
import { cn } from '@/lib/utils';
import ResponsiveHeroImage from './ResponsiveHeroImage';

type SanityImageLike = {
  alt?: string | null;
  asset?: { _id?: string | null; _ref?: string | null } | null;
} | null;

type HeroTransform = {
  width: number;
  height: number;
  fit?: 'crop' | 'clip' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
  ignoreCrop?: boolean;
};

function HeroBreadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs?: {
    items: BreadcrumbItem[];
    locale: 'th' | 'en';
  };
}) {
  if (!breadcrumbs) return null;

  return (
    <Breadcrumbs
      items={breadcrumbs.items}
      locale={breadcrumbs.locale}
      className="mb-2"
    />
  );
}

function HeroOverlays() {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(212,170,103,0.08),rgba(251,247,238,0)_22%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,170,103,0.18),transparent_34%)]" />
      <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,rgba(251,247,238,0.1)_0%,rgba(251,247,238,0.2)_26%,rgba(251,247,238,0.58)_48%,rgba(251,247,238,0.15)_68%,rgba(251,247,238,0)_80%)] lg:w-[66%]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[rgba(251,247,238,0.72)] to-transparent" />
    </>
  );
}

function MobileHeroImageBlock({
  image,
  fallbackImage,
  transform,
  imageAlt,
  imageClassName,
  imagePlaceholder,
}: {
  image?: SanityImageLike;
  fallbackImage?: SanityImageLike;
  transform: HeroTransform;
  imageAlt: string;
  imageClassName?: string;
  imagePlaceholder: string;
}) {
  return (
    <div className="relative md:hidden">
      <ResponsiveHeroImage
        desktopImage={null}
        mobileImage={image || null}
        fallbackImage={fallbackImage || null}
        alt={imageAlt}
        desktopTransform={transform}
        mobileTransform={transform}
        className={cn('block aspect-[4/5] w-full object-cover', imageClassName)}
        placeholder={imagePlaceholder}
      />
    </div>
  );
}

export default function MarketingPageHero({
  eyebrow,
  heading,
  description,
  desktopImage,
  mobileImage,
  mobileImageBelowImage,
  fallbackImage,
  imageAlt,
  imagePlaceholder,
  actions,
  desktopTransform = { width: 2400, height: 1400, fit: 'crop' },
  mobileTransform = { width: 1440, height: 1800, fit: 'crop' },
  mobileImageBelowTransform,
  sectionClassName,
  contentClassName,
  imageClassName,
  textClassName,
  textOverlayClassName,
  breadcrumbs,
  mobileImageBelow = false,
  showOverlay = true,
}: {
  eyebrow?: ReactNode;
  heading?: ReactNode;
  description?: ReactNode;
  desktopImage?: SanityImageLike;
  mobileImage?: SanityImageLike;
  mobileImageBelowImage?: SanityImageLike;
  fallbackImage?: SanityImageLike;
  imageAlt: string;
  imagePlaceholder: string;
  actions?: ReactNode;
  desktopTransform?: HeroTransform;
  mobileTransform?: HeroTransform;
  mobileImageBelowTransform?: HeroTransform;
  sectionClassName?: string;
  contentClassName?: string;
  imageClassName?: string;
  textClassName?: string;
  textOverlayClassName?: string;
  breadcrumbs?: {
    items: BreadcrumbItem[];
    locale: 'th' | 'en';
  };
  mobileImageBelow?: boolean;
  showOverlay?: boolean;
}) {
  const hasMobileImageBelowImage = Boolean(
    mobileImageBelowImage?.asset?._id || mobileImageBelowImage?.asset?._ref
  );

  return (
    <section
      className={cn(
        'relative overflow-hidden bg-[var(--marketing-surface-1)] lg:min-h-[min(58.333vw,820px)]',
        sectionClassName
      )}
    >
      <div
        className={cn(
          'absolute inset-0',
          mobileImageBelow && 'hidden md:block'
        )}
        style={{
          maskImage:
            'linear-gradient(180deg,#000 0%,#000 70%,rgba(0,0,0,0.42) 88%,transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(180deg,#000 0%,#000 70%,rgba(0,0,0,0.42) 88%,transparent 100%)',
        }}
      >
        <ResponsiveHeroImage
          desktopImage={desktopImage || null}
          mobileImage={mobileImage || null}
          fallbackImage={fallbackImage || null}
          alt={imageAlt}
          desktopTransform={desktopTransform}
          mobileTransform={mobileTransform}
          className={cn(
            'absolute inset-0 h-full w-full object-cover object-center',
            imageClassName
          )}
          placeholder={imagePlaceholder}
        />
      </div>
      {showOverlay ? <HeroOverlays /> : null}

      <div
        className={cn(
          'relative mx-auto flex max-w-7xl px-6 py-16 md:px-10 md:py-20 lg:min-h-[min(58.333vw,820px)] lg:items-center',
          contentClassName
        )}
      >
        <div
          className={cn(
            'relative w-full max-w-3xl space-y-6 lg:max-w-[50%]',
            textClassName
          )}
        >
          {textOverlayClassName ? (
            <div
              aria-hidden="true"
              className={cn('absolute inset-0 -z-10', textOverlayClassName)}
            />
          ) : null}
          <HeroBreadcrumbs breadcrumbs={breadcrumbs} />
          {eyebrow ? (
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--marketing-muted)]">
              {eyebrow}
            </p>
          ) : null}
          {heading ? (
            <h1 className="max-w-full text-4xl font-semibold leading-tight text-[var(--marketing-ink)] md:text-4xl">
              {heading}
            </h1>
          ) : null}
          {description ? (
            <p className="max-w-full text-base leading-8 text-[var(--marketing-copy)] md:text-lg">
              {description}
            </p>
          ) : null}
          {actions ? (
            <div className="flex flex-wrap gap-3">{actions}</div>
          ) : null}
        </div>
      </div>
      {mobileImageBelow ? (
        <MobileHeroImageBlock
          image={mobileImage}
          fallbackImage={fallbackImage}
          transform={mobileTransform}
          imageAlt={imageAlt}
          imageClassName={imageClassName}
          imagePlaceholder={imagePlaceholder}
        />
      ) : null}
      {mobileImageBelow && hasMobileImageBelowImage ? (
        <MobileHeroImageBlock
          image={mobileImageBelowImage}
          transform={mobileImageBelowTransform || mobileTransform}
          imageAlt={imageAlt}
          imageClassName={imageClassName}
          imagePlaceholder={imagePlaceholder}
        />
      ) : null}
    </section>
  );
}
