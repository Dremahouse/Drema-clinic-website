import { sanityFetch } from '@/lib/sanity/client/live';
import { settingsQuery } from '@/lib/sanity/queries/queries';
import FooterClient from './FooterClient';

type FooterSettings = {
  title?: string | null;
  description?: string | null;
  logo?: {
    alt?: string | null;
    asset?: {
      _ref?: string | null;
      _id?: string | null;
    } | null;
  } | null;
  ogImage?: {
    alt?: string | null;
    asset?: {
      _ref?: string | null;
      _id?: string | null;
    } | null;
  } | null;
  socialLinks?:
    | Array<{
        url?: string | null;
      }>
    | null;
} | null;

export default async function Footer() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  });

  if (!settings) {
    return null;
  }

  return <FooterClient settings={settings as FooterSettings} />;
}
