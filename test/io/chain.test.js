/* global describe, expect, test */

const IO = require('../../src/io');

describe('IO', () => {
  describe('IO.chain', () => {
    test('it should apply the transformation and flatten the IO that was returned', () => {
      const io = IO.of('foo');
      const toBaz = () => IO.of('baz');

      expect(IO.chain(toBaz, io).run('bar')).toBe('baz');
    });
  });

  describe('IO#chain', () => {
    test('it should apply the transformation and flatten the IO that was returned', () => {
      const io = IO.of('foo');
      const toBaz = () => IO.of('baz');

      expect(io.chain(toBaz).run('bar')).toBe('baz');
    });
  });
});
