import { defineLive } from 'next-sanity/live';
import { serverEnv } from '@/env/serverEnv';
import { decodeEntitiesDeep } from '@/utils/decodeHtmlEntities';
import { client } from './client';

/**
 * Use defineLive to enable automatic revalidation and refreshing of your fetched content
 * Learn more: https://github.com/sanity-io/next-sanity?tab=readme-ov-file#1-configure-definelive
 */

const { sanityFetch: baseSanityFetch, SanityLive } = defineLive({
  client,
  serverToken: serverEnv.SANITY_API_READ_TOKEN,
  browserToken: serverEnv.SANITY_API_READ_TOKEN,
});

export const sanityFetch: typeof baseSanityFetch = (async (
  ...args: Parameters<typeof baseSanityFetch>
) => {
  const response = await baseSanityFetch(...args);

  return {
    ...response,
    data: decodeEntitiesDeep(response.data),
  };
}) as typeof baseSanityFetch;

export { SanityLive };
