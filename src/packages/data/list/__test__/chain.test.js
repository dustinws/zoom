/* global describe, expect, test */
import chain from '../chain';

describe('Zoom.Data.List.chain', () => {
  test('It should act like "map" but flatten the resulting array before returning it', () => {
    const double = n => [n, n];

    expect(chain(double, [1, 2])).toEqual([1, 1, 2, 2]);
  });
});
