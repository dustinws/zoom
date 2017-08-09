/* global describe, expect, test */

import Tuple from '../../src/tuple';

describe('Data.Tuple', () => {
  describe('Tuple.equals', () => {
    test('It should return true if both tuples contain arguments that pass ===', () => {
      const tupleA = Tuple(1, 2);
      const tupleB = Tuple(1, 2);

      expect(Tuple.equals(tupleA, tupleB)).toBe(true);
      expect(Tuple.equals(tupleB, tupleA)).toBe(true);
    });

    test('It should return false if any elements cant pass ===', () => {
      const tupleA = Tuple(1, 2);
      const tupleB = Tuple(3, 4);

      expect(Tuple.equals(tupleA, tupleB)).toBe(false);
      expect(Tuple.equals(tupleB, tupleA)).toBe(false);
    });
  });

  describe('Tuple#equals', () => {
    test('It should return true if both tuples contain arguments that pass ===', () => {
      const tupleA = Tuple(1, 2);
      const tupleB = Tuple(1, 2);

      expect(tupleA.equals(tupleB)).toBe(true);
      expect(tupleB.equals(tupleA)).toBe(true);
    });

    test('It should return false if any elements dont pass ===', () => {
      const tupleA = Tuple(1, 2);
      const tupleB = Tuple(3, 4);

      expect(tupleA.equals(tupleB)).toBe(false);
      expect(tupleB.equals(tupleA)).toBe(false);
    });
  });
});
