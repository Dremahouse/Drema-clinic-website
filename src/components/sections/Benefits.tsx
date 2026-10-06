import type { BenefitsSectionFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';

export default function BenefitsSection({
  section,
}: {
  section: BenefitsSectionFragmentType;
}) {
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {section.items?.map((item) => (
            <article
              key={item._key}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
              {item.description ? (
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
