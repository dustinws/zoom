/* global describe, expect, test */

const IO = require('../../src/io');

describe('IO', () => {
  describe('IO.andThen', () => {
    test('it should apply the transformation and flatten the IO that was returned', () => {
      const io = IO.of('foo');
      const toBaz = () => IO.of('baz');

      expect(IO.andThen(toBaz, io).run('bar')).toBe('baz');
    });
  });

  describe('IO#andThen', () => {
    test('it should apply the transformation and flatten the IO that was returned', () => {
      const io = IO.of('foo');
      const toBaz = () => IO.of('baz');

      expect(io.andThen(toBaz).run('bar')).toBe('baz');
    });
  });
});
