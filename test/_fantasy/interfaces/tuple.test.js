/* global describe, expect, test */

const FL = require('fantasy-land');
const Tuple = require('../../../src/tuple');

describe('Fantasy Check - Tuple', () => {
  test('Static Setoid', () => {
    expect(typeof Tuple[FL.equals]).toBe('function');
  });

  test('Static Functor', () => {
    expect(typeof Tuple[FL.map]).toBe('function');
  });

  test('Instance Setoid', () => {
    expect(typeof Tuple.prototype[FL.equals]).toBe('function');
  });

  test('Instance Functor', () => {
    expect(typeof Tuple.prototype[FL.map]).toBe('function');
  });
});
