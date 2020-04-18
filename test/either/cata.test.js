/* global describe, expect, jest, test */

const Either = require('../../src/either');

const { Left, Right } = Either;


describe('Data.Either', () => {
  describe('Left#cata', () => {
    test('It should call the "Left" function.', () => {
      const leftCB = jest.fn();
      const rightCB = jest.fn();

      Left().cata({
        Left: leftCB,
        Right: rightCB,
      });

      expect(leftCB.mock.calls.length).toBe(1);
      expect(rightCB.mock.calls.length).toBe(0);
    });
  });

  describe('Right#cata', () => {
    test('It should call the "Right" function.', () => {
      const leftCB = jest.fn();
      const rightCB = jest.fn();

      Right().cata({
        Left: leftCB,
        Right: rightCB,
      });

      expect(leftCB.mock.calls.length).toBe(0);
      expect(rightCB.mock.calls.length).toBe(1);
    });
  });
});
