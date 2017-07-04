/* global describe, expect, test */
import Tuple from '../Tuple';

describe('Zoom.Data.Tuple', () => {
  describe('Tuple.of', () => {
    test('It should create a tuple instance', () => {
      expect(Tuple.of(1, 2) instanceof Tuple).toBe(true);
    });
  });

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

  describe('Tuple.fst', () => {
    test('It should return the first element of the tuple', () => {
      const tuple = Tuple(1, 2);

      expect(Tuple.fst(tuple)).toBe(1);
    });
  });

  describe('Tuple.snd', () => {
    test('It should return the second element of the tuple', () => {
      const tuple = Tuple(1, 2);

      expect(Tuple.snd(tuple)).toBe(2);
    });
  });

  describe('Tuple.map', () => {
    test('It should apply the function to the second element of the tuple', () => {
      const tuple = Tuple(1, 2);
      const inc = n => n + 1;

      expect(Tuple.snd(Tuple.map(inc, tuple))).toBe(3);
    });
  });

  describe('Tuple.mapLeft', () => {
    test('It should apply the function to the second element of the tuple', () => {
      const tuple = Tuple(1, 2);
      const inc = n => n + 1;

      expect(Tuple.fst(Tuple.mapLeft(inc, tuple))).toBe(2);
    });
  });

  describe('Tuple#of', () => {
    test('It should create a tuple instance', () => {
      const emptyTuple = Tuple.of();

      expect(emptyTuple.of(1, 2) instanceof Tuple).toBe(true);
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

  describe('Tuple#fst', () => {
    test('It should return the first element of the tuple', () => {
      const tuple = Tuple(1, 2);

      expect(tuple.fst()).toBe(1);
    });
  });

  describe('Tuple#snd', () => {
    test('It should return the second element of the tuple', () => {
      const tuple = Tuple(1, 2);

      expect(tuple.snd()).toBe(2);
    });
  });

  describe('Tuple#map', () => {
    test('It should apply the function to the second element of the tuple', () => {
      const tuple = Tuple(1, 2);
      const inc = n => n + 1;

      expect(tuple.map(inc).snd()).toBe(3);
    });
  });

  describe('Tuple#mapLeft', () => {
    test('It should apply the function to the second element of the tuple', () => {
      const tuple = Tuple(1, 2);
      const inc = n => n + 1;

      expect(tuple.mapLeft(inc).fst()).toBe(2);
    });
  });

  test('Tuple#toString()', () => {
    const tuple = Tuple(1, 2);

    expect(tuple.toString()).toBe('(1, 2)');
  });
});
