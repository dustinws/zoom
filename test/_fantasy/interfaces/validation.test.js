/* global describe, expect, test */

const FL = require('fantasy-land');
const Validation = require('../../../src/validation');

describe('Fantasy Check - Validation', () => {
  describe('Validation', () => {
    test('Static Monad', () => {
      expect(typeof Validation[FL.map]).toBe('function');
      expect(typeof Validation[FL.ap]).toBe('function');
      expect(typeof Validation[FL.of]).toBe('function');
      expect(typeof Validation[FL.chain]).toBe('function');
    });

    test('Static Monoid', () => {
      expect(typeof Validation[FL.concat]).toBe('function');
      expect(typeof Validation[FL.empty]).toBe('function');
    });
  });

  describe('Validation.Failure', () => {
    test('Instance Monad', () => {
      expect(typeof Validation.Failure.prototype[FL.map]).toBe('function');
      expect(typeof Validation.Failure.prototype[FL.ap]).toBe('function');
      expect(typeof Validation.Failure.prototype[FL.of]).toBe('function');
      expect(typeof Validation.Failure.prototype[FL.chain]).toBe('function');
    });

    test('Instance Monoid', () => {
      expect(typeof Validation.Failure.prototype[FL.concat]).toBe('function');
      expect(typeof Validation.Failure.prototype[FL.empty]).toBe('function');
    });
  });

  describe('Validation.Success', () => {
    test('Instance Monad', () => {
      expect(typeof Validation.Success.prototype[FL.map]).toBe('function');
      expect(typeof Validation.Success.prototype[FL.ap]).toBe('function');
      expect(typeof Validation.Success.prototype[FL.of]).toBe('function');
      expect(typeof Validation.Success.prototype[FL.chain]).toBe('function');
    });

    test('Instance Monoid', () => {
      expect(typeof Validation.Success.prototype[FL.concat]).toBe('function');
      expect(typeof Validation.Success.prototype[FL.empty]).toBe('function');
    });
  });
});
