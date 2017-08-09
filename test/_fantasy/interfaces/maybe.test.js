/* global describe, expect, test */

import fl from 'fantasy-land';
import Maybe from '../../../src/maybe';

describe('Fantasy Check - Maybe', () => {
  describe('Maybe', () => {
    test('Static Monad', () => {
      expect(typeof Maybe[fl.map]).toBe('function');
      expect(typeof Maybe[fl.ap]).toBe('function');
      expect(typeof Maybe[fl.of]).toBe('function');
      expect(typeof Maybe[fl.chain]).toBe('function');
    });
  });

  describe('Maybe.Nothing', () => {
    test('Static Monad', () => {
      expect(typeof Maybe.Nothing[fl.map]).toBe('function');
      expect(typeof Maybe.Nothing[fl.ap]).toBe('function');
      expect(typeof Maybe.Nothing[fl.of]).toBe('function');
      expect(typeof Maybe.Nothing[fl.chain]).toBe('function');
    });
  });

  describe('Maybe.Just', () => {
    test('Instance Monad', () => {
      expect(typeof Maybe.Just.prototype[fl.map]).toBe('function');
      expect(typeof Maybe.Just.prototype[fl.ap]).toBe('function');
      expect(typeof Maybe.Just.prototype[fl.of]).toBe('function');
      expect(typeof Maybe.Just.prototype[fl.chain]).toBe('function');
    });
  });
});
