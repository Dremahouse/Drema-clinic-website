'use client';

/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import Image from 'next/image';
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from 'next-sanity';
import { usePathname } from 'next/navigation';
import type { PropsWithChildren, ReactNode } from 'react';
import Link from '@/components/modules/Link';
import SocialEmbed from '@/components/modules/SocialEmbed';
import { urlForImage } from '@/lib/sanity/client/utils';
import type { LinkFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import { cn } from '@/lib/utils';
import { parseChildrenToSlug } from '@/utils/strings';

interface SocialEmbedValue {
  _type?: string;
  _key?: string;
  url?: string;
  platform?: 'facebook' | 'instagram';
}

type HeadingProps = PropsWithChildren<{
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  id: string;
  className?: string;
}>;

type ComparisonTableRow = {
  _key?: string;
  cells?: string[];
  label?: string;
  leftValue?: string;
  rightValue?: string;
};

type ComparisonTableColumn = {
  _key?: string;
  title?: string;
};

type ComparisonTableValue = {
  title?: string;
  columns?: ComparisonTableColumn[];
  labelColumnHeader?: string;
  leftColumnHeader?: string;
  rightColumnHeader?: string;
  rows?: ComparisonTableRow[];
};

function Heading({ as, id, children, className = '' }: HeadingProps) {
  const Element = as;
  return (
    <Element className={cn('relative group', className)}>
      {children}
      <a
        href={`#${id}`}
        className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <title>Anchor</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      </a>
    </Element>
  );
}

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string;
  value: PortableTextBlock[];
}) {
  const pathname = usePathname() || '/th';
  const locale: 'th' | 'en' = pathname.startsWith('/en') ? 'en' : 'th';

  const normalizeMarkLink = (value?: any): LinkFragmentType | null => {
    if (!value) return null;
    const fromRoot = value?.type ? value : null;
    const fromNested = value?.customLink?.type ? value.customLink : null;

    // Prefer the link object that already has resolved internal.slug
    if (fromRoot?.type === 'internal' && fromRoot?.internal?.slug) {
      return fromRoot as LinkFragmentType;
    }
    if (fromNested?.type === 'internal' && fromNested?.internal?.slug) {
      return fromNested as LinkFragmentType;
    }

    // Fallbacks for external links or unresolved structures
    if (fromRoot?.type) return fromRoot as LinkFragmentType;
    if (fromNested?.type) return fromNested as LinkFragmentType;
    return null;
  };

  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => (
        <p className="mb-8 text-[1.16rem] leading-[1.9] text-[#4f4a42]">{children}</p>
      ),
      h1: ({ children, value }) => (
        <Heading
          as="h1"
          id={parseChildrenToSlug(value.children)}
          className="mb-8 scroll-mt-24 border-b border-[#e2d7c5] pb-3 font-serif text-3xl text-[#3f3124] md:text-4xl"
        >
          {children}
        </Heading>
      ),
      h2: ({ children, value }) => (
        <Heading
          as="h2"
          id={parseChildrenToSlug(value.children)}
          className="mb-7 mt-12 scroll-mt-24 border-b border-[#eadfce] pb-2 font-serif text-3xl text-[#3f3124] md:text-4xl"
        >
          {children}
        </Heading>
      ),
      h3: ({ children, value }) => (
        <Heading
          as="h3"
          id={parseChildrenToSlug(value.children)}
          className="mb-5 mt-10 scroll-mt-24 font-serif text-2xl text-[#4a3a2b] md:text-3xl"
        >
          {children}
        </Heading>
      ),
      h4: ({ children, value }) => (
        <Heading
          as="h4"
          id={parseChildrenToSlug(value.children)}
          className="mb-4 mt-8 scroll-mt-24 text-xl font-semibold text-[#4a3a2b] md:text-2xl"
        >
          {children}
        </Heading>
      ),
      h5: ({ children, value }) => (
        <Heading
          as="h5"
          id={parseChildrenToSlug(value.children)}
          className="text-lg md:text-xl font-bold mb-4 text-gray-900 scroll-mt-20"
        >
          {children}
        </Heading>
      ),
      h6: ({ children, value }) => (
        <Heading
          as="h6"
          id={parseChildrenToSlug(value.children)}
          className="text-base md:text-lg font-bold mb-4 text-gray-900 scroll-mt-20"
        >
          {children}
        </Heading>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-8 rounded-r-2xl border-l-4 border-[#b99867] bg-[#f8f2e8] py-4 pr-5 pl-5 italic text-[#665543]">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="mb-8 ml-6 list-outside list-disc space-y-3 text-[#4f4a42]">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="mb-8 ml-6 list-outside list-decimal space-y-3 text-[#4f4a42]">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li className="pl-2">{children}</li>,
      number: ({ children }) => <li className="pl-2">{children}</li>,
    },
    marks: {
      code: ({ children }) => (
        <code className="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm">
          {children}
        </code>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      link: ({
        children,
        value,
      }: {
        children: ReactNode;
        value?: { customLink?: LinkFragmentType } & LinkFragmentType;
      }) => {
        const customLink = normalizeMarkLink(value);

        if (!customLink) {
          return <>{children}</>;
        }

        return (
          <Link
            link={customLink}
            locale={locale}
            className="text-primary hover:no-underline underline"
          >
            {children}
          </Link>
        );
      },
      customLink: ({
        children,
        value,
      }: {
        children: ReactNode;
        value?: { customLink?: LinkFragmentType } & LinkFragmentType;
      }) => {
        const customLink = normalizeMarkLink(value);
        if (!customLink) return <>{children}</>;
        return (
          <Link
            link={customLink}
            locale={locale}
            className="text-primary hover:no-underline underline"
          >
            {children}
          </Link>
        );
      },
      strong: ({ children }) => (
        <strong className="font-bold">{children}</strong>
      ),
      'strike-through': ({ children }) => (
        <del className="line-through">{children}</del>
      ),
      underline: ({ children }) => <u className="underline">{children}</u>,
      sup: ({ children }) => <sup className="text-xs">{children}</sup>,
      sub: ({ children }) => <sub className="text-xs">{children}</sub>,
    },
    types: {
      image: (props) => {
        const { value } = props;
        if (!value) {
          return null;
        }

        const src = urlForImage(value)?.width(1200).height(800).fit('crop').url();
        if (!src) return null;

        return (
          <div className="my-10 overflow-hidden rounded-2xl border border-[#dfd3bf] bg-white shadow-[0_16px_30px_-24px_rgba(91,76,55,0.5)]">
            <Image
              width="1000"
              height="667"
              src={src}
              alt={value?.alt || ''}
              className="h-auto w-full"
              unoptimized
            />
          </div>
        );
      },
      comparisonTable: ({ value }: { value: ComparisonTableValue }) => {
        const rows = Array.isArray(value?.rows) ? value.rows : [];
        const columns = Array.isArray(value?.columns)
          ? value.columns
          : [
              { title: value?.labelColumnHeader || 'หัวข้อ' },
              { title: value?.leftColumnHeader },
              { title: value?.rightColumnHeader },
            ].filter((column) => column.title);
        if (!rows.length || !columns.length) return null;

        return (
          <section className="my-10 overflow-hidden rounded-2xl border border-[#dfd3bf] bg-white shadow-[0_16px_30px_-24px_rgba(91,76,55,0.5)]">
            {value?.title ? (
              <h3 className="border-b border-[#dfd3bf] bg-[#f8f2e8] px-5 py-4 text-center font-serif text-xl text-[#3f3124] md:px-6 md:text-2xl">
                {value.title}
              </h3>
            ) : null}
            <div className="overflow-x-auto">
              <table className="min-w-max w-full border-collapse text-left text-sm text-[#4f4a42] md:text-base">
                <thead className="bg-[#e8dcc8] text-[#4d3d2e]">
                  <tr>
                    {columns.map((column, index) => (
                      <th
                        key={column._key || `${column.title}-${index}`}
                        scope="col"
                        className="min-w-44 px-5 py-4 font-semibold md:px-6"
                      >
                        {column.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => {
                    const cells = Array.isArray(row.cells)
                      ? row.cells
                      : [row.label, row.leftValue, row.rightValue];

                    return (
                      <tr key={row._key || `row-${rowIndex}`} className="border-t border-[#efe4d3] align-top">
                        {columns.map((column, columnIndex) => {
                          const cell = cells[columnIndex];
                          const className =
                            columnIndex === 0
                              ? 'min-w-44 bg-[#fcfaf7] px-5 py-4 font-semibold text-[#3f3124] md:px-6'
                              : 'min-w-44 px-5 py-4 md:px-6';

                          return columnIndex === 0 ? (
                            <th
                              key={column._key || `${rowIndex}-${columnIndex}`}
                              scope="row"
                              className={className}
                            >
                              {cell}
                            </th>
                          ) : (
                            <td key={column._key || `${rowIndex}-${columnIndex}`} className={className}>
                              {cell}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        );
      },
      socialEmbed: ({ value }) => {
        const v = value as SocialEmbedValue | undefined;
        if (!v?.url) return null;
        return <SocialEmbed url={v.url} locale={locale} />;
      },
    },
  };

  return (
    <div className={cn('article-rich', className)}>
      <PortableText components={components} value={value} />
    </div>
  );
}
