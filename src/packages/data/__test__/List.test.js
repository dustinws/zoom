/* global describe, expect, test */
import List from '../List';

describe('data.List', () => {
  test('List.of', () => {
    expect(List.of(1, 2, 3)).toEqual([1, 2, 3]);
  });

  test('List.fold', () => {
    const add = (a, b) => a + b;
    const nums = [1, 2, 3, 4, 5];

    expect(List.fold(add, 0, nums)).toBe(15);
  });

  test('List.map', () => {
    const add = a => b => a + b;
    const nums = [1, 2, 3, 4, 5];

    expect(List.map(add(1), nums)).toEqual([2, 3, 4, 5, 6]);
  });

  test('List.filter', () => {
    const isEven = n => n % 2 === 0;
    const nums = [1, 2, 3, 4, 5];

    expect(List.filter(isEven, nums)).toEqual([2, 4]);
  });

  test('List.reject', () => {
    const isEven = n => n % 2 === 0;
    const nums = [1, 2, 3, 4, 5];

    expect(List.reject(isEven, nums)).toEqual([1, 3, 5]);
  });
});
