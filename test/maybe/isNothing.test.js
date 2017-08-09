/* global describe, expect, test */

import Maybe from '../../src/maybe';

describe('Data.Maybe', () => {
  describe('Maybe.isNothing', () => {
    test('It should return true if the instance is a Nothing', () => {
      expect(Maybe.isNothing(Maybe.Nothing)).toBe(true);
    });

    test('It should return false if the instance is a Just', () => {
      expect(Maybe.isNothing(Maybe.Just.of())).toBe(false);
    });
  });

  describe('Maybe#isNothing', () => {
    test('It should return true if the instance is a Nothing', () => {
      expect(Maybe.Nothing.of().isNothing()).toBe(true);
    });

    test('It should return false if the instance is a Just', () => {
      expect(Maybe.Just.of().isNothing()).toBe(false);
    });
  });
});
