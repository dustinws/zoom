/* global describe, expect, test, jest */
const Either = require('../Either');

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

      expect(result).toEqual(Either.Left('text'));
    });
  });

  describe('#try(value)', () => {
    test('It should a Right if the function was successful', () => {
      const fromJson = Either.try(JSON.parse);

      const result = fromJson('{ "foo": "bar" }');

      expect(result).toEqual(Either.Right({ foo: 'bar' }));
    });

    test('It should return Left if it was not successful', () => {
      const fromJson = Either.try(JSON.parse);

      const result = fromJson('...');

      expect(result instanceof Either.Left).toBe(true);
    });
  });
});
