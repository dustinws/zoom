/* global describe, expect, test */

const IO = require('../../src/io');

describe('IO', () => {
  describe('IO.ap', () => {
    test('it should apply a regular function in an Apply and return a new IO with the result', () => {
      const io = IO.of('foo');
      const toBaz = IO.of(() => 'baz');

      expect(IO.ap(toBaz, io).run('bar')).toBe('baz');
    });
  });

  describe('IO#ap', () => {
    test('it should apply a regular function in an Apply and return a new IO with the result', () => {
      const io = IO.of('foo');
      const toBaz = IO.of(() => 'baz');

      expect(io.ap(toBaz).run('bar')).toBe('baz');
    });
  });
});
