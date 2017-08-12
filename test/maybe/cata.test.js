/* global describe, expect, jest, test */

import Maybe from '../../src/maybe';

const { Nothing, Just } = Maybe;


describe('Data.Maybe', () => {
  describe('Nothing#cata', () => {
    test('It should call the "Nothing" function.', () => {
      const leftCB = jest.fn();
      const rightCB = jest.fn();

      Nothing.cata({
        Nothing: leftCB,
        Just: rightCB,
      });

      expect(leftCB.mock.calls.length).toBe(1);
      expect(rightCB.mock.calls.length).toBe(0);
    });
  });

  describe('Just#cata', () => {
    test('It should call the "Just" function.', () => {
      const leftCB = jest.fn();
      const rightCB = jest.fn();

      Just().cata({
        Nothing: leftCB,
        Just: rightCB,
      });

      expect(leftCB.mock.calls.length).toBe(0);
      expect(rightCB.mock.calls.length).toBe(1);
    });
  });
});
