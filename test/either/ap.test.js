/* global describe, expect, test */

import Either from '../../src/either';

const { Left, Right } = Either;

describe('Data.Either', () => {
  describe('Either.ap', () => {
    test('It should apply the transform if the instance is a Right', () => {
      const either = Right.of('text');
      const apply = Right.of(x => x.toUpperCase());

      const result = Either.ap(apply, either);

      expect(Either.isRight(result)).toBe(true);
      expect(result.value).toEqual('TEXT');
    });

    test('It should ignore the transform if the instance is a Left', () => {
      const either = Left.of('text');
      const apply = Right.of(x => x.toUpperCase());

      const result = Either.ap(apply, either);

      expect(Either.isLeft(result)).toBe(true);
      expect(result.value).toEqual('text');
    });
  });

  describe('Either#ap', () => {
    test('It should apply the transform if the instance is a Right', () => {
      const result = Either
        .Right.of('text')
        .ap(Right.of(x => x.toUpperCase()));

      expect(Either.isRight(result)).toBe(true);
      expect(result.value).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Left', () => {
      const result = Either
        .Left.of('text')
        .ap(Right.of(x => x.toUpperCase()));

      expect(Either.isLeft(result)).toBe(true);
      expect(result.value).toBe('text');
    });
  });
});
