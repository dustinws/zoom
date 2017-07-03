/* global describe, expect, test */
import head from '../head';

describe('Zoom.Data.head', () => {
  test('It should return a Just if there is a value', () => {
    const array = [1];
    const result = head(array);

    expect(result.isJust()).toBe(true);
    expect(result.value).toBe(array[0]);
  });

  test('It should return Nothing if there is no value', () => {
    const array = [];
    const result = head(array);

    expect(result.isNothing()).toBe(true);
  });
});
