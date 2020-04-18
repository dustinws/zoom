/* global describe, expect, test */

const FL = require('fantasy-land');
const Either = require('../../../src/either');

describe('Fantasy Check - Either', () => {
  describe('Either', () => {
    test('Static Monad', () => {
      expect(typeof Either[FL.map]).toBe('function');
      expect(typeof Either[FL.ap]).toBe('function');
      expect(typeof Either[FL.of]).toBe('function');
      expect(typeof Either[FL.chain]).toBe('function');
    });
  });

  describe('Either.Left', () => {
    test('Instance Monad', () => {
      expect(typeof Either.Left.prototype[FL.map]).toBe('function');
      expect(typeof Either.Left.prototype[FL.ap]).toBe('function');
      expect(typeof Either.Left.prototype[FL.of]).toBe('function');
      expect(typeof Either.Left.prototype[FL.chain]).toBe('function');
    });
  });

  describe('Either.Right', () => {
    test('Instance Monad', () => {
      expect(typeof Either.Right.prototype[FL.map]).toBe('function');
      expect(typeof Either.Right.prototype[FL.ap]).toBe('function');
      expect(typeof Either.Right.prototype[FL.of]).toBe('function');
      expect(typeof Either.Right.prototype[FL.chain]).toBe('function');
    });
  });
});
