/* global describe, expect, test */

const Reader = require('../../src/reader');
const Maybe = require('../../src/maybe');

const ReaderT = Reader.T(Maybe);

describe('ReaderT', () => {
  describe('ReaderT.ap', () => {
    test('it should apply a regular function in an Apply and return a new ReaderT with the result', () => {
      const reader = ReaderT.of('foo');
      const toBaz = ReaderT.of(() => 'baz');

      expect(ReaderT.ap(toBaz, reader).run('bar').value).toBe('baz');
    });
  });

  describe('ReaderT#ap', () => {
    test('it should apply a regular function in an Apply and return a new ReaderT with the result', () => {
      const reader = ReaderT.of('foo');
      const toBaz = ReaderT.of(() => 'baz');

      expect(reader.ap(toBaz).run('bar').value).toBe('baz');
    });
  });
});
