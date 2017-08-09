/* global describe, expect, test */
import Tuple from '../../src/tuple';

describe('Data.Tuple', () => {
  describe('Tuple.snd', () => {
    test('It should return the second element of the tuple', () => {
      const tuple = Tuple(1, 2);

      expect(Tuple.snd(tuple)).toBe(2);
    });
  });

  describe('Tuple#snd', () => {
    test('It should return the second element of the tuple', () => {
      const tuple = Tuple(1, 2);

      expect(tuple.snd()).toBe(2);
    });
  });
});
