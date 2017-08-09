/* global describe, expect, test */

import Result from '../../src/result';

describe('Data.Result', () => {
  describe('Result.isOk', () => {
    test('It should return true if the instance is a Ok', () => {
      expect(Result.isOk(Result.Ok.of())).toBe(true);
    });

    test('It should return false if the instance is a Err', () => {
      expect(Result.isOk(Result.Err.of())).toBe(false);
    });
  });

  describe('Result#isOk', () => {
    test('It should return true if the instance is a Ok', () => {
      expect(Result.Ok.of().isOk()).toBe(true);
    });

    test('It should return false if the instance is a Err', () => {
      expect(Result.Err.of().isOk()).toBe(false);
    });
  });
});
