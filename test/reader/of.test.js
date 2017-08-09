/* global describe, expect, test */

import Reader from '../../src/reader';

describe('Reader', () => {
  describe('Reader.of', () => {
    test('it should create a new reader that will return the given value', () => {
      const reader = Reader.of('foo');

      expect(reader.run()).toBe('foo');
    });
  });

  describe('Reader#of', () => {
    test('it should create a new reader that will return the given value', () => {
      const reader = Reader.of().of('foo');

      expect(reader.run()).toBe('foo');
    });
  });
});
