/* global describe, expect, test */

import Writer from '../../src/writer';
import Tuple from '../../src/tuple';

describe('Writer', () => {
  describe('Writer.andThen', () => {
    test('it should apply the transformation and flatten the Writer that was returned', () => {
      const writer = Writer.of('foo');
      const toBaz = () => Writer.of('baz');

      expect(Writer.andThen(toBaz, writer)).toEqual({ value: Tuple('baz', []) });
    });
  });

  describe('Writer#andThen', () => {
    test('it should apply the transformation and flatten the Writer that was returned', () => {
      const writer = Writer.of('foo');
      const toBaz = () => Writer.of('baz');

      expect(writer.andThen(toBaz)).toEqual({ value: Tuple('baz', []) });
    });
  });
});
