/* global describe, expect, test */
import subtract from '../subtract';

describe('Zoom.Math.subtract', () => {
  test('it subtract two numbers together', () => {
    expect(subtract(50, 10)).toBe(40);
  });
});
