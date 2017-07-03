/* global describe, expect, test */
import entries from '../entries';

describe('Zoom.Data.Record.entries', () => {
  test('it should an array of [key, value] tuples', () => {
    expect(entries({ a: 1, b: 2 })).toEqual([['a', 1], ['b', 2]]);
  });
});
