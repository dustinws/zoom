/* global describe, expect, test */
import string from '../string';

describe('Zoom.Check.string', () => {
  test('It should return a Success for string values', () => {
    expect(string('').isSuccess()).toBe(true);
  });

  test('It should return a Failure for other values', () => {
    expect(string(32).isFailure()).toBe(true);
    expect(string([]).isFailure()).toBe(true);
    expect(string({}).isFailure()).toBe(true);
    expect(string(false).isFailure()).toBe(true);
  });
});
