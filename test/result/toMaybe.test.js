/* global describe, expect, test */

const Result = require('../../src/result');


describe('Data.Result', () => {
  describe('Result.toMaybe', () => {
    test('It should return a Nothing if the Result is Ok', () => {
      const maybe = Result.toMaybe(Result.Ok());

      expect(maybe.isJust()).toBe(true);
    });

    test('It should return a Nothing if the Result is Left', () => {
      const maybe = Result.toMaybe(Result.Err());

      expect(maybe.isNothing()).toBe(true);
    });
  });

  describe('Result#toMaybe', () => {
    test('It should return a Just if the instance is a Ok', () => {
      expect(Result.Ok.of().toMaybe().isJust()).toBe(true);
    });

    test('It should return a Nothing if the instance is a Err', () => {
      expect(Result.Err.of().toMaybe().isNothing()).toBe(true);
    });
  });
});
