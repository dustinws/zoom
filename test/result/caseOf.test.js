/* global describe, expect, jest, test */

import Result from '../../src/result';

const { Err, Ok } = Result;


describe('Data.Result', () => {
  describe('Err#caseOf', () => {
    test('It should call the "Err" function.', () => {
      const errCB = jest.fn();
      const okCB = jest.fn();

      Err().caseOf({
        Err: errCB,
        Ok: okCB,
      });

      expect(errCB.mock.calls.length).toBe(1);
      expect(okCB.mock.calls.length).toBe(0);
    });
  });

  describe('Ok#caseOf', () => {
    test('It should call the "Ok" function.', () => {
      const errCB = jest.fn();
      const okCB = jest.fn();

      Ok().caseOf({
        Err: errCB,
        Ok: okCB,
      });

      expect(errCB.mock.calls.length).toBe(0);
      expect(okCB.mock.calls.length).toBe(1);
    });
  });
});
