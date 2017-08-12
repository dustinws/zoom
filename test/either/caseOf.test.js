/* global describe, expect, jest, test */

import Either from '../../src/either';

const { Left, Right } = Either;


describe('Data.Either', () => {
  describe('Left#caseOf', () => {
    test('It should call the "Left" function.', () => {
      const leftCB = jest.fn();
      const rightCB = jest.fn();

      Left().caseOf({
        Left: leftCB,
        Right: rightCB,
      });

      expect(leftCB.mock.calls.length).toBe(1);
      expect(rightCB.mock.calls.length).toBe(0);
    });
  });

  describe('Right#caseOf', () => {
    test('It should call the "Right" function.', () => {
      const leftCB = jest.fn();
      const rightCB = jest.fn();

      Right().caseOf({
        Left: leftCB,
        Right: rightCB,
      });

      expect(leftCB.mock.calls.length).toBe(0);
      expect(rightCB.mock.calls.length).toBe(1);
    });
  });
});
