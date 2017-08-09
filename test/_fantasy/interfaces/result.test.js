/* global describe, expect, test */

import fl from 'fantasy-land';
import Result from '../../../src/result';

describe('Fantasy Check - Result', () => {
  describe('Result', () => {
    test('Static Monad', () => {
      expect(typeof Result[fl.map]).toBe('function');
      expect(typeof Result[fl.ap]).toBe('function');
      expect(typeof Result[fl.of]).toBe('function');
      expect(typeof Result[fl.chain]).toBe('function');
    });
  });

  describe('Result.Err', () => {
    test('Instance Monad', () => {
      expect(typeof Result.Err.prototype[fl.map]).toBe('function');
      expect(typeof Result.Err.prototype[fl.ap]).toBe('function');
      expect(typeof Result.Err.prototype[fl.of]).toBe('function');
      expect(typeof Result.Err.prototype[fl.chain]).toBe('function');
    });
  });

  describe('Result.Ok', () => {
    test('Instance Monad', () => {
      expect(typeof Result.Ok.prototype[fl.map]).toBe('function');
      expect(typeof Result.Ok.prototype[fl.ap]).toBe('function');
      expect(typeof Result.Ok.prototype[fl.of]).toBe('function');
      expect(typeof Result.Ok.prototype[fl.chain]).toBe('function');
    });
  });
});
