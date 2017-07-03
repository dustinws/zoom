/* global describe, expect, test */
import merge from '../merge';

describe('Zoom.Data.Record.merge', () => {
  test('It should make a shallow copy of two objects', () => {
    const result = merge({ a: 1 }, { b: 2 });

    expect(result).toEqual({ a: 1, b: 2 });
  });
});
