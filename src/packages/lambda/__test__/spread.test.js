/* global describe, expect, test */
import spread from '../spread';

describe('Zoom.Lambda.spread', () => {
  test('It should spread an array into a list of arguments', () => {
    const args = [1, 1, 1];
    const main = (a, b, c) => a + b + c;

    expect(spread(main, args)).toBe(3);
  });
});
