/* global describe, expect, test */

const Either = require('../../src/either');

const { Left, Right } = Either;

describe('Data.Either', () => {
  describe('Either.isRight', () => {
    test('It should return true if the instance is a Right', () => {
      expect(Either.isRight(Right.of())).toBe(true);
    });

    test('It should return false if the instance is a Left', () => {
      expect(Either.isRight(Left.of())).toBe(false);
    });
  });

  describe('Either#isRight', () => {
    test('It should return true if the instance is a Right', () => {
      expect(Right.of().isRight()).toBe(true);
    });

    test('It should return false if the instance is a Left', () => {
      expect(Left.of().isRight()).toBe(false);
    });
  });
});
