/* global describe, expect, test */
import Result from '../Result';

describe('Data.Result', () => {
  describe('Result.of', () => {
    test('It should return an instance of Result', () => {
      expect(Result.of(1) instanceof Result).toBe(true);
    });
  });

  describe('Result.map', () => {
    test('It should apply the transform if the instance is a Ok', () => {
      const transform = x => x.toUpperCase();
      const result = Result.of('text');

      const final = Result.map(transform, result);

      expect(Result.isOk(final)).toBe(true);
      expect(final.value).toEqual('TEXT');
    });

    test('It should ignore the transform if the instance is a Err', () => {
      const transform = x => x.toUpperCase();
      const result = Result.Err.of('text');

      const final = Result.map(transform, result);

      expect(Result.isErr(final)).toBe(true);
      expect(final.value).toEqual('text');
    });
  });

  describe('Result.ap', () => {
    test('It should apply the transform if the instance is a Ok', () => {
      const result = Result.of('text');
      const apply = Result.of(x => x.toUpperCase());

      const final = Result.ap(apply, result);

      expect(Result.isOk(final)).toBe(true);
      expect(final.value).toEqual('TEXT');
    });

    test('It should ignore the transform if the instance is a Err', () => {
      const result = Result.Err.of('text');
      const apply = Result.of(x => x.toUpperCase());

      const final = Result.ap(apply, result);

      expect(Result.isErr(final)).toBe(true);
      expect(final.value).toEqual('text');
    });
  });

  describe('Result.chain', () => {
    test('It should apply the transform if the instance is a Ok', () => {
      const transform = x => x.toUpperCase();
      const result = Result.of('text');

      const final = Result.chain(transform, result);

      expect(final).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Err', () => {
      const transform = x => x.toUpperCase();
      const result = Result.Err.of('text');

      const final = Result.chain(transform, result);

      expect(final).toBe(result);
    });
  });

  describe('Result.andThen', () => {
    test('It should apply the transform if the instance is a Ok', () => {
      const transform = x => x.toUpperCase();
      const result = Result.of('text');

      const final = Result.andThen(transform, result);

      expect(final).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Err', () => {
      const transform = x => x.toUpperCase();
      const result = Result.Err.of('text');

      const final = Result.andThen(transform, result);

      expect(final).toBe(result);
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
      expect(Result.of().of(1).isOk()).toBe(true);
      expect(Result.Ok.of().of(1).isOk()).toBe(true);
      expect(Result.Err.of().of(1).isErr()).toBe(true);
    });
  });

  describe('Result#map', () => {
    test('It should apply the transform if the instance is a Ok', () => {
      const final = Result
        .Ok.of('text')
        .map(x => x.toUpperCase());

      expect(Result.isOk(final)).toBe(true);
      expect(final.value).toEqual('TEXT');
    });

    test('It should ignore the transform if the instance is a Err', () => {
      const final = Result
        .Err.of('text')
        .map(x => x.toUpperCase());

      expect(Result.isErr(final)).toBe(true);
      expect(final.value).toEqual('text');
    });
  });

  describe('Result#ap', () => {
    test('It should apply the transform if the instance is a Ok', () => {
      const final = Result
        .Ok.of('text')
        .ap(Result.of(x => x.toUpperCase()));

      expect(Result.isOk(final)).toBe(true);
      expect(final.value).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Err', () => {
      const final = Result
        .Err.of('text')
        .ap(Result.of(x => x.toUpperCase()));

      expect(Result.isErr(final)).toBe(true);
      expect(final.value).toBe('text');
    });
  });

  describe('Result#chain', () => {
    test('It should apply the transform if the instance is a Ok', () => {
      const final = Result.Ok.of('text');
      const value = final.chain(x => x.toUpperCase());

      expect(value).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Err', () => {
      const final = Result.Err.of('text');
      const value = final.chain(x => x.toUpperCase());

      expect(value).toBe(final);
    });
  });

  describe('Result#andThen', () => {
    test('It should apply the transform if the instance is a Ok', () => {
      const final = Result.Ok.of('text');
      const value = final.andThen(x => x.toUpperCase());

      expect(value).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Err', () => {
      const final = Result.Err.of('text');
      const value = final.andThen(x => x.toUpperCase());

      expect(value).toBe(final);
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
