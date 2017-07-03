/* global describe, expect, test */
import empty from '../empty';

describe('Zoom.Data.List.empty', () => {
  test('It should return an empty array', () => {
    expect(empty()).toEqual([]);
  });
});
