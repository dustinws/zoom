/* global describe, expect, test */

import Validation from '../../src/validation';

describe('Data.Validation', () => {
  describe('Validation.chain', () => {
    test('It should apply the transform if the instance is a Success', () => {
      const transform = x => x.toUpperCase();
      const either = Validation.of('text');

      const result = Validation.chain(transform, either);

      expect(result).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Failure', () => {
      const transform = x => x.toUpperCase();
      const either = Validation.Failure.of('text');

      const result = Validation.chain(transform, either);

      expect(result).toBe(either);
    });
  });

  describe('Validation#chain', () => {
    test('It should apply the transform if the instance is a Success', () => {
      const transform = x => x.toUpperCase();

      const result = Validation.of('text').chain(transform);

      expect(result).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Failure', () => {
      const transform = x => x.toUpperCase();
      const either = Validation.Failure.of('text');
      const result = either.chain(transform);

      expect(result).toBe(either);
    });
  });
});
