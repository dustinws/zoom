/* global describe, expect, test */
import List from '../List';

describe('data.List', () => {
  describe('List.of', () => {
    test('It should create a new array', () => {
      expect(List.of(1, 2, 3)).toEqual([1, 2, 3]);
    });
  });

  describe('List.concat', () => {
    test('It should concatenate two arrays', () => {
      expect(List.concat([1], [2])).toEqual([1, 2]);
    });
  });

  describe('List.empty', () => {
    test('It should return an empty array', () => {
      expect(List.empty()).toEqual([]);
    });
  });

  describe('List.indexOf', () => {
    test('It should return the index in a Just if the value is present', () => {
      expect(List.indexOf(1, [1]).isJust()).toBe(true);
      expect(List.indexOf(1, [1]).value).toBe(0);
    });

    test('It should return a Nothing if the value is not present', () => {
      expect(List.indexOf(1, []).isNothing()).toBe(true);
    });
  });

  describe('List.includes', () => {
    test('It should return true if the item is present', () => {
      expect(List.includes(1, [1])).toBe(true);
    });

    test('It should return false if the item is not present', () => {
      expect(List.includes(2, [1])).toBe(false);
    });
  });

  describe('List.head', () => {
    test('It should return a Just if there is a value', () => {
      const array = [1];
      const result = List.head(array);

      expect(result.isJust()).toBe(true);
      expect(result.value).toBe(array[0]);
    });

    test('It should return Nothing if there is no value', () => {
      const array = [];
      const result = List.head(array);

      expect(result.isNothing()).toBe(true);
    });
  });

  describe('List.last', () => {
    test('It should return a Just if there is a value', () => {
      const array = [1];
      const result = List.last(array);

      expect(result.isJust()).toBe(true);
      expect(result.value).toBe(array[0]);
    });

    test('It should return Nothing if there is no value', () => {
      const array = [];
      const result = List.last(array);

      expect(result.isNothing()).toBe(true);
    });
  });

  describe('List.tail', () => {
    test('It should return a new array missing the first element', () => {
      expect(List.tail([1, 2, 3])).toEqual([2, 3]);
    });

    test('It should return an empty array if there are one or no values', () => {
      const array = [1];
      const result = List.tail(array);

      expect(result).toEqual([]);
    });
  });

  describe('List.init', () => {
    test('It should return a new array missing the last element', () => {
      expect(List.init([1, 2, 3])).toEqual([1, 2]);
    });

    test('It should return an empty array if there is one or no values', () => {
      expect(List.init([1])).toEqual([]);
      expect(List.init([])).toEqual([]);
    });
  });

  describe('List.isEmpty', () => {
    test('It should return true if there are no items', () => {
      expect(List.isEmpty([])).toBe(true);
    });

    test('It should return false if there are items', () => {
      expect(List.isEmpty([1])).toBe(false);
    });
  });

  describe('List.each', () => {
    test('It should call the function on each element of the array', () => {
      let count = 0;
      const nums = [1, 2, 3, 4, 5];

      List.each(() => { count += 1; }, nums);

      expect(count).toBe(5);
    });

    test('It should return the array it was given', () => {
      const nums = [1, 2, 3, 4, 5];

      const result = List.each(() => {}, nums);

      expect(result).toBe(nums);
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

  describe('List.chain', () => {
    test('It should act like "map" but flatten the resulting array before returning it', () => {
      const double = n => [n, n];

      expect(List.chain(double, [1, 2])).toEqual([1, 1, 2, 2]);
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
