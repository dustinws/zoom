/* global describe, expect, test */
import Result from '../Result';

describe('data.Result', () => {
  describe('Result.of', () => {
    test('It should return an instance of Result', () => {
      expect(Result.of(1) instanceof Result).toBe(true);
    });
  });

  describe('Result.map', () => {
    test('It should apply the transform if the instance is a Ok', () => {
      const transform = x => x.toUpperCase();
      const either = Result.of('text');

      const result = Result.map(transform, either);

      expect(Result.isOk(result)).toBe(true);
      expect(result.value).toEqual('TEXT');
    });

    test('It should ignore the transform if the instance is a Err', () => {
      const transform = x => x.toUpperCase();
      const either = Result.Err.of('text');

      const result = Result.map(transform, either);

      expect(Result.isErr(result)).toBe(true);
      expect(result.value).toEqual('text');
    });
  });

  describe('Result.ap', () => {
    test('It should apply the transform if the instance is a Ok', () => {
      const either = Result.of('text');
      const apply = Result.of(x => x.toUpperCase());

      const result = Result.ap(apply, either);

      expect(Result.isOk(result)).toBe(true);
      expect(result.value).toEqual('TEXT');
    });

    test('It should ignore the transform if the instance is a Err', () => {
      const either = Result.Err.of('text');
      const apply = Result.of(x => x.toUpperCase());

      const result = Result.ap(apply, either);

      expect(Result.isErr(result)).toBe(true);
      expect(result.value).toEqual('text');
    });
  });

  describe('Result.chain', () => {
    test('It should apply the transform if the instance is a Ok', () => {
      const transform = x => x.toUpperCase();
      const either = Result.of('text');

      const result = Result.chain(transform, either);

      expect(result).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Err', () => {
      const transform = x => x.toUpperCase();
      const either = Result.Err.of('text');

      const result = Result.chain(transform, either);

      expect(result).toBe(either);
    });
  });

  describe('Result.isErr', () => {
    test('It should return true if the instance is a Err', () => {
      expect(Result.isErr(Result.Err.of())).toBe(true);
    });

    test('It should return false if the instance is a Ok', () => {
      expect(Result.isErr(Result.Ok.of())).toBe(false);
    });
  });

  describe('Result.isOk', () => {
    test('It should return true if the instance is a Ok', () => {
      expect(Result.isOk(Result.Ok.of())).toBe(true);
    });

    test('It should return false if the instance is a Err', () => {
      expect(Result.isOk(Result.Err.of())).toBe(false);
    });
  });

  describe('Result#of', () => {
    test('It should return an instance of Result', () => {
      expect(Result.of(1).isOk()).toBe(true);
      expect(Result.Ok.of().of().isOk()).toBe(true);
      expect(Result.Err.of().of().isErr()).toBe(true);
    });
  });

  describe('Result#map', () => {
    test('It should apply the transform if the instance is a Ok', () => {
      const result = Result
        .Ok.of('text')
        .map(x => x.toUpperCase());

      expect(Result.isOk(result)).toBe(true);
      expect(result.value).toEqual('TEXT');
    });

    test('It should ignore the transform if the instance is a Err', () => {
      const result = Result
        .Err.of('text')
        .map(x => x.toUpperCase());

      expect(Result.isErr(result)).toBe(true);
      expect(result.value).toEqual('text');
    });
  });

  describe('Result#ap', () => {
    test('It should apply the transform if the instance is a Ok', () => {
      const result = Result
        .Ok.of('text')
        .ap(Result.of(x => x.toUpperCase()));

      expect(Result.isOk(result)).toBe(true);
      expect(result.value).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Err', () => {
      const result = Result
        .Err.of('text')
        .ap(Result.of(x => x.toUpperCase()));

      expect(Result.isErr(result)).toBe(true);
      expect(result.value).toBe('text');
    });
  });

  describe('Result#chain', () => {
    test('It should apply the transform if the instance is a Ok', () => {
      const result = Result.Ok.of('text');
      const value = result.chain(x => x.toUpperCase());

      expect(value).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Err', () => {
      const result = Result.Err.of('text');
      const value = result.chain(x => x.toUpperCase());

      expect(value).toBe(result);
    });
  });

  describe('Result#isErr', () => {
    test('It should return true if the instance is a Err', () => {
      expect(Result.Err.of().isErr()).toBe(true);
    });

    test('It should return false if the instance is a Ok', () => {
      expect(Result.Ok.of().isErr()).toBe(false);
    });
  });

  describe('Result#isOk', () => {
    test('It should return true if the instance is a Ok', () => {
      expect(Result.Ok.of().isOk()).toBe(true);
    });

    test('It should return false if the instance is a Err', () => {
      expect(Result.Err.of().isOk()).toBe(false);
    });
  });
});
