/* global describe, expect, test */

import Validation from '../../src/validation';

describe('Data.Validation', () => {
  describe('Validation.isSuccess', () => {
    test('It should return true if the instance is a Success', () => {
      expect(Validation.isSuccess(Validation.Success.of())).toBe(true);
    });

    test('It should return false if the instance is a Failure', () => {
      expect(Validation.isSuccess(Validation.Failure.of())).toBe(false);
    });
  });

  describe('Validation#isSuccess', () => {
    test('It should return true if the instance is a Success', () => {
      expect(Validation.Success.of().isSuccess()).toBe(true);
    });

    test('It should return false if the instance is a Failure', () => {
      expect(Validation.Failure.of().isSuccess()).toBe(false);
    });
  });
});
