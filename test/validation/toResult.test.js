/* global describe, expect, test */

const Validation = require('../../src/validation');


describe('Data.Validation', () => {
  describe('Validation.toResult', () => {
    test('It should return an Ok if the Validation is a Success', () => {
      const maybe = Validation.toResult(Validation.Success());

      expect(maybe.isOk()).toBe(true);
    });

    test('It should an Err if the Validation is a Failure', () => {
      const maybe = Validation.toResult(Validation.Failure());

      expect(maybe.isErr()).toBe(true);
    });
  });

  describe('Validation#toResult', () => {
    test('It should return an Ok if the instance is a Success', () => {
      expect(Validation.Success.of().toResult().isOk()).toBe(true);
    });

    test('It should return an Err if the instance is a Failure', () => {
      expect(Validation.Failure.of().toResult().isErr()).toBe(true);
    });
  });
});
