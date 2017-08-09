/* global describe, expect, test */

import Either from '../../src/either';

const { Left, Right } = Either;

describe('Data.Either', () => {
  describe('Either.map', () => {
    test('It should apply the transform if the instance is a Right', () => {
      const transform = x => x.toUpperCase();
      const either = Right.of('text');

      const result = Either.map(transform, either);

      expect(Either.isRight(result)).toBe(true);
      expect(result.value).toEqual('TEXT');
    });

    test('It should ignore the transform if the instance is a Left', () => {
      const transform = x => x.toUpperCase();
      const either = Left.of('text');

      const result = Either.map(transform, either);

      expect(Either.isLeft(result)).toBe(true);
      expect(result.value).toEqual('text');
    });
  });

  describe('Either#map', () => {
    test('It should apply the transform if the instance is a Right', () => {
      const result = Either
        .Right.of('text')
        .map(x => x.toUpperCase());

      expect(Either.isRight(result)).toBe(true);
      expect(result.value).toEqual('TEXT');
    });

    test('It should ignore the transform if the instance is a Left', () => {
      const result = Either
        .Left.of('text')
        .map(x => x.toUpperCase());

      expect(Either.isLeft(result)).toBe(true);
      expect(result.value).toEqual('text');
    });
  });
});
