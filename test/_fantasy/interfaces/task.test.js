/* global describe, expect, test */

import fl from 'fantasy-land';
import Task from '../../../src/task';

describe('Fantasy Check - Task', () => {
  test('Static Monad', () => {
    expect(typeof Task[fl.map]).toBe('function');
    expect(typeof Task[fl.ap]).toBe('function');
    expect(typeof Task[fl.of]).toBe('function');
    expect(typeof Task[fl.chain]).toBe('function');
  });

  test('Instance Monad', () => {
    expect(typeof Task.prototype[fl.map]).toBe('function');
    expect(typeof Task.prototype[fl.ap]).toBe('function');
    expect(typeof Task.prototype[fl.of]).toBe('function');
    expect(typeof Task.prototype[fl.chain]).toBe('function');
  });
});
