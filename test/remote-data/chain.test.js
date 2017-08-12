/* global describe, expect, jest, test */

import RemoteData from '../../src/remote-data';

const {
  NotAsked,
  Loading,
  Failure,
  Success,
} = RemoteData;


describe('Data.RemoteData', () => {
  describe('RemoteData.chain', () => {
    test('It should call the callback for "Success" only', () => {
      const callback = jest.fn();

      // This should be called
      RemoteData.chain(callback, Success());
      expect(callback.mock.calls.length).toBe(1);

      // This should not be called
      RemoteData.chain(callback, NotAsked);
      RemoteData.chain(callback, Loading);
      RemoteData.chain(callback, Failure());
      expect(callback.mock.calls.length).toBe(1);
    });
  });

  describe('NotAsked.chain', () => {
    test('It should return itself without calling the callback', () => {
      const callback = jest.fn(x => x);

      const result = RemoteData.chain(callback, NotAsked);

      expect(result).toBe(NotAsked);
      expect(callback.mock.calls.length).toBe(0);
    });
  });

  describe('Loading.chain', () => {
    test('It should return itself without calling the callback', () => {
      const callback = jest.fn(x => x);

      const result = RemoteData.chain(callback, Loading);

      expect(result).toBe(Loading);
      expect(callback.mock.calls.length).toBe(0);
    });
  });

  describe('Failure#chain', () => {
    test('It should return itself without calling the callback', () => {
      const callback = jest.fn(x => x);

      const result = RemoteData.chain(callback, Failure(1));

      expect(result).toEqual(Failure(1));
      expect(callback.mock.calls.length).toBe(0);
    });
  });

  describe('Success#chain', () => {
    test('It should call the callback and return the result', () => {
      const callback = jest.fn(x => x);

      const result = RemoteData.chain(callback, Success(1));

      expect(result).toEqual(1);
      expect(callback.mock.calls.length).toBe(1);
    });
  });
});
