/* global describe, expect, test */

import Reader from '../../src/reader';
import Maybe from '../../src/maybe';

const ReaderT = Reader.T(Maybe);

describe('ReaderT', () => {
  describe('ReaderT.map', () => {
    test('it should apply a regular function and return a new ReaderT with the result', () => {
      const reader = ReaderT.of('foo');
      const toBaz = () => 'baz';

      expect(ReaderT.map(toBaz, reader).run('bar').value).toBe('baz');
    });
  });

  describe('ReaderT#map', () => {
    test('it should apply a regular function and return a new ReaderT with the result', () => {
      const reader = ReaderT.of('foo');
      const toBaz = () => 'baz';

      expect(reader.map(toBaz).run('bar').value).toBe('baz');
    });
  });
});
