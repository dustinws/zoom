/* global describe, expect, test */

const Result = require('../../src/result');

describe('Data.Result', () => {
  describe('Result.of', () => {
    test('It should return an instance of Result', () => {
      expect(Result.of(1) instanceof Result).toBe(true);
    });
  });

  describe('Result#of', () => {
    test('It should return an instance of Result', () => {
      expect(Result.of().of(1).isOk()).toBe(true);
      expect(Result.Ok.of().of(1).isOk()).toBe(true);
      expect(Result.Err.of().of(1).isErr()).toBe(true);
    });
  });
});
