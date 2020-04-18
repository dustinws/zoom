/* global describe, expect, test */

const Maybe = require('../../src/maybe');

describe('Data.Maybe', () => {
  describe('Maybe.of', () => {
    test('It should return an instance of Maybe', () => {
      expect(Maybe.of(1) instanceof Maybe).toBe(true);
    });
  });

  describe('Maybe#of', () => {
    test('It should return an instance of Maybe', () => {
      const maybe = Maybe.of();

      expect(maybe.of(1).isJust()).toBe(true);
    });
  });
});
