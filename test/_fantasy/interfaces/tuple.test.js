/* global describe, expect, test */

import fl from 'fantasy-land';
import Tuple from '../../../src/tuple';

describe('Fantasy Check - Tuple', () => {
  test('Static Setoid', () => {
    expect(typeof Tuple[fl.equals]).toBe('function');
  });

  test('Static Functor', () => {
    expect(typeof Tuple[fl.map]).toBe('function');
  });

  test('Instance Setoid', () => {
    expect(typeof Tuple.prototype[fl.equals]).toBe('function');
  });

  test('Instance Functor', () => {
    expect(typeof Tuple.prototype[fl.map]).toBe('function');
  });
});
