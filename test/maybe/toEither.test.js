/* global describe, expect, test */

const Maybe = require('../../src/maybe');


describe('Data.Maybe', () => {
  describe('Maybe.toEither', () => {
    test('It should return a Right if the Maybe is Just', () => {
      const either = Maybe.toEither(Maybe.Just());

      expect(either.isRight()).toBe(true);
    });

    test('It should return a Left if the Maybe is Nothing', () => {
      const either = Maybe.toEither(Maybe.Nothing);

      expect(either.isLeft()).toBe(true);
    });
  });

  describe('Maybe#toEither', () => {
    test('It should return a Right if the instance is a Just', () => {
      expect(Maybe.Just.of().toEither().isRight()).toBe(true);
    });

    test('It should return a Left if the instance is a Nothing', () => {
      expect(Maybe.Nothing.of().toEither().isLeft()).toBe(true);
    });
  });
});
