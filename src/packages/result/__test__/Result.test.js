/* global describe, expect, test */
import Result from '../Result';

describe('Data.Result', () => {
  describe('Result.of', () => {
    test('It should return an instance of Result', () => {
      expect(Result.of(1) instanceof Result).toBe(true);
    });
  });

  describe('Result.map', () => {
    test('It should apply the transform if the instance is a Success', () => {
      const transform = x => x.toUpperCase();
      const result = Result.of('text');

      const final = Result.map(transform, result);

      expect(Result.isSuccess(final)).toBe(true);
      expect(final.value).toEqual('TEXT');
    });

    test('It should ignore the transform if the instance is a Failure', () => {
      const transform = x => x.toUpperCase();
      const result = Result.Failure.of('text');

      const final = Result.map(transform, result);

      expect(Result.isFailure(final)).toBe(true);
      expect(final.value).toEqual('text');
    });
  });

  describe('Result.ap', () => {
    test('It should apply the transform if the instance is a Success', () => {
      const result = Result.of('text');
      const apply = Result.of(x => x.toUpperCase());

      const final = Result.ap(apply, result);

      expect(Result.isSuccess(final)).toBe(true);
      expect(final.value).toEqual('TEXT');
    });

    test('It should ignore the transform if the instance is a Failure', () => {
      const result = Result.Failure.of('text');
      const apply = Result.of(x => x.toUpperCase());

      const final = Result.ap(apply, result);

      expect(Result.isFailure(final)).toBe(true);
      expect(final.value).toEqual('text');
    });
  });

  describe('Result.chain', () => {
    test('It should apply the transform if the instance is a Success', () => {
      const transform = x => x.toUpperCase();
      const result = Result.of('text');

      const final = Result.chain(transform, result);

      expect(final).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Failure', () => {
      const transform = x => x.toUpperCase();
      const result = Result.Failure.of('text');

      const final = Result.chain(transform, result);

      expect(final).toBe(result);
    });
  });

  describe('Result.andThen', () => {
    test('It should apply the transform if the instance is a Success', () => {
      const transform = x => x.toUpperCase();
      const result = Result.of('text');

      const final = Result.andThen(transform, result);

      expect(final).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Failure', () => {
      const transform = x => x.toUpperCase();
      const result = Result.Failure.of('text');

      const final = Result.andThen(transform, result);

      expect(final).toBe(result);
    });
  });

  describe('Result.isFailure', () => {
    test('It should return true if the instance is a Failure', () => {
      expect(Result.isFailure(Result.Failure.of())).toBe(true);
    });

    test('It should return false if the instance is a Success', () => {
      expect(Result.isFailure(Result.Success.of())).toBe(false);
    });
  });

  describe('Result.isSuccess', () => {
    test('It should return true if the instance is a Success', () => {
      expect(Result.isSuccess(Result.Success.of())).toBe(true);
    });

    test('It should return false if the instance is a Failure', () => {
      expect(Result.isSuccess(Result.Failure.of())).toBe(false);
    });
  });

  describe('Result#of', () => {
    test('It should return an instance of Result', () => {
      expect(Result.of().of(1).isSuccess()).toBe(true);
      expect(Result.Success.of().of(1).isSuccess()).toBe(true);
      expect(Result.Failure.of().of(1).isFailure()).toBe(true);
    });
  });

  describe('Result#map', () => {
    test('It should apply the transform if the instance is a Success', () => {
      const final = Result
        .Success.of('text')
        .map(x => x.toUpperCase());

      expect(Result.isSuccess(final)).toBe(true);
      expect(final.value).toEqual('TEXT');
    });

    test('It should ignore the transform if the instance is a Failure', () => {
      const final = Result
        .Failure.of('text')
        .map(x => x.toUpperCase());

      expect(Result.isFailure(final)).toBe(true);
      expect(final.value).toEqual('text');
    });
  });

  describe('Result#ap', () => {
    test('It should apply the transform if the instance is a Success', () => {
      const final = Result
        .Success.of('text')
        .ap(Result.of(x => x.toUpperCase()));

      expect(Result.isSuccess(final)).toBe(true);
      expect(final.value).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Failure', () => {
      const final = Result
        .Failure.of('text')
        .ap(Result.of(x => x.toUpperCase()));

      expect(Result.isFailure(final)).toBe(true);
      expect(final.value).toBe('text');
    });
  });

  describe('Result#chain', () => {
    test('It should apply the transform if the instance is a Success', () => {
      const final = Result.Success.of('text');
      const value = final.chain(x => x.toUpperCase());

      expect(value).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Failure', () => {
      const final = Result.Failure.of('text');
      const value = final.chain(x => x.toUpperCase());

      expect(value).toBe(final);
    });
  });

  describe('Result#andThen', () => {
    test('It should apply the transform if the instance is a Success', () => {
      const final = Result.Success.of('text');
      const value = final.andThen(x => x.toUpperCase());

      expect(value).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Failure', () => {
      const final = Result.Failure.of('text');
      const value = final.andThen(x => x.toUpperCase());

      expect(value).toBe(final);
    });
  });

  describe('Result#isFailure', () => {
    test('It should return true if the instance is a Failure', () => {
      expect(Result.Failure.of().isFailure()).toBe(true);
    });

    test('It should return false if the instance is a Success', () => {
      expect(Result.Success.of().isFailure()).toBe(false);
    });
  });

  describe('Result#isSuccess', () => {
    test('It should return true if the instance is a Success', () => {
      expect(Result.Success.of().isSuccess()).toBe(true);
    });

    test('It should return false if the instance is a Failure', () => {
      expect(Result.Failure.of().isSuccess()).toBe(false);
    });
  });
});
