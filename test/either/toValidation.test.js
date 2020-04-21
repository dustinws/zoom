/* global describe, expect, test */

const Either = require('../../src/either');


describe('Data.Either', () => {
  describe('Either.toValidation', () => {
    test('It should return a Success if the Either is Right', () => {
      const validation = Either.toValidation(Either.Right());

      expect(validation.isSuccess()).toBe(true);
    });

    test('It should return a Failure if the Either is Left', () => {
      const validation = Either.toValidation(Either.Left());

      expect(validation.isFailure()).toBe(true);
    });
  });

  describe('Either#toValidation', () => {
    test('It should return a Success if the instance is a Right', () => {
      expect(Either.Right.of().toValidation().isSuccess()).toBe(true);
    });

    test('It should return a Failure if the instance is a Left', () => {
      expect(Either.Left.of().toValidation().isFailure()).toBe(true);
    });
  });
});
