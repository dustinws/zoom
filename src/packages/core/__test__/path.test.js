/* global describe, expect, test */
import path from '../path';

describe('Zoom.Core.path', () => {
  test('It should return a Just with the value if it exists', () => {
    const result = path(['a'], { a: 1 });

    expect(result.isJust()).toBe(true);
    expect(result.value).toBe(1);
  });

  test('It should return a Nothing if the value does not exist', () => {
    const result = path(['a', 'b', 'c'], {});

    expect(result.isNothing()).toBe(true);
  });
});
