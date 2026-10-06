import { stegaClean } from '@sanity/client/stega';

const NAMED_HTML_ENTITIES: Record<string, string> = {
  amp: '&',
  apos: "'",
  gt: '>',
  hellip: '...',
  laquo: '"',
  ldquo: '"',
  lsquo: "'",
  lt: '<',
  mdash: '-',
  nbsp: ' ',
  ndash: '-',
  raquo: '"',
  rdquo: '"',
  rsquo: "'",
  quot: '"',
};

const ENTITY_PATTERN = /&(#x?[0-9a-fA-F]+|[a-zA-Z][a-zA-Z0-9]+);/g;

export function decodeHtmlEntities(input: string): string {
  return input.replace(ENTITY_PATTERN, (_, rawEntity: string) => {
    if (rawEntity.startsWith('#')) {
      const isHex = rawEntity[1]?.toLowerCase() === 'x';
      const codePoint = Number.parseInt(
        rawEntity.slice(isHex ? 2 : 1),
        isHex ? 16 : 10
      );
      if (Number.isNaN(codePoint)) {
        return `&${rawEntity};`;
      }

      try {
        return String.fromCodePoint(codePoint);
      } catch {
        return `&${rawEntity};`;
      }
    }

    return NAMED_HTML_ENTITIES[rawEntity] ?? `&${rawEntity};`;
  });
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

export function decodeEntitiesDeep<T>(value: T): T {
  if (typeof value === 'string') {
    // Preserve Sanity stega metadata in draft/visual-editing mode.
    // Decoding entities on stega-encoded strings can corrupt the hidden payload
    // and trigger "Failed to decode stega" runtime errors in VisualEditing.
    if (stegaClean(value) !== value) {
      return value as T;
    }
    return decodeHtmlEntities(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => decodeEntitiesDeep(item)) as T;
  }

  if (isPlainObject(value)) {
    const output: Record<string, unknown> = {};
    for (const [key, nestedValue] of Object.entries(value)) {
      output[key] = decodeEntitiesDeep(nestedValue);
    }
    return output as T;
  }

  return value;
}
