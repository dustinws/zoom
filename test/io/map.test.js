/* global describe, expect, test */

import IO from '../../src/io';

describe('IO', () => {
  describe('IO.map', () => {
    test('it should apply a regular function and return a new IO with the result', () => {
      const io = IO.of('foo');
      const toBaz = () => 'baz';

      expect(IO.map(toBaz, io).run('bar')).toBe('baz');
    });
  });

  describe('IO#map', () => {
    test('it should apply a regular function and return a new IO with the result', () => {
      const io = IO.of('foo');
      const toBaz = () => 'baz';

      expect(io.map(toBaz).run('bar')).toBe('baz');
    });
  });
});
