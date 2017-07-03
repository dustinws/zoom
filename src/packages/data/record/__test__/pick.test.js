/* global describe, expect, test */
import pick from '../pick';

describe('Zoom.Data.Record.pick', () => {
  test('It should make a shallow copy of two objects', () => {
    const result = pick(['a', 'b'], { a: 1, b: 2, c: 3, d: 4 });

    expect(result).toEqual({ a: 1, b: 2 });
  });
});
