/* global describe, expect, test */

import fl from 'fantasy-land';
import RemoteData from '../../../src/remote-data';

describe('Fantasy Check - RemoteData', () => {
  test('Static Monad', () => {
    expect(typeof RemoteData[fl.map]).toBe('function');
    expect(typeof RemoteData[fl.ap]).toBe('function');
    expect(typeof RemoteData[fl.of]).toBe('function');
    expect(typeof RemoteData[fl.chain]).toBe('function');
  });

  test('Instance Monad', () => {
    expect(typeof RemoteData.prototype[fl.map]).toBe('function');
    expect(typeof RemoteData.prototype[fl.ap]).toBe('function');
    expect(typeof RemoteData.prototype[fl.of]).toBe('function');
    expect(typeof RemoteData.prototype[fl.chain]).toBe('function');
  });
});
