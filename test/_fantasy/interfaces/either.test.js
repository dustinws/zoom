/* global describe, expect, test */

import fl from 'fantasy-land';
import Either from '../../../src/either';

describe('Fantasy Check - Either', () => {
  describe('Either', () => {
    test('Monad', () => {
      expect(typeof Either[fl.map]).toBe('function');
      expect(typeof Either[fl.ap]).toBe('function');
      expect(typeof Either[fl.of]).toBe('function');
      expect(typeof Either[fl.chain]).toBe('function');
    });

    test('Semigroup', () => {
      expect(typeof Either[fl.concat]).toBe('function');
    });

    test('Setoid', () => {
      expect(typeof Either[fl.equals]).toBe('function');
    });

    test('Foldable', () => {
      expect(typeof Either[fl.reduce]).toBe('function');
    });
  });

  describe('Either.Left', () => {
    test('Instance Monad', () => {
      expect(typeof Either.Left.prototype[fl.map]).toBe('function');
      expect(typeof Either.Left.prototype[fl.ap]).toBe('function');
      expect(typeof Either.Left.prototype[fl.of]).toBe('function');
      expect(typeof Either.Left.prototype[fl.chain]).toBe('function');
    });

    test('Instance Semigroup', () => {
      expect(typeof Either.Left.prototype[fl.concat]).toBe('function');
    });

    test('Instance Setoid', () => {
      expect(typeof Either.Left.prototype[fl.equals]).toBe('function');
    });

    test('Instance Foldable', () => {
      expect(typeof Either.Left.prototype[fl.reduce]).toBe('function');
    });
  });

  describe('Either.Right', () => {
    test('Instance Monad', () => {
      expect(typeof Either.Right.prototype[fl.map]).toBe('function');
      expect(typeof Either.Right.prototype[fl.ap]).toBe('function');
      expect(typeof Either.Right.prototype[fl.of]).toBe('function');
      expect(typeof Either.Right.prototype[fl.chain]).toBe('function');
    });

    test('Instance Semigroup', () => {
      expect(typeof Either.Right.prototype[fl.concat]).toBe('function');
    });

    test('Instance Setoid', () => {
      expect(typeof Either.Right.prototype[fl.equals]).toBe('function');
    });

    test('Instance Foldable', () => {
      expect(typeof Either.Right.prototype[fl.reduce]).toBe('function');
    });
  });
});
