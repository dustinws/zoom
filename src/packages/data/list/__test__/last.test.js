/* global describe, expect, test */
import last from '../last';

describe('Zoom.Data.List.last', () => {
  test('It should return a Just if there is a value', () => {
    const array = [1];
    const result = last(array);

    expect(result.isJust()).toBe(true);
    expect(result.value).toBe(array[0]);
  });

  test('It should return Nothing if there is no value', () => {
    const array = [];
    const result = last(array);

    expect(result.isNothing()).toBe(true);
  });
});
