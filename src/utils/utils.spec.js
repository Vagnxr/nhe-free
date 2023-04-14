import { isValidPDVs, isValidPDV } from './utils.ts';

describe('PDV validation', () => {
  it('expects empty string to be valid', () => {
    expect(isValidPDV('')).toBe(true);
  });

  it('expects "abc" to be invalid', () => {
    expect(isValidPDV('abc')).toBe(false);
  });

  it('expects "Ab2" to be invalid', () => {
    expect(isValidPDV('Ab2')).toBe(false);
  });

  it('expects "ABC" to be valid', () => {
    expect(isValidPDV('ABC')).toBe(true);
  });

  it('expects "AB2" to be valid', () => {
    expect(isValidPDV('AB2')).toBe(true);
  });

  it('expects "32" to be valid', () => {
    expect(isValidPDV('32')).toBe(true);
  });

  it('expects "32*1!" to be invalid', () => {
    expect(isValidPDV('32*1!')).toBe(false);
  });

  it('expects "[]" to be valid', () => {
    expect(isValidPDVs([])).toBe(true);
  });

  it('expects "["Ab2"]" to be invalid', () => {
    expect(isValidPDVs(['Ab2'])).toBe(false);
  });

  it('expects "["ABC"]" to be valid', () => {
    expect(isValidPDVs(['ABC'])).toBe(true);
  });

  it('expects "["AB2", "Ab2"]" to be invalid', () => {
    expect(isValidPDVs(['AB2', 'Ab2'])).toBe(false);
  });

  it('expects "["AB2", "AC38"]" to be valid', () => {
    expect(isValidPDVs(['AB2', 'AC38'])).toBe(true);
  });

  it('expects "["AB!2", "AC*38"]" to be invalid', () => {
    expect(isValidPDVs(['AB!2', 'AC*38'])).toBe(false);
  });

  it('expects "["32"]" to be valid', () => {
    expect(isValidPDVs(['32'])).toBe(true);
  });

  it('expects "["3!2"]" to be invalid', () => {
    expect(isValidPDVs(['3!2'])).toBe(false);
  });
});
