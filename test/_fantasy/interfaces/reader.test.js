/* global describe, expect, test */

const FL = require('fantasy-land');
const Reader = require('../../../src/reader');

describe('Fantasy Check - Reader', () => {
  test('Static Monad', () => {
    expect(typeof Reader[FL.map]).toBe('function');
    expect(typeof Reader[FL.ap]).toBe('function');
    expect(typeof Reader[FL.of]).toBe('function');
    expect(typeof Reader[FL.chain]).toBe('function');
  });

  test('Instance Monad', () => {
    expect(typeof Reader.prototype[FL.map]).toBe('function');
    expect(typeof Reader.prototype[FL.ap]).toBe('function');
    expect(typeof Reader.prototype[FL.of]).toBe('function');
    expect(typeof Reader.prototype[FL.chain]).toBe('function');
  });
});
