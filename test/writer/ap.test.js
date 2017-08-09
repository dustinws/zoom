/* global describe, expect, test */

import Writer from '../../src/writer';
import Tuple from '../../src/tuple';

describe('Writer', () => {
  describe('Writer.ap', () => {
    test('it should apply a regular function in an Apply and return a new Writer with the result', () => {
      const writer = Writer.of('foo');
      const toBaz = Writer.of(() => 'baz');

      expect(Writer.ap(toBaz, writer)).toEqual({ value: Tuple('baz', []) });
    });
  });

  describe('Writer#ap', () => {
    test('it should apply a regular function in an Apply and return a new Writer with the result', () => {
      const writer = Writer.of('foo');
      const toBaz = Writer.of(() => 'baz');

      expect(writer.ap(toBaz)).toEqual({ value: Tuple('baz', []) });
    });
  });
});
