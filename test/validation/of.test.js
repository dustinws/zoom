/* global describe, expect, test */

import Validation from '../../src/validation';

describe('Data.Validation', () => {
  describe('Validation.of', () => {
    test('It should return an instance of Validation', () => {
      expect(Validation.of(1).isSuccess()).toBe(true);
    });
  });

  describe('Validation#of', () => {
    test('It should return an instance of Validation', () => {
      expect(Validation.of(1).isSuccess()).toBe(true);
      expect(Validation.Success.of().of().isSuccess()).toBe(true);
      expect(Validation.Failure.of().of().isFailure()).toBe(true);
    });
  });
});
