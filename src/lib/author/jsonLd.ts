import { toPlainText } from '@portabletext/toolkit';
import type { BlockContent } from '@/sanity.types';

export type CitationSummaryValue = string | BlockContent | null | undefined;

function citationSummaryToPlainText(
  summary: CitationSummaryValue
): string | undefined {
  if (typeof summary === 'string') {
    return summary || undefined;
  }

  if (Array.isArray(summary)) {
    return toPlainText(summary) || undefined;
  }

  return undefined;
}

export function getLocalizedCitationSummary(
  locale: string,
  citationSummaryTh: CitationSummaryValue,
  citationSummaryEn: CitationSummaryValue
): string | undefined {
  const preferred = locale === 'en' ? citationSummaryEn : citationSummaryTh;
  const fallback = locale === 'en' ? citationSummaryTh : citationSummaryEn;

  return (
    citationSummaryToPlainText(preferred) ||
    citationSummaryToPlainText(fallback)
  );
}
