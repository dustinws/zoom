/* global describe, expect, test, jest */
import Maybe from '../Maybe';

describe('data.Maybe', () => {
  test('It should implement static Applicative', () => {
    expect(Maybe.of(1) instanceof Maybe).toBe(true);
  });

  test('It should implement instance Applicative', () => {
    expect(Maybe.of(1).of(1) instanceof Maybe).toBe(true);
  });

  describe('Functor', () => {
    test('It should call the transform if the instance is a Just', () => {
      const transform = jest.fn();

      Maybe.of('text').map(transform);

      expect(transform.mock.calls[0]).toEqual(['text']);
    });

    test('It should not call the transform if the instance is a Nothing', () => {
      const transform = jest.fn();

      Maybe.Nothing.map(transform);

      expect(transform.mock.calls[0]).toBeFalsy();
    });
  });

  describe('Chain', () => {
    test('It should call the transform if the instance is a Just', () => {
      const result = Maybe.of('text').chain(x => x.toUpperCase());

      expect(result).toBe('TEXT');
    });

    test('It should not call the transform if the instance is a Nothing', () => {
      const result = Maybe.Nothing.map(x => x.toUpperCase());

      expect(result).toBe(Maybe.Nothing);
    });
  });

  describe('#fromNullable(value)', () => {
    test('It should return Nothing if it gets null | undefined', () => {
      expect(Maybe.fromNullable().isNothing()).toBe(true);
      expect(Maybe.fromNullable(null).isNothing()).toBe(true);
      expect(Maybe.fromNullable(undefined).isNothing()).toBe(true);
    });

    test('It should return Just if the value exists', () => {
      expect(Maybe.fromNullable(0).isJust()).toBe(true);
      expect(Maybe.fromNullable('').isJust()).toBe(true);
    });
  });

  describe('#getOrElse(value)', () => {
    test('It should return the value if the instance is a Nothing', () => {
      expect(Maybe.Nothing.getOrElse('foo')).toBe('foo');
    });

    test('It should return the inner value if the instance is a Just', () => {
      expect(Maybe.Just('bar').getOrElse('foo')).toBe('bar');
    });
  });

  describe('#isNothing', () => {
    test('It should return true if the instance is a Nothing', () => {
      expect(Maybe.Nothing.isNothing()).toBe(true);
    });

    test('It should return false if the instance is a Just', () => {
      expect(Maybe.Just().isNothing()).toBe(false);
    });
  });

  describe('#isJust', () => {
    test('It should return true if the instance is a Just', () => {
      expect(Maybe.Just().isJust()).toBe(true);
    });

    test('It should return false if the instance is a Nothing', () => {
      expect(Maybe.Nothing.isJust()).toBe(false);
    });
  });
});
