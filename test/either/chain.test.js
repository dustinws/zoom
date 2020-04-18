/* global describe, expect, test */

const Either = require('../../src/either');

const { Left, Right } = Either;

describe('Data.Either', () => {
  describe('Either.chain', () => {
    test('It should apply the transform if the instance is a Right', () => {
      const transform = x => x.toUpperCase();
      const either = Right.of('text');

      const result = Either.chain(transform, either);

      expect(result).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Left', () => {
      const transform = x => x.toUpperCase();
      const either = Left.of('text');

      const result = Either.chain(transform, either);

      expect(result).toBe(either);
    });
  });

  describe('Either#chain', () => {
    test('It should apply the transform if the instance is a Right', () => {
      const result = Right.of('text');
      const value = result.chain(x => x.toUpperCase());

      expect(value).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Left', () => {
      const result = Left.of('text');
      const value = result.chain(x => x.toUpperCase());

      expect(value).toBe(result);
    });
  });
});
