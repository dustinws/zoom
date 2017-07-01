/* global describe, expect, test */
import add from '../add';

describe('math.add(left, right)', () => {
  test('It should be curried', () => {
    expect(typeof add(3)()).toBe('function');
  });

  test('it should add two numbers together', () => {
    expect(add(3, 2)).toBe(5);
  });
});
