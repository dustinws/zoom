/* global describe, expect, test */

const Validation = require('../../src/validation');

describe('Data.Validation', () => {
  describe('Validation.empty', () => {
    test('It should return a Success of an array', () => {
      expect(Validation.empty()).toEqual(Validation.Success([]));
    });
  });

  describe('Validation#empty', () => {
    test('It should return a Success of an array', () => {
      expect(Validation.of().empty()).toEqual(Validation.Success([]));
    });
  });
});
