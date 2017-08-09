/* global describe, expect, test */

import Either from '../../src/either';

const { Left, Right } = Either;

describe('Data.Either', () => {
  describe('Either.equals', () => {
    test('It should return false if the instances are mixed', () => {
      expect(Either.equals(Left(), Right())).toBe(false);
      expect(Either.equals(Right(), Left())).toBe(false);
    });
  });

  describe('Either#equals', () => {
    test('It should return false if the instances are mixed', () => {
      expect(Left().equals(Right())).toBe(false);
      expect(Right().equals(Left())).toBe(false);
    });

    test('It should return true if they are not mixed and their values pass ===', () => {
      expect(Left(1).equals(Left(1))).toBe(true);
      expect(Right(1).equals(Right(1))).toBe(true);
    });
  });
});
