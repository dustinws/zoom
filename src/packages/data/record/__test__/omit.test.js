/* global describe, expect, test */
import omit from '../omit';

describe('Zoom.Data.Record.omit', () => {
  test('It should make a shallow copy of two objects', () => {
    const result = omit(['c', 'd'], { a: 1, b: 2, c: 3, d: 4 });

    expect(result).toEqual({ a: 1, b: 2 });
  });
});
