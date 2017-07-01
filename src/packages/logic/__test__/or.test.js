/* global describe, expect, test */
import or from '../or';

describe('core.or(left, right)', () => {
  test('It should be curried', () => {
    expect(typeof or(true)()).toBe('function');
  });

  test('it should behave like the normal || operator', () => {
    expect(or(false, true)).toBe(true);
    expect(or(true, false)).toBe(true);
    expect(or(true, true)).toBe(true);
    expect(or(false, false)).toBe(false);
  });
});
