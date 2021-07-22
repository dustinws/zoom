/* global describe, expect, jest, test */

const RemoteData = require('../../src/remote-data');

const {
  NotAsked,
  Loading,
  Failure,
  Success,
} = RemoteData;


describe('Data.RemoteData', () => {
  describe('RemoteData.map', () => {
    test('It should call the callback for "Success" only', () => {
      const callback = jest.fn();

      // This should be called
      RemoteData.map(callback, Success());
      expect(callback.mock.calls.length).toBe(1);

      // This should not be called
      RemoteData.map(callback, NotAsked);
      RemoteData.map(callback, Loading);
      RemoteData.map(callback, Failure());
      expect(callback.mock.calls.length).toBe(1);
    });
  });

  describe('NotAsked.map', () => {
    test('It should return itself without calling the callback', () => {
      const callback = jest.fn(x => x);

      const result = RemoteData.map(callback, NotAsked);

      expect(result).toBe(NotAsked);
      expect(callback.mock.calls.length).toBe(0);
    });
  });

  describe('Loading.map', () => {
    test('It should return itself without calling the callback', () => {
      const callback = jest.fn(x => x);

      const result = RemoteData.map(callback, Loading);

      expect(result).toBe(Loading);
      expect(callback.mock.calls.length).toBe(0);
    });
  });

  describe('Failure#map', () => {
    test('It should return itself without calling the callback', () => {
      const callback = jest.fn(x => x);

      const result = RemoteData.Failure(1).map(callback);

      expect(result).toEqual(Failure(1));
      expect(callback.mock.calls.length).toBe(0);
    });
  });

  describe('Success#map', () => {
    test('It should call the callback and return the result', () => {
      const callback = jest.fn(x => x);

      const result = RemoteData.Success(1).map(callback);

      expect(result).toEqual(Success(1));
      expect(callback.mock.calls.length).toBe(1);
    });
  });
});
