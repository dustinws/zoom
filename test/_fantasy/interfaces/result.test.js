/* global describe, expect, test */

const FL = require('fantasy-land');
const Result = require('../../../src/result');

describe('Fantasy Check - Result', () => {
  describe('Result', () => {
    test('Static Monad', () => {
      expect(typeof Result[FL.map]).toBe('function');
      expect(typeof Result[FL.ap]).toBe('function');
      expect(typeof Result[FL.of]).toBe('function');
      expect(typeof Result[FL.chain]).toBe('function');
    });
  });

  describe('Result.Err', () => {
    test('Instance Monad', () => {
      expect(typeof Result.Err.prototype[FL.map]).toBe('function');
      expect(typeof Result.Err.prototype[FL.ap]).toBe('function');
      expect(typeof Result.Err.prototype[FL.of]).toBe('function');
      expect(typeof Result.Err.prototype[FL.chain]).toBe('function');
    });
  });

  describe('Result.Ok', () => {
    test('Instance Monad', () => {
      expect(typeof Result.Ok.prototype[FL.map]).toBe('function');
      expect(typeof Result.Ok.prototype[FL.ap]).toBe('function');
      expect(typeof Result.Ok.prototype[FL.of]).toBe('function');
      expect(typeof Result.Ok.prototype[FL.chain]).toBe('function');
    });
  });
});
