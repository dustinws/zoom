/* global describe, expect, test */

import Tuple from '../../src/tuple';

describe('Data.Tuple', () => {
  describe('Tuple.mapLeft', () => {
    test('It should apply the function to the second element of the tuple', () => {
      const tuple = Tuple(1, 2);
      const inc = n => n + 1;

      expect(Tuple.fst(Tuple.mapLeft(inc, tuple))).toBe(2);
    });
  });

  describe('Tuple#mapLeft', () => {
    test('It should apply the function to the second element of the tuple', () => {
      const tuple = Tuple(1, 2);
      const inc = n => n + 1;

      expect(tuple.mapLeft(inc).fst()).toBe(2);
    });
  });
});
