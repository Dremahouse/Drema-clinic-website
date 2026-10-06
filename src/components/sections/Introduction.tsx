import type { PortableTextBlock } from 'next-sanity';
import { Image } from 'next-sanity/image';
import { urlForImage } from '@/lib/sanity/client/utils';
import type { IntroductionSectionFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import PortableText from '../modules/PortableText';

export default function IntroductionSection({
  section,
}: {
  section: IntroductionSectionFragmentType;
}) {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
            {section.heading}
          </h2>
          <PortableText value={section.content as PortableTextBlock[]} />
        </div>
        {section.image?.asset ? (
          <Image
            src={
              urlForImage(section.image)
                ?.width(1200)
                .height(900)
                .url() as string
            }
            alt={section.heading || 'Section image'}
            width={900}
            height={680}
            className="rounded-2xl border border-border object-cover"
          />
        ) : null}
      </div>
    </section>
  );
}
