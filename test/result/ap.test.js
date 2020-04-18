/* global describe, expect, test */

const Result = require('../../src/result');

describe('Data.Result', () => {
  describe('Result.ap', () => {
    test('It should apply the transform if the instance is a Ok', () => {
      const result = Result.of('text');
      const apply = Result.of(x => x.toUpperCase());

      const final = Result.ap(apply, result);

      expect(Result.isOk(final)).toBe(true);
      expect(final.value).toEqual('TEXT');
    });

    test('It should ignore the transform if the instance is a Err', () => {
      const result = Result.Err.of('text');
      const apply = Result.of(x => x.toUpperCase());

      const final = Result.ap(apply, result);

      expect(Result.isErr(final)).toBe(true);
      expect(final.value).toEqual('text');
    });
  });

  describe('Result#ap', () => {
    test('It should apply the transform if the instance is a Ok', () => {
      const final = Result
        .Ok.of('text')
        .ap(Result.of(x => x.toUpperCase()));

      expect(Result.isOk(final)).toBe(true);
      expect(final.value).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Err', () => {
      const final = Result
        .Err.of('text')
        .ap(Result.of(x => x.toUpperCase()));

      expect(Result.isErr(final)).toBe(true);
      expect(final.value).toBe('text');
    });
  });
});
