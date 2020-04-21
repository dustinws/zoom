/* global describe, expect, test */

const Either = require('../../src/either');


describe('Data.Either', () => {
  describe('Either.toMaybe', () => {
    test('It should return a Just if the Either is Right', () => {
      const maybe = Either.toMaybe(Either.Right());

      expect(maybe.isJust()).toBe(true);
    });

    test('It should return a Nothing if the Either is Left', () => {
      const maybe = Either.toMaybe(Either.Left());

      expect(maybe.isNothing()).toBe(true);
    });
  });

  describe('Either#toMaybe', () => {
    test('It should return a Just if the instance is a Right', () => {
      expect(Either.Right.of().toMaybe().isJust()).toBe(true);
    });

    test('It should return a Nothing if the instance is a Left', () => {
      expect(Either.Left.of().toMaybe().isNothing()).toBe(true);
    });
  });
});
