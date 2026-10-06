import { describe, expect, it } from 'vitest';
import {
  parseSocialEmbedUrl,
  validateSocialEmbedUrl,
} from '@/lib/socialEmbed/parse';

describe('parseSocialEmbedUrl — Facebook', () => {
  it('parses a canonical post URL', () => {
    const result = parseSocialEmbedUrl(
      'https://www.facebook.com/drema/posts/123456789/'
    );
    expect(result).not.toBeNull();
    expect(result?.platform).toBe('facebook');
    expect(result?.kind).toBe('post');
  });

  it('parses a canonical video URL', () => {
    const result = parseSocialEmbedUrl(
      'https://www.facebook.com/drema/videos/987654321/'
    );
    expect(result?.platform).toBe('facebook');
    expect(result?.kind).toBe('video');
  });

  it('parses a canonical reel URL (username/reel)', () => {
    const result = parseSocialEmbedUrl(
      'https://www.facebook.com/drema/reel/555123/'
    );
    expect(result?.platform).toBe('facebook');
    expect(result?.kind).toBe('reel');
  });

  it('parses a mobile host URL', () => {
    const result = parseSocialEmbedUrl(
      'https://m.facebook.com/drema/posts/111/'
    );
    expect(result?.platform).toBe('facebook');
    expect(result?.kind).toBe('post');
  });

  it('rejects a Facebook share URL', () => {
    expect(parseSocialEmbedUrl('https://www.facebook.com/share/abc123/')).toBeNull();
  });

  it('rejects a profile / home URL', () => {
    expect(parseSocialEmbedUrl('https://www.facebook.com/drema')).toBeNull();
  });

  it('rejects fb.watch short links in V1', () => {
    expect(parseSocialEmbedUrl('https://fb.watch/abc123/')).toBeNull();
  });
});

describe('parseSocialEmbedUrl — Instagram', () => {
  it('parses a canonical post URL', () => {
    const result = parseSocialEmbedUrl('https://www.instagram.com/p/ABC123/');
    expect(result?.platform).toBe('instagram');
    expect(result?.kind).toBe('post');
  });

  it('parses a canonical reel URL', () => {
    const result = parseSocialEmbedUrl('https://www.instagram.com/reel/XYZ789/');
    expect(result?.platform).toBe('instagram');
    expect(result?.kind).toBe('reel');
  });

  it('parses a legacy tv/video URL', () => {
    const result = parseSocialEmbedUrl('https://www.instagram.com/tv/DEF456/');
    expect(result?.platform).toBe('instagram');
    expect(result?.kind).toBe('video');
  });

  it('adds a trailing slash when missing', () => {
    const result = parseSocialEmbedUrl('https://www.instagram.com/p/ABC123');
    expect(result?.cleanUrl.endsWith('/')).toBe(true);
  });

  it('rejects an Instagram share URL', () => {
    expect(parseSocialEmbedUrl('https://www.instagram.com/share/abc123/')).toBeNull();
  });

  it('rejects a profile / root URL', () => {
    expect(parseSocialEmbedUrl('https://www.instagram.com/')).toBeNull();
    expect(parseSocialEmbedUrl('https://www.instagram.com/drema')).toBeNull();
  });
});

describe('parseSocialEmbedUrl — security & normalization', () => {
  it('strips tracking parameters', () => {
    const result = parseSocialEmbedUrl(
      'https://www.instagram.com/p/ABC123/?utm_source=x&utm_medium=y&igsh=token&fbclid=abc&igshid=z'
    );
    expect(result).not.toBeNull();
    expect(result?.cleanUrl).not.toContain('utm_source');
    expect(result?.cleanUrl).not.toContain('igsh');
    expect(result?.cleanUrl).not.toContain('fbclid');
  });

  it('rejects non-http(s) schemes', () => {
    expect(parseSocialEmbedUrl('javascript:alert(1)')).toBeNull();
    expect(parseSocialEmbedUrl('data:text/html,<script>x</script>')).toBeNull();
    expect(parseSocialEmbedUrl('file:///etc/passwd')).toBeNull();
  });

  it('rejects unrelated domains', () => {
    expect(parseSocialEmbedUrl('https://example.com/p/123/')).toBeNull();
  });

  it('rejects lookalike domains', () => {
    expect(parseSocialEmbedUrl('https://facebook.com.evil.example/p/123/')).toBeNull();
    expect(parseSocialEmbedUrl('https://instagram.com.phishing.test/reel/123/')).toBeNull();
  });

  it('rejects malformed input', () => {
    expect(parseSocialEmbedUrl('not a url')).toBeNull();
    expect(parseSocialEmbedUrl('')).toBeNull();
    expect(parseSocialEmbedUrl(null)).toBeNull();
    expect(parseSocialEmbedUrl(undefined)).toBeNull();
  });
});

describe('validateSocialEmbedUrl', () => {
  it('returns true for valid canonical URLs', () => {
    expect(validateSocialEmbedUrl('https://www.facebook.com/drema/posts/1/')).toBe(true);
    expect(validateSocialEmbedUrl('https://www.instagram.com/p/ABC/')).toBe(true);
  });

  it('returns a share-link specific message for share URLs', () => {
    const msg = validateSocialEmbedUrl('https://www.facebook.com/share/abc/');
    expect(typeof msg === 'string').toBe(true);
    expect(msg).toContain('Share links are not supported');
    expect(validateSocialEmbedUrl('https://www.instagram.com/share/abc/')).toContain(
      'Share links are not supported'
    );
  });

  it('returns a generic message for unrelated domains', () => {
    expect(typeof validateSocialEmbedUrl('https://example.com/x') === 'string').toBe(true);
  });
});
