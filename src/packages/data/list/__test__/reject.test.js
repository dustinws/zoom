/* global describe, expect, test */
import reject from '../reject';

describe('List.reject', () => {
  test('It should return a new array containing the values the predicate returned false for', () => {
    const isEven = n => n % 2 === 0;
    const nums = [1, 2, 3, 4, 5];

    expect(reject(isEven, nums)).toEqual([1, 3, 5]);
  });
});
