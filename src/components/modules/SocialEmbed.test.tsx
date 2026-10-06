import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import SocialEmbed from './SocialEmbed';

const mockConsent = {
  preferences: { functionality: true, analytics: false, advertising: false, necessary: true },
  openPreferences: vi.fn(),
};

vi.mock('@/components/consent/ConsentProvider', () => ({
  useConsentManager: () => mockConsent,
}));

const FB_POST = 'https://www.facebook.com/drema/posts/123/';
const FB_VIDEO = 'https://www.facebook.com/drema/videos/987/';
const FB_REEL = 'https://www.facebook.com/drema/reel/555/';
const IG_POST = 'https://www.instagram.com/p/ABC123/';

describe('SocialEmbed — Facebook consent gate', () => {
  it('renders no iframe when functionality consent is OFF', () => {
    mockConsent.preferences = {
      functionality: false,
      analytics: false,
      advertising: false,
      necessary: true,
    };
    const { container } = render(<SocialEmbed url={FB_VIDEO} locale="en" />);
    expect(container.querySelector('iframe')).toBeNull();
    expect(screen.getByText(/requires functionality consent/i)).toBeTruthy();
    const link = container.querySelector('a[target="_blank"]');
    expect(link?.getAttribute('href')).toBe(FB_VIDEO);
  });

  it('renders the iframe when functionality consent is ON', () => {
    mockConsent.preferences = {
      functionality: true,
      analytics: false,
      advertising: false,
      necessary: true,
    };
    const { container } = render(<SocialEmbed url={FB_VIDEO} />);
    expect(container.querySelector('iframe')).not.toBeNull();
  });
});

describe('SocialEmbed — Facebook endpoint + height strategy', () => {
  beforeEach(() => {
    mockConsent.preferences = {
      functionality: true,
      analytics: false,
      advertising: false,
      necessary: true,
    };
  });

  it('post uses post.php and enables show_text (no fixed short height)', () => {
    const { container } = render(<SocialEmbed url={FB_POST} />);
    const iframe = container.querySelector('iframe') as HTMLIFrameElement;
    expect(iframe).not.toBeNull();
    expect(iframe.getAttribute('src')).toContain('plugins/post.php');
    expect(iframe.getAttribute('src')).toContain('show_text=true');
    expect(iframe.className).toContain('min-h-[700px]');
  });

  it('video uses video.php and a portrait-safe 9:16 box (no cropping)', () => {
    const { container } = render(<SocialEmbed url={FB_VIDEO} />);
    const iframe = container.querySelector('iframe') as HTMLIFrameElement;
    expect(iframe.getAttribute('src')).toContain('plugins/video.php');
    expect(iframe.getAttribute('src')).toContain('show_text=false');
    const portraitBox = container.querySelector('[style*="aspect-ratio"]');
    expect(portraitBox).not.toBeNull();
    expect(portraitBox?.getAttribute('style')).toContain('9 / 16');
    expect(iframe.className).toContain('absolute');
    expect(iframe.className).toContain('h-full');
  });

  it('reel uses video.php and a portrait-safe 9:16 box', () => {
    const { container } = render(<SocialEmbed url={FB_REEL} />);
    const iframe = container.querySelector('iframe') as HTMLIFrameElement;
    expect(iframe.getAttribute('src')).toContain('plugins/video.php');
    const portraitBox = container.querySelector('[style*="aspect-ratio"]');
    expect(portraitBox?.getAttribute('style')).toContain('9 / 16');
  });
});

describe('SocialEmbed — responsive width (no horizontal overflow)', () => {
  beforeEach(() => {
    mockConsent.preferences = {
      functionality: true,
      analytics: false,
      advertising: false,
      necessary: true,
    };
  });

  it('video container is fluid but capped to the article column', () => {
    const { container } = render(<SocialEmbed url={FB_VIDEO} />);
    const wrapper = container.querySelector('.max-w-\\[550px\\]');
    expect(wrapper).not.toBeNull();
    expect(wrapper?.className).toContain('w-full');
  });
});

describe('SocialEmbed — fallback + Instagram regression safety', () => {
  beforeEach(() => {
    mockConsent.preferences = {
      functionality: true,
      analytics: false,
      advertising: false,
      necessary: true,
    };
  });

  it('invalid URL shows the original fallback link and no iframe', () => {
    const { container } = render(<SocialEmbed url="https://example.com/not-social" />);
    expect(container.querySelector('iframe')).toBeNull();
    const link = container.querySelector('a[target="_blank"]');
    expect(link?.getAttribute('href')).toBe('https://example.com/not-social');
  });

  it('Instagram embed is unchanged (blockquote.instagram-media)', () => {
    const { container } = render(<SocialEmbed url={IG_POST} />);
    const blockquote = container.querySelector('blockquote.instagram-media');
    expect(blockquote).not.toBeNull();
    expect(blockquote?.getAttribute('data-instgrm-permalink')).toBe(IG_POST);
    expect(container.querySelector('iframe')).toBeNull();
  });
});
