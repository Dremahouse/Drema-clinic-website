type GeneratedModule = typeof import('../.sanity/sanity.types');
type ExportOrFallback<K extends PropertyKey, Fallback> = K extends keyof GeneratedModule
  ? GeneratedModule[K]
  : Fallback;

// Re-export generated types when available.
export * from '../.sanity/sanity.types';

// Stable fallbacks for query-result types used across app code.
export type GetPageQueryResult = ExportOrFallback<'GetPageQueryResult', any>;
export type PostQueryResult = ExportOrFallback<'PostQueryResult', any>;
export type PostsArchiveQueryResult = ExportOrFallback<
  'PostsArchiveQueryResult',
  { total?: number; results: any[] }
>;
export type CategoryQueryResult = ExportOrFallback<'CategoryQueryResult', any>;
export type BlogPageQueryResult = ExportOrFallback<'BlogPageQueryResult', any>;
export type SettingsQueryResult = ExportOrFallback<'SettingsQueryResult', any>;
