/* global describe, expect, test */

const Writer = require('../../src/writer');
const Tuple = require('../../src/tuple');

describe('Writer', () => {
  describe('Writer.map', () => {
    test('it should apply a regular function and return a new Writer with the result', () => {
      const writer = Writer.of('foo');
      const toBaz = () => 'baz';

      expect(Writer.map(toBaz, writer)).toEqual({ value: Tuple('baz', []) });
    });
  });

  describe('Writer#map', () => {
    test('it should apply a regular function and return a new Writer with the result', () => {
      const writer = Writer.of('foo');
      const toBaz = () => 'baz';

      expect(writer.map(toBaz)).toEqual({ value: Tuple('baz', []) });
    });
  });
});
