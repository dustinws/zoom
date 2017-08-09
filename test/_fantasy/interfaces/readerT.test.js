/* global describe, expect, test */

import fl from 'fantasy-land';
import Reader from '../../../src/reader';
import Maybe from '../../../src/maybe';

const ReaderT = Reader.T(Maybe);

describe('Fantasy Check - ReaderT', () => {
  test('Static Monad', () => {
    expect(typeof ReaderT[fl.map]).toBe('function');
    expect(typeof ReaderT[fl.ap]).toBe('function');
    expect(typeof ReaderT[fl.of]).toBe('function');
    expect(typeof ReaderT[fl.chain]).toBe('function');
  });

  test('Instance Monad', () => {
    expect(typeof ReaderT.prototype[fl.map]).toBe('function');
    expect(typeof ReaderT.prototype[fl.ap]).toBe('function');
    expect(typeof ReaderT.prototype[fl.of]).toBe('function');
    expect(typeof ReaderT.prototype[fl.chain]).toBe('function');
  });
});
