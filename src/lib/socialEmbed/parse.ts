export type SocialEmbedPlatform = 'facebook' | 'instagram';
export type SocialEmbedKind = 'post' | 'video' | 'reel';

export interface ParsedSocialEmbed {
  platform: SocialEmbedPlatform;
  kind: SocialEmbedKind;
  cleanUrl: string;
}

const FACEBOOK_HOSTS = new Set([
  'facebook.com',
  'www.facebook.com',
  'm.facebook.com',
]);
const INSTAGRAM_HOSTS = new Set(['instagram.com', 'www.instagram.com']);

const TRACKING_PARAMS = new Set([
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'utm_id',
  'fbclid',
  'igshid',
  'igsh',
  'gclid',
  'mc_cid',
  'mc_eid',
]);

function isAllowedHost(hostname: string, hosts: Set<string>): boolean {
  return hosts.has(hostname.toLowerCase());
}

/**
 * Parse a pasted URL into a supported social embed, or return null.
 * Only http/https canonical post/video/reel URLs on allowlisted hosts pass.
 */
export function parseSocialEmbedUrl(
  input: string | null | undefined
): ParsedSocialEmbed | null {
  if (!input || typeof input !== 'string') return null;

  let url: URL;
  try {
    url = new URL(input);
  } catch {
    return null;
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;

  const hostname = url.hostname.toLowerCase();
  const pathname = url.pathname;

  if (isAllowedHost(hostname, FACEBOOK_HOSTS)) {
    return parseFacebook(url, pathname);
  }
  if (isAllowedHost(hostname, INSTAGRAM_HOSTS)) {
    return parseInstagram(url, pathname);
  }
  return null;
}

function parseFacebook(url: URL, pathname: string): ParsedSocialEmbed | null {
  if (/\/share\//i.test(pathname) || /\/sharer/i.test(pathname)) return null;

  const cleanUrl = sanitizeUrl(url, pathname, false);

  if (/\/posts\//i.test(pathname)) {
    return { platform: 'facebook', kind: 'post', cleanUrl };
  }
  if (/\/videos\//i.test(pathname)) {
    return { platform: 'facebook', kind: 'video', cleanUrl };
  }
  if (/\/reel\/?/i.test(pathname) || /\/reels\//i.test(pathname)) {
    return { platform: 'facebook', kind: 'reel', cleanUrl };
  }
  return null;
}

function parseInstagram(url: URL, pathname: string): ParsedSocialEmbed | null {
  if (/\/share\//i.test(pathname)) return null;

  const cleanUrl = sanitizeUrl(url, pathname, true);

  if (/\/p\//i.test(pathname)) {
    return { platform: 'instagram', kind: 'post', cleanUrl };
  }
  if (/\/reel\//i.test(pathname)) {
    return { platform: 'instagram', kind: 'reel', cleanUrl };
  }
  if (/\/tv\//i.test(pathname)) {
    return { platform: 'instagram', kind: 'video', cleanUrl };
  }
  return null;
}

function sanitizeUrl(url: URL, pathname: string, ensureTrailingSlash: boolean): string {
  const cleaned = new URL(url);
  for (const param of TRACKING_PARAMS) {
    cleaned.searchParams.delete(param);
  }
  cleaned.hash = '';
  if (ensureTrailingSlash && !cleaned.pathname.endsWith('/')) {
    cleaned.pathname = `${cleaned.pathname}/`;
  }
  return cleaned.toString();
}

export interface FacebookEmbedDescriptor {
  endpoint: 'post.php' | 'video.php';
  showText: boolean;
  src: string;
}

/**
 * Builds the Facebook plugin iframe URL for a parsed embed.
 *
 * Facebook requires different plugin endpoints per content type:
 *  - post  -> plugins/post.php
 *  - video -> plugins/video.php
 *  - reel  -> plugins/video.php (reels are videos)
 *
 * The width parameter is forwarded so the plugin renders at the article
 * column width, which prevents internal horizontal overflow. `show_text`
 * is enabled for posts and disabled for video/reel embeds.
 */
export function buildFacebookEmbedSrc(
  parsed: ParsedSocialEmbed,
  width: number
): FacebookEmbedDescriptor {
  const isVideo = parsed.kind === 'video' || parsed.kind === 'reel';
  const endpoint = isVideo ? 'video.php' : 'post.php';
  const params = new URLSearchParams();
  params.set('href', parsed.cleanUrl);
  params.set('width', String(Math.max(1, Math.floor(width))));
  params.set('show_text', isVideo ? 'false' : 'true');
  return {
    endpoint,
    showText: !isVideo,
    src: `https://www.facebook.com/plugins/${endpoint}?${params.toString()}`,
  };
}

/**
 * Editor-facing validation. Returns true when valid, or a human-readable
 * message explaining why the URL is rejected.
 */
export function validateSocialEmbedUrl(
  input: string | null | undefined
): true | string {
  if (!input) return 'Please enter a Facebook or Instagram URL.';

  if (parseSocialEmbedUrl(input)) return true;

  let url: URL | null = null;
  try {
    url = new URL(input);
  } catch {
    url = null;
  }

  if (url) {
    const hostname = url.hostname.toLowerCase();
    const pathname = url.pathname.toLowerCase();
    const isFb = isAllowedHost(hostname, FACEBOOK_HOSTS);
    const isIg = isAllowedHost(hostname, INSTAGRAM_HOSTS);

    if ((isFb || isIg) && /\/share\//.test(pathname)) {
      return 'Share links are not supported yet. Please open the original post or reel and paste its canonical URL.';
    }
    if (isFb || isIg) {
      return 'Please use a canonical Facebook or Instagram post, video, or reel URL (not a profile or home page).';
    }
  }

  return 'Please use a canonical Facebook or Instagram post/reel/video URL.';
}
