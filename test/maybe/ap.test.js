/* global describe, expect, test */

import Maybe from '../../src/maybe';

describe('Data.Maybe', () => {
  describe('Maybe.ap', () => {
    test('It should apply the transform if the instance is a Just', () => {
      const maybe = Maybe.of('text');
      const apply = Maybe.of(x => x.toUpperCase());

      const result = Maybe.ap(apply, maybe);

      expect(Maybe.isJust(result)).toBe(true);
      expect(result.value).toEqual('TEXT');
    });

    test('It should ignore the transform if the instance is a Nothing', () => {
      const maybe = Maybe.Nothing;
      const apply = Maybe.of(x => x.toUpperCase());

      const result = Maybe.ap(apply, maybe);

      expect(Maybe.isNothing(result)).toBe(true);
    });
  });

  describe('Maybe#ap', () => {
    test('It should apply the transform if the instance is a Just', () => {
      const result = Maybe
        .Just.of('text')
        .ap(Maybe.of(x => x.toUpperCase()));

      expect(Maybe.isJust(result)).toBe(true);
      expect(result.value).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Nothing', () => {
      const result = Maybe
        .Nothing.of()
        .ap(Maybe.of(x => x.toUpperCase()));

      expect(Maybe.isNothing(result)).toBe(true);
    });
  });
});
