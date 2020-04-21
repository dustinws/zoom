/* global describe, expect, test */

const Validation = require('../../src/validation');


describe('Data.Validation', () => {
  describe('Validation.toMaybe', () => {
    test('It should return a Nothing if the Validation is a Success', () => {
      const maybe = Validation.toMaybe(Validation.Success());

      expect(maybe.isJust()).toBe(true);
    });

    test('It should return a Nothing if the Validation is a Failure', () => {
      const maybe = Validation.toMaybe(Validation.Failure());

      expect(maybe.isNothing()).toBe(true);
    });
  });

  describe('Validation#toMaybe', () => {
    test('It should return a Just if the instance is a Success', () => {
      expect(Validation.Success.of().toMaybe().isJust()).toBe(true);
    });

    test('It should return a Nothing if the instance is a Failure', () => {
      expect(Validation.Failure.of().toMaybe().isNothing()).toBe(true);
    });
  });
});
