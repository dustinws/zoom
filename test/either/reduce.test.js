/* global describe, expect, test */

import Either from '../../src/either';

const { Left, Right } = Either;

describe('Data.Either', () => {
  describe('Either.reduce', () => {
    test('It should return the seed if the instance is a Left', () => {
      const add = (a, b) => a + b;
      const seed = 0;
      const either = Left(10);

      expect(Either.reduce(add, seed, either)).toBe(0);
    });

    test('It should call call the callback with the seed and the value if the instance is a right', () => {
      const add = (a, b) => a + b;
      const seed = 0;
      const either = Right(10);

      expect(Either.reduce(add, seed, either)).toBe(10);
    });
  });

  describe('Either#reduce', () => {
    test('It should return the seed if the instance is a Left', () => {
      const add = (a, b) => a + b;
      const seed = 0;
      const either = Left(10);

      expect(either.reduce(add, seed)).toBe(0);
    });

    test('It should call call the callback with the seed and the value if the instance is a right', () => {
      const add = (a, b) => a + b;
      const seed = 0;
      const either = Right(10);

      expect(either.reduce(add, seed)).toBe(10);
    });
  });
});
