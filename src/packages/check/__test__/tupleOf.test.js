/* global describe, expect, test */
import tupleOf from '../tupleOf';
import number from '../number';
import string from '../string';

describe('Zoom.Check.tupleOf', () => {
  const user = tupleOf([number, string]);

  test('It should return a Success for tupleOf values', () => {
    expect(user([1, '']).isSuccess()).toBe(true);
  });

  test('It should return a Failure for other values', () => {
    expect(user([1]).isFailure()).toBe(true);
    expect(user([1, '', '']).isFailure()).toBe(true);
    expect(user([1, 1]).isFailure()).toBe(true);
  });
});
