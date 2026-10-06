import { afterEach, describe, expect, it, vi } from 'vitest';
import type { DocumentActionProps } from 'sanity';

vi.mock('@/lib/links', () => ({
  getBaseURL: () => 'https://www.dremawellnessth.com',
}));

import {
  buildPublishedArticleUrl,
  viewPublishedArticleAction,
} from '../viewPublishedArticle';

const BASE = 'https://www.dremawellnessth.com';

describe('buildPublishedArticleUrl', () => {
  it('builds the TH production URL for a published slug', () => {
    expect(buildPublishedArticleUrl('th', 'my-post', BASE)).toBe(
      'https://www.dremawellnessth.com/th/blog/my-post',
    );
  });

  it('builds the EN production URL for a published slug', () => {
    expect(buildPublishedArticleUrl('en', 'my-post', BASE)).toBe(
      'https://www.dremawellnessth.com/en/blog/my-post',
    );
  });

  it('strips a trailing slash from the base URL', () => {
    expect(buildPublishedArticleUrl('th', 'my-post', `${BASE}/`)).toBe(
      'https://www.dremawellnessth.com/th/blog/my-post',
    );
  });

  it('preserves URL-safe slug characters in the path', () => {
    expect(buildPublishedArticleUrl('en', 'restylane-filler', BASE)).toBe(
      'https://www.dremawellnessth.com/en/blog/restylane-filler',
    );
  });

  it('returns null when the slug is missing', () => {
    expect(buildPublishedArticleUrl('th', '', BASE)).toBeNull();
    expect(buildPublishedArticleUrl('th', null, BASE)).toBeNull();
    expect(buildPublishedArticleUrl('th', undefined, BASE)).toBeNull();
  });

  it('returns null when the base URL is missing (avoids invalid URL)', () => {
    expect(buildPublishedArticleUrl('th', 'my-post', '')).toBeNull();
  });
});

describe('viewPublishedArticleAction', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns a descriptor for a published document with a slug', () => {
    const props = {
      published: { slug: { current: 'my-post' } },
    } as unknown as DocumentActionProps;

    const action = viewPublishedArticleAction('th')(props);
    expect(action).not.toBeNull();
    expect(action?.label).toBe('View TH ↗');
  });

  it('opens the production article in a new tab via onHandle', () => {
    const openSpy = vi
      .spyOn(window, 'open')
      .mockImplementation(() => null);
    const props = {
      published: { slug: { current: 'my-post' } },
    } as unknown as DocumentActionProps;

    const action = viewPublishedArticleAction('en')(props);
    action?.onHandle?.();

    expect(openSpy).toHaveBeenCalledWith(
      'https://www.dremawellnessth.com/en/blog/my-post',
      '_blank',
      'noopener,noreferrer',
    );
  });

  it('is hidden (null) for a document that was never published', () => {
    const props = {
      published: undefined,
    } as unknown as DocumentActionProps;

    expect(viewPublishedArticleAction('th')(props)).toBeNull();
  });

  it('is hidden (null) when the published document has no slug', () => {
    const props = {
      published: { slug: undefined },
    } as unknown as DocumentActionProps;

    expect(viewPublishedArticleAction('en')(props)).toBeNull();
  });
});
