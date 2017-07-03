/* global describe, expect, test */
import indexOf from '../indexOf';

describe('Zoom.Data.List.indexOf', () => {
  test('It should return the index in a Just if the value is present', () => {
    expect(indexOf(1, [1]).isJust()).toBe(true);
    expect(indexOf(1, [1]).value).toBe(0);
  });

  test('It should return a Nothing if the value is not present', () => {
    expect(indexOf(1, []).isNothing()).toBe(true);
  });
});
