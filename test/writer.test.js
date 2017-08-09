/* global describe, expect, test */
import Writer from '../src/writer';
import Tuple from '../src/tuple';

describe('Writer', () => {
  describe('Writer.tell', () => {
    test('it should add a new piece of metadata', () => {
      const writer = Writer.of('foo');

      expect(Writer.tell('a', writer)).toEqual({ value: Tuple('foo', ['a']) });
    });
  });

  describe('Writer.of', () => {
    test('it should create a new writer that will return the given value', () => {
      const writer = Writer.of('foo');

      expect(writer).toEqual({ value: Tuple('foo', []) });
    });
  });

  describe('Writer.chain', () => {
    test('it should apply the transformation and flatten the Writer that was returned', () => {
      const writer = Writer.of('foo');
      const toBaz = () => Writer.of('baz');

      expect(Writer.chain(toBaz, writer)).toEqual({ value: Tuple('baz', []) });
    });
  });

  describe('Writer.andThen', () => {
    test('it should apply the transformation and flatten the Writer that was returned', () => {
      const writer = Writer.of('foo');
      const toBaz = () => Writer.of('baz');

      expect(Writer.andThen(toBaz, writer)).toEqual({ value: Tuple('baz', []) });
    });
  });

  describe('Writer.map', () => {
    test('it should apply a regular function and return a new Writer with the result', () => {
      const writer = Writer.of('foo');
      const toBaz = () => 'baz';

      expect(Writer.map(toBaz, writer)).toEqual({ value: Tuple('baz', []) });
    });
  });

  describe('Writer.ap', () => {
    test('it should apply a regular function in an Apply and return a new Writer with the result', () => {
      const writer = Writer.of('foo');
      const toBaz = Writer.of(() => 'baz');

      expect(Writer.ap(toBaz, writer)).toEqual({ value: Tuple('baz', []) });
    });
  });

  describe('Writer#tell', () => {
    test('it should add a new piece of metadata', () => {
      const writer = Writer.of('foo');

      expect(writer.tell('a')).toEqual({ value: Tuple('foo', ['a']) });
    });
  });

  describe('Writer#chain', () => {
    test('it should apply the transformation and flatten the Writer that was returned', () => {
      const writer = Writer.of('foo');
      const toBaz = () => Writer.of('baz');

      expect(writer.chain(toBaz)).toEqual({ value: Tuple('baz', []) });
    });
  });

  describe('Writer#andThen', () => {
    test('it should apply the transformation and flatten the Writer that was returned', () => {
      const writer = Writer.of('foo');
      const toBaz = () => Writer.of('baz');

      expect(writer.andThen(toBaz)).toEqual({ value: Tuple('baz', []) });
    });
  });

  describe('Writer#map', () => {
    test('it should apply a regular function and return a new Writer with the result', () => {
      const writer = Writer.of('foo');
      const toBaz = () => 'baz';

      expect(writer.map(toBaz)).toEqual({ value: Tuple('baz', []) });
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
