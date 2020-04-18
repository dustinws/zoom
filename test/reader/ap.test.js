/* global describe, expect, test */

const Reader = require('../../src/reader');

describe('Reader', () => {
  describe('Reader.ap', () => {
    test('it should apply a regular function in an Apply and return a new Reader with the result', () => {
      const reader = Reader.of('foo');
      const toBaz = Reader.of(() => 'baz');

      expect(Reader.ap(toBaz, reader).run('bar')).toBe('baz');
    });
  });

  describe('Reader#ap', () => {
    test('it should apply a regular function in an Apply and return a new Reader with the result', () => {
      const reader = Reader.of('foo');
      const toBaz = Reader.of(() => 'baz');

      expect(reader.ap(toBaz).run('bar')).toBe('baz');
    });
  });
});
