/* global describe, expect, test */
import union from '../union';
import number from '../number';
import string from '../string';

describe('check.union', () => {
  const id = union([string, number]);
  test('It should return a Success for union values', () => {
    expect(id('').isSuccess()).toBe(true);
    expect(id(1).isSuccess()).toBe(true);
  });

  test('It should return a Failure for other values', () => {
    expect(id({}).isFailure()).toBe(true);
    expect(id(false).isFailure()).toBe(true);
  });
});
