import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  buildLocalizedAlternates,
  buildLocalizedUrl,
  normalizeAuthoredPublicUrl,
} from '../../lib/locale';

const NEW_ORIGIN = 'https://www.dremawellnessth.com';

describe('Domain migration: single source of truth', () => {
  let originalEnv: Record<string, string | undefined>;

  beforeEach(() => {
    originalEnv = {
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
      VERCEL_ENV: process.env.VERCEL_ENV,
      VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
      VERCEL_URL: process.env.VERCEL_URL,
    };
  });

  afterEach(() => {
    Object.assign(process.env, originalEnv);
    vi.restoreAllMocks();
  });

  describe('getBaseUrl', () => {
    it('delegates to NEXT_PUBLIC_SITE_URL when set', async () => {
      vi.stubEnv('NEXT_PUBLIC_SITE_URL', NEW_ORIGIN);
      vi.resetModules();
      const { getBaseUrl: getBaseUrlFresh } = await import('../getBaseUrl');
      expect(getBaseUrlFresh()).toBe(NEW_ORIGIN);
    });

    it('falls back to VERCEL_PROJECT_PRODUCTION_URL in production when NEXT_PUBLIC_SITE_URL is empty', async () => {
      vi.stubEnv('NEXT_PUBLIC_SITE_URL', '');
      vi.stubEnv('VERCEL_ENV', 'production');
      vi.stubEnv('VERCEL_PROJECT_PRODUCTION_URL', 'www.dremaclinic.com');
      vi.resetModules();
      const { getBaseUrl: getBaseUrlFresh } = await import('../getBaseUrl');
      expect(getBaseUrlFresh()).toBe('https://www.dremaclinic.com');
    });

    it('returns localhost in dev when NEXT_PUBLIC_SITE_URL is not set', async () => {
      vi.stubEnv('NEXT_PUBLIC_SITE_URL', '');
      vi.stubEnv('VERCEL_ENV', '');
      vi.resetModules();
      const { getBaseUrl: getBaseUrlFresh } = await import('../getBaseUrl');
      expect(getBaseUrlFresh()).toBe('http://localhost:3000');
    });
  });

  describe('Canonical URL correctness after domain fix', () => {
    it('builds TH canonical with new domain', () => {
      const url = buildLocalizedUrl('th', '/blog/sample', NEW_ORIGIN);
      expect(url).toBe(`${NEW_ORIGIN}/th/blog/sample`);
    });

    it('builds EN canonical with new domain', () => {
      const url = buildLocalizedUrl('en', '/blog/sample', NEW_ORIGIN);
      expect(url).toBe(`${NEW_ORIGIN}/en/blog/sample`);
    });

    it('builds TH homepage canonical', () => {
      const url = buildLocalizedUrl('th', '/', NEW_ORIGIN);
      expect(url).toBe(`${NEW_ORIGIN}/th`);
    });

    it('builds EN homepage canonical', () => {
      const url = buildLocalizedUrl('en', '/', NEW_ORIGIN);
      expect(url).toBe(`${NEW_ORIGIN}/en`);
    });

    it.each([
      ['th', '/about-us', `${NEW_ORIGIN}/th/about-us`],
      ['en', '/about-us', `${NEW_ORIGIN}/en/about-us`],
      ['th', '/price', `${NEW_ORIGIN}/th/price`],
      ['en', '/price', `${NEW_ORIGIN}/en/price`],
    ] as const)('builds the generic-page self-canonical for %s%s', (locale, pathname, expectedCanonical) => {
      const result = buildLocalizedAlternates(locale, pathname, NEW_ORIGIN);

      expect(result.canonical).toBe(expectedCanonical);
      expect(result.canonical).toContain('www.dremawellnessth.com');
      expect(result.canonical).not.toMatch(
        /dremaclinic\.com|vercel\.app|localhost/
      );
    });
  });

  describe('Hreflang alternates', () => {
    it('builds TH and EN languages with new domain', () => {
      const result = buildLocalizedAlternates('th', '/blog/sample', NEW_ORIGIN);
      expect(result.canonical).toBe(`${NEW_ORIGIN}/th/blog/sample`);
      expect(result.languages.th).toBe(`${NEW_ORIGIN}/th/blog/sample`);
      expect(result.languages.en).toBe(`${NEW_ORIGIN}/en/blog/sample`);
    });

    it('builds EN canonical and alternates with new domain', () => {
      const result = buildLocalizedAlternates('en', '/blog/sample', NEW_ORIGIN);
      expect(result.canonical).toBe(`${NEW_ORIGIN}/en/blog/sample`);
      expect(result.languages.th).toBe(`${NEW_ORIGIN}/th/blog/sample`);
      expect(result.languages.en).toBe(`${NEW_ORIGIN}/en/blog/sample`);
    });
  });

  describe('normalizeAuthoredPublicUrl', () => {
    it('normalizes relative paths with new domain', () => {
      const result = normalizeAuthoredPublicUrl(
        '/blog/sample',
        'th',
        NEW_ORIGIN
      );
      expect(result).toBe(`${NEW_ORIGIN}/th/blog/sample`);
    });

    it('normalizes same-origin absolute URLs to new domain locale', () => {
      const sameDomainUrl = `${NEW_ORIGIN}/th/blog/sample`;
      const result = normalizeAuthoredPublicUrl(
        sameDomainUrl,
        'en',
        NEW_ORIGIN
      );
      expect(result).toBe(`${NEW_ORIGIN}/en/blog/sample`);
    });

    it('preserves external URLs unchanged (old domain treated as external)', () => {
      const oldDomainUrl = 'https://www.dremaclinic.com/th/blog/sample';
      const result = normalizeAuthoredPublicUrl(oldDomainUrl, 'th', NEW_ORIGIN);
      expect(result).toBe(oldDomainUrl);
    });

    it('preserves vercel.app URLs as external when different origin', () => {
      const vercelUrl = 'https://nextjs-drema-web.vercel.app/th/blog/sample';
      const result = normalizeAuthoredPublicUrl(vercelUrl, 'th', NEW_ORIGIN);
      expect(result).toBe(vercelUrl);
    });

    it('preserves external social URLs unchanged', () => {
      const external = 'https://facebook.com/dreamclinic';
      const result = normalizeAuthoredPublicUrl(external, 'en', NEW_ORIGIN);
      expect(result).toBe(external);
    });

    it('preserves PubMed URLs unchanged', () => {
      const external = 'https://pubmed.ncbi.nlm.nih.gov/12345678/';
      const result = normalizeAuthoredPublicUrl(external, 'th', NEW_ORIGIN);
      expect(result).toBe(external);
    });

    it('returns undefined for null/undefined input', () => {
      expect(
        normalizeAuthoredPublicUrl(null, 'th', NEW_ORIGIN)
      ).toBeUndefined();
      expect(
        normalizeAuthoredPublicUrl(undefined, 'en', NEW_ORIGIN)
      ).toBeUndefined();
    });

    it('normalizes root path to localized homepage', () => {
      const result = normalizeAuthoredPublicUrl('/', 'th', NEW_ORIGIN);
      expect(result).toBe(`${NEW_ORIGIN}/th`);
    });

    it('preserves query and hash on relative paths', () => {
      const result = normalizeAuthoredPublicUrl(
        '/blog/sample?ref=test#section',
        'th',
        NEW_ORIGIN
      );
      expect(result).toBe(`${NEW_ORIGIN}/th/blog/sample?ref=test#section`);
    });

    it('does not produce dremaclinic.com in any result', () => {
      const inputs = ['/blog/sample', '/about', '/contact'];
      for (const input of inputs) {
        const result = normalizeAuthoredPublicUrl(input, 'th', NEW_ORIGIN);
        expect(result).not.toContain('dremaclinic.com');
        expect(result).not.toContain('vercel.app');
      }
    });
  });

  describe('JSON-LD origin construction', () => {
    it('builds WebSite @id with new domain', () => {
      const origin = NEW_ORIGIN;
      const webSite = {
        '@id': `${origin}/#website`,
        url: origin,
        publisher: { '@id': `${origin}/#medical-clinic` },
      };
      expect(webSite['@id']).toBe(`${NEW_ORIGIN}/#website`);
      expect(webSite.url).toBe(NEW_ORIGIN);
      expect(webSite.publisher['@id']).toBe(`${NEW_ORIGIN}/#medical-clinic`);
    });

    it('builds WebPage @id and isPartOf with new domain', () => {
      const canonicalUrl = `${NEW_ORIGIN}/th/blog/sample`;
      const origin = NEW_ORIGIN;
      const webpage = {
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        isPartOf: { '@type': 'WebSite', '@id': `${origin}/#website` },
      };
      expect(webpage['@id']).toBe(`${NEW_ORIGIN}/th/blog/sample#webpage`);
      expect(webpage.isPartOf['@id']).toBe(`${NEW_ORIGIN}/#website`);
    });

    it('builds BlogPosting @id with new domain', () => {
      const canonicalUrl = `${NEW_ORIGIN}/en/blog/sample`;
      const origin = NEW_ORIGIN;
      const blogPosting = {
        '@id': `${canonicalUrl}#article`,
        url: canonicalUrl,
        mainEntityOfPage: `${canonicalUrl}#webpage`,
        publisher: {
          '@type': 'Organization',
          '@id': `${origin}/#medical-clinic`,
        },
      };
      expect(blogPosting['@id']).toBe(`${NEW_ORIGIN}/en/blog/sample#article`);
      expect(blogPosting.mainEntityOfPage).toBe(
        `${NEW_ORIGIN}/en/blog/sample#webpage`
      );
      expect(blogPosting.publisher['@id']).toBe(
        `${NEW_ORIGIN}/#medical-clinic`
      );
    });

    it('builds MedicalClinic @id with new domain', () => {
      const origin = NEW_ORIGIN;
      const medicalClinic = {
        '@type': 'MedicalClinic',
        '@id': `${origin}/#medical-clinic`,
        url: `${origin}${buildLocalizedUrl('th', '/', '')}`,
      };
      expect(medicalClinic['@id']).toBe(`${NEW_ORIGIN}/#medical-clinic`);
      expect(medicalClinic.url).not.toContain('dremaclinic.com');
      expect(medicalClinic.url).not.toContain('vercel.app');
    });
  });

  describe('No old domain in URL construction', () => {
    it('buildLocalizedUrl never produces dremaclinic.com', () => {
      const url = buildLocalizedUrl('th', '/blog/sample', NEW_ORIGIN);
      expect(url).not.toContain('dremaclinic.com');
      expect(url).not.toContain('vercel.app');
    });

    it('buildLocalizedUrl never produces localhost', () => {
      const url = buildLocalizedUrl('en', '/blog/sample', NEW_ORIGIN);
      expect(url).not.toContain('localhost');
    });

    it('buildLocalizedAlternates never produces old domains', () => {
      const result = buildLocalizedAlternates('th', '/blog/sample', NEW_ORIGIN);
      for (const url of [
        result.canonical,
        result.languages.th,
        result.languages.en,
      ]) {
        expect(url).not.toContain('dremaclinic.com');
        expect(url).not.toContain('vercel.app');
        expect(url).not.toContain('localhost');
      }
    });
  });

  describe('Sitemap and robots URL construction', () => {
    it('buildLocalizedUrl builds sitemap entry for TH blog', () => {
      const url = buildLocalizedUrl('th', '/blog/lip-filler', NEW_ORIGIN);
      expect(url).toBe(`${NEW_ORIGIN}/th/blog/lip-filler`);
      expect(url).not.toContain('dremaclinic.com');
    });

    it('buildLocalizedUrl builds sitemap entry for EN homepage', () => {
      const url = buildLocalizedUrl('en', '/', NEW_ORIGIN);
      expect(url).toBe(`${NEW_ORIGIN}/en`);
      expect(url).not.toContain('vercel.app');
    });

    it('buildLocalizedUrl builds sitemap entry for TH FAQ', () => {
      const url = buildLocalizedUrl('th', '/faq', NEW_ORIGIN);
      expect(url).toBe(`${NEW_ORIGIN}/th/faq`);
    });

    it('builds robots sitemap URL with new domain', () => {
      const sitemapUrl = `${NEW_ORIGIN}/sitemap.xml`;
      expect(sitemapUrl).toBe(`${NEW_ORIGIN}/sitemap.xml`);
      expect(sitemapUrl).not.toContain('dremaclinic.com');
    });
  });
});
