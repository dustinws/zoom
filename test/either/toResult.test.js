/* global describe, expect, test */

const Either = require('../../src/either');


describe('Data.Either', () => {
  describe('Either.toResult', () => {
    test('It should return an Ok if the Either is Right', () => {
      const maybe = Either.toResult(Either.Right());

      expect(maybe.isOk()).toBe(true);
    });

    test('It should an Err if the Either is Left', () => {
      const maybe = Either.toResult(Either.Left());

      expect(maybe.isErr()).toBe(true);
    });
  });

  describe('Either#toResult', () => {
    test('It should return an Ok if the instance is a Right', () => {
      expect(Either.Right.of().toResult().isOk()).toBe(true);
    });

    test('It should return an Err if the instance is a Left', () => {
      expect(Either.Left.of().toResult().isErr()).toBe(true);
    });
  });
});
