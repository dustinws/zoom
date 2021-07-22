/* global describe, expect, test */

const Writer = require('../../src/writer');
const Tuple = require('../../src/tuple');

describe('Writer', () => {
  describe('Writer.of', () => {
    test('it should create a new writer that will return the given value', () => {
      const writer = Writer.of('foo');

      expect(writer).toEqual({ value: Tuple('foo', []) });
    });
  });

  describe('Writer#of', () => {
    test('it should create a new writer that will return the given value', () => {
      const writer = Writer.of();

      expect(writer.of('foo')).toEqual({ value: Tuple('foo', []) });
    });
  });
});
