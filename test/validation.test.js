/* global describe, expect, test */
import Validation from '../src/validation';

describe('Data.Validation', () => {
  describe('Validation.of', () => {
    test('It should return an instance of Validation', () => {
      expect(Validation.of(1).isSuccess()).toBe(true);
    });
  });

  describe('Validation.map', () => {
    test('It should apply the transform if the instance is a Success', () => {
      const transform = x => x.toUpperCase();
      const either = Validation.of('text');

      const result = Validation.map(transform, either);

      expect(Validation.isSuccess(result)).toBe(true);
      expect(result.value).toEqual('TEXT');
    });

    test('It should ignore the transform if the instance is a Failure', () => {
      const transform = x => x.toUpperCase();
      const either = Validation.Failure.of('text');

      const result = Validation.map(transform, either);

      expect(Validation.isFailure(result)).toBe(true);
      expect(result.value).toEqual('text');
    });
  });

  describe('Validation.ap', () => {
    test('It should apply the transform if the instance is a Success', () => {
      const either = Validation.of('text');
      const apply = Validation.of(x => x.toUpperCase());

      const result = Validation.ap(apply, either);

      expect(Validation.isSuccess(result)).toBe(true);
      expect(result.value).toEqual('TEXT');
    });

    test('It should ignore the transform if the instance is a Failure', () => {
      const either = Validation.Failure.of('text');
      const apply = Validation.of(x => x.toUpperCase());

      const result = Validation.ap(apply, either);

      expect(Validation.isFailure(result)).toBe(true);
      expect(result.value).toEqual('text');
    });
  });

  describe('Validation.chain', () => {
    test('It should apply the transform if the instance is a Success', () => {
      const transform = x => x.toUpperCase();
      const either = Validation.of('text');

      const result = Validation.chain(transform, either);

      expect(result).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Failure', () => {
      const transform = x => x.toUpperCase();
      const either = Validation.Failure.of('text');

      const result = Validation.chain(transform, either);

      expect(result).toBe(either);
    });
  });

  describe('Validation.andThen', () => {
    test('It should apply the transform if the instance is a Success', () => {
      const transform = x => x.toUpperCase();
      const either = Validation.of('text');

      const result = Validation.andThen(transform, either);

      expect(result).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Failure', () => {
      const transform = x => x.toUpperCase();
      const either = Validation.Failure.of('text');

      const result = Validation.andThen(transform, either);

      expect(result).toBe(either);
    });
  });

  describe('Validation.isFailure', () => {
    test('It should return true if the instance is a Failure', () => {
      expect(Validation.isFailure(Validation.Failure.of())).toBe(true);
    });

    test('It should return false if the instance is a Success', () => {
      expect(Validation.isFailure(Validation.Success.of())).toBe(false);
    });
  });

  describe('Validation.isSuccess', () => {
    test('It should return true if the instance is a Success', () => {
      expect(Validation.isSuccess(Validation.Success.of())).toBe(true);
    });

    test('It should return false if the instance is a Failure', () => {
      expect(Validation.isSuccess(Validation.Failure.of())).toBe(false);
    });
  });

  describe('Validation.concat', () => {
    test('It should return the failure if they are mixed', () => {
      const left = Validation.Failure();
      const right = Validation.Success();

      expect(Validation.concat(left, right)).toBe(left);
      expect(Validation.concat(right, left)).toBe(left);
    });

    test('It should concat the successes if they are both successes', () => {
      const left = Validation.Success(['a']);
      const right = Validation.Success(['b']);

      expect(Validation.concat(left, right).value).toEqual(['a', 'b']);
      expect(Validation.concat(right, left).value).toEqual(['b', 'a']);
    });

    test('It should concat the failures if they are both failures', () => {
      const left = Validation.Failure(['a']);
      const right = Validation.Failure(['b']);

      expect(Validation.concat(left, right).value).toEqual(['a', 'b']);
      expect(Validation.concat(right, left).value).toEqual(['b', 'a']);
    });
  });

  describe('Monoid', () => {
    expect(Validation.empty().isSuccess()).toBe(true);
    expect(Validation.empty().value).toEqual([]);
  });

  describe('Validation#of', () => {
    test('It should return an instance of Validation', () => {
      expect(Validation.of(1).isSuccess()).toBe(true);
      expect(Validation.Success.of().of().isSuccess()).toBe(true);
      expect(Validation.Failure.of().of().isFailure()).toBe(true);
    });
  });

  describe('Validation#map', () => {
    test('It should apply the transform if the instance is a Success', () => {
      const transform = x => x.toUpperCase();

      const result = Validation.of('text').map(transform);

      expect(result.isSuccess()).toBe(true);
      expect(result.value).toEqual('TEXT');
    });

    test('It should ignore the transform if the instance is a Failure', () => {
      const transform = x => x.toUpperCase();

      const result = Validation.Failure.of('text').map(transform);

      expect(result.isFailure()).toBe(true);
      expect(result.value).toEqual('text');
    });
  });

  describe('Validation#ap', () => {
    test('It should apply the transform if the instance is a Success', () => {
      const result = Validation
        .of('text')
        .ap(Validation.of(x => x.toUpperCase()));

      expect(result.isSuccess()).toBe(true);
      expect(result.value).toEqual('TEXT');
    });

    test('It should ignore the transform if the instance is a Failure', () => {
      const result = Validation
        .Failure.of('text')
        .ap(Validation.of(x => x.toUpperCase()));

      expect(result.isSuccess()).toBe(false);
      expect(result.value).toEqual('text');
    });
  });

  describe('Validation#chain', () => {
    test('It should apply the transform if the instance is a Success', () => {
      const transform = x => x.toUpperCase();

      const result = Validation.of('text').chain(transform);

      expect(result).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Failure', () => {
      const transform = x => x.toUpperCase();
      const either = Validation.Failure.of('text');
      const result = either.chain(transform);

      expect(result).toBe(either);
    });
  });

  describe('Validation#andThen', () => {
    test('It should apply the transform if the instance is a Success', () => {
      const transform = x => x.toUpperCase();

      const result = Validation.of('text').andThen(transform);

      expect(result).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Failure', () => {
      const transform = x => x.toUpperCase();
      const either = Validation.Failure.of('text');
      const result = either.andThen(transform);

      expect(result).toBe(either);
    });
  });

  describe('Validation#isFailure', () => {
    test('It should return true if the instance is a Failure', () => {
      expect(Validation.Failure.of().isFailure()).toBe(true);
    });

    test('It should return false if the instance is a Success', () => {
      expect(Validation.Success.of().isFailure()).toBe(false);
    });
  });

  describe('Validation#isSuccess', () => {
    test('It should return true if the instance is a Success', () => {
      expect(Validation.Success.of().isSuccess()).toBe(true);
    });

    test('It should return false if the instance is a Failure', () => {
      expect(Validation.Failure.of().isSuccess()).toBe(false);
    });
  });

  describe('Validation#concat', () => {
    test('It should return the failure if they are mixed', () => {
      const left = Validation.Failure();
      const right = Validation.Success();

      expect(right.concat(left)).toBe(left);
      expect(left.concat(right)).toBe(left);
    });

    test('It should concat the successes if they are both successes', () => {
      const left = Validation.Success(['a']);
      const right = Validation.Success(['b']);

      expect(right.concat(left).value).toEqual(['a', 'b']);
      expect(left.concat(right).value).toEqual(['b', 'a']);
    });

    test('It should concat the failures if they are both failures', () => {
      const left = Validation.Failure(['a']);
      const right = Validation.Failure(['b']);

      expect(right.concat(left).value).toEqual(['a', 'b']);
      expect(left.concat(right).value).toEqual(['b', 'a']);
    });
  });
});
