/* global describe, expect, test */

const Either = require('../../src/either');


describe('Data.Either', () => {
  describe('Either.try', () => {
    test('It should not throw an error.', () => {
      const wrapped = Either.try(() => {
        throw new Error('I threw.');
      });

      expect(() => wrapped).not.toThrow();
    });

    test('It returns the error that was thrown in a Left.', () => {
      const wrapped = Either.try(() => {
        throw new Error('I threw.');
      });

      const result = wrapped();

      expect(result.isLeft()).toBe(true);
      expect(result.value instanceof Error).toBe(true);
      expect(result.value.message).toBe('I threw.');
    });

    test('It returns the return value in a Right if nothing threw.', () => {
      const wrapped = Either.try(() => 'Hey, I am ok');

      const result = wrapped();

      expect(result.isRight()).toBe(true);
      expect(result.value).toBe('Hey, I am ok');
    });
  });
});
