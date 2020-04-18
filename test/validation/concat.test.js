/* global describe, expect, test */

const Validation = require('../../src/validation');

describe('Data.Validation', () => {
  describe('Validation.concat', () => {
    test('It should return the failure if they are mixed', () => {
      const left = Validation.Failure();
      const right = Validation.Success();

      expect(Validation.concat(left, right)).toBe(left);
      expect(Validation.concat(right, left)).toBe(left);
    });

    test('It should concat the successes if they are both successes', () => {
      const left = Validation.Success(['a']);
      const right = Validation.Success(['b']);

      expect(Validation.concat(left, right).value).toEqual(['a', 'b']);
      expect(Validation.concat(right, left).value).toEqual(['b', 'a']);
    });

    test('It should concat the failures if they are both failures', () => {
      const left = Validation.Failure(['a']);
      const right = Validation.Failure(['b']);

      expect(Validation.concat(left, right).value).toEqual(['a', 'b']);
      expect(Validation.concat(right, left).value).toEqual(['b', 'a']);
    });
  });

  describe('Validation#concat', () => {
    test('It should return the failure if they are mixed', () => {
      const left = Validation.Failure();
      const right = Validation.Success();

      expect(right.concat(left)).toBe(left);
      expect(left.concat(right)).toBe(left);
    });

    test('It should concat the successes if they are both successes', () => {
      const left = Validation.Success(['a']);
      const right = Validation.Success(['b']);

      expect(right.concat(left).value).toEqual(['a', 'b']);
      expect(left.concat(right).value).toEqual(['b', 'a']);
    });

    test('It should concat the failures if they are both failures', () => {
      const left = Validation.Failure(['a']);
      const right = Validation.Failure(['b']);

      expect(right.concat(left).value).toEqual(['a', 'b']);
      expect(left.concat(right).value).toEqual(['b', 'a']);
    });
  });
});
