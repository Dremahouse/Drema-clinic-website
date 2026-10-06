'use client';

import { useEffect, useRef, useState } from 'react';
import { useConsentManager } from '@/components/consent/ConsentProvider';
import {
  buildFacebookEmbedSrc,
  parseSocialEmbedUrl,
  type ParsedSocialEmbed,
} from '@/lib/socialEmbed/parse';

type SocialEmbedLocale = 'th' | 'en';

interface SocialEmbedProps {
  url?: string;
  locale?: SocialEmbedLocale;
}

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const COPY: Record<SocialEmbedLocale, { fallback: string; placeholder: string; manage: string }> = {
  th: {
    fallback: 'ดูโพสต์ต้นฉบับบน Facebook/Instagram',
    placeholder: 'เนื้อหาจาก Facebook/Instagram ต้องการความยินยอมฟังก์ชันการทำงาน',
    manage: 'จัดการคุกกี้',
  },
  en: {
    fallback: 'View the original post on Facebook/Instagram',
    placeholder: 'Facebook/Instagram content requires functionality consent',
    manage: 'Manage cookies',
  },
};

function loadInstagramEmbedScript() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (window.instgrm) {
    window.instgrm.Embeds.process();
    return;
  }
  if (document.getElementById('instagram-embed-script')) return;
  const script = document.createElement('script');
  script.id = 'instagram-embed-script';
  script.src = 'https://www.instagram.com/embed.js';
  script.async = true;
  script.defer = true;
  script.onload = () => {
    window.instgrm?.Embeds.process();
  };
  document.body.appendChild(script);
}

export default function SocialEmbed({ url, locale = 'th' }: SocialEmbedProps) {
  const { preferences, openPreferences } = useConsentManager();
  const parsed = url ? parseSocialEmbedUrl(url) : null;
  const copy = COPY[locale] ?? COPY.th;

  if (!parsed) {
    if (!url) return null;
    return (
      <div className="my-8 rounded-2xl border border-[#e2d7c5] bg-[#f8f2e8] px-4 py-3 text-center text-sm text-[#5b5043]">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#7f5f4a] underline"
        >
          {copy.fallback}
        </a>
      </div>
    );
  }

  if (!preferences.functionality) {
    return (
      <div className="my-8 rounded-2xl border border-[#e2d7c5] bg-[#f8f2e8] px-4 py-4 text-center text-sm text-[#5b5043]">
        <p className="mb-3">{copy.placeholder}</p>
        <button
          type="button"
          onClick={openPreferences}
          className="rounded-full border border-[#8f745d] bg-[#7f5f4a] px-4 py-2 text-sm font-semibold text-[#f8f2ea]"
        >
          {copy.manage}
        </button>
        <div className="mt-3">
          <a
            href={parsed.cleanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#7f5f4a] underline"
          >
            {copy.fallback}
          </a>
        </div>
      </div>
    );
  }

  if (parsed.platform === 'facebook') {
    return <FacebookEmbed parsed={parsed} copy={copy} />;
  }

  useEffect(() => {
    loadInstagramEmbedScript();
  }, []);

  return (
    <div className="my-8 flex justify-center">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={parsed.cleanUrl}
        data-instgrm-version="14"
      >
        <a href={parsed.cleanUrl} target="_blank" rel="noopener noreferrer">
          {copy.fallback}
        </a>
      </blockquote>
    </div>
  );
}

interface FacebookEmbedProps {
  parsed: ParsedSocialEmbed;
  copy: { fallback: string; placeholder: string; manage: string };
}

function FacebookEmbed({ parsed, copy }: FacebookEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [width, setWidth] = useState(550);

  const isVideo = parsed.kind === 'video' || parsed.kind === 'reel';
  const { src } = buildFacebookEmbedSrc(parsed, width);

  // Measure the article column so the plugin renders at the real width and
  // never overflows horizontally on mobile/tablet.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const measured = Math.floor(el.clientWidth) || 550;
      setWidth(Math.min(measured, 550));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Best-effort auto-resize for posts. Facebook's official auto-resize uses the
  // JS SDK; without it, some configurations still post a resize message. We only
  // accept messages from Facebook origins and only resize our own iframe.
  useEffect(() => {
    if (isVideo) return;
    const onMessage = (event: MessageEvent) => {
      if (!event.origin.includes('facebook.com') && !event.origin.includes('fbcdn.net')) {
        return;
      }
      const data = event.data as { height?: unknown } | null;
      if (!data || typeof data.height !== 'number') return;
      if (event.source && iframeRef.current?.contentWindow !== event.source) return;
      iframeRef.current?.style.setProperty('height', `${Math.ceil(data.height)}px`);
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [isVideo]);

  const frameProps = {
    src,
    loading: 'lazy' as const,
    referrerPolicy: 'no-referrer-when-downgrade' as const,
    allow: 'autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share',
  };

  if (isVideo) {
    return (
      <div className="my-8 flex justify-center" ref={containerRef}>
        <div className="w-full max-w-[550px]">
          {/* Portrait-safe box: a 9:16 container shows the full vertical video/reel
              without cropping. Landscape videos letterbox instead of being clipped. */}
          <div className="relative w-full" style={{ aspectRatio: '9 / 16' }}>
            <iframe
              {...frameProps}
              title="Facebook video"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 flex justify-center" ref={containerRef}>
      <div className="w-full max-w-[550px]">
        <iframe
          {...frameProps}
          ref={iframeRef}
          title="Facebook post"
          className="min-h-[700px] w-full border-0"
        />
      </div>
    </div>
  );
}
