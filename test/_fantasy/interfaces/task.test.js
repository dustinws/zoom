/* global describe, expect, test */

const FL = require('fantasy-land');
const Task = require('../../../src/task');

describe('Fantasy Check - Task', () => {
  test('Static Monad', () => {
    expect(typeof Task[FL.map]).toBe('function');
    expect(typeof Task[FL.ap]).toBe('function');
    expect(typeof Task[FL.of]).toBe('function');
    expect(typeof Task[FL.chain]).toBe('function');
  });

  test('Instance Monad', () => {
    expect(typeof Task.prototype[FL.map]).toBe('function');
    expect(typeof Task.prototype[FL.ap]).toBe('function');
    expect(typeof Task.prototype[FL.of]).toBe('function');
    expect(typeof Task.prototype[FL.chain]).toBe('function');
  });
});
