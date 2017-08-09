/* global describe, expect, test */

import Reader from '../../src/reader';
import Maybe from '../../src/maybe';

const ReaderT = Reader.T(Maybe);

describe('ReaderT', () => {
  describe('ReaderT.andThen', () => {
    test('it should apply the transformation and flatten the ReaderT that was returned', () => {
      const reader = ReaderT.of('foo');
      const toBaz = () => ReaderT.of('baz');

      expect(ReaderT.andThen(toBaz, reader).run('bar').value).toBe('baz');
    });
  });

  describe('ReaderT#andThen', () => {
    test('it should apply the transformation and flatten the ReaderT that was returned', () => {
      const reader = ReaderT.of('foo');
      const toBaz = () => ReaderT.of('baz');

      expect(reader.andThen(toBaz).run('bar').value).toBe('baz');
    });
  });
});
