/* global describe, expect, test */

import Either from '../../src/either';

const { Left, Right } = Either;

describe('Data.Either', () => {
  describe('Either.concat', () => {
    test('It should return the Left if they are mixed', () => {
      const left = Left.of('fail');
      const right = Right.of('success');

      expect(Either.concat(left, right)).toEqual(left);
      expect(Either.concat(right, left)).toBe(left);
    });

    test('It should concat the values if they are both Lefts', () => {
      const left = Left.of('a');
      const right = Left.of('b');

      expect(Either.concat(left, right)).toEqual(Left('ab'));
    });

    test('It should concat the values if they are both Rights', () => {
      const left = Right.of('a');
      const right = Right.of('b');

      expect(Either.concat(left, right)).toEqual(Right('ab'));
    });
  });

  describe('Either#concat', () => {
    test('It should return the Left if they are mixed', () => {
      const left = Left.of('fail');
      const right = Right.of('success');

      expect(left.concat(right)).toEqual(left);
      expect(right.concat(left)).toBe(left);
    });

    test('It should concat the values if they are both Lefts', () => {
      const left = Left.of('a');
      const right = Left.of('b');

      expect(left.concat(right)).toEqual(Left('ab'));
    });

    test('It should concat the values if they are both Rights', () => {
      const left = Right.of('a');
      const right = Right.of('b');

      expect(left.concat(right)).toEqual(Right('ab'));
    });
  });
});
