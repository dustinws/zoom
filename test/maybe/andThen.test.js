/* global describe, expect, test */

const Maybe = require('../../src/maybe');

describe('Data.Maybe', () => {
  describe('Maybe.andThen', () => {
    test('It should apply the transform if the instance is a Just', () => {
      const transform = x => x.toUpperCase();
      const maybe = Maybe.of('text');

      const result = Maybe.andThen(transform, maybe);

      expect(result).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Nothing', () => {
      const transform = x => x.toUpperCase();
      const maybe = Maybe.Nothing;

      const result = Maybe.andThen(transform, maybe);

      expect(result).toBe(maybe);
    });
  });

  describe('Maybe#andThen', () => {
    test('It should apply the transform if the instance is a Just', () => {
      const result = Maybe.Just.of('text');
      const value = result.andThen(x => x.toUpperCase());

      expect(value).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Nothing', () => {
      const result = Maybe.Nothing.of();
      const value = result.andThen(x => x.toUpperCase());

      expect(value).toBe(result);
    });
  });
});
