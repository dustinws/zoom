/* global describe, expect, test */
import multiply from '../multiply';

describe('Zoom.Math.multiply', () => {
  test('it multiply two numbers together', () => {
    expect(multiply(5, 10)).toBe(50);
  });
});
