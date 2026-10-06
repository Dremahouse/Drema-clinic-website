import { stegaClean } from '@sanity/client/stega';
import { Image } from 'next-sanity/image';

import { urlForImage } from '@/lib/sanity/client/utils';

interface CoverImageProps {
  image: { asset?: { _ref?: string }; alt?: string };
  aspectRatio?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
}

const extractAspectRatioFromRef = (ref?: string): string | null => {
  if (!ref) return null;
  const match = ref.match(/-(\d+)x(\d+)-/);
  if (!match) return null;
  const width = Number(match[1]);
  const height = Number(match[2]);
  if (!width || !height) return null;
  return `${width} / ${height}`;
};

export default function CoverImage(props: CoverImageProps) {
  const {
    image: source,
    aspectRatio: forcedAspectRatio,
    className,
    imageClassName,
    priority,
    sizes,
  } = props;
  const aspectRatio =
    forcedAspectRatio || extractAspectRatioFromRef(source?.asset?._ref) || '4 / 3';

  const image = source?.asset?._ref ? (
    <Image
      className={`rounded-2xl object-cover shadow-md transition-shadow ${imageClassName || ''}`.trim()}
      fill={true}
      alt={stegaClean(source?.alt) || ''}
      src={
        urlForImage(source)
          ?.width(1800)
          .fit('max')
          .auto('format')
          .url() as string
      }
      sizes={sizes || '100vw'}
      priority={priority}
    />
  ) : (
    <div className="bg-slate-50" style={{ paddingTop: '100%' }} />
  );

  return (
    <div className={`relative ${className || ''}`.trim()} style={{ aspectRatio }}>
      {image}
    </div>
  );
}
