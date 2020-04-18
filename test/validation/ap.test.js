/* global describe, expect, test */

const Validation = require('../../src/validation');

describe('Data.Validation', () => {
  describe('Validation.ap', () => {
    test('It should apply the transform if the instance is a Success', () => {
      const either = Validation.of('text');
      const apply = Validation.of(x => x.toUpperCase());

      const result = Validation.ap(apply, either);

      expect(Validation.isSuccess(result)).toBe(true);
      expect(result.value).toEqual('TEXT');
    });

    test('It should ignore the transform if the instance is a Failure', () => {
      const either = Validation.Failure.of('text');
      const apply = Validation.of(x => x.toUpperCase());

      const result = Validation.ap(apply, either);

      expect(Validation.isFailure(result)).toBe(true);
      expect(result.value).toEqual('text');
    });
  });

  describe('Validation#ap', () => {
    test('It should apply the transform if the instance is a Success', () => {
      const result = Validation
        .of('text')
        .ap(Validation.of(x => x.toUpperCase()));

      expect(result.isSuccess()).toBe(true);
      expect(result.value).toEqual('TEXT');
    });

    test('It should ignore the transform if the instance is a Failure', () => {
      const result = Validation
        .Failure.of('text')
        .ap(Validation.of(x => x.toUpperCase()));

      expect(result.isSuccess()).toBe(false);
      expect(result.value).toEqual('text');
    });
  });
});
