/* global describe, expect, test */
import Either from '../Either';

describe('Data.Either', () => {
  describe('Either.of', () => {
    test('It should return an instance of Either', () => {
      expect(Either.of(1) instanceof Either).toBe(true);
    });
  });

  describe('Either.map', () => {
    test('It should apply the transform if the instance is a Right', () => {
      const transform = x => x.toUpperCase();
      const either = Either.of('text');

      const result = Either.map(transform, either);

      expect(Either.isRight(result)).toBe(true);
      expect(result.value).toEqual('TEXT');
    });

    test('It should ignore the transform if the instance is a Left', () => {
      const transform = x => x.toUpperCase();
      const either = Either.Left.of('text');

      const result = Either.map(transform, either);

      expect(Either.isLeft(result)).toBe(true);
      expect(result.value).toEqual('text');
    });
  });

  describe('Either.ap', () => {
    test('It should apply the transform if the instance is a Right', () => {
      const either = Either.of('text');
      const apply = Either.of(x => x.toUpperCase());

      const result = Either.ap(apply, either);

      expect(Either.isRight(result)).toBe(true);
      expect(result.value).toEqual('TEXT');
    });

    test('It should ignore the transform if the instance is a Left', () => {
      const either = Either.Left.of('text');
      const apply = Either.of(x => x.toUpperCase());

      const result = Either.ap(apply, either);

      expect(Either.isLeft(result)).toBe(true);
      expect(result.value).toEqual('text');
    });
  });

  describe('Either.chain', () => {
    test('It should apply the transform if the instance is a Right', () => {
      const transform = x => x.toUpperCase();
      const either = Either.of('text');

      const result = Either.chain(transform, either);

      expect(result).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Left', () => {
      const transform = x => x.toUpperCase();
      const either = Either.Left.of('text');

      const result = Either.chain(transform, either);

      expect(result).toBe(either);
    });
  });

  describe('Either.andThen', () => {
    test('It should apply the transform if the instance is a Right', () => {
      const transform = x => x.toUpperCase();
      const either = Either.of('text');

      const result = Either.andThen(transform, either);

      expect(result).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Left', () => {
      const transform = x => x.toUpperCase();
      const either = Either.Left.of('text');

      const result = Either.andThen(transform, either);

      expect(result).toBe(either);
    });
  });

  describe('Either.isLeft', () => {
    test('It should return true if the instance is a Left', () => {
      expect(Either.isLeft(Either.Left.of())).toBe(true);
    });

    test('It should return false if the instance is a Right', () => {
      expect(Either.isLeft(Either.Right.of())).toBe(false);
    });
  });

  describe('Either.isRight', () => {
    test('It should return true if the instance is a Right', () => {
      expect(Either.isRight(Either.Right.of())).toBe(true);
    });

    test('It should return false if the instance is a Left', () => {
      expect(Either.isRight(Either.Left.of())).toBe(false);
    });
  });

  describe('Either#of', () => {
    test('It should return an instance of Either', () => {
      expect(Either.of().of(1).isRight()).toBe(true);
      expect(Either.Right.of().of(1).isRight()).toBe(true);
      expect(Either.Left.of().of(1).isLeft()).toBe(true);
    });
  });

  describe('Either#map', () => {
    test('It should apply the transform if the instance is a Right', () => {
      const result = Either
        .Right.of('text')
        .map(x => x.toUpperCase());

      expect(Either.isRight(result)).toBe(true);
      expect(result.value).toEqual('TEXT');
    });

    test('It should ignore the transform if the instance is a Left', () => {
      const result = Either
        .Left.of('text')
        .map(x => x.toUpperCase());

      expect(Either.isLeft(result)).toBe(true);
      expect(result.value).toEqual('text');
    });
  });

  describe('Either#ap', () => {
    test('It should apply the transform if the instance is a Right', () => {
      const result = Either
        .Right.of('text')
        .ap(Either.of(x => x.toUpperCase()));

      expect(Either.isRight(result)).toBe(true);
      expect(result.value).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Left', () => {
      const result = Either
        .Left.of('text')
        .ap(Either.of(x => x.toUpperCase()));

      expect(Either.isLeft(result)).toBe(true);
      expect(result.value).toBe('text');
    });
  });

  describe('Either#chain', () => {
    test('It should apply the transform if the instance is a Right', () => {
      const result = Either.Right.of('text');
      const value = result.chain(x => x.toUpperCase());

      expect(value).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Left', () => {
      const result = Either.Left.of('text');
      const value = result.chain(x => x.toUpperCase());

      expect(value).toBe(result);
    });
  });

  describe('Either#andThen', () => {
    test('It should apply the transform if the instance is a Right', () => {
      const result = Either.Right.of('text');
      const value = result.andThen(x => x.toUpperCase());

      expect(value).toBe('TEXT');
    });

    test('It should ignore the transform if the instance is a Left', () => {
      const result = Either.Left.of('text');
      const value = result.andThen(x => x.toUpperCase());

      expect(value).toBe(result);
    });
  });

  describe('Either#isLeft', () => {
    test('It should return true if the instance is a Left', () => {
      expect(Either.Left.of().isLeft()).toBe(true);
    });

    test('It should return false if the instance is a Right', () => {
      expect(Either.Right.of().isLeft()).toBe(false);
    });
  });

  describe('Either#isRight', () => {
    test('It should return true if the instance is a Right', () => {
      expect(Either.Right.of().isRight()).toBe(true);
    });

    test('It should return false if the instance is a Left', () => {
      expect(Either.Left.of().isRight()).toBe(false);
    });
  });
});
