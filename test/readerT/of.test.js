/* global describe, expect, test */

import Reader from '../../src/reader';
import Maybe from '../../src/maybe';

const ReaderT = Reader.T(Maybe);

describe('ReaderT', () => {
  describe('ReaderT.of', () => {
    test('it should create a new reader that will return the given value', () => {
      const reader = ReaderT.of('foo');

      expect(reader.run().value).toBe('foo');
    });
  });

  describe('ReaderT#of', () => {
    test('it should create a new reader that will return the given value', () => {
      const reader = ReaderT.of().of('foo');

      expect(reader.run().value).toBe('foo');
    });
  });
});
