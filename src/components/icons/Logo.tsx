import Image from 'next/image';
import { urlForImage } from '@/lib/sanity/client/utils';

type LogoImage = {
  alt?: string | null;
  asset?: {
    _ref?: string | null;
    _id?: string | null;
  } | null;
} | null;

export default function Logo({
  image,
  alt = 'Logo',
}: {
  image?: LogoImage;
  alt?: string;
}) {
  const imageUrl = image
    ? urlForImage(image)?.width(480).height(140).url()
    : undefined;

  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={image?.alt || alt}
        width={191}
        height={56}
        className="h-10 w-auto object-contain"
        unoptimized
      />
    );
  }

  return (
    <div className=" [&_path]:fill-current flex h-9 w-9 items-center justify-center">
      <svg
        className="w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 136.33 170.44"
      >
        <title>Logo</title>
        <g>
          <path d="M68.16,136.33s0,0,0,0C30.52,136.33,0,105.81,0,68.16S30.52,0,68.16,0c0,0,0,0,0,0v34.08s0,0,0,0c-18.82,0-34.08,15.26-34.08,34.08s15.26,34.08,34.08,34.08c0,0,0,0,0,0v34.08Z" />
          <path d="M68.16,34.11s0,0,0,0c37.65,0,68.16,30.52,68.16,68.16s-30.52,68.16-68.16,68.16c0,0,0,0,0,0v-34.08s0,0,0,0c18.82,0,34.08-15.26,34.08-34.08s-15.26-34.08-34.08-34.08c0,0,0,0,0,0v-34.08Z" />
        </g>
      </svg>
    </div>
  );
}
