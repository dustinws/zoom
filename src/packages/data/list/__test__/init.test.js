/* global describe, expect, test */
import init from '../init';

describe('Zoom.Data.List.init', () => {
  test('It should return a new array missing the last element', () => {
    expect(init([1, 2, 3])).toEqual([1, 2]);
  });

  test('It should return an empty array if there is one or no values', () => {
    expect(init([1])).toEqual([]);
    expect(init([])).toEqual([]);
  });
});
