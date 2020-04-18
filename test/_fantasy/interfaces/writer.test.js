/* global describe, expect, test */

const FL = require('fantasy-land');
const Writer = require('../../../src/writer');

describe('Fantasy Check - Writer', () => {
  test('Static Monad', () => {
    expect(typeof Writer[FL.map]).toBe('function');
    expect(typeof Writer[FL.ap]).toBe('function');
    expect(typeof Writer[FL.of]).toBe('function');
    expect(typeof Writer[FL.chain]).toBe('function');
  });

  test('Instance Monad', () => {
    expect(typeof Writer.prototype[FL.map]).toBe('function');
    expect(typeof Writer.prototype[FL.ap]).toBe('function');
    expect(typeof Writer.prototype[FL.of]).toBe('function');
    expect(typeof Writer.prototype[FL.chain]).toBe('function');
  });
});
