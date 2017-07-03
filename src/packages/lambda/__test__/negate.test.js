/* global describe, expect, test */
import negate from '../negate';

describe('Zoom.Core.negate', () => {
  test('It should return a function', () => {
    expect(typeof negate(() => {})).toBe('function');
  });

  test('It should return the opposite boolean value of the original function', () => {
    const True = () => true;
    expect(negate(True)()).toBe(false);
  });
});
