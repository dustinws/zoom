/* global describe, expect, test */

const Validation = require('../../src/validation');

describe('Data.Validation', () => {
  describe('Validation.andThen', () => {
    test('It should apply the transform if the instance is a Success', () => {
      const transform = x => x.toUpperCase();
      const either = Validation.of('text');

      const result = Validation.andThen(transform, either);

      expect(result).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Failure', () => {
      const transform = x => x.toUpperCase();
      const either = Validation.Failure.of('text');

      const result = Validation.andThen(transform, either);

      expect(result).toBe(either);
    });
  });

  describe('Validation#andThen', () => {
    test('It should apply the transform if the instance is a Success', () => {
      const transform = x => x.toUpperCase();

      const result = Validation.of('text').andThen(transform);

      expect(result).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Failure', () => {
      const transform = x => x.toUpperCase();
      const either = Validation.Failure.of('text');
      const result = either.andThen(transform);

      expect(result).toBe(either);
    });
  });
});
