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
    test('It should call the transform if the instance is a Success', () => {
      const transform = jest.fn();
      Result.of('text').map(transform);
      expect(transform.mock.calls[0]).toEqual(['text']);
    });

    test('It should not call the transform if the instance is a Failure', () => {
      const transform = jest.fn();
      Result.Failure.of('text').map(transform);
      expect(transform.mock.calls[0]).toBeFalsy();
    });
  });

  describe('Chain', () => {
    test('It should call the transform if the instance is a Just', () => {
      const result = Result.of('text').chain(x => x.toUpperCase());
      expect(result).toBe('TEXT');
    });

    test('It should not call the transform if the instance is a Nothing', () => {
      const result = Result.Failure('text').map(x => x.toUpperCase());
      expect(result.isFailure()).toBe(true);
    });
  });

  describe('#try(value)', () => {
    test('It should a Success if the function was successful', () => {
      const fromJson = Result.try(JSON.parse);
      const result = fromJson('{ "foo": "bar" }');
      expect(result.isSuccess()).toBe(true);
    });

    test('It should return Failure if it was not successful', () => {
      const fromJson = Result.try(JSON.parse);
      const result = fromJson('...');
      expect(result instanceof Result.Failure).toBe(true);
    });
  });

  describe('#isFailure', () => {
    test('It should return true if the instance is a Failure', () => {
      expect(Result.Failure().isFailure()).toBe(true);
    });

    test('It should return false if the instance is a Success', () => {
      expect(Result.Success().isFailure()).toBe(false);
    });
  });

  describe('#isSuccess', () => {
    test('It should return true if the instance is a Success', () => {
      expect(Result.Success().isSuccess()).toBe(true);
    });

    test('It should return false if the instance is a Failure', () => {
      expect(Result.Failure().isSuccess()).toBe(false);
    });
  });

  describe('Semigroup', () => {
    test('It should return the failure if they are mixed', () => {
      const left = Result.Failure();
      const right = Result.Success();

      expect(left.concat(right)).toBe(left);
      expect(right.concat(left)).toBe(left);
    });

    test('It should concat the successes if they are both successes', () => {
      const left = Result.Success(['a']);
      const right = Result.Success(['b']);

      expect(left.concat(right).value).toEqual(['a', 'b']);
      expect(right.concat(left).value).toEqual(['b', 'a']);
    });

    test('It should concat the failures if they are both failures', () => {
      const left = Result.Failure(['a']);
      const right = Result.Failure(['b']);

      expect(left.concat(right).value).toEqual(['a', 'b']);
      expect(right.concat(left).value).toEqual(['b', 'a']);
    });
  });

  describe('Monoid', () => {
    expect(Result.empty().isSuccess()).toBe(true);
    expect(Result.empty().value).toEqual([]);
  });

  describe('Result.combine', () => {
    const check = Result.combine({
      age: x => x < 21 // eslint-disable-line no-confusing-arrow
        ? Result.Failure(['Must be at least 21.'])
        : Result.Success([]),

      balance: x => x < 2 // eslint-disable-line no-confusing-arrow
        ? Result.Failure(['Not enough money!'])
        : Result.Success([]),
    });

    const validUser = { age: 22, balance: 3 };
    const valid = check(validUser);
    const tooYoung = check({ age: 19, balance: 3 });
    const tooBroke = check({ age: 22, balance: 1 });
    const SOL = check({ age: 20, balance: 1 });

    // Make sure the types line up
    expect(valid.isSuccess()).toBe(true);
    expect(tooYoung.isFailure()).toBe(true);
    expect(tooBroke.isFailure()).toBe(true);
    expect(SOL.isFailure()).toBe(true);

    // Make sure the values / errors were passed down correctly
    expect(valid.value).toBe(validUser);
    expect(tooYoung.value).toEqual(['Must be at least 21.']);
    expect(tooBroke.value).toEqual(['Not enough money!']);
    expect(SOL.value).toEqual(['Must be at least 21.', 'Not enough money!']);
  });
});
