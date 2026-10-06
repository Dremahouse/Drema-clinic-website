import { describe, expect, it } from 'vitest';
import { getLocalizedCitationSummary } from './jsonLd';

const blockContent = [
  {
    _key: 'block-1',
    _type: 'block' as const,
    children: [
      {
        _key: 'span-1',
        _type: 'span' as const,
        text: 'Board-certified doctor',
      },
    ],
  },
];

describe('getLocalizedCitationSummary', () => {
  it('uses the Thai summary for Thai locale', () => {
    expect(
      getLocalizedCitationSummary('th', 'แพทย์ผิวหนัง', 'Dermatologist')
    ).toBe('แพทย์ผิวหนัง');
  });

  it('uses the English summary for English locale', () => {
    expect(
      getLocalizedCitationSummary('en', 'แพทย์ผิวหนัง', 'Dermatologist')
    ).toBe('Dermatologist');
  });

  it('falls back to the other locale when the requested summary is missing', () => {
    expect(getLocalizedCitationSummary('en', 'แพทย์ผิวหนัง', null)).toBe(
      'แพทย์ผิวหนัง'
    );
    expect(getLocalizedCitationSummary('th', null, 'Dermatologist')).toBe(
      'Dermatologist'
    );
  });

  it('converts BlockContent to meaningful plain text', () => {
    const description = getLocalizedCitationSummary('th', blockContent, null);

    expect(description).toBe('Board-certified doctor');
    expect(typeof description).toBe('string');
    expect(Array.isArray(description)).toBe(false);
  });

  it('omits the description when both summaries are missing', () => {
    expect(getLocalizedCitationSummary('th', undefined, null)).toBeUndefined();
  });

  it('never returns a BlockContent object or array', () => {
    const description = getLocalizedCitationSummary('en', blockContent, null);

    expect(typeof description).toBe('string');
    expect(description).not.toEqual(blockContent);
    expect(Array.isArray(description)).toBe(false);
  });
});
