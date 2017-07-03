/* global describe, expect, test */
import includes from '../includes';

describe('Zoom.Data.List.includes', () => {
  test('It should return true if the item is present', () => {
    expect(includes(1, [1])).toBe(true);
  });

  test('It should return false if the item is not present', () => {
    expect(includes(2, [1])).toBe(false);
  });
});
