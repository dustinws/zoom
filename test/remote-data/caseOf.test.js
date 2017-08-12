/* global describe, expect, jest, test */

import RemoteData from '../../src/remote-data';

const {
  NotAsked,
  Loading,
  Failure,
  Success,
} = RemoteData;


describe('Data.RemoteData', () => {
  describe('NotAsked.caseOf', () => {
    test('It should call the "NotAsked" function.', () => {
      const notAskedCB = jest.fn();
      const loadingCB = jest.fn();
      const failureCB = jest.fn();
      const successCB = jest.fn();

      NotAsked.caseOf({
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

  describe('Loading.caseOf', () => {
    test('It should call the "Loading" function.', () => {
      const notAskedCB = jest.fn();
      const loadingCB = jest.fn();
      const failureCB = jest.fn();
      const successCB = jest.fn();

      Loading.caseOf({
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

  describe('Failure#caseOf', () => {
    test('It should call the "Failure" function with the error.', () => {
      const notAskedCB = jest.fn();
      const loadingCB = jest.fn();
      const failureCB = jest.fn();
      const successCB = jest.fn();
      const value = 1;

      Failure(value).caseOf({
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

  describe('Success#caseOf', () => {
    test('It should call the "Success" function with the error.', () => {
      const notAskedCB = jest.fn();
      const loadingCB = jest.fn();
      const failureCB = jest.fn();
      const successCB = jest.fn();
      const value = 1;

      Success(value).caseOf({
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
