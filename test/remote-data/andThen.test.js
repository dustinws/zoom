/* global describe, expect, jest, test */

const RemoteData = require('../../src/remote-data');

const {
  NotAsked,
  Loading,
  Failure,
  Success,
} = RemoteData;


describe('Data.RemoteData', () => {
  describe('RemoteData.andThen', () => {
    test('It should call the callback for "Success" only', () => {
      const callback = jest.fn();

      // This should be called
      RemoteData.andThen(callback, Success());
      expect(callback.mock.calls.length).toBe(1);

      // This should not be called
      RemoteData.andThen(callback, NotAsked);
      RemoteData.andThen(callback, Loading);
      RemoteData.andThen(callback, Failure());
      expect(callback.mock.calls.length).toBe(1);
    });
  });

  describe('NotAsked.andThen', () => {
    test('It should return itself without calling the callback', () => {
      const callback = jest.fn(x => x);

      const result = RemoteData.andThen(callback, NotAsked);

      expect(result).toBe(NotAsked);
      expect(callback.mock.calls.length).toBe(0);
    });
  });

  describe('Loading.andThen', () => {
    test('It should return itself without calling the callback', () => {
      const callback = jest.fn(x => x);

      const result = RemoteData.andThen(callback, Loading);

      expect(result).toBe(Loading);
      expect(callback.mock.calls.length).toBe(0);
    });
  });

  describe('Failure#andThen', () => {
    test('It should return itself without calling the callback', () => {
      const callback = jest.fn(x => x);

      const result = RemoteData.Failure(1).andThen(callback);

      expect(result).toEqual(Failure(1));
      expect(callback.mock.calls.length).toBe(0);
    });
  });

  describe('Success#andThen', () => {
    test('It should call the callback and return the result', () => {
      const callback = jest.fn(x => x);

      const result = RemoteData.Success(1).andThen(callback);

      expect(result).toEqual(1);
      expect(callback.mock.calls.length).toBe(1);
    });
  });
});
