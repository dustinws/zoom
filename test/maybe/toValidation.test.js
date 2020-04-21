/* global describe, expect, test */

const Maybe = require('../../src/maybe');


describe('Data.Maybe', () => {
  describe('Maybe.toValidation', () => {
    test('It should return a Success if the Maybe is Just', () => {
      const validation = Maybe.toValidation(Maybe.Just());

      expect(validation.isSuccess()).toBe(true);
    });

    test('It should return a Failure if the Maybe is Nothing', () => {
      const validation = Maybe.toValidation(Maybe.Nothing);

      expect(validation.isFailure()).toBe(true);
    });
  });

  describe('Maybe#toValidation', () => {
    test('It should return a Success if the instance is a Just', () => {
      expect(Maybe.Just.of().toValidation().isSuccess()).toBe(true);
    });

    test('It should return a Failure if the instance is a Nothing', () => {
      expect(Maybe.Nothing.of().toValidation().isFailure()).toBe(true);
    });
  });
});
