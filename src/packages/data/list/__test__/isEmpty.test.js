/* global describe, expect, test */
import isEmpty from '../isEmpty';

describe('Zoom.Data.List.isEmpty', () => {
  test('It should return true if there are no items', () => {
    expect(isEmpty([])).toBe(true);
  });

  test('It should return false if there are items', () => {
    expect(isEmpty([1])).toBe(false);
  });
});
