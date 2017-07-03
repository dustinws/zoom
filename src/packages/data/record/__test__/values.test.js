/* global describe, expect, test */
import values from '../values';

describe('Zoom.Data.Record.values', () => {
  test('it should return an objects values as an array', () => {
    expect(values({ a: 1, b: 2 })).toEqual([1, 2]);
  });
});
