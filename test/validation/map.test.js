/* global describe, expect, test */

import Validation from '../../src/validation';

describe('Data.Validation', () => {
  describe('Validation.map', () => {
    test('It should apply the transform if the instance is a Success', () => {
      const transform = x => x.toUpperCase();
      const either = Validation.of('text');

      const result = Validation.map(transform, either);

      expect(Validation.isSuccess(result)).toBe(true);
      expect(result.value).toEqual('TEXT');
    });

    test('It should ignore the transform if the instance is a Failure', () => {
      const transform = x => x.toUpperCase();
      const either = Validation.Failure.of('text');

      const result = Validation.map(transform, either);

      expect(Validation.isFailure(result)).toBe(true);
      expect(result.value).toEqual('text');
    });
  });

  describe('Validation#map', () => {
    test('It should apply the transform if the instance is a Success', () => {
      const transform = x => x.toUpperCase();

      const result = Validation.of('text').map(transform);

      expect(result.isSuccess()).toBe(true);
      expect(result.value).toEqual('TEXT');
    });

    test('It should ignore the transform if the instance is a Failure', () => {
      const transform = x => x.toUpperCase();

      const result = Validation.Failure.of('text').map(transform);

      expect(result.isFailure()).toBe(true);
      expect(result.value).toEqual('text');
    });
  });
});
