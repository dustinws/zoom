/* global describe, expect, test */
import ceil from '../ceil';

describe('Zoom.Math.ceil', () => {
  test('it should round up', () => {
    expect(ceil(4.01)).toBe(5);
  });
});
