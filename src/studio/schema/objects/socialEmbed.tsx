import { defineField, defineType } from 'sanity';
import { parseSocialEmbedUrl, validateSocialEmbedUrl } from '@/lib/socialEmbed/parse';

function kindLabel(kind?: string): string {
  if (kind === 'post') return 'Post';
  if (kind === 'video') return 'Video';
  if (kind === 'reel') return 'Reel';
  return '';
}

function platformLabel(platform?: string, kind?: string): string {
  if (platform === 'facebook') return `Facebook ${kindLabel(kind)}`.trim();
  if (platform === 'instagram') return `Instagram ${kindLabel(kind)}`.trim();
  return 'Social Post / Video';
}

function shortenUrl(url?: string): string {
  if (!url) return 'No URL';
  return url.length > 64 ? `${url.slice(0, 61)}...` : url;
}

export default defineType({
  name: 'socialEmbed',
  title: 'Social Post / Video',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'Facebook / Instagram URL',
      type: 'url',
      description:
        'Paste the canonical post, video, or reel URL. Share links are not supported.',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return true;
          return validateSocialEmbedUrl(value);
        }),
    }),
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Facebook', value: 'facebook' },
          { title: 'Instagram', value: 'instagram' },
        ],
        layout: 'radio',
      },
      description:
        'Confirm the detected platform. The website re-validates the URL at render time.',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = (context.parent ?? {}) as { url?: string } | undefined;
          const url = parent?.url;
          if (!url) return true;
          const parsed = parseSocialEmbedUrl(url);
          if (!parsed) return true;
          if (!value) return 'Select the platform.';
          if (value !== parsed.platform) {
            return `URL looks like ${parsed.platform}. Please select the matching platform.`;
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: { url: 'url', platform: 'platform' },
    prepare({ url, platform }) {
      const parsed = parseSocialEmbedUrl(url || '');
      return {
        title: parsed
          ? platformLabel(parsed.platform, parsed.kind)
          : 'Social Post / Video',
        subtitle: shortenUrl(url),
      };
    },
  },
});
