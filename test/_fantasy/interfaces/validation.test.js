/* global describe, expect, test */

import fl from 'fantasy-land';
import Validation from '../../../src/validation';

describe('Fantasy Check - Validation', () => {
  describe('Validation', () => {
    test('Static Monad', () => {
      expect(typeof Validation[fl.map]).toBe('function');
      expect(typeof Validation[fl.ap]).toBe('function');
      expect(typeof Validation[fl.of]).toBe('function');
      expect(typeof Validation[fl.chain]).toBe('function');
    });

    test('Static Monoid', () => {
      expect(typeof Validation[fl.concat]).toBe('function');
      expect(typeof Validation[fl.empty]).toBe('function');
    });
  });

  describe('Validation.Failure', () => {
    test('Instance Monad', () => {
      expect(typeof Validation.Failure.prototype[fl.map]).toBe('function');
      expect(typeof Validation.Failure.prototype[fl.ap]).toBe('function');
      expect(typeof Validation.Failure.prototype[fl.of]).toBe('function');
      expect(typeof Validation.Failure.prototype[fl.chain]).toBe('function');
    });

    test('Instance Monoid', () => {
      expect(typeof Validation.Failure.prototype[fl.concat]).toBe('function');
      expect(typeof Validation.Failure.prototype[fl.empty]).toBe('function');
    });
  });

  describe('Validation.Success', () => {
    test('Instance Monad', () => {
      expect(typeof Validation.Success.prototype[fl.map]).toBe('function');
      expect(typeof Validation.Success.prototype[fl.ap]).toBe('function');
      expect(typeof Validation.Success.prototype[fl.of]).toBe('function');
      expect(typeof Validation.Success.prototype[fl.chain]).toBe('function');
    });

    test('Instance Monoid', () => {
      expect(typeof Validation.Success.prototype[fl.concat]).toBe('function');
      expect(typeof Validation.Success.prototype[fl.empty]).toBe('function');
    });
  });
});
