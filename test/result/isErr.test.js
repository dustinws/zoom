/* global describe, expect, test */

import Result from '../../src/result';

describe('Data.Result', () => {
  describe('Result.isErr', () => {
    test('It should return true if the instance is a Err', () => {
      expect(Result.isErr(Result.Err.of())).toBe(true);
    });

    test('It should return false if the instance is a Ok', () => {
      expect(Result.isErr(Result.Ok.of())).toBe(false);
    });
  });

  describe('Result#isErr', () => {
    test('It should return true if the instance is a Err', () => {
      expect(Result.Err.of().isErr()).toBe(true);
    });

    test('It should return false if the instance is a Ok', () => {
      expect(Result.Ok.of().isErr()).toBe(false);
    });
  });
});
