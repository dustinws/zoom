/* global describe, expect, test */
import map from '../map';

describe('Zoom.Data.List.map', () => {
  test('It should apply the function to each item and return a new array with the results', () => {
    const add = a => b => a + b;
    const nums = [1, 2, 3, 4, 5];

    expect(map(add(1), nums)).toEqual([2, 3, 4, 5, 6]);
  });
});
