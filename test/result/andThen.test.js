/* global describe, expect, test */

const Result = require('../../src/result');

describe('Data.Result', () => {
  describe('Result.andThen', () => {
    test('It should apply the transform if the instance is a Ok', () => {
      const transform = x => x.toUpperCase();
      const result = Result.of('text');

      const final = Result.andThen(transform, result);

      expect(final).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Err', () => {
      const transform = x => x.toUpperCase();
      const result = Result.Err.of('text');

      const final = Result.andThen(transform, result);

      expect(final).toBe(result);
    });
  });

  describe('Result#andThen', () => {
    test('It should apply the transform if the instance is a Ok', () => {
      const final = Result.Ok.of('text');
      const value = final.andThen(x => x.toUpperCase());

      expect(value).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Err', () => {
      const final = Result.Err.of('text');
      const value = final.andThen(x => x.toUpperCase());

      expect(value).toBe(final);
    });
  });
});
