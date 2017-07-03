/* global describe, expect, test */
import objectOf from '../objectOf';
import string from '../string';

describe('Zoom.Check.objectOf', () => {
  test('It should return a Success for objectOf values', () => {
    expect(objectOf(string, { a: '' }).isSuccess()).toBe(true);
  });

  test('It should return a Failure for other values', () => {
    expect(objectOf(string, { a: 1 }).isFailure()).toBe(true);
  });
});
