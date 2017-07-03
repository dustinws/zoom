/* global describe, expect, test */
import each from '../each';

describe('Zoom.Data.List.each', () => {
  test('It should call the function on each element of the array', () => {
    let count = 0;
    const nums = [1, 2, 3, 4, 5];

    each(() => { count += 1; }, nums);

    expect(count).toBe(5);
  });

  test('It should return the array it was given', () => {
    const nums = [1, 2, 3, 4, 5];

    const result = each(() => {}, nums);

    expect(result).toBe(nums);
  });
});
