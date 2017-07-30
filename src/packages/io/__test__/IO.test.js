/* global describe, expect, test */
import IO from '../IO';

describe('IO', () => {
  describe('IO.of', () => {
    test('it should create a new io that will return the given value', () => {
      const io = IO.of('foo');

      expect(io.run()).toBe('foo');
    });
  });

  describe('IO.chain', () => {
    test('it should apply the transformation and flatten the IO that was returned', () => {
      const io = IO.of('foo');
      const toBaz = () => IO.of('baz');

      expect(IO.chain(toBaz, io).run('bar')).toBe('baz');
    });
  });

  describe('IO.map', () => {
    test('it should apply a regular function and return a new IO with the result', () => {
      const io = IO.of('foo');
      const toBaz = () => 'baz';

      expect(IO.map(toBaz, io).run('bar')).toBe('baz');
    });
  });

  describe('IO.ap', () => {
    test('it should apply a regular function in an Apply and return a new IO with the result', () => {
      const io = IO.of('foo');
      const toBaz = IO.of(() => 'baz');

      expect(IO.ap(toBaz, io).run('bar')).toBe('baz');
    });
  });

  describe('IO#chain', () => {
    test('it should apply the transformation and flatten the IO that was returned', () => {
      const io = IO.of('foo');
      const toBaz = () => IO.of('baz');

      expect(io.chain(toBaz).run('bar')).toBe('baz');
    });
  });

  describe('IO#map', () => {
    test('it should apply a regular function and return a new IO with the result', () => {
      const io = IO.of('foo');
      const toBaz = () => 'baz';

      expect(io.map(toBaz).run('bar')).toBe('baz');
    });
  });

  describe('IO#ap', () => {
    test('it should apply a regular function in an Apply and return a new IO with the result', () => {
      const io = IO.of('foo');
      const toBaz = IO.of(() => 'baz');

      expect(io.ap(toBaz).run('bar')).toBe('baz');
    });
  });
});
