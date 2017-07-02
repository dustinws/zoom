/* global describe, expect, test */
import List from '../List';

describe('data.List', () => {
  describe('List.of', () => {
    test('It should create a new array', () => {
      expect(List.of(1, 2, 3)).toEqual([1, 2, 3]);
    });
  });

  describe('List.fold', () => {
    test('It should call the function with the accumulator and next item, for each item', () => {
      const add = (a, b) => a + b;
      const nums = [1, 2, 3, 4, 5];

      expect(List.fold(add, 0, nums)).toBe(15);
    });
  });

  describe('List.map', () => {
    test('It should apply the function to each item and return a new array with the results', () => {
      const add = a => b => a + b;
      const nums = [1, 2, 3, 4, 5];

      expect(List.map(add(1), nums)).toEqual([2, 3, 4, 5, 6]);
    });
  });

  describe('List.filter', () => {
    test('It should return a new array containing the values the predicate returned true for', () => {
      const isEven = n => n % 2 === 0;
      const nums = [1, 2, 3, 4, 5];

      expect(List.filter(isEven, nums)).toEqual([2, 4]);
    });
  });

  describe('List.filter', () => {
    test('It should return a new array containing the values the predicate returned false for', () => {
      const isEven = n => n % 2 === 0;
      const nums = [1, 2, 3, 4, 5];

      expect(List.reject(isEven, nums)).toEqual([1, 3, 5]);
    });
  });
});
