/* global describe, expect, test */

const Validation = require('../../src/validation');

describe('Data.Validation', () => {
  describe('Validation.isFailure', () => {
    test('It should return true if the instance is a Failure', () => {
      expect(Validation.isFailure(Validation.Failure.of())).toBe(true);
    });

    test('It should return false if the instance is a Success', () => {
      expect(Validation.isFailure(Validation.Success.of())).toBe(false);
    });
  });

  describe('Validation#isFailure', () => {
    test('It should return true if the instance is a Failure', () => {
      expect(Validation.Failure.of().isFailure()).toBe(true);
    });

    test('It should return false if the instance is a Success', () => {
      expect(Validation.Success.of().isFailure()).toBe(false);
    });
  });
});
