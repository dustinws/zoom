/* global describe, expect, test */
import of from '../of';

describe('Zoom.Data.List.of', () => {
  test('It should create a new array', () => {
    expect(of(1, 2, 3)).toEqual([1, 2, 3]);
  });
});
