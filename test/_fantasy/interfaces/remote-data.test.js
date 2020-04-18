/* global describe, expect, test */

const FL = require('fantasy-land');
const RemoteData = require('../../../src/remote-data');

describe('Fantasy Check - RemoteData', () => {
  test('Static Monad', () => {
    expect(typeof RemoteData[FL.map]).toBe('function');
    expect(typeof RemoteData[FL.ap]).toBe('function');
    expect(typeof RemoteData[FL.of]).toBe('function');
    expect(typeof RemoteData[FL.chain]).toBe('function');
  });

  test('Instance Semigroup', () => {
    expect(typeof RemoteData[FL.concat]).toBe('function');
  });

  test('Instance Monad', () => {
    expect(typeof RemoteData.prototype[FL.map]).toBe('function');
    expect(typeof RemoteData.prototype[FL.ap]).toBe('function');
    expect(typeof RemoteData.prototype[FL.of]).toBe('function');
    expect(typeof RemoteData.prototype[FL.chain]).toBe('function');
  });

  test('Instance Semigroup', () => {
    expect(typeof RemoteData.prototype[FL.concat]).toBe('function');
  });
});
