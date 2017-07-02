/* global describe, expect, test */
import undef from '../undef';

describe('check.undef', () => {
  test('It should return a Success for undef values', () => {
    expect(undef().isSuccess()).toBe(true);
  });

  test('It should return a Failure for other values', () => {
    expect(undef(32).isFailure()).toBe(true);
    expect(undef([]).isFailure()).toBe(true);
    expect(undef({}).isFailure()).toBe(true);
    expect(undef(false).isFailure()).toBe(true);
  });
});
