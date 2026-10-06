import { getBaseURL } from '@/lib/links';

export const getBaseUrl = () => {
  const siteUrl = getBaseURL();
  if (siteUrl) return siteUrl;

  if (process.env.VERCEL_ENV === 'production') {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_ENV === 'preview') {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://localhost:3000';
};
