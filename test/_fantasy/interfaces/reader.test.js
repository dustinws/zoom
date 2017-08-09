/* global describe, expect, test */

import fl from 'fantasy-land';
import Reader from '../../../src/reader';

describe('Fantasy Check - Reader', () => {
  test('Static Monad', () => {
    expect(typeof Reader[fl.map]).toBe('function');
    expect(typeof Reader[fl.ap]).toBe('function');
    expect(typeof Reader[fl.of]).toBe('function');
    expect(typeof Reader[fl.chain]).toBe('function');
  });

  test('Instance Monad', () => {
    expect(typeof Reader.prototype[fl.map]).toBe('function');
    expect(typeof Reader.prototype[fl.ap]).toBe('function');
    expect(typeof Reader.prototype[fl.of]).toBe('function');
    expect(typeof Reader.prototype[fl.chain]).toBe('function');
  });
});
