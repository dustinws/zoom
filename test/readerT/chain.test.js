/* global describe, expect, test */

const Reader = require('../../src/reader');
const Maybe = require('../../src/maybe');

const ReaderT = Reader.T(Maybe);

describe('ReaderT', () => {
  describe('ReaderT.chain', () => {
    test('it should apply the transformation and flatten the ReaderT that was returned', () => {
      const reader = ReaderT.of('foo');
      const toBaz = () => ReaderT.of('baz');

      expect(ReaderT.chain(toBaz, reader).run('bar').value).toBe('baz');
    });
  });

  describe('ReaderT#chain', () => {
    test('it should apply the transformation and flatten the ReaderT that was returned', () => {
      const reader = ReaderT.of('foo');
      const toBaz = () => ReaderT.of('baz');

      expect(reader.chain(toBaz).run('bar').value).toBe('baz');
    });
  });
});
