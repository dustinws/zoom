/* global describe, expect, test */

import Either from '../../src/either';

const { Left, Right } = Either;

describe('Data.Either', () => {
  describe('Either.isLeft', () => {
    test('It should return true if the instance is a Left', () => {
      expect(Either.isLeft(Left.of())).toBe(true);
    });

    test('It should return false if the instance is a Right', () => {
      expect(Either.isLeft(Right.of())).toBe(false);
    });
  });

  describe('Either#isLeft', () => {
    test('It should return true if the instance is a Left', () => {
      expect(Left.of().isLeft()).toBe(true);
    });

    test('It should return false if the instance is a Right', () => {
      expect(Right.of().isLeft()).toBe(false);
    });
  });
});
