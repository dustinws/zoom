/* global describe, expect, test */
import __ from '../__';
import curryN from '../curryN';

describe('Zoom.Core.curryN', () => {
  test('It should create a curried function from a regular one with the provided arity', () => {
    const add = curryN(2, (a, b) => a + b);

    expect(add(1)(2)).toBe(3);
  });

  test('It should return a new function until it has all of its arguments', () => {
    const add = curryN(2, (a, b) => a + b);

    expect(typeof add(1)()()()()).toBe('function');
  });

  test('It should use the __ flag as a placeholder', () => {
    const concat = curryN(2, (a, b) => a.concat(b));
    const addExclamation = concat(__, '!');

    expect(addExclamation('foo')).toBe('foo!');
  });
});
