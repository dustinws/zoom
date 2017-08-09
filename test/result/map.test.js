/* global describe, expect, test */

import Result from '../../src/result';

describe('Data.Result', () => {
  describe('Result.map', () => {
    test('It should apply the transform if the instance is a Ok', () => {
      const transform = x => x.toUpperCase();
      const result = Result.of('text');

      const final = Result.map(transform, result);

      expect(Result.isOk(final)).toBe(true);
      expect(final.value).toEqual('TEXT');
    });

    test('It should ignore the transform if the instance is a Err', () => {
      const transform = x => x.toUpperCase();
      const result = Result.Err.of('text');

      const final = Result.map(transform, result);

      expect(Result.isErr(final)).toBe(true);
      expect(final.value).toEqual('text');
    });
  });

  describe('Result#map', () => {
    test('It should apply the transform if the instance is a Ok', () => {
      const final = Result
        .Ok.of('text')
        .map(x => x.toUpperCase());

      expect(Result.isOk(final)).toBe(true);
      expect(final.value).toEqual('TEXT');
    });

    test('It should ignore the transform if the instance is a Err', () => {
      const final = Result
        .Err.of('text')
        .map(x => x.toUpperCase());

      expect(Result.isErr(final)).toBe(true);
      expect(final.value).toEqual('text');
    });
  });
});
