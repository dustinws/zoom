/* global describe, expect, test, jest */
import Validation from '../Validation';

describe('data.Validation', () => {
  test('It should implement static Applicative', () => {
    expect(Validation.of(1) instanceof Validation).toBe(true);
  });

  test('It should implement instance Applicative', () => {
    expect(Validation.of(1).of(1) instanceof Validation).toBe(true);
  });

  describe('Functor', () => {
    test('It should call the transform if the instance is a Success', () => {
      const transform = jest.fn();
      Validation.of('text').map(transform);
      expect(transform.mock.calls[0]).toEqual(['text']);
    });

    test('It should not call the transform if the instance is a Failure', () => {
      const transform = jest.fn();
      Validation.Failure.of('text').map(transform);
      expect(transform.mock.calls[0]).toBeFalsy();
    });
  });

  describe('Chain', () => {
    test('It should call the transform if the instance is a Just', () => {
      const result = Validation.of('text').chain(x => x.toUpperCase());
      expect(result).toBe('TEXT');
    });

    test('It should not call the transform if the instance is a Nothing', () => {
      const result = Validation.Failure('text').map(x => x.toUpperCase());
      expect(result.isFailure()).toBe(true);
    });
  });

  describe('#isFailure', () => {
    test('It should return true if the instance is a Failure', () => {
      expect(Validation.Failure().isFailure()).toBe(true);
    });

    test('It should return false if the instance is a Success', () => {
      expect(Validation.Success().isFailure()).toBe(false);
    });
  });

  describe('#isSuccess', () => {
    test('It should return true if the instance is a Success', () => {
      expect(Validation.Success().isSuccess()).toBe(true);
    });

    test('It should return false if the instance is a Failure', () => {
      expect(Validation.Failure().isSuccess()).toBe(false);
    });
  });

  describe('Semigroup', () => {
    test('It should return the failure if they are mixed', () => {
      const left = Validation.Failure();
      const right = Validation.Success();

      expect(left.concat(right)).toBe(left);
      expect(right.concat(left)).toBe(left);
    });

    test('It should concat the successes if they are both successes', () => {
      const left = Validation.Success(['a']);
      const right = Validation.Success(['b']);

      expect(left.concat(right).value).toEqual(['a', 'b']);
      expect(right.concat(left).value).toEqual(['b', 'a']);
    });

    test('It should concat the failures if they are both failures', () => {
      const left = Validation.Failure(['a']);
      const right = Validation.Failure(['b']);

      expect(left.concat(right).value).toEqual(['a', 'b']);
      expect(right.concat(left).value).toEqual(['b', 'a']);
    });
  });

  describe('Monoid', () => {
    expect(Validation.empty().isSuccess()).toBe(true);
    expect(Validation.empty().value).toEqual([]);
  });

  describe('Validation.combine', () => {
    const check = Validation.combine({
      age: x => x < 21 // eslint-disable-line no-confusing-arrow
        ? Validation.Failure(['Must be at least 21.'])
        : Validation.Success([]),

      balance: x => x < 2 // eslint-disable-line no-confusing-arrow
        ? Validation.Failure(['Not enough money!'])
        : Validation.Success([]),
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
