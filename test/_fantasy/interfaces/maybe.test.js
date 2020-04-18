/* global describe, expect, test */

const FL = require('fantasy-land');
const Maybe = require('../../../src/maybe');

describe('Fantasy Check - Maybe', () => {
  describe('Maybe', () => {
    test('Static Monad', () => {
      expect(typeof Maybe[FL.map]).toBe('function');
      expect(typeof Maybe[FL.ap]).toBe('function');
      expect(typeof Maybe[FL.of]).toBe('function');
      expect(typeof Maybe[FL.chain]).toBe('function');
    });
  });

  describe('Maybe.Nothing', () => {
    test('Static Monad', () => {
      expect(typeof Maybe.Nothing[FL.map]).toBe('function');
      expect(typeof Maybe.Nothing[FL.ap]).toBe('function');
      expect(typeof Maybe.Nothing[FL.of]).toBe('function');
      expect(typeof Maybe.Nothing[FL.chain]).toBe('function');
    });
  });

  describe('Maybe.Just', () => {
    test('Instance Monad', () => {
      expect(typeof Maybe.Just.prototype[FL.map]).toBe('function');
      expect(typeof Maybe.Just.prototype[FL.ap]).toBe('function');
      expect(typeof Maybe.Just.prototype[FL.of]).toBe('function');
      expect(typeof Maybe.Just.prototype[FL.chain]).toBe('function');
    });
  });
});
