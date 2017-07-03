/* global describe, expect, test */
import size from '../size';

describe('Zoom.Data.Record.size', () => {
  test('it should return the number of enumerable keys an object has', () => {
    expect(size({ a: 1 })).toBe(1);
    expect(size({ a: 1, b: 2 })).toBe(2);
  });
});
