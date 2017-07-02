/* global describe, expect, test, jest */
import Result from '../Result';

describe('data.Result', () => {
  test('It should implement static Applicative', () => {
    expect(Result.of(1) instanceof Result).toBe(true);
  });

  test('It should implement instance Applicative', () => {
    expect(Result.of(1).of(1) instanceof Result).toBe(true);
  });

  describe('Functor', () => {
    test('It should call the transform if the instance is a Ok', () => {
      const transform = jest.fn();
      Result.of('text').map(transform);
      expect(transform.mock.calls[0]).toEqual(['text']);
    });

    test('It should not call the transform if the instance is a Err', () => {
      const transform = jest.fn();
      Result.Err.of('text').map(transform);
      expect(transform.mock.calls[0]).toBeFalsy();
    });
  });

  describe('Chain', () => {
    test('It should call the transform if the instance is an Ok', () => {
      const result = Result.of('text').chain(x => x.toUpperCase());
      expect(result).toBe('TEXT');
    });

    test('It should not call the transform if the instance is an Err', () => {
      const result = Result.Err('text').map(x => x.toUpperCase());
      expect(result.isErr()).toBe(true);
    });
  });

  describe('#isErr', () => {
    test('It should return true if the instance is a Err', () => {
      expect(Result.Err().isErr()).toBe(true);
    });

    test('It should return false if the instance is a Ok', () => {
      expect(Result.Ok().isErr()).toBe(false);
    });
  });

  describe('#isOk', () => {
    test('It should return true if the instance is a Ok', () => {
      expect(Result.Ok().isOk()).toBe(true);
    });

    test('It should return false if the instance is a Err', () => {
      expect(Result.Err().isOk()).toBe(false);
    });
  });
});
