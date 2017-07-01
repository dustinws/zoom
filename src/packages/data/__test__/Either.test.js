/* global describe, expect, test, jest */
import Either from '../Either';

describe('data.Either', () => {
  test('It should implement static Applicative', () => {
    expect(Either.of(1) instanceof Either).toBe(true);
  });

  test('It should implement instance Applicative', () => {
    expect(Either.of(1).of(1) instanceof Either).toBe(true);
  });

  describe('Functor', () => {
    test('It should call the transform if the instance is a Right', () => {
      const transform = jest.fn();

      Either.of('text').map(transform);

      expect(transform.mock.calls[0]).toEqual(['text']);
    });

    test('It should not call the transform if the instance is a Left', () => {
      const transform = jest.fn();

      Either.Left.of('text').map(transform);

      expect(transform.mock.calls[0]).toBeFalsy();
    });
  });

  describe('Chain', () => {
    test('It should call the transform if the instance is a Just', () => {
      const result = Either.of('text').chain(x => x.toUpperCase());

      expect(result).toBe('TEXT');
    });

    test('It should not call the transform if the instance is a Nothing', () => {
      const result = Either.Left('text').map(x => x.toUpperCase());

      expect(result.isLeft()).toBe(true);
    });
  });

  describe('#try(value)', () => {
    test('It should a Right if the function was successful', () => {
      const fromJson = Either.try(JSON.parse);

      const result = fromJson('{ "foo": "bar" }');

      expect(result.isRight()).toBe(true);
    });

    test('It should return Left if it was not successful', () => {
      const fromJson = Either.try(JSON.parse);

      const result = fromJson('...');

      expect(result instanceof Either.Left).toBe(true);
    });
  });

  describe('#isLeft', () => {
    test('It should return true if the instance is a Left', () => {
      expect(Either.Left().isLeft()).toBe(true);
    });

    test('It should return false if the instance is a Right', () => {
      expect(Either.Right().isLeft()).toBe(false);
    });
  });

  describe('#isRight', () => {
    test('It should return true if the instance is a Right', () => {
      expect(Either.Right().isRight()).toBe(true);
    });

    test('It should return false if the instance is a Left', () => {
      expect(Either.Left().isRight()).toBe(false);
    });
  });
});
