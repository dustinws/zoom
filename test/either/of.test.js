/* global describe, expect, test */

import Either from '../../src/either';

const { Left, Right } = Either;

describe('Data.Either', () => {
  describe('Either.of', () => {
    test('It should return an instance of Either', () => {
      expect(Either.of(1) instanceof Either).toBe(true);
    });
  });

  describe('Either#of', () => {
    test('It should return an instance of Either', () => {
      expect(Either.of().of(1).isRight()).toBe(true);
      expect(Right.of().of(1).isRight()).toBe(true);
      expect(Left.of().of(1).isLeft()).toBe(true);
    });
  });
});
