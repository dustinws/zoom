/* global describe, expect, test */

const Writer = require('../../src/writer');
const Tuple = require('../../src/tuple');

describe('Writer', () => {
  describe('Writer.tell', () => {
    test('it should add a new piece of metadata', () => {
      const writer = Writer.of('foo');

      expect(Writer.tell('a', writer)).toEqual({ value: Tuple('foo', ['a']) });
    });
  });

  describe('Writer#tell', () => {
    test('it should add a new piece of metadata', () => {
      const writer = Writer.of('foo');

      expect(writer.tell('a')).toEqual({ value: Tuple('foo', ['a']) });
    });
  });
});
