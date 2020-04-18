/* global describe, expect, test */

const FL = require('fantasy-land');
const Reader = require('../../../src/reader');
const Maybe = require('../../../src/maybe');

const ReaderT = Reader.T(Maybe);

describe('Fantasy Check - ReaderT', () => {
  test('Static Monad', () => {
    expect(typeof ReaderT[FL.map]).toBe('function');
    expect(typeof ReaderT[FL.ap]).toBe('function');
    expect(typeof ReaderT[FL.of]).toBe('function');
    expect(typeof ReaderT[FL.chain]).toBe('function');
  });

  test('Instance Monad', () => {
    expect(typeof ReaderT.prototype[FL.map]).toBe('function');
    expect(typeof ReaderT.prototype[FL.ap]).toBe('function');
    expect(typeof ReaderT.prototype[FL.of]).toBe('function');
    expect(typeof ReaderT.prototype[FL.chain]).toBe('function');
  });
});
