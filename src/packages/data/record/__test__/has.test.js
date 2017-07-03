/* global describe, expect, test */
import has from '../has';

describe('Zoom.Data.Record.has', () => {
  test('it should return true if the record has the key', () => {
    expect(has('a', { a: 1 })).toBe(true);
  });

  test('it should return false if the record does not have the key', () => {
    expect(has('b', { a: 1 })).toBe(false);
  });
});
