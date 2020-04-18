/* global describe, expect, jest, test */

const Maybe = require('../../src/maybe');

const { Nothing, Just } = Maybe;


describe('Data.Maybe', () => {
  describe('Nothing#caseOf', () => {
    test('It should call the "Nothing" function.', () => {
      const nothingCB = jest.fn();
      const justCB = jest.fn();

      Nothing.caseOf({
        Nothing: nothingCB,
        Just: justCB,
      });

      expect(nothingCB.mock.calls.length).toBe(1);
      expect(justCB.mock.calls.length).toBe(0);
    });
  });

  describe('Just#caseOf', () => {
    test('It should call the "Just" function.', () => {
      const nothingCB = jest.fn();
      const justCB = jest.fn();

      Just().caseOf({
        Nothing: nothingCB,
        Just: justCB,
      });

      expect(nothingCB.mock.calls.length).toBe(0);
      expect(justCB.mock.calls.length).toBe(1);
    });
  });
});
