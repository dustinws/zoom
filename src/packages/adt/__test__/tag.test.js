/* global describe, expect, test */
import { tag } from '..';

describe('ADT#tag(type, ...params)', () => {
  test('It should return a constructor function', () => {
    const T = tag('T');
    expect(new T() instanceof T).toBe(true);
  });

  test('It should not require the "new" keyworkd', () => {
    const T = tag('T');
    expect(T() instanceof T).toBe(true);
  });
});
