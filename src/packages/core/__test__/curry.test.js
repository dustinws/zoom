/* global describe, expect, test */
import __ from '../__';
import curry from '../curry';

describe('Zoom.Core.curry', () => {
  test('It should create a curried function by guessing the arity', () => {
    const add = curry((a, b) => a + b);

    expect(add(1)(2)).toBe(3);
  });

  test('It should return a new function until it has all of its arguments', () => {
    const add = curry((a, b) => a + b);

    expect(typeof add(1)()()()()).toBe('function');
  });

  test('It should use the __ flag as a placeholder', () => {
    const concat = curry((a, b) => a.concat(b));
    const addExclamation = concat(__, '!');

    expect(addExclamation('foo')).toBe('foo!');
  });
});
