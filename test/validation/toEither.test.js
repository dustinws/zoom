/* global describe, expect, test */

const Validation = require('../../src/validation');


describe('Data.Validation', () => {
  describe('Validation.toEither', () => {
    test('It should return a Right if the Validation is a Success', () => {
      const either = Validation.toEither(Validation.Success());

      expect(either.isRight()).toBe(true);
    });

    test('It should return a Left if the Validation is a Failure', () => {
      const either = Validation.toEither(Validation.Failure());

      expect(either.isLeft()).toBe(true);
    });
  });

  describe('Validation#toEither', () => {
    test('It should return a Right if the instance is a Success', () => {
      expect(Validation.Success.of().toEither().isRight()).toBe(true);
    });

    test('It should return a Left if the instance is a Failure', () => {
      expect(Validation.Failure.of().toEither().isLeft()).toBe(true);
    });
  });
});
