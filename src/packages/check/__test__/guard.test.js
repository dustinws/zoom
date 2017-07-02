/* global describe, expect, test */
import guard from '../guard';
import number from '../number';

describe('check.guard', () => {
  const add = guard([number, number, number])((a, b) => a + b);

  test('It should return a Success for guard values', () => {
    expect(add(1, 2)).toBe(3);
  });

  test('It should return a Failure for other values', () => {
    expect(add(1, '') instanceof TypeError).toBe(true);
    expect(add('', 1) instanceof TypeError).toBe(true);
  });
});
