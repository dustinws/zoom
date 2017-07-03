/* global describe, expect, test */
import and from '../and';

describe('Zoom.Logic.and', () => {
  test('It should be curried', () => {
    expect(typeof and(true)()).toBe('function');
  });

  test('it should behave like the normal && operator', () => {
    expect(and(false, true)).toBe(false);
    expect(and(true, false)).toBe(false);
    expect(and(true, true)).toBe(true);
  });
});
