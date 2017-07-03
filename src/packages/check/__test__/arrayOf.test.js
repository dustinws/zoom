/* global describe, expect, test */
import arrayOf from '../arrayOf';
import string from '../string';

describe('Zoom.Check.arrayOf', () => {
  test('It should return a Success for arrayOf values', () => {
    expect(arrayOf(string, ['']).isSuccess()).toBe(true);
  });

  test('It should return a Failure for other values', () => {
    expect(arrayOf(string, [3]).isFailure()).toBe(true);
  });
});
