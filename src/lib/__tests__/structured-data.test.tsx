import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import ReferencesSection from '@/components/modules/ReferencesSection';

describe('WebPage entity identity', () => {
  it('builds TH WebPage @id from canonical URL', () => {
    const url = 'https://drema.example/th/blog/sample-article';
    const expected = `${url}#webpage`;
    expect(expected).toBe('https://drema.example/th/blog/sample-article#webpage');
  });

  it('builds EN WebPage @id from canonical URL', () => {
    const url = 'https://drema.example/en/blog/sample-article';
    const expected = `${url}#webpage`;
    expect(expected).toBe('https://drema.example/en/blog/sample-article#webpage');
  });

  it('WebPage isPartOf points to WebSite @id', () => {
    const origin = 'https://drema.example';
    const webpage = {
      '@type': 'WebPage',
      '@id': `${origin}/th/blog/sample#webpage`,
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
      },
    };
    expect(webpage.isPartOf['@id']).toBe(`${origin}/#website`);
  });

  it('BlogPosting mainEntityOfPage points to WebPage @id', () => {
    const canonical = 'https://drema.example/th/blog/sample';
    const blogPosting = {
      '@type': 'BlogPosting',
      mainEntityOfPage: `${canonical}#webpage`,
    };
    expect(blogPosting.mainEntityOfPage).toBe(`${canonical}#webpage`);
  });
});

describe('ReferencesSection', () => {
  it('renders nothing when both legacy and structured references are empty', () => {
    const html = renderToStaticMarkup(
      <ReferencesSection legacy={null} references={[]} locale="th" />
    );
    expect(html).toBe('');
  });

  it('renders legacy reference text when present', () => {
    const html = renderToStaticMarkup(
      <ReferencesSection legacy=" legacy text " references={[]} locale="th" />
    );
    expect(html).toContain('legacy text');
    expect(html).toContain('แหล่งข้อมูลอ้างอิง');
  });

  it('renders structured references with stable anchors', () => {
    const refs = [
      {
        _key: 'ref-a',
        titleTh: 'บทความ',
        authors: 'Author A',
        source: 'Journal',
        year: '2024',
        doi: '10.1234/abc',
      },
    ];
    const html = renderToStaticMarkup(
      <ReferencesSection legacy={null} references={refs} locale="th" />
    );
    expect(html).toContain('id="ref-1"');
    expect(html).toContain('https://doi.org/10.1234/abc');
    expect(html).toContain('Author A');
  });

  it('derives DOI URL only when doi is provided', () => {
    const refs = [
      {
        _key: 'ref-a',
        titleTh: 'บทความ',
        doi: '10.1234/abc',
      },
    ];
    const html = renderToStaticMarkup(
      <ReferencesSection legacy={null} references={refs} locale="th" />
    );
    expect(html).toContain('https://doi.org/10.1234/abc');
  });

  it('derives PMID URL only when pmid is provided', () => {
    const refs = [
      {
        _key: 'ref-b',
        titleTh: 'บทความ',
        pmid: '12345678',
      },
    ];
    const html = renderToStaticMarkup(
      <ReferencesSection legacy={null} references={refs} locale="th" />
    );
    expect(html).toContain('https://pubmed.ncbi.nlm.nih.gov/12345678/');
  });

  it('renders external URL safely when provided', () => {
    const refs = [
      {
        _key: 'ref-c',
        titleTh: 'บทความ',
        url: 'https://example.com/article',
      },
    ];
    const html = renderToStaticMarkup(
      <ReferencesSection legacy={null} references={refs} locale="th" />
    );
    expect(html).toContain('https://example.com/article');
  });

  it('does not fabricate metadata for empty reference fields', () => {
    const refs = [
      {
        _key: 'ref-d',
        titleTh: '',
        authors: '',
        source: '',
        year: '',
        doi: '',
        pmid: '',
        url: '',
      },
    ];
    const html = renderToStaticMarkup(
      <ReferencesSection legacy={null} references={refs} locale="th" />
    );
    expect(html).toBe('');
  });

  it('renders both legacy and structured references when both exist', () => {
    const refs = [
      {
        _key: 'ref-a',
        titleTh: 'โครงสร้าง',
        doi: '10.1234/abc',
      },
    ];
    const html = renderToStaticMarkup(
      <ReferencesSection legacy=" legacy text " references={refs} locale="th" />
    );
    expect(html).toContain('legacy text');
    expect(html).toContain('โครงสร้าง');
    expect(html).toContain('https://doi.org/10.1234/abc');
  });

  it('prefers English title for EN locale', () => {
    const refs = [
      {
        _key: 'ref-a',
        titleTh: 'TH Title',
        titleEn: 'EN Title',
        authors: 'Author',
      },
    ];
    const html = renderToStaticMarkup(
      <ReferencesSection legacy={null} references={refs} locale="en" />
    );
    expect(html).toContain('EN Title');
    expect(html).not.toContain('TH Title');
  });
});

describe('medicalReviewer structured data', () => {
  it('BlogPosting omits reviewedBy when medicalReviewer is absent', () => {
    const post: any = {
      _id: 'post-1',
      title: 'Sample',
      slug: 'sample',
      author: { _id: 'p1', firstName: 'A', lastName: 'B', slug: 'a-b' },
      medicalReviewer: undefined,
    };
    const jsonLd: any = {
      '@type': 'BlogPosting',
      '@id': 'https://drema.example/th/blog/sample#article',
      author: {
        '@type': 'Person',
        '@id': 'https://drema.example/#person-a-b',
      },
      publisher: {
        '@type': 'Organization',
        '@id': 'https://drema.example/#medical-clinic',
      },
      ...(post.medicalReviewer
        ? {
            reviewedBy: {
              '@type': 'Person',
              '@id': `https://drema.example/#person-${post.medicalReviewer.slug}`,
            },
          }
        : {}),
    };
    expect(jsonLd.reviewedBy).toBeUndefined();
  });

  it('BlogPosting includes reviewedBy with stable Person @id when reviewer exists', () => {
    const post: any = {
      _id: 'post-1',
      title: 'Sample',
      slug: 'sample',
      author: { _id: 'p1', firstName: 'A', lastName: 'B', slug: 'a-b' },
      medicalReviewer: { _id: 'p2', firstName: 'C', lastName: 'D', slug: 'c-d' },
    };
    const origin = 'https://drema.example';
    const jsonLd: any = {
      '@type': 'BlogPosting',
      '@id': 'https://drema.example/th/blog/sample#article',
      author: {
        '@type': 'Person',
        '@id': `${origin}/#person-a-b`,
      },
      publisher: {
        '@type': 'Organization',
        '@id': `${origin}/#medical-clinic`,
      },
      ...(post.medicalReviewer
        ? {
            reviewedBy: {
              '@type': 'Person',
              '@id': `${origin}/#person-${post.medicalReviewer.slug}`,
              name: `${post.medicalReviewer.firstName} ${post.medicalReviewer.lastName}`,
            },
          }
        : {}),
    };
    expect(jsonLd.reviewedBy).toEqual({
      '@type': 'Person',
      '@id': 'https://drema.example/#person-c-d',
      name: 'C D',
    });
  });
});
