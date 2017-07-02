/* global describe, expect, test */
import Maybe from '../Maybe';

describe('data.Maybe', () => {
  describe('Maybe.of', () => {
    test('It should return an instance of Maybe', () => {
      expect(Maybe.of(1) instanceof Maybe).toBe(true);
    });
  });

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

  describe('Maybe.chain', () => {
    test('It should apply the transform if the instance is a Just', () => {
      const transform = x => x.toUpperCase();
      const maybe = Maybe.of('text');

      const result = Maybe.chain(transform, maybe);

      expect(result).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Nothing', () => {
      const transform = x => x.toUpperCase();
      const maybe = Maybe.Nothing;

      const result = Maybe.chain(transform, maybe);

      expect(result).toBe(maybe);
    });
  });

  describe('Maybe.isNothing', () => {
    test('It should return true if the instance is a Nothing', () => {
      expect(Maybe.isNothing(Maybe.Nothing)).toBe(true);
    });

    test('It should return false if the instance is a Just', () => {
      expect(Maybe.isNothing(Maybe.Just.of())).toBe(false);
    });
  });

  describe('Maybe.isJust', () => {
    test('It should return true if the instance is a Just', () => {
      expect(Maybe.isJust(Maybe.Just.of())).toBe(true);
    });

    test('It should return false if the instance is a Nothing', () => {
      expect(Maybe.isJust(Maybe.Nothing)).toBe(false);
    });
  });

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

  describe('Maybe#of', () => {
    test('It should return an instance of Maybe', () => {
      const maybe = Maybe.of();

      expect(maybe.of(1).isJust()).toBe(true);
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

  describe('Maybe#chain', () => {
    test('It should apply the transform if the instance is a Just', () => {
      const result = Maybe.Just.of('text');
      const value = result.chain(x => x.toUpperCase());

      expect(value).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Nothing', () => {
      const result = Maybe.Nothing.of();
      const value = result.chain(x => x.toUpperCase());

      expect(value).toBe(result);
    });
  });

  describe('Maybe#isNothing', () => {
    test('It should return true if the instance is a Nothing', () => {
      expect(Maybe.Nothing.of().isNothing()).toBe(true);
    });

    test('It should return false if the instance is a Just', () => {
      expect(Maybe.Just.of().isNothing()).toBe(false);
    });
  });

  describe('Maybe#isJust', () => {
    test('It should return true if the instance is a Just', () => {
      expect(Maybe.Just.of().isJust()).toBe(true);
    });

    test('It should return false if the instance is a Nothing', () => {
      expect(Maybe.Nothing.of().isJust()).toBe(false);
    });
  });
});
