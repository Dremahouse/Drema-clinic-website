import { describe, expect, it } from 'vitest';
import {
  buildFacebookEmbedSrc,
  parseSocialEmbedUrl,
} from '@/lib/socialEmbed/parse';

function parsed(kind: 'post' | 'video' | 'reel', url: string) {
  const p = parseSocialEmbedUrl(url);
  if (!p || p.kind !== kind) throw new Error(`expected ${kind} from ${url}`);
  return p;
}

describe('buildFacebookEmbedSrc — endpoint mapping', () => {
  it('uses post.php for Facebook posts', () => {
    const descriptor = buildFacebookEmbedSrc(
      parsed('post', 'https://www.facebook.com/drema/posts/123/'),
      550
    );
    expect(descriptor.endpoint).toBe('post.php');
    expect(descriptor.src).toContain('plugins/post.php');
  });

  it('uses video.php for Facebook videos', () => {
    const descriptor = buildFacebookEmbedSrc(
      parsed('video', 'https://www.facebook.com/drema/videos/987/'),
      550
    );
    expect(descriptor.endpoint).toBe('video.php');
    expect(descriptor.src).toContain('plugins/video.php');
  });

  it('uses video.php for Facebook reels (reels are videos)', () => {
    const descriptor = buildFacebookEmbedSrc(
      parsed('reel', 'https://www.facebook.com/drema/reel/555/'),
      550
    );
    expect(descriptor.endpoint).toBe('video.php');
    expect(descriptor.src).toContain('plugins/video.php');
  });

  it('does not use the post endpoint for video or reel', () => {
    const video = buildFacebookEmbedSrc(
      parsed('video', 'https://www.facebook.com/drema/videos/987/'),
      550
    );
    const reel = buildFacebookEmbedSrc(
      parsed('reel', 'https://www.facebook.com/drema/reel/555/'),
      550
    );
    expect(video.src).not.toContain('post.php');
    expect(reel.src).not.toContain('post.php');
  });
});

describe('buildFacebookEmbedSrc — height strategy', () => {
  it('enables show_text for posts (variable height content)', () => {
    const descriptor = buildFacebookEmbedSrc(
      parsed('post', 'https://www.facebook.com/drema/posts/123/'),
      550
    );
    expect(descriptor.showText).toBe(true);
    expect(descriptor.src).toContain('show_text=true');
  });

  it('disables show_text for video and reel to avoid forced short boxes', () => {
    const video = buildFacebookEmbedSrc(
      parsed('video', 'https://www.facebook.com/drema/videos/987/'),
      550
    );
    const reel = buildFacebookEmbedSrc(
      parsed('reel', 'https://www.facebook.com/drema/reel/555/'),
      550
    );
    expect(video.showText).toBe(false);
    expect(reel.showText).toBe(false);
    expect(video.src).toContain('show_text=false');
    expect(reel.src).toContain('show_text=false');
  });

  it('forwards the article column width to avoid internal horizontal overflow', () => {
    const descriptor = buildFacebookEmbedSrc(
      parsed('video', 'https://www.facebook.com/drema/videos/987/'),
      375
    );
    expect(descriptor.src).toContain('width=375');
  });

  it('embeds the canonical (clean) href', () => {
    const descriptor = buildFacebookEmbedSrc(
      parsed('post', 'https://www.facebook.com/drema/posts/123/'),
      550
    );
    expect(descriptor.src).toContain('href=');
    expect(descriptor.src).toContain('facebook.com%2Fdrema%2Fposts%2F123');
  });
});
