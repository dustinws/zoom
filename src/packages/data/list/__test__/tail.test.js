/* global describe, expect, test */
import tail from '../tail';

describe('List.tail', () => {
  test('It should return a new array missing the first element', () => {
    expect(tail([1, 2, 3])).toEqual([2, 3]);
  });

  test('It should return an empty array if there are one or no values', () => {
    const array = [1];
    const result = tail(array);

    expect(result).toEqual([]);
  });
});
