/* global describe, expect, jest, test */

const Result = require('../../src/result');

const { Err, Ok } = Result;


describe('Data.Result', () => {
  describe('Err#cata', () => {
    test('It should call the "Err" function.', () => {
      const errCB = jest.fn();
      const okCB = jest.fn();

      Err().cata({
        Err: errCB,
        Ok: okCB,
      });

      expect(errCB.mock.calls.length).toBe(1);
      expect(okCB.mock.calls.length).toBe(0);
    });
  });

  describe('Ok#cata', () => {
    test('It should call the "Ok" function.', () => {
      const errCB = jest.fn();
      const okCB = jest.fn();

      Ok().cata({
        Err: errCB,
        Ok: okCB,
      });

      expect(errCB.mock.calls.length).toBe(0);
      expect(okCB.mock.calls.length).toBe(1);
    });
  });
});
