import { motion } from 'framer-motion';
import HoverScale from '@/components/effects/HoverScale';
import Link from '@/components/modules/Link';
import type { PricingSectionFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import {
  isEffectEnabled,
  staggerDelay,
  type SectionEffects,
} from '@/utils/effects';

export default function PricingSection({
  section,
}: {
  section: PricingSectionFragmentType;
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
        {section.note ? (
          <p className="mb-8 max-w-3xl text-muted-foreground">{section.note}</p>
        ) : null}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {section.plans?.map((plan, index) => {
            const card = (
              <article
                key={`${plan._key}-card`}
                className={`h-full rounded-2xl border p-6 shadow-sm transition-shadow hover:shadow-md ${plan.highlight ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}
              >
                <h3 className="mb-1 text-xl font-semibold">{plan.title}</h3>
                <p className="mb-4 text-2xl font-bold">{plan.price}</p>
                <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
                  {plan.features?.map((feature, idx) => (
                    <li key={`${plan._key}-${idx}`}>• {feature}</li>
                  ))}
                </ul>
                {plan.cta?.link ? (
                  <Link
                    className="font-medium text-primary hover:underline"
                    link={plan.cta.link}
                  >
                    {plan.cta.text || 'Contact us'}
                  </Link>
                ) : null}
              </article>
            );

            const animated = useStagger ? (
              <motion.div
                key={`${plan._key}-motion`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.42,
                  delay: staggerDelay(index, 0.05, 0.25),
                }}
                className="h-full"
              >
                {card}
              </motion.div>
            ) : (
              card
            );

            return useHover ? (
              <HoverScale key={plan._key} className="h-full" scale={1.015}>
                {animated}
              </HoverScale>
            ) : (
              <div key={plan._key} className="h-full">
                {animated}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
