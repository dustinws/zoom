/* global describe, expect, test */
import func from '../func';

describe('check.func', () => {
  test('It should return a Success for func values', () => {
    expect(func(() => {}).isSuccess()).toBe(true);
  });

  test('It should return a Failure for other values', () => {
    expect(func(32).isFailure()).toBe(true);
    expect(func('').isFailure()).toBe(true);
    expect(func({}).isFailure()).toBe(true);
    expect(func([]).isFailure()).toBe(true);
  });
});
