/* global describe, expect, test */

const Result = require('../../src/result');


describe('Data.Result', () => {
  describe('Result.toEither', () => {
    test('It should return a Right if the Result is Ok', () => {
      const either = Result.toEither(Result.Ok());

      expect(either.isRight()).toBe(true);
    });

    test('It should return a Left if the Result is an Err', () => {
      const either = Result.toEither(Result.Err());

      expect(either.isLeft()).toBe(true);
    });
  });

  describe('Result#toEither', () => {
    test('It should return a Right if the instance is a Ok', () => {
      expect(Result.Ok.of().toEither().isRight()).toBe(true);
    });

    test('It should return a Left if the instance is a Err', () => {
      expect(Result.Err.of().toEither().isLeft()).toBe(true);
    });
  });
});
