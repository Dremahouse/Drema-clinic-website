import Link from 'next/link';

type Reference = {
  _key?: string;
  titleTh?: string | null;
  titleEn?: string | null;
  authors?: string | null;
  source?: string | null;
  year?: string | null;
  url?: string | null;
  doi?: string | null;
  pmid?: string | null;
  volume?: string | null;
  issue?: string | null;
  pages?: string | null;
};

type Props = {
  legacy?: string | null;
  references?: Reference[] | null;
  locale: 'th' | 'en';
};

function looksLikeUrl(value: string) {
  return /^https?:\/\//i.test(value.trim());
}

function renderReferenceUrl(ref: Reference) {
  const doi = ref.doi?.trim();
  if (doi) {
    return {
      href: `https://doi.org/${doi}`,
      label: doi,
    };
  }

  const pmid = ref.pmid?.trim();
  if (pmid) {
    return {
      href: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
      label: pmid,
    };
  }

  const url = ref.url?.trim();
  if (url && looksLikeUrl(url)) {
    return {
      href: url,
      label: new URL(url).hostname + new URL(url).pathname,
    };
  }

  return null;
}

function isReferenceEmpty(ref: Reference) {
  const title = ref.titleTh || ref.titleEn;
  const hasContent =
    title ||
    ref.authors ||
    ref.source ||
    ref.year ||
    ref.url ||
    ref.doi ||
    ref.pmid ||
    ref.volume ||
    ref.issue ||
    ref.pages;
  return !hasContent;
}

function StructuredReferenceItem({
  reference,
  locale,
  index,
}: {
  reference: Reference;
  locale: 'th' | 'en';
  index: number;
}) {
  const title =
    locale === 'en'
      ? reference.titleEn || reference.titleTh
      : reference.titleTh || reference.titleEn;
  const metadataParts = [
    reference.authors,
    reference.source,
    reference.year,
    reference.volume,
    reference.issue,
    reference.pages,
  ]
    .filter(Boolean)
    .map((part) => String(part).trim())
    .filter(Boolean);

  const link = renderReferenceUrl(reference);

  return (
    <li id={`ref-${index + 1}`} className="mb-3 scroll-mt-24">
      <div className="text-sm leading-relaxed text-[#5f5244] md:text-base">
        {title ? <strong>{title}</strong> : null}
        {metadataParts.length > 0 ? (
          <span>
            {title ? ' ' : ''}
            {metadataParts.join(' ')}
          </span>
        ) : null}
        {link ? (
          <span>
            {title || metadataParts.length ? ' ' : ''}
            <Link
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {link.label}
            </Link>
          </span>
        ) : null}
      </div>
    </li>
  );
}

export default function ReferencesSection({
  legacy,
  references,
  locale,
}: Props) {
  const hasLegacy = Boolean(legacy?.trim());
  const structuredReferences = (
    Array.isArray(references) ? references : []
  ).filter((ref) => !isReferenceEmpty(ref));
  const hasStructured = structuredReferences.length > 0;

  if (!hasLegacy && !hasStructured) {
    return null;
  }

  const isEn = locale === 'en';

  return (
    <section className="mx-auto mt-12 max-w-5xl rounded-2xl border border-[#dfd3bf] bg-[#fcfaf7]">
      <div className="px-5 py-4 md:px-6">
        <h2 className="font-serif text-xl text-[#3f3124] md:text-2xl">
          {isEn ? 'Sources & References' : 'แหล่งข้อมูลอ้างอิง'}
        </h2>
      </div>

      {hasLegacy ? (
        <div className="border-t border-[#dfd3bf] px-5 py-5 md:px-6">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#5f5244] md:text-base">
            {legacy}
          </p>
        </div>
      ) : null}

      {hasStructured ? (
        <div
          className={
            hasLegacy
              ? 'border-t border-[#dfd3bf] px-5 py-5 md:px-6'
              : 'px-5 py-5 md:px-6'
          }
        >
          <ol className="list-decimal space-y-1 pl-5">
            {structuredReferences.map((ref, index) => (
              <StructuredReferenceItem
                key={ref._key || `reference-${index}`}
                reference={ref}
                locale={locale}
                index={index}
              />
            ))}
          </ol>
        </div>
      ) : null}
    </section>
  );
}
