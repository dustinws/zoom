/* global describe, expect, test */
import matches from '../matches';

describe('Zoom.Data.Record.matches', () => {
  test('it should return true if the record matches the key', () => {
    expect(matches({ a: 1 }, { a: 1, b: 2 })).toBe(true);
  });

  test('it should return false if the record does not have the key', () => {
    expect(matches({ a: 2 }, { a: 1 })).toBe(false);
  });
});
