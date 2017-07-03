/* global describe, expect, test */
import object from '../object';

describe('Zoom.Check.object', () => {
  test('It should return a Success for object values', () => {
    expect(object({}).isSuccess()).toBe(true);
  });

  test('It should return a Failure for other values', () => {
    expect(object(false).isFailure()).toBe(true);
    expect(object('').isFailure()).toBe(true);
    expect(object(32).isFailure()).toBe(true);
    expect(object([]).isFailure()).toBe(true);
  });
});
