/* global describe, expect, test */
import complement from '../complement';

describe('Zoom.Core.complement', () => {
  test('It should return a function', () => {
    expect(typeof complement(() => {})).toBe('function');
  });

  test('It should return the opposite boolean value of the original function', () => {
    const True = () => true;
    expect(complement(True)()).toBe(false);
  });
});
