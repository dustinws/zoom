/* global describe, expect, test */
import nil from '../nil';

describe('Zoom.Check.nil', () => {
  test('It should return a Success for nil values', () => {
    expect(nil(null).isSuccess()).toBe(true);
  });

  test('It should return a Failure for other values', () => {
    expect(nil(32).isFailure()).toBe(true);
    expect(nil([]).isFailure()).toBe(true);
    expect(nil({}).isFailure()).toBe(true);
    expect(nil(false).isFailure()).toBe(true);
  });
});
