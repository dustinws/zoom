/* global describe, expect, test */

import Writer from '../../src/writer';
import Tuple from '../../src/tuple';

describe('Writer', () => {
  describe('Writer.of', () => {
    test('it should create a new writer that will return the given value', () => {
      const writer = Writer.of('foo');

      expect(writer).toEqual({ value: Tuple('foo', []) });
    });
  });
});
