/* global describe, expect, test */
import fold from '../fold';

describe('Zoom.Data.List.fold', () => {
  test('It should call the function with the accumulator and next item, for each item', () => {
    const add = (a, b) => a + b;
    const nums = [1, 2, 3, 4, 5];

    expect(fold(add, 0, nums)).toBe(15);
  });
});
