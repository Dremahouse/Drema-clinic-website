import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import ReferencesSection from './ReferencesSection';

describe('ReferencesSection', () => {
  it('renders nothing when both legacy and structured references are empty', () => {
    const html = renderToStaticMarkup(
      <ReferencesSection legacy="" references={[]} locale="th" />
    );
    expect(html).toBe('');
  });

  it('renders nothing when legacy is null and structured is empty', () => {
    const html = renderToStaticMarkup(
      <ReferencesSection legacy={null} references={[]} locale="th" />
    );
    expect(html).toBe('');
  });

  it('renders nothing when legacy is undefined and structured is empty', () => {
    const html = renderToStaticMarkup(
      <ReferencesSection legacy={undefined} references={[]} locale="th" />
    );
    expect(html).toBe('');
  });

  it('renders Thai legacy references when provided', () => {
    const html = renderToStaticMarkup(
      <ReferencesSection legacy="แหล่งข้อมูลอ้างอิง" references={[]} locale="th" />
    );
    expect(html).toContain('แหล่งข้อมูลอ้างอิง');
    expect(html).toContain('แหล่งข้อมูลอ้างอิง');
  });

  it('renders English legacy references when provided', () => {
    const html = renderToStaticMarkup(
      <ReferencesSection
        legacy="Sources & References"
        references={[]}
        locale="en"
      />
    );
    expect(html).toContain('Sources &amp; References');
  });

  it('does not render legacy section when legacy is whitespace-only', () => {
    const html = renderToStaticMarkup(
      <ReferencesSection legacy="   " references={[]} locale="th" />
    );
    expect(html).toBe('');
  });

  it('renders structured references when provided', () => {
    const references = [
      {
        _key: '1',
        titleTh: 'บทความ',
        titleEn: 'Article',
        authors: 'Author A',
        source: 'Journal',
        year: '2020',
        doi: '10.1234/test',
      },
    ];
    const html = renderToStaticMarkup(
      <ReferencesSection legacy={null} references={references} locale="th" />
    );
    expect(html).toContain('บทความ');
    expect(html).toContain('Author A');
  });

  it('renders both legacy and structured references when both provided', () => {
    const references = [
      {
        _key: '1',
        titleTh: 'บทความ',
        titleEn: 'Article',
        authors: 'Author A',
        source: 'Journal',
        year: '2020',
      },
    ];
    const html = renderToStaticMarkup(
      <ReferencesSection
        legacy="แหล่งข้อมูลอ้างอิง"
        references={references}
        locale="th"
      />
    );
    expect(html).toContain('แหล่งข้อมูลอ้างอิง');
    expect(html).toContain('บทความ');
  });

  it('filters out empty structured references', () => {
    const references = [
      { _key: '1', titleTh: '', titleEn: '', authors: '', source: '' },
      {
        _key: '2',
        titleTh: 'บทความ',
        titleEn: 'Article',
        authors: 'Author A',
        source: 'Journal',
        year: '2020',
      },
    ];
    const html = renderToStaticMarkup(
      <ReferencesSection legacy={null} references={references} locale="th" />
    );
    expect(html).toContain('บทความ');
    expect(html).toContain('Author A');
  });

  it('renders DOI link for structured references', () => {
    const references = [
      {
        _key: '1',
        titleTh: 'บทความ',
        titleEn: 'Article',
        authors: 'Author A',
        source: 'Journal',
        year: '2020',
        doi: '10.1234/test',
      },
    ];
    const html = renderToStaticMarkup(
      <ReferencesSection legacy={null} references={references} locale="en" />
    );
    expect(html).toContain('10.1234/test');
    expect(html).toContain('https://doi.org/10.1234/test');
  });

  it('renders Thai heading for Thai locale', () => {
    const html = renderToStaticMarkup(
      <ReferencesSection legacy="test" references={[]} locale="th" />
    );
    expect(html).toContain('แหล่งข้อมูลอ้างอิง');
  });

  it('renders English heading for English locale', () => {
    const html = renderToStaticMarkup(
      <ReferencesSection legacy="test" references={[]} locale="en" />
    );
    expect(html).toContain('Sources &amp; References');
  });
});
