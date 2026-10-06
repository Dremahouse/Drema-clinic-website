import { motion } from 'framer-motion';
import { Image } from 'next-sanity/image';
import HoverScale from '@/components/effects/HoverScale';
import { urlForImage } from '@/lib/sanity/client/utils';
import type { GallerySectionFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import {
  isEffectEnabled,
  staggerDelay,
  type SectionEffects,
} from '@/utils/effects';

export default function GallerySection({
  section,
}: {
  section: GallerySectionFragmentType;
}) {
  const useHover = isEffectEnabled(
    (section as { effects?: SectionEffects }).effects,
    'hoverScale',
    true
  );
  const useStagger = isEffectEnabled(
    (section as { effects?: SectionEffects }).effects,
    'stagger',
    true
  );

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-3 text-3xl font-semibold md:text-4xl">
          {section.heading}
        </h2>
        {section.intro ? (
          <p className="mb-8 max-w-3xl text-muted-foreground">
            {section.intro}
          </p>
        ) : null}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {section.images?.map((image, index) => {
            const imageRef = image.asset?._id
              ? { ...image, asset: { _ref: image.asset._id } }
              : undefined;

            const figure = (
              <figure
                key={`${image._key}-figure`}
                className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
              >
                <Image
                  src={
                    imageRef
                      ? (urlForImage(imageRef)
                          ?.width(800)
                          .height(600)
                          .url() as string)
                      : '/placeholder.jpg'
                  }
                  alt={image.alt || image.caption || 'Gallery image'}
                  width={800}
                  height={600}
                  className="h-44 w-full object-cover"
                />
              </figure>
            );

            const animated = useStagger ? (
              <motion.div
                key={`${image._key}-motion`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.4,
                  delay: staggerDelay(index, 0.04, 0.24),
                }}
              >
                {figure}
              </motion.div>
            ) : (
              figure
            );

            return useHover ? (
              <HoverScale key={image._key}>{animated}</HoverScale>
            ) : (
              <div key={image._key}>{animated}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
