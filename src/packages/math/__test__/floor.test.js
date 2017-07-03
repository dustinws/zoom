/* global describe, expect, test */
import floor from '../floor';

describe('Zoom.Math.floor', () => {
  test('it should round down', () => {
    expect(floor(5.9999)).toBe(5);
  });
});
