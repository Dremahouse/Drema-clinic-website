import type { PortableTextBlock } from 'next-sanity';
import { Image } from 'next-sanity/image';
import { urlForImage } from '@/lib/sanity/client/utils';
import type { CardFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import PortableText from './PortableText';

type CardImage = {
  alt?: string | null;
  asset?: { _id?: string | null; _ref?: string | null } | null;
} | null;

export default function Card({
  card,
  locale = 'th',
}: {
  card: CardFragmentType;
  locale?: 'th' | 'en';
}) {
  const localizedCard = card as CardFragmentType & {
    headingTh?: string | null;
    headingEn?: string | null;
    contentTh?: PortableTextBlock[] | null;
    contentEn?: PortableTextBlock[] | null;
    image?: CardImage;
  };
  const heading =
    locale === 'en'
      ? localizedCard.headingEn || localizedCard.headingTh || card.heading
      : localizedCard.headingTh || localizedCard.headingEn || card.heading;
  const content =
    locale === 'en'
      ? localizedCard.contentEn || localizedCard.contentTh || card.content
      : localizedCard.contentTh || localizedCard.contentEn || card.content;
  const imageUrl = localizedCard.image?.asset?._id
    ? (urlForImage(localizedCard.image)
        ?.width(900)
        .height(560)
        // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
        .fit('crop')
        .auto('format')
        .url() as string)
    : undefined;

  return (
    <article className="group h-full overflow-hidden rounded-[18px] border border-white/55 bg-white/58 shadow-[0_18px_46px_rgba(66,45,28,0.07)] backdrop-blur-[10px] transition-all duration-500 hover:-translate-y-1 hover:bg-white/70 hover:shadow-[0_26px_62px_rgba(66,45,28,0.12)]">
      <div className="relative m-3 mb-5 aspect-[16/10] overflow-hidden rounded-[14px] bg-white/35">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={localizedCard.image?.alt || heading || 'Drema Clinic card'}
            fill
            sizes="(max-width: 768px) 92vw, (max-width: 1280px) 45vw, 280px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-[linear-gradient(135deg,#fbf7f0_0%,#ead8bb_100%)]" />
        )}
      </div>
      <div className="px-5 pb-7">
        <h3 className="font-serif text-[1.65rem] font-semibold leading-[1.08] text-[#241f1a]">
          {heading}
        </h3>
        <span className="my-4 block h-px w-12 bg-[#b78b4f]" />
        <div className="text-[#675f55]">
          <PortableText
            className="text-sm leading-7"
            value={content as PortableTextBlock[]}
          />
        </div>
      </div>
    </article>
  );
}
