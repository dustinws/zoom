/* global describe, expect, test */

const Writer = require('../../src/writer');
const Tuple = require('../../src/tuple');

describe('Writer', () => {
  describe('Writer.chain', () => {
    test('it should apply the transformation and flatten the Writer that was returned', () => {
      const writer = Writer.of('foo');
      const toBaz = () => Writer.of('baz');

      expect(Writer.chain(toBaz, writer)).toEqual({ value: Tuple('baz', []) });
    });
  });

  describe('Writer#chain', () => {
    test('it should apply the transformation and flatten the Writer that was returned', () => {
      const writer = Writer.of('foo');
      const toBaz = () => Writer.of('baz');

      expect(writer.chain(toBaz)).toEqual({ value: Tuple('baz', []) });
    });
  });
});
