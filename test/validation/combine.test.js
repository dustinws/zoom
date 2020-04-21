/* global describe, expect, test */

const Validation = require('../../src/validation');

describe('Data.Validation', () => {
  describe('Validation.combine', () => {
    test('It should reduce all validations down a single validation.', () => {
      const failedA = Validation.combine([
        Validation.Failure(),
        Validation.Success(),
        Validation.Success(),
      ]);

      const failedB = Validation.combine([
        Validation.Success(),
        Validation.Failure(),
        Validation.Success(),
      ]);

      const failedC = Validation.combine([
        Validation.Success(),
        Validation.Success(),
        Validation.Failure(),
      ]);

      const success = Validation.combine([
        Validation.Success(),
        Validation.Success(),
        Validation.Success(),
      ]);

      expect(success.isSuccess()).toBe(true);
      expect(failedA.isFailure()).toBe(true);
      expect(failedB.isFailure()).toBe(true);
      expect(failedC.isFailure()).toBe(true);
    });
  });
});
