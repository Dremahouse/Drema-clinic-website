'use client';

import { motion } from 'framer-motion';
import { Image } from 'next-sanity/image';
import Link from '@/components/modules/Link';
import { urlForImage } from '@/lib/sanity/client/utils';
import type { LinkFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';

type TechnologyShowcaseSection = {
  heading?: string;
  intro?: string;
  featured?: {
    label?: string;
    title?: string;
    subtitle?: string;
    image?: {
      alt?: string;
      asset?: {
        _id?: string | null;
        _ref?: string | null;
      } | null;
    } | null;
    mobileImage?: {
      alt?: string;
      asset?: {
        _id?: string | null;
        _ref?: string | null;
      } | null;
    } | null;
  } | null;
  sideItems?: Array<{
    _key?: string;
    title?: string;
    subtitle?: string;
    image?: {
      alt?: string;
      asset?: {
        _id?: string | null;
        _ref?: string | null;
      } | null;
    } | null;
    mobileImage?: {
      alt?: string;
      asset?: {
        _id?: string | null;
        _ref?: string | null;
      } | null;
    } | null;
  }> | null;
  ctaText?: string;
  ctaLink?: LinkFragmentType;
};

export default function TechnologyShowcaseSection({
  section,
}: {
  section: TechnologyShowcaseSection;
}) {
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  const featured = section.featured;
  const sideItems = section.sideItems || [];

  return (
    <section className="bg-[linear-gradient(180deg,var(--marketing-surface-1)_0%,var(--marketing-surface-2)_100%)] py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          className="mx-auto mb-12 max-w-3xl text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.span
            className="mx-auto mb-5 block h-px w-16 rounded-full bg-[var(--marketing-brand)]/55"
            variants={itemVariants}
            transition={{ duration: 0.7, ease: [0.22, 0.85, 0.2, 1] }}
          />
          <motion.h2
            variants={itemVariants}
            transition={{ duration: 0.7, ease: [0.22, 0.85, 0.2, 1] }}
            className="text-4xl font-serif tracking-tight text-[var(--marketing-ink)] md:text-5xl"
          >
            {section.heading}
          </motion.h2>
          {section.intro ? (
            <motion.p
              variants={itemVariants}
              transition={{ duration: 0.7, ease: [0.22, 0.85, 0.2, 1] }}
              className="mt-5 text-base leading-8 text-[var(--marketing-copy)] md:text-lg"
            >
              {section.intro}
            </motion.p>
          ) : null}
        </motion.div>

        <motion.div
          className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.83fr)] xl:gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.1, delayChildren: 0.08 },
            },
          }}
        >
          <motion.article
            variants={itemVariants}
            transition={{ duration: 0.75, ease: [0.22, 0.85, 0.2, 1] }}
            className="group relative overflow-hidden rounded-[1.9rem] border border-[var(--marketing-border)] bg-white transition-all duration-500 hover:-translate-y-0.5"
          >
            <div className="h-[420px] md:h-[500px] xl:h-[540px]">
              {featured?.mobileImage?.asset ? (
                <Image
                  src={
                    (urlForImage(featured.mobileImage)
                      ?.width(1200)
                      .height(1200)
                      .url() as string) || '/placeholder.jpg'
                  }
                  alt={
                    featured.mobileImage.alt ||
                    featured.image?.alt ||
                    featured.title ||
                    'Featured technology'
                  }
                  width={1200}
                  height={1200}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02] md:hidden"
                />
              ) : null}
              {featured?.image?.asset ? (
                <Image
                  src={
                    (urlForImage(featured.image)
                      ?.width(1800)
                      .height(1280)
                      .url() as string) || '/placeholder.jpg'
                  }
                  alt={featured.image.alt || featured.title || 'Featured technology'}
                  width={1800}
                  height={1280}
                  className={`h-full w-full object-cover transition duration-700 group-hover:scale-[1.02] ${featured?.mobileImage?.asset ? 'hidden md:block' : ''}`}
                />
              ) : !featured?.mobileImage?.asset ? (
                <div className="h-full w-full bg-[var(--marketing-surface-2)]" />
              ) : null}
            </div>
                <div className="absolute bottom-5 left-5 right-5 md:bottom-6 md:left-6 md:right-6">
                  <div className="max-w-[24rem] rounded-[1.4rem] bg-[linear-gradient(90deg,rgba(22,17,11,0.62)_0%,rgba(22,17,11,0.42)_58%,rgba(22,17,11,0.12)_86%,rgba(22,17,11,0)_100%)] px-4 py-4 md:px-5">
                    <div className="flex items-start gap-3.5">
                      <span className="mt-1 h-[5.4rem] w-px shrink-0 bg-[linear-gradient(180deg,rgba(227,203,165,0.95)_0%,rgba(227,203,165,0.35)_100%)]" />
                      <div>
                        <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-white/78">
                          {featured?.label || 'Featured Technology'}
                        </p>
                        <h3
                          className="font-serif text-[1.95rem] leading-none tracking-tight text-white md:text-[2.2rem]"
                          style={{ textShadow: '0 3px 16px rgba(10, 8, 6, 0.28)' }}
                        >
                          {featured?.title || 'Technology Name'}
                        </h3>
                        {featured?.subtitle ? (
                          <p
                            className="mt-2 text-sm leading-6 text-white/92 md:text-[15px]"
                            style={{ textShadow: '0 2px 12px rgba(10, 8, 6, 0.22)' }}
                          >
                            {featured.subtitle}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
          </motion.article>

          <div className="flex flex-col gap-6">
            {sideItems.map((item, index) => (
              <motion.article
                key={item._key}
                variants={itemVariants}
                transition={{
                  duration: 0.72,
                  delay: index * 0.1,
                  ease: [0.22, 0.85, 0.2, 1],
                }}
                className="group relative overflow-hidden rounded-[1.7rem] border border-[var(--marketing-border)] bg-white transition-all duration-500 hover:-translate-y-0.5"
              >
                <div className="h-60 md:h-64">
                  {item.mobileImage?.asset ? (
                    <Image
                      src={
                        (urlForImage(item.mobileImage)
                          ?.width(1200)
                          .height(1200)
                          .url() as string) || '/placeholder.jpg'
                      }
                      alt={
                        item.mobileImage.alt ||
                        item.image?.alt ||
                        item.title ||
                        'Technology image'
                      }
                      width={1200}
                      height={1200}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02] md:hidden"
                    />
                  ) : null}
                  {item.image?.asset ? (
                    <Image
                      src={
                        (urlForImage(item.image)
                          ?.width(960)
                          .height(680)
                          .url() as string) || '/placeholder.jpg'
                      }
                      alt={item.image.alt || item.title || 'Technology image'}
                      width={960}
                      height={680}
                      className={`h-full w-full object-cover transition duration-700 group-hover:scale-[1.02] ${item.mobileImage?.asset ? 'hidden md:block' : ''}`}
                    />
                  ) : !item.mobileImage?.asset ? (
                    <div className="h-full w-full bg-[var(--marketing-surface-2)]" />
                  ) : null}
                </div>
                <div className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-5 md:right-5">
                  <div className="max-w-[13rem] rounded-[1.1rem] bg-[linear-gradient(90deg,rgba(24,18,12,0.62)_0%,rgba(24,18,12,0.36)_64%,rgba(24,18,12,0)_100%)] px-3.5 py-3">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 h-11 w-px shrink-0 bg-[linear-gradient(180deg,rgba(227,203,165,0.92)_0%,rgba(227,203,165,0.28)_100%)]" />
                      <div>
                        <h4
                          className="font-serif text-[1.55rem] leading-none text-white"
                          style={{ textShadow: '0 2px 12px rgba(10, 8, 6, 0.24)' }}
                        >
                          {item.title}
                        </h4>
                        {item.subtitle ? (
                          <p
                            className="mt-1.5 text-[13px] leading-5 text-white/88"
                            style={{ textShadow: '0 2px 10px rgba(10, 8, 6, 0.2)' }}
                          >
                            {item.subtitle}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {section.ctaLink ? (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.22, 0.85, 0.2, 1], delay: 0.08 }}
          >
            <Link
              link={section.ctaLink}
              className="inline-flex rounded-full border border-[var(--marketing-border-strong)] bg-[color:rgba(255,255,255,0.9)] px-8 py-3 text-sm font-medium tracking-wide text-[var(--marketing-brand)] transition-all duration-500 hover:-translate-y-[1px]"
              data-ui="button"
            >
              {section.ctaText || 'View All Treatments'}
            </Link>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
