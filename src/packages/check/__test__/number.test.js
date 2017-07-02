/* global describe, expect, test */
import number from '../number';

describe('check.number', () => {
  test('It should return a Success for number values', () => {
    expect(number(32).isSuccess()).toBe(true);
  });

  test('It should return a Failure for other values', () => {
    expect(number(false).isFailure()).toBe(true);
    expect(number('').isFailure()).toBe(true);
    expect(number({}).isFailure()).toBe(true);
    expect(number([]).isFailure()).toBe(true);
  });
});
