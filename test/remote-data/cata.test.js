/* global describe, expect, jest, test */

import RemoteData from '../../src/remote-data';

const {
  NotAsked,
  Loading,
  Failure,
  Success,
} = RemoteData;


describe('Data.RemoteData', () => {
  describe('NotAsked.cata', () => {
    test('It should call the "NotAsked" function.', () => {
      const notAskedCB = jest.fn();
      const loadingCB = jest.fn();
      const failureCB = jest.fn();
      const successCB = jest.fn();

      NotAsked.cata({
        NotAsked: notAskedCB,
        Loading: loadingCB,
        Failure: failureCB,
        Success: successCB,
      });

      expect(notAskedCB.mock.calls.length).toBe(1);
      expect(loadingCB.mock.calls.length).toBe(0);
      expect(failureCB.mock.calls.length).toBe(0);
      expect(successCB.mock.calls.length).toBe(0);
    });
  });

  describe('Loading.cata', () => {
    test('It should call the "Loading" function.', () => {
      const notAskedCB = jest.fn();
      const loadingCB = jest.fn();
      const failureCB = jest.fn();
      const successCB = jest.fn();

      Loading.cata({
        NotAsked: notAskedCB,
        Loading: loadingCB,
        Failure: failureCB,
        Success: successCB,
      });

      expect(notAskedCB.mock.calls.length).toBe(0);
      expect(loadingCB.mock.calls.length).toBe(1);
      expect(failureCB.mock.calls.length).toBe(0);
      expect(successCB.mock.calls.length).toBe(0);
    });
  });

  describe('Failure#cata', () => {
    test('It should call the "Failure" function with the error.', () => {
      const notAskedCB = jest.fn();
      const loadingCB = jest.fn();
      const failureCB = jest.fn();
      const successCB = jest.fn();
      const value = 1;

      Failure(value).cata({
        NotAsked: notAskedCB,
        Loading: loadingCB,
        Failure: failureCB,
        Success: successCB,
      });

      expect(notAskedCB.mock.calls.length).toBe(0);
      expect(loadingCB.mock.calls.length).toBe(0);
      expect(failureCB.mock.calls.length).toBe(1);
      expect(successCB.mock.calls.length).toBe(0);

      expect(failureCB.mock.calls).toEqual([[value]]);
    });
  });

  describe('Success#cata', () => {
    test('It should call the "Success" function with the error.', () => {
      const notAskedCB = jest.fn();
      const loadingCB = jest.fn();
      const failureCB = jest.fn();
      const successCB = jest.fn();
      const value = 1;

      Success(value).cata({
        NotAsked: notAskedCB,
        Loading: loadingCB,
        Failure: failureCB,
        Success: successCB,
      });

      expect(notAskedCB.mock.calls.length).toBe(0);
      expect(loadingCB.mock.calls.length).toBe(0);
      expect(failureCB.mock.calls.length).toBe(0);
      expect(successCB.mock.calls.length).toBe(1);

      expect(successCB.mock.calls).toEqual([[value]]);
    });
  });
});
