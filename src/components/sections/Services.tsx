import { motion } from 'framer-motion';
import { Image } from 'next-sanity/image';
import HoverScale from '@/components/effects/HoverScale';
import Link from '@/components/modules/Link';
import { urlForImage } from '@/lib/sanity/client/utils';
import type { ServicesSectionFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import {
  isEffectEnabled,
  staggerDelay,
  type SectionEffects,
} from '@/utils/effects';

export default function ServicesSection({
  section,
}: {
  section: ServicesSectionFragmentType;
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {section.items?.map((item, index) => {
            const card = (
              <article
                key={`${item._key}-card`}
                className="h-full rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                {item.image?.asset ? (
                  <Image
                    src={
                      urlForImage(item.image)
                        ?.width(640)
                        .height(420)
                        .url() as string
                    }
                    alt={item.title || 'Service image'}
                    width={640}
                    height={420}
                    className="mb-4 h-40 w-full rounded-xl object-cover"
                  />
                ) : null}
                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                {item.summary ? (
                  <p className="mb-4 text-sm text-muted-foreground">
                    {item.summary}
                  </p>
                ) : null}
                {item.link ? (
                  <Link
                    className="text-sm font-medium text-primary hover:underline"
                    link={item.link}
                  >
                    Learn more
                  </Link>
                ) : null}
              </article>
            );

            const animated = useStagger ? (
              <motion.div
                key={`${item._key}-motion`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: staggerDelay(index) }}
                className="h-full"
              >
                {card}
              </motion.div>
            ) : (
              card
            );

            return useHover ? (
              <HoverScale key={item._key} className="h-full">
                {animated}
              </HoverScale>
            ) : (
              <div key={item._key} className="h-full">
                {animated}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
