/* global describe, expect, test */

import fl from 'fantasy-land';
import IO from '../../../src/io';

describe('Fantasy Check - IO', () => {
  test('Static Monad', () => {
    expect(typeof IO[fl.map]).toBe('function');
    expect(typeof IO[fl.ap]).toBe('function');
    expect(typeof IO[fl.of]).toBe('function');
    expect(typeof IO[fl.chain]).toBe('function');
  });

  test('Instance Monad', () => {
    expect(typeof IO.prototype[fl.map]).toBe('function');
    expect(typeof IO.prototype[fl.ap]).toBe('function');
    expect(typeof IO.prototype[fl.of]).toBe('function');
    expect(typeof IO.prototype[fl.chain]).toBe('function');
  });
});
