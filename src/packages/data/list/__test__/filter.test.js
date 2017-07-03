/* global describe, expect, test */
import filter from '../filter';

describe('Zoom.Data.List.filter', () => {
  test('It should return a new array containing the values the predicate returned true for', () => {
    const isEven = n => n % 2 === 0;
    const nums = [1, 2, 3, 4, 5];

    expect(filter(isEven, nums)).toEqual([2, 4]);
  });
});
