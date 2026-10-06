export const CATEGORY_SLUG_ALIASES: Record<string, string> = {
  'filler-under-eye': 'under-eye-filler',
  'filler-lips': 'lip-filler',
  'filler-chin': 'chin-filler',
  'filler-cheek': 'cheek-filler',
  'filler-temple': 'temple-filler',
  'laser-energy-devices': 'technology-devices',
  pico: 'pico-laser',
  'skin-booster': 'skin-booster-biostimulator',
  sylfirm: 'sylfirm-x',
  'yag-laser': 'nd-yag-laser',
  'thread-lift-overview': 'thread-lift-guide',
  'double-chin-thread-lift': 'chin-thread-lift',
  'face-slim-jawline-thread-lift': 'jawline-thread-lift',
  'foxy-eyes-brow-tail-thread-lift': 'foxy-eyes-thread-lift',
  'nasolabial-mouth-corner-thread-lift': 'lip-thread-lift',
};

export function resolveCategorySlugAlias(slug: string) {
  return CATEGORY_SLUG_ALIASES[slug] || null;
}
