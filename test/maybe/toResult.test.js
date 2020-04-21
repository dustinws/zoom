/* global describe, expect, test */

const Maybe = require('../../src/maybe');


describe('Data.Maybe', () => {
  describe('Maybe.toResult', () => {
    test('It should return an Ok if the Maybe is Just', () => {
      const result = Maybe.toResult(Maybe.Just());

      expect(result.isOk()).toBe(true);
    });

    test('It should return an Err if the Maybe is Nothing', () => {
      const result = Maybe.toResult(Maybe.Nothing);

      expect(result.isErr()).toBe(true);
    });
  });

  describe('Maybe#toResult', () => {
    test('It should return an Ok if the instance is a Just', () => {
      expect(Maybe.Just.of().toResult().isOk()).toBe(true);
    });

    test('It should return an Err if the instance is a Nothing', () => {
      expect(Maybe.Nothing.of().toResult().isErr()).toBe(true);
    });
  });
});
