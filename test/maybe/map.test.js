/* global describe, expect, test */

const Maybe = require('../../src/maybe');

describe('Data.Maybe', () => {
  describe('Maybe.map', () => {
    test('It should apply the transform if the instance is a Just', () => {
      const transform = x => x.toUpperCase();
      const maybe = Maybe.of('text');

      const result = Maybe.map(transform, maybe);

      expect(Maybe.isJust(result)).toBe(true);
      expect(result.value).toEqual('TEXT');
    });

    test('It should ignore the transform if the instance is a Nothing', () => {
      const transform = x => x.toUpperCase();
      const maybe = Maybe.Nothing;

      const result = Maybe.map(transform, maybe);

      expect(Maybe.isNothing(result)).toBe(true);
    });
  });

  describe('Maybe#map', () => {
    test('It should apply the transform if the instance is a Just', () => {
      const result = Maybe
        .Just.of('text')
        .map(x => x.toUpperCase());

      expect(Maybe.isJust(result)).toBe(true);
      expect(result.value).toEqual('TEXT');
    });

    test('It should ignore the transform if the instance is a Nothing', () => {
      const result = Maybe
        .Nothing.of()
        .map(x => x.toUpperCase());

      expect(Maybe.isNothing(result)).toBe(true);
    });
  });
});
