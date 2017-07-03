/* global describe, expect, test */
import shapeOf from '../shapeOf';
import number from '../number';
import string from '../string';

describe('Zoom.Check.shapeOf', () => {
  const user = shapeOf({
    id: number,
    name: string,
  });

  test('It should return a Success for shapeOf values', () => {
    expect(user({ id: 1, name: '' }).isSuccess()).toBe(true);
  });

  test('It should return a Failure for other values', () => {
    expect(user({ id: 1 }).isFailure()).toBe(true);
    expect(user({ id: 1, name: 1 }).isFailure()).toBe(true);
    expect(user({ id: '', name: '' }).isFailure()).toBe(true);
    expect(user({ id: '', name: '', x: '' }).isFailure()).toBe(true);
  });
});
