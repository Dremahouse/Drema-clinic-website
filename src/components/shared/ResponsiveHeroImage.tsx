import { urlForImage } from '@/lib/sanity/client/utils';

type SanityImageLike = {
  alt?: string | null;
  asset?: { _id?: string | null; _ref?: string | null } | null;
} | null;

type TransformOptions = {
  width: number;
  height: number;
  fit?: 'crop' | 'clip' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
  ignoreCrop?: boolean;
};

const hasImageAsset = (image: SanityImageLike) =>
  Boolean(image?.asset?._id || image?.asset?._ref);

const buildImageUrl = (image: SanityImageLike, options: TransformOptions) => {
  if (!hasImageAsset(image)) return null;

  const builder = urlForImage(image, { ignoreCrop: options.ignoreCrop })?.width(
    options.width
  );
  const sizedBuilder =
    options.ignoreCrop && options.fit === 'max'
      ? builder
      : builder?.height(options.height);

  return sizedBuilder
    ?.fit(options.fit || 'crop')
    .auto('format')
    .url();
};

export default function ResponsiveHeroImage({
  desktopImage,
  mobileImage,
  fallbackImage,
  alt,
  desktopTransform,
  mobileTransform,
  className,
  placeholder,
}: {
  desktopImage?: SanityImageLike;
  mobileImage?: SanityImageLike;
  fallbackImage?: SanityImageLike;
  alt: string;
  desktopTransform: TransformOptions;
  mobileTransform: TransformOptions;
  className: string;
  placeholder: string;
}) {
  const desktopSrc =
    buildImageUrl(desktopImage || fallbackImage || null, desktopTransform) ||
    null;
  const mobileSrc =
    buildImageUrl(
      mobileImage || fallbackImage || desktopImage || null,
      mobileTransform
    ) || null;

  if (!desktopSrc && !mobileSrc) {
    return (
      <div className="flex h-full min-h-[inherit] items-center justify-center text-[var(--marketing-muted)]">
        {placeholder}
      </div>
    );
  }

  return (
    <picture>
      {desktopSrc ? (
        <source media="(min-width: 768px)" srcSet={desktopSrc} />
      ) : null}
      <img
        src={mobileSrc || desktopSrc || ''}
        alt={alt}
        className={className}
      />
    </picture>
  );
}
