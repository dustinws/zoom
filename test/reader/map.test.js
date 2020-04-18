/* global describe, expect, test */

const Reader = require('../../src/reader');

describe('Reader', () => {
  describe('Reader.map', () => {
    test('it should apply a regular function and return a new Reader with the result', () => {
      const reader = Reader.of('foo');
      const toBaz = () => 'baz';

      expect(Reader.map(toBaz, reader).run('bar')).toBe('baz');
    });
  });

  describe('Reader#map', () => {
    test('it should apply a regular function and return a new Reader with the result', () => {
      const reader = Reader.of('foo');
      const toBaz = () => 'baz';

      expect(reader.map(toBaz).run('bar')).toBe('baz');
    });
  });
});
