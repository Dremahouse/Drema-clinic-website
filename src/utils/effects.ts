export type SectionEffects = {
  enabled?: boolean | null;
  reveal?: boolean | null;
  stagger?: boolean | null;
  hoverScale?: boolean | null;
  parallax?: boolean | null;
};

export function isEffectEnabled(
  effects: SectionEffects | null | undefined,
  key: keyof SectionEffects,
  fallback = true
) {
  if (!effects) return fallback;
  const value = effects[key];
  return typeof value === 'boolean' ? value : fallback;
}

export function staggerDelay(index: number, base = 0.05, cap = 0.35) {
  return Math.min(index * base, cap);
}
