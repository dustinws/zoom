/* global describe, expect, test */

const Tuple = require('../../src/tuple');

describe('Data.Tuple', () => {
  describe('Tuple.fst', () => {
    test('It should return the first element of the tuple', () => {
      const tuple = Tuple(1, 2);

      expect(Tuple.fst(tuple)).toBe(1);
    });
  });

  describe('Tuple#fst', () => {
    test('It should return the first element of the tuple', () => {
      const tuple = Tuple(1, 2);

      expect(tuple.fst()).toBe(1);
    });
  });
});
