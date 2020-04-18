/* global describe, expect, test */

const Reader = require('../../src/reader');

describe('Reader', () => {
  describe('Reader.chain', () => {
    test('it should apply the transformation and flatten the Reader that was returned', () => {
      const reader = Reader.of('foo');
      const toBaz = () => Reader.of('baz');

      expect(Reader.chain(toBaz, reader).run('bar')).toBe('baz');
    });
  });

  describe('Reader#chain', () => {
    test('it should apply the transformation and flatten the Reader that was returned', () => {
      const reader = Reader.of('foo');
      const toBaz = () => Reader.of('baz');

      expect(reader.chain(toBaz).run('bar')).toBe('baz');
    });
  });
});
