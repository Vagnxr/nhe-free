import { isObject, capitalizeString } from './helpers';

test('Empty object to be an Object type', () => {
  expect(isObject({})).toBe(true);
});

test('Empty string to not be an Object type', () => {
  expect(isObject('')).toBe(false);
});

test('Zero to not be an Object type', () => {
  expect(isObject(0)).toBe(false);
});

test('abc should return Abc', () => {
  expect(capitalizeString('abc')).toBe('Abc');
});

test('Empty string should return an empty string', () => {
  expect(capitalizeString('')).toBe('');
});
