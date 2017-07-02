/* global describe, expect, test */
import get from '../get';

describe('core.get(value)', () => {
  test('It should return a function', () => {
    expect(typeof get('foo')).toBe('function');
  });

  test('It return the value at that key on the provided object.', () => {
    expect(get('a', { a: 1 }).value).toBe(1);
  });
});
