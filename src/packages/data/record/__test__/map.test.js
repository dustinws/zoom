/* global describe, expect, test */
import map from '../map';

describe('Zoom.Data.Record.map', () => {
  test('it return a new object where each value is the result of apply the function', () => {
    expect(map(x => x + 1, { a: 1, b: 2 })).toEqual({ a: 2, b: 3 });
  });
});
