/* global describe, expect, test */
import concat from '../concat';

describe('Zoom.Data.List.concat', () => {
  test('It should concatenate two arrays', () => {
    expect(concat([1], [2])).toEqual([1, 2]);
  });
});
