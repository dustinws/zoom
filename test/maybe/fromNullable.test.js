/* global describe, expect, test */

const Maybe = require('../../src/maybe');

describe('Data.Maybe', () => {
  describe('Maybe.fromNullable', () => {
    test('It return a Nothing if the value is null or undefined', () => {
      expect(Maybe.fromNullable()).toBe(Maybe.Nothing);
      expect(Maybe.fromNullable(null)).toBe(Maybe.Nothing);
      expect(Maybe.fromNullable(undefined)).toBe(Maybe.Nothing);
    });

    test('It return a Just if the value is not null or undefined', () => {
      expect(Maybe.isJust(Maybe.fromNullable(''))).toBe(true);
      expect(Maybe.isJust(Maybe.fromNullable(true))).toBe(true);
    });
  });
});
