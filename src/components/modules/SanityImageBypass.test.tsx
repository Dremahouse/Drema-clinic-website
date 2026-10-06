import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ArticleCard from '@/components/modules/ArticleCard';
import { urlForImage } from '@/lib/sanity/client/utils';

vi.mock('next/navigation', () => ({
  usePathname: () => '/th',
}));

const SANITY_SRC =
  'https://cdn.sanity.io/images/proj/dataset/abcdef.jpg?w=800&auto=format';

describe('Sanity image CDN helper', () => {
  it('generates a cdn.sanity.io URL with auto=format and fit=max', () => {
    const url = urlForImage({
      asset: { _ref: 'image-T0JQl9Mr5U9cWoHQ9pW8z-300x200-jpg' },
    })?.url();
    expect(url).toBeTruthy();
    expect(url).toContain('cdn.sanity.io');
    expect(url).toContain('auto=format');
    expect(url).toContain('fit=max');
  });

  it('preserves crop/hotspot transform parameters', () => {
    const cropped = urlForImage({
      asset: { _ref: 'image-T0JQl9Mr5U9cWoHQ9pW8z-300x200-jpg' },
      crop: { top: 0.1, right: 0.1, bottom: 0.1, left: 0.1 },
      hotspot: { x: 0.5, y: 0.5 },
    } as never)
      ?.width(1200)
      .height(800)
      // biome-ignore lint/suspicious/noFocusedTests: .fit() is the Sanity image URL builder method, not a focused test
      .fit('crop')
      .url();
    expect(cropped).toContain('fit=crop');
    expect(cropped).toContain('w=1200');
    expect(cropped).toContain('h=800');
  });
});

describe('Sanity-backed Next/Image bypasses Vercel optimizer', () => {
  it('ArticleCard renders the Sanity CDN URL directly (unoptimized, no /_next/image)', () => {
    const { container } = render(
      <ArticleCard
        article={{
          id: '1',
          title: 'T',
          href: '/x',
          imageUrl: SANITY_SRC,
          imageAlt: 'alt',
        }}
        locale="en"
      />
    );
    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    const src = img?.getAttribute('src') ?? '';
    expect(src).toBe(SANITY_SRC);
    expect(src).not.toContain('/_next/image');
  });
});

describe('PortableText article image path', () => {
  it('renders the Sanity CDN URL directly without the Vercel optimizer', async () => {
    const { default: CustomPortableText } = await import(
      '@/components/modules/PortableText'
    );
    const value = [
      {
        _type: 'image',
        _key: 'k1',
        asset: { _ref: 'image-T0JQl9Mr5U9cWoHQ9pW8z-300x200-jpg' },
        alt: 'Article figure',
      },
    ] as never;

    const { container } = render(<CustomPortableText value={value} />);
    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    const src = img?.getAttribute('src') ?? '';
    expect(src).toContain('cdn.sanity.io');
    expect(src).not.toContain('/_next/image');
  });
});

describe('Global Vercel image bypass is NOT enabled', () => {
  it('next.config does not set images.unoptimized = true', async () => {
    const fs = await import('node:fs');
    const path = await import('node:path');
    const cfg = fs.readFileSync(
      path.resolve(process.cwd(), 'next.config.ts'),
      'utf8'
    );
    expect(cfg).not.toMatch(/unoptimized:\s*true/);
  });
});
