/* global describe, expect, test */

const Result = require('../../src/result');


describe('Data.Result', () => {
  describe('Result.toValidation', () => {
    test('It should return a Success if the Result is Ok', () => {
      const either = Result.toValidation(Result.Ok());

      expect(either.isSuccess()).toBe(true);
    });

    test('It should return a Failure if the Result is an Err', () => {
      const either = Result.toValidation(Result.Err());

      expect(either.isFailure()).toBe(true);
    });
  });

  describe('Result#toValidation', () => {
    test('It should return a Success if the instance is a Ok', () => {
      expect(Result.Ok.of().toValidation().isSuccess()).toBe(true);
    });

    test('It should return a Failure if the instance is a Err', () => {
      expect(Result.Err.of().toValidation().isFailure()).toBe(true);
    });
  });
});
