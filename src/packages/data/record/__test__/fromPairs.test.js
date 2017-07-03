/* global describe, expect, test */
import fromPairs from '../fromPairs';

describe('Zoom.Data.Record.fromPairs', () => {
  test('it should turn an array of [key, value] tuples into an object', () => {
    expect(fromPairs([['a', 1], ['b', 2]])).toEqual({ a: 1, b: 2 });
  });
});
