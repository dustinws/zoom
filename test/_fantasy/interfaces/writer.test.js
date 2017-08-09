/* global describe, expect, test */

import fl from 'fantasy-land';
import Writer from '../../../src/writer';

describe('Fantasy Check - Writer', () => {
  test('Static Monad', () => {
    expect(typeof Writer[fl.map]).toBe('function');
    expect(typeof Writer[fl.ap]).toBe('function');
    expect(typeof Writer[fl.of]).toBe('function');
    expect(typeof Writer[fl.chain]).toBe('function');
  });

  test('Instance Monad', () => {
    expect(typeof Writer.prototype[fl.map]).toBe('function');
    expect(typeof Writer.prototype[fl.ap]).toBe('function');
    expect(typeof Writer.prototype[fl.of]).toBe('function');
    expect(typeof Writer.prototype[fl.chain]).toBe('function');
  });
});
