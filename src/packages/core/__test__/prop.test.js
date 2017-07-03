/* global describe, expect, test */
import prop from '../prop';

describe('Zoom.Core.prop', () => {
  test('It should return a Just with the value if it exists', () => {
    const result = prop('a', { a: 1 });

    expect(result.isJust()).toBe(true);
    expect(result.value).toBe(1);
  });

  test('It should return a Nothing if the value does not exist', () => {
    const result = prop('a', {});

    expect(result.isNothing()).toBe(true);
  });
});
