/* global describe, expect, test */
import array from '../array';

describe('check.array', () => {
  test('It should return a Success for array values', () => {
    expect(array([]).isSuccess()).toBe(true);
  });

  test('It should return a Failure for other values', () => {
    expect(array(32).isFailure()).toBe(true);
    expect(array('').isFailure()).toBe(true);
    expect(array({}).isFailure()).toBe(true);
    expect(array(false).isFailure()).toBe(true);
  });
});
