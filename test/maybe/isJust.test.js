/* global describe, expect, test */

import Maybe from '../../src/maybe';

describe('Data.Maybe', () => {
  describe('Maybe.isJust', () => {
    test('It should return true if the instance is a Just', () => {
      expect(Maybe.isJust(Maybe.Just.of())).toBe(true);
    });

    test('It should return false if the instance is a Nothing', () => {
      expect(Maybe.isJust(Maybe.Nothing)).toBe(false);
    });
  });

  describe('Maybe#isJust', () => {
    test('It should return true if the instance is a Just', () => {
      expect(Maybe.Just.of().isJust()).toBe(true);
    });

    test('It should return false if the instance is a Nothing', () => {
      expect(Maybe.Nothing.of().isJust()).toBe(false);
    });
  });
});
