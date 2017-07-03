/* global describe, expect, test */
import bool from '../bool';

describe('Zoom.Check.bool', () => {
  test('It should return a Success for bool values', () => {
    expect(bool(true).isSuccess()).toBe(true);
  });

  test('It should return a Failure for other values', () => {
    expect(bool(32).isFailure()).toBe(true);
    expect(bool('').isFailure()).toBe(true);
    expect(bool({}).isFailure()).toBe(true);
    expect(bool([]).isFailure()).toBe(true);
  });
});
