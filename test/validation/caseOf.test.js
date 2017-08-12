/* global describe, expect, jest, test */

import Validation from '../../src/validation';

const { Failure, Success } = Validation;


describe('Data.Validation', () => {
  describe('Failure#caseOf', () => {
    test('It should call the "Failure" function.', () => {
      const failureCB = jest.fn();
      const successCB = jest.fn();

      Failure().caseOf({
        Failure: failureCB,
        Success: successCB,
      });

      expect(failureCB.mock.calls.length).toBe(1);
      expect(successCB.mock.calls.length).toBe(0);
    });
  });

  describe('Success#caseOf', () => {
    test('It should call the "Success" function.', () => {
      const failureCB = jest.fn();
      const successCB = jest.fn();

      Success().caseOf({
        Failure: failureCB,
        Success: successCB,
      });

      expect(failureCB.mock.calls.length).toBe(0);
      expect(successCB.mock.calls.length).toBe(1);
    });
  });
});
