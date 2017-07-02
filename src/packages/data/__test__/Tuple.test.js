/* global describe, expect, test */
import Tuple from '../Tuple';

describe('data.Tuple', () => {
  describe('Tuple.of', () => {
    test('It should create a tuple instance', () => {
      expect(Tuple.of(1, 2) instanceof Tuple).toBe(true);
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
