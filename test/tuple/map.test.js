/* global describe, expect, test */

import Tuple from '../../src/tuple';

describe('Data.Tuple', () => {
  describe('Tuple.map', () => {
    test('It should apply the function to the second element of the tuple', () => {
      const tuple = Tuple(1, 2);
      const inc = n => n + 1;

      expect(Tuple.snd(Tuple.map(inc, tuple))).toBe(3);
    });
  });

  describe('Tuple#map', () => {
    test('It should apply the function to the second element of the tuple', () => {
      const tuple = Tuple(1, 2);
      const inc = n => n + 1;

      expect(tuple.map(inc).snd()).toBe(3);
    });
  });
});
