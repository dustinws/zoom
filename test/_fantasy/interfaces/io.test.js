/* global describe, expect, test */

const FL = require('fantasy-land');
const IO = require('../../../src/io');

describe('Fantasy Check - IO', () => {
  test('Static Monad', () => {
    expect(typeof IO[FL.map]).toBe('function');
    expect(typeof IO[FL.ap]).toBe('function');
    expect(typeof IO[FL.of]).toBe('function');
    expect(typeof IO[FL.chain]).toBe('function');
  });

  test('Instance Monad', () => {
    expect(typeof IO.prototype[FL.map]).toBe('function');
    expect(typeof IO.prototype[FL.ap]).toBe('function');
    expect(typeof IO.prototype[FL.of]).toBe('function');
    expect(typeof IO.prototype[FL.chain]).toBe('function');
  });
});
