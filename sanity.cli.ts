/**
 * Sanity CLI Configuration
 * This file configures the Sanity CLI tool with project-specific settings
 * and customizes the Vite bundler configuration.
 * Learn more: https://www.sanity.io/docs/cli
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineCliConfig } from 'sanity/cli';

const parseEnvValue = (line: string): [string, string] | null => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return null;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) return null;
  const key = trimmed.slice(0, eqIdx).trim();
  let val = trimmed.slice(eqIdx + 1).trim();
  if (
    (val.startsWith('"') && val.endsWith('"')) ||
    (val.startsWith("'") && val.endsWith("'"))
  ) {
    val = val.slice(1, -1);
  }
  return [key, val];
};

const envPath = resolve(process.cwd(), '.env.local');
const envFile: Record<string, string> = {};
try {
  const content = readFileSync(envPath, 'utf-8');
  for (const line of content.split('\n')) {
    const parsed = parseEnvValue(line);
    if (parsed) {
      envFile[parsed[0]] = parsed[1];
    }
  }
} catch {
  // File not readable, fall back to process.env
}

const SANITY_STUDIO_PREFIX = 'SANITY_STUDIO_';

const getEnv = (key: string): string => {
  // Check NEXT_PUBLIC_* env var first (used by Next.js at build/runtime)
  const val = process.env[key];
  if (val !== undefined && val !== '') return val;
  // Check SANITY_STUDIO_* env var (loaded by Sanity CLI from .env*.local)
  const studioKey = SANITY_STUDIO_PREFIX + key.replace('NEXT_PUBLIC_', '');
  const studioVal = process.env[studioKey];
  if (studioVal !== undefined && studioVal !== '') return studioVal;
  // Fallback to .env.local
  const envFileVal = envFile[key];
  if (envFileVal !== undefined && envFileVal !== '') return envFileVal;
  // Also check SANITY_STUDIO_* in .env.local
  const envFileStudioVal = envFile[studioKey];
  if (envFileStudioVal !== undefined && envFileStudioVal !== '') return envFileStudioVal;
  return '';
};

export default defineCliConfig({
  api: {
    projectId: getEnv('NEXT_PUBLIC_SANITY_PROJECT_ID'),
    dataset: getEnv('NEXT_PUBLIC_SANITY_DATASET'),
  },
  vite: {
    define: {
      'process.env.NEXT_PUBLIC_SANITY_PROJECT_ID': JSON.stringify(getEnv('NEXT_PUBLIC_SANITY_PROJECT_ID')),
      'process.env.NEXT_PUBLIC_SANITY_DATASET': JSON.stringify(getEnv('NEXT_PUBLIC_SANITY_DATASET')),
      'process.env.NEXT_PUBLIC_SANITY_API_VERSION': JSON.stringify(getEnv('NEXT_PUBLIC_SANITY_API_VERSION')),
      'process.env.NEXT_PUBLIC_SITE_URL': JSON.stringify(getEnv('NEXT_PUBLIC_SITE_URL')),
      'process.env.NEXT_PUBLIC_SANITY_STUDIO_URL': JSON.stringify(getEnv('NEXT_PUBLIC_SANITY_STUDIO_URL')),
      'process.env.NEXT_PUBLIC_GTM_ID': JSON.stringify(getEnv('NEXT_PUBLIC_GTM_ID')),
      'process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID': JSON.stringify(getEnv('NEXT_PUBLIC_GA_MEASUREMENT_ID')),
      'process.env.NEXT_PUBLIC_META_PIXEL_ID': JSON.stringify(getEnv('NEXT_PUBLIC_META_PIXEL_ID')),
      'process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID': JSON.stringify(getEnv('NEXT_PUBLIC_TIKTOK_PIXEL_ID')),
    },
    resolve: {
      alias: [
        {
          find: /^@\/(.*)/,
          replacement: `${resolve(process.cwd(), 'src')}/$1`,
        },
      ],
    },
  },
});