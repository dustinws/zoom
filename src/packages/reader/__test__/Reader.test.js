/* global describe, expect, test */
import Reader from '../Reader';

describe('Reader', () => {
  describe('Reader.of', () => {
    test('it should create a new reader that will return the given value', () => {
      const reader = Reader.of('foo');

      expect(reader.run()).toBe('foo');
    });
  });

  describe('Reader.chain', () => {
    test('it should apply the transformation and flatten the Reader that was returned', () => {
      const reader = Reader.of('foo');
      const toBaz = () => Reader.of('baz');

      expect(Reader.chain(toBaz, reader).run('bar')).toBe('baz');
    });
  });

  describe('Reader.map', () => {
    test('it should apply a regular function and return a new Reader with the result', () => {
      const reader = Reader.of('foo');
      const toBaz = () => 'baz';

      expect(Reader.map(toBaz, reader).run('bar')).toBe('baz');
    });
  });

  describe('Reader.ap', () => {
    test('it should apply a regular function in an Apply and return a new Reader with the result', () => {
      const reader = Reader.of('foo');
      const toBaz = Reader.of(() => 'baz');

      expect(Reader.ap(toBaz, reader).run('bar')).toBe('baz');
    });
  });

  describe('Reader#chain', () => {
    test('it should apply the transformation and flatten the Reader that was returned', () => {
      const reader = Reader.of('foo');
      const toBaz = () => Reader.of('baz');

      expect(reader.chain(toBaz).run('bar')).toBe('baz');
    });
  });

  describe('Reader#map', () => {
    test('it should apply a regular function and return a new Reader with the result', () => {
      const reader = Reader.of('foo');
      const toBaz = () => 'baz';

      expect(reader.map(toBaz).run('bar')).toBe('baz');
    });
  });

  describe('Reader#ap', () => {
    test('it should apply a regular function in an Apply and return a new Reader with the result', () => {
      const reader = Reader.of('foo');
      const toBaz = Reader.of(() => 'baz');

      expect(reader.ap(toBaz).run('bar')).toBe('baz');
    });
  });
});
