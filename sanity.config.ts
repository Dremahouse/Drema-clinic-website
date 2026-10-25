'use client';

/**
 * This config is used to configure your Sanity Studio.
 * Learn more: https://www.sanity.io/docs/configuration
 */

import { assist } from '@sanity/assist';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import {
  type DocumentLocation,
  defineDocuments,
  defineLocations,
  presentationTool,
} from 'sanity/presentation';
import { structureTool } from 'sanity/structure';
import {
  buildLocalizedPath,
  DEFAULT_LOCALE,
  type SiteLocale,
} from '@/lib/locale';
import { viewPublishedArticleAction } from './src/studio/actions/viewPublishedArticle';
import ViewLiveLayout from './src/studio/components/ViewLiveLayout';
import { schemaTypes } from './src/studio/schema';
import { structure } from './src/studio/structure';

const SANITY_STUDIO_PREFIX = 'SANITY_STUDIO_';

const getEnv = (key: string): string => {
  const val = process.env[key];
  if (val !== undefined && val !== '') return val;
  const studioKey = SANITY_STUDIO_PREFIX + key.replace('NEXT_PUBLIC_', '');
  const studioVal = process.env[studioKey];
  if (studioVal !== undefined && studioVal !== '') return studioVal;
  if (typeof process !== 'undefined' && typeof process.cwd === 'function') {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let nodeRequire: ((module: string) => any) | null = null;
      try {
        nodeRequire = typeof require !== 'undefined' ? require : null;
      } catch {}
      if (!nodeRequire) return '';
      const fs = nodeRequire('node:fs');
      const path = nodeRequire('node:path');
      const envPath = path.resolve(process.cwd(), '.env.local');
      const content = fs.readFileSync(envPath, 'utf-8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx === -1) continue;
        const k = trimmed.slice(0, eqIdx).trim();
        if (k === key || k === studioKey) {
          let v = trimmed.slice(eqIdx + 1).trim();
          if (
            (v.startsWith('"') && v.endsWith('"')) ||
            (v.startsWith("'") && v.endsWith("'"))
          ) {
            v = v.slice(1, -1);
          }
          return v;
        }
      }
    } catch {}
  }
  return '';
};

const projectId = getEnv('NEXT_PUBLIC_SANITY_PROJECT_ID');
const dataset = getEnv('NEXT_PUBLIC_SANITY_DATASET');
const siteUrl = getEnv('NEXT_PUBLIC_SITE_URL');

// Define the home location for the presentation tool
const homeLocation = {
  title: 'Home',
  href: buildLocalizedPath(DEFAULT_LOCALE),
} satisfies DocumentLocation;

// resolveHref() is a convenience function that resolves the URL
// path for different document types and used in the presentation tool.
function resolveHref(
  documentType?: string,
  slug?: string,
  locale: SiteLocale = DEFAULT_LOCALE
): string | undefined {
  switch (documentType) {
    case 'post':
      return slug ? buildLocalizedPath(locale, `/blog/${slug}`) : undefined;
    case 'page':
      return slug ? buildLocalizedPath(locale, `/${slug}`) : undefined;
    case 'category':
      return slug ? buildLocalizedPath(locale, `/category/${slug}`) : undefined;
    case 'servicePage':
      return slug ? buildLocalizedPath(locale, `/services/${slug}`) : undefined;
    case 'reviewCategory':
      return slug ? buildLocalizedPath(locale, `/reviews/${slug}`) : undefined;
    case 'person':
      return slug ? buildLocalizedPath(locale, `/author/${slug}`) : undefined;
    default:
      console.warn('Invalid document type:', documentType);
      return undefined;
  }
}

// Main Sanity configuration
export default defineConfig({
  basePath: '/studio',
  name: 'default',
  title: 'Ignite for Sanity',
  projectId: projectId,
  dataset: dataset,
  auth: {
    // Force the token login method so the embedded Studio persists the signed-in
    // HUMAN Studio user's session token. No service/project credential is involved.
    loginMethod: 'token',
  },
  plugins: [
    // Presentation tool configuration for Visual Editing
    presentationTool({
      previewUrl: {
        origin: siteUrl,
        preview: '/',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      resolve: {
        // The Main Document Resolver API provides a method of resolving a main document from a given route or route pattern. https://www.sanity.io/docs/presentation-resolver-api#57720a5678d9
        mainDocuments: defineDocuments([
          {
            route: '/:slug',
            filter: `_type == "page" && slug.current == $slug || _id == $slug`,
          },
          {
            route: '/blog/:slug',
            filter: `_type == "post" && slug.current == $slug || _id == $slug`,
          },
        ]),
        // Locations Resolver API allows you to define where data is being used in your application. https://www.sanity.io/docs/presentation-resolver-api#8d8bca7bfcd7
        locations: {
          settings: defineLocations({
            locations: [homeLocation],
            message: 'This document is used on all pages',
            tone: 'positive',
          }),
          page: defineLocations({
            select: {
              name: 'name',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.name || 'Untitled',
                  href: resolveHref('page', doc?.slug) || homeLocation.href,
                },
              ],
            }),
          }),
          post: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href:
                    resolveHref('post', doc?.slug) ||
                    buildLocalizedPath(DEFAULT_LOCALE, '/blog'),
                },
                {
                  title: 'Home',
                  href: '/',
                } satisfies DocumentLocation,
              ].filter(Boolean) as DocumentLocation[],
            }),
          }),
          category: defineLocations({
            select: { title: 'title', slug: 'slug.current' },
            resolve: (doc) => ({
              locations: doc?.slug
                ? [
                    {
                      title: doc.title || 'Untitled',
                      href: resolveHref('category', doc.slug),
                    } as DocumentLocation,
                  ]
                : [],
            }),
          }),
          servicePage: defineLocations({
            select: { title: 'name', slug: 'slug.current' },
            resolve: (doc) => ({
              locations: doc?.slug
                ? [
                    {
                      title: doc.title || 'Untitled',
                      href: resolveHref('servicePage', doc.slug),
                    } as DocumentLocation,
                  ]
                : [],
            }),
          }),
          reviewCategory: defineLocations({
            select: { title: 'title', slug: 'slug.current' },
            resolve: (doc) => ({
              locations: doc?.slug
                ? [
                    {
                      title: doc.title || 'Untitled',
                      href: resolveHref('reviewCategory', doc.slug),
                    } as DocumentLocation,
                  ]
                : [],
            }),
          }),
          person: defineLocations({
            select: { title: 'firstName', slug: 'slug.current' },
            resolve: (doc) => ({
              locations: doc?.slug
                ? [
                    {
                      title: doc.title || 'Untitled',
                      href: resolveHref('person', doc.slug),
                    } as DocumentLocation,
                  ]
                : [],
            }),
          }),
        },
      },
    }),
    structureTool({
      structure, // Custom studio structure configuration, imported from ./src/structure.ts
    }),
    // Additional plugins for enhanced functionality
    assist(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (previous, context) => {
      if (context.schemaType === 'post') {
        return [
          ...previous,
          viewPublishedArticleAction('th'),
          viewPublishedArticleAction('en'),
        ];
      }
      return previous;
    },
    components: {
      unstable_layout: ViewLiveLayout,
    },
  },
});
